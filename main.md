# منطق `main.js` كامل 🧠

خليني أشرحلك كل حاجة في `main.js` من غير كود — **الفانكشنز، الـ Logic، والـ Selectors**.

---

## 🗂️ نظرة عامة على هيكل الملف

`main.js` هيتقسم لـ **6 أقسام** بالترتيب ده:

```5. Init Functions (دوال التهيئة)
6. Event Listener الأساسي
```

خليني أشرح كل قسم بالتفصيل.

---

## 1️⃣ Constants (الثوابت)

### إيه هي؟

قيم ثابتة بتتستخدم في كل الملف. **مش بتتغير**، ومكتوبة مرة واحدة عشان لو احتجت تغيّرها تعدل في مكان واحد.

### الأمثلة:

| الثابت | القيمة | الاستخدام |
|--------|--------|-----------|
| `CART_KEY` | `"aura_cart"` | مفتاح `localStorage` |
| `WISHLIST_KEY` | `"aura_wishlist"` | مفتاح المفضلة |
| `FREE_SHIPPING_THRESHOLD` | `150` | الحد الأدنى للشحن المجاني |
| `TOAST_DURATION` | `4000` | مدة ظهور الـ Toast (ms) |

---

## 2️⃣ Utility Functions (دوال مساعدة)

### 1. `formatPrice(amount)`

**الـ Logic:**
- بتاخد رقم
- بتحوّله لـ string بـ `$` وسالتين عشريين
- مثال: `349` → `"$349.00"`

**المدخلات:** `amount` (number)
**المخرجات:** string

**ليه؟** عشان السعر يظهر بنفس الشكل في كل مكان.

---

### 2. `findProduct(id)`

**الـ Logic:**
- بتاخد `id` رقم
- بتدور على المنتج في مصفوفة `products` (من `data.js`)
- بترجّع الـ object بتاع المنتج أو `undefined`

**المدخلات:** `id` (number)
**المخرجات:** object | undefined

**ليه؟** لأننا بنخزن في الـ cart الـ `id` بس. لما نحتاج بيانات كاملة (اسم، صورة، سعر) ندور على المنتج بالـ id.

---

### 3. `getCart()`

**الـ Logic:**
- بتقرأ `localStorage.getItem(CART_KEY)`
- لو مفيش حاجة → بترجّع مصفوفة فاضية `[]`
- لو فيه → بتحول الـ JSON string لمصفوفة objects

**المدخلات:** مفيش
**المخرجات:** `[{ id, quantity, color }, ...]`

**ليه؟** لأن الـ localStorage بيخزن strings بس. لازم نحولها لـ objects عشان نقدر نشتغل عليها.

---

### 4. `saveCart(cart)`

**الـ Logic:**
- بتاخد مصفوفة الـ cart
- بتحوّلها لـ JSON string
- بتحفظها في `localStorage` تحت `CART_KEY`

**المدخلات:** `cart` (array)
**المخرجات:** مفيش (void)

**ليه؟** عشان نحفظ التغييرات بعد أي عملية (إضافة/حذف/تعديل).

---

## 3️⃣ Cart Functions (دوال الكارت)

### 5. `addToCart(productId, quantity = 1)`

**الـ Logic خطوة بخطوة:**

1. بتقرأ الكارت الحالي من `localStorage` باستخدام `getCart()`
2. بتدور على منتج في المصفوفة بـ `productId`:
   - **لو موجود** → بتزود الـ `quantity` بتاعه
   - **لو مش موجود** → بتضيف object جديد: `{ id: productId, quantity }`
3. بتحفظ الكارت المُحدّث بـ `saveCart()`
4. بتحدّث العداد في الـ Navbar بـ `updateCartCounter()`
5. بتعرض Toast Notification بـ `showToast()` فيها:
   - اسم المنتج
   - رسالة "Added to cart"
   - زرار "View Bag"
   
**المدخلات:** `productId` (number), `quantity` (number، افتراضي = 1)
**المخرجات:** مفيش (void)

**ليه مهمة؟** دي **الدالة الأساسية** اللي بتتحكم في كل حاجة في الكارت.

