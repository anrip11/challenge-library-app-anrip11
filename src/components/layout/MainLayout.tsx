// src/components/layout/MainLayout.tsx
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-zinc-50 flex flex-col'>
      {/* Header dengan tinggi dinamis: 64px di mobile, 84px di layar besar */}
      <header className='h-[64px] md:h-[84px] bg-white border-b flex items-center px-6 justify-between w-full'>
        <h1 className='text-xl font-bold text-zinc-900'>
          <Link to='/'>Library MVP</Link>
        </h1>
        <nav className='space-x-4 text-sm font-medium text-zinc-600'>
          <Link to='/' className='hover:text-zinc-900'>
            Books
          </Link>
          <Link to='/cart' className='hover:text-zinc-900'>
            Cart
          </Link>
          <Link to='/loans' className='hover:text-zinc-900'>
            My Loans
          </Link>
          <Link to='/profile' className='hover:text-zinc-900'>
            Profile
          </Link>
        </nav>
      </header>

      {/* Konten Halaman */}
      <main className='flex-1 max-w-7xl w-full mx-auto p-6'>
        <Outlet />
      </main>
    </div>
  );
}
