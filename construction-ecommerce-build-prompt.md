# BUILD PROMPT — Construction Materials & Hardware Storefront (Week 3)

Copy this into your AI coding tool as the master instruction. Build in phases (marked `[PHASE BREAK]`) — don't let it generate the whole cart + checkout logic in one shot, or you won't understand your own state flow well enough to explain it in the video.

---

## ROLE & CONTEXT

You are a senior front-end engineer who has built real e-commerce storefronts for B2B/trade suppliers (think: how a contractor orders materials online, not how a consumer buys sneakers). You understand that a construction-materials buyer wants clarity, stock information, and speed — not decorative flourishes. You are explicitly building this to avoid the generic "Shopify template" look.

## PROJECT BRIEF

Invent a real-sounding construction firm/supplier name (not "Construction Company Inc.") and a one-line positioning statement. Build a working storefront selling **building materials & hardware**: cement/aggregates, hand tools, power tools, fittings & fasteners, and paint/finishes. Invent 15-20 real-sounding products across these 4-5 categories with plausible names, prices, unit types (per bag, per box, per unit, per litre), and stock counts. No "Lorem ipsum," no "Product 1," no placeholder pricing like "$XX.XX."

## SCOPE STATEMENT (write this yourself before generating any code — the task requires it)

Before touching the AI tool, write 4-6 lines stating exactly what you will build and how this differs from Week 1 (real estate portfolio site) and Week 2 (dev agency marketing site). Example structure — write your own, don't copy this verbatim:
> "This project is a functional e-commerce storefront, not a marketing site — the core challenge is application logic (cart state, quantity management, checkout flow) rather than layout and animation. Unlike Week 1 and 2, there is no hero/brand storytelling focus; success here is measured by whether the cart and checkout actually work correctly under edge cases, not visual polish alone."

Keep this — it goes directly into your README.

## TECH STACK (non-negotiable, and here's why)

- **React** (Vite)
- **Tailwind CSS** as the primary styling tool — no UI component library
- **React Router** for pages
- **React Context API + `useReducer`** for cart state — NOT Redux Toolkit. A shopping cart with add/remove/update-quantity/clear actions is the exact problem `useReducer` was designed to solve: a small, well-defined set of actions transforming one object. Redux Toolkit adds a store, slices, and provider boilerplate to solve problems at a scale this project doesn't have (multiple unrelated global state domains, middleware, dev-tools time-travel debugging). Using it here would be over-engineering — reviewers who know React will notice a Context/reducer solution as the *correct* choice, not a lesser one.
- **localStorage** to persist the cart across page refreshes (read on mount, write on every cart change)
- **React Hook Form + Zod** for the checkout form validation
- Deployable as a static build to **Vercel**

## THE "NO AI SLOP" RULE — CONSTRUCTION/INDUSTRIAL VERSION

This is a different failure mode than a marketing site's AI-slop — here it's "generic Shopify starter template" slop. Avoid all of the following:

**Banned patterns:**
- Rounded-pill "Add to Cart" buttons in a soft pastel color
- Product cards that are just: image placeholder, name, price, star rating, identical rounded-2xl shadow card, repeated in a perfect 3-4 column grid with no visual hierarchy
- A cart icon badge with a bouncy pastel notification dot
- Generic "Free Shipping / 24-7 Support / Secure Checkout" trust-badge row with stock icons
- Confetti or celebratory animation on "add to cart" or order confirmation — this is a trade supplier, not a lifestyle brand
- Default Tailwind blue/indigo as the primary action color
- A checkout form with generic floating labels and no field grouping or visual structure
- Star ratings/review counts with no actual review content behind them (fake ratings with nothing supporting them read as filler)

