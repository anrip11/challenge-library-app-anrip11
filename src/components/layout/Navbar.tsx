import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.svg';
import defaultAvatar from '@/assets/avatar.svg';

// Import alat pancing Redux kita
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchUser, logout } from '@/store/userSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Ambil data langsung dari Brankas Global Redux
  const { data: user, status } = useAppSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Status login tidak lagi pakai localStorage murni, tapi cek token & state
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // Begitu Navbar dirender, cek apakah data user masih 'idle' (belum ditarik).
  // Jika ya, suruh Redux untuk ambil datanya ke API!
  useEffect(() => {
    if (token && status === 'idle') {
      dispatch(fetchUser());
    }
  }, [token, status, dispatch]);

  const handleLogout = () => {
    dispatch(logout()); // Bersihkan state global & token
    setIsDropdownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='w-full h-[64px] md:h-[84px] bg-white border-b border-neutral-200 relative z-50'>
      <div className='custom-container w-full h-full flex items-center justify-between relative'>
        <Link to='/' className='flex items-center gap-2 flex-shrink-0'>
          <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
          <span className='hidden md:block font-bold text-[25.14px] leading-[33px] text-neutral-950'>
            Booky
          </span>
        </Link>

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

        <div className='flex items-center gap-4 md:gap-5 flex-shrink-0'>
          {!isLoggedIn ? (
            // --- BEFORE LOGIN ---
            <>
              <div className='flex md:hidden items-center gap-4'>
                <Search className='text-neutral-950' size={24} />
                <div className='relative cursor-pointer'>
                  <ShoppingBag className='text-neutral-950' size={24} />
                  <span className='absolute -top-1 -right-2 bg-[#EE1D52] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-white'>
                    1
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? (
                    <X className='text-neutral-950' size={28} />
                  ) : (
                    <Menu className='text-neutral-950' size={28} />
                  )}
                </button>
              </div>

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

              {isMobileMenuOpen && (
                <div
                  ref={mobileMenuRef}
                  className='absolute top-[64px] left-0 w-full bg-white border-b border-neutral-200 shadow-lg p-4 flex gap-3 md:hidden animate-in slide-in-from-top-2 duration-200'
                >
                  <Link
                    to='/login'
                    className='flex-1'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant='outline'
                      className='w-full rounded-full h-[44px] font-semibold border-neutral-200 text-neutral-950 hover:bg-neutral-50 transition-colors'
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    to='/register'
                    className='flex-1'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className='w-full rounded-full h-[44px] font-semibold bg-primary-dark hover:bg-primary-dark/90 text-white transition-colors'>
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            // --- AFTER LOGIN ---
            <div className='flex items-center gap-4 md:gap-5'>
              <Search className='block md:hidden text-neutral-950' size={24} />

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

              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity'
                >
                  {/* SKELETON & DATA DINAMIS */}
                  {status === 'loading' || status === 'idle' ? (
                    <div className='flex items-center gap-2 md:gap-3 animate-pulse'>
                      <div className='w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-neutral-200'></div>
                      <div className='hidden md:block w-[80px] h-[16px] bg-neutral-200 rounded-md'></div>
                      <ChevronDown
                        size={20}
                        className='text-neutral-300 hidden md:block'
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        src={user?.profilePhoto || defaultAvatar}
                        alt='User Avatar'
                        className='w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full object-cover border border-neutral-100'
                      />
                      <span className='hidden md:block text-[16px] font-semibold text-neutral-950 truncate max-w-[120px]'>
                        {user?.name || 'User'}
                      </span>
                      <ChevronDown
                        size={20}
                        className='text-neutral-950 hidden md:block'
                      />
                    </>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className='absolute right-0 top-full mt-3 md:mt-4 w-48 bg-white border border-neutral-100 rounded-[20px] shadow-lg py-3 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200'>
                    <Link
                      to='/profile'
                      onClick={() => setIsDropdownOpen(false)}
                      className='px-5 py-2 text-[15px] font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors text-left'
                    >
                      Profile
                    </Link>
                    <Link
                      to='#'
                      onClick={() => setIsDropdownOpen(false)}
                      className='px-5 py-2 text-[15px] font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors text-left'
                    >
                      Borrowed List
                    </Link>
                    <Link
                      to='#'
                      onClick={() => setIsDropdownOpen(false)}
                      className='px-5 py-2 text-[15px] font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors text-left'
                    >
                      Reviews
                    </Link>
                    <div className='w-full h-px bg-neutral-100 my-1'></div>
                    <button
                      onClick={handleLogout}
                      className='w-full px-5 py-2 text-[15px] font-bold text-[#EE1D52] hover:bg-neutral-50 transition-colors text-left'
                    >
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
