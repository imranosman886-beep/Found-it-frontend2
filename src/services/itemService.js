
import apiRequest from "./api";

export async function getFoundItems({
  page = 1,
  per_page = 9,
  search = "",
  category_id = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
    search,
  });

  if (category_id) {
    params.set("category_id", String(category_id));
  }

  return apiRequest(`/api/found-items?${params.toString()}`);
}

export async function getLostItems({
  page = 1,
  per_page = 9,
  search = "",
  category_id = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
    search ,
  });

  if (category_id) {
    params.set("category_id", String(category_id));
  }

  return apiRequest(`/api/lost-items?${params.toString()}`);
}

export async function getFoundItem(id) {
  return apiRequest(`/api/found-items/${id}`);
}

export async function getLostItem(id) {
  return apiRequest(`/api/lost-items/${id}`);
}

export async function createFoundItem(itemData) {
  return apiRequest("/api/found-items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });
}

export async function createLostItem(itemData) {
  return apiRequest("/api/lost-items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });
}

export async function getMyLostItems(userId) {
  const data = await getLostItems({ page: 1, per_page: 100 });
  return (data.items || []).filter((item) => item.user_id === userId);
}

export async function getMyFoundItems(userId) {
  const data = await getFoundItems({ page: 1, per_page: 100 });
  return (data.items || []).filter((item) => item.user_id === userId);
}
