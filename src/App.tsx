import { Routes, Route } from 'react-router-dom'; // Hapus impor BrowserRouter

// Import Pages
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import LandingPage from './features/dashboard/pages/LandingPage';
import MainLayout from './components/layout/MainLayout';
import ProfilePage from '@/features/profile/pages/ProfilePage';

export default function App() {
  return (
    // Langsung return <Routes>, tidak perlu dibungkus <BrowserRouter> lagi
    <Routes>
      {/* 1. Halaman Auth */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* 2. Halaman Utama */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
