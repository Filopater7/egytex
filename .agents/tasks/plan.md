# Implementation Plan — EgyTex Egyptian Food & Desserts Redesign

> **Constraint reminder (read before every item):**
> - Never introduce `teal-` anywhere — every teal class must become its amber/gold equivalent.
> - Never add pages, routes, or features — only change colors, content text, and category slugs/labels.
> - Keep all `useState`, `useRouter`, `fetch`, and cart logic 100% intact.
> - Build/type-check command: `cd "e:\websites\EGY TEX" && npx tsc --noEmit`

---

- [ ] 1. **Update the Category type and CATEGORIES array in `src/lib/products.ts`**

  Replace the 7-value `Category` union type with only `"sweet-food" | "savory-food"`.
  Replace the entire `CATEGORIES` array with exactly 2 entries:
  ```
  { slug: "sweet-food",  label: "Sweet Food",   description: "Desserts, cakes, pastries & sweets", icon: "🍮" }
  { slug: "savory-food", label: "Savory Food",   description: "Meals, sandwiches & savory dishes",  icon: "🍽️" }
  ```
  Keep `getCategoryLabel` and `formatPrice` functions completely unchanged.
  Also update `formatPrice` to use `currency: "EGP"` and `locale: "ar-EG"` — wait, the spec says "keep formatPrice unchanged". Leave formatPrice as-is; the price label change is only in the admin form field label (item 14 below).

  Files: `src/lib/products.ts`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors (this will surface all downstream type breakages that the remaining items must fix).

---

