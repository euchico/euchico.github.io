export async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Falha ao carregar: ${path}`);
  }
  return response.json();
}

export function sortByOrder(items = []) {
  return [...items].sort((a, b) => a.order - b.order);
}
