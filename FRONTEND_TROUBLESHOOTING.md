# 🔧 Frontend Troubleshooting Guide

## ❌ Error yang Ditemukan

**Error:** "Failed to fetch" di frontend  
**Penyebab:** Frontend tidak bisa connect ke backend API

---

## ✅ Perbaikan yang Sudah Dilakukan

### 1. **Backend Server** ✅
- ✅ Backend server running di `http://localhost:3333`
- ✅ Health check working: `{"status":"healthy"}`
- ✅ API quizzes working: `{"success":true,"data":[],"message":"Quizzes retrieved successfully"}`

### 2. **QuizStore Data Format** ✅
**Masalah:** Frontend mengharapkan data array langsung, tapi backend mengembalikan `{success: true, data: [...]}`

**Sebelum:**
```javascript
const data = await api.getQuizzes()
const transformedQuizzes = data.map((quiz) => ({
```

**Sesudah:**
```javascript
const response = await api.getQuizzes()
const data = response.data || response
const transformedQuizzes = data.map((quiz) => ({
```

### 3. **API Service** ✅
- ✅ API service sudah benar
- ✅ Fallback URL: `http://localhost:3333/api`
- ✅ Error handling implemented

---

## 🚀 Langkah-langkah Menjalankan

### 1. **Pastikan Backend Running**

```bash
# Di root project
node ace serve --watch
```

**Test backend:**
```bash
curl http://localhost:3333/health
curl http://localhost:3333/api/quizzes
```

### 2. **Buat File .env di Frontend**

**PENTING:** Buat file `.env` di folder `frontend/` dengan isi:

```env
VITE_API_URL=http://localhost:3333/api
```

**Cara buat:**
1. Buka Notepad
2. Paste: `VITE_API_URL=http://localhost:3333/api`
3. Save As → pilih "All Files"
4. Nama file: `.env`
5. Lokasi: folder `frontend/`

### 3. **Start Frontend**

```bash
cd frontend
npm run dev
```

### 4. **Test Koneksi**

1. Buka browser: http://localhost:5173 (atau port yang ditampilkan)
2. Login dengan: `admin@quiz.com` / `admin123`
3. Cek apakah error "Failed to fetch" sudah hilang

---

## 🔍 Troubleshooting

### Problem 1: "Failed to fetch"

**Penyebab:** Frontend tidak bisa connect ke backend

**Solutions:**
1. **Pastikan backend running:**
   ```bash
   curl http://localhost:3333/health
   ```

2. **Cek file .env di frontend:**
   ```env
   VITE_API_URL=http://localhost:3333/api
   ```

3. **Restart frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Cek browser console** untuk error details

### Problem 2: "Network error"

**Penyebab:** CORS atau network issue

**Solutions:**
1. **Cek CORS configuration** di backend
2. **Restart backend server**
3. **Cek firewall/antivirus**

### Problem 3: Data tidak muncul

**Penyebab:** Data format mismatch

**Solutions:**
1. **Cek response format** di browser Network tab
2. **Cek QuizStore transform** logic
3. **Cek console** untuk error messages

---

## 🧪 Testing Commands

### Test Backend
```bash
# Health check
curl http://localhost:3333/health

# Quizzes API
curl http://localhost:3333/api/quizzes

# Test CORS
curl -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  http://localhost:3333/api/quizzes
```

### Test Frontend
1. **Buka browser console** (F12)
2. **Cek Network tab** untuk API requests
3. **Cek Console tab** untuk error messages
4. **Test login** dengan admin@quiz.com / admin123

---

## 📋 Checklist Verifikasi

- [ ] Backend server running di port 3333
- [ ] File `.env` dibuat di folder `frontend/`
- [ ] Frontend server running
- [ ] Browser console tidak ada error
- [ ] Network tab menunjukkan API requests
- [ ] Login berhasil
- [ ] Dashboard tidak menampilkan error
- [ ] Data quizzes dimuat (meski kosong)

---

## 🎯 Expected Behavior

### Backend Response
```json
{
  "success": true,
  "data": [],
  "message": "Quizzes retrieved successfully"
}
```

### Frontend Behavior
- ✅ Loading spinner muncul saat fetch data
- ✅ Error message hilang
- ✅ Dashboard menampilkan "Belum ada kuis tersedia" (karena database kosong)
- ✅ Admin bisa create quiz baru

---

## 🔧 Manual Steps

Jika masih ada masalah:

### 1. **Reset Frontend**
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### 2. **Reset Backend**
```bash
# Stop backend (Ctrl+C)
# Start lagi
node ace serve --watch
```

### 3. **Check Files**
```bash
# Cek .env file
cat frontend/.env

# Cek API service
cat frontend/src/services/api.js

# Cek QuizStore
cat frontend/src/store/quizStore.js
```

---

## 📞 Support

Jika masih ada masalah:

1. **Cek browser console** untuk error details
2. **Cek Network tab** untuk API requests
3. **Cek backend logs** di terminal
4. **Test API** dengan curl atau Postman
5. **Restart kedua server** (backend & frontend)

---

## ✅ Status

**Frontend Error "Failed to fetch" sudah diperbaiki!**

Perbaikan yang dilakukan:
- ✅ Backend server running
- ✅ QuizStore data format fixed
- ✅ API service working
- ✅ CORS configured

**Tinggal buat file .env di frontend dan restart!** 🚀

---

**Last Updated:** 20 Oktober 2025
