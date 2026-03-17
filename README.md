# 🍔 Food Delivery App

Сучасний full-featured frontend застосунок для замовлення їжі з різних категорій (burger, pizza, sushi тощо).

🔗 **Live Demo:** https://food-delivery-front-app.netlify.app/

---

## 📌 Про проєкт

Food Delivery — це SPA-застосунок, який імітує реальний процес замовлення їжі:

- перегляд меню по категоріях
- додавання товарів у кошик
- оформлення замовлення
- авторизація користувача
- робота з профілем

Проєкт побудований з акцентом на:
- масштабовану архітектуру (FSD)
- чисту типізацію (TypeScript)
- production-ready API layer (RTK Query)
- UX (skeleton, loaders, модалки, empty states)

---

## ⚙️ Стек технологій

- **React 18**
- **TypeScript**
- **Vite**
- **Redux Toolkit + RTK Query**
- **SCSS Modules**
- **Feature-Sliced Design (FSD)**

---

## 🧠 Основні фічі

### 🔐 Auth (JWT + Refresh)
- login / register
- автоматичне оновлення access token
- збереження сесії

### 🛒 Cart
- додавання/видалення товарів
- зміна кількості
- збереження в localStorage
- обмеження на один ресторан

### 📦 Checkout
- форма з валідацією
- формування payload з cart state
- success modal
- очистка кошика після замовлення

### 👤 Profile
- перегляд та редагування даних
- синхронізація з бекендом

### 🍽️ Product Catalog
- категорії (burger, pizza, sushi…)
- skeleton loading
- empty state
- responsive grid

---

## 🧩 Архітектура (FSD)


src/
app/ # store, router, providers
pages/ # сторінки (Home, Login, Profile, Checkout)
widgets/ # великі UI-блоки (Header, Sidebar, ProductGrid)
features/ # бізнес-логіка (auth, cart, order)
entities/ # доменні сутності (product, cart, user)
shared/ # UI-kit, api, hooks, utils


---

## 🔄 API layer

- RTK Query з `injectEndpoints`
- централізований `baseApi`
- автоматичний refresh токенів
- кешування через `providesTags / invalidatesTags`
- `transformResponse` для мапінгу DTO → domain

---

## 🎨 UI / UX

- Skeleton loading
- Error states
- Success modal
- Modal з focus management (a11y)
- Плавні анімації
- Responsive layout

---

## ⚠️ Особливості реалізації

- Захист від зміни ресторану при заповненому кошику
- Lazy routing через `import.meta.glob`
- Error Boundary для стабільності UI
- Валідація форм (react-hook-form)

---

## 🚀 Запуск локально

```bash
git clone <repo>
cd food-delivery
npm install
npm run dev