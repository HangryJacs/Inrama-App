# ANTIGRAVITY BUILD PROMPT — InRama Fashion App (Consumer-Facing)

## PROJECT CONTEXT

You are building a mobile-first fashion e-commerce app for **InRama** (inrama.com.au), an Australian women's streetwear brand. InRama is a bold, statement fashion brand designed in Australia by creative designer Amarni Skaf. Their tagline is "Where Sexy Meets Street." They sell via Shopify and position between high-street and designer — elevated streetwear with sultry silhouettes, limited-release drops, and an exclusive community feel.

The client is **Roy Skaf**, who also runs McQuary York (property development). Roy wants this app to function as a **data business first, shopping channel second** — modelled on how Temu captures behavioural data to inform product decisions, but executed with a premium, non-gimmicky aesthetic appropriate for InRama's brand positioning.

The app is built by **ThinkSwift** (thinkswift.au) — a Melbourne-based AI consultancy that builds bespoke operating systems and apps for businesses.

---

## TECH STACK

- **Frontend:** React (mobile-first responsive web app, PWA-ready)
- **Styling:** Tailwind CSS configured with MRDS design tokens
- **Backend:** Supabase (PostgreSQL database, Auth, Realtime, Storage)
- **Deployment:** Vercel (CI/CD from GitHub)
- **E-Commerce Integration:** Shopify Storefront API (product catalogue, cart, checkout) + Shopify Admin API (order sync, customer sync, inventory)
- **Automation:** n8n (notification triggers, abandoned cart flows, data sync workflows)
- **Analytics Events:** Custom event tracking layer writing to Supabase `behavioural_events` table

---

## BRAND & DESIGN

### Visual Identity
All colours, typography, spacing, border radius, shadows, and visual styling are defined in the **Machine Readable Design System (MRDS)** provided separately. Reference the MRDS token files for all design decisions. Do not hardcode any colours, font families, or sizing values — pull everything from the MRDS design tokens.

### Aesthetic Direction
- Dark, editorial, premium. Think high-end fashion magazine meets streetwear culture. NOT a generic e-commerce app. Every screen should feel intentional and curated.
- Full-bleed product photography, model shots. No stock photo feel. Generous image heights.
- The app should feel dense with content but not cluttered — like scrolling through an Instagram feed, not a spreadsheet.

### Tone of Voice
- Confident, bold, slightly provocative but never try-hard
- Short, punchy copy. No filler words.
- Use CAPS for category labels and tags. Sentence case for descriptions.
- The brand speaks like a cool older sister, not a corporation.

---

## DATABASE SCHEMA

### Core Tables

