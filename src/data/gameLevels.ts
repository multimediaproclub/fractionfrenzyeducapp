import { GameLevel } from '../types';

export const gameLevels: GameLevel[] = [
  {
    id: 'addition-similar',
    title: 'Addition: Similar Fractions',
    subtitle: 'Adding fractions with the same denominator',
    description: 'Learn to add fractions that have the same bottom number (denominator).',
    operation: 'addition',
    category: 'similar',
    unlocked: true,
    questions: [
      {
        id: 'add-sim-1',
        question: 'What is 1/4 + 2/4?',
        options: ['3/4', '3/8', '1/2', '2/3'],
        correctAnswer: 0,
        explanation: 'When adding fractions with the same denominator, add the numerators: 1 + 2 = 3, keep the denominator: 3/4',
        difficulty: 'easy',
        visualFraction: { numerator: 3, denominator: 4 }
      },
      {
        id: 'add-sim-2',
        question: 'What is 2/5 + 1/5?',
        options: ['2/10', '3/5', '3/10', '1/5'],
        correctAnswer: 1,
        explanation: 'Add the numerators: 2 + 1 = 3, keep the denominator: 3/5',
        difficulty: 'easy',
        visualFraction: { numerator: 3, denominator: 5 }
      },
      {
        id: 'add-sim-3',
        question: 'What is 3/8 + 2/8?',
        options: ['5/8', '5/16', '6/8', '1/2'],
        correctAnswer: 0,
        explanation: 'Add the numerators: 3 + 2 = 5, keep the denominator: 5/8',
        difficulty: 'easy',
        visualFraction: { numerator: 5, denominator: 8 }
      },
      {
        id: 'add-sim-4',
        question: 'What is 1/6 + 4/6?',
        options: ['4/12', '5/6', '5/12', '1/2'],
        correctAnswer: 1,
        explanation: 'Add the numerators: 1 + 4 = 5, keep the denominator: 5/6',
        difficulty: 'medium',
        visualFraction: { numerator: 5, denominator: 6 }
      },
      {
        id: 'add-sim-5',
        question: 'What is 2/9 + 4/9?',
        options: ['6/9', '2/3', '6/18', '4/9'],
        correctAnswer: 1,
        explanation: 'Add the numerators: 2 + 4 = 6, keep the denominator: 6/9, which simplifies to 2/3',
        difficulty: 'medium',
        visualFraction: { numerator: 6, denominator: 9 }
      }
    ]
  },
  {
    id: 'addition-dissimilar',
    title: 'Addition: Dissimilar Fractions',
    subtitle: 'Adding fractions with different denominators',
    description: 'Learn to add fractions with different bottom numbers using common denominators.',
    operation: 'addition',
    category: 'dissimilar',
    unlocked: false,
    questions: [
      {
        id: 'add-dis-1',
        question: 'What is 1/2 + 1/4?',
        options: ['2/6', '3/4', '2/4', '1/3'],
        correctAnswer: 1,
        explanation: 'Find common denominator: 1/2 = 2/4, then 2/4 + 1/4 = 3/4',
        difficulty: 'medium',
        visualFraction: { numerator: 3, denominator: 4 }
      },
      {
        id: 'add-dis-2',
        question: 'What is 1/3 + 1/6?',
        options: ['1/2', '2/9', '1/9', '2/6'],
        correctAnswer: 0,
        explanation: 'Find common denominator: 1/3 = 2/6, then 2/6 + 1/6 = 3/6 = 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 1, denominator: 2 }
      },
      {
        id: 'add-dis-3',
        question: 'What is 2/3 + 1/4?',
        options: ['11/12', '3/7', '8/12', '3/12'],
        correctAnswer: 0,
        explanation: 'Common denominator is 12: 2/3 = 8/12, 1/4 = 3/12, so 8/12 + 3/12 = 11/12',
        difficulty: 'hard',
        visualFraction: { numerator: 11, denominator: 12 }
      },
      {
        id: 'add-dis-4',
        question: 'What is 1/5 + 2/10?',
        options: ['3/15', '2/5', '3/10', '1/10'],
        correctAnswer: 1,
        explanation: 'Common denominator is 10: 1/5 = 2/10, then 2/10 + 2/10 = 4/10 = 2/5',
        difficulty: 'medium',
        visualFraction: { numerator: 4, denominator: 10 }
      },
      {
        id: 'add-dis-5',
        question: 'What is 3/4 + 1/8?',
        options: ['4/12', '7/8', '4/8', '3/8'],
        correctAnswer: 1,
        explanation: 'Common denominator is 8: 3/4 = 6/8, then 6/8 + 1/8 = 7/8',
        difficulty: 'hard',
        visualFraction: { numerator: 7, denominator: 8 }
      }
    ]
  },
  {
    id: 'addition-mixed',
    title: 'Addition: Mixed Numbers',
    subtitle: 'Adding whole numbers with fractions',
    description: 'Learn to add mixed numbers (whole numbers combined with fractions).',
    operation: 'addition',
    category: 'mixed',
    unlocked: false,
    questions: [
      {
        id: 'add-mix-1',
        question: 'What is 1 1/2 + 2 1/4?',
        options: ['3 3/4', '3 1/2', '4 1/4', '3 1/3'],
        correctAnswer: 0,
        explanation: 'Add whole numbers: 1 + 2 = 3. Add fractions: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Result: 3 3/4',
        difficulty: 'medium',
        visualFraction: { numerator: 15, denominator: 4 }
      },
      {
        id: 'add-mix-2',
        question: 'What is 2 1/3 + 1 1/6?',
        options: ['3 1/2', '3 2/9', '3 1/3', '4 1/6'],
        correctAnswer: 0,
        explanation: 'Add whole numbers: 2 + 1 = 3. Add fractions: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Result: 3 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 7, denominator: 2 }
      },
      {
        id: 'add-mix-3',
        question: 'What is 1 2/5 + 2 3/5?',
        options: ['3 5/5', '4', '3 1/5', '4 1/5'],
        correctAnswer: 1,
        explanation: 'Add whole numbers: 1 + 2 = 3. Add fractions: 2/5 + 3/5 = 5/5 = 1. Result: 3 + 1 = 4',
        difficulty: 'medium',
        visualFraction: { numerator: 4, denominator: 1 }
      },
      {
        id: 'add-mix-4',
        question: 'What is 3 1/4 + 1 1/2?',
        options: ['4 3/4', '4 1/2', '4 2/6', '5 1/4'],
        correctAnswer: 0,
        explanation: 'Add whole numbers: 3 + 1 = 4. Add fractions: 1/4 + 1/2 = 1/4 + 2/4 = 3/4. Result: 4 3/4',
        difficulty: 'medium',
        visualFraction: { numerator: 19, denominator: 4 }
      },
      {
        id: 'add-mix-5',
        question: 'What is 2 2/3 + 1 5/6?',
        options: ['4 1/2', '3 3/9', '4 3/6', '4 1/6'],
        correctAnswer: 0,
        explanation: 'Add whole numbers: 2 + 1 = 3. Add fractions: 2/3 + 5/6 = 4/6 + 5/6 = 9/6 = 1 1/2. Result: 3 + 1 1/2 = 4 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 9, denominator: 2 }
      }
    ]
  },
  {
    id: 'subtraction-similar',
    title: 'Subtraction: Similar Fractions',
    subtitle: 'Subtracting fractions with the same denominator',
    description: 'Learn to subtract fractions that have the same bottom number (denominator).',
    operation: 'subtraction',
    category: 'similar',
    unlocked: false,
    questions: [
      {
        id: 'sub-sim-1',
        question: 'What is 3/4 - 1/4?',
        options: ['2/4', '1/2', '1/4', '3/4'],
        correctAnswer: 1,
        explanation: 'Subtract numerators: 3 - 1 = 2, keep denominator: 2/4, which simplifies to 1/2',
        difficulty: 'easy',
        visualFraction: { numerator: 2, denominator: 4 }
      },
      {
        id: 'sub-sim-2',
        question: 'What is 4/5 - 2/5?',
        options: ['2/5', '1/5', '6/5', '2/10'],
        correctAnswer: 0,
        explanation: 'Subtract numerators: 4 - 2 = 2, keep denominator: 2/5',
        difficulty: 'easy',
        visualFraction: { numerator: 2, denominator: 5 }
      },
      {
        id: 'sub-sim-3',
        question: 'What is 5/8 - 3/8?',
        options: ['2/8', '1/4', '3/8', '5/8'],
        correctAnswer: 1,
        explanation: 'Subtract numerators: 5 - 3 = 2, keep denominator: 2/8, which simplifies to 1/4',
        difficulty: 'medium',
        visualFraction: { numerator: 2, denominator: 8 }
      },
      {
        id: 'sub-sim-4',
        question: 'What is 7/9 - 4/9?',
        options: ['3/9', '1/3', '4/9', '7/9'],
        correctAnswer: 1,
        explanation: 'Subtract numerators: 7 - 4 = 3, keep denominator: 3/9, which simplifies to 1/3',
        difficulty: 'medium',
        visualFraction: { numerator: 3, denominator: 9 }
      },
      {
        id: 'sub-sim-5',
        question: 'What is 6/10 - 2/10?',
        options: ['4/10', '2/5', '3/5', '1/5'],
        correctAnswer: 1,
        explanation: 'Subtract numerators: 6 - 2 = 4, keep denominator: 4/10, which simplifies to 2/5',
        difficulty: 'medium',
        visualFraction: { numerator: 4, denominator: 10 }
      }
    ]
  },
  {
    id: 'subtraction-dissimilar',
    title: 'Subtraction: Dissimilar Fractions',
    subtitle: 'Subtracting fractions with different denominators',
    description: 'Learn to subtract fractions with different bottom numbers using common denominators.',
    operation: 'subtraction',
    category: 'dissimilar',
    unlocked: false,
    questions: [
      {
        id: 'sub-dis-1',
        question: 'What is 3/4 - 1/2?',
        options: ['1/4', '2/2', '1/2', '2/4'],
        correctAnswer: 0,
        explanation: 'Common denominator is 4: 1/2 = 2/4, then 3/4 - 2/4 = 1/4',
        difficulty: 'medium',
        visualFraction: { numerator: 1, denominator: 4 }
      },
      {
        id: 'sub-dis-2',
        question: 'What is 2/3 - 1/6?',
        options: ['3/6', '1/2', '1/3', '2/6'],
        correctAnswer: 1,
        explanation: 'Common denominator is 6: 2/3 = 4/6, then 4/6 - 1/6 = 3/6, which simplifies to 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 3, denominator: 6 }
      },
      {
        id: 'sub-dis-3',
        question: 'What is 5/6 - 1/3?',
        options: ['4/3', '3/6', '1/2', '4/6'],
        correctAnswer: 2,
        explanation: 'Common denominator is 6: 1/3 = 2/6, then 5/6 - 2/6 = 3/6 = 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 3, denominator: 6 }
      },
      {
        id: 'sub-dis-4',
        question: 'What is 7/8 - 1/4?',
        options: ['6/4', '5/8', '6/8', '3/4'],
        correctAnswer: 1,
        explanation: 'Common denominator is 8: 1/4 = 2/8, then 7/8 - 2/8 = 5/8',
        difficulty: 'hard',
        visualFraction: { numerator: 5, denominator: 8 }
      },
      {
        id: 'sub-dis-5',
        question: 'What is 4/5 - 3/10?',
        options: ['1/5', '5/10', '1/2', '7/10'],
        correctAnswer: 2,
        explanation: 'Common denominator is 10: 4/5 = 8/10, then 8/10 - 3/10 = 5/10 = 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 5, denominator: 10 }
      }
    ]
  },
  {
    id: 'subtraction-mixed',
    title: 'Subtraction: Mixed Numbers',
    subtitle: 'Subtracting whole numbers with fractions',
    description: 'Learn to subtract mixed numbers (whole numbers combined with fractions).',
    operation: 'subtraction',
    category: 'mixed',
    unlocked: false,
    questions: [
      {
        id: 'sub-mix-1',
        question: 'What is 3 3/4 - 1 1/4?',
        options: ['2 2/4', '2 1/2', '2 1/4', '1 1/2'],
        correctAnswer: 1,
        explanation: 'Subtract whole numbers: 3 - 1 = 2. Subtract fractions: 3/4 - 1/4 = 2/4, which simplifies to 1/2. Result: 2 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 5, denominator: 2 }
      },
      {
        id: 'sub-mix-2',
        question: 'What is 4 1/2 - 2 1/4?',
        options: ['2 1/4', '2 2/4', '2 1/2', '1 3/4'],
        correctAnswer: 0,
        explanation: 'Convert to common denominator: 4 2/4 - 2 1/4 = 2 1/4',
        difficulty: 'medium',
        visualFraction: { numerator: 9, denominator: 4 }
      },
      {
        id: 'sub-mix-3',
        question: 'What is 5 2/3 - 2 1/6?',
        options: ['3 1/2', '3 3/6', '3 1/6', '2 1/2'],
        correctAnswer: 0,
        explanation: 'Convert to sixths: 5 4/6 - 2 1/6 = 3 3/6, which simplifies to 3 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 7, denominator: 2 }
      },
      {
        id: 'sub-mix-4',
        question: 'What is 6 - 2 3/5?',
        options: ['3 2/5', '4 3/5', '3 3/5', '4 2/5'],
        correctAnswer: 0,
        explanation: 'Borrow from whole number: 6 = 5 5/5, then 5 5/5 - 2 3/5 = 3 2/5',
        difficulty: 'hard',
        visualFraction: { numerator: 17, denominator: 5 }
      },
      {
        id: 'sub-mix-5',
        question: 'What is 4 1/6 - 1 2/3?',
        options: ['2 1/2', '3 1/6', '2 3/6', '1 1/2'],
        correctAnswer: 0,
        explanation: 'Convert to sixths: 4 1/6 - 1 4/6. Borrow: 3 7/6 - 1 4/6 = 2 3/6, which simplifies to 2 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 5, denominator: 2 }
      }
    ]
  },
  {
    id: 'multiplication-proper',
    title: 'Multiplication: Proper Fractions',
    subtitle: 'Multiplying proper and improper fractions',
    description: 'Learn to multiply fractions by multiplying numerators and denominators.',
    operation: 'multiplication',
    category: 'proper',
    unlocked: false,
    questions: [
      {
        id: 'mul-prop-1',
        question: 'What is 1/2 × 1/3?',
        options: ['1/6', '2/5', '1/5', '2/6'],
        correctAnswer: 0,
        explanation: 'Multiply numerators: 1 × 1 = 1. Multiply denominators: 2 × 3 = 6. Result: 1/6',
        difficulty: 'easy',
        visualFraction: { numerator: 1, denominator: 6 }
      },
      {
        id: 'mul-prop-2',
        question: 'What is 2/3 × 3/4?',
        options: ['5/7', '6/12', '1/2', '2/7'],
        correctAnswer: 2,
        explanation: 'Multiply: 2×3 = 6, 3×4 = 12. Result: 6/12, which simplifies to 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 6, denominator: 12 }
      },
      {
        id: 'mul-prop-3',
        question: 'What is 3/5 × 2/7?',
        options: ['5/12', '6/35', '1/2', '6/12'],
        correctAnswer: 1,
        explanation: 'Multiply numerators: 3 × 2 = 6. Multiply denominators: 5 × 7 = 35. Result: 6/35',
        difficulty: 'medium',
        visualFraction: { numerator: 6, denominator: 35 }
      },
      {
        id: 'mul-prop-4',
        question: 'What is 4/9 × 3/8?',
        options: ['12/72', '1/6', '7/17', '3/8'],
        correctAnswer: 1,
        explanation: 'Multiply: 4×3 = 12, 9×8 = 72. Result: 12/72, which simplifies to 1/6',
        difficulty: 'hard',
        visualFraction: { numerator: 12, denominator: 72 }
      },
      {
        id: 'mul-prop-5',
        question: 'What is 5/6 × 2/5?',
        options: ['7/11', '10/30', '1/3', '2/6'],
        correctAnswer: 2,
        explanation: 'Multiply: 5×2 = 10, 6×5 = 30. Result: 10/30, which simplifies to 1/3',
        difficulty: 'medium',
        visualFraction: { numerator: 10, denominator: 30 }
      }
    ]
  },
  {
    id: 'multiplication-mixed',
    title: 'Multiplication: Mixed Numbers',
    subtitle: 'Multiplying whole numbers and mixed numbers',
    description: 'Learn to multiply mixed numbers by converting to improper fractions first.',
    operation: 'multiplication',
    category: 'mixed',
    unlocked: false,
    questions: [
      {
        id: 'mul-mix-1',
        question: 'What is 2 × 1/3?',
        options: ['2/3', '2/6', '3/2', '6/3'],
        correctAnswer: 0,
        explanation: 'Multiply whole number by fraction: 2 × 1/3 = 2/3',
        difficulty: 'easy',
        visualFraction: { numerator: 2, denominator: 3 }
      },
      {
        id: 'mul-mix-2',
        question: 'What is 1 1/2 × 2?',
        options: ['2 1/2', '3', '2 2/2', '4'],
        correctAnswer: 1,
        explanation: 'Convert to improper fraction: 1 1/2 = 3/2. Then 3/2 × 2 = 6/2 = 3',
        difficulty: 'medium',
        visualFraction: { numerator: 3, denominator: 1 }
      },
      {
        id: 'mul-mix-3',
        question: 'What is 1 1/4 × 2/3?',
        options: ['5/6', '2 2/12', '10/12', '1/3'],
        correctAnswer: 0,
        explanation: 'Convert: 1 1/4 = 5/4. Multiply: 5/4 × 2/3 = 10/12, which simplifies to 5/6',
        difficulty: 'hard',
        visualFraction: { numerator: 10, denominator: 12 }
      },
      {
        id: 'mul-mix-4',
        question: 'What is 2 1/3 × 1 1/2?',
        options: ['3 1/2', '7/2', '3 3/6', '4 1/2'],
        correctAnswer: 0,
        explanation: 'Convert: 2 1/3 = 7/3, 1 1/2 = 3/2. Multiply: 7/3 × 3/2 = 21/6 = 7/2 = 3 1/2',
        difficulty: 'hard',
        visualFraction: { numerator: 21, denominator: 6 }
      },
      {
        id: 'mul-mix-5',
        question: 'What is 3 × 2 2/5?',
        options: ['6 6/5', '7 1/5', '36/5', '8 1/5'],
        correctAnswer: 1,
        explanation: 'Convert: 2 2/5 = 12/5. Multiply: 3 × 12/5 = 36/5 = 7 1/5',
        difficulty: 'medium',
        visualFraction: { numerator: 36, denominator: 5 }
      }
    ]
  },
  {
    id: 'division-fractions',
    title: 'Division: Proper Fractions',
    subtitle: 'Dividing proper and improper fractions',
    description: 'Learn to divide fractions using the "multiply by reciprocal" rule.',
    operation: 'division',
    category: 'proper',
    unlocked: false,
    questions: [
      {
        id: 'div-frac-1',
        question: 'What is 1/2 ÷ 1/4?',
        options: ['1/8', '2', '1/6', '4'],
        correctAnswer: 1,
        explanation: 'To divide fractions, multiply by the reciprocal: 1/2 × 4/1 = 4/2 = 2',
        difficulty: 'medium',
        visualFraction: { numerator: 2, denominator: 1 }
      },
      {
        id: 'div-frac-2',
        question: 'What is 3/4 ÷ 1/2?',
        options: ['3/8', '3/2', '1 1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'Multiply by reciprocal: 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 3, denominator: 2 }
      },
      {
        id: 'div-frac-3',
        question: 'What is 2/3 ÷ 4/5?',
        options: ['8/15', '10/12', '5/6', '2/3'],
        correctAnswer: 2,
        explanation: 'Multiply by reciprocal: 2/3 × 5/4 = 10/12 = 5/6',
        difficulty: 'hard',
        visualFraction: { numerator: 5, denominator: 6 }
      },
      {
        id: 'div-frac-4',
        question: 'What is 5/6 ÷ 2/3?',
        options: ['10/18', '5/4', '1 1/4', '3/4'],
        correctAnswer: 2,
        explanation: 'Multiply by reciprocal: 5/6 × 3/2 = 15/12 = 5/4 = 1 1/4',
        difficulty: 'hard',
        visualFraction: { numerator: 5, denominator: 4 }
      },
      {
        id: 'div-frac-5',
        question: 'What is 3/8 ÷ 3/4?',
        options: ['9/32', '1/2', '3/6', '12/24'],
        correctAnswer: 1,
        explanation: 'Multiply by reciprocal: 3/8 × 4/3 = 12/24 = 1/2',
        difficulty: 'medium',
        visualFraction: { numerator: 1, denominator: 2 }
      }
    ]
  }
];