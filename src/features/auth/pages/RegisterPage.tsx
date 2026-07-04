import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.svg';

export default function RegisterPage() {
  const navigate = useNavigate();

  // State terpisah untuk masing-masing ikon mata
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State untuk trigger error UI
  const [isError, setIsError] = useState(false);

  // Handler simulasi submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isError) {
      navigate('/login');
    } else {
      setIsError(true);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-[24px] py-12'>
      {/* Container Utama dengan lebar fix 400px */}
      <div className='w-full max-w-[400px] flex flex-col'>
        {/* 1. Bagian Brand (Logo & Teks) */}
        <div className='flex items-center justify-start gap-2 mb-5'>
          <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
          <span className='font-bold text-[25.14px] leading-[33px] text-neutral-950'>
            Booky
          </span>
        </div>

        {/* 2. Bagian Judul */}
        <div className='flex flex-col text-center sm:text-left gap-1 mb-[20px]'>
          <h1 className='text-display-sm font-bold text-neutral-950'>
            Register
          </h1>
          <p className='text-md font-semibold text-neutral-700'>
            Create your account to start borrowing books.
          </p>
        </div>

        {/* 3. Form Utama */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
          {/* Input: Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>Name</label>
            <Input
              type='text'
              placeholder=''
              className={`rounded-xl px-[16px] py-[8px] h-auto ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:ring-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                Text Helper
              </span>
            )}
          </div>

          {/* Input: Email */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>Email</label>
            <Input
              type='email'
              placeholder=''
              className={`rounded-xl px-[16px] py-[8px] h-auto ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:ring-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                Text Helper
              </span>
            )}
          </div>

          {/* Input: Nomor Handphone */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Nomor Handphone
            </label>
            <Input
              type='tel'
              placeholder=''
              className={`rounded-xl px-[16px] py-[8px] h-auto ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:ring-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                Text Helper
              </span>
            )}
          </div>

          {/* Input: Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Password
            </label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder=''
                className={`rounded-xl px-[16px] py-[8px] pr-12 h-auto ${
                  isError
                    ? 'border-[#EE1D52] text-neutral-950 focus-visible:ring-[#EE1D52]'
                    : 'border-neutral-200 text-neutral-950'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                Text Helper
              </span>
            )}
          </div>

          {/* Input: Confirm Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Confirm Password
            </label>
            <div className='relative'>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder=''
                className={`rounded-xl px-[16px] py-[8px] pr-12 h-auto ${
                  isError
                    ? 'border-[#EE1D52] text-neutral-950 focus-visible:ring-[#EE1D52]'
                    : 'border-neutral-200 text-neutral-950'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                Text Helper
              </span>
            )}
          </div>

          {/* Tombol Submit */}
          <Button
            type='submit'
            className='w-full bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full h-auto py-[10px] font-semibold text-md transition-all mt-1'
          >
            Submit
          </Button>

          {/* Footer Login */}
          <div className='text-center mt-2'>
            <span className='text-md font-semibold text-neutral-950'>
              Already have an account?{' '}
            </span>
            <Link
              to='/login'
              className='text-md font-semibold text-primary-dark hover:underline'
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
