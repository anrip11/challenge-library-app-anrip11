import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.svg';

export default function LoginPage() {
  const navigate = useNavigate();

  // 1. State untuk menampung data form[cite: 1]
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. State untuk interaksi UI (Loading & Error)[cite: 1]
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Untuk pesan error dari server[cite: 1]
  const [isLoading, setIsLoading] = useState(false);

  // 3. Fungsi Submit Async ke Backend Railway[cite: 1]
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://library-backend-production-b9cf.up.railway.app/api/auth/login', //[cite: 1]
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Mengirim email dan password dalam bentuk JSON[cite: 1]
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json(); //[cite: 1]

      // Jika response dari server bukan 200 OK (misal: password salah)[cite: 1]
      if (!response.ok) {
        throw new Error(
          data.message ||
            'Gagal melakukan login. Silakan periksa kembali kredensial Anda.' //[cite: 1]
        );
      }

      // --- FIX LOGIC: Deteksi lokasi token dengan aman ---
      // Mencari token di berbagai kemungkinan letak respon JSON
      const actualToken = data?.data?.token || data?.token || data?.accessToken;

      if (!actualToken) {
        throw new Error(
          'Gagal mengekstrak token dari server. Hubungi tim backend.'
        );
      }

      // Jika sukses, simpan Token VIP ke Local Storage[cite: 1]
      localStorage.setItem('token', actualToken);

      // Arahkan ke halaman utama[cite: 1]
      navigate('/');
    } catch (error) {
      setIsError(true);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Terjadi kesalahan sistem yang tidak diketahui.'); //[cite: 1]
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-[24px]'>
      <div className='w-full max-w-[400px] flex flex-col'>
        <div className='flex items-center justify-start gap-2 mb-5'>
          <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
          <span className='font-bold text-[25.14px] leading-[33px] text-neutral-950'>
            Booky
          </span>
        </div>

        <div className='flex flex-col text-center sm:text-left gap-1 mb-[20px]'>
          <h1 className='text-display-sm font-bold text-neutral-950'>Login</h1>
          <p className='text-md font-semibold text-neutral-700'>
            Sign in to manage your library account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-neutral-950'>Email</label>
            <Input
              type='email'
              placeholder=''
              value={email} // Binding nilai[cite: 1]
              onChange={(e) => setEmail(e.target.value)} // Update state saat diketik[cite: 1]
              disabled={isLoading}
              className={`rounded-xl px-[16px] py-[8px] h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isError
                  ? 'border-[#EE1D52] text-[#EE1D52] placeholder:text-[#EE1D52] focus-visible:border-[#EE1D52]'
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
                placeholder=''
                value={password} // Binding nilai[cite: 1]
                onChange={(e) => setPassword(e.target.value)} // Update state saat diketik[cite: 1]
                disabled={isLoading}
                className={`rounded-xl px-[16px] py-[8px] pr-12 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  isError
                    ? 'border-[#EE1D52] text-[#EE1D52] placeholder:text-[#EE1D52] focus-visible:border-[#EE1D52]'
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

            {/* Tampilkan pesan error spesifik dari backend jika ada[cite: 1] */}
            {isError && (
              <span className='text-sm font-medium text-[#EE1D52]'>
                {errorMessage}
              </span>
            )}
          </div>

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full h-auto py-[10px] font-semibold text-md transition-all mt-1 flex items-center justify-center gap-2'
          >
            {/* Animasi loading menggunakan icon Loader2 dari lucide-react[cite: 1] */}
            {isLoading && <Loader2 className='animate-spin' size={20} />}
            {isLoading ? 'Signing in...' : 'Login'}
          </Button>

          <div className='text-center mt-2'>
            <span className='text-md font-semibold text-neutral-950'>
              Don't have an account?{' '}
            </span>
            <Link
              to='/register'
              className='text-md font-semibold text-primary-dark hover:underline'
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
