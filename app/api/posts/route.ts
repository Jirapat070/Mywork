// Example in-memory storage; replace with your actual data source (e.g., database)
let posts: any[] = [
  { id: 1, title: 'Sample Post', content: 'This is a sample.', slug: 'sample-post', date: '2023-01-01' },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  if (slug) {
    const post = posts.find(p => p.slug === slug);
    return post ? new Response(JSON.stringify(post), { status: 200 }) : new Response('Post not found', { status: 404 });
  }
  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = { id: posts.length + 1, ...body };
    posts.push(newPost);
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response('Invalid request', { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, ...updateData } = body;
    const index = posts.findIndex(p => p.slug === slug);
    if (index === -1) return new Response('Post not found', { status: 404 });
    posts[index] = { ...posts[index], ...updateData };
    return new Response(JSON.stringify(posts[index]), { status: 200 });
  } catch (error) {
    return new Response('Invalid request', { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    if (!slug) return new Response('Slug required', { status: 400 });
    const index = posts.findIndex(p => p.slug === slug);
    if (index === -1) return new Response('Post not found', { status: 404 });
    posts.splice(index, 1);
    return new Response('Post deleted', { status: 200 });
  } catch (error) {
    return new Response('Invalid request', { status: 500 });
  }
}

