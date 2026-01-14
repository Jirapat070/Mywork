// app/blog/page.tsx
export const dynamic = 'force-dynamic';
import { deletePostAction } from './actions';
 import Link from 'next/link';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  let posts = [];

  try {
    const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
    if (res.ok) {
      posts = await res.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // ระบบค้นหา
  const filteredPosts = Array.isArray(posts) ? posts.filter((p: any) => 
    p.title?.toLowerCase().includes(query)
  ) : [];

  return (
    <div className="p-8">
      <Link href="/blog/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Post</Link>
      <form action="/blog" method="GET" className="my-4 flex gap-2">
        <input name="q" defaultValue={query} className="border p-2 text-black" placeholder="Search..." />
        <button className="bg-gray-800 text-white px-4 py-2 rounded">Search</button>
      </form>

      <div className="grid gap-4">
        {filteredPosts.map((post: any) => (
          <div key={post.id} className="border p-4 rounded bg-white/10">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <form action={deletePostAction}>
              <input type="hidden" name="id" value={post.id} />
              <button className="bg-red-500 text-xs px-2 py-1 rounded mt-2">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}