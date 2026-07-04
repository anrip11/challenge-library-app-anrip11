import { Routes, Route } from 'react-router-dom';

// Import Layout
import MainLayout from './components/layout/MainLayout';

// Import Pages
import LoginPage from './features/auth/pages/LoginPage';
import BookListPage from './features/books/pages/BookListPage';
import BookDetailPage from './features/books/pages/BookDetailPage';
import CartPage from './features/cart/pages/CartPage';
import MyLoansPage from './features/loans/pages/MyLoansPage';
import ProfilePage from './features/profile/pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      {/* Route Publik (Tanpa Layout Utama) */}
      <Route path='/login' element={<LoginPage />} />

      {/* Route Terproteksi / Utama (Menggunakan Layout) */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<BookListPage />} />
        <Route path='/books/:id' element={<BookDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/loans' element={<MyLoansPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
