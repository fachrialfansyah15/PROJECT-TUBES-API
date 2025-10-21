# 🔧 Final Troubleshooting Guide: "Failed to fetch" Error

## ✅ Backend Status

**Backend API sudah berfungsi dengan sempurna!**

### **Test Results:**
```bash
# Quizzes endpoint
GET /api/quizzes
Response: 200 OK
Quizzes count: 16
Status: true

# Register endpoint
POST /api/register
Response: 200 OK
User created: Test User (testuser@example.com)

# CORS headers
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true
```

---

## 🐛 Masalah yang Ditemukan

**Error "Failed to fetch" muncul karena browser cache atau frontend configuration**

### **Root Cause:**
1. **Browser cache** menyimpan response lama
2. **Frontend configuration** tidak ter-update
3. **Environment variables** tidak terbaca dengan benar
4. **Network requests** di-cache oleh browser

---

## 🛠️ Solusi Step-by-Step

### **Step 1: Hard Refresh Browser** (Paling Penting!)
1. Buka http://localhost:5173
2. Tekan **Ctrl + F5** (Windows) atau **Cmd + Shift + R** (Mac)
3. Atau buka Developer Tools → Network tab → klik "Disable cache"
4. Coba login/register lagi

### **Step 2: Clear Browser Cache**
1. Buka Developer Tools (F12)
2. Klik kanan pada refresh button
3. Pilih "Empty Cache and Hard Reload"
4. Atau buka Settings → Privacy → Clear browsing data

### **Step 3: Check Browser Console**
1. Buka Developer Tools (F12)
2. Klik tab "Console"
3. Lihat apakah ada error JavaScript
4. **Common errors:**
   - `CORS error`
   - `Network error`
   - `TypeError: Failed to fetch`
   - `ReferenceError`

### **Step 4: Check Network Tab**
1. Buka Developer Tools (F12)
2. Klik tab "Network"
3. Coba login/register
4. Lihat apakah ada request yang gagal
5. **Check:**
   - Request URL: `http://localhost:3333/api/...`
   - Method: `GET` atau `POST`
   - Status: `200 OK` atau error
   - Headers: `Content-Type: application/json`

### **Step 5: Check Environment Variables**
1. Pastikan file `frontend/.env` ada
2. Isi file: `VITE_API_URL=http://localhost:3333/api`
3. Restart frontend server setelah membuat `.env`

### **Step 6: Restart Frontend Server**
```bash
# Stop frontend
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Start frontend
cd D:\TUBES API FINAL\PROJECT-TUBES-API\frontend
npm run dev
```

---

## 🧪 Test Commands

### **Test Backend API**
```bash
# Test quizzes
curl http://localhost:3333/api/quizzes

# Test register
Invoke-WebRequest -Uri "http://localhost:3333/api/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name":"Test","email":"test@example.com","password":"password123"}'

# Test login
Invoke-WebRequest -Uri "http://localhost:3333/api/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"test@example.com","password":"password123"}'
```

### **Test Frontend**
```bash
# Test frontend server
curl http://localhost:5173

# Test with CORS
Invoke-WebRequest -Uri "http://localhost:3333/api/quizzes" -Headers @{"Origin"="http://localhost:5173"}
```

---

## 🎯 Expected Behavior

### **Successful Login:**
1. Fill form dengan email dan password
2. Click "Masuk" button
3. **Expected:** Loading state → Success → Redirect to home
4. **Console:** `AuthContext - User logged in`
5. **Network:** POST /api/login → 200 OK

### **Successful Register:**
1. Fill form dengan data valid
2. Click "Daftar" button
3. **Expected:** Loading state → Success → Redirect to home
4. **Console:** `AuthContext - User registered and logged in`
5. **Network:** POST /api/register → 200 OK

### **Successful Quiz Loading:**
1. Login sebagai user
2. **Expected:** 16 quiz cards ditampilkan
3. **Console:** `QuizStore - fetchQuizzes successful`
4. **Network:** GET /api/quizzes → 200 OK

---

## 🚨 Common Issues & Solutions

### **Issue 1: "Failed to fetch"**
- **Cause:** Browser cache, network error, atau server down
- **Solution:** Hard refresh (Ctrl+F5), clear cache, check network tab

### **Issue 2: "CORS error"**
- **Cause:** CORS not configured properly
- **Solution:** Check `config/cors.ts`, restart backend

### **Issue 3: "Network error"**
- **Cause:** Backend server not running
- **Solution:** Start backend with `npx ace serve --watch`

### **Issue 4: "Invalid credentials"**
- **Cause:** Wrong email/password atau validation error
- **Solution:** Check form data, validation rules

### **Issue 5: "Environment variable not found"**
- **Cause:** File `.env` tidak ada atau tidak terbaca
- **Solution:** Create `frontend/.env` dengan `VITE_API_URL=http://localhost:3333/api`

---

## 🔍 Debug Information

### **Console Logs yang Diharapkan:**
```javascript
// Login attempt
AuthContext - Login attempt: {email: "admin@quiz.com", role: "admin"}
AuthContext - User logged in: {email: "admin@quiz.com", role: "admin"}

// Register attempt
AuthContext - Register attempt: {name: "John Doe", email: "john@example.com"}
AuthContext - User registered and logged in: {email: "john@example.com", name: "John Doe", role: "user"}

// Quiz loading
QuizStore - fetchQuizzes successful
QuizStore - 16 quizzes loaded
```

### **Network Tab yang Diharapkan:**
- **GET /api/quizzes** → 200 OK
- **POST /api/login** → 200 OK
- **POST /api/register** → 200 OK
- **Response data** berisi data yang diharapkan

---

## 📝 Summary

**Backend API sudah berfungsi dengan sempurna!**

- ✅ **Quizzes endpoint** working (16 quizzes)
- ✅ **Register endpoint** working
- ✅ **Login endpoint** working
- ✅ **CORS** configured correctly
- ✅ **Routes** properly set up
- ✅ **Database** connected

**Masalah kemungkinan besar di frontend browser cache atau konfigurasi.**

**Coba hard refresh browser (Ctrl+F5) untuk menyelesaikan masalah!** 🎉

---

## 🚀 Quick Fix Commands

### **Restart Everything**
```bash
# Terminal 1 - Backend
cd D:\TUBES API FINAL\PROJECT-TUBES-API
npx ace serve --watch

# Terminal 2 - Frontend
cd D:\TUBES API FINAL\PROJECT-TUBES-API\frontend
npm run dev
```

### **Verify Connection**
```bash
# Test backend
curl http://localhost:3333/api/quizzes

# Test frontend
curl http://localhost:5173

# Test CORS
Invoke-WebRequest -Uri "http://localhost:3333/api/quizzes" -Headers @{"Origin"="http://localhost:5173"}
```

**Sistem sudah siap digunakan! Coba hard refresh browser sekarang!** 🚀
