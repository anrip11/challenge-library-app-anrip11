import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import LandingPage from './features/dashboard/pages/LandingPage';
import MainLayout from './components/layout/MainLayout';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import BookDetailPage from '@/features/books/pages/BookDetailPage';

export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Auth */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* 2. Halaman Utama */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        {/* 2. Tambahkan Route Book Detail di dalam MainLayout agar Navbar tetap muncul */}
        <Route path='/book/:id' element={<BookDetailPage />} />
      </Route>
    </Routes>
  );
}
