'use client';

 import { useEffect, useState } from 'react';

 export default function ThemeToggle() {
 const [theme, setTheme] = useState<'light' |
'dark'>('dark');

 useEffect(() => {
 const saved = (localStorage.getItem('theme') as any) ?? 'dark';
 setTheme(saved);
 document.documentElement.classList.toggle('light', saved === 'light');
 }, []);

 function toggle() {
 const next = theme === 'dark' ? 'light' :
'dark';
 setTheme(next);
 localStorage.setItem('theme', next);
 document.documentElement.classList.toggle('light',
next === 'light');

 }

 return (
 <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
 {theme === 'dark' ? '🌙' : '☀️'} {theme === 'dark' ? 'Dark' : 'Light'} Mode

 </button>
 );
}