'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = 'http://localhost:3000/api/posts';

// ตรวจสอบว่ามีคำว่า export นำหน้าเสมอ
export async function createPost(formData: FormData) {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  revalidatePath('/blog'); 
  redirect('/blog');
}

export async function deletePostAction(formData: FormData) {
  const id = formData.get('id');
  await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
  revalidatePath('/blog');
}