// app/services/external.ts
export type ExternalItem = {
id: string;
title: string;
subtitle?: string;
url?: string;
image?: string;
};
export async function fetchExternal(source: "products" | "news"): Promise<ExternalItem[]> {
if (source === "products") {
const items = await fetch("https://fakestoreapi.com/products?limit=6", { cache: "no-store" })
.then(r => r.json());
return items.map((p: any) => ({
id: String(p.id),
title: p.title,
subtitle: `$${p.price} • ${p.category}`,
url: p.image,
image: p.image
}));
}
// news (Hacker News via Algolia)
const data = await fetch("https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=6", { cache: "no-store" })
.then(r => r.json());
return (data.hits || []).map((h: any) => ({
id: String(h.objectID),
title: h.title,
subtitle: `${h.points ?? 0} points • by ${h.author}`,
url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`
}));
}
