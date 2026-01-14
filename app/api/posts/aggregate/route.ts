
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'products';
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '5');

  // ข้อมูลจำลอง (ข้อ 3: Normalize Fields ให้ชื่อเหมือนกัน)
  const allInternal = [
    { slug: 'nextjs-guide', title: 'เรียนรู้ Next.js เบื้องต้น' },
    { slug: 'react-tips', title: 'เทคนิคการเขียน React ให้คลีน' }
  ];

  // ข้อ 4: ระบบ Search
  const filteredInternal = allInternal.filter(p => p.title.toLowerCase().includes(query));

  // จำลองข้อมูล External (ข้อ 3: Normalize ให้มี title และ url เสมอ)
  const externalData = source === 'news' 
    ? [{ id: 1, title: 'ข่าว IT: Next.js 15 มาแล้ว', url: 'https://nextjs.org' }]
    : [{ id: 1, title: 'คอร์สเรียน Web Dev', url: '#' }];

  return NextResponse.json({
    internal: filteredInternal.slice(0, limit), // ข้อ 3: Limit จำนวน
    external: externalData.slice(0, limit),
  });
}