- [ ] 2. **Replace `src/data/products.json` with 12 Egyptian food products**

  Write the full JSON array below. Keep the same field structure (`id`, `name`, `description`, `fullDescription`, `price`, `image`, `category`, `stock`, `isNew`, `isFeatured`, `createdAt`).
  Use `category: "sweet-food"` for the 6 sweet items, `category: "savory-food"` for the 6 savory items.
  Use placehold.co images with warm colors as specified.
  Counts: at least 6 `isNew: true`, at least 4 `isFeatured: true`.

  Full product list:

  **Sweet Food (6):**
  | id | name | price | isNew | isFeatured | image |
  |----|------|-------|-------|------------|-------|
  | `kunafa-bil-qeshta` | Kunafa bil Qeshta | 85 | true | true | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Kunafa%20bil%20Qeshta` |
  | `chocolate-fudge-cake` | Chocolate Fudge Cake | 150 | false | true | `https://placehold.co/600x450/1C1400/F0C040/png?text=Chocolate%20Fudge%20Cake` |
  | `baklava-box-12` | Baklava Box (12 pcs) | 120 | true | true | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Baklava%20Box` |
  | `om-ali` | Om Ali | 70 | true | false | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Om%20Ali` |
  | `birthday-layer-cake` | Birthday Layer Cake | 280 | false | true | `https://placehold.co/600x450/1C1400/F0C040/png?text=Birthday%20Cake` |
  | `cheese-kunafa` | Cheese Kunafa | 95 | true | false | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Cheese%20Kunafa` |

  **Savory Food (6):**
  | id | name | price | isNew | isFeatured | image |
  |----|------|-------|-------|------------|-------|
  | `chicken-shawarma-sandwich` | Chicken Shawarma Sandwich | 65 | true | false | `https://placehold.co/600x450/1C1400/F0C040/png?text=Chicken%20Shawarma` |
  | `grilled-kofta-meal` | Grilled Kofta Meal | 110 | false | false | `https://placehold.co/600x450/1C1400/F0C040/png?text=Grilled%20Kofta` |
  | `cheese-feteer` | Cheese Feteer | 75 | true | false | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Cheese%20Feteer` |
  | `mixed-grill-platter` | Mixed Grill Platter | 195 | true | false | `https://placehold.co/600x450/1C1400/F0C040/png?text=Mixed%20Grill` |
  | `falafel-sandwich` | Falafel Sandwich | 30 | false | false | `https://placehold.co/600x450/C8960C/FFFFFF/png?text=Falafel%20Sandwich` |
  | `rice-grilled-chicken` | Rice with Grilled Chicken | 95 | true | false | `https://placehold.co/600x450/1C1400/F0C040/png?text=Rice%20%26%20Chicken` |

  Write realistic `description` (1 sentence) and `fullDescription` (3–5 sentences) for each.
  Write realistic `createdAt` ISO dates spread across Jan 2026 (e.g. `"2026-01-15T00:00:00Z"` down to `"2026-01-03T00:00:00Z"`).
  Set reasonable `stock` values (5–50).

  Tally check before saving: isNew count ≥ 6 ✓ (kunafa, baklava, om-ali, cheese-kunafa, chicken-shawarma, cheese-feteer, mixed-grill, rice-chicken = 8), isFeatured count ≥ 4 ✓ (kunafa, choc-cake, baklava, birthday = 4).

  Files: `src/data/products.json`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 3. **Update CSS variables in `src/app/globals.css`**

  In the `:root` block, change exactly two lines:
  - `--background: #ffffff;` → `--background: #FFFDF7;`
  - `--foreground: #171717;` → `--foreground: #1C1400;`

  Everything else in the file stays unchanged.

  Files: `src/app/globals.css`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 4. **Redesign `src/components/Navbar.tsx`**

  Keep all logic untouched (`usePathname`, `useCart`, `useState`, `NAV_LINKS`, mobile menu toggle, cart badge count).
  Apply these visual changes only:

  - `<header>`: change `bg-white border-b border-gray-100 shadow-sm` → `bg-[#FFFDF7] border-b border-amber-200 shadow-sm`
  - Logo `<Image>`: change `src="/egytex-logo.jpeg"` → `src="/egytex-logo.png"`, `width={120} height={40}` → `width={130} height={44}`, remove `style={{objectFit: "contain"}}`, add `className="object-contain"`, keep `priority`
  - Desktop nav active state: `text-teal-700 bg-teal-50` → `text-amber-700 bg-amber-50`
  - Desktop nav inactive hover: `hover:text-teal-700 hover:bg-gray-50` → `hover:text-amber-700 hover:bg-amber-50`
  - Cart link hover: `hover:text-teal-700` → `hover:text-amber-700`
  - Cart badge: `bg-teal-600` → `bg-amber-600`
  - Mobile dropdown container: `bg-white` → `bg-[#FFFDF7]`, border stays as-is
  - Mobile nav active: `text-teal-700 bg-teal-50` → `text-amber-700 bg-amber-50`
  - Mobile nav inactive hover: `hover:text-teal-700 hover:bg-gray-50` → `hover:text-amber-700 hover:bg-amber-50`

  Files: `src/components/Navbar.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 5. **Redesign `src/components/Footer.tsx`**

  Full rewrite of JSX content. Keep the 4-column grid structure and `year` variable. Add `import Image from "next/image"`.

  Structure:
  - `<footer>` class: `bg-[#1C1400] text-gray-300 mt-auto`
  - **Column 1 — Brand:** `<Image src="/egytex-logo.png" alt="EgyTex" width={100} height={34} className="object-contain" />` followed by tagline `<p>أجمل الأكلات المصرية — Authentic Egyptian Food & Desserts</p>` in `text-sm text-gray-400 mt-3 leading-relaxed`
  - **Column 2 — Shop:** heading "Shop", links: All Products (`/products`), Categories (`/categories`), New Arrivals (`/products?filter=new`), Featured (`/products?filter=featured`). Hover: `hover:text-amber-400`
  - **Column 3 — Categories:** heading "Categories", links: Sweet Food (`/category/sweet-food`), Savory Food (`/category/savory-food`). Hover: `hover:text-amber-400`
  - **Column 4 — Company:** heading "Company", links: About Us (`/about`), Contact (`/contact`). Hover: `hover:text-amber-400`
  - Bottom bar: `border-t border-gray-800`, left: `© {year} EgyTex Food & Desserts. All rights reserved.`, right: `أجمل الأكلات المصرية`

  Files: `src/components/Footer.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 6. **Redesign `src/components/ProductCard.tsx`**

  Keep all logic (`useCart`, `useState`, `handleAddToCart`, `added` state, disabled-stock logic).
  Apply these visual changes only:

  - `<article>`: `border-gray-100` → `border-amber-100`, `hover:shadow-md` → `hover:shadow-lg hover:border-amber-300`
  - New badge: `bg-teal-600` → `bg-amber-600`
  - Featured badge stays `bg-amber-500` (already correct)
  - Category label span: `text-teal-600` → `text-amber-700`
  - Product name link: `hover:text-teal-700` → `hover:text-amber-700`
  - Price span: `text-gray-900` → `text-amber-800`
  - Add to Cart button (normal state): `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - Add to Cart button (added/green state): stays `bg-green-500` → change to `bg-green-600` (spec says `bg-green-600`)
  - View button: `border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-700` → `border-amber-200 text-amber-700 hover:border-amber-400`

  Files: `src/components/ProductCard.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 7. **Redesign `src/app/page.tsx` (Homepage)**

  Keep all import statements and component structure (`dbGetNewProducts`, `dbGetFeaturedProducts`, `CATEGORIES`, `ProductCard`, `Link`). Replace metadata and all JSX content per spec.

  **Metadata:**
  - `title`: `"EgyTex — أجمل الأكلات المصرية | Food & Desserts"`
  - `description`: `"Authentic Egyptian food and desserts. Fresh kunafa, cakes, shawarma, grilled meals and more. Order online for fast delivery."`

  **Hero section:**
  - `<section>` bg: `bg-gradient-to-br from-[#1C1400] via-[#2D1F00] to-[#3D2B00] text-white overflow-hidden`
  - Decorative circles: `bg-amber-500/10` (both)
  - Badge: `bg-amber-500/20 text-amber-300`, text: `"Fresh items every day"`
  - `<h1>`: `"Everything Delicious,"` / `<span className="text-amber-400">Made Fresh</span>,` / `"Delivered to You."`
  - Subtitle: `"Authentic Egyptian kunafa, cakes, grilled meals, shawarma and more — crafted fresh daily and delivered to your door."` — class `text-amber-100` (replacing `text-teal-100`)
  - Shop Now button: `bg-amber-500 text-[#1C1400] font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition-colors shadow-md` — remove `hover:text-teal-800`
  - Browse Categories button: `border-2 border-amber-400/60 text-amber-200 font-semibold px-6 py-3 rounded-full hover:bg-amber-500/10 transition-colors`
  - Trust badges wrapper: `text-amber-200`; SVG check icons: `text-amber-400`

  **Categories section:**
  - `<section>`: `bg-amber-50 py-16`
  - Category cards: `hover:border-teal-300` → `hover:border-amber-400`; `group-hover:text-teal-700` → `group-hover:text-amber-700`
  - Heading: keep `text-gray-900`; sub: keep `text-gray-500`

  **New Products section:**
  - Label: `text-teal-600` → `text-amber-600`
  - See all link: `text-teal-600 hover:text-teal-800` → `text-amber-600 hover:text-amber-800`

  **Banner section:**
  - `<section>`: `bg-teal-700` → `bg-[#1C1400]`
  - Heading: `"Free Delivery on Orders Over 200 EGP"`
  - Subtitle: keep `text-teal-200` → change to `text-amber-200`
  - Button: `bg-white text-teal-700 hover:bg-yellow-300 hover:text-teal-800` → `bg-amber-500 text-[#1C1400] font-semibold hover:bg-amber-400`

  **Featured Products section:**
  - `<section>`: `bg-gray-50` → `bg-amber-50`
  - Label: stays `text-amber-500` (already correct)
  - See all link: `text-teal-600 hover:text-teal-800` → `text-amber-600 hover:text-amber-800`

  **Why Shop section:**
  - Cards: `bg-gray-50 border-gray-100` → `bg-amber-50 border-amber-100`
  - Update Why Shop card descriptions per spec:
    - "Made Fresh Daily" → `"Every dish is prepared fresh each morning using authentic Egyptian recipes."`
    - "Natural Ingredients" → `"No artificial preservatives. Real flavors, real ingredients, real food."`
    - "Fast Delivery" → `"Orders dispatched within 2 hours. Free delivery over 200 EGP."`
    - "Trusted Quality" → `"Hundreds of happy customers enjoy EgyTex food every day."`

  Files: `src/app/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 8. **Redesign `src/app/about/page.tsx`**

  Keep all imports and JSX structure. Apply these changes:

  - Hero `<section>`: `from-teal-700 to-teal-500` → `from-[#1C1400] to-[#3D2B00]`
  - Hero subtitle: `text-teal-100` → `text-amber-100` (keep text content, but per spec: `"We believe everyone deserves fresh, authentic Egyptian food and desserts — made with love and craft every single day."`)
  - Stats values: `50+` → `30+`, `7` → `2` (categories); `1000+` and `100%` stay the same
  - Stats card bg: `bg-teal-50` → `bg-amber-50`; stat value: `text-teal-700` → `text-amber-700`
  - Values section (What We Stand For): cards already use `bg-white border-gray-100` — keep those but keep border as `border-amber-100` per spec (currently `border-gray-100`, change to `border-amber-100`)
  - CTA heading: `"Ready to taste EgyTex?"` (was `"Ready to try EgyTex?"`)
  - CTA subtitle: `"Browse our full menu of sweet and savory Egyptian favorites."`
  - CTA Shop Now button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - CTA Get in Touch button: `border-teal-600 text-teal-600 hover:bg-teal-50` → `border-amber-600 text-amber-600 hover:bg-amber-50`

  Files: `src/app/about/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 9. **Update `src/app/categories/page.tsx`**

  Keep all imports and JSX structure. Apply these changes:

  - `<h1>`: `"Categories"` → `"Our Menu"`
  - Subtitle `<p>`: keep `"Browse our menu by category"` (already matches spec)
  - Metadata `title`: `"Product Categories"` → `"Our Menu — EgyTex"`
  - Metadata `description`: update to `"Browse our Egyptian food menu by category — sweet food and savory food, made fresh daily."`
  - Category cards: `hover:border-teal-200` → `hover:border-amber-300`; `hover:shadow-md` stays
  - `<h2>` in card: `group-hover:text-teal-700` → `group-hover:text-amber-700`
  - Count `<p>`: `text-teal-600` → `text-amber-600`

  Files: `src/app/categories/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 10. **Update `src/app/products/page.tsx`**

  Keep all imports and component structure. Apply these changes:

  - `<h1>`: `"Shop All Products"` → `"Our Menu"`
  - Subtitle `<p>`: `"Quality household and bathroom essentials, all in one place."` → `"Fresh Egyptian food and desserts, made daily."`
  - Metadata `title`: `"Shop All Products"` → `"Our Menu — EgyTex"`
  - Metadata `description`: update to `"Browse our full menu of fresh Egyptian food and desserts. Filter by category, sort by price, and order today."`

  Files: `src/app/products/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 11. **Update `src/app/products/_components/ProductsClient.tsx`**

  Keep all logic (state, filters, sort, `useMemo`). Replace all teal color classes with amber equivalents:

  - `focus:ring-teal-400` → `focus:ring-amber-400` (occurs on the search `<input>` and sort `<select>`)
  - Active category button: `bg-teal-50 text-teal-700` → `bg-amber-50 text-amber-700`
  - Active filter button: `bg-teal-50 text-teal-700` → `bg-amber-50 text-amber-700`
  - Reset button: `text-teal-600 hover:text-teal-800` → `text-amber-600 hover:text-amber-800`
  - "Clear all filters" button in empty state: `text-teal-600` → `text-amber-700`

  Files: `src/app/products/_components/ProductsClient.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 12. **Update `src/app/products/[id]/page.tsx`**

  Keep all logic and structure. Replace teal with amber:

  - Breadcrumb links hover: `hover:text-teal-600` → `hover:text-amber-700` (all 3 `<Link>` elements in the breadcrumb)
  - New badge: `bg-teal-600` → `bg-amber-600`
  - Category badge link: `text-teal-600 bg-teal-50 hover:bg-teal-100` → `text-amber-700 bg-amber-50 hover:bg-amber-100`
  - "You Might Also Like" `<h2>`: `text-gray-900` → `text-[#1C1400]` (already `text-gray-900`, change to spec value)

  Files: `src/app/products/[id]/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 13. **Update `src/app/products/[id]/_components/AddToCartSection.tsx`**

  Keep all logic (`useCart`, `useState`, `qty`, `handleAdd`, `cartItem`). Replace teal with amber:

  - Add to Cart button (normal state): `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - `cartItem` already-in-cart note: `text-teal-600` → `text-amber-600`
  - Added/success state stays `bg-green-500` — change to `bg-green-600` for consistency with ProductCard

  Files: `src/app/products/[id]/_components/AddToCartSection.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 14. **Update `src/app/cart/page.tsx`**

  The current file uses no teal colors; `h1` reads "Shopping Cart" and title is "Your Cart" — both are acceptable, no changes needed per spec (spec says "check and update title/heading if needed"). Leave file unchanged.

  Files: `src/app/cart/page.tsx` — no edit needed.

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 15. **Update `src/app/cart/_components/CartClient.tsx`**

  Keep all logic (`useCart`, `formatPrice`, quantity controls, clear cart, remove item). Replace teal with amber and update content:

  - Empty cart "Start Shopping" button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - Item name link hover: `hover:text-teal-700` → `hover:text-amber-700`
  - "Continue Shopping" link: `text-teal-600 hover:text-teal-800` → `text-amber-700 hover:text-amber-900`
  - Free shipping promo `<p>`: `text-teal-600 bg-teal-50` → `text-amber-700 bg-amber-50`; update threshold text: `Add {formatPrice(50 - totalPrice)} more for free shipping!` — the `shipping` logic currently uses `totalPrice >= 50 ? 0 : 4.99`. Update the threshold to 200 EGP: `const shipping = totalPrice >= 200 ? 0 : 0;` — wait, the spec says change shipping threshold to 200 EGP. Currently: `const shipping = totalPrice >= 50 ? 0 : 4.99`. Change to: `const shipping = 0;` is wrong. The spec says "Shipping threshold: change to 200 (EGP), update message text". So change to: `const shipping = totalPrice >= 200 ? 0 : 15;` (15 EGP flat fee is reasonable). Update the promo text to read: `` Add {formatPrice(200 - totalPrice)} more for free delivery! `` and the threshold check to `shipping > 0`.
  - Order total: `text-teal-700` → `text-amber-700`
  - Proceed to Checkout button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - Checkout alert message: change `"Checkout coming soon! Thank you for shopping with Daily Essentials Store."` → `"Checkout coming soon! Thank you for shopping with EgyTex!"`

  Files: `src/app/cart/_components/CartClient.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 16. **Update `src/app/contact/page.tsx`**

  Keep form component import and grid structure. Apply these changes:

  - Metadata `description`: `"Get in touch with the EgyTex team. We're here to help with your orders and questions."`
  - `<h1>`: already `"Contact Us"` — keep
  - Subtitle `<p>`: `"We typically reply within 1–2 business days."` → `"We're here to help with your orders and questions."`
  - Contact info array — replace all 4 entries:
    ```
    { icon: "📧", title: "Email",    lines: ["info@egytex.com", "We reply within a few hours"] }
    { icon: "📞", title: "Phone",    lines: ["+20 100 000 0000", "Sat–Thu, 10 am–10 pm"] }
    { icon: "📍", title: "Address",  lines: ["Cairo, Egypt"] }
    { icon: "🕑", title: "Business Hours", lines: ["Saturday–Thursday: 10 am–10 pm", "Friday: 12 pm–10 pm"] }
    ```

  Files: `src/app/contact/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 17. **Update `src/app/admin/layout.tsx`**

  Keep layout structure, `AdminNav`, and `<main>`. Apply:

  - Add `import Image from "next/image"` at top
  - Metadata `title.default`: `"Admin — Daily Essentials Store"` → `"Admin — EgyTex"`
  - `<header>` class: `bg-gray-900` → `bg-[#1C1400]`
  - Brand area: remove `<span className="text-lg font-bold text-teal-400">DES</span>`, replace with `<Image src="/egytex-logo.png" alt="EgyTex" width={90} height={30} className="object-contain" />`
  - "Admin Panel" `<span>`: `text-gray-300` → `text-amber-200`
  - "View Store" `<Link>`: `text-gray-400 hover:text-white` → `text-amber-400 hover:text-white`

  Files: `src/app/admin/layout.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 18. **Update `src/app/admin/_components/AdminNav.tsx`**

  Keep all logic (`usePathname`, `LINKS` array, active detection). Replace teal with amber:

  - Active link: `bg-teal-600 text-white` → `bg-amber-600 text-white`
  - Sidebar background `bg-gray-800` stays unchanged (dark sidebar is correct)

  Files: `src/app/admin/_components/AdminNav.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 19. **Update `src/app/admin/page.tsx`**

  Keep all data logic (`dbGetAllProducts`, stats, `byCat`, `recent`). Apply:

  - Metadata `title`: `"Dashboard"` → `"Dashboard — EgyTex Admin"`
  - "Total Products" stat card: `bg-teal-50 text-teal-700` → `bg-amber-50 text-amber-700`
  - Progress bar fill: `bg-teal-500` → `bg-amber-500`
  - "View all" link: `text-teal-600` → `text-amber-600`
  - "+ Add Product" button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - Edit link per product: `text-teal-600` → `text-amber-600`

  Files: `src/app/admin/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 20. **Update `src/app/admin/products/_components/AdminProductsClient.tsx`**

  Keep all logic (search, category filter, delete flow, table rendering). Replace teal with amber:

  - Search input: `focus:ring-teal-400` → `focus:ring-amber-400`
  - Category select: `focus:ring-teal-400` → `focus:ring-amber-400`
  - "+ Add Product" button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - "New" flag badge in table: `bg-teal-100 text-teal-700` → `bg-amber-100 text-amber-700`
  - Edit link: `text-teal-600 hover:text-teal-800` → `text-amber-600 hover:text-amber-800`

  Files: `src/app/admin/products/_components/AdminProductsClient.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 21. **Update `src/app/admin/products/_components/ProductForm.tsx`**

  Keep all logic (state, `handleChange`, `handleSubmit`, `usePlaceholder`, validation). Apply:

  - `EMPTY.category`: `"desserts"` → `"sweet-food"`
  - Price field label: currently rendered as `` `Price (USD)${pricePreview ? ` — ${pricePreview}` : ""}` `` — change `USD` to `EGP` in the label string: `` `Price (EGP)${pricePreview ? ` — ${pricePreview}` : ""}` ``
  - Placeholder image in `usePlaceholder()`: `0d9488/ffffff` → `C8960C/FFFFFF`
  - `INPUT` const at bottom: `focus:ring-teal-400` → `focus:ring-amber-400`
  - "Mark as New" checkbox: `accent-teal-600` → `accent-amber-600`; label text `text-teal-600` → `text-amber-600`
  - Submit button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - "View on store" link: `text-teal-600` → `text-amber-600`

  Files: `src/app/admin/products/_components/ProductForm.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 22. **Check `src/app/admin/products/_components/DeleteButton.tsx`**

  This file was read during exploration — it contains no teal colors. Its buttons use `text-red-600`, `bg-red-600`, and `border-gray-200`. No changes needed.

  Files: `src/app/admin/products/_components/DeleteButton.tsx` — no edit needed.

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 23. **Update `validCategories` in both API route handlers**

  In `src/app/api/products/route.ts`: Replace the `validCategories` array from:
  ```ts
  ["desserts", "cakes", "pastries", "savory-food", "sandwiches", "meals", "other"]
  ```
  to:
  ```ts
  ["sweet-food", "savory-food"]
  ```

  In `src/app/api/products/[id]/route.ts`: Apply the same replacement.

  Both files already import `Category` from `@/lib/products` — the narrowed union type will be satisfied automatically once `src/lib/products.ts` is updated in item 1.

  Files: `src/app/api/products/route.ts`, `src/app/api/products/[id]/route.ts`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 24. **Update `src/app/category/[slug]/page.tsx`**

  Keep all logic (`generateMetadata`, `dbGetProductsByCategory`, `CATEGORIES`, `notFound`). Replace teal with amber:

  - Breadcrumb links: `hover:text-teal-600` → `hover:text-amber-700` (both `<Link>` elements)
  - Other-categories pill links: `hover:border-teal-300 hover:text-teal-700` → `hover:border-amber-300 hover:text-amber-700`
  - Empty state "Browse all products" link: `text-teal-600` → `text-amber-600`

  Files: `src/app/category/[slug]/page.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 25. **Update `src/app/not-found.tsx`**

  Keep structure. Replace teal with amber:

  - "Go Home" button: `bg-teal-600 hover:bg-teal-700` → `bg-amber-600 hover:bg-amber-700`
  - "Shop Products" button: `border-teal-600 text-teal-600 hover:bg-teal-50` → `border-amber-600 text-amber-600 hover:bg-amber-50`

  Files: `src/app/not-found.tsx`

  Verify: `cd "e:\websites\EGY TEX" && npx tsc --noEmit` — no errors.

---

- [ ] 26. **Final TypeScript check and teal audit**

  Run the full type check. Then do a codebase-wide search for any remaining `teal-` occurrences in `src/` and fix them.

  ```powershell
  cd "e:\websites\EGY TEX"
  npx tsc --noEmit
  ```

  Expected: zero TypeScript errors.

  Also run:
  ```powershell
  Select-String -Path "e:\websites\EGY TEX\src\**\*" -Pattern "teal-" -Recurse
  ```

  Expected: zero matches. If any remain, fix them before this item is considered done.

  Verify: `npx tsc --noEmit` exits with code 0 and no output.

---

## Dependency order summary

Items must be done in this order because downstream TypeScript errors cascade from the type change:

1 → 2 → 3–25 (items 3–25 are independent of each other but all depend on items 1 and 2 being complete first, since item 1 narrows the `Category` type and item 2 makes the data consistent with it) → 26 (final check)

Items 3–25 can each be verified individually with `npx tsc --noEmit` after completion.
