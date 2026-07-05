import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.svg';
import avatar from '@/assets/avatar.svg';

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className='w-full h-[64px] md:h-[84px] bg-white border-b border-neutral-200'>
      <div className='custom-container w-full h-full flex items-center justify-between relative'>
        {/* 1. Kiri: Logo (Teks "Booky" hanya muncul di Desktop) */}
        <Link to='/' className='flex items-center gap-2 flex-shrink-0'>
          <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
          <span className='hidden md:block font-bold text-[25.14px] leading-[33px] text-neutral-950'>
            Booky
          </span>
        </Link>

        {/* 2. Tengah: Search Bar (Desktop After Login) */}
        {isLoggedIn && (
          <div className='hidden md:flex w-[500px] mx-8 relative'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400'
              size={20}
            />
            <Input
              type='text'
              placeholder='Search book'
              className='w-full pl-12 pr-4 py-2 h-[44px] rounded-full border-neutral-200 focus-visible:ring-primary-dark text-md text-neutral-950 placeholder:text-neutral-500'
            />
          </div>
        )}

        {/* 3. Kanan: Area Aksi Dinamis */}
        <div className='flex items-center gap-4 md:gap-5 flex-shrink-0'>
          {!isLoggedIn ? (
            // ==============================
            // TAMPILAN JIKA BELUM LOGIN
            // ==============================
            <>
              {/* MOBILE: Search, Cart, Hamburger Menu */}
              <div className='flex md:hidden items-center gap-4'>
                <Search className='text-neutral-950' size={24} />
                <div className='relative cursor-pointer'>
                  <ShoppingBag className='text-neutral-950' size={24} />
                  <span className='absolute -top-1 -right-2 bg-[#EE1D52] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-white'>
                    1
                  </span>
                </div>
                <Menu className='text-neutral-950' size={28} />
              </div>

              {/* DESKTOP: Login / Register Button */}
              <div className='hidden md:flex items-center gap-4'>
                <Link to='/login'>
                  <Button
                    variant='outline'
                    className='rounded-full px-6 py-2 h-auto font-semibold border-neutral-200 text-neutral-950 hover:bg-neutral-50 transition-colors'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button className='rounded-full px-6 py-2 h-auto font-semibold bg-primary-dark hover:bg-primary-dark/90 text-white transition-colors'>
                    Register
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // ==============================
            // TAMPILAN JIKA SUDAH LOGIN
            // ==============================
            <div className='flex items-center gap-4 md:gap-5'>
              {/* MOBILE: Ikon Search (Hanya muncul di HP) */}
              <Search className='block md:hidden text-neutral-950' size={24} />

              {/* Ikon Tas Belanja (Mobile & Desktop) */}
              <div className='relative cursor-pointer'>
                <ShoppingBag
                  className='text-neutral-950 hover:text-neutral-700 transition-colors'
                  size={24}
                />
                <span className='absolute -top-1 -right-2 bg-[#EE1D52] text-white text-[10px] md:text-[11px] font-bold w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex items-center justify-center rounded-full border-2 border-white'>
                  1
                </span>
              </div>

              <div className='hidden md:block w-px h-8 bg-neutral-200 mx-1'></div>

              {/* Profile Dropdown */}
              <div className='relative'>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity'
                >
                  <img
                    src={avatar}
                    alt='User Avatar'
                    className='w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full object-cover border border-neutral-100'
                  />
                  {/* Nama & Panah disembunyikan di Mobile */}
                  <span className='hidden md:block text-[16px] font-semibold text-neutral-950'>
                    John Doe
                  </span>
                  <ChevronDown
                    size={20}
                    className='text-neutral-950 hidden md:block'
                  />
                </button>

                {isDropdownOpen && (
                  <div className='absolute right-0 mt-4 w-48 bg-white border border-neutral-200 rounded-2xl shadow-lg py-2 z-50'>
                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#EE1D52] hover:bg-neutral-50 transition-colors'
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
