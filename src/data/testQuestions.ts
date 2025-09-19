import { Question } from '../types';

export const preTestQuestions: Question[] = [
  // Addition Questions (5)
  {
    id: 'pre-add-1',
    question: 'What is 1/4 + 1/4?',
    options: ['1/8', '2/4', '1/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Add numerators: 1 + 1 = 2, keep denominator: 2/4 = 1/2 (simplified)',
    difficulty: 'easy'
  },
  {
    id: 'pre-add-2',
    question: 'What is 1/3 + 1/6?',
    options: ['2/9', '1/2', '2/6', '1/9'],
    correctAnswer: 1,
    explanation: 'Find common denominator: 1/3 = 2/6, then 2/6 + 1/6 = 3/6 = 1/2',
    difficulty: 'medium'
  },
  {
    id: 'pre-add-3',
    question: 'What is 2 1/4 + 1 1/2?',
    options: ['3 3/4', '3 1/2', '3 2/4', '4 1/4'],
    correctAnswer: 0,
    explanation: 'Add whole numbers: 2 + 1 = 3. Add fractions: 1/4 + 1/2 = 1/4 + 2/4 = 3/4. Result: 3 3/4',
    difficulty: 'medium'
  },
  {
    id: 'pre-add-4',
    question: 'What is 3/5 + 1/5?',
    options: ['4/5', '4/10', '3/5', '2/5'],
    correctAnswer: 0,
    explanation: 'Add numerators: 3 + 1 = 4, keep denominator: 4/5',
    difficulty: 'easy'
  },
  {
    id: 'pre-add-5',
    question: 'What is 1/2 + 2/3?',
    options: ['3/5', '7/6', '1 1/6', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Common denominator is 6: 1/2 = 3/6, 2/3 = 4/6. So 3/6 + 4/6 = 7/6 = 1 1/6',
    difficulty: 'hard'
  },

  // Subtraction Questions (5)
  {
    id: 'pre-sub-1',
    question: 'What is 3/4 - 1/4?',
    options: ['2/4', '1/2', '2/0', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Subtract numerators: 3 - 1 = 2, keep denominator: 2/4 = 1/2 (simplified)',
    difficulty: 'easy'
  },
  {
    id: 'pre-sub-2',
    question: 'What is 5/6 - 1/3?',
    options: ['4/3', '3/6', '1/2', '4/6'],
    correctAnswer: 2,
    explanation: 'Common denominator is 6: 1/3 = 2/6, then 5/6 - 2/6 = 3/6 = 1/2',
    difficulty: 'medium'
  },
  {
    id: 'pre-sub-3',
    question: 'What is 4 1/2 - 2 1/4?',
    options: ['2 1/4', '2 2/4', '2 1/2', '1 3/4'],
    correctAnswer: 0,
    explanation: 'Convert to common denominator: 4 2/4 - 2 1/4 = 2 1/4',
    difficulty: 'medium'
  },
  {
    id: 'pre-sub-4',
    question: 'What is 7/8 - 3/8?',
    options: ['4/8', '1/2', '4/0', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Subtract numerators: 7 - 3 = 4, keep denominator: 4/8 = 1/2 (simplified)',
    difficulty: 'easy'
  },
  {
    id: 'pre-sub-5',
    question: 'What is 2/3 - 1/4?',
    options: ['1/7', '5/12', '1/12', '8/12'],
    correctAnswer: 1,
    explanation: 'Common denominator is 12: 2/3 = 8/12, 1/4 = 3/12. So 8/12 - 3/12 = 5/12',
    difficulty: 'hard'
  },

  // Multiplication Questions (5)
  {
    id: 'pre-mul-1',
    question: 'What is 1/2 × 1/3?',
    options: ['1/6', '2/5', '1/5', '2/6'],
    correctAnswer: 0,
    explanation: 'Multiply numerators: 1 × 1 = 1. Multiply denominators: 2 × 3 = 6. Result: 1/6',
    difficulty: 'easy'
  },
  {
    id: 'pre-mul-2',
    question: 'What is 2/3 × 3/4?',
    options: ['5/7', '6/12', '1/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply: 2×3 = 6, 3×4 = 12. Result: 6/12 = 1/2 (simplified)',
    difficulty: 'medium'
  },
  {
    id: 'pre-mul-3',
    question: 'What is 1 1/2 × 2?',
    options: ['2 1/2', '3', '2 2/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Convert to improper fraction: 1 1/2 = 3/2. Then 3/2 × 2 = 6/2 = 3',
    difficulty: 'medium'
  },
  {
    id: 'pre-mul-4',
    question: 'What is 3/5 × 2/7?',
    options: ['5/12', '6/35', '1/2', '6/12'],
    correctAnswer: 1,
    explanation: 'Multiply numerators: 3 × 2 = 6. Multiply denominators: 5 × 7 = 35. Result: 6/35',
    difficulty: 'medium'
  },
  {
    id: 'pre-mul-5',
    question: 'What is 2 × 3/4?',
    options: ['5/4', '6/4', '1 1/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply: 2 × 3/4 = 6/4 = 1 2/4 = 1 1/2',
    difficulty: 'easy'
  },

  // Division Questions (5)
  {
    id: 'pre-div-1',
    question: 'What is 1/2 ÷ 1/4?',
    options: ['1/8', '2', '1/6', '4'],
    correctAnswer: 1,
    explanation: 'To divide fractions, multiply by the reciprocal: 1/2 × 4/1 = 4/2 = 2',
    difficulty: 'medium'
  },
  {
    id: 'pre-div-2',
    question: 'What is 3/4 ÷ 1/2?',
    options: ['3/8', '3/2', '1 1/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply by reciprocal: 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2',
    difficulty: 'medium'
  },
  {
    id: 'pre-div-3',
    question: 'What is 2 ÷ 1/3?',
    options: ['2/3', '6', '3/2', '1/6'],
    correctAnswer: 1,
    explanation: 'Multiply by reciprocal: 2 × 3/1 = 6',
    difficulty: 'easy'
  },
  {
    id: 'pre-div-4',
    question: 'What is 2/3 ÷ 4/5?',
    options: ['8/15', '10/12', '5/6', '2/3'],
    correctAnswer: 2,
    explanation: 'Multiply by reciprocal: 2/3 × 5/4 = 10/12 = 5/6',
    difficulty: 'hard'
  },
  {
    id: 'pre-div-5',
    question: 'What is 1/4 ÷ 1/8?',
    options: ['1/32', '2', '1/2', '8'],
    correctAnswer: 1,
    explanation: 'Multiply by reciprocal: 1/4 × 8/1 = 8/4 = 2',
    difficulty: 'medium'
  }
];

export const postTestQuestions: Question[] = [
  // Addition Questions (5)
  {
    id: 'post-add-1',
    question: 'What is 2/5 + 3/5?',
    options: ['5/5', '1', '5/10', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Add numerators: 2 + 3 = 5, keep denominator: 5/5 = 1',
    difficulty: 'easy'
  },
  {
    id: 'post-add-2',
    question: 'What is 1/4 + 2/3?',
    options: ['3/7', '11/12', '3/12', '8/12'],
    correctAnswer: 1,
    explanation: 'Common denominator is 12: 1/4 = 3/12, 2/3 = 8/12. So 3/12 + 8/12 = 11/12',
    difficulty: 'hard'
  },
  {
    id: 'post-add-3',
    question: 'What is 3 2/3 + 1 1/6?',
    options: ['4 5/6', '4 3/9', '4 2/6', '5 1/6'],
    correctAnswer: 0,
    explanation: 'Add whole numbers: 3 + 1 = 4. Add fractions: 2/3 + 1/6 = 4/6 + 1/6 = 5/6. Result: 4 5/6',
    difficulty: 'hard'
  },
  {
    id: 'post-add-4',
    question: 'What is 5/8 + 1/8?',
    options: ['6/8', '3/4', '6/16', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Add numerators: 5 + 1 = 6, keep denominator: 6/8 = 3/4 (simplified)',
    difficulty: 'easy'
  },
  {
    id: 'post-add-5',
    question: 'What is 3/4 + 5/6?',
    options: ['8/10', '19/12', '1 7/12', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Common denominator is 12: 3/4 = 9/12, 5/6 = 10/12. So 9/12 + 10/12 = 19/12 = 1 7/12',
    difficulty: 'hard'
  },

  // Subtraction Questions (5)
  {
    id: 'post-sub-1',
    question: 'What is 4/5 - 2/5?',
    options: ['2/5', '2/0', '6/5', '2/10'],
    correctAnswer: 0,
    explanation: 'Subtract numerators: 4 - 2 = 2, keep denominator: 2/5',
    difficulty: 'easy'
  },
  {
    id: 'post-sub-2',
    question: 'What is 7/8 - 1/4?',
    options: ['6/4', '5/8', '6/8', '3/4'],
    correctAnswer: 1,
    explanation: 'Common denominator is 8: 1/4 = 2/8, then 7/8 - 2/8 = 5/8',
    difficulty: 'medium'
  },
  {
    id: 'post-sub-3',
    question: 'What is 5 1/3 - 2 5/6?',
    options: ['2 1/2', '3 1/6', '2 3/6', '2 2/6'],
    correctAnswer: 0,
    explanation: 'Convert to sixths: 5 2/6 - 2 5/6. Borrow: 4 8/6 - 2 5/6 = 2 3/6 = 2 1/2',
    difficulty: 'hard'
  },
  {
    id: 'post-sub-4',
    question: 'What is 6/7 - 2/7?',
    options: ['4/7', '4/0', '8/7', '4/14'],
    correctAnswer: 0,
    explanation: 'Subtract numerators: 6 - 2 = 4, keep denominator: 4/7',
    difficulty: 'easy'
  },
  {
    id: 'post-sub-5',
    question: 'What is 5/6 - 1/2?',
    options: ['4/4', '2/6', '1/3', '4/6'],
    correctAnswer: 2,
    explanation: 'Common denominator is 6: 1/2 = 3/6, then 5/6 - 3/6 = 2/6 = 1/3',
    difficulty: 'medium'
  },

  // Multiplication Questions (5)
  {
    id: 'post-mul-1',
    question: 'What is 2/3 × 1/4?',
    options: ['2/12', '1/6', '3/7', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Multiply: 2×1 = 2, 3×4 = 12. Result: 2/12 = 1/6 (simplified)',
    difficulty: 'easy'
  },
  {
    id: 'post-mul-2',
    question: 'What is 3/5 × 5/6?',
    options: ['15/30', '1/2', '8/11', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'Multiply: 3×5 = 15, 5×6 = 30. Result: 15/30 = 1/2 (simplified)',
    difficulty: 'medium'
  },
  {
    id: 'post-mul-3',
    question: 'What is 2 1/4 × 1/3?',
    options: ['2/12', '3/4', '9/12', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Convert: 2 1/4 = 9/4. Multiply: 9/4 × 1/3 = 9/12 = 3/4',
    difficulty: 'hard'
  },
  {
    id: 'post-mul-4',
    question: 'What is 4/7 × 2/3?',
    options: ['6/10', '8/21', '2/4', '6/21'],
    correctAnswer: 1,
    explanation: 'Multiply numerators: 4 × 2 = 8. Multiply denominators: 7 × 3 = 21. Result: 8/21',
    difficulty: 'medium'
  },
  {
    id: 'post-mul-5',
    question: 'What is 3 × 2/9?',
    options: ['5/9', '6/9', '2/3', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply: 3 × 2/9 = 6/9 = 2/3 (simplified)',
    difficulty: 'easy'
  },

  // Division Questions (5)
  {
    id: 'post-div-1',
    question: 'What is 2/3 ÷ 1/6?',
    options: ['2/18', '4', '12/3', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply by reciprocal: 2/3 × 6/1 = 12/3 = 4',
    difficulty: 'medium'
  },
  {
    id: 'post-div-2',
    question: 'What is 5/8 ÷ 3/4?',
    options: ['15/32', '5/6', '20/24', '5/6'],
    correctAnswer: 1,
    explanation: 'Multiply by reciprocal: 5/8 × 4/3 = 20/24 = 5/6',
    difficulty: 'hard'
  },
  {
    id: 'post-div-3',
    question: 'What is 4 ÷ 2/3?',
    options: ['8/3', '6', '2 2/3', 'Both A and B'],
    correctAnswer: 1,
    explanation: 'Multiply by reciprocal: 4 × 3/2 = 12/2 = 6',
    difficulty: 'easy'
  },
  {
    id: 'post-div-4',
    question: 'What is 1/3 ÷ 2/9?',
    options: ['2/27', '3/2', '1 1/2', 'Both B and C'],
    correctAnswer: 3,
    explanation: 'Multiply by reciprocal: 1/3 × 9/2 = 9/6 = 3/2 = 1 1/2',
    difficulty: 'hard'
  },
  {
    id: 'post-div-5',
    question: 'What is 3/4 ÷ 3/8?',
    options: ['9/32', '2', '6/4', '1 1/2'],
    correctAnswer: 1,
    explanation: 'Multiply by reciprocal: 3/4 × 8/3 = 24/12 = 2',
    difficulty: 'medium'
  }
];