```sql
-- User profiles (extends Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  postcode TEXT,
  state TEXT,
  country TEXT DEFAULT 'AU',
  age_bracket TEXT, -- '18-24', '25-34', '35-44', '45+'
  gender TEXT,
  style_preferences JSONB DEFAULT '{}', -- from onboarding quiz
  size_profile JSONB DEFAULT '{}', -- { tops: 'M', bottoms: '10', shoes: '38' }
  instagram_handle TEXT,
  tiktok_handle TEXT,
  loyalty_tier TEXT DEFAULT 'bronze', -- bronze, silver, gold, platinum
  loyalty_points INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Behavioural event tracking (THE CORE DATA ENGINE)
CREATE TABLE behavioural_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_type TEXT NOT NULL,
  -- Event types: 'page_view', 'product_view', 'collection_view', 'search',
  -- 'wishlist_add', 'wishlist_remove', 'cart_add', 'cart_remove', 'cart_abandon',
  -- 'checkout_start', 'purchase', 'notification_tap', 'notification_dismiss',
  -- 'share', 'referral_send', 'referral_convert', 'review_submit',
  -- 'drop_notify_set', 'drop_view', 'app_open', 'app_close',
  -- 'onboarding_step', 'loyalty_redeem', 'scroll_depth'
  event_data JSONB DEFAULT '{}',
  -- Flexible payload: { product_id, collection_name, search_query, scroll_pct,
  -- duration_seconds, source_screen, notification_id, share_platform, etc. }
  session_id UUID,
  device_type TEXT, -- 'ios', 'android', 'web'
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- User sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  pages_viewed INTEGER DEFAULT 0,
  entry_source TEXT, -- 'organic', 'push', 'email', 'sms', 'referral', 'social'
  device_info JSONB DEFAULT '{}'
);

-- Wishlist
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  shopify_product_id TEXT NOT NULL,
  product_name TEXT,
  product_price DECIMAL(10,2),
  collection_name TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMPTZ
);

-- Orders (synced from Shopify via webhooks)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  shopify_order_id TEXT UNIQUE NOT NULL,
  total_amount DECIMAL(10,2),
  subtotal_amount DECIMAL(10,2),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  discount_code TEXT,
  items JSONB, -- array of { product_id, name, variant, quantity, price }
  is_first_purchase BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending', -- pending, confirmed, shipped, delivered, returned
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Loyalty system
CREATE TABLE loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  points_change INTEGER NOT NULL, -- positive = earned, negative = spent
  balance_after INTEGER,
  source TEXT NOT NULL,
  -- Sources: 'purchase', 'referral_send', 'referral_convert', 'review',
  -- 'birthday', 'social_follow', 'onboarding', 'share', 'bonus', 'redemption'
  description TEXT,
  reference_id TEXT, -- order_id, review_id, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Loyalty rewards catalogue
CREATE TABLE loyalty_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT, -- 'discount_percent', 'discount_fixed', 'free_shipping', 'early_access', 'event_invite', 'styling_session'
  reward_value TEXT, -- '10', '25', etc.
  tier_required TEXT DEFAULT 'bronze', -- minimum tier to unlock
  active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Drops / Limited releases
CREATE TABLE drops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  collection_handle TEXT, -- Shopify collection handle
  drops_at TIMESTAMPTZ NOT NULL,
  preview_image_url TEXT,
  total_pieces INTEGER,
  status TEXT DEFAULT 'upcoming', -- upcoming, live, sold_out, archived
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop notification subscriptions
CREATE TABLE drop_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  drop_id UUID REFERENCES drops(id),
  notify_method TEXT DEFAULT 'push', -- push, email, sms
  notified BOOLEAN DEFAULT FALSE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, drop_id)
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id),
  referred_email TEXT,
  referred_user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- pending, signed_up, first_purchase
  referrer_points_awarded INTEGER DEFAULT 0,
  referred_discount_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted_at TIMESTAMPTZ
);

-- Product reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  shopify_product_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT,
  fit_feedback TEXT, -- 'runs_small', 'true_to_size', 'runs_large'
  size_purchased TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push notification campaigns (for tracking effectiveness)
CREATE TABLE notification_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT,
  type TEXT, -- 'drop', 'sale', 'restock', 'abandoned_cart', 'loyalty', 'general'
  target_segment JSONB, -- { tier: 'gold', last_active_days: 7, etc. }
  sent_at TIMESTAMPTZ,
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_tapped INTEGER DEFAULT 0,
  total_converted INTEGER DEFAULT 0,
  revenue_attributed DECIMAL(10,2) DEFAULT 0
);
```

### Row Level Security
Enable RLS on all tables. Users can only read/write their own data. Admin role can read all data for the dashboard (separate prompt).

### Indexes
```sql
CREATE INDEX idx_events_user_id ON behavioural_events(user_id);
CREATE INDEX idx_events_type ON behavioural_events(event_type);
CREATE INDEX idx_events_timestamp ON behavioural_events(timestamp);
CREATE INDEX idx_events_session ON behavioural_events(session_id);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_loyalty_user ON loyalty_transactions(user_id);
```

---

## APP SCREENS & FEATURES

### 1. Onboarding Flow (First Launch Only)

**Purpose:** Capture explicit user data in exchange for value. Every question earns points or unlocks a benefit.

**Screen 1 — Welcome**
- Full-screen hero image with InRama branding
- "JOIN THE GANG" headline
- "Get 10% off your first order + earn rewards every time you shop"
- "Create Account" button (email/password or Google OAuth via Supabase Auth)
- "Already a member? Sign In" link
- Fine print: "By joining, you agree to our Terms and Privacy Policy" with links

