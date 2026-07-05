import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.svg';

export default function RegisterPage() {
  const navigate = useNavigate();

  // 1. State untuk menampung data input form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. State untuk interaksi UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 3. Fungsi Submit Async ke Backend Railway
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset state error sebelum mulai
    setIsError(false);
    setErrorMessage('');

    // Validasi Frontend: Cek apakah password dan confirm password sama
    if (password !== confirmPassword) {
      setIsError(true);
      setErrorMessage('Password dan Confirm Password tidak cocok.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://library-backend-production-b9cf.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Gagal melakukan pendaftaran. Silakan coba lagi.'
        );
      }

      // Jika sukses, arahkan ke halaman Login
      navigate('/login');
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Terjadi kesalahan koneksi yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-[24px] py-12'>
      <div className='w-full max-w-[400px] flex flex-col'>
        <div className='flex items-center justify-start gap-2 mb-5'>
          <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
          <span className='font-bold text-[25.14px] leading-[33px] text-neutral-950'>
            Booky
          </span>
        </div>

        <div className='flex flex-col text-center sm:text-left gap-1 mb-[20px]'>
          <h1 className='text-display-sm font-bold text-neutral-950'>
            Register
          </h1>
          <p className='text-md font-semibold text-neutral-700'>
            Create your account to start borrowing books.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>Name</label>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              className={`rounded-xl px-[16px] py-[8px] h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:border-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>Email</label>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className={`rounded-xl px-[16px] py-[8px] h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:border-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Nomor Handphone
            </label>
            <Input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              required
              className={`rounded-xl px-[16px] py-[8px] h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isError
                  ? 'border-[#EE1D52] text-neutral-950 focus-visible:border-[#EE1D52]'
                  : 'border-neutral-200 text-neutral-950'
              }`}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Password
            </label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className={`rounded-xl px-[16px] py-[8px] pr-12 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  isError
                    ? 'border-[#EE1D52] text-neutral-950 focus-visible:border-[#EE1D52]'
                    : 'border-neutral-200 text-neutral-950'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors disabled:opacity-50'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>
              Confirm Password
            </label>
            <div className='relative'>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                className={`rounded-xl px-[16px] py-[8px] pr-12 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  isError
                    ? 'border-[#EE1D52] text-neutral-950 focus-visible:border-[#EE1D52]'
                    : 'border-neutral-200 text-neutral-950'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors disabled:opacity-50'
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Teks error sesungguhnya dari server akan muncul di sini */}
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52] mt-1'>
                {errorMessage}
              </span>
            )}
          </div>

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full h-auto py-[10px] font-semibold text-md transition-all mt-1 flex items-center justify-center gap-2'
          >
            {isLoading && <Loader2 className='animate-spin' size={20} />}
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>

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
