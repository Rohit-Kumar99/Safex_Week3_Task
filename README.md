# FORGE & FOUNDRY SUPPLY CO.
### Commercial Building Materials & Trade Hardware Storefront (Week 3)

---

## 1. Scope Statement

> This project is a functional e-commerce storefront, not a marketing site — the core challenge is application logic (cart state, quantity management, checkout flow) rather than layout and animation. Unlike Week 1 (real estate portfolio site) and Week 2 (dev agency marketing site), there is no hero/brand storytelling focus; success here is measured by whether the cart and checkout actually work correctly under edge cases, not visual polish alone.

---

## 2. What I Built & Why

### Brand & Concept
- **Firm Name**: Forge & Foundry Supply Co.
- **Positioning Statement**: *"Commercial-grade aggregates, structural fasteners, heavy-duty tools, and contractor supplies with real-time yard stock and same-day depot dispatch."*
- **Target Buyer**: Commercial framing superintendents, concrete contractors, excavators, and mechanical subcontractors who need immediate stock verification, bulk unit pricing, and zero marketing fluff.

### Catalog Categories & Products (19 Plausible Commercial SKUs)
1. **Cement & Structural Aggregates** (4 SKUs)
   - ASTM C150 Type I/II Portland Cement (94 lb bag) — $14.85
   - 5000 PSI High-Strength Concrete Mix (50 lb bag) — $8.40
   - Washed Coarse Concrete Sand Bulk Super Sack (1-Ton) — $72.00
   - #57 Crushed Angular Granite Drainage Aggregate (50 lb bag) — $11.50 *(Low Stock: 4 units)*
2. **Hand & Layout Measurement Tools** (4 SKUs)
   - 24 oz Solid Steel Antivibe Framing Hammer (Milled Face) — $44.50
   - 9-Inch Die-Cast Magnetic Torpedo Level with Neodymium Magnets — $29.95
   - 35 ft Heavy-Duty Industrial Tape Measure (14 ft Standout) — $32.00
   - 14-Inch High-Tensile Center-Cut Bolt & Rebar Cutters — $48.25
3. **Power Tools & Cordless Demolition** (4 SKUs)
   - 15-Amp 7-1/4" Magnesium Worm Drive Circular Saw — $239.00
   - SDS-Max 1-9/16" Combination Rotary Demolition Hammer (8.5J) — $389.00
   - 60V MAX Brushless 7"/9" Cordless Heavy Angle Grinder — $289.00
   - Commercial 1/2" Twin-Hammer Pneumatic Impact Wrench — $175.00 *(Depot Stock: 0 / Backorder Only)*
4. **Fittings, Fasteners & Anchors** (4 SKUs)
   - 3-1/2" 16D Hot-Dip Galvanized Smooth Framing Nails (2,000/Box) — $68.50
   - Grade 8 Zinc-Yellow Hex Head Cap Screws 1/2"-13 x 2-1/2" (50/Box) — $34.20
   - #12 x 1" Hex Washer Head Self-Drilling Screws with EPDM (500/Tub) — $42.00
   - 1/2" Heavy-Duty Concrete Wedge Expansion Anchors (25/Pack) — $26.80
5. **Coatings, Epoxies & Sealants** (3 SKUs)
   - Commercial Polyurethane Concrete Expansion Joint Sealant (29 oz) — $16.75
   - 100% Solids Industrial High-Traffic 2-Part Epoxy Floor Kit (2-Gal) — $148.00
   - Cold Galvanizing 95% Pure Zinc Corrosion Barrier Primer (1 Gal) — $98.50

---

## 3. Tools & Engineering Decisions

### Tech Stack
- **React 18 + Vite**: Lightning-fast build tooling and lean client-side rendering.
- **Tailwind CSS (Vanilla)**: Industrial color palette (Charcoal `#0c0e12`, Concrete Gray `#222834`, and Safety Orange `#ff5500`), sharp 1px borders, and zero generic pill buttons. No component libraries (e.g. no Shadcn, no MUI).
- **React Context API + `useReducer`**:
  - *Why not Redux Toolkit?* A shopping cart with `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`, and stock clamping is the canonical use case for `useReducer`. Redux Toolkit adds store slices, thunk middleware, and boilerplate built for multi-domain global apps. Context + `useReducer` is the leaner, idiomatic React choice here.
- **`localStorage` Persistence**: The cart state synchronizes to `localStorage` on every change and rehydrates on initial provider mount while validating every item against the live product catalog to ensure stock quotas and pricing integrity.
- **React Hook Form + Zod**: Strict type validation, pattern checks for phone numbers and postal codes, required field assertions, and inline error states on blur.

---

## 4. Competitor Reference Sites (B2B Trade Hardware)

