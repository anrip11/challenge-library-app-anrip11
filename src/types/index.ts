// src/types/index.ts

// 1. Tipe Data User & Auth
export interface User {
  id: string | number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// 2. Tipe Data Buku & Review
export interface Review {
  id: string | number;
  userId: string | number;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Book {
  id: string | number;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description: string;
  stock: number;
  reviews?: Review[]; // Opsional karena kadang list buku tidak bawa data review
}

// 3. Tipe Data Peminjaman (Loans)
export interface Loan {
  id: string | number;
  bookId: string | number;
  bookTitle: string; // Memudahkan tampilan di list
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}
