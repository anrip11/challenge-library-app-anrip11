import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen w-full bg-white font-sans'>
      {/* Navigasi di bagian atas */}
      <Navbar />

      {/* Area konten dinamis: Mengambil sisa ruang layar (flex-1) */}
      <main className='flex-1 w-full'>
        {/* <Outlet /> adalah tempat di mana halaman seperti BookListPage nanti di-render */}
        <Outlet />
      </main>

      {/* Footer di bagian paling bawah */}
      <Footer />
    </div>
  );
}
