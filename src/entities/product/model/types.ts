/**
 * Перелік доступних категорій продуктів каталогу.
 *
 * Це доменний набір значень, який відповідає категоріям,
 * що використовуються бекендом (фільтр `GET /products?category=`).
 */
export type ProductCategory =
  | "burger"
  | "chicken"
  | "hata"
  | "pizza"
  | "sushi";

/**
 * Доменна модель продукту каталогу.
 *
 * - Відображає структуру продукту, яка приходить з бекенду.
 * - Використовується в entities- та вищих шарах (features, widgets, pages)
 *   для типізації даних про продукти.
 *
 * Поле `_id`:
 * - приходить з MongoDB як унікальний ідентифікатор документа;
 * - зберігається як рядок на фронтенді для зручної роботи в React (keys тощо).
 *
 * Поле `category`:
 * - зберігається як рядок, але очікується, що його значення
 *   належить до `ProductCategory`.
 */
export interface Product {
  _id: string;
  title: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
}

/**
 * DTO відповіді бекенду для списку продуктів.
 *
 * - Відображає транспортний формат, який повертає API (`GET /products`).
 * - Включає службове поле `success` та метадані `meta`.
 * - Доменна логіка працює переважно з `Product[]`, а не з цим DTO,
 *   тому у RTK Query використовується `transformResponse` для
 *   відділення транспортного шару від доменної моделі.
 */
export interface ProductsResponseDto {
  success: boolean;
  data: Product[];
  meta: {
    count: number;
  };
}

