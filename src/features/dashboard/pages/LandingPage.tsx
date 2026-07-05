import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import bannerHero from '@/assets/banner-hero.png';
import fictionIcon from '@/assets/fiction.svg';
import nonFictionIcon from '@/assets/non-fiction.svg';
import selfImprovementIcon from '@/assets/self-improvement.svg';
import financeIcon from '@/assets/finance.svg';
import scienceIcon from '@/assets/sience.svg';
import educationIcon from '@/assets/education.svg';
import avatar from '@/assets/avatar.svg';
import starIcon from '@/assets/star.svg';
import bookIcon from '@/assets/books.svg';

// --- Interfaces ---
interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  author: {
    name: string;
  };
}

interface Author {
  id: number;
  name: string;
  bookCount: number;
}

// --- Data Statis Kategori ---
const CATEGORIES = [
  { id: 1, name: 'Fiction', icon: fictionIcon },
  { id: 2, name: 'Non-Fiction', icon: nonFictionIcon },
  { id: 3, name: 'Self-Improvement', icon: selfImprovementIcon },
  { id: 4, name: 'Finance', icon: financeIcon },
  { id: 5, name: 'Science', icon: scienceIcon },
  { id: 6, name: 'Education', icon: educationIcon },
];

export default function LandingPage() {
  // 1. State Hero Banner
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // 2. State Recommendation Books
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  // 3. State Popular Authors
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);

  // --- Effects ---

  // Auto-Slider Banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  // Fetch Recommendation Books
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoadingBooks(true);
      try {
        const response = await axios.get(
          `https://library-backend-production-b9cf.up.railway.app/api/books/recommend?by=rating&page=${page}&limit=8`
        );
        const newBooks = response.data.data.books;
        const totalPages = response.data.data.pagination.totalPages;

        // Logika Load More: Tambahkan ke bawah array lama, atau replace jika page 1
        setBooks((prev) => (page === 1 ? newBooks : [...prev, ...newBooks]));
        setHasMoreBooks(page < totalPages);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    fetchBooks();
  }, [page]);

  // Fetch Popular Authors
  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoadingAuthors(true);
      try {
        const response = await axios.get(
          'https://library-backend-production-b9cf.up.railway.app/api/authors/popular?limit=4'
        );
        setAuthors(response.data.data.authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setIsLoadingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className='w-full flex flex-col pt-6 pb-20 gap-12 md:gap-16 custom-container'>
      {/* ========================================== */}
      {/* SECTION 1: HERO BANNER */}
      {/* ========================================== */}
      <section className='w-full flex flex-col items-center gap-3 md:gap-4'>
        <div className='w-full overflow-hidden rounded-[16px] md:rounded-[32px] bg-neutral-100 shadow-sm relative'>
          <div
            className='flex transition-transform duration-700 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {[...Array(totalSlides)].map((_, index) => (
              <img
                key={index}
                src={bannerHero}
                alt={`Booky Slide ${index + 1}`}
                className='w-full flex-shrink-0 object-cover'
              />
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2 mt-1'>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[6px] md:h-[8px] rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-[18px] md:w-[24px] bg-primary-dark'
                  : 'w-[6px] md:w-[8px] bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: CATEGORY LIST */}
      {/* ========================================== */}
      <section className='w-full'>
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className='group flex flex-col bg-white border border-neutral-100 rounded-[12px] md:rounded-[20px] p-1.5 md:p-2 hover:shadow-md hover:border-primary-dark/30 transition-all duration-300 text-left gap-2 md:gap-3'
            >
              <div className='w-full h-[60px] md:h-[80px] bg-[#EEF4FF] group-hover:bg-[#E0ECFF] transition-colors rounded-xl md:rounded-2xl flex items-center justify-center'>
                <img
                  src={category.icon}
                  alt={category.name}
                  className='w-[32px] h-[32px] md:w-[48px] md:h-[48px] object-contain group-hover:scale-110 transition-transform duration-300'
                />
              </div>
              <span className='text-[10px] md:text-[15px] font-semibold text-neutral-950 px-1 md:px-2 pb-1 md:pb-2 leading-tight md:leading-normal'>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: RECOMMENDATION */}
      {/* ========================================== */}
      <section className='w-full flex flex-col gap-6'>
        <h2 className='text-3xl md:text-4xl font-bold leading-tight text-neutral-950'>
          Recommendation
        </h2>

        {/* Grid Responsive: 2 (Mobile), 3 (Tablet), 4 (Desktop) */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {/* SKELETON LOADING (Tampil saat initial load atau load more) */}
          {isLoadingBooks && page === 1
            ? [...Array(8)].map((_, i) => (
                <div key={i} className='flex flex-col gap-3 animate-pulse'>
                  <div className='w-full aspect-[3/4] rounded-2xl bg-neutral-200'></div>
                  <div className='flex flex-col gap-2 px-1 mt-1'>
                    <div className='h-4 bg-neutral-200 rounded w-3/4'></div>
                    <div className='h-3 bg-neutral-200 rounded w-1/2'></div>
                    <div className='h-4 bg-neutral-200 rounded w-1/4 mt-1'></div>
                  </div>
                </div>
              ))
            : /* DATA ASLI */
              books.map((book) => (
                <div
                  key={book.id}
                  className='flex flex-col gap-3 group cursor-pointer'
                >
                  <div className='w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100'>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                  </div>
                  <div className='flex flex-col gap-1 px-1'>
                    <h3 className='font-bold text-[15px] md:text-[16px] text-neutral-950 line-clamp-1'>
                      {book.title}
                    </h3>
                    <p className='text-[13px] md:text-[14px] text-neutral-500 line-clamp-1'>
                      {book.author.name}
                    </p>
                    <div className='flex items-center gap-1.5 mt-1'>
                      <img
                        src={starIcon}
                        alt='Rating'
                        className='w-3.5 h-3.5 md:w-4 md:h-4'
                      />
                      <span className='text-[13px] md:text-[14px] font-semibold text-neutral-700'>
                        {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* TOMBOL LOAD MORE */}
        {hasMoreBooks && (
          <div className='w-full flex justify-center mt-6'>
            <Button
              variant='outline'
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoadingBooks}
              className='rounded-full px-8 py-2 h-auto font-semibold border-neutral-200 text-neutral-950 hover:bg-neutral-50 transition-colors disabled:opacity-50'
            >
              {isLoadingBooks && page > 1 ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </section>

      {/* ========================================== */}
      {/* SECTION 4: POPULAR AUTHORS */}
      {/* ========================================== */}
      <section className='w-full flex flex-col gap-6 mt-4'>
        <h2 className='text-3xl md:text-4xl font-bold leading-tight text-neutral-950'>
          Popular Authors
        </h2>

        {/* Grid Responsive: 1 (Mobile), 3 (Tablet), 4 (Desktop) */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {/* SKELETON LOADING AUTHORS */}
          {isLoadingAuthors
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className='flex items-center gap-4 p-4 rounded-[20px] border border-neutral-100 bg-white animate-pulse'
                >
                  <div className='w-[60px] h-[60px] rounded-full bg-neutral-200 flex-shrink-0'></div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <div className='h-4 bg-neutral-200 rounded w-1/2'></div>
                    <div className='h-3 bg-neutral-200 rounded w-1/3'></div>
                  </div>
                </div>
              ))
            : /* DATA ASLI AUTHORS */
              authors.map((author) => (
                <div
                  key={author.id}
                  className='flex items-center gap-4 p-4 rounded-[20px] border border-neutral-100 bg-white hover:shadow-md transition-shadow cursor-pointer'
                >
                  <img
                    src={avatar}
                    alt={author.name}
                    className='w-[60px] h-[60px] rounded-full object-cover border border-neutral-50 flex-shrink-0'
                  />
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-bold text-[15px] md:text-[16px] text-neutral-950 line-clamp-1'>
                      {author.name}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <img
                        src={bookIcon}
                        alt='Books'
                        className='w-3.5 h-3.5 md:w-4 md:h-4'
                      />
                      <span className='text-[13px] md:text-[14px] font-semibold text-neutral-500'>
                        {author.bookCount} books
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
