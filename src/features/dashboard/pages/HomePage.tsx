import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';

export default function HomePage() {
  const navigate = useNavigate();

  // Nanti, nama ini akan kita ambil dari API backend menggunakan token VIP
  const userName = 'Pengguna Booky';

  const handleLogout = () => {
    // 1. Hapus token VIP dari Local Storage
    localStorage.removeItem('token');

    // 2. Arahkan kembali ke halaman Login
    navigate('/login');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-[24px]'>
      <div className='w-full max-w-[400px] flex flex-col items-center text-center p-8 border border-neutral-200 rounded-2xl shadow-sm'>
        {/* Logo */}
        <img src={logo} alt='Booky Logo' className='w-[48px] h-[48px] mb-4' />

        {/* Teks Sambutan */}
        <h1 className='text-display-sm font-bold text-neutral-950 mb-2'>
          Selamat datang,
        </h1>
        <p className='text-xl font-semibold text-primary-dark mb-8'>
          {userName}!
        </p>

        <p className='text-sm text-neutral-600 mb-8'>
          Ini adalah halaman utama sementara. Nanti daftar buku akan muncul di
          sini.
        </p>

        {/* Tombol Logout */}
        <Button
          onClick={handleLogout}
          variant='outline'
          className='w-full border-[#EE1D52] text-[#EE1D52] hover:bg-[#EE1D52] hover:text-white rounded-full h-auto py-[10px] font-semibold text-md transition-all flex items-center justify-center gap-2'
        >
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}
