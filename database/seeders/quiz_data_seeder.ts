import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Quiz from '#models/quiz'
import Question from '#models/question'
import Result from '#models/result'
import UserAnswer from '#models/user_answer'
import { DateTime } from 'luxon'

export default class QuizDataSeeder extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding quiz data...')

    // 1. Create Quizzes
    const quizzes = await Quiz.createMany([
      {
        title: 'Dasar Pemrograman',
        description: 'Kuis tentang logika dasar dan algoritma pemrograman.',
        created_by: 1,
      },
      {
        title: 'Teknologi Informasi Umum',
        description: 'Kuis mengenai perkembangan teknologi dan istilah umum IT.',
        created_by: 1,
      },
      {
        title: 'Matematika Dasar',
        description: 'Kuis untuk menguji kemampuan berhitung dan logika dasar matematika.',
        created_by: 1,
      },
      {
        title: 'Basis Data',
        description: 'Kuis mengenai konsep dasar database dan SQL.',
        created_by: 1,
      },
    ])

    console.log(`✅ Created ${quizzes.length} quizzes`)

    // 2. Create Questions
    const questions = await Question.createMany([
      // Kuis: Dasar Pemrograman (quiz_id = quizzes[0].id) - 5 soal
      {
        quiz_id: quizzes[0].id,
        question_text: 'Apa yang dimaksud dengan variabel dalam pemrograman?',
        option_a: 'Tempat menyimpan data',
        option_b: 'Perintah untuk mencetak output',
        option_c: 'Fungsi utama dari program',
        option_d: 'Struktur pengulangan',
        correct_answer: 'A',
      },
      {
        quiz_id: quizzes[0].id,
        question_text: 'Manakah yang termasuk tipe data primitif?',
        option_a: 'Array',
        option_b: 'String',
        option_c: 'Object',
        option_d: 'Function',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[0].id,
        question_text: 'Apa yang dimaksud dengan algoritma?',
        option_a: 'Bahasa pemrograman',
        option_b: 'Langkah-langkah sistematis untuk menyelesaikan masalah',
        option_c: 'Perangkat keras komputer',
        option_d: 'Jenis data',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[0].id,
        question_text: 'Apa fungsi dari loop (perulangan) dalam pemrograman?',
        option_a: 'Menyimpan data',
        option_b: 'Mengulangi eksekusi kode',
        option_c: 'Menampilkan output',
        option_d: 'Menerima input',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[0].id,
        question_text: 'Manakah yang merupakan contoh conditional statement?',
        option_a: 'int x = 5;',
        option_b: 'if (x > 0) { ... }',
        option_c: 'for (int i = 0; i < 10; i++)',
        option_d: 'print("Hello");',
        correct_answer: 'B',
      },

      // Kuis: Teknologi Informasi Umum (quiz_id = quizzes[1].id) - 5 soal
      {
        quiz_id: quizzes[1].id,
        question_text: 'Apa kepanjangan dari "URL"?',
        option_a: 'Uniform Resource Locator',
        option_b: 'Unified Response Logic',
        option_c: 'User Reference Link',
        option_d: 'Universal Routing Line',
        correct_answer: 'A',
      },
      {
        quiz_id: quizzes[1].id,
        question_text: 'Perangkat keras untuk menyimpan data disebut?',
        option_a: 'Monitor',
        option_b: 'CPU',
        option_c: 'Storage',
        option_d: 'RAM',
        correct_answer: 'C',
      },
      {
        quiz_id: quizzes[1].id,
        question_text: 'Apa kepanjangan dari "HTTP"?',
        option_a: 'HyperText Transfer Protocol',
        option_b: 'High Tech Transfer Process',
        option_c: 'Home Tool Transfer Protocol',
        option_d: 'Hyperlink Text Transfer Process',
        correct_answer: 'A',
      },
      {
        quiz_id: quizzes[1].id,
        question_text: 'Apa fungsi dari RAM dalam komputer?',
        option_a: 'Menyimpan data permanen',
        option_b: 'Memproses data sementara',
        option_c: 'Menampilkan gambar',
        option_d: 'Menghubungkan ke internet',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[1].id,
        question_text: 'Apa yang dimaksud dengan "Cloud Computing"?',
        option_a: 'Komputasi menggunakan awan',
        option_b: 'Layanan komputasi melalui internet',
        option_c: 'Komputer yang sangat besar',
        option_d: 'Teknologi untuk gaming',
        correct_answer: 'B',
      },

      // Kuis: Matematika Dasar (quiz_id = quizzes[2].id) - 5 soal
      {
        quiz_id: quizzes[2].id,
        question_text: 'Hasil dari 12 × 8 adalah?',
        option_a: '96',
        option_b: '108',
        option_c: '84',
        option_d: '120',
        correct_answer: 'A',
      },
      {
        quiz_id: quizzes[2].id,
        question_text: 'Jika x = 5, maka nilai dari 2x + 3 adalah?',
        option_a: '8',
        option_b: '10',
        option_c: '13',
        option_d: '15',
        correct_answer: 'C',
      },
      {
        quiz_id: quizzes[2].id,
        question_text: 'Berapa hasil dari 15 + 27?',
        option_a: '40',
        option_b: '42',
        option_c: '41',
        option_d: '43',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[2].id,
        question_text: 'Apa hasil dari 144 ÷ 12?',
        option_a: '10',
        option_b: '11',
        option_c: '12',
        option_d: '13',
        correct_answer: 'C',
      },
      {
        quiz_id: quizzes[2].id,
        question_text: 'Jika a = 3 dan b = 4, berapa nilai dari a² + b²?',
        option_a: '20',
        option_b: '25',
        option_c: '30',
        option_d: '35',
        correct_answer: 'B',
      },

      // Kuis: Basis Data (quiz_id = quizzes[3].id) - 5 soal
      {
        quiz_id: quizzes[3].id,
        question_text: 'Apa fungsi utama dari SQL?',
        option_a: 'Mengelola jaringan komputer',
        option_b: 'Mengatur tampilan web',
        option_c: 'Mengelola dan memanipulasi data di database',
        option_d: 'Menjalankan perintah sistem operasi',
        correct_answer: 'C',
      },
      {
        quiz_id: quizzes[3].id,
        question_text: 'Perintah SQL untuk mengambil data adalah?',
        option_a: 'SELECT',
        option_b: 'INSERT',
        option_c: 'DELETE',
        option_d: 'UPDATE',
        correct_answer: 'A',
      },
      {
        quiz_id: quizzes[3].id,
        question_text: 'Apa yang dimaksud dengan Primary Key?',
        option_a: 'Kunci untuk membuka database',
        option_b: 'Field yang unik untuk mengidentifikasi record',
        option_c: 'Password database',
        option_d: 'Nama tabel',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[3].id,
        question_text: 'Perintah SQL untuk menambah data baru adalah?',
        option_a: 'SELECT',
        option_b: 'INSERT',
        option_c: 'UPDATE',
        option_d: 'DELETE',
        correct_answer: 'B',
      },
      {
        quiz_id: quizzes[3].id,
        question_text: 'Apa yang dimaksud dengan Foreign Key?',
        option_a: 'Kunci asing untuk keamanan',
        option_b: 'Field yang merujuk ke Primary Key tabel lain',
        option_c: 'Kunci untuk enkripsi data',
        option_d: 'Nama database',
        correct_answer: 'B',
      },
    ])

    console.log(`✅ Created ${questions.length} questions`)

    // 3. Create Results
    const results = await Result.createMany([
      // User mengerjakan Dasar Pemrograman
      {
        user_id: 2,
        quiz_id: quizzes[0].id,
        score: 85,
        submitted_at: DateTime.now(),
      },
      // User mengerjakan Teknologi Informasi Umum
      {
        user_id: 2,
        quiz_id: quizzes[1].id,
        score: 90,
        submitted_at: DateTime.now(),
      },
      // User mengerjakan Matematika Dasar
      {
        user_id: 2,
        quiz_id: quizzes[2].id,
        score: 75,
        submitted_at: DateTime.now(),
      },
      // User mengerjakan Basis Data
      {
        user_id: 2,
        quiz_id: quizzes[3].id,
        score: 80,
        submitted_at: DateTime.now(),
      },
      // Admin mencoba Dasar Pemrograman
      {
        user_id: 1,
        quiz_id: quizzes[0].id,
        score: 100,
        submitted_at: DateTime.now(),
      },
    ])

    console.log(`✅ Created ${results.length} results`)

    // 4. Create User Answers
    const userAnswers = await UserAnswer.createMany([
      // User menjawab kuis Dasar Pemrograman
      {
        user_id: 2,
        quiz_id: quizzes[0].id,
        question_id: questions[0].id, // Pertanyaan pertama
        chosen_answer: 'A',
        is_correct: true,
      },
      {
        user_id: 2,
        quiz_id: quizzes[0].id,
        question_id: questions[1].id, // Pertanyaan kedua
        chosen_answer: 'C',
        is_correct: false,
      },
      {
        user_id: 2,
        quiz_id: quizzes[0].id,
        question_id: questions[2].id, // Pertanyaan ketiga
        chosen_answer: 'B',
        is_correct: true,
      },

      // User menjawab kuis Teknologi Informasi Umum
      {
        user_id: 2,
        quiz_id: quizzes[1].id,
        question_id: questions[5].id, // Pertanyaan keenam
        chosen_answer: 'D',
        is_correct: true,
      },
      {
        user_id: 2,
        quiz_id: quizzes[1].id,
        question_id: questions[6].id, // Pertanyaan ketujuh
        chosen_answer: 'A',
        is_correct: true,
      },

      // User menjawab kuis Matematika Dasar
      {
        user_id: 2,
        quiz_id: quizzes[2].id,
        question_id: questions[10].id, // Pertanyaan kesebelas
        chosen_answer: 'C',
        is_correct: true,
      },
      {
        user_id: 2,
        quiz_id: quizzes[2].id,
        question_id: questions[11].id, // Pertanyaan keduabelas
        chosen_answer: 'B',
        is_correct: false,
      },
      {
        user_id: 2,
        quiz_id: quizzes[2].id,
        question_id: questions[12].id, // Pertanyaan ketigabelas
        chosen_answer: 'B',
        is_correct: true,
      },

      // Admin mencoba kuis Dasar Pemrograman dengan hasil sempurna
      {
        user_id: 1,
        quiz_id: quizzes[0].id,
        question_id: questions[0].id, // Pertanyaan pertama
        chosen_answer: 'A',
        is_correct: true,
      },
      {
        user_id: 1,
        quiz_id: quizzes[0].id,
        question_id: questions[1].id, // Pertanyaan kedua
        chosen_answer: 'B',
        is_correct: true,
      },
      {
        user_id: 1,
        quiz_id: quizzes[0].id,
        question_id: questions[2].id, // Pertanyaan ketiga
        chosen_answer: 'B',
        is_correct: true,
      },
    ])

    console.log(`✅ Created ${userAnswers.length} user answers`)

    console.log('🎉 Quiz data seeding completed!')
    console.log('📊 Summary:')
    console.log(`   - ${quizzes.length} quizzes created`)
    console.log(`   - ${questions.length} questions created`)
    console.log(`   - ${results.length} results created`)
    console.log(`   - ${userAnswers.length} user answers created`)
  }
}
