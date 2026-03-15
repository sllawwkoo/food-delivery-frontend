import burgerImg from "@/assets/images/categories/burger.webp";
import chickenImg from "@/assets/images/categories/chicken.webp";
import hataImg from "@/assets/images/categories/hata.webp";
import pizzaImg from "@/assets/images/categories/pizza.webp";
import sushiImg from "@/assets/images/categories/sushi.webp";

const RESTAURANT_IMAGES: Record<string, string> = {
  burger: burgerImg,
  chicken: chickenImg,
  hata: hataImg,
  pizza: pizzaImg,
  sushi: sushiImg,
};

export function getRestaurantImage(restaurant: string | undefined): string | undefined {
  if (restaurant == null || restaurant === "") return undefined;
  const key = restaurant.toLowerCase().trim();
  return RESTAURANT_IMAGES[key];
}