**Screen 2 — Style Quiz (3-4 quick taps)**
- "Help us get to know your vibe" headline
- Step 1: "What's your go-to?" — Grid of 4 style images to tap (Streetwear / Glam / Minimal / Bold). Multiple select allowed. → Saves to `users.style_preferences`
- Step 2: "Your usual sizes?" — Dropdowns for Tops (XS-XL), Bottoms (6-16), Shoes (35-42). → Saves to `users.size_profile`
- Step 3: "Where are you based?" — Postcode input with auto-detect state. → Saves to `users.postcode`, `users.state`
- Step 4: "Stay in the loop?" — Push notification permission prompt with "Get drop alerts before anyone else" messaging. → Saves to `users.push_enabled`
- Progress bar at top. "Skip" option on each step (but incentivise completion: "+50 points for completing your profile")

**Screen 3 — Welcome Reward**
- "You're in. Here's your welcome gift 🎁"
- Display unique discount code: "INRAMA10" or generated unique code
- "Your code: [CODE] — 10% off your first order"
- "Start Shopping" CTA button
- Confetti or subtle animation to celebrate

**Data captured:** Email, password, name, style preferences, sizes, postcode, push permission, age bracket (optional), gender (optional). All consensual, all incentivised.

**Event tracking:** Log `onboarding_step` events for each step completed/skipped to measure funnel drop-off.

---

### 2. Home Screen

**Purpose:** Surface personalised content, drive engagement, and create FOMO around drops.

**Layout (top to bottom):**

1. **Header bar** — InRama wordmark (left), notification bell with unread badge (right), profile avatar (right)

2. **Member status strip** — Compact bar showing: "[Tier] Insider · [X] points · [Y] to next tier" with progress indicator. Tappable → navigates to Rewards screen.

3. **Hero banner** (if active drop upcoming or live) — Full-width card with collection image, countdown timer (if upcoming), "DROPPING [DAY]" tag, collection name, piece count, "Notify Me" or "Shop Now" CTA

4. **Quick action buttons** — Horizontal row of 4: New In, My Wishlist, Rewards, Refer a Friend. Each navigates to respective screen.

5. **"Trending Now"** — Horizontal scrolling product cards (4-6 items). Source: Products with highest `product_view` event count in last 7 days. Each card: product image, name, price, points earned, wishlist heart icon, tag badge (NEW / TRENDING / LOW STOCK).

6. **"Collections"** — 2x2 grid of collection cards. Each: collection image, name, piece count. Tappable → collection product list.

7. **"Picked For You"** — Horizontal scrolling product cards. Source: Recommendations based on user's `style_preferences`, `wishlists`, and `behavioural_events` (products viewed but not purchased, similar to wishlisted items). If insufficient data (new user), show bestsellers.

8. **"Back in Stock"** — Horizontal row of previously sold-out items that are restocked. Show only if user had wishlisted or viewed them.

**Event tracking on this screen:**
- `page_view` with `{ screen: 'home' }` on mount
- `product_view` when any product card is tapped
- `collection_view` when any collection card is tapped
- `notification_tap` when bell is tapped
- `drop_notify_set` when "Notify Me" is tapped on hero banner
- `scroll_depth` at 25%, 50%, 75%, 100% scroll thresholds

---

### 3. Shop Screen

**Purpose:** Full product browsing with category filters and search. Primary purchase path.

**Layout:**
1. **Header** — "Shop" title
2. **Search bar** — With placeholder "Search INRAMA..." Searches product names, descriptions, collections. Log every search query as `search` event with `{ query: '...' }` — this reveals unmet demand.
3. **Filter pills** — Horizontal scrolling: ALL, NEW IN, TOPS, BOTTOMS, DRESSES, DENIM, SWIM, MATCHING SETS, OUTERWEAR, ACCESSORIES, SLEEPWEAR. Tappable to filter. Active filter uses active state styling from MRDS.
4. **Sort** — Small dropdown: "Recommended" (default, personalised), "New In", "Price: Low-High", "Price: High-Low", "Best Selling"
5. **Product grid** — 2 columns. Each card: product image (tall aspect ratio, ~1.4:1), product name, price in AUD, points earned ("+ [X] pts"), tag badge, wishlist heart toggle, "ADD" quick-add button (opens size selector bottom sheet)
6. **Infinite scroll** — Load more products as user scrolls. Paginate via Shopify Storefront API cursor-based pagination.

