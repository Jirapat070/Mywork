import { createPost } from '../actions';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div className="container mx-auto p-8 max-w-lg">
      <Link href="/blog" className="text-blue-500 mb-4 block">← Back to Blog</Link>
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <form action={createPost} className="flex flex-col gap-4">
        <input name="title" placeholder="หัวข้อบทความ" className="border p-2 rounded text-black" required />
        <textarea name="content" placeholder="เนื้อหา..." className="border p-2 rounded h-40 text-black" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Save Post</button>
      </form>
    </div>
  );
}