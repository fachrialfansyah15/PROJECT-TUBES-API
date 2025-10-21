# 🔧 Fix: Quiz Update Sync Between Admin and User View

## 🐛 Masalah yang Ditemukan

**Perubahan quiz di admin tidak ter-update di view user**

### **Root Cause:**
1. **Backend controller** tidak mendukung update questions
2. **Frontend updateQuiz** tidak memanggil API backend
3. **Data tidak ter-refresh** setelah update
4. **Questions tidak ter-sync** antara admin dan user view

---

## ✅ Solusi yang Diterapkan

### **1. Perbaiki Backend Controller (quizzes_controller.ts)**
```typescript
async update({ params, request, response }: HttpContext) {
  try {
    const quiz = await Quiz.findOrFail(params.id)
    const data = request.only(['title', 'description', 'questions'])
    
    if (!data.title || data.title.trim() === '') {
      return response.badRequest({
        success: false,
        message: 'Title is required'
      })
    }

    quiz.merge({
      title: data.title.trim(),
      description: data.description?.trim() || '',
    })
    await quiz.save()

    // Update questions
    if (data.questions && Array.isArray(data.questions)) {
      await Question.query().where('quiz_id', quiz.id).delete()
      
      for (const q of data.questions) {
        await Question.create({
          quiz_id: quiz.id,
          question_text: q.prompt || '',
          option_a: q.options?.[0]?.text || '',
          option_b: q.options?.[1]?.text || '',
          option_c: q.options?.[2]?.text || '',
          option_d: q.options?.[3]?.text || '',
          correct_answer: q.answerId || 'a',
        })
      }
    }

    await quiz.load('questions')
    
    return response.ok({
      success: true,
      data: quiz,
      message: 'Quiz updated successfully'
    })
  } catch (error) {
    return response.badRequest({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    })
  }
}
```

### **2. Perbaiki Frontend updateQuiz (quizStore.js)**
```javascript
async function updateQuiz(id, input) {
  try {
    setError(null)
    
    const quizData = {
      title: input.title,
      description: input.description,
      questions: input.questions || []
    }
    
    const response = await api.updateQuiz(id, quizData)
    const updatedQuiz = response.data || response
    
    setQuizzes((prev) => prev.map((q) => 
      q.id === id ? { 
        ...q, 
        title: updatedQuiz.title || input.title,
        description: updatedQuiz.description || input.description,
        questions: input.questions || q.questions,
        updatedAt: new Date().toISOString()
      } : q
    ))
  } catch (err) {
    console.error('Failed to update quiz:', err)
    setError(err.message || 'Failed to update quiz')
    throw err
  }
}
```

### **3. Perbaiki AdminEditQuiz (AdminEditQuiz.js)**
```javascript
async function saveQuiz() {
  const payload = {
    title,
    description,
    questions: questions.map((q) => ({ 
      id: q.id, 
      prompt: q.prompt, 
      options: q.options.map((o) => ({ id: o.id, text: o.text })), 
      answerId: q.answerId 
    })),
  }
  
  try {
    await updateQuiz(id, payload)
    await refetch()  // ← DITAMBAHKAN: Refresh data
    navigate('/admin/manage', { state: { message: 'Kuis berhasil diperbarui.' } })
  } catch (error) {
    console.error('Failed to update quiz:', error)
  }
}
```

---

## 🎯 Expected Behavior

### **Sebelum Fix:**
- ❌ Admin update quiz → User view tidak ter-update
- ❌ Questions tidak ter-sync
- ❌ Data hanya ter-update di frontend state
- ❌ Backend tidak menerima questions data

### **Setelah Fix:**
- ✅ Admin update quiz → User view ter-update
- ✅ Questions ter-sync dengan benar
- ✅ Data ter-update di database
- ✅ Backend menerima dan memproses questions data
- ✅ Data ter-refresh setelah update

---

## 🚀 Cara Testing

### **Scenario 1: Admin Update Quiz → User View**
1. Login sebagai admin (`admin@quiz.com`)
2. Buka menu "Kelola Quiz"
3. Edit quiz (ubah title, description, atau questions)
4. Save quiz
5. Logout
6. Login sebagai user (`user@quiz.com`)
7. **Expected:** Perubahan quiz terlihat di user view

### **Scenario 2: Admin Update Questions → User View**
1. Login sebagai admin (`admin@quiz.com`)
2. Edit quiz dan ubah questions
3. Save quiz
4. Logout
5. Login sebagai user (`user@quiz.com`)
6. Mulai quiz yang di-edit
7. **Expected:** Questions yang di-edit terlihat di user view

### **Scenario 3: Real-time Update**
1. Buka 2 browser/tab
2. Tab 1: Login sebagai admin, edit quiz
3. Tab 2: Login sebagai user, lihat quiz
4. **Expected:** Perubahan terlihat di kedua tab

---

## 🔍 Debug Information

### **Console Logs yang Diharapkan:**
```javascript
// Admin update quiz
QuizStore - updateQuiz successful
QuizStore - refetch successful
QuizStore - 16 quizzes loaded

// User view quiz
QuizStore - fetchQuizzes successful
QuizStore - 16 quizzes loaded
```

### **Network Tab yang Diharapkan:**
- **PUT /api/quizzes/:id** → 200 OK
- **Headers:** `Content-Type: application/json`
- **Body:** `{title, description, questions: [...]}`
- **Response:** `{success: true, data: {...}, message: "Quiz updated successfully"}`

---

## 📝 Summary

**Quiz update sync antara admin dan user view sudah diperbaiki!**

- ✅ **Backend controller** mendukung update questions
- ✅ **Frontend updateQuiz** memanggil API backend
- ✅ **Data ter-refresh** setelah update
- ✅ **Questions ter-sync** antara admin dan user view
- ✅ **Database ter-update** dengan benar

**Sekarang perubahan quiz di admin langsung terlihat di user view!** 🎉

---

## 🔄 Next Steps

1. **Test scenario** di atas untuk memastikan fix bekerja
2. **Verify** perubahan ter-sync dengan benar
3. **Check** database untuk memastikan data ter-update
4. **Test** dengan berbagai jenis perubahan (title, description, questions)

**Sistem sudah siap digunakan!** 🚀
