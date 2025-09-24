export async function saveDoc(collection: string, doc: any) {
  const res = await fetch(`/api/collection/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc)
  });
  if (!res.ok) throw new Error(`Save failed: ${res.status}`);
  return res.json();
}

export async function listDocs(collection: string, q?: string) {
  const url = q ? `/api/collection/${collection}?q=${encodeURIComponent(q)}` : `/api/collection/${collection}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  return res.json();
}
