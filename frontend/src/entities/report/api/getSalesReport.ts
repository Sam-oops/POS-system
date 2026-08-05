import { apiFetch } from "../../../shared/api/client";
import { SalesReportRow } from "../model/types";

export function getSalesReport() {
  return apiFetch<SalesReportRow[]>("/reports/sales");
}