**Product Detail Screen** (tapping a product card):
- Full-screen product image carousel (swipe through multiple images from Shopify)
- Product name, price, points earned
- Size selector (pills/buttons, with "Size Guide" link)
- "Add to Bag" primary CTA
- "Add to Wishlist" secondary CTA
- Product description (from Shopify)
- Fit feedback from reviews: "80% say true to size"
- Reviews section (from `reviews` table)
- "You might also like" — Related products (same collection or similar style)

**Shopify Integration:**
- Products pulled from Shopify Storefront API — collections, products, variants, images, pricing, inventory
- Cart managed via Shopify Storefront API `cartCreate`, `cartLinesAdd`, `cartLinesRemove`
- Checkout redirects to Shopify hosted checkout (handles payment processing, Afterpay, shipping)
- Order completion triggers Shopify webhook → n8n → writes to Supabase `orders` table and awards loyalty points

**Event tracking:**
- `product_view` with `{ product_id, product_name, collection, price, source_screen }` and `duration_seconds` (time spent on product detail page)
- `search` with `{ query, results_count }`
- `wishlist_add` / `wishlist_remove`
- `cart_add` with `{ product_id, variant, size, price }`
- `cart_abandon` (triggered by n8n if cart has items and no checkout_start within 2 hours)
- `checkout_start`

---

### 4. Drops Screen

**Purpose:** Build hype around limited releases. Create urgency and FOMO. Reward loyalty members with early access.

**Layout:**
1. **Header** — "Drops" title, subtitle: "Limited releases. Once they're gone, they're gone."
2. **Upcoming drop hero** (if exists) — Large card with:
   - Collection preview image (blurred or teaser if pre-reveal)
   - "UPCOMING DROP" tag with pulsing indicator dot
   - Collection name in large display type
   - Description (piece count, style description)
   - **Live countdown timer** (days, hours, minutes, seconds — updates every second)
   - "🔔 NOTIFY ME WHEN IT DROPS" button → creates `drop_subscriptions` record
   - If user is Gold/Platinum tier: "You get 24hr early access ⚡" badge
3. **Live drops** (if any) — "LIVE NOW" tag, direct "Shop Now" link to collection
4. **Past drops** — List of previous drops with: image thumbnail, name, date, status ("80% SOLD" or "SOLD OUT"), tappable to browse remaining stock

**Drop notification flow (via n8n):**
1. User subscribes to drop notification → saved in `drop_subscriptions`
2. n8n scheduled check: When `drops.drops_at` is reached, trigger notification workflow
3. For Gold/Platinum users: Send notification 24 hours early (early access perk)
4. For all subscribers: Send push notification at drop time
5. Track `notification_tap` events to measure drop notification effectiveness

**Event tracking:**
- `drop_view` with `{ drop_id, drop_name }`
- `drop_notify_set` with `{ drop_id }`
- `notification_tap` with `{ notification_type: 'drop', drop_id }`

---

### 5. Rewards Screen

**Purpose:** Loyalty program hub. Shows points, tier progress, ways to earn, and rewards to redeem. Gamified but elevated.

**Layout:**
1. **Points card** — Premium card with gradient background and accent styling (per MRDS):
   - "YOUR POINTS" label
   - Large animated point count
   - Current tier badge (BRONZE / SILVER / GOLD / PLATINUM)
   - Progress bar to next tier with "[X] / [Y]" label
   - "Earn 1 point per $1 spent · Bonus points on drops"

