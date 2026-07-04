import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

// TODO: Buka komentar ini nanti setelah filenya dibuat!
// import BookListPage from './features/books/pages/BookListPage';
// import BookDetailPage from './features/books/pages/BookDetailPage';
// import CartPage from './features/cart/pages/CartPage';
// import MyLoansPage from './features/loans/pages/MyLoansPage';
// import ProfilePage from './features/profile/pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      {/* Route Publik (Tanpa Layout Utama) */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Route Terproteksi / Utama (Menggunakan Layout) */}
      <Route element={<MainLayout />}>
        {/* TODO: Buka komentar route ini secara bertahap saat kita mendevelop fiturnya */}
        {/* <Route path='/' element={<BookListPage />} /> */}
        {/* <Route path='/books/:id' element={<BookDetailPage />} /> */}
        {/* <Route path='/cart' element={<CartPage />} /> */}
        {/* <Route path='/loans' element={<MyLoansPage />} /> */}
        {/* <Route path='/profile' element={<ProfilePage />} /> */}
      </Route>
    </Routes>
  );
}
