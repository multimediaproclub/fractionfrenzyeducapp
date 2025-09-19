import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'addition-similar',
    title: 'Adding Similar Fractions',
    operation: 'addition',
    content: {
      introduction: 'Adding fractions with the same denominator (similar fractions) is one of the easiest fraction operations. When fractions have the same denominator, you simply add the numerators and keep the denominator the same.',
      steps: [
        'Make sure both fractions have the same denominator',
        'Add the numerators (top numbers) together',
        'Keep the denominator (bottom number) the same',
        'Simplify the result if possible'
      ],
      examples: [
        {
          problem: '1/4 + 2/4 = ?',
          solution: '3/4',
          explanation: 'Since both fractions have the same denominator (4), we add the numerators: 1 + 2 = 3, and keep the denominator: 3/4'
        },
        {
          problem: '3/8 + 2/8 = ?',
          solution: '5/8',
          explanation: 'Add the numerators: 3 + 2 = 5, keep the denominator: 5/8'
        },
        {
          problem: '2/6 + 4/6 = ?',
          solution: '6/6 = 1',
          explanation: 'Add the numerators: 2 + 4 = 6, which gives us 6/6 = 1 whole'
        }
      ],
      tips: [
        'The denominator stays the same when adding similar fractions',
        'Always check if your answer can be simplified',
        'If the numerator equals the denominator, the result is 1',
        'Visual aids like pie charts can help you understand the concept'
      ]
    }
  },
  {
    id: 'addition-dissimilar',
    title: 'Adding Dissimilar Fractions',
    operation: 'addition',
    content: {
      introduction: 'Adding fractions with different denominators requires finding a common denominator first. This ensures both fractions are divided into the same sized pieces.',
      steps: [
        'Find the least common denominator (LCD) of both fractions',
        'Convert both fractions to equivalent fractions with the LCD',
        'Add the numerators together',
        'Keep the common denominator',
        'Simplify if necessary'
      ],
      examples: [
        {
          problem: '1/2 + 1/4 = ?',
          solution: '3/4',
          explanation: 'LCD is 4. Convert 1/2 to 2/4. Then 2/4 + 1/4 = 3/4'
        },
        {
          problem: '1/3 + 1/6 = ?',
          solution: '3/6 = 1/2',
          explanation: 'LCD is 6. Convert 1/3 to 2/6. Then 2/6 + 1/6 = 3/6 = 1/2'
        },
        {
          problem: '2/5 + 1/10 = ?',
          solution: '5/10 = 1/2',
          explanation: 'LCD is 10. Convert 2/5 to 4/10. Then 4/10 + 1/10 = 5/10 = 1/2'
        }
      ],
      tips: [
        'Find the smallest number that both denominators divide into evenly',
        'Multiply both numerator and denominator by the same number to get equivalent fractions',
        'Check your work by ensuring both fractions have the same denominator before adding',
        'Always simplify your final answer'
      ]
    }
  },
  {
    id: 'subtraction-similar',
    title: 'Subtracting Similar Fractions',
    operation: 'subtraction',
    content: {
      introduction: 'Subtracting fractions with the same denominator follows the same principle as addition - you work only with the numerators while keeping the denominator unchanged.',
      steps: [
        'Ensure both fractions have the same denominator',
        'Subtract the second numerator from the first numerator',
        'Keep the denominator the same',
        'Simplify the result if possible'
      ],
      examples: [
        {
          problem: '3/4 - 1/4 = ?',
          solution: '2/4 = 1/2',
          explanation: 'Subtract numerators: 3 - 1 = 2, keep denominator: 2/4, which simplifies to 1/2'
        },
        {
          problem: '5/8 - 2/8 = ?',
          solution: '3/8',
          explanation: 'Subtract numerators: 5 - 2 = 3, keep denominator: 3/8'
        },
        {
          problem: '7/10 - 3/10 = ?',
          solution: '4/10 = 2/5',
          explanation: 'Subtract numerators: 7 - 3 = 4, giving us 4/10, which simplifies to 2/5'
        }
      ],
      tips: [
        'The denominator never changes when subtracting similar fractions',
        'Always subtract the second numerator from the first',
        'Check if your answer can be reduced to lowest terms',
        'If the result is 0, the answer is 0 (not 0/denominator)'
      ]
    }
  },
  {
    id: 'multiplication-proper',
    title: 'Multiplying Fractions',
    operation: 'multiplication',
    content: {
      introduction: 'Multiplying fractions is actually simpler than adding or subtracting them. You multiply straight across - numerator times numerator, and denominator times denominator.',
      steps: [
        'Multiply the numerators (top numbers) together',
        'Multiply the denominators (bottom numbers) together',
        'Write the result as a new fraction',
        'Simplify if possible'
      ],
      examples: [
        {
          problem: '1/2 × 1/3 = ?',
          solution: '1/6',
          explanation: 'Multiply numerators: 1 × 1 = 1, multiply denominators: 2 × 3 = 6, result: 1/6'
        },
        {
          problem: '2/3 × 3/4 = ?',
          solution: '6/12 = 1/2',
          explanation: 'Multiply: 2 × 3 = 6, 3 × 4 = 12, giving 6/12, which simplifies to 1/2'
        },
        {
          problem: '3/5 × 2/7 = ?',
          solution: '6/35',
          explanation: 'Multiply: 3 × 2 = 6, 5 × 7 = 35, result: 6/35'
        }
      ],
      tips: [
        'No need to find common denominators when multiplying',
        'You can simplify before multiplying to make calculations easier',
        'Multiplying by a proper fraction always gives a smaller result',
        'Cross-cancellation can help simplify the process'
      ]
    }
  },
  {
    id: 'division-fractions',
    title: 'Dividing Fractions',
    operation: 'division',
    content: {
      introduction: 'To divide fractions, we use the "multiply by the reciprocal" rule. Instead of dividing, we multiply by the flipped version of the second fraction.',
      steps: [
        'Keep the first fraction as it is',
        'Change the division sign to multiplication',
        'Flip the second fraction (find its reciprocal)',
        'Multiply the fractions normally',
        'Simplify if necessary'
      ],
      examples: [
        {
          problem: '1/2 ÷ 1/4 = ?',
          solution: '2',
          explanation: 'Change to multiplication: 1/2 × 4/1 = 4/2 = 2'
        },
        {
          problem: '3/4 ÷ 1/2 = ?',
          solution: '3/2 = 1 1/2',
          explanation: 'Change to multiplication: 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2'
        },
        {
          problem: '2/3 ÷ 4/5 = ?',
          solution: '10/12 = 5/6',
          explanation: 'Change to multiplication: 2/3 × 5/4 = 10/12 = 5/6'
        }
      ],
      tips: [
        'Remember: "Keep, Change, Flip" - Keep first fraction, change ÷ to ×, flip second fraction',
        'The reciprocal of a/b is b/a',
        'Dividing by a fraction is the same as multiplying by its reciprocal',
        'Practice identifying reciprocals: 2/3 and 3/2, 1/4 and 4/1, etc.'
      ]
    }
  },
  {
    id: 'subtraction-dissimilar',
    title: 'Subtracting Dissimilar Fractions',
    operation: 'subtraction',
    content: {
      introduction: 'Subtracting fractions with different denominators requires finding a common denominator first, just like with addition. The key difference is that you subtract the numerators instead of adding them.',
      steps: [
        'Find the least common denominator (LCD) of both fractions',
        'Convert both fractions to equivalent fractions with the LCD',
        'Subtract the second numerator from the first numerator',
        'Keep the common denominator',
        'Simplify if necessary'
      ],
      examples: [
        {
          problem: '3/4 - 1/2 = ?',
          solution: '1/4',
          explanation: 'LCD is 4. Convert 1/2 to 2/4. Then 3/4 - 2/4 = 1/4'
        },
        {
          problem: '5/6 - 1/3 = ?',
          solution: '3/6 = 1/2',
          explanation: 'LCD is 6. Convert 1/3 to 2/6. Then 5/6 - 2/6 = 3/6 = 1/2'
        },
        {
          problem: '7/8 - 1/4 = ?',
          solution: '5/8',
          explanation: 'LCD is 8. Convert 1/4 to 2/8. Then 7/8 - 2/8 = 5/8'
        }
      ],
      tips: [
        'Always find the common denominator before subtracting',
        'Make sure the first fraction is larger than the second to avoid negative results',
        'Double-check your equivalent fractions before subtracting',
        'Simplify your final answer when possible'
      ]
    }
  },
  {
    id: 'subtraction-mixed',
    title: 'Subtracting Mixed Numbers',
    operation: 'subtraction',
    content: {
      introduction: 'Subtracting mixed numbers can be tricky when you need to borrow from the whole number. This happens when the fraction part of the first number is smaller than the fraction part of the second number.',
      steps: [
        'Subtract the whole numbers',
        'Subtract the fraction parts',
        'If the first fraction is smaller, borrow 1 from the whole number',
        'Convert the borrowed 1 to a fraction with the same denominator',
        'Add it to the first fraction, then subtract',
        'Simplify if necessary'
      ],
      examples: [
        {
          problem: '3 3/4 - 1 1/4 = ?',
          solution: '2 2/4 = 2 1/2',
          explanation: 'Subtract whole numbers: 3 - 1 = 2. Subtract fractions: 3/4 - 1/4 = 2/4 = 1/2. Result: 2 1/2'
        },
        {
          problem: '4 1/6 - 1 2/3 = ?',
          solution: '2 1/2',
          explanation: 'Convert to sixths: 4 1/6 - 1 4/6. Since 1/6 < 4/6, borrow: 3 7/6 - 1 4/6 = 2 3/6 = 2 1/2'
        },
        {
          problem: '5 - 2 3/5 = ?',
          solution: '2 2/5',
          explanation: 'Borrow from whole number: 5 = 4 5/5, then 4 5/5 - 2 3/5 = 2 2/5'
        }
      ],
      tips: [
        'When the first fraction is smaller, you must borrow from the whole number',
        'Convert the borrowed 1 to an equivalent fraction',
        'Add the borrowed fraction to the original fraction part',
        'Always check if your answer can be simplified'
      ]
    }
  },
  {
    id: 'multiplication-mixed',
    title: 'Multiplying with Whole and Mixed Numbers',
    operation: 'multiplication',
    content: {
      introduction: 'Adding mixed numbers (whole numbers combined with fractions) can be done in two ways: by adding the parts separately or by converting to improper fractions. Mixed numbers like 2 1/3 represent "2 and 1/3" or "2 plus 1/3". When adding mixed numbers, we need to be careful about carrying over when the fraction sum exceeds one whole.',
      steps: [
        'Identify the whole number parts and fraction parts of each mixed number',
        'Add the whole numbers together',
        'Add the fractions together (find common denominators if needed)',
        'If the fraction sum equals or exceeds 1, convert to a mixed number and add to the whole number sum',
        'Simplify the final result if possible',
        'Alternative method: Convert all mixed numbers to improper fractions, add, then convert back'
      ],
      examples: [
        {
          problem: '1 1/4 + 2 1/4 = ?',
          solution: '3 2/4 = 3 1/2',
          explanation: 'Add whole numbers: 1 + 2 = 3. Add fractions: 1/4 + 1/4 = 2/4 = 1/2. Result: 3 1/2'
        },
        {
          problem: '2 2/3 + 1 1/6 = ?',
          solution: '3 5/6',
          explanation: 'Add whole numbers: 2 + 1 = 3. Add fractions: 2/3 + 1/6 = 4/6 + 1/6 = 5/6. Result: 3 5/6'
        },
        {
          problem: '1 3/4 + 2 1/2 = ?',
          solution: '4 1/4',
          explanation: 'Add whole numbers: 1 + 2 = 3. Add fractions: 3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4. Total: 3 + 1 1/4 = 4 1/4'
        },
        {
          problem: '3 1/8 + 2 5/8 = ?',
          solution: '5 6/8 = 5 3/4',
          explanation: 'Add whole numbers: 3 + 2 = 5. Add fractions: 1/8 + 5/8 = 6/8 = 3/4. Result: 5 3/4'
        },
        {
          problem: '4 2/5 + 1 4/5 = ?',
          solution: '6 1/5',
          explanation: 'Add whole numbers: 4 + 1 = 5. Add fractions: 2/5 + 4/5 = 6/5 = 1 1/5. Total: 5 + 1 1/5 = 6 1/5'
        }
      ],
      tips: [
        'Method 1: Add whole numbers and fractions separately - easier for most students',
        'Method 2: Convert to improper fractions first - useful for complex problems',
        'When fractions have different denominators, find the LCD before adding',
        'If the fraction sum is improper (≥1), convert it and add to the whole number part',
        'Always check if your final answer can be simplified',
        'Use visual models like circles or rectangles to understand mixed number addition',
        'Practice identifying when the fraction sum will exceed 1 whole'
      ]
    }
  },
  {
    id: 'division-proper',
    title: 'Dividing Proper and Improper Fractions',
    operation: 'division',
    content: {
      introduction: 'Dividing any type of fraction follows the same rule: multiply by the reciprocal. Whether the fractions are proper (numerator < denominator) or improper (numerator ≥ denominator), the process remains the same.',
      steps: [
        'Keep the first fraction unchanged',
        'Change the division sign to multiplication',
        'Find the reciprocal of the second fraction (flip it)',
        'Multiply the fractions normally',
        'Simplify the result',
        'Convert to mixed number if the result is improper'
      ],
      examples: [
        {
          problem: '3/4 ÷ 2/3 = ?',
          solution: '9/8 = 1 1/8',
          explanation: 'Multiply by reciprocal: 3/4 × 3/2 = 9/8 = 1 1/8'
        },
        {
          problem: '5/3 ÷ 2/5 = ?',
          solution: '25/6 = 4 1/6',
          explanation: 'Multiply by reciprocal: 5/3 × 5/2 = 25/6 = 4 1/6'
        },
        {
          problem: '7/4 ÷ 3/8 = ?',
          solution: '14/3 = 4 2/3',
          explanation: 'Multiply by reciprocal: 7/4 × 8/3 = 56/12 = 14/3 = 4 2/3'
        }
      ],
      tips: [
        'The reciprocal of a/b is b/a',
        'Proper and improper fractions follow the same division rules',
        'Always simplify your answer',
        'Convert improper fraction results to mixed numbers for clarity'
      ]
    }
  },
  {
    id: 'division-mixed',
    title: 'Dividing with Whole and Mixed Numbers',
    operation: 'division',
    content: {
      introduction: 'When dividing with whole numbers or mixed numbers, convert everything to improper fractions first, then apply the reciprocal rule. This ensures consistent and accurate results.',
      steps: [
        'Convert whole numbers to fractions (e.g., 4 = 4/1)',
        'Convert mixed numbers to improper fractions',
        'Apply the reciprocal rule: multiply by the flipped second fraction',
        'Multiply numerators and denominators',
        'Simplify the result',
        'Convert back to mixed number if appropriate'
      ],
      examples: [
        {
          problem: '6 ÷ 2/3 = ?',
          solution: '9',
          explanation: 'Convert 6 to 6/1. Multiply by reciprocal: 6/1 × 3/2 = 18/2 = 9'
        },
        {
          problem: '2 1/2 ÷ 1/4 = ?',
          solution: '10',
          explanation: 'Convert 2 1/2 to 5/2. Multiply by reciprocal: 5/2 × 4/1 = 20/2 = 10'
        },
        {
          problem: '3 1/3 ÷ 2 2/5 = ?',
          solution: '25/18 = 1 7/18',
          explanation: 'Convert: 3 1/3 = 10/3, 2 2/5 = 12/5. Multiply: 10/3 × 5/12 = 50/36 = 25/18 = 1 7/18'
        }
      ],
      tips: [
        'Always convert to improper fractions before dividing',
        'Remember: dividing by a fraction is like multiplying by its reciprocal',
        'Whole numbers become fractions with denominator 1',
        'Check if your final answer should be expressed as a mixed number'
      ]
    }
  }
];