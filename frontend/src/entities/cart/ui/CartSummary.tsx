import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../order/api/createOrder";
import { useCartStore } from "../model/cartStore";
import { useEffect } from "react";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const removeItem = useCartStore((state) => state.removeItem);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      ),
    onSuccess: () => {
      clear();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  useEffect(() => {
    if (items.length > 0) mutation.reset();
  }, [items.length]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div>
      <h3>Корзина</h3>
      {items.length === 0 && !mutation.isSuccess && <p>Корзина пуста</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.productId}>
              {item.name} x {item.quantity} = {item.price * item.quantity}
              <button onClick={() => removeItem(item.productId)}>
                Убрать единицу товара
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Итого: {total}</p>
      <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        Оформить заказ
      </button>
      {mutation.isSuccess && <p>Заказ оформлен!</p>}
      {mutation.isError && <p>{(mutation.error as Error).message}</p>}
    </div>
  );
}
