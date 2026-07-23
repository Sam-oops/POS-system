import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "../../entities/session/model/sessionStore";
import { getProducts } from "../../entities/product/api/getProducts";

export function CatalogPage() {
  const token = useSessionStore((state) => state.token)!;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(token),
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка...</p>;
  return (
    <ul>
      {products!.map((product) => (
        <li key={product._id}>
          {product.name} - {product.price} ({product.categoryId.name})
        </li>
      ))}
    </ul>
  );
}
