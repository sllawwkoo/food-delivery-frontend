const CART_STORAGE_KEY = "cart";

/**
 * Форма одного елемента кошика при збереженні в localStorage.
 * Збігається зі структурою CartItem у entities/cart (_id, imageUrl).
 */
export type CartStorageItem = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

function normalizeItem(raw: Record<string, unknown>): CartStorageItem | null {
  const id = (raw._id ?? raw.id) as string | undefined;
  const imageUrl = (raw.imageUrl ?? raw.image) as string | undefined;
  if (!id || !raw.title || typeof raw.price !== "number" || !imageUrl || typeof raw.quantity !== "number") {
    return null;
  }
  return {
    _id: id,
    title: String(raw.title),
    price: Number(raw.price),
    imageUrl,
    quantity: Number(raw.quantity),
  };
}

export type CartStorageState = {
  items: CartStorageItem[];
  restaurant: string | null;
};

/**
 * Читає кошик з localStorage.
 * Повертає { items, restaurant: null }, якщо ключ відсутній або парсинг не вдався.
 * Підтримує старий формат (тільки масив items) — тоді restaurant = null.
 */
export function loadCartFromStorage(): CartStorageState {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw == null) return { items: [], restaurant: null };
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && "items" in parsed && Array.isArray((parsed as { items: unknown }).items)) {
      const obj = parsed as { items: unknown[]; restaurant?: unknown };
      const items = obj.items
        .map((item) => normalizeItem(item as Record<string, unknown>))
        .filter(Boolean) as CartStorageItem[];
      const restaurant = typeof obj.restaurant === "string" ? obj.restaurant : null;
      return { items, restaurant };
    }
    if (Array.isArray(parsed)) {
      const items = parsed
        .map((item) => normalizeItem(item as Record<string, unknown>))
        .filter(Boolean) as CartStorageItem[];
      return { items, restaurant: null };
    }
    return { items: [], restaurant: null };
  } catch {
    return { items: [], restaurant: null };
  }
}

/**
 * Зберігає стан кошика (items та restaurant) в localStorage.
 */
export function saveCartToStorage(items: CartStorageItem[], restaurant: string | null): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, restaurant }));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}
