import { ProductItems } from "../types/ProductItems";

export async function fetchProducts(): Promise<ProductItems[]> {
  try {
    const apiUrl = `${process.env.REACT_APP_API_URL}/products`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erro ao busca produtos");
    }
    const data: ProductItems[] = await response.json();
    return data;
  } catch (error) {
    console.error("Falha na requisição", error);
    return [];
  }
}