**سيناريوهات:**
- منتج مش موجود → يضاف
- منتج موجود بالفعل → تزيد كميته
- نفس المنتج بألوان مختلفة → **مؤقتاً** نعتبره نفس المنتج (بس ممكن بعدين نضيف دعم اللون)

---

### 6. `removeFromCart(productId)`

**الـ Logic:**
1. بتقرأ الكارت الحالي
2. بتفلتر المصفوفة وتشيل المنتج اللي `id === productId`
3. بتحفظ الكارت الجديد
4. بتحدّث العداد
5. بتعرض Toast "Removed from cart"

**المدخلات:** `productId` (number)
**المخرجات:** مفيش

---

### 7. `updateQuantity(productId, newQuantity)`

**الـ Logic:**
1. بتقرأ الكارت
2. بتدور على المنتج
3. **لو `newQuantity` أصغر من أو يساوي 0** → بتشيل المنتج بالكامل
4. **غير كده** → بتحدّث الكمية للقيمة الجديدة
5. بتحفظ + تحدّث العداد

**المدخلات:** `productId` (number), `newQuantity` (number)
**المخرجات:** مفيش

**ليه؟** عشان لما المستخدم يضغط `+` أو `-` أو يكتب كمية يدوي.

---

### 8. `getCartCount()`

**الـ Logic:**
1. بتقرأ الكارت
2. بتجمع كل الـ `quantity` في المصفوفة
3. بترجّع الرقم النهائي

**المدخلات:** مفيش
**المخرجات:** number

**مثال:**
```
cart = [
  { id: 1, quantity: 2 },
  { id: 3, quantity: 1 }
]
// النتيجة: 3
```

---

### 9. `getCartTotal()`

**الـ Logic:**
1. بتقرأ الكارت
2. بتلف على كل عنصر:
   - بتدور على المنتج بـ `findProduct()`
   - بتضرب `product.currentPrice × quantity`
3. بتجمع كل النواتج
4. بترجّع الإجمالي

**المدخلات:** مفيش
**المخرجات:** number

**ليه؟** عشان نعرض الإجمالي في الـ Navbar.

---

## 4️⃣ UI Functions (دوال الواجهة)

### 10. `updateCartCounter()`

**الـ Logic:**
1. بتجيب عدد المنتجات بـ `getCartCount()`
2. بتجيب الإجمالي بـ `getCartTotal()`
3. بتلاقي عنصر العدد في الـ Navbar: `[data-cart-count]`
4. بتلاقي عنصر الإجمالي: `[data-cart-total]`
5. بتحدّث `textContent` للاتنين

**الـ Selectors:**
```js
document.querySelector("[data-cart-count]")
document.querySelector("[data-cart-total]")
```

**متى تشتغل؟**
- أول ما الصفحة تفتح
- بعد كل `addToCart` / `removeFromCart` / `updateQuantity`

---

### 11. `showToast(message, actionText, actionCallback)`

**الـ Logic خطوة بخطوة:**

1. بتلاقي الـ container: `[data-toast-container]`
2. بتعمل عنصر `div` جديد بـ:
   - كلاس `toast`
   - أيقونة صح (✓)
   - label ("Added to cart")
   - message (اسم المنتج)
   - **اختياري:** زرار action (زي "View Bag")
   - زرار إغلاق (×)
3. بتحط الـ Toast في الـ container
4. بتضبط timer (`TOAST_DURATION`) → بعد 4 ثواني:
   - بتضيف كلاس `is-leaving` (للـ animation)
   - بعد الـ animation → بتشيل العنصر من الـ DOM
5. لو المستخدم ضغط على زرار الإغلاق → نفس العملية

**الـ Selectors:**
```js
document.querySelector("[data-toast-container]")
```

**ليه؟** عشان كل عملية في الموقع يبقى ليها feedback بصري.

**سيناريوهات:**
- إضافة منتج → "Added to cart" + "View Bag"
- حذف منتج → "Removed from cart"
- أي رسالة عامة

---

### 12. `openSearchModal()` / `closeSearchModal()`

**الـ Logic:**

