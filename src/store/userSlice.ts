import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Tipe Data
interface UserProfile {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  profilePhoto?: string | null;
}

interface UserState {
  data: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle', // 'idle' = belum ngapa-ngapain
  error: null,
};

// 2. Fungsi Async untuk narik data API (Thunk)
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await axios.get(
        'https://library-backend-production-b9cf.up.railway.app/api/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Logic bongkar JSON yang sama persis seperti di ProfilePage
      const userData =
        response.data.data?.profile ||
        response.data.data?.user ||
        response.data.data ||
        response.data;
      return userData as UserProfile;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token'); // Auto hapus token jika expired
      }
      return rejectWithValue('Gagal mengambil data profil');
    }
  }
);

// 3. Konfigurasi Slice (State Manager)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Fungsi untuk hapus data saat logout
    logout: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'; // Trigger skeleton loading
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Masukkan data asli
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
