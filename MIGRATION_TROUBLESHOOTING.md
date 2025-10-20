# 🔧 Migration Troubleshooting Guide

## ❌ Error yang Ditemukan

```
TypeError: router.options is not a function
at anonymous start\routes.ts:39
```

## ✅ Perbaikan yang Sudah Dilakukan

### 1. Routes Configuration Fixed

**Masalah:** `router.options()` tidak tersedia di AdonisJS

**Solusi:** Menghapus method `router.options()` dari routes

**Sebelum:**
```typescript
router.options('/quizzes', async ({ response }) => {
  return response.ok({ message: 'OK' })
})
```

**Sesudah:**
```typescript
// Method options dihapus - CORS akan menangani preflight requests
```

### 2. CORS Configuration

CORS sudah dikonfigurasi dengan benar di `config/cors.ts` untuk menangani preflight requests:

```typescript
const corsConfig = defineConfig({
  enabled: true,
  origin: [
    'http://localhost:5173', // Vite default port
    'http://localhost:3000', // Alternative React port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: ['X-Total-Count'],
  credentials: true,
  maxAge: 90,
})
```

## 🚀 Langkah-langkah Menjalankan

### 1. Jalankan Migration

Coba salah satu command berikut:

```bash
# Method 1: npx ace
npx ace migration:run

# Method 2: node ace.js
node ace.js migration:run

# Method 3: npm run dev (akan otomatis run migration)
npm run dev
```

### 2. Jalankan Seeder

```bash
# Setelah migration berhasil
npx ace db:seed
# atau
node ace.js db:seed
```

### 3. Start Server

```bash
# Development mode
npm run dev

# Atau production mode
npm start
```

## 🧪 Test Koneksi

### 1. Test Backend

```bash
# Test health check
curl http://localhost:3333/health

# Test quizzes endpoint
curl http://localhost:3333/api/quizzes
```

### 2. Test Frontend

1. Pastikan file `.env` ada di folder `frontend/`:
   ```
   VITE_API_URL=http://localhost:3333/api
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Buka browser: http://localhost:5173

## 🔍 Verifikasi Database

### 1. Cek Tabel

```sql
-- Cek apakah tabel sudah dibuat
SHOW TABLES;

-- Cek struktur tabel quizzes
DESCRIBE quizzes;

-- Cek struktur tabel questions
DESCRIBE questions;

-- Cek data users
SELECT * FROM users;
```

### 2. Cek Data

```sql
-- Cek quizzes
SELECT * FROM quizzes;

-- Cek questions
SELECT * FROM questions;

-- Cek users
SELECT * FROM users;
```

## 🐛 Common Issues

### Issue 1: Migration Command Not Found

**Error:** `Cannot find module 'ace'`

**Solutions:**
1. Gunakan `npx ace` instead of `node ace`
2. Install dependencies: `npm install`
3. Cek apakah ada file `ace.js` di root project

### Issue 2: Database Connection Error

**Error:** `SQLSTATE[HY000]` atau connection error

**Solutions:**
1. Cek konfigurasi database di `.env`
2. Pastikan database server running
3. Cek credentials database

### Issue 3: CORS Error di Frontend

**Error:** `Access to fetch at 'http://localhost:3333/api/quizzes' has been blocked by CORS policy`

**Solutions:**
1. Pastikan backend running di port 3333
2. Cek konfigurasi CORS di `config/cors.ts`
3. Restart backend server

## 📋 Checklist Verifikasi

- [ ] Routes configuration fixed (router.options removed)
- [ ] CORS configuration correct
- [ ] Database migration executed
- [ ] User seeder executed
- [ ] Backend server running
- [ ] Frontend .env file created
- [ ] Frontend server running
- [ ] API endpoints accessible
- [ ] CORS preflight working

## 🎯 Expected Results

### Backend Health Check
```json
{
  "status": "healthy",
  "timestamp": "2025-10-20T10:00:00.000Z",
  "uptime": 123.45
}
```

### Quizzes API Response
```json
{
  "success": true,
  "data": [],
  "message": "Quizzes retrieved successfully"
}
```

### CORS Headers
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

## 📞 Next Steps

1. **Jalankan migration** dengan salah satu method di atas
2. **Jalankan seeder** untuk membuat user default
3. **Start backend server** dengan `npm run dev`
4. **Test API endpoints** dengan curl atau browser
5. **Start frontend** dan test koneksi

## 🔧 Manual Commands

Jika semua method otomatis gagal, coba manual:

```bash
# 1. Install dependencies
npm install

# 2. Check database config
cat .env | grep DB_

# 3. Test database connection
node -e "console.log('Testing DB connection...')"

# 4. Run migration manually
node ace.js migration:run

# 5. Run seeder
node ace.js db:seed

# 6. Start server
node bin/server.js
```

---

**Status: ✅ Routes fixed, siap untuk migration!**

**Last Updated:** 20 Oktober 2025