**`openSearchModal()`:**
1. بتلاقي الـ modal: `[data-search-modal]`
2. بتضيف كلاس `is-open`
3. بتحط focus على الـ input: `[data-search-input]`
4. **بتقفل الـ scroll على الـ body** (عشان الخلفية متتحركش)
5. بتفضّي الـ input (اختياري)

**`closeSearchModal()`:**
1. بتلاقي الـ modal
2. بتشيل كلاس `is-open`
3. **بتفك قفل الـ scroll** على الـ body

**الـ Selectors:**
```js
document.querySelector("[data-search-modal]")
document.querySelector("[data-search-input]")
```

**ليه؟** عشان نفتح ونقفل الـ modal.

---

### 13. `handleSearch(query)`

**الـ Logic:**
1. بتاخد نص البحث
2. لو النص أقل من 2-3 حروف → بتعرض رسالة "اكتب حاجة"
3. بتفلتر `products` حسب:
   - `name` فيه النص
   - أو `subcategory` فيه النص
4. بتعرض النتائج في الـ modal: `[data-search-results]`

**المدخلات:** `query` (string)
**المخرجات:** بتحدّث الـ DOM مباشرة

**ملاحظة:** ممكن نأجلها لبعدين — مش ضرورية للـ Home.

---

## 5️⃣ Init Functions (دوال التهيئة)

### 14. `initCartCounter()`

**الـ Logic:**
- بتشغّل `updateCartCounter()` أول ما الصفحة تفتح
- عشان لو المستخدم عنده منتجات في `localStorage` من زيارة سابقة، تظهر على طول

---

### 15. `initSearchModal()`

**الـ Logic:**

1. **فتح الـ modal:**
   - بتلاقي كل العناصر اللي عليها `[data-search-open]`
   - لكل واحد: بتضيف `click` listener → `openSearchModal()`

2. **إغلاق الـ modal:**
   - بتلاقي كل العناصر اللي عليها `[data-search-close]`
   - لكل واحد: بتضيف `click` listener → `closeSearchModal()`

3. **اختصار `Ctrl/Cmd + K`:**
   - `keydown` على `document`
   - لو الكيبورد `k` + `Ctrl` أو `Cmd` → `preventDefault()` + `openSearchModal()`

4. **زرار `Esc`:**
   - `keydown` على `document`
   - لو `Esc` → `closeSearchModal()`

**الـ Selectors:**
```js
document.querySelectorAll("[data-search-open]")
document.querySelectorAll("[data-search-close]")
document.querySelector("[data-search-input]")
```

---

### 16. `initFilmModal()`

**الـ Logic (نفس فكرة Search Modal):**

1. **فتح:**
   - العناصر اللي عليها `[data-open-film]` → click → open

2. **إغلاق:**
   - العناصر اللي عليها `[data-film-close]` → click → close
   - `Esc` → close

**الـ Selectors:**
```js
document.querySelectorAll("[data-open-film]")
document.querySelectorAll("[data-film-close]")
document.querySelector("[data-film-modal]")
```

---

### 17. `initAddToCartButtons()`

**الـ Logic:**

1. بتلاقي كل الأزرار اللي عليها `[data-add-to-cart]`
2. لكل زر:
   - بتضيف `click` listener
   - لما يتضغط:
     - بتدور على أقرب عنصر أب عليه `[data-product-id]`:
       ```
       btn.closest("[data-product-id]")
       ```
     - بتقرأ الـ `data-product-id` من العنصر
     - بتحوّله لـ number
     - بتنادي `addToCart(id)`
     - **اختياري:** تغيّر شكل الزرار مؤقتاً لـ "Added ✓"

**الـ Selectors:**
```js
document.querySelectorAll("[data-add-to-cart]")
```

**ليه مهمة؟** لأنها بتخلي **كل** أزرار الإضافة في الموقع تشتغل تلقائياً، من غير ما تكتب listener لكل واحد.

**سيناريو:**
- المستخدم يضغط "Quick Add" على Product Card
- JS يقرأ `data-product-id="1"` من الـ card
- ينادي `addToCart(1)`

---

### 18. `initGlobalKeyboard()`

