import { useQuery } from "@tanstack/react-query";
import { getSalesReport } from "../../entities/report/api/getSalesReport";

export function SalesReport() {
  const { data: rows, isLoading } = useQuery({
    queryKey: ["salesReport"],
    queryFn: getSalesReport,
  });

  if (isLoading) return <p>Загрузка...</p>;
  return (
    <>
      <h3>Отчет по продажам</h3>
      <table>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Продано</th>
            <th>Выручка</th>
            <th>Себестоимость</th>
            <th>Маржа</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.quantitySold}</td>
              <td>{row.revenue}</td>
              <td>{row.cost}</td>
              <td>{row.margin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
