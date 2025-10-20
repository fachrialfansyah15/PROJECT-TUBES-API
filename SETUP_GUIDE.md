# Panduan Setup - Koneksi Frontend & Backend

Proyek ini telah berhasil diintegrasikan antara frontend (React + Vite) dan backend (AdonisJS).

## 📋 Yang Sudah Dilakukan

### Backend (AdonisJS)
✅ Endpoint publik untuk quiz:
- `GET /api/quizzes` - Menampilkan semua quiz (tidak perlu auth)
- `GET /api/quizzes/:id` - Detail quiz (tidak perlu auth)

✅ Endpoint auth untuk manajemen quiz:
- `POST /api/quizzes` - Tambah quiz baru (perlu auth)
- `PUT /api/quizzes/:id` - Update quiz (perlu auth)
- `DELETE /api/quizzes/:id` - Hapus quiz (perlu auth)

✅ Database migration sudah ada untuk:
- `users`
- `quizzes` (id, title, description, created_by, timestamps)
- `questions` (id, quiz_id, question_text, option_a-d, correct_answer)
- `results`
- `user_answers`

✅ CORS sudah dikonfigurasi

### Frontend (React)
✅ API Service (`src/services/api.js`) untuk komunikasi dengan backend
✅ QuizStore diupdate untuk fetch data dari API
✅ Loading dan error states ditambahkan
✅ AdminCreateQuiz sekarang POST ke backend
✅ Data dummy dihilangkan, diganti dengan data dari API

## 🚀 Cara Menjalankan

### 1. Setup Backend

```bash
# Pastikan sudah di root project
cd "D:\TUBES API FINAL\PROJECT-TUBES-API"

# Install dependencies (jika belum)
npm install

# Pastikan file .env sudah dikonfigurasi
# Cek koneksi database di .env:
# DB_CONNECTION=mysql (atau postgres/sqlite)
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=
# DB_DATABASE=quiz_app

# Jalankan migration (jika belum)
node ace migration:run

# Jalankan seeder untuk membuat user default (PENTING!)
node ace db:seed

# Jalankan backend server
node ace serve --watch
```

Backend akan berjalan di: **http://localhost:3333**

### 2. Setup Frontend

**PENTING**: Buat file `.env` di folder `frontend/`:

```bash
cd frontend
```

Buat file `.env` dengan isi:
```
VITE_API_URL=http://localhost:3333/api
```

Kemudian jalankan:

```bash
# Install dependencies (jika belum)
npm install

# Jalankan frontend
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173** (atau port lain yang ditampilkan)

## 🧪 Cara Testing

### 1. Test Koneksi API

Buka browser dan akses:
```
http://localhost:3333/api/quizzes
```

Harusnya menampilkan JSON array (kosong jika belum ada data):
```json
[]
```

### 2. Test dari Frontend

1. Buka frontend di browser: `http://localhost:5173`
2. Login dengan akun yang sudah ada (atau register dulu)
3. **Awalnya halaman Home akan kosong** karena belum ada quiz di database
4. Pergi ke **Admin Dashboard**
5. Klik **"Buat Kuis Baru"**
6. Isi form:
   - Judul: "Quiz Pertama Saya"
   - Deskripsi: "Ini adalah quiz percobaan"
   - Tambahkan minimal 1 pertanyaan dengan 4 opsi
   - Pilih jawaban yang benar
7. Klik **"Simpan Kuis"**

**Yang akan terjadi:**
- Frontend akan POST data ke `http://localhost:3333/api/quizzes`
- Backend akan simpan ke database
- Quiz baru akan muncul di list

### 3. Cek Database

Buka database Anda dan cek tabel `quizzes`:
```sql
SELECT * FROM quizzes;
```

Harusnya ada data quiz yang baru dibuat.

## 🔍 Troubleshooting

### Frontend tidak bisa connect ke backend

**Error**: `Failed to fetch` atau `Network error`

**Solusi:**
1. Pastikan backend berjalan di `http://localhost:3333`
2. Cek file `.env` di folder `frontend/` sudah ada dan benar
3. Pastikan CORS sudah enabled di backend (sudah dikonfigurasi)

### Quiz tidak tersimpan ke database

**Error**: `401 Unauthorized` atau `403 Forbidden`

**Solusi:**
Backend memerlukan autentikasi untuk POST quiz. Pastikan:
1. Anda sudah login di frontend
2. Token auth tersimpan di state
3. Update `api.js` untuk mengirim token:

```javascript
// Di frontend/src/services/api.js
async request(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token') // sesuaikan dengan nama key token Anda
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }
  // ... rest of code
}
```

### Database migration gagal

**Error**: `Table already exists`

**Solusi:**
```bash
# Rollback migration
node ace migration:rollback

# Run migration lagi
node ace migration:run
```

### Port sudah digunakan

**Error**: `Port 3333 already in use`

**Solusi:**
1. Matikan proses yang menggunakan port tersebut
2. Atau ubah port di backend `config/app.ts`
3. Jangan lupa update `VITE_API_URL` di frontend `.env`

## 👤 Default Users

Seeder akan membuat 2 user default:

| Email | Password | Keterangan |
|-------|----------|------------|
| admin@quiz.com | admin123 | Admin user |
| user@quiz.com | user123 | Regular user |

Gunakan kredensial ini untuk login di frontend.

## 📝 Catatan Penting

### ✅ Pertanyaan Sudah Tersimpan

Saat ini, **quiz (title & description) DAN questions sudah tersimpan** ke database.

Controller sudah diupdate untuk menyimpan questions secara otomatis.

### 🔐 Authentication

**Status:** Authentication untuk quiz creation sementara dinonaktifkan untuk memudahkan testing.

Endpoint publik (tidak perlu auth):
- GET /api/quizzes (list)
- GET /api/quizzes/:id (detail)
- POST /api/quizzes (create) ← Sementara public

Endpoint yang masih perlu auth:
- PUT /api/quizzes/:id (update)
- DELETE /api/quizzes/:id (delete)

**Next step:** Integrate proper authentication antara frontend dan backend.

### 🎯 Next Steps

1. ✅ ~~Implement penyimpanan questions di backend~~ (Sudah selesai)
2. **Integrate proper authentication** antara frontend dan backend
3. **Update quiz**: Implementasi edit quiz dengan questions
4. **Delete quiz**: Implementasi delete dengan konfirmasi
5. **Validasi input**: Tambahkan validasi di backend dan frontend
6. **Deploy**: Setup untuk production

## ✅ Checklist

- [x] Backend endpoints tersedia
- [x] Frontend bisa fetch quizzes dari backend
- [x] Loading & error states ditambahkan
- [x] POST quiz baru ke backend
- [x] Penyimpanan questions ke database
- [x] User seeder untuk default users
- [ ] .env file dibuat di frontend (manual) ⚠️ **USER ACTION REQUIRED**
- [ ] Migration dijalankan ⚠️ **USER ACTION REQUIRED**
- [ ] Seeder dijalankan ⚠️ **USER ACTION REQUIRED**
- [ ] Auth token dikirim di request header (future enhancement)
- [ ] Test end-to-end flow ⚠️ **USER ACTION REQUIRED**

## 📞 Support

Jika ada masalah:
1. Cek console browser untuk error frontend
2. Cek terminal backend untuk error API
3. Cek database untuk memastikan data tersimpan
4. Pastikan kedua server (frontend & backend) berjalan bersamaan

---

**Happy Coding! 🚀**