**الـ Logic:**
- بتضيف listener واحد على `document` لكل الاختصارات:
  - `Ctrl/Cmd + K` → فتح Search
  - `Esc` → إغلاق كل الـ modals
  - `Ctrl/Cmd + /` → (اختياري) اختصارات تانية

**ليه؟** عشان الاختصارات تشتغل من أي مكان في الصفحة.

---

## 6️⃣ Event Listener الأساسي

### 19. `init()`

**الـ Logic:**
- بتشغّل كل الـ init functions:
  ```
  initCartCounter()
  initSearchModal()
  initFilmModal()
  initAddToCartButtons()
  initGlobalKeyboard()
  ```

**متى تشتغل؟**
- على `DOMContentLoaded` → بعد ما كل الـ HTML يتحمّل

```js
document.addEventListener("DOMContentLoaded", init);
```

**ليه `DOMContentLoaded`؟**
- لأن لو شغّلنا الـ JS قبل ما الـ HTML يتحمّل، الـ `querySelector` مش هيلاقي حاجة
- `DOMContentLoaded` بتشتغل بعد ما الـ DOM يبقى جاهز، بس **قبل** ما الصور والملفات تتحمّل (أسرع من `load`)

---

## 📊 جدول شامل لكل الـ Functions

| # | Function | المدخلات | المخرجات | النوع |
|---|----------|----------|----------|-------|
| 1 | `formatPrice` | number | string | Utility |
| 2 | `findProduct` | id | object | Utility |
| 3 | `getCart` | — | array | Cart |
| 4 | `saveCart` | array | — | Cart |
| 5 | `addToCart` | id, qty | — | Cart |
| 6 | `removeFromCart` | id | — | Cart |
| 7 | `updateQuantity` | id, qty | — | Cart |
| 8 | `getCartCount` | — | number | Cart |
| 9 | `getCartTotal` | — | number | Cart |
| 10 | `updateCartCounter` | — | — | UI |
| 11 | `showToast` | msg, text, cb | — | UI |
| 12 | `openSearchModal` | — | — | UI |
| 13 | `closeSearchModal` | — | — | UI |
| 14 | `handleSearch` | query | — | UI (مؤجل) |
| 15 | `initCartCounter` | — | — | Init |
| 16 | `initSearchModal` | — | — | Init |
| 17 | `initFilmModal` | — | — | Init |
| 18 | `initAddToCartButtons` | — | — | Init |
| 19 | `initGlobalKeyboard` | — | — | Init |
| 20 | `init` | — | — | Init |

---

## 🎯 خريطة الـ Selectors

| الـ Selector | الاستخدام |
|--------------|-----------|
| `[data-cart-count]` | عنصر العدد في الـ Navbar |
| `[data-cart-total]` | عنصر الإجمالي في الـ Navbar |
| `[data-cart-link]` | لينك الـ Cart (مش مهم حالياً) |
| `[data-add-to-cart]` | كل أزرار الإضافة |
| `[data-product-id]` | الـ product card |
| `[data-search-open]` | عناصر فتح الـ Search |
| `[data-search-modal]` | الـ Search Modal wrapper |
| `[data-search-close]` | عناصر غلق الـ Search |
| `[data-search-input]` | الـ input في الـ Search |
| `[data-search-results]` | مكان النتائج |
| `[data-open-film]` | زرار فتح الـ Film |
| `[data-film-modal]` | الـ Film Modal wrapper |
| `[data-film-close]` | عناصر غلق الـ Film |
| `[data-toast-container]` | مكان الـ Toast |

---

## 🔄 سيناريوهات واقعية — إزاي بتشتغل؟

### **سيناريو 1: إضافة منتج**

1. المستخدم يضغط "Quick Add" في Product Card
2. الـ listener في `initAddToCartButtons()` يشتغل
3. بيقرأ `data-product-id="1"` من الـ card
4. بينادي `addToCart(1)`
5. `addToCart` بتقرأ الكارت الحالي (`getCart`)
6. بتضيف المنتج أو تزيد كميته
7. بتحفظ الكارت (`saveCart`)
8. `updateCartCounter()` بتحدّث الـ Navbar
9. `showToast()` بتعرض إشعار "Added to cart"
10. المستخدم يشوف:
    - العداد في الـ Navbar اتغير
    - Toast ظهر في الركن

