export type Post = { slug: string; title: string; content: string; date: string; tags?: string[] };
let posts: Post[] = [
{ slug: "hello-nextjs", title: "Hello Next.js!", content: "My first post", date: "2025-12-23" }
];
export function getPosts() { return posts; }
export function addPost(p: Post) { posts = [p, ...posts]; }
export function getPostBySlug(slug: string) {
return posts.find((p) => p.slug === slug);
}

export function updatePostBySlug(slug: string, updated: Partial<Post>) {
posts = posts.map((p) => p.slug === slug ? { ...p, ...updated } : p);
}