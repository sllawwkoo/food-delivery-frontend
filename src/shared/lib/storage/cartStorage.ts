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

/**
 * Читає кошик з localStorage.
 * Повертає порожній масив, якщо ключ відсутній або парсинг не вдався.
 * Підтримує старий формат (id, image) для сумісності.
 */
export function loadCartFromStorage(): CartStorageItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw == null) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => normalizeItem(item as Record<string, unknown>)).filter(Boolean) as CartStorageItem[];
  } catch {
    return [];
  }
}

/**
 * Зберігає елементи кошика в localStorage.
 */
export function saveCartToStorage(items: CartStorageItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