**What to do instead:**
- Palette: concrete gray / near-black / off-white base, with **safety-orange** as the single accent color (used for CTAs, active states, stock-alert badges) — this is a deliberate industrial signal, not decoration
- Typography: a bold, blocky, slightly condensed sans for headings (e.g. "Archivo Black," "Barlow Condensed," or similar) paired with a plain readable sans for body/product data — reinforces "hardware supplier," not "boutique brand"
- Product cards: sharp corners (no `rounded-2xl`), thin 1px borders instead of soft shadows, clear unit pricing (e.g. "$8.40 / 40kg bag") and a visible **stock count or "Low stock" flag** — this is functional information a real buyer needs, and including it also gives you real edge cases to test later
- Category browsing should feel like a parts catalog: a persistent left-side filter (category, price range, in-stock only) on desktop, collapsing to a filter drawer on mobile — not just a scrolling grid
- "Add to Cart" should give a small, restrained confirmation (a toast or an inline state change on the button — "Added ✓" for 1.5s) — not a full modal or animation
- Use a subtle concrete-texture or grain background on section dividers/hero if you want visual texture, instead of a gradient blob

## SITE ARCHITECTURE

1. **Home** — brief hero (firm name, positioning, one CTA to shop), featured/best-selling products row, category tiles (4-5 categories as distinct visual blocks, not icon circles), a short trust section (real specifics: "Same-day dispatch on in-stock orders," "Trade accounts available" — not generic badges).
2. **Shop/Products (listing page)** — full product grid with the filter sidebar/drawer described above, sort control (price low-high, high-low, name), pagination or "load more" if you have 15-20+ products.
3. **Product Detail page** — individual product route (`/product/:id`), full description, unit price, quantity selector (respecting stock limits), "Add to Cart" action, and related products from the same category.
4. **Cart page** — line items with quantity controls (increment/decrement/remove), per-line and running total, empty-cart state (not just a blank page — a clear message + "Continue Shopping" link), a "Proceed to Checkout" CTA that's disabled/redirects if cart is empty.
5. **Checkout page** — shipping/billing form (name, address, phone, email) validated with Zod, an order summary sidebar showing cart contents and total, a "Place Order" action.
6. **Order Confirmation page/state** — after "Place Order," show an order number (generate a fake one, e.g. timestamp-based), summary of what was ordered, and clear the cart. This can be a route (`/confirmation`) or a state swap on the checkout page — your choice, but make it a real page state, not an `alert()`.

Consistent nav (with a live cart item-count badge) and footer across all pages.

## CART LOGIC SPEC (this is the core engineering of the project — get this right)

Implement with `useReducer` inside a `CartContext`:
- Actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`
- Adding a product already in the cart increases its quantity rather than creating a duplicate line
- Quantity cannot go below 1 (use remove instead) or above the product's available stock — show a message when the limit is hit, don't just silently cap it
- Cart total recalculates correctly on every change (unit price × quantity, summed)
- Cart state persists on page refresh via localStorage (write in a `useEffect` on state change, read once on provider mount)
- Removing the last item should trigger the proper empty-cart UI, not a broken layout

## CHECKOUT FORM SPEC

- Fields: Full Name, Email, Phone, Delivery Address (street, city, postal code), optional Order Notes
- Zod schema validation: required fields, email format, phone format check, inline errors on blur
- "Place Order" disabled while form is invalid or cart is empty
- On successful submit: simulate a brief loading state (`setTimeout`), then move to confirmation and clear the cart — note in a code comment where a real order API/payment gateway would be wired in

## EDGE CASES YOU MUST TEST AND DOCUMENT (task requires this explicitly)

Test each of these, note what broke and how you fixed it — this becomes part of your README/changelog:
1. Adding more of an item than is in stock
2. Submitting checkout with an empty or malformed field (each field, one at a time)
3. Removing all items from the cart and trying to reach checkout directly by URL
4. Refreshing the page mid-cart (does it persist correctly via localStorage?)
5. Rapid clicking of quantity +/- buttons (does state stay consistent, no negative/NaN quantities?)
6. Navigating back from checkout to the cart and changing quantities — does checkout's order summary reflect the update?
7. A product with zero stock — is it clearly marked unavailable / "Add to Cart" disabled?

## RESPONSIVE REQUIREMENTS

- Breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Filter sidebar becomes a slide-out/bottom-sheet drawer on mobile, not a squeezed sidebar
- Product grid: 1 column mobile, 2 tablet, 3-4 desktop
- Cart and checkout forms must be fully usable on mobile — no horizontal scroll, adequate touch targets on quantity controls

## PERFORMANCE & ACCESSIBILITY

- Semantic HTML, one `h1` per page, proper form labels (not placeholder-only inputs)
- Keyboard-accessible quantity controls and cart actions, visible focus states
- Alt text on all product images
- Run Lighthouse, fix at least 2 flagged issues

## PROJECT STRUCTURE

```
/src
  /components   (Nav, Footer, ProductCard, QuantitySelector, CartLineItem, FilterSidebar)
  /pages        (Home, Shop, ProductDetail, Cart, Checkout, Confirmation)
  /context      (CartContext.jsx — provider + reducer)
  /data         (products.js — your 15-20 invented products, structured with id, name, category, price, unit, stock, description)
  /hooks        (useCart.js — convenience hook wrapping CartContext)
