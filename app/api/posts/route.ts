import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// กำหนดที่เก็บข้อมูล
const filePath = path.join(process.cwd(), 'lib', 'posts.json');

async function readData() {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch { return []; }
}

export async function GET() {
    const data = await readData();
    // บังคับส่ง JSON เสมอ ป้องกัน Error '<'
    return NextResponse.json(data); 
}

export async function POST(req: Request) {
    const posts = await readData();
    const body = await req.json();
    const newPost = { ...body, id: Date.now().toString() };
    posts.push(newPost);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    return NextResponse.json(newPost);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let posts = await readData();
    posts = posts.filter((p: any) => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    return NextResponse.json({ success: true });
}