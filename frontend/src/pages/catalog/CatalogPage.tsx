import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../entities/product/api/getProducts";

export function CatalogPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
