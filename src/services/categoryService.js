
import apiRequest from "./api";

export async function getCategories() {
  return apiRequest("/api/categories");
}
