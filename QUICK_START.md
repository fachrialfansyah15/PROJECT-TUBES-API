# Quick Start Guide 🚀

Panduan singkat untuk menjalankan proyek Quiz App dengan koneksi Frontend-Backend.

## 📋 Prerequisites

- Node.js (v18 atau lebih baru)
- Database (MySQL/PostgreSQL/SQLite)
- Terminal/Command Prompt

## 🏃 Langkah Cepat

### 1. Setup Backend (AdonisJS)

```bash
# Di root project
cd "D:\TUBES API FINAL\PROJECT-TUBES-API"

# Install dependencies
npm install

# Setup database di .env (jika belum)
# Edit file .env dan sesuaikan:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=
# DB_DATABASE=quiz_app

# Jalankan migration
node ace migration:run

# Jalankan seeder (membuat user default)
node ace db:seed

# Jalankan server
node ace serve --watch
```

✅ Backend running di: **http://localhost:3333**

### 2. Setup Frontend (React + Vite)

```bash
# Di folder frontend
cd frontend

# Install dependencies
npm install

# Buat file .env dengan isi:
echo VITE_API_URL=http://localhost:3333/api > .env
# Atau buat manual file .env dengan isi:
# VITE_API_URL=http://localhost:3333/api

# Jalankan frontend
npm run dev
```

✅ Frontend running di: **http://localhost:5173**

## 🧪 Test Koneksi

### 1. Test Backend API

Buka browser: http://localhost:3333/api/quizzes

Harusnya return:
```json
[]
```

### 2. Test dari Frontend

1. Buka: http://localhost:5173
2. Login dengan:
   - Email: `admin@quiz.com`
   - Password: `admin123`
3. Masuk ke Admin Dashboard
4. Klik "Buat Kuis Baru"
5. Isi form dan simpan
6. Quiz baru akan muncul di list! 🎉

## 🔑 Default Users

| Email | Password | Role |
|-------|----------|------|
| admin@quiz.com | admin123 | Admin |
| user@quiz.com | user123 | User |

## ❗ Troubleshooting

### Backend tidak jalan
```bash
# Cek apakah port 3333 sudah digunakan
# Windows:
netstat -ano | findstr :3333

# Pastikan database sudah jalan dan .env benar
```

### Frontend tidak connect
```bash
# Pastikan file .env ada di folder frontend/
# Pastikan backend sudah jalan
# Cek console browser untuk error
```

### Migration error
```bash
# Reset database
node ace migration:rollback --batch=0
node ace migration:run
node ace db:seed
```

## 📁 File Penting yang Dibuat/Diubah

**Backend:**
- ✅ `start/routes.ts` - Routes dengan public API
- ✅ `app/controllers/quizzes_controller.ts` - Simpan quiz + questions
- ✅ `database/seeders/user_seeder.ts` - Default users

**Frontend:**
- ✅ `src/services/api.js` - API service (BARU)
- ✅ `src/store/quizStore.js` - Fetch dari API
- ✅ `src/pages/Home.js` - Loading & error states
- ✅ `src/admin/AdminDashboard.js` - Loading & error states
- ✅ `src/admin/AdminCreateQuiz.js` - POST ke backend
- ⚠️ `.env` - **HARUS DIBUAT MANUAL!**

## 📚 Dokumentasi Lengkap

Lihat **SETUP_GUIDE.md** untuk penjelasan detail.

## ✅ Success Checklist

- [ ] Backend server running (port 3333)
- [ ] Frontend server running (port 5173)
- [ ] File `.env` dibuat di folder `frontend/`
- [ ] Migration dijalankan (`node ace migration:run`)
- [ ] Seeder dijalankan (`node ace db:seed`)
- [ ] Bisa login dengan admin@quiz.com
- [ ] Bisa create quiz dari admin panel
- [ ] Quiz tersimpan di database
- [ ] Quiz muncul di halaman Home

## 🎯 Next Steps

Setelah berhasil running:
1. Test create quiz dengan berbagai data
2. Cek database bahwa data tersimpan
3. Test tampilan quiz di halaman user
4. Implementasi fitur edit & delete quiz

---

**Happy Coding! 🚀**

Jika ada error, lihat SETUP_GUIDE.md bagian Troubleshooting atau cek console/terminal untuk error messages.

