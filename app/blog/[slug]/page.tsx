import Link from "next/link";
export default async function BlogPage() {
const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
const posts = await res.json();
return (
<section className="container">
<div className="row" style={{ justifyContent: "space-between" }}>
<h1>Blog</h1>
<Link className="btn" href="/blog/new">+ New</Link>
</div>
<div className="grid">
{posts.map((p: any) => (
<article key={p.slug} className="card">
<h3>{p.title}</h3>
<p><small>{p.date}</small></p>
<Link className="btn" href={`/blog/${p.slug}`}>Read →</Link>
</article>
))}
</div>
</section>
);
}