---

### **سيناريو 2: فتح Search**

**الطريقة 1: بالضغط على الـ Navbar**
1. المستخدم يضغط على الـ search input في الـ Navbar
2. الـ `click` listener على `[data-search-open]` يشتغل
3. بينادي `openSearchModal()`
4. الـ modal يفتح + الـ focus يروح على الـ input

**الطريقة 2: بالكيبورد**
1. المستخدم يضغط `Ctrl + K`
2. الـ `keydown` listener على `document` يشتغل
3. بيمنع السلوك الافتراضي (`preventDefault`)
4. بينادي `openSearchModal()`

**الإغلاق:**
- `Esc` → `closeSearchModal()`
- ضغط على الخلفية `[data-search-close]` → `closeSearchModal()`
- ضغط على زرار × → `closeSearchModal()`

---

### **سيناريو 3: زيارة الموقع بعد إضافة منتجات**

1. المستخدم عاد للموقع بعد ما أضاف منتجات
2. الصفحة تفتح → `DOMContentLoaded` يشتغل
3. `init()` تشتغل
4. `initCartCounter()` تشتغل
5. `updateCartCounter()` بتقرأ من localStorage
6. العداد في الـ Navbar يظهر بـ 3 (مثلاً)
7. المستخدم يشوف إن عنده 3 منتجات في الكارت

---

## 🎨 ملاحظات مهمة على الـ Logic

### 1️⃣ **الترتيب مهم**

كل حاجة بتشتغل بعد `DOMContentLoaded`. لو كتبت الكود بره، ممكن الـ HTML ميكنش جاهز.

### 2️⃣ **`data-*` attributes هي العمود الفقري**

بدل ما نكتب listeners لكل زرار يدوياً، بنستخدم `data-*` + `querySelectorAll`.

**الفايدة:** لما نضيف منتجات جديدة في الـ HTML، الأزرار الجديدة هتشتغل **تلقائياً** بدون أي تعديل في JS.

### 3️⃣ **الفصل بين الـ Logic والـ UI**

- **Cart functions** (`addToCart`, `getCart`) → ما بتعرفش حاجة عن الـ DOM
- **UI functions** (`updateCartCounter`, `showToast`) → بتتعامل مع الـ DOM
- **Init functions** → بتربط الاتنين

**ليه؟** عشان تكون قابلة للاختبار والتعديل.

### 4️⃣ **`localStorage` للمزامنة**

كل التعديلات في الكارت بتحفظ في `localStorage` فوراً. وكل ما الصفحة تفتح، بنقرأ من `localStorage`.

**النتيجة:** المستخدم يقفل المتصفح ويرجع → الكارت زي ما هو.

---

## 🎯 خطة التنفيذ الفعلية

لما نبدأ نكتب الكود، الترتيب هيبقى:

```
1. Constants
2. formatPrice
3. findProduct
4. getCart + saveCart
5. getCartCount + getCartTotal
6. addToCart
7. removeFromCart
8. updateQuantity
9. updateCartCounter
10. showToast
11. openSearchModal + closeSearchModal
12. initCartCounter
13. initAddToCartButtons
14. initSearchModal
15. initFilmModal
16. initGlobalKeyboard
17. init
18. DOMContentLoaded listener
```

**الترتيب ده منطقي:** كل دالة بتعتمد على اللي قبلها.

---

## ✅ دلوقتي

**لو الكلام ده واضح، نبدأ نكتب الكود الفعلي في `main.js`.**

**قبل ما نبدأ، محتاج منك تأكيد على حاجة:**

**الـ Cart Structure:**
عايزين نخزن في `localStorage` إيه بالظبط؟

**(أ)** `[{ id: 1, quantity: 2 }, ...]` — بسيط
**(ب)** `[{ id: 1, quantity: 2, color: "Matte Obsidian" }, ...]` — مع الألوان
**(ج)** حاجة تانية

**اقتراحي:** **(أ)** دلوقتي، ونضيف الألوان بعدين لو احتجنا.

**قولي وأنت أمين، وأنا أبدأ أكتب `main.js`.** 🚀