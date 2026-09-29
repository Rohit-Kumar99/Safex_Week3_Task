import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'forge_foundry_cart_v1';

// Calculate totals reliably
const computeTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  return { totalItems, subtotal };
};

// Initial state loader from localStorage
const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Validate each item against live catalog data to ensure stock limits and valid prices
        const sanitizedItems = parsed.map(savedItem => {
          const liveProduct = PRODUCTS.find(p => p.id === savedItem.id);
          if (!liveProduct) return null;
          // Clamp to current stock
          const clampedQty = Math.max(1, Math.min(savedItem.quantity, liveProduct.stock));
          if (liveProduct.stock <= 0) return null; // Drop out-of-stock items on fresh load
          return {
            id: liveProduct.id,
            product: liveProduct,
            price: liveProduct.price,
            quantity: clampedQty,
          };
        }).filter(Boolean);

        const { totalItems, subtotal } = computeTotals(sanitizedItems);
        return {
          items: sanitizedItems,
          totalItems,
          subtotal,
          feedbackMessage: null,
        };
      }
    }
  } catch (err) {
    console.error('Failed to parse cart from localStorage:', err);
  }

  return {
    items: [],
    totalItems: 0,
    subtotal: 0,
    feedbackMessage: null,
  };
};

export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  CLEAR_FEEDBACK: 'CLEAR_FEEDBACK',
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;

      // Guard: 0 stock items cannot be added
      if (!product || product.stock <= 0) {
        return {
          ...state,
          feedbackMessage: {
            id: Date.now(),
            type: 'error',
            title: 'Inventory Alert',
            text: `Cannot add ${product?.name || 'item'}. Currently out of stock at depot.`,
          },
        };
      }

      const existingIndex = state.items.findIndex(item => item.id === product.id);
      let updatedItems = [...state.items];
      let feedback = null;

      if (existingIndex > -1) {
        const existingItem = updatedItems[existingIndex];
        const requestedTotal = existingItem.quantity + quantity;

        if (requestedTotal > product.stock) {
          const allowedAdd = Math.max(0, product.stock - existingItem.quantity);
          if (allowedAdd === 0) {
            feedback = {
              id: Date.now(),
              type: 'warning',
              title: 'Stock Limit Reached',
              text: `Maximum depot inventory reached (${product.stock} ${product.unit}) for ${product.name}.`,
            };
          } else {
            updatedItems[existingIndex] = {
              ...existingItem,
              quantity: product.stock,
            };
            feedback = {
              id: Date.now(),
              type: 'warning',
              title: 'Quantity Adjusted',
              text: `Adjusted to maximum available stock: ${product.stock} ${product.unit}.`,
            };
          }
        } else {
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: requestedTotal,
          };
          feedback = {
            id: Date.now(),
            type: 'success',
            title: 'Cart Updated',
            text: `Added ${quantity} additional unit(s) to order.`,
          };
        }
      } else {
        // New item
        const finalQty = Math.min(Math.max(1, quantity), product.stock);
        if (quantity > product.stock) {
          feedback = {
            id: Date.now(),
            type: 'warning',
            title: 'Stock Limited',
            text: `Only ${product.stock} units available in yard. Quantity capped.`,
          };
        } else {
          feedback = {
            id: Date.now(),
            type: 'success',
            title: 'Item Added',
            text: `${product.name} added to cart.`,
          };
        }

        updatedItems.push({
          id: product.id,
          product,
          price: product.price,
          quantity: finalQty,
        });
      }

      const { totalItems, subtotal } = computeTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalItems,
        subtotal,
        feedbackMessage: feedback,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id } = action.payload;
      const targetItem = state.items.find(item => item.id === id);
      const updatedItems = state.items.filter(item => item.id !== id);
      const { totalItems, subtotal } = computeTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        subtotal,
        feedbackMessage: {
          id: Date.now(),
          type: 'info',
          title: 'Item Removed',
          text: targetItem ? `Removed ${targetItem.product.name} from cart.` : 'Item removed.',
        },
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const targetIndex = state.items.findIndex(item => item.id === id);
      if (targetIndex === -1) return state;

      const currentItem = state.items[targetIndex];
      const maxStock = currentItem.product.stock;
      let feedback = null;

      // Spec rule: Quantity cannot go below 1 (use remove instead)
      let desiredQty = parseInt(quantity, 10);
      if (isNaN(desiredQty) || desiredQty < 1) {
        desiredQty = 1;
      }

      // Spec rule: Quantity cannot go above product's available stock
      if (desiredQty > maxStock) {
        desiredQty = maxStock;
        feedback = {
          id: Date.now(),
          type: 'warning',
          title: 'Depot Limit Reached',
          text: `Depot capacity limit is ${maxStock} units for ${currentItem.product.name}.`,
        };
      }

      const updatedItems = [...state.items];
      updatedItems[targetIndex] = {
        ...currentItem,
        quantity: desiredQty,
      };

      const { totalItems, subtotal } = computeTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalItems,
        subtotal,
        feedbackMessage: feedback,
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        items: [],
        totalItems: 0,
        subtotal: 0,
        feedbackMessage: {
          id: Date.now(),
          type: 'info',
          title: 'Cart Emptied',
          text: 'All materials cleared from order.',
        },
      };
    }

    case CART_ACTIONS.CLEAR_FEEDBACK: {
      return {
        ...state,
        feedbackMessage: null,
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Sync to localStorage on every items state change
  useEffect(() => {
    try {
      const serialize = state.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [state.items]);

  // Convenience helper dispatchers
  const addItem = (product, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const clearFeedback = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_FEEDBACK });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        feedbackMessage: state.feedbackMessage,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        clearFeedback,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