2. **Earn Points section** — Horizontal scrolling cards:
   - Purchase: 1pt per $1 spent
   - Refer a Friend: +100 pts (when friend makes first purchase)
   - Write a Review: +25 pts per review
   - Birthday: +50 pts (auto-awarded annually)
   - Follow on Instagram: +15 pts (one-time, verified via handle entry)
   - Share a Product: +10 pts per share
   - Complete Profile: +50 pts (if onboarding quiz wasn't fully completed)

3. **Unlock Rewards section** — Vertical list of rewards from `loyalty_rewards` table:
   - Each shows: emoji icon, title, description, points required
   - If unlocked (user has enough points): highlighted border, "REDEEM" button
   - If locked: grayed out with points needed
   - If already redeemed: "USED" badge with date

**Tier system:**
- **Bronze** (0-199 pts): Welcome gift (10% off first order), basic rewards access
- **Silver** (200-499 pts): Free express shipping on all orders
- **Gold** (500-999 pts): Early access to drops (24hrs before public), exclusive member-only products
- **Platinum** (1000+ pts): VIP event invites, 1-on-1 styling session, birthday gift, priority customer support

**Points earning rules (configured in n8n workflows):**
- On `purchase` event: Award `floor(order_total)` points
- On `referral_convert` event (referred user makes first purchase): Award 100 points to referrer
- On `review_submit` event: Award 25 points (after review approved)
- Birthday: n8n cron job checks `users` for birthdays, awards 50 points, sends push notification
- Social follow: One-time award when user enters valid Instagram handle

**Tier upgrade logic (Supabase function or n8n):**
- After each points award, check total points against tier thresholds
- If tier changes, update `users.loyalty_tier` and send congratulatory push notification

**Event tracking:**
- `loyalty_redeem` with `{ reward_id, points_spent }`
- `page_view` with `{ screen: 'rewards' }`

---

### 6. Profile Screen

**Purpose:** Account management, order history, settings. Also shows user stats to encourage engagement.

**Layout:**
1. **User card** — Avatar (initials if no photo), name, email, tier badge with points
2. **Stats row** — 4 compact boxes: Orders (count), Wishlist (count), Reviews (count), Referrals (count). Tappable to navigate.
3. **Menu list:**
   - Order History → list of orders from `orders` table, tappable to see detail
   - Saved Addresses → Shopify customer address management
   - Payment Methods → Link to Shopify account
   - Size & Fit Preferences → Edit `users.size_profile`
   - Notification Settings → Toggle push, email, SMS preferences
   - Refer a Friend → Shareable referral link/code, list of referral statuses
   - Help & Support → FAQ, contact info, live chat link
   - Log Out
4. **Footer** — "Powered by ThinkSwift" subtle branding

---

### 7. Cart & Checkout

**Cart** — Slide-up bottom sheet or dedicated screen:
- List of cart items (image, name, size, quantity, price)
- Quantity +/- controls
- Remove item (swipe or X button)
- Discount code input field
- Subtotal, discount (if applied), shipping estimate, total
- Points earned for this order: "+[X] points"
- "Checkout" CTA → redirects to Shopify hosted checkout

**Post-purchase flow:**
1. Shopify webhook fires on order completion → n8n catches it
2. n8n writes order to Supabase `orders` table
3. n8n awards loyalty points based on order total
4. n8n sends confirmation push notification
5. n8n checks if this is a referred user's first purchase → awards referrer 100 points
6. App shows order confirmation screen with: order summary, points earned animation, "Share your purchase" social share button (earns +10 pts)

---

## BEHAVIOURAL EVENT TRACKING — IMPLEMENTATION GUIDE

### Event Helper Function

Create a reusable tracking function used across all screens:

```javascript
// utils/tracking.js
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

let currentSessionId = null;

export const startSession = async (userId, entrySource = 'organic') => {
  currentSessionId = uuidv4();
  await supabase.from('sessions').insert({
    id: currentSessionId,
    user_id: userId,
    entry_source: entrySource,
    device_info: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    }
  });
  return currentSessionId;
};

export const trackEvent = async (userId, eventType, eventData = {}) => {
  await supabase.from('behavioural_events').insert({
    user_id: userId,
    event_type: eventType,
    event_data: eventData,
    session_id: currentSessionId,
    device_type: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'web',
  });
};

export const endSession = async (pagesViewed) => {
  if (!currentSessionId) return;
  await supabase.from('sessions').update({
    ended_at: new Date().toISOString(),
    duration_seconds: Math.floor((Date.now() - sessionStartTime) / 1000),
    pages_viewed: pagesViewed,
  }).eq('id', currentSessionId);
};
```

### Key Events to Track (Non-Negotiable)

| Event | When | Data Payload |
|---|---|---|
| `app_open` | App/tab becomes active | `{ entry_source }` |
| `app_close` | App/tab loses focus or closes | `{ duration_seconds }` |
| `page_view` | Any screen mounts | `{ screen, previous_screen }` |
| `product_view` | Product detail opens | `{ product_id, product_name, collection, price, source_screen }` |
| `product_view_duration` | Product detail unmounts | `{ product_id, duration_seconds }` |
| `collection_view` | Collection page opens | `{ collection_name, source }` |
| `search` | Search submitted | `{ query, results_count }` |
| `wishlist_add` | Heart tapped | `{ product_id, product_name, price, collection }` |
| `wishlist_remove` | Heart un-tapped | `{ product_id }` |
| `cart_add` | Add to bag tapped | `{ product_id, variant_id, size, price }` |
| `cart_remove` | Item removed from cart | `{ product_id, variant_id }` |
| `checkout_start` | Checkout button tapped | `{ cart_total, item_count }` |
| `purchase` | Order confirmed (via webhook) | `{ order_id, total, items, discount_code }` |
| `scroll_depth` | Scroll thresholds hit | `{ screen, depth_percent }` (25, 50, 75, 100) |
| `notification_tap` | Push notification tapped | `{ notification_type, campaign_id }` |
| `notification_dismiss` | Notification swiped away | `{ notification_type, campaign_id }` |
| `share` | Share button tapped | `{ product_id, platform }` (instagram, whatsapp, copy_link, etc.) |
| `drop_notify_set` | "Notify Me" tapped | `{ drop_id, drop_name }` |
| `referral_send` | Referral link shared | `{ method }` (sms, email, copy) |
| `loyalty_redeem` | Reward redeemed | `{ reward_id, points_spent }` |
| `review_submit` | Review submitted | `{ product_id, rating, has_fit_feedback }` |
| `onboarding_step` | Each onboarding screen | `{ step, completed_or_skipped }` |

---

## SHOPIFY INTEGRATION DETAIL

### Storefront API (Client-Side)

Used for: Product browsing, collections, cart management, checkout initiation.

```graphql
# Example: Fetch products from a collection
query CollectionProducts($handle: String!, $first: Int!, $after: String) {
  collection(handle: $handle) {
    title
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 4) {
            edges {
              node { url altText }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
          tags
        }
        cursor
      }
      pageInfo { hasNextPage }
    }
  }
}
```

### Admin API (Server-Side via n8n)

Used for: Order sync, customer data sync, inventory monitoring, discount code creation.

**Webhook events to capture (configured in Shopify admin):**
- `orders/create` → Write to Supabase `orders`, award loyalty points
- `orders/updated` → Update order status in Supabase
- `orders/fulfilled` → Update status, trigger delivery notification
- `products/update` → If inventory goes from 0 to >0, trigger restock notification for users who wishlisted
- `customers/create` → Sync new customer to Supabase (if they checkout without app account, link later)

---

## n8n AUTOMATION WORKFLOWS

### Workflow 1: Order Processing
Trigger: Shopify `orders/create` webhook
→ Parse order data
→ Match to Supabase user (by email)
→ Insert into `orders` table
→ Calculate loyalty points (1pt per $1)
→ Insert into `loyalty_transactions`
→ Update `users.loyalty_points`
→ Check tier upgrade threshold → update `users.loyalty_tier` if needed
→ Check if user is a referred user making first purchase → award referrer 100 pts
→ Send push notification: "Order confirmed! You earned [X] points 🎉"

### Workflow 2: Abandoned Cart Recovery
Trigger: n8n cron (every 30 minutes)
→ Query Supabase for `cart_add` events with no `checkout_start` within 2 hours
→ For each abandoned cart user:
→ Check if already sent abandonment notification in last 24hrs (avoid spam)
→ Send push notification: "Still thinking about the [Product Name]? It's going fast 🔥"
→ If no response in 4 hours: Send email with cart contents and personalised discount based on loyalty tier
→ Log `notification_campaigns` record for tracking

### Workflow 3: Drop Notification
Trigger: n8n cron (checks `drops.drops_at` every 5 minutes)
→ When drop time reached:
→ Query `drop_subscriptions` for this drop
→ Segment: Gold/Platinum users get notification 24hrs early
→ Send push notifications with deep link to collection
→ Update `drop_subscriptions.notified = true`
→ Log campaign

### Workflow 4: Restock Notification
Trigger: Shopify `products/update` webhook
→ Check if product went from out-of-stock to in-stock
→ Query `wishlists` for users who wishlisted this product
→ Send push notification: "Back in stock! [Product Name] — your size is available 🔔"

### Workflow 5: Birthday Rewards
Trigger: n8n daily cron
→ Query `users` where birthday matches today (if birthday captured)
→ Award 50 loyalty points
→ Send push notification: "Happy birthday! 🎂 50 bonus points have been added to your account"

### Workflow 6: Churn Prevention
Trigger: n8n weekly cron
→ Query users with no `app_open` event in last 14 days
→ Send re-engagement push: "We miss you! Check out what's new at INRAMA 🖤"
→ If no response in 7 more days: Send email with personalised product recommendations based on past behaviour

---

## PWA CONFIGURATION

The app should be installable as a Progressive Web App so users can "download" it to their home screen without going through the App Store.

```json
// manifest.json
{
  "name": "INRAMA",
  "short_name": "INRAMA",
  "description": "Where Sexy Meets Street",
  "start_url": "/",
  "display": "standalone",
  "background_color": "<use primary background colour from MRDS>",
  "theme_color": "<use primary background colour from MRDS>",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Register service worker for offline capability (at minimum: cached app shell, offline fallback page).

---

## FOLDER STRUCTURE

```
/src
├── /components
│   ├── /ui          (Button, Card, Badge, BottomSheet, Tag, Avatar, ProgressBar)
│   ├── /layout      (BottomNav, Header, StatusBar, PageWrapper)
│   ├── /product     (ProductCard, ProductGrid, ProductDetail, SizeSelector)
│   ├── /loyalty     (PointsCard, TierBadge, RewardCard, EarnCard)
│   ├── /drops       (CountdownTimer, DropCard, DropHero)
│   └── /onboarding  (StyleQuiz, SizeSelector, WelcomeReward)
├── /screens
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Drops.jsx
│   ├── Rewards.jsx
│   ├── Profile.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Onboarding.jsx
│   ├── OrderHistory.jsx
│   └── ReferFriend.jsx
├── /hooks
│   ├── useAuth.js
│   ├── useShopify.js
│   ├── useTracking.js
│   ├── useLoyalty.js
│   └── useSession.js
├── /utils
│   ├── supabaseClient.js
│   ├── shopifyClient.js
│   ├── tracking.js
│   └── helpers.js
├── /context
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── TrackingContext.jsx
├── App.jsx
├── index.css (Tailwind directives + MRDS token imports)
└── main.jsx
```

---

## CRITICAL IMPLEMENTATION NOTES

1. **Every user interaction must be tracked.** The behavioural_events table is the most valuable asset in this entire app. Do not skip event tracking on any screen or interaction. When in doubt, track it.

2. **Shopify is the source of truth for products and payments.** Never store product data in Supabase — always fetch from Shopify Storefront API. Supabase stores user data, behavioural data, loyalty data, and order records (synced from Shopify).

3. **The onboarding quiz is non-negotiable.** It's the primary explicit data capture mechanism. Make it fast (under 60 seconds) and rewarding (points + discount).

4. **Push notifications are the retention engine.** The app's ongoing value depends on bringing users back. Every notification must have a clear value proposition and deep link to relevant content.

5. **Performance matters.** Product images should lazy-load. Use Shopify's image CDN with size parameters (append `?width=400` etc.). Skeleton loading states on all data-dependent screens.

6. **All visual styling comes from the MRDS.** Do not hardcode any colours, fonts, spacing, or border radius values. Reference the Machine Readable Design System tokens for all styling decisions.

7. **Mobile-first, always.** Design for 390px width first. Desktop is a bonus, not a priority. Touch targets minimum 44px. Bottom sheet modals over full-page navigations where possible.

8. **Afterpay badge.** InRama uses Afterpay. Show "or 4 interest-free payments of $[X] with Afterpay" on product detail pages and cart.
