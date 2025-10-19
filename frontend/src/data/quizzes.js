export const quizzes = [
  {
    id: 'general',
    title: 'Pengetahuan Umum',
    description: 'Campuran fakta sehari-hari untuk memulai',
    createdAt: '15 Oct 2025',
    questions: [
      {
        id: 'q1',
        prompt: 'Apa ibu kota Prancis?',
        options: [
          { id: 'a', text: 'Berlin' },
          { id: 'b', text: 'Madrid' },
          { id: 'c', text: 'Paris' },
          { id: 'd', text: 'Roma' },
        ],
        answerId: 'c',
      },
      {
        id: 'q2',
        prompt: 'Ada berapa benua di Bumi?',
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '6' },
          { id: 'c', text: '7' },
          { id: 'd', text: '8' },
        ],
        answerId: 'c',
      },
    ],
  },
  {
    id: 'science',
    title: 'Ilmu Pengetahuan Alam',
    description: 'Uji pengetahuan Anda tentang dunia alam',
    createdAt: '16 Oct 2025',
    questions: [
      {
        id: 'q1',
        prompt: 'Gas apa yang terutama diserap tumbuhan untuk fotosintesis?',
        options: [
          { id: 'a', text: 'Oksigen' },
          { id: 'b', text: 'Nitrogen' },
          { id: 'c', text: 'Karbon Dioksida' },
          { id: 'd', text: 'Hidrogen' },
        ],
        answerId: 'c',
      },
    ],
  },
]