1. **Grainger Industrial Supply (`grainger.com`)**: Noticed their dense tabular display of real-time branch availability (e.g., "In stock at Cleveland Branch - 14 available today"), SKU numbers at the top of every card, and clear per-unit/per-box breakdown.
2. **Ferguson Enterprises (`ferguson.com`)**: Noticed how contractor pricing vs list price is separated, and bulk pallet quantity alerts inform buyers before checkout.
3. **Home Depot Pro / SupplyWorks (`homedepot.com/c/pro_commercial`)**: Observed their strict distinction between jobsite boom flatbed delivery and customer dock pickup, which we integrated directly into our logistics module.
4. **Fastenal (`fastenal.com`)**: Noticed their no-nonsense industrial typography, high-contrast hazard signals for out-of-stock fasteners, and instant spec sheets.

---

## 5. Edge Cases Tested & What Broke (The Honest Changelog)

| # | Edge Case | What Happened on First Pass | The Fix Implemented |
|---|---|---|---|
| **1** | Adding more of an item than is in stock | When adding 10 bags of #57 Granite Aggregate (only 4 in stock), the cart initially accepted all 10 without warning. | Added stock boundary checks in `cartReducer` under `ADD_ITEM`. If `existingQty + quantity > product.stock`, it clamps to `product.stock` and dispatches a high-priority warning toast informing the buyer. |
| **2** | Submitting checkout with empty or malformed fields | Submitting without typing triggered browser alerts rather than specific inline field feedback. | Built a Zod validation schema using `@hookform/resolvers/zod` with regular expressions for phone numbers (`^[+]?[(]?[0-9]{3}[)]?...`) and ZIP codes (`^\d{5}(-\d{4})?$`). Bound inline red warnings to each input on blur. |
| **3** | Removing all items from cart and navigating directly to `/checkout` | Manually typing `/checkout` in the browser URL bar rendered a broken $0 form with empty summary rows. | Added an empty-cart barrier guard at the top of `Checkout.jsx`. If `items.length === 0`, it displays an industrial access-denied screen with a direct link back to the catalog. |
| **4** | Refreshing the page mid-cart | If a user refreshed the page, the cart reloaded from storage, but if a product's stock had changed in the catalog, stale quantities could exceed stock. | Enhanced `getInitialState()` to validate deserialized `localStorage` items against the live catalog data array, recalculating math and dropping invalid/deleted SKUs. |
| **5** | Rapid clicking of quantity +/- buttons | Rapidly spamming the minus button could dip the quantity below 1 or into negative integers, and spamming plus exceeded warehouse availability. | Clamped quantity inputs in both `QuantitySelector.jsx` and `cartReducer` with `Math.max(1, Math.min(newQty, product.stock))`. Added input sanitization preventing `NaN` or non-numeric characters. |
| **6** | Navigating back from checkout to cart to adjust quantities | The checkout order review did not automatically update if quantities were adjusted without refreshing. | Connected checkout review directly to `useCart()` global context so any adjustments made in the cart automatically reflect in real-time on the checkout manifest summary. |
| **7** | Product with zero stock (`PT-AIR-12TH`) | The Pneumatic Impact Wrench had 0 stock, but the "Add to Cart" button was still clickable. | Updated `ProductCard.jsx` and `ProductDetail.jsx` to render an `Out of Stock` warning badge, disable the button, set cursor to `not-allowed`, and guard the reducer against zero-stock additions. |

---

## 6. What I Would Improve With More Time

1. **ERP / Warehouse API Integration**: Replace the client-side `localStorage` with a live PostgreSQL / Supabase backend connected to an ERP system (like SAP or NetSuite) using WebSockets for real-time yard bay inventory updates.
2. **Stripe Commercial Invoicing**: Add Stripe Terminal / Payment Element for instant contractor credit card authorizations and ACH bank transfer support.
3. **Contractor Accounts & Jobsite Allocation**: Enable contractors to save multiple jobsite profiles (e.g. "Site 14: Tower A", "Site 18: Highway 71 Bypass") and assign purchase orders (PO numbers) to each shipment.

---

## 7. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Build for production (verified clean build)
npm run build

# 4. Run automated test suite (verifies all 7 edge cases)
node test-suite.js
```

---

## 8. Site Architecture & Page States

- **`/` (Depot Home)**: Industrial hero, live dispatch telemetry banner, 4 department blocks, featured heavy products row, and contractor trust specifications.
- **`/shop` (Catalog Manifest)**: Full 19-product grid with desktop persistent filter sidebar, mobile filter drawer, keyword search, price slider, and category selector.
- **`/product/:id` (Product Detail)**: Engineering specifications table, live yard bay locator, stock quota warnings, bounded quantity selector, and related items.
- **`/cart` (Active Manifest)**: Line item review, quantity increment/decrement, remove actions, logistics selector (Knuckle-Boom Flatbed $75 vs Direct Depot Pickup FREE), and subtotal computation.
- **`/checkout` (Contractor Settlement)**: Full Zod validated form (Name, Email, Phone, Address, City, Postal Code, Notes, Trade Account/PO), empty cart barrier, and order simulation.
- **`/confirmation` (Dispatch Manifest)**: Detailed order confirmation with generated order number (`ORD-XXXXXX-XXXX`), itemized billing, contractor delivery staging details, and bill-of-lading print capability. Cart automatically cleared.
