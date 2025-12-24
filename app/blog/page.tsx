import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function BlogPage() {
  // Fetch posts from API (read operation)
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  const posts = await res.json();

  // Server Action for delete
  async function deletePost(formData: FormData) {
    'use server';
    const slug = formData.get('slug') as string;
    await fetch(`http://localhost:3000/api/posts?slug=${slug}`, { method: 'DELETE' });
    redirect('/blog'); // Refresh page after delete
  }

  

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link href="/blog/new" className="btn bg-blue-500 text-white px-4 py-2 rounded">+ New Post</Link> {/* Create */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <article key={post.slug} className="blog-card border p-4 rounded">
            <h3>{post.title}</h3>
            <p>{post.content?.slice(0, 100)}...</p> {/* Excerpt from content */}
            <div className="tags">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="tag bg-gray-200 px-2 py-1 rounded mr-2">{tag}</span>
              ))}
            </div>
            <small>{post.date}</small>
            <div className="mt-4 flex gap-2">
              <Link href={`/blog/${post.slug}`} className="btn bg-green-500 text-white px-3 py-1 rounded">Read →</Link> {/* Read */}
              <Link href={`/blog/edit/${post.slug}`} className="btn bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link> {/* Update */}
              <form action={deletePost} method="POST" className="inline">
                <input type="hidden" name="slug" value={post.slug} />
                <button type="submit" className="btn bg-red-500 text-white px-3 py-1 rounded">Delete</button> {/* Delete */}
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}