const API_URL = "http://localhost:8080/api/products";

export async function getProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Could not load products");
  return response.json();
}

export async function addProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error("Could not add product");
  return response.json();
}