import logo from '@/assets/logo.svg';
import fb from '@/assets/fb.svg';
import ig from '@/assets/ig.svg';
import linked from '@/assets/linked.svg';
import tiktok from '@/assets/tiktok.svg';

export default function Footer() {
  return (
    <footer className='w-full flex flex-col items-center justify-center py-12 px-[24px] mt-12 bg-white'>
      {/* Logo Footer */}
      <div className='flex items-center gap-2 mb-4'>
        <img src={logo} alt='Booky Logo' className='w-[33px] h-[33px]' />
        <span className='font-bold text-[25.14px] leading-[33px] text-neutral-950'>
          Booky
        </span>
      </div>

      {/* Deskripsi */}
      <p className='text-center text-sm font-medium text-neutral-600 w-full max-w-[1140px] mb-8'>
        Discover inspiring stories & timeless knowledge, ready to borrow
        anytime. Explore online or visit our nearest library branch.
      </p>

      {/* Social Media */}
      <div className='flex flex-col items-center gap-4'>
        <span className='text-sm font-bold text-neutral-950'>
          Follow on Social Media
        </span>
        <div className='flex items-center gap-4'>
          <a
            href='#'
            className='w-[40px] h-[40px] flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors'
          >
            <img src={fb} alt='Facebook' className='w-5 h-5' />
          </a>
          <a
            href='#'
            className='w-[40px] h-[40px] flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors'
          >
            <img src={ig} alt='Instagram' className='w-5 h-5' />
          </a>
          <a
            href='#'
            className='w-[40px] h-[40px] flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors'
          >
            <img src={linked} alt='LinkedIn' className='w-5 h-5' />
          </a>
          <a
            href='#'
            className='w-[40px] h-[40px] flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors'
          >
            <img src={tiktok} alt='TikTok' className='w-5 h-5' />
          </a>
        </div>
      </div>
    </footer>
  );
}