App.jsx, main.jsx
```

## BUILD ORDER (phases)

1. Scaffold Vite + React + Tailwind, set up color tokens/fonts, build `products.js` with real data, build Nav/Footer shell.
2. Build `CartContext` + reducer in isolation — test it with console logs or a temporary debug page before wiring up any UI. Confirm add/remove/update/persist all work correctly first.
3. Build Home + Shop/listing pages with filtering and sorting.
4. Build Product Detail page, wire "Add to Cart" to the real context.
5. Build Cart page fully, test every cart interaction against the edge-case list above.
6. Build Checkout page + Zod validation + Confirmation state.
7. Responsive pass across all pages.
8. Lighthouse audit + fixes.
9. Full click-through + form-submission QA pass.

`[PHASE BREAK]` — after step 2, stop and manually verify the cart logic works correctly (even with placeholder UI) before building any product-facing pages on top of it. This is the part most likely to have subtle bugs, and it's easier to fix in isolation.

## DOCUMENTATION REQUIREMENTS (task-mandated, write this yourself in your own words after building — don't have the AI write it wholesale)

Your README must answer, in plain language a hiring manager could follow with no context:
1. **What you built and why** — the storefront concept, the firm, the product categories
2. **Tools and techniques used** — React, Tailwind, Context+useReducer (and why that choice over Redux, in your own words), React Hook Form + Zod, localStorage persistence
3. **What you tested and what you found** — walk through the edge-case list above with what actually broke on your first pass and how you fixed it (this is your changelog — keep it honest, not polished-sounding)
4. **One thing you'd improve with more time** — e.g. real payment integration, a backend/database instead of localStorage, user accounts and order history

Also include: your scope statement, your 3-5 competitor reference sites with one line each on what you noticed, and screenshots of the site at each major build stage (empty cart, filled cart, checkout, confirmation, mobile view).

## DEFINITION OF DONE

- All 6 pages/states working, nav cart badge updates live
- Cart math is always correct, persists on refresh, respects stock limits
- Checkout form validates properly, produces a real confirmation state
- All 7 edge cases tested and documented with fixes
- Responsive at 375px, 768px, 1440px
- Lighthouse run, 2+ issues fixed
- README covers all 4 required documentation points plus scope statement, references, and screenshots
- No console errors, no broken links, no placeholder text anywhere in the final build

---

### Before you start building (not part of the AI prompt — for you):
1. Look at 3-5 real trade/hardware supplier sites (Home Depot Pro, Ferguson, Grainger, a local building-materials supplier) — note specifically how they show stock, unit pricing, and bulk quantities. These are B2B patterns, and copying that instinct (not their visuals) is what makes this feel real instead of like a student e-commerce demo.
2. Decide your 15-20 products and categories on paper first — trying to invent believable product data live in the AI chat produces exactly the kind of vague, generic entries that read as AI-generated.
