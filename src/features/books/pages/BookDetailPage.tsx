import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import defaultAvatar from '@/assets/avatar.svg';

// ==========================================
// INTERFACES (Tipe Data TypeScript)
// ==========================================
interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

interface BookDetail {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  availableCopies: number;
  author: { name: string };
  category: { id: number; name: string };
  reviews: Review[];
}

interface RelatedBook {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  author: { name: string };
}

// ==========================================
// KOMPONEN BOOK CARD MINI
// Nanti bisa dipisah ke src/components/ui/BookCard.tsx jika mau dipakai ulang
// ==========================================
function BookCard({ book }: { book: RelatedBook }) {
  return (
    <Link to={`/book/${book.id}`} className='flex flex-col gap-3 group'>
      <div className='w-full aspect-[2/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200'>
        <img
          src={book.coverImage}
          alt={book.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='font-bold text-neutral-950 text-sm md:text-base line-clamp-1 group-hover:text-primary-dark transition-colors'>
          {book.title}
        </h3>
        <p className='text-xs md:text-sm text-neutral-500 line-clamp-1'>
          {book.author?.name || 'Unknown Author'}
        </p>
        <div className='flex items-center gap-1 mt-1'>
          <Star className='fill-[#FFC107] text-[#FFC107]' size={14} />
          <span className='text-xs md:text-sm font-bold text-neutral-950'>
            {book.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ==========================================
// HALAMAN UTAMA BOOK DETAIL
// ==========================================
export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>(); // Mengambil ID dari URL (/book/:id)

  const [book, setBook] = useState<BookDetail | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<RelatedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk fitur Load More Reviews
  const [visibleReviews, setVisibleReviews] = useState(6);
  const isMobile = window.innerWidth < 768;

  // Efek untuk mengambil data dari API
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0); // Reset scroll ke atas saat ganti buku

        // 1. Tembak API Detail Buku
        const bookRes = await axios.get(
          `https://library-backend-production-b9cf.up.railway.app/api/books/${id}`
        );
        const bookData = bookRes.data.data;
        setBook(bookData);

        // Reset jumlah review yang tampil tiap kali ganti buku
        setVisibleReviews(isMobile ? 3 : 6);

        // 2. Tembak API Related Books berdasarkan categoryId
        if (bookData.category?.id) {
          const relatedRes = await axios.get(
            `https://library-backend-production-b9cf.up.railway.app/api/books?categoryId=${bookData.category.id}&limit=5`
          );
          // Filter agar buku yang sedang dibuka tidak muncul di daftar rekomendasi
          const filteredRelated = relatedRes.data.data.books
            .filter((b: RelatedBook) => b.id !== Number(id))
            .slice(0, 4); // Ambil maksimal 4 buku

          setRelatedBooks(filteredRelated);
        }
      } catch (error) {
        console.error('Error fetching book detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBookData();
  }, [id, isMobile]);

  // Handler Load More
  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + (isMobile ? 3 : 6));
  };

  // Fungsi Format Tanggal (Contoh: "25 August 2023, 13:30")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(' at', ',');
  };

  if (isLoading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-neutral-50/50'>
        <Loader2 className='animate-spin text-primary-dark' size={40} />
      </div>
    );
  }

  if (!book) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center bg-neutral-50/50 gap-4'>
        <h1 className='text-2xl font-bold text-neutral-950'>Book Not Found</h1>
        <Link to='/'>
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-neutral-50/50 pb-20'>
      <div className='custom-container pt-6 md:pt-8 flex flex-col gap-10 md:gap-16'>
        {/* ========================================== */}
        {/* BREADCRUMB */}
        {/* ========================================== */}
        <div className='flex items-center gap-2 text-sm md:text-[15px] font-semibold text-neutral-500'>
          <Link to='/' className='hover:text-primary-dark transition-colors'>
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to='#' className='hover:text-primary-dark transition-colors'>
            Category
          </Link>
          <ChevronRight size={16} />
          <span className='text-neutral-950'>{book.title}</span>
        </div>

        {/* ========================================== */}
        {/* BOOK DETAIL HERO SECTION */}
        {/* ========================================== */}
        <div className='flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start'>
          {/* KIRI: Cover Buku */}
          <div className='w-[200px] md:w-[300px] lg:w-[350px] flex-shrink-0 mx-auto md:mx-0'>
            <div className='w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border border-neutral-100 bg-white'>
              <img
                src={book.coverImage}
                alt={book.title}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* KANAN: Informasi Buku */}
          <div className='flex flex-col w-full'>
            <div className='inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs md:text-sm font-semibold text-neutral-700 w-fit mb-4'>
              {book.category?.name || 'Uncategorized'}
            </div>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-950 mb-2'>
              {book.title}
            </h1>
            <p className='text-md md:text-lg text-neutral-500 font-medium mb-4'>
              {book.author?.name || 'Unknown Author'}
            </p>

            <div className='flex items-center gap-2 mb-8'>
              <Star className='fill-[#FFC107] text-[#FFC107]' size={20} />
              <span className='text-md md:text-lg font-bold text-neutral-950'>
                {book.rating.toFixed(1)}
              </span>
            </div>

            {/* Statistik (Stock, Rating, Review) */}
            <div className='flex items-center border-y border-neutral-200 py-6 mb-8 w-full max-w-[400px]'>
              <div className='flex-1 flex flex-col items-center justify-center gap-1 border-r border-neutral-200'>
                <span className='text-xl md:text-2xl font-bold text-neutral-950'>
                  {book.availableCopies}
                </span>
                <span className='text-sm text-neutral-500 font-medium'>
                  Stock
                </span>
              </div>
              <div className='flex-1 flex flex-col items-center justify-center gap-1 border-r border-neutral-200'>
                <span className='text-xl md:text-2xl font-bold text-neutral-950'>
                  {book.rating.toFixed(1)}
                </span>
                <span className='text-sm text-neutral-500 font-medium'>
                  Rating
                </span>
              </div>
              <div className='flex-1 flex flex-col items-center justify-center gap-1'>
                <span className='text-xl md:text-2xl font-bold text-neutral-950'>
                  {book.reviewCount}
                </span>
                <span className='text-sm text-neutral-500 font-medium'>
                  Reviews
                </span>
              </div>
            </div>

            {/* Description */}
            <div className='flex flex-col gap-3 mb-10'>
              <h3 className='text-lg md:text-xl font-bold text-neutral-950'>
                Description
              </h3>
              <p className='text-sm md:text-[15px] leading-relaxed text-neutral-600'>
                {book.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-4 w-full max-w-[400px]'>
              <Button
                variant='outline'
                className='flex-1 h-[48px] rounded-full font-bold border-neutral-200'
              >
                Add to Cart
              </Button>
              <Button className='flex-1 h-[48px] rounded-full font-bold bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 text-white'>
                Borrow Book
              </Button>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* REVIEWS SECTION */}
        {/* ========================================== */}
        <div className='flex flex-col gap-6 pt-8 border-t border-neutral-200'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl md:text-3xl font-bold text-neutral-950'>
              Review
            </h2>
            <div className='flex items-center gap-2'>
              <Star className='fill-[#FFC107] text-[#FFC107]' size={18} />
              <span className='font-bold text-neutral-950'>
                {book.rating.toFixed(1)}{' '}
                <span className='text-neutral-500 font-medium'>
                  ({book.reviews?.length || 0} Ulasan)
                </span>
              </span>
            </div>
          </div>

          {/* Grid Reviews */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            {book.reviews?.slice(0, visibleReviews).map((review) => (
              <div
                key={review.id}
                className='bg-white border border-neutral-100 p-5 md:p-6 rounded-2xl flex flex-col gap-4 shadow-sm'
              >
                {/* Header User */}
                <div className='flex items-center gap-3'>
                  <img
                    src={defaultAvatar}
                    alt='User'
                    className='w-[40px] h-[40px] rounded-full object-cover border border-neutral-100'
                  />
                  <div className='flex flex-col'>
                    <span className='font-bold text-neutral-950 text-sm md:text-[15px]'>
                      {review.user?.name}
                    </span>
                    <span className='text-xs md:text-[13px] text-neutral-500'>
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
                {/* Stars */}
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.star
                          ? 'fill-[#FFC107] text-[#FFC107]'
                          : 'fill-neutral-200 text-neutral-200'
                      }
                    />
                  ))}
                </div>
                {/* Comment */}
                <p className='text-sm md:text-[15px] text-neutral-700 leading-relaxed'>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Tombol Load More */}
          {book.reviews && visibleReviews < book.reviews.length && (
            <div className='w-full flex justify-center mt-4'>
              <Button
                variant='outline'
                onClick={handleLoadMore}
                className='rounded-full px-8 h-[44px] font-bold border-neutral-200 hover:bg-neutral-50'
              >
                Load More
              </Button>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* RELATED BOOKS SECTION */}
        {/* ========================================== */}
        {relatedBooks.length > 0 && (
          <div className='flex flex-col gap-6 pt-8 border-t border-neutral-200'>
            <h2 className='text-2xl md:text-3xl font-bold text-neutral-950'>
              Related Books
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
