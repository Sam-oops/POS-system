import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../entities/product/api/getProducts";
import { useCartStore } from "../../entities/cart/model/cartStore";

export function CatalogPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка...</p>;
  return (
    <ul>
      {products!.map((product) => (
        <li key={product._id}>
          {product.name} - {product.price} ({product.categoryId.name})
          <button
            onClick={() =>
              addItem({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            }
          >
            В корзину
          </button>
        </li>
      ))}
    </ul>
  );
}
