# 🔗 Backend-Frontend Connection Guide

Panduan untuk memastikan backend AdonisJS dapat diakses dari frontend Vite di `http://localhost:5173`.

## ✅ Konfigurasi yang Sudah Diperbaiki

### 1. CORS Configuration (`config/cors.ts`)

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

**Perbaikan yang dilakukan:**
- ✅ Menambahkan origin spesifik untuk Vite (`http://localhost:5173`)
- ✅ Menambahkan method `OPTIONS` untuk preflight requests
- ✅ Menambahkan `exposeHeaders` untuk custom headers
- ✅ Mempertahankan `credentials: true` untuk authentication

### 2. Routes Configuration (`start/routes.ts`)

**Public Routes (tidak perlu auth):**
```typescript
// Public Quiz Routes
router
  .group(() => {
    router.get('/quizzes', [QuizzesController, 'index'])
    router.get('/quizzes/:id', [QuizzesController, 'show'])
    router.post('/quizzes', [QuizzesController, 'store'])
    router.options('/quizzes', async ({ response }) => {
      return response.ok({ message: 'OK' })
    })
    router.options('/quizzes/:id', async ({ response }) => {
      return response.ok({ message: 'OK' })
    })
  })
  .prefix('/api')
```

**Perbaikan yang dilakukan:**
- ✅ Menambahkan route `OPTIONS` untuk preflight requests
- ✅ Memastikan route `/api/quizzes` dapat diakses tanpa auth
- ✅ Menambahkan health check endpoint

### 3. Controller Improvements (`app/controllers/quizzes_controller.ts`)

**Response Format yang Konsisten:**
```typescript
// Success Response
{
  success: true,
  data: [...],
  message: 'Quizzes retrieved successfully'
}

// Error Response
{
  success: false,
  message: 'Failed to retrieve quizzes',
  error: 'Error details'
}
```

**Perbaikan yang dilakukan:**
- ✅ Menambahkan error handling di semua methods
- ✅ Response format yang konsisten
- ✅ Validasi input untuk POST requests
- ✅ Proper HTTP status codes

## 🧪 Testing Koneksi

### 1. Automated Test Script

Jalankan script testing otomatis:

```bash
node test-connection.js
```

Script ini akan mengetes:
- ✅ Health check endpoint
- ✅ Root endpoint
- ✅ Quizzes endpoint
- ✅ CORS preflight requests

### 2. Manual Testing

#### Test 1: Health Check
```bash
curl http://localhost:3333/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-20T10:00:00.000Z",
  "uptime": 123.45
}
```

#### Test 2: Root Endpoint
```bash
curl http://localhost:3333/
```

**Expected Response:**
```json
{
  "message": "Quiz API Server is running!",
  "version": "1.0.0",
  "timestamp": "2025-10-20T10:00:00.000Z"
}
```

#### Test 3: Quizzes Endpoint
```bash
curl http://localhost:3333/api/quizzes
```

**Expected Response:**
```json
{
  "success": true,
  "data": [],
  "message": "Quizzes retrieved successfully"
}
```

#### Test 4: CORS Preflight
```bash
curl -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  http://localhost:3333/api/quizzes
```

**Expected Headers:**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

## 🚀 Langkah-langkah Menjalankan

### 1. Start Backend

```bash
# Di root project
node ace migration:run    # Setup database
node ace db:seed          # Create default users
node ace serve --watch    # Start server
```

### 2. Test Backend

```bash
# Run automated test
node test-connection.js

# Atau test manual
curl http://localhost:3333/api/quizzes
```

### 3. Start Frontend

```bash
# Di folder frontend
# Pastikan file .env sudah dibuat dengan:
# VITE_API_URL=http://localhost:3333/api

npm run dev
```

### 4. Test Frontend Connection

1. Buka browser: http://localhost:5173
2. Buka Developer Tools (F12)
3. Cek Network tab untuk request ke backend
4. Cek Console untuk error messages

## 🔧 Troubleshooting

### Problem: CORS Error

**Error:** `Access to fetch at 'http://localhost:3333/api/quizzes' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solutions:**
1. Pastikan backend running di port 3333
2. Cek konfigurasi CORS di `config/cors.ts`
3. Restart backend server
4. Cek browser console untuk detail error

### Problem: Network Error

**Error:** `Failed to fetch` atau `Network error`

**Solutions:**
1. Pastikan backend server running
2. Cek URL di frontend `.env` file
3. Test dengan curl atau Postman
4. Cek firewall/antivirus

### Problem: 404 Not Found

**Error:** `404 Not Found` untuk `/api/quizzes`

**Solutions:**
1. Pastikan routes sudah terdaftar di `start/routes.ts`
2. Restart backend server
3. Cek URL path (harus `/api/quizzes`)
4. Cek controller method

### Problem: 500 Internal Server Error

**Error:** `500 Internal Server Error`

**Solutions:**
1. Cek database connection
2. Jalankan migration: `node ace migration:run`
3. Cek logs di terminal backend
4. Cek model relationships

## 📋 Checklist Verifikasi

- [ ] Backend server running di port 3333
- [ ] Frontend server running di port 5173
- [ ] CORS configuration correct
- [ ] Routes registered properly
- [ ] Database connected
- [ ] Migrations executed
- [ ] Health check endpoint working
- [ ] Quizzes endpoint accessible
- [ ] CORS preflight working
- [ ] Frontend dapat fetch data dari backend

## 🎯 Expected Behavior

### Backend Response Format

**GET /api/quizzes:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Quiz",
      "description": "Quiz description",
      "created_by": 1,
      "created_at": "2025-10-20T10:00:00.000Z",
      "updated_at": "2025-10-20T10:00:00.000Z",
      "questions": [
        {
          "id": 1,
          "question_text": "Sample question?",
          "option_a": "Option A",
          "option_b": "Option B",
          "option_c": "Option C",
          "option_d": "Option D",
          "correct_answer": "a"
        }
      ]
    }
  ],
  "message": "Quizzes retrieved successfully"
}
```

**POST /api/quizzes:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "New Quiz",
    "description": "New quiz description",
    "created_by": 1,
    "created_at": "2025-10-20T10:00:00.000Z",
    "updated_at": "2025-10-20T10:00:00.000Z",
    "questions": []
  },
  "message": "Quiz created successfully"
}
```

## 📞 Support

Jika masih ada masalah:

1. **Cek logs backend** di terminal
2. **Cek browser console** untuk error frontend
3. **Run test script**: `node test-connection.js`
4. **Cek database** dengan SQL query
5. **Restart kedua server** (backend & frontend)

---

**Status: ✅ Backend siap untuk koneksi frontend!**

**Last Updated:** 20 Oktober 2025
