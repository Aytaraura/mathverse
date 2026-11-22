import { Question } from '../../types';

export const olympiadQuestions: Question[] = [
  {
    id: 'oly_nt_001',
    subjectId: 'number_theory',
    subtopic: 'Diophantine & Primes',
    difficulty: 'OLYMPIAD',
    type: 'multiple_choice',
    prompt: 'Find all positive integers n such that n^4 + 4 is a prime number.',
    latexPrompt: 'n^4 + 4 \\in \\mathbb{P}, \\quad n \\in \\mathbb{Z}^+',
    options: [
      { id: 'a', text: 'n = 1 only', latex: 'n = 1' },
      { id: 'b', text: 'n = 1 and n = 2', latex: 'n = 1, 2' },
      { id: 'c', text: 'All odd n', latex: 'n \\equiv 1 \\pmod 2' },
      { id: 'd', text: 'No such n exists', latex: '\\emptyset' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Hint 1 (Conceptual Spark): Consider completing the square by adding and subtracting 4n^2.',
      'Hint 2 (Strategic Blueprint): Use Sophie Germain\'s Identity: a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2.',
      'Hint 3 (Key Algebraic Pivot): n^4 + 4 = (n^2 + 2n + 2)(n^2 - 2n + 2). For this product to be prime, the smaller factor must equal 1.',
      'Hint 4 (Near-Complete Walkthrough): n^2 - 2n + 2 = (n - 1)^2 + 1. For this to equal 1, (n - 1)^2 = 0 -> n = 1. When n = 1, 1^4 + 4 = 5 (prime).'
    ],
    solution: {
      ruleOrTechnique: 'Sophie Germain\'s Identity',
      whyItApplies: 'Factoring quartic forms of the shape a^4 + 4b^4 into difference of squares.',
      steps: [
        {
          stepNumber: 1,
          title: 'Complete the Square',
          explanation: 'n^4 + 4 = (n^4 + 4n^2 + 4) - 4n^2 = (n^2 + 2)^2 - (2n)^2.',
          mathExpression: 'n^4 + 4 = (n^2 + 2n + 2)(n^2 - 2n + 2)'
        },
        {
          stepNumber: 2,
          title: 'Primality Condition',
          explanation: 'A product of two integers > 1 is composite. For n^4 + 4 to be prime, the smaller factor n^2 - 2n + 2 must equal 1.',
          mathExpression: 'n^2 - 2n + 2 = 1 \\implies (n - 1)^2 = 0 \\implies n = 1'
        },
        {
          stepNumber: 3,
          title: 'Verify at n = 1',
          explanation: 'For n = 1, 1^4 + 4 = 5, which is prime. For n > 1, both factors are strictly greater than 1, so the number is composite.',
          mathExpression: 'n = 1'
        }
      ],
      finalAnswerLatex: 'n = 1',
      verification: 'For n=2: 16+4 = 20 (composite: 4*5). For n=3: 81+4 = 85 (composite: 5*17). Confirmed.'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'oly_alg_001',
    subjectId: 'algebra',
    subtopic: 'Symmetric Inequalities',
    difficulty: 'OLYMPIAD',
    type: 'multiple_choice',
    prompt: 'For positive real numbers a, b, c such that abc = 1, what is the minimum value of (a + b)(b + c)(c + a)?',
    latexPrompt: 'a, b, c > 0, \\quad abc = 1 \\implies \\min (a + b)(b + c)(c + a) = ?',
    options: [
      { id: 'a', text: '8', latex: '8' },
      { id: 'b', text: '6', latex: '6' },
      { id: 'c', text: '4', latex: '4' },
      { id: 'd', text: '9', latex: '9' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a', '8'],
    hints: [
      'Hint 1: Apply AM-GM inequality to each pairwise factor (a + b), (b + c), and (c + a).',
      'Hint 2: a + b >= 2 * sqrt(ab), b + c >= 2 * sqrt(bc), c + a >= 2 * sqrt(ca).',
      'Hint 3: Multiply the three inequalities together and use abc = 1.',
      'Hint 4: Equality occurs when a = b = c = 1, giving (2)(2)(2) = 8.'
    ],
    solution: {
      ruleOrTechnique: 'AM-GM Inequality on Pairwise Factors',
      whyItApplies: 'Symmetric cyclic product of positive real numbers.',
      steps: [
        {
          stepNumber: 1,
          title: 'Pairwise AM-GM',
          explanation: 'a + b >= 2 sqrt(ab), b + c >= 2 sqrt(bc), c + a >= 2 sqrt(ca).',
          mathExpression: 'a + b \\ge 2\\sqrt{ab}, \\, b + c \\ge 2\\sqrt{bc}, \\, c + a \\ge 2\\sqrt{ca}'
        },
        {
          stepNumber: 2,
          title: 'Multiply Inequalities',
          explanation: '(a + b)(b + c)(c + a) >= 2 * 2 * 2 * sqrt(ab * bc * ca) = 8 * sqrt(a^2 b^2 c^2) = 8abc.',
          mathExpression: '(a + b)(b + c)(c + a) \\ge 8abc = 8(1) = 8'
        },
        {
          stepNumber: 3,
          title: 'Equality Condition',
          explanation: 'AM-GM equality holds iff a = b = c = 1, so min value is exactly 8.'
        }
      ],
      finalAnswerLatex: '8'
    },
    errorCategoryIfWrong: 'theorem_application'
  }
];

export const weeklyChallenge = {
  weekNumber: 42,
  title: 'Putnam Analytical Enigma: Limit of Fractional Recurrences',
  category: 'Advanced Analysis & Olympiad Calculus',
  problemStatement: 'Let a_1 = 1, and for all n >= 1, define the recurrence relation a_{n+1} = a_n + 1 / (a_n)^2. Determine the exact asymptotic constant C such that lim_{n -> infinity} a_n / n^C exists and is non-zero, and compute this limit.',
  latex: 'a_{n+1} = a_n + \\frac{1}{a_n^2}, \\quad a_1 = 1 \\implies \\lim_{n \\to \\infty} \\frac{a_n}{n^C} = ?',
  hints: [
    'Hint 1: Cube both sides: a_{n+1}^3 = (a_n + 1/a_n^2)^3 = a_n^3 + 3 + 3/a_n^3 + 1/a_n^6.',
    'Hint 2: Let b_n = a_n^3. Then b_{n+1} - b_n = 3 + O(1/b_n). Notice how b_n grows approximately as an arithmetic progression with common difference 3.',
    'Hint 3: Apply the Stolz-Cesàro theorem (the discrete analog of L\'Hôpital\'s rule) to lim (a_n^3 / n).',
    'Hint 4: lim (a_n^3 / n) = 3. Therefore a_n ~ (3n)^(1/3), which means C = 1/3 and the limit is 3^(1/3).'
  ],
  solutionLatex: 'C = \\frac{1}{3}, \\quad \\lim_{n \\to \\infty} \\frac{a_n}{n^{1/3}} = \\sqrt[3]{3}',
  fullProof: 'By expanding a_{n+1}^3 = a_n^3 + 3 + 3/a_n^3 + 1/a_n^6, since a_n -> infinity, the difference a_{n+1}^3 - a_n^3 approaches 3. By the Stolz-Cesàro theorem, lim (a_n^3 / n) = lim (a_{n+1}^3 - a_n^3) / (n+1 - n) = 3. Taking the cube root yields a_n / n^(1/3) -> 3^(1/3).'
};
