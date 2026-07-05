import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, X, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import defaultAvatar from '@/assets/avatar.svg';

interface UserProfile {
  name: string;
  email?: string;
  phone: string;
  profilePhoto: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE KHUSUS DEBUGGER (Tanpa 'any') ---
  const [debugData, setDebugData] = useState<Record<string, unknown> | null>(
    null
  );

  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('token');

  const fetchProfile = useCallback(async () => {
    setDebugData(null);

    if (!token) {
      setDebugData({ error: 'Token tidak ditemukan di localStorage!' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        'https://library-backend-production-b9cf.up.railway.app/api/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData =
        response.data.data?.profile ||
        response.data.data?.user ||
        response.data.data ||
        response.data;
      setUser(userData);
    } catch (error) {
      console.error('Error fetching profile:', error);

      if (axios.isAxiosError(error)) {
        setDebugData({
          '1. Token di LocalStorage': token,
          '2. Format Headers Terkirim':
            error.config?.headers?.Authorization || 'Kosong',
          '3. Status Error dari API': error.response?.status || 'Unknown',
          '4. Pesan Balasan API': error.response?.data || 'Tidak ada pesan',
        });
      } else {
        setDebugData({
          error: 'Terjadi error tidak dikenal (Bukan dari API).',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
    };
    loadData();
  }, [fetchProfile]);

  const handleOpenModal = () => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setPreviewPhoto(user.profilePhoto || defaultAvatar);
      setEditPhotoFile(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditPhotoFile(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditPhotoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewPhoto(objectUrl);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('phone', editPhone);
      if (editPhotoFile) {
        formData.append('profilePhoto', editPhotoFile);
      }

      await axios.patch(
        'https://library-backend-production-b9cf.up.railway.app/api/me',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsModalOpen(false);
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal update profil! Cek console.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-neutral-50/50 pb-20'>
      <div className='custom-container pt-8 md:pt-12 flex flex-col gap-8'>
        {/* TABS NAVIGATION */}
        <div className='w-full max-w-[500px] bg-neutral-100 p-1.5 rounded-full flex items-center'>
          <div className='flex-1 py-2 px-4 bg-white rounded-full shadow-sm text-center text-sm md:text-[15px] font-bold text-neutral-950 cursor-pointer'>
            Profile
          </div>
          <a
            href='#'
            className='flex-1 py-2 px-4 rounded-full text-center text-sm md:text-[15px] font-semibold text-neutral-500 hover:text-neutral-950 transition-colors'
          >
            Borrowed List
          </a>
          <a
            href='#'
            className='flex-1 py-2 px-4 rounded-full text-center text-sm md:text-[15px] font-semibold text-neutral-500 hover:text-neutral-950 transition-colors'
          >
            Reviews
          </a>
        </div>

        {/* DEBUGGER BOX */}
        {debugData && (
          <div className='w-full max-w-[500px] bg-red-50 border-2 border-red-500 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-3'>
            <div className='flex items-center gap-2 text-red-600 font-bold'>
              <AlertTriangle size={24} />
              <h2>🚨 DEBUGGER MODE ACTIVE</h2>
            </div>
            <p className='text-sm text-red-700 font-medium'>
              Request ke API gagal. Berikut adalah detail informasinya:
            </p>
            <div className='bg-neutral-950 text-green-400 p-4 rounded-xl overflow-x-auto text-xs md:text-sm font-mono'>
              <pre>{JSON.stringify(debugData, null, 2)}</pre>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className='mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full'
            >
              Hapus Token & Kembali ke Login
            </Button>
          </div>
        )}

        {/* PROFILE CARD */}
        <div className='flex flex-col gap-6 w-full max-w-[500px]'>
          <h1 className='text-3xl md:text-4xl font-bold text-neutral-950'>
            Profile
          </h1>

          <div className='w-full bg-white border border-neutral-100 rounded-3xl p-6 md:p-8 flex flex-col gap-8 shadow-sm'>
            {isLoading ? (
              <div className='flex flex-col gap-6 animate-pulse'>
                <div className='w-[80px] h-[80px] rounded-full bg-neutral-200'></div>
                <div className='w-full h-10 bg-neutral-200 mt-4 rounded-xl'></div>
              </div>
            ) : (
              <>
                <img
                  src={user?.profilePhoto || defaultAvatar}
                  alt='Profile Avatar'
                  className='w-[80px] h-[80px] rounded-full object-cover border-2 border-neutral-100'
                />
                <div className='flex flex-col gap-0'>
                  <div className='flex justify-between items-center py-4 border-b border-neutral-100'>
                    <span className='text-sm md:text-[15px] text-neutral-500'>
                      Name
                    </span>
                    <span className='text-sm md:text-[16px] font-bold text-neutral-950'>
                      {user?.name || '-'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-4 border-b border-neutral-100'>
                    <span className='text-sm md:text-[15px] text-neutral-500'>
                      Email
                    </span>
                    <span className='text-sm md:text-[16px] font-bold text-neutral-950'>
                      {user?.email || 'Not available'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-4 border-b border-neutral-100'>
                    <span className='text-sm md:text-[15px] text-neutral-500'>
                      Nomor Handphone
                    </span>
                    <span className='text-sm md:text-[16px] font-bold text-neutral-950'>
                      {user?.phone || '-'}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleOpenModal}
                  disabled={!!debugData}
                  className='w-full rounded-full h-[48px] font-bold bg-primary-dark hover:bg-primary-dark/90 text-white transition-colors mt-2 disabled:opacity-50'
                >
                  Update Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE MODAL */}
      {isModalOpen && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm'>
          {/* Box Modal dengan Ukuran Pasti (Kebal Gepeng) */}
          <div className='w-full max-w-[420px] min-w-[300px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden'>
            {/* Modal Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-100'>
              <h2 className='text-xl font-bold text-neutral-950'>
                Update Profile
              </h2>
              <button
                onClick={handleCloseModal}
                type='button'
                className='p-2 text-neutral-400 hover:text-neutral-950 transition-colors bg-neutral-50 hover:bg-neutral-100 rounded-full'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleUpdateProfile}
              className='flex flex-col p-6 gap-6'
            >
              {/* Photo Upload Area */}
              <div className='flex flex-col items-center gap-3'>
                <div
                  className='relative w-[100px] h-[100px] shrink-0 rounded-full overflow-hidden border-2 border-neutral-100 group cursor-pointer'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={previewPhoto}
                    alt='Preview'
                    className='w-full h-full object-cover'
                  />
                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Camera className='text-white' size={24} />
                  </div>
                </div>
                <span className='text-[13px] text-neutral-500 font-medium'>
                  Tap to change photo
                </span>

                {/* Hidden File Input */}
                <input
                  type='file'
                  ref={fileInputRef}
                  accept='image/jpeg, image/png, image/webp'
                  className='hidden'
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Form Inputs */}
              <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-1.5 w-full'>
                  <label className='text-sm font-semibold text-neutral-950'>
                    Name
                  </label>
                  <Input
                    type='text'
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder='Enter your full name'
                    className='h-[44px] rounded-xl border-neutral-200 focus-visible:ring-primary-dark w-full'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1.5 w-full'>
                  <label className='text-sm font-semibold text-neutral-950'>
                    Phone Number
                  </label>
                  <Input
                    type='tel'
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder='e.g. 081234567890'
                    className='h-[44px] rounded-xl border-neutral-200 focus-visible:ring-primary-dark w-full'
                    required
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className='flex items-center gap-3 mt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleCloseModal}
                  className='flex-1 h-[44px] rounded-full font-semibold'
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='flex-1 h-[44px] rounded-full font-bold bg-primary-dark hover:bg-primary-dark/90 text-white'
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
