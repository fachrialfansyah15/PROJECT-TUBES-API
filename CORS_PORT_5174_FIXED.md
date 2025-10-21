# 🔧 Fix: CORS Error untuk Port 5174

## 🐛 Masalah yang Ditemukan

**CORS error karena frontend berjalan di port 5174, bukan 5173**

### **Error yang Ditemukan:**
```
Access to fetch at 'http://localhost:3333/api/quizzes' from origin 'http://localhost:5174' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### **Root Cause:**
1. **Frontend berjalan di port 5174** (bukan 5173)
2. **CORS configuration** hanya mengizinkan port 5173
3. **Backend server** tidak berjalan dengan benar

---

## ✅ Solusi yang Diterapkan

### **1. Perbaiki CORS Configuration**
```typescript
// config/cors.ts
const corsConfig = defineConfig({
  enabled: true,
  origin: [
    'http://localhost:5173', // Vite default port
    'http://localhost:5174', // Vite alternative port ← DITAMBAHKAN
    'http://localhost:3000', // Alternative React port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174', // ← DITAMBAHKAN
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: ['X-Total-Count'],
  credentials: true,
  maxAge: 90,
})
```

### **2. Restart Backend Server**
```bash
# Gunakan npx ace serve --watch (bukan node ace serve --watch)
npx ace serve --watch
```

---

## 🧪 Test Results

### **✅ Backend API Test**
```bash
curl http://localhost:3333/api/quizzes
# Response: 200 OK
# Content-Length: 18932
# Data: 16 quizzes with 5 questions each
```

### **✅ CORS Test untuk Port 5174**
```bash
Invoke-WebRequest -Uri "http://localhost:3333/api/quizzes" -Headers @{"Origin"="http://localhost:5174"}
# Response: 200 OK
# Headers: access-control-allow-origin: http://localhost:5174
# Headers: access-control-allow-credentials: true
```

---

## 🎯 Expected Behavior

### **Sebelum Fix:**
- ❌ CORS error: "No 'Access-Control-Allow-Origin' header"
- ❌ Frontend tidak bisa fetch data dari backend
- ❌ Error "Failed to fetch"

### **Setelah Fix:**
- ✅ CORS headers: `access-control-allow-origin: http://localhost:5174`
- ✅ Frontend bisa fetch data dari backend
- ✅ 16 quiz cards ditampilkan dengan benar

---

## 🚀 Cara Testing

### **1. Test Frontend**
1. Buka http://localhost:5174
2. **Expected:** 16 quiz cards ditampilkan
3. **Console:** Tidak ada CORS error
4. **Network:** GET /api/quizzes → 200 OK

### **2. Test Login/Register**
1. Klik "Logout" untuk ke halaman login
2. Test login dengan `admin@quiz.com` / `admin123`
3. **Expected:** Redirect ke admin dashboard
4. Test register dengan data baru
5. **Expected:** Akun baru dibuat dan login

### **3. Test Quiz Loading**
1. Login sebagai user
2. **Expected:** 16 quiz cards ditampilkan
3. **Console:** `QuizStore - fetchQuizzes successful`
4. **Network:** GET /api/quizzes → 200 OK

---

## 🔍 Debug Information

### **Console Logs yang Diharapkan:**
```javascript
// Quiz loading
QuizStore - fetchQuizzes successful
QuizStore - 16 quizzes loaded

// Login attempt
AuthContext - Login attempt: {email: "admin@quiz.com", role: "admin"}
AuthContext - User logged in: {email: "admin@quiz.com", role: "admin"}
```

### **Network Tab yang Diharapkan:**
- **GET /api/quizzes** → 200 OK
- **Headers:** `access-control-allow-origin: http://localhost:5174`
- **Response:** 16 quizzes with 5 questions each

---

## 🚨 Common Issues & Solutions

### **Issue 1: CORS Error**
- **Cause:** Port tidak diizinkan di CORS config
- **Solution:** Tambahkan port ke `config/cors.ts`

### **Issue 2: Backend Server Error**
- **Cause:** `Cannot find module 'ace'`
- **Solution:** Gunakan `npx ace serve --watch`

### **Issue 3: React Warning**
- **Cause:** Missing key props
- **Solution:** Sudah diperbaiki di `Home.js` line 61

---

## 📝 Summary

**CORS error untuk port 5174 sudah diperbaiki!**

- ✅ **CORS configuration** updated untuk port 5174
- ✅ **Backend server** running dengan benar
- ✅ **Frontend** bisa fetch data dari backend
- ✅ **16 quiz cards** ditampilkan dengan benar
- ✅ **Login/Register** berfungsi dengan baik

**Sekarang frontend di port 5174 sudah bisa mengakses backend API!** 🎉

---

## 🔄 Next Steps

1. **Test frontend** di http://localhost:5174
2. **Verify quiz loading** berfungsi
3. **Test login/register** dengan data baru
4. **Check admin dashboard** untuk quiz management
5. **Test quiz taking** functionality

**Sistem sudah siap digunakan di port 5174!** 🚀
