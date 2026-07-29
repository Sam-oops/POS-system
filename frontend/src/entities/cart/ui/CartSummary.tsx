import { useCartStore } from "../model/cartStore";

export function CartSummary() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) return <p>Корзина пуста</p>;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div>
      <h3>Корзина</h3>
      <ul>
        {items.map((item) => (
          <li key={item.productId}>
            {item.name} x {item.quantity} = {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Итого: {total}</p>
    </div>
  );
}
