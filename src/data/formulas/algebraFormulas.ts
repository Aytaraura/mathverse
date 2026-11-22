import { FormulaItem } from '../../types/formulas';

export const algebraFormulas: FormulaItem[] = [
  {
    id: 'alg_square_sum_diff',
    name: 'Square of a Sum & Difference',
    subject: 'algebra',
    category: 'Algebraic Identities',
    topic: 'Identities',
    difficulty: 'Beginner',
    latex: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2',
    altLatex: '(a+b)^2 = a^2 + 2ab + b^2, \\quad (a-b)^2 = a^2 - 2ab + b^2',
    variables: [
      { symbol: 'a, b', name: 'Real or complex terms', meaning: 'Variables, numbers, or sub-expressions' }
    ],
    conditions: [
      'Holds for all real and complex numbers',
      'Geometrically represents the area of a partitioned square of side (a+b)'
    ],
    whenToUse: 'Expanding binomials, completing the square for quadratics and conic sections, and rapid mental math.',
    derivation: 'By distributive property: (a+b)(a+b) = a(a+b) + b(a+b) = a^2 + ab + ba + b^2 = a^2 + 2ab + b^2.',
    workedExample: {
      problem: 'Expand (3x - 5)^2.',
      problemLatex: '(3x - 5)^2',
      steps: [
        { stepNum: 1, instruction: 'Identify a and b', mathLatex: 'a = 3x, \\quad b = 5' },
        { stepNum: 2, instruction: 'Apply identity a^2 - 2ab + b^2', mathLatex: '(3x)^2 - 2(3x)(5) + 5^2' },
        { stepNum: 3, instruction: 'Simplify terms', mathLatex: '9x^2 - 30x + 25' }
      ],
      finalAnswer: '9x^2 - 30x + 25',
      finalAnswerLatex: '9x^2 - 30x + 25'
    },
    commonMistakes: [
      'The "Freshman\'s Dream": writing (a+b)^2 = a^2 + b^2. The middle term 2ab MUST never be dropped!',
      'Sign errors with negative terms: (-3)^2 is positive 9.'
    ],
    relatedFormulaIds: ['alg_diff_squares', 'alg_sum_diff_cubes'],
    practiceQuestions: [
      {
        id: 'q_alg_1',
        question: 'Expand (2x + 7)^2.',
        options: ['4x^2 + 28x + 49', '4x^2 + 49', '4x^2 + 14x + 49', '2x^2 + 28x + 49'],
        correctIndex: 0,
        explanation: '(2x)^2 + 2(2x)(7) + 7^2 = 4x^2 + 28x + 49.'
      }
    ],
    searchKeywords: ['square of sum', 'square of difference', 'binomial expansion', 'perfect square trinomial'],
    memoryCard: {
      clozeLatex: '(a - b)^2 = a^2 - ??? + b^2',
      missingPart: '2ab',
      missingOptions: ['2ab', 'ab', '4ab', 'b^2'],
      recallPrompt: 'What is the middle term of (a - b)^2?',
      identificationPrompt: 'Formula for: Square of a Difference.'
    }
  },
  {
    id: 'alg_diff_squares',
    name: 'Difference of Two Squares',
    subject: 'algebra',
    category: 'Algebraic Identities',
    topic: 'Identities & Factoring',
    difficulty: 'Beginner',
    latex: 'a^2 - b^2 = (a - b)(a + b)',
    variables: [
      { symbol: 'a, b', name: 'Terms / Factors', meaning: 'Any algebraic expressions or numerical values' }
    ],
    conditions: [
      'Valid over any ring or field (commutative)',
      'Note: The sum of squares a^2 + b^2 does not factor over real numbers, but factors as (a - bi)(a + bi) over complex numbers'
    ],
    whenToUse: 'Factoring polynomials, rationalizing radical denominators (multiplying by conjugate), and simplifying limits.',
    workedExample: {
      problem: 'Rationalize the denominator of \\frac{6}{\\sqrt{5} - \\sqrt{2}}.',
      problemLatex: '\\frac{6}{\\sqrt{5} - \\sqrt{2}}',
      steps: [
        { stepNum: 1, instruction: 'Multiply numerator and denominator by the conjugate', mathLatex: '\\frac{6(\\sqrt{5} + \\sqrt{2})}{(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})}' },
        { stepNum: 2, instruction: 'Use difference of squares on denominator', mathLatex: '(\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3' },
        { stepNum: 3, instruction: 'Simplify the fraction', mathLatex: '\\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2})' }
      ],
      finalAnswer: '2(sqrt(5) + sqrt(2))',
      finalAnswerLatex: '2(\\sqrt{5} + \\sqrt{2})'
    },
    commonMistakes: [
      'Trying to factor a^2 + b^2 over real numbers.',
      'Forgetting that powers like x^4 - 16 factor twice: (x^2 - 4)(x^2 + 4) = (x-2)(x+2)(x^2+4).'
    ],
    relatedFormulaIds: ['alg_square_sum_diff', 'alg_sum_diff_cubes'],
    practiceQuestions: [
      {
        id: 'q_alg_2',
        question: 'Factor completely: 49x^2 - 64y^2.',
        options: ['(7x - 8y)(7x + 8y)', '(7x - 8y)^2', '(49x - 64y)(x + y)', '7(x - y)(x + y)'],
        correctIndex: 0,
        explanation: 'a = 7x and b = 8y. (7x)^2 - (8y)^2 = (7x - 8y)(7x + 8y).'
      }
    ],
    searchKeywords: ['difference of squares', 'factoring identity', 'conjugate', 'rationalizing denominator'],
    memoryCard: {
      clozeLatex: 'a^2 - b^2 = (a - b)(???)',
      missingPart: 'a + b',
      missingOptions: ['a + b', 'a - b', 'a^2 + b^2', '2ab'],
      recallPrompt: 'What are the two binomial factors of a^2 - b^2?',
      identificationPrompt: 'Formula for: Difference of Two Squares.'
    }
  },
  {
    id: 'alg_sum_diff_cubes',
    name: 'Sum and Difference of Cubes',
    subject: 'algebra',
    category: 'Algebraic Identities',
    topic: 'Identities & Factoring',
    difficulty: 'Intermediate',
    latex: 'a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
    altLatex: 'a^3 + b^3 = (a+b)(a^2-ab+b^2), \\quad a^3 - b^3 = (a-b)(a^2+ab+b^2)',
    variables: [
      { symbol: 'a, b', name: 'Cubed terms', meaning: 'Expressions whose cubes are being added or subtracted' }
    ],
    conditions: [
      'Holds over all real and complex numbers',
      'The quadratic factor (a^2 \\mp ab + b^2) has negative discriminant (-3b^2 < 0 for b \\neq 0) and cannot be factored further over the reals'
    ],
    whenToUse: 'Factoring cubic equations, simplifying algebraic fractions, finding complex roots of unity.',
    workedExample: {
      problem: 'Factor 8x^3 - 27.',
      problemLatex: '8x^3 - 27',
      steps: [
        { stepNum: 1, instruction: 'Recognize cube terms', mathLatex: 'a = 2x, \\quad b = 3 \\quad \\text{since } (2x)^3=8x^3, 3^3=27' },
        { stepNum: 2, instruction: 'Apply difference of cubes (a - b)(a^2 + ab + b^2)', mathLatex: '(2x - 3)((2x)^2 + (2x)(3) + 3^2)' },
        { stepNum: 3, instruction: 'Simplify the quadratic factor', mathLatex: '(2x - 3)(4x^2 + 6x + 9)' }
      ],
      finalAnswer: '(2x - 3)(4x^2 + 6x + 9)',
      finalAnswerLatex: '(2x - 3)(4x^2 + 6x + 9)'
    },
    commonMistakes: [
      'Putting a 2 in the middle term of the quadratic factor: it is ab, NOT 2ab!',
      'Mismatched signs (use SOAP mnemonic: Same, Opposite, Always Positive).'
    ],
    relatedFormulaIds: ['alg_diff_squares', 'alg_cube_binomial'],
    practiceQuestions: [
      {
        id: 'q_alg_3',
        question: 'Factor x^3 + 125.',
        options: ['(x + 5)(x^2 - 5x + 25)', '(x + 5)(x^2 + 5x + 25)', '(x - 5)(x^2 + 5x + 25)', '(x + 5)^3'],
        correctIndex: 0,
        explanation: 'a = x, b = 5. Signs: Same (+), Opposite (-), Always Positive (+): (x + 5)(x^2 - 5x + 25).'
      }
    ],
    searchKeywords: ['sum of cubes', 'difference of cubes', 'factoring cubes', 'SOAP mnemonic'],
    memoryCard: {
      clozeLatex: 'a^3 + b^3 = (a + b)(a^2 - ??? + b^2)',
      missingPart: 'ab',
      missingOptions: ['ab', '2ab', '3ab', 'b^2'],
      recallPrompt: 'What is the middle term of the trinomial factor in sum of cubes?',
      identificationPrompt: 'Formula for: Sum of Cubes.'
    }
  },
  {
    id: 'alg_cube_binomial',
    name: 'Cube of Sum and Difference',
    subject: 'algebra',
    category: 'Algebraic Identities',
    topic: 'Identities',
    difficulty: 'Intermediate',
    latex: '(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3',
    variables: [
      { symbol: 'a, b', name: 'Binomial terms', meaning: 'The base terms being cubed' }
    ],
    conditions: [
      'Derived from binomial theorem for n = 3 with Pascal triangle row 1, 3, 3, 1'
    ],
    whenToUse: 'Expanding cubes of polynomials, solving Cardano cubic equations, algebraic substitutions.',
    workedExample: {
      problem: 'Expand (2x - 1)^3.',
      steps: [
        { stepNum: 1, instruction: 'Identify a and b', mathLatex: 'a = 2x, \\quad b = 1' },
        { stepNum: 2, instruction: 'Apply formula a^3 - 3a^2b + 3ab^2 - b^3', mathLatex: '(2x)^3 - 3(2x)^2(1) + 3(2x)(1)^2 - 1^3' },
        { stepNum: 3, instruction: 'Evaluate each term', mathLatex: '8x^3 - 3(4x^2)(1) + 6x - 1 = 8x^3 - 12x^2 + 6x - 1' }
      ],
      finalAnswer: '8x^3 - 12x^2 + 6x - 1',
      finalAnswerLatex: '8x^3 - 12x^2 + 6x - 1'
    },
    commonMistakes: [
      'Alternating signs incorrectly: (-b)^3 is negative, (-b)^2 is positive.',
      'Missing the coefficient 3 on the cross-terms.'
    ],
    relatedFormulaIds: ['alg_binomial_theorem', 'alg_sum_diff_cubes'],
    practiceQuestions: [
      {
        id: 'q_alg_4',
        question: 'What is the coefficient of x^2 in the expansion of (x + 3)^3?',
        options: ['9', '27', '3', '6'],
        correctIndex: 0,
        explanation: 'Term is 3 * x^2 * 3^1 = 9x^2. Coefficient is 9.'
      }
    ],
    searchKeywords: ['cube of sum', 'cube of difference', 'cubic expansion', 'Pascal triangle row 3'],
    memoryCard: {
      clozeLatex: '(a + b)^3 = a^3 + 3a^2b + ??? + b^3',
      missingPart: '3ab^2',
      missingOptions: ['3ab^2', '2ab^2', 'ab^2', '3ab'],
      recallPrompt: 'What is the third term in the expansion of (a + b)^3?',
      identificationPrompt: 'Formula for: Expansion of Cube of a Binomial.'
    }
  },
  {
    id: 'alg_three_variable_identities',
    name: 'Multi-Variable Identities (Sum of Three Squares & Three Cubes)',
    subject: 'algebra',
    category: 'Algebraic Identities',
    topic: 'Advanced Identities',
    difficulty: 'Advanced',
    latex: '(a+b+c)^2 = a^2+b^2+c^2 + 2(ab+bc+ca), \\quad a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab - bc - ca)',
    variables: [
      { symbol: 'a, b, c', name: 'Variables', meaning: 'Three algebraic quantities' }
    ],
    conditions: [
      'If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc (crucial Olympiad identity!)',
      'a^2+b^2+c^2 - ab - bc - ca = \\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2] \\ge 0'
    ],
    whenToUse: 'Symmetric polynomial factorizations, competition math, and proving non-negativity.',
    workedExample: {
      problem: 'If a + b + c = 0, find \\frac{a^3 + b^3 + c^3}{abc}.',
      steps: [
        { stepNum: 1, instruction: 'Use the 3-cubes identity', mathLatex: 'a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)' },
        { stepNum: 2, instruction: 'Substitute a + b + c = 0', mathLatex: 'a^3+b^3+c^3 - 3abc = 0 \\implies a^3+b^3+c^3 = 3abc' },
        { stepNum: 3, instruction: 'Divide both sides by abc', mathLatex: '\\frac{a^3+b^3+c^3}{abc} = 3' }
      ],
      finalAnswer: '3',
      finalAnswerLatex: '3'
    },
    commonMistakes: [
      'Forgetting that if a+b+c = 0, a^3+b^3+c^3 equals 3abc.',
      'Missing the factor 2 in the cross terms 2(ab+bc+ca).'
    ],
    relatedFormulaIds: ['olympiad_am_gm', 'alg_vieta_formulas'],
    practiceQuestions: [
      {
        id: 'q_alg_5',
        question: 'If a=10, b=-7, c=-3, what is a^3 + b^3 + c^3?',
        options: ['630', '0', '-630', '1000'],
        correctIndex: 0,
        explanation: 'a + b + c = 10 - 7 - 3 = 0. Therefore a^3 + b^3 + c^3 = 3abc = 3(10)(-7)(-3) = 630.'
      }
    ],
    searchKeywords: ['three variable identity', 'sum of three cubes', 'a3+b3+c3-3abc', 'symmetric polynomials'],
    memoryCard: {
      clozeLatex: 'a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ???)',
      missingPart: '(ab + bc + ca)',
      missingOptions: ['(ab + bc + ca)', '2(ab + bc + ca)', '3abc', '0'],
      recallPrompt: 'What expression is subtracted inside the second factor of a^3+b^3+c^3 - 3abc?',
      identificationPrompt: 'Formula for: Identity of Three Cubes.'
    }
  },
  {
    id: 'alg_quadratic_formula',
    name: 'Quadratic Formula and Discriminant',
    subject: 'algebra',
    category: 'Quadratics',
    topic: 'Quadratic Equations',
    difficulty: 'Beginner',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
    variables: [
      { symbol: 'a, b, c', name: 'Coefficients', meaning: 'Coefficients in ax^2 + bx + c = 0' },
      { symbol: '\\Delta', name: 'Discriminant', meaning: 'Determines the nature of the roots' }
    ],
    conditions: [
      'a \\neq 0',
      '\\Delta > 0: \\text{Two distinct real roots}',
      '\\Delta = 0: \\text{Exactly one real root (multiplicity 2, vertex on x-axis)}',
      '\\Delta < 0: \\text{Two complex conjugate roots } \\frac{-b \\pm i\\sqrt{|\\Delta|}}{2a}'
    ],
    whenToUse: 'Solving any quadratic equation that does not factor easily by inspection.',
    derivation: 'Derived by completing the square on ax^2 + bx + c = 0: divide by a, move c/a to right, add (b/2a)^2 to both sides, and take the square root.',
    workedExample: {
      problem: 'Solve 2x^2 - 5x - 3 = 0.',
      steps: [
        { stepNum: 1, instruction: 'Identify coefficients', mathLatex: 'a = 2, \\quad b = -5, \\quad c = -3' },
        { stepNum: 2, instruction: 'Calculate discriminant Delta', mathLatex: '\\Delta = (-5)^2 - 4(2)(-3) = 25 + 24 = 49' },
        { stepNum: 3, instruction: 'Apply quadratic formula', mathLatex: 'x = \\frac{-(-5) \\pm \\sqrt{49}}{2(2)} = \\frac{5 \\pm 7}{4}' },
        { stepNum: 4, instruction: 'Separate into two solutions', mathLatex: 'x_1 = \\frac{12}{4} = 3, \\quad x_2 = \\frac{-2}{4} = -\\frac{1}{2}' }
      ],
      finalAnswer: 'x = 3 or x = -1/2',
      finalAnswerLatex: 'x = 3, \\quad x = -\\frac{1}{2}'
    },
    commonMistakes: [
      'Writing -b as negative when b is already negative (e.g. -(-5) = +5).',
      'Dividing only the radical by 2a instead of the ENTIRE numerator (-b +/- sqrt(Delta)).',
      'Squaring -5 as -25 instead of +25.'
    ],
    relatedFormulaIds: ['alg_vieta_formulas', 'alg_square_sum_diff'],
    practiceQuestions: [
      {
        id: 'q_alg_6',
        question: 'What is the discriminant of x^2 - 6x + 9 = 0 and what does it tell you?',
        options: ['0 (One repeated real root)', '72 (Two real roots)', '-36 (Complex roots)', '9 (Two real roots)'],
        correctIndex: 0,
        explanation: 'Delta = (-6)^2 - 4(1)(9) = 36 - 36 = 0, indicating a single repeated root (x = 3).'
      }
    ],
    searchKeywords: ['quadratic formula', 'discriminant', 'b2-4ac', 'roots of quadratic', 'nature of roots'],
    memoryCard: {
      clozeLatex: 'x = \\frac{-b \\pm \\sqrt{???}}{2a}',
      missingPart: 'b^2 - 4ac',
      missingOptions: ['b^2 - 4ac', 'b^2 + 4ac', '4ac - b^2', 'b - 4ac'],
      recallPrompt: 'What is the expression under the square root in the quadratic formula?',
      identificationPrompt: 'Formula for: Quadratic Formula.'
    }
  },
  {
    id: 'alg_vieta_formulas',
    name: "Vieta's Formulas (Quadratic & Cubic)",
    subject: 'algebra',
    category: 'Polynomials',
    topic: 'Roots and Coefficients',
    difficulty: 'Intermediate',
    latex: '\\text{Quadratic: } r_1 + r_2 = -\\frac{b}{a}, \\quad r_1 r_2 = \\frac{c}{a}; \\quad \\text{Cubic: } \\sum r_i = -\\frac{b}{a}, \\; \\sum r_i r_j = \\frac{c}{a}, \\; r_1 r_2 r_3 = -\\frac{d}{a}',
    variables: [
      { symbol: 'a, b, c, d', name: 'Polynomial coefficients', meaning: 'Coefficients of P(x) = ax^n + bx^{n-1} + ...' },
      { symbol: 'r_i', name: 'Roots', meaning: 'The roots of P(x) = 0 counted with multiplicity' }
    ],
    conditions: [
      'Leading coefficient a \\neq 0',
      'Signs alternate: e_k(r_1, ..., r_n) = (-1)^k \\frac{a_{n-k}}{a_n}'
    ],
    whenToUse: 'Finding symmetric combinations of roots (e.g. r_1^2 + r_2^2) without explicitly solving the equation.',
    workedExample: {
      problem: 'If r_1 and r_2 are roots of 2x^2 - 8x + 5 = 0, find r_1^2 + r_2^2.',
      steps: [
        { stepNum: 1, instruction: "Use Vieta's formulas for sum and product", mathLatex: 'r_1 + r_2 = -\\frac{-8}{2} = 4, \\quad r_1 r_2 = \\frac{5}{2}' },
        { stepNum: 2, instruction: 'Express r_1^2 + r_2^2 in terms of sum and product', mathLatex: 'r_1^2 + r_2^2 = (r_1 + r_2)^2 - 2 r_1 r_2' },
        { stepNum: 3, instruction: 'Substitute the Vieta values', mathLatex: '4^2 - 2\\left(\\frac{5}{2}\\right) = 16 - 5 = 11' }
      ],
      finalAnswer: '11',
      finalAnswerLatex: '11'
    },
    commonMistakes: [
      'Forgetting the alternating minus sign on odd symmetric sums (e.g. sum of roots has a minus sign, product of quadratic roots does not).',
      'Forgetting to divide by the leading coefficient a.'
    ],
    relatedFormulaIds: ['alg_quadratic_formula', 'alg_three_variable_identities'],
    practiceQuestions: [
      {
        id: 'q_alg_7',
        question: 'For 3x^2 + 12x - 15 = 0, what is the sum of the roots?',
        options: ['-4', '4', '-5', '5'],
        correctIndex: 0,
        explanation: 'Sum = -b / a = -12 / 3 = -4.'
      }
    ],
    searchKeywords: ['Vietas formulas', 'sum of roots', 'product of roots', 'symmetric polynomials'],
    memoryCard: {
      clozeLatex: 'r_1 + r_2 = ???, \\quad r_1 r_2 = \\frac{c}{a}',
      missingPart: '-\\frac{b}{a}',
      missingOptions: ['-\\frac{b}{a}', '\\frac{b}{a}', '-\\frac{c}{a}', '\\frac{a}{b}'],
      recallPrompt: 'What is the sum of roots of ax^2 + bx + c = 0 according to Vieta?',
      identificationPrompt: "Formula for: Vieta's Sum of Roots."
    }
  },
  {
    id: 'alg_remainder_factor_theorems',
    name: 'Polynomial Remainder and Factor Theorems',
    subject: 'algebra',
    category: 'Polynomials',
    topic: 'Polynomial Division',
    difficulty: 'Intermediate',
    latex: 'P(x) = (x - c)Q(x) + R \\implies R = P(c), \\quad (x - c) \\text{ is a factor of } P(x) \\iff P(c) = 0',
    variables: [
      { symbol: 'P(x)', name: 'Dividend polynomial', meaning: 'The polynomial being divided' },
      { symbol: 'x - c', name: 'Linear divisor', meaning: 'The binomial divisor' },
      { symbol: 'Q(x)', name: 'Quotient polynomial', meaning: 'The polynomial result' },
      { symbol: 'R', name: 'Remainder', meaning: 'Constant remainder equal to P(c)' }
    ],
    conditions: [
      'Divisor is linear of form (x - c). If divisor is (ax - b), remainder is P(b/a).'
    ],
    whenToUse: 'Evaluating polynomial remainders without long division, finding rational roots, and factoring higher degree polynomials.',
    workedExample: {
      problem: 'Find the remainder when P(x) = 2x^3 - 4x^2 + 5x - 7 is divided by (x - 2).',
      steps: [
        { stepNum: 1, instruction: 'Identify c in divisor (x - c)', mathLatex: 'c = 2' },
        { stepNum: 2, instruction: 'Evaluate P(2)', mathLatex: 'P(2) = 2(2)^3 - 4(2)^2 + 5(2) - 7' },
        { stepNum: 3, instruction: 'Compute the arithmetic', mathLatex: '2(8) - 4(4) + 10 - 7 = 16 - 16 + 10 - 7 = 3' }
      ],
      finalAnswer: 'Remainder R = 3',
      finalAnswerLatex: 'R = 3'
    },
    commonMistakes: [
      'Using the wrong sign for c: dividing by (x + 3) means c = -3, NOT +3.',
      'Assuming the theorem works directly for non-linear divisors without using polynomial division.'
    ],
    relatedFormulaIds: ['alg_vieta_formulas'],
    practiceQuestions: [
      {
        id: 'q_alg_8',
        question: 'Is (x + 1) a factor of x^3 + 2x^2 - x - 2?',
        options: ['Yes, because P(-1) = 0', 'No, because P(-1) != 0', 'Yes, because P(1) = 0', 'No, because P(1) != 0'],
        correctIndex: 0,
        explanation: 'P(-1) = (-1)^3 + 2(-1)^2 - (-1) - 2 = -1 + 2 + 1 - 2 = 0. By factor theorem, (x+1) is a factor.'
      }
    ],
    searchKeywords: ['remainder theorem', 'factor theorem', 'synthetic division', 'polynomial roots'],
    memoryCard: {
      clozeLatex: '(x - c) \\text{ divides } P(x) \\iff P(c) = ???',
      missingPart: '0',
      missingOptions: ['0', '1', 'c', '-1'],
      recallPrompt: 'What must P(c) equal for (x - c) to be a factor of P(x)?',
      identificationPrompt: 'Formula for: Polynomial Factor Theorem Condition.'
    }
  },
  {
    id: 'alg_arithmetic_sequence_series',
    name: 'Arithmetic Sequences and Series',
    subject: 'algebra',
    category: 'Sequences & Series',
    topic: 'Arithmetic Progression',
    difficulty: 'Beginner',
    latex: 'a_n = a_1 + (n - 1)d, \\quad S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}[2a_1 + (n - 1)d]',
    variables: [
      { symbol: 'a_n', name: 'nth term', meaning: 'The value at position n' },
      { symbol: 'a_1', name: 'First term', meaning: 'Starting value of progression' },
      { symbol: 'd', name: 'Common difference', meaning: 'Constant difference d = a_{k+1} - a_k' },
      { symbol: 'n', name: 'Number of terms', meaning: 'Positive integer position' },
      { symbol: 'S_n', name: 'Partial sum', meaning: 'Sum of the first n terms' }
    ],
    conditions: [
      'd is constant for all consecutive terms',
      'n \\in \\mathbb{Z}^+'
    ],
    whenToUse: 'Linear growth models, evenly spaced payments, calendar calculations, and triangular number sums.',
    workedExample: {
      problem: 'Find the sum of the first 20 terms of the AP: 3, 7, 11, 15, ...',
      steps: [
        { stepNum: 1, instruction: 'Identify parameters', mathLatex: 'a_1 = 3, \\quad d = 7 - 3 = 4, \\quad n = 20' },
        { stepNum: 2, instruction: 'Use series formula S_n = (n/2)[2a_1 + (n-1)d]', mathLatex: 'S_{20} = \\frac{20}{2}[2(3) + (20 - 1)(4)]' },
        { stepNum: 3, instruction: 'Simplify inside brackets', mathLatex: '10[6 + 19(4)] = 10[6 + 76] = 10(82) = 820' }
      ],
      finalAnswer: '820',
      finalAnswerLatex: '820'
    },
    commonMistakes: [
      'Using n instead of (n - 1) in the nth term formula (e.g. a_n = a_1 + nd is WRONG).',
      'Confusing the nth term a_n with the sum of n terms S_n.'
    ],
    relatedFormulaIds: ['alg_geometric_series', 'adv_sequences_series'],
    practiceQuestions: [
      {
        id: 'q_alg_9',
        question: 'What is the 10th term of the sequence 5, 8, 11, 14, ...?',
        options: ['32', '35', '29', '38'],
        correctIndex: 0,
        explanation: 'a_10 = 5 + (10 - 1)*3 = 5 + 27 = 32.'
      }
    ],
    searchKeywords: ['arithmetic sequence', 'arithmetic progression', 'AP sum', 'common difference'],
    memoryCard: {
      clozeLatex: 'a_n = a_1 + (??? )d',
      missingPart: 'n - 1',
      missingOptions: ['n - 1', 'n', 'n + 1', '2n'],
      recallPrompt: 'What coefficient multiplies the common difference d in the nth term of an AP?',
      identificationPrompt: 'Formula for: nth Term of an Arithmetic Progression.'
    }
  },
  {
    id: 'alg_geometric_series',
    name: 'Geometric Sequences and Series',
    subject: 'algebra',
    category: 'Sequences & Series',
    topic: 'Geometric Progression',
    difficulty: 'Intermediate',
    latex: 'a_n = a_1 r^{n-1}, \\quad S_n = \\frac{a_1(1 - r^n)}{1 - r} \\quad (r \\neq 1), \\quad S_\\infty = \\frac{a_1}{1 - r} \\quad (|r| < 1)',
    variables: [
      { symbol: 'a_n', name: 'nth term', meaning: 'Value at index n' },
      { symbol: 'a_1', name: 'Initial term', meaning: 'First term of sequence' },
      { symbol: 'r', name: 'Common ratio', meaning: 'Constant ratio r = a_{k+1}/a_k' },
      { symbol: 'S_n', name: 'Finite sum', meaning: 'Sum of first n terms' },
      { symbol: 'S_\\infty', name: 'Infinite sum', meaning: 'Convergent sum of infinitely many terms' }
    ],
    conditions: [
      'r \\neq 1 for finite sum formula (if r=1, S_n = n*a_1)',
      'For infinite sum S_\\infty to converge, strict condition is |r| < 1; if |r| >= 1, the series diverges'
    ],
    whenToUse: 'Exponential decay, compound interest, bouncing ball problems, fractals, and Zeno paradoxes.',
    workedExample: {
      problem: 'Evaluate the infinite geometric series: 12 + 6 + 3 + 1.5 + ...',
      steps: [
        { stepNum: 1, instruction: 'Determine a_1 and r', mathLatex: 'a_1 = 12, \\quad r = \\frac{6}{12} = \\frac{1}{2}' },
        { stepNum: 2, instruction: 'Check convergence condition', mathLatex: '|r| = |0.5| < 1 \\implies \\text{Series converges}' },
        { stepNum: 3, instruction: 'Apply S_infinity = a_1 / (1 - r)', mathLatex: 'S_\\infty = \\frac{12}{1 - 0.5} = \\frac{12}{0.5} = 24' }
      ],
      finalAnswer: '24',
      finalAnswerLatex: '24'
    },
    commonMistakes: [
      'Attempting to sum an infinite series when |r| >= 1 (e.g. 1 + 2 + 4 + ... does not equal 1/(1-2) = -1 in standard analysis).',
      'Using exponent n instead of n-1 for the nth term.'
    ],
    relatedFormulaIds: ['alg_arithmetic_sequence_series', 'adv_infinite_series_tests'],
    practiceQuestions: [
      {
        id: 'q_alg_10',
        question: 'What is the sum of the infinite series 9 + 3 + 1 + 1/3 + ...?',
        options: ['13.5 (or 27/2)', '12', '18', '27'],
        correctIndex: 0,
        explanation: 'a_1 = 9, r = 1/3. S_infinity = 9 / (1 - 1/3) = 9 / (2/3) = 27/2 = 13.5.'
      }
    ],
    searchKeywords: ['geometric progression', 'GP', 'infinite geometric series', 'common ratio', 'convergence'],
    memoryCard: {
      clozeLatex: 'S_\\infty = \\frac{a_1}{???} \\quad (|r| < 1)',
      missingPart: '1 - r',
      missingOptions: ['1 - r', '1 + r', 'r - 1', 'r'],
      recallPrompt: 'What is the denominator of the sum of an infinite convergent geometric series?',
      identificationPrompt: 'Formula for: Infinite Geometric Series Sum.'
    }
  },
  {
    id: 'alg_binomial_theorem',
    name: 'Binomial Theorem',
    subject: 'algebra',
    category: 'Polynomials',
    topic: 'Binomial Expansion',
    difficulty: 'Intermediate',
    latex: '(a + b)^n = \\sum_{k=0}^n \\binom{n}{k} a^{n-k} b^k, \\quad \\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
    variables: [
      { symbol: 'n', name: 'Power / Exponent', meaning: 'Non-negative integer (extended to reals by Newton)' },
      { symbol: 'k', name: 'Term index', meaning: 'Index running from 0 to n (total n+1 terms)' },
      { symbol: '\\binom{n}{k}', name: 'Binomial coefficient', meaning: '"n choose k", count of combinations' }
    ],
    conditions: [
      'n \\in \\mathbb{Z}_{\\ge 0}',
      'General term T_{k+1} = \\binom{n}{k} a^{n-k} b^k'
    ],
    whenToUse: 'Expanding powers of binomials, finding specific term coefficients without full expansion, probability distributions.',
    workedExample: {
      problem: 'Find the term containing x^3 in the expansion of (x + 2)^5.',
      steps: [
        { stepNum: 1, instruction: 'Use general term formula with a = x, b = 2, n = 5', mathLatex: 'T_{k+1} = \\binom{5}{k} x^{5-k} 2^k' },
        { stepNum: 2, instruction: 'Set exponent of x equal to 3', mathLatex: '5 - k = 3 \\implies k = 2' },
        { stepNum: 3, instruction: 'Compute coefficient', mathLatex: '\\binom{5}{2} x^3 2^2 = \\frac{5 \\times 4}{2 \\times 1} \\cdot 4 \\cdot x^3 = 10 \\cdot 4 \\cdot x^3 = 40x^3' }
      ],
      finalAnswer: '40x^3',
      finalAnswerLatex: '40x^3'
    },
    commonMistakes: [
      'Confusing the (k+1)th term with the kth term.',
      'Forgetting that the sum starts at k = 0, so there are n + 1 terms total.'
    ],
    relatedFormulaIds: ['adv_permutations_combinations', 'alg_cube_binomial'],
    practiceQuestions: [
      {
        id: 'q_alg_11',
        question: 'What is the sum of all binomial coefficients for n = 4 (i.e. binom(4,0) + ... + binom(4,4))?',
        options: ['16', '15', '32', '8'],
        correctIndex: 0,
        explanation: 'Set a=1, b=1: (1+1)^4 = 2^4 = 16.'
      }
    ],
    searchKeywords: ['binomial theorem', 'binomial expansion', 'n choose k', 'combination', 'Pascals triangle'],
    memoryCard: {
      clozeLatex: '(a + b)^n = \\sum_{k=0}^n ??? a^{n-k} b^k',
      missingPart: '\\binom{n}{k}',
      missingOptions: ['\\binom{n}{k}', 'n!', 'k!', 'n^k'],
      recallPrompt: 'What is the coefficient of a^(n-k) b^k in the Binomial Theorem?',
      identificationPrompt: 'Formula for: Binomial Theorem Expansion.'
    }
  },
  {
    id: 'alg_laws_of_exponents',
    name: 'Laws of Exponents',
    subject: 'algebra',
    category: 'Exponents & Logarithms',
    topic: 'Exponents',
    difficulty: 'Beginner',
    latex: 'a^m a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}, \\quad (ab)^n = a^n b^n, \\quad \\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}',
    variables: [
      { symbol: 'a, b', name: 'Bases', meaning: 'Base numbers' },
      { symbol: 'm, n', name: 'Exponents', meaning: 'Powers' }
    ],
    conditions: [
      'a \\neq 0, b \\neq 0',
      'a^0 = 1 for any nonzero a'
    ],
    whenToUse: 'Simplifying algebraic, calculus, and scientific expressions involving powers.',
    workedExample: {
      problem: 'Simplify \\frac{(x^2 y^3)^4}{x^5 y^2}.',
      steps: [
        { stepNum: 1, instruction: 'Distribute exponent 4 to numerator', mathLatex: '(x^2)^4 (y^3)^4 = x^8 y^{12}' },
        { stepNum: 2, instruction: 'Subtract denominator exponents', mathLatex: 'x^{8-5} y^{12-2} = x^3 y^{10}' }
      ],
      finalAnswer: 'x^3 y^10',
      finalAnswerLatex: 'x^3 y^{10}'
    },
    commonMistakes: [
      'Adding exponents when taking power of a power: (x^3)^2 = x^6, NOT x^5.',
      'Thinking a^m + a^n = a^{m+n}; exponent rules only work for MULTIPLICATION, not addition!'
    ],
    relatedFormulaIds: ['alg_logarithm_laws', 'arith_exponents_radicals'],
    practiceQuestions: [
      {
        id: 'q_alg_12',
        question: 'Simplify (2^3 * 2^4) / 2^5.',
        options: ['4 (or 2^2)', '8', '2', '16'],
        correctIndex: 0,
        explanation: '2^(3+4-5) = 2^2 = 4.'
      }
    ],
    searchKeywords: ['laws of exponents', 'rules of powers', 'exponent rules'],
    memoryCard: {
      clozeLatex: '(a^m)^n = ???',
      missingPart: 'a^{mn}',
      missingOptions: ['a^{mn}', 'a^{m+n}', 'a^{m/n}', 'a^{m-n}'],
      recallPrompt: 'What is the rule for power of a power (a^m)^n?',
      identificationPrompt: 'Formula for: Power of a Power Exponent Law.'
    }
  },
  {
    id: 'alg_logarithm_laws',
    name: 'Logarithm Laws and Change of Base',
    subject: 'algebra',
    category: 'Exponents & Logarithms',
    topic: 'Logarithms',
    difficulty: 'Intermediate',
    latex: '\\log_b(xy) = \\log_b x + \\log_b y, \\quad \\log_b\\left(\\frac{x}{y}\\right) = \\log_b x - \\log_b y, \\quad \\log_b(x^k) = k\\log_b x, \\quad \\log_b a = \\frac{\\log_c a}{\\log_c b} = \\frac{\\ln a}{\\ln b}',
    variables: [
      { symbol: 'b', name: 'Base of logarithm', meaning: 'Positive base b > 0, b != 1' },
      { symbol: 'x, y', name: 'Arguments', meaning: 'Must be strictly positive numbers' },
      { symbol: 'k', name: 'Power / Multiplier', meaning: 'Any real scalar' }
    ],
    conditions: [
      'x > 0, y > 0, b > 0, b \\neq 1',
      '\\log_b 1 = 0 \\text{ and } \\log_b b = 1'
    ],
    whenToUse: 'Solving exponential equations, differentiating power functions, Richter scale, decibels, pH scale.',
    workedExample: {
      problem: 'Solve for x: \\log_2(x) + \\log_2(x - 2) = 3.',
      steps: [
        { stepNum: 1, instruction: 'Combine logarithms using product rule', mathLatex: '\\log_2(x(x - 2)) = 3' },
        { stepNum: 2, instruction: 'Convert to exponential form', mathLatex: 'x(x - 2) = 2^3 = 8' },
        { stepNum: 3, instruction: 'Solve the quadratic equation x^2 - 2x - 8 = 0', mathLatex: '(x - 4)(x + 2) = 0 \\implies x = 4 \\text{ or } x = -2' },
        { stepNum: 4, instruction: 'Check domain restrictions (x > 2)', mathLatex: 'x = -2 \\text{ is extraneous (cannot take log of negative). Solution: } x = 4' }
      ],
      finalAnswer: 'x = 4',
      finalAnswerLatex: 'x = 4'
    },
    commonMistakes: [
      'Writing log(x + y) = log x + log y (LOG OF A SUM DOES NOT SIMPLIFY!).',
      'Forgetting to reject extraneous negative solutions caused by logarithm domain restrictions.',
      'Confusing log(x)/log(y) with log(x - y).'
    ],
    relatedFormulaIds: ['alg_laws_of_exponents', 'diff_logarithmic'],
    practiceQuestions: [
      {
        id: 'q_alg_13',
        question: 'Evaluate log_2(32) - log_2(4).',
        options: ['3', '4', '8', '2'],
        correctIndex: 0,
        explanation: 'log_2(32/4) = log_2(8) = 3 (since 2^3 = 8).'
      }
    ],
    searchKeywords: ['logarithm rules', 'properties of logs', 'change of base', 'natural log', 'log laws'],
    memoryCard: {
      clozeLatex: '\\log_b a = \\frac{\\ln a}{???}',
      missingPart: '\\ln b',
      missingOptions: ['\\ln b', '\\ln a', 'b', 'e^b'],
      recallPrompt: 'What is the denominator in the change of base formula using natural log?',
      identificationPrompt: 'Formula for: Logarithmic Change of Base.'
    }
  },
  {
    id: 'alg_complex_numbers',
    name: 'Complex Numbers & De Moivre’s Theorem',
    subject: 'algebra',
    category: 'Complex Numbers',
    topic: 'Complex Numbers',
    difficulty: 'Advanced',
    latex: 'z = a + bi, \\quad |z| = \\sqrt{a^2 + b^2}, \\quad z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)',
    variables: [
      { symbol: 'a, b', name: 'Real & Imaginary parts', meaning: 'Re(z) = a, Im(z) = b' },
      { symbol: 'i', name: 'Imaginary unit', meaning: 'Defined by i^2 = -1' },
      { symbol: 'r', name: 'Modulus / Magnitude', meaning: 'Distance from origin in complex plane' },
      { symbol: '\\theta', name: 'Argument', meaning: 'Angle with positive real axis: \\theta = \\operatorname{atan2}(b, a)' }
    ],
    conditions: [
      'Division: \\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{c^2+d^2} = \\frac{ac+bd}{c^2+d^2} + \\frac{bc-ad}{c^2+d^2}i \\quad (c^2+d^2 \\neq 0)',
      'Roots of unity: z_k = \\sqrt[n]{r} e^{i(\\theta + 2k\\pi)/n} \\text{ for } k = 0, 1, ..., n-1'
    ],
    whenToUse: 'Finding nth roots of numbers, AC electrical circuits, quantum wavefunctions, Fourier analysis.',
    workedExample: {
      problem: 'Compute (1 + i)^8 using De Moivre\'s theorem.',
      steps: [
        { stepNum: 1, instruction: 'Convert 1 + i to polar form', mathLatex: 'r = \\sqrt{1^2 + 1^2} = \\sqrt{2}, \\quad \\theta = \\frac{\\pi}{4}' },
        { stepNum: 2, instruction: 'Apply De Moivre\'s Theorem with n = 8', mathLatex: 'z^8 = (\\sqrt{2})^8 \\left[\\cos\\left(8 \\cdot \\frac{\\pi}{4}\\right) + i\\sin\\left(8 \\cdot \\frac{\\pi}{4}\\right)\\right]' },
        { stepNum: 3, instruction: 'Evaluate modulus and trig values', mathLatex: '(\\sqrt{2})^8 = 2^4 = 16, \\quad \\cos(2\\pi) = 1, \\quad \\sin(2\\pi) = 0' },
        { stepNum: 4, instruction: 'Conclude result', mathLatex: '16(1 + 0i) = 16' }
      ],
      finalAnswer: '16',
      finalAnswerLatex: '16'
    },
    commonMistakes: [
      'Assuming |z| = a + b instead of sqrt(a^2 + b^2).',
      'Forgetting that i^3 = -i and i^4 = 1.'
    ],
    relatedFormulaIds: ['adv_complex_numbers_euler', 'trig_pythagorean_identities'],
    practiceQuestions: [
      {
        id: 'q_alg_14',
        question: 'What is (3 + 4i)(3 - 4i)?',
        options: ['25', '9 - 16 = -7', '7', '25i'],
        correctIndex: 0,
        explanation: 'Difference of squares with i^2 = -1: 3^2 - (4i)^2 = 9 - 16(-1) = 9 + 16 = 25.'
      }
    ],
    searchKeywords: ['complex numbers', 'De Moivres theorem', 'modulus', 'argument', 'polar form', 'roots of unity'],
    memoryCard: {
      clozeLatex: '[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos ??? + i\\sin ???)',
      missingPart: 'n\\theta',
      missingOptions: ['n\\theta', '\\theta/n', '\\theta^n', 'n + \\theta'],
      recallPrompt: 'What happens to the angle theta when raising a complex number to power n via De Moivre?',
      identificationPrompt: "Formula for: De Moivre's Theorem."
    }
  },
  {
    id: 'alg_absolute_value_identities',
    name: 'Absolute Value Identities & Triangle Inequality',
    subject: 'algebra',
    category: 'Inequalities',
    topic: 'Absolute Value',
    difficulty: 'Intermediate',
    latex: '|ab| = |a||b|, \\quad \\left|\\frac{a}{b}\\right| = \\frac{|a|}{|b|}, \\quad |a + b| \\le |a| + |b|, \\quad |a - b| \\ge ||a| - |b||',
    variables: [
      { symbol: 'a, b', name: 'Real or complex numbers', meaning: 'Any numerical quantities or vectors' }
    ],
    conditions: [
      'b \\neq 0',
      'Equality |a+b| = |a| + |b| holds iff a and b have the same sign (ab >= 0) or one is zero'
    ],
    whenToUse: 'Delta-epsilon limit proofs, error bounding, distance metrics, and real analysis inequalities.',
    workedExample: {
      problem: 'Solve the inequality |2x - 3| \\le 7.',
      steps: [
        { stepNum: 1, instruction: 'Unpack absolute value inequality |u| <= c into compound inequality', mathLatex: '-7 \\le 2x - 3 \\le 7' },
        { stepNum: 2, instruction: 'Add 3 to all three parts', mathLatex: '-4 \\le 2x \\le 10' },
        { stepNum: 3, instruction: 'Divide by 2', mathLatex: '-2 \\le x \\le 5' }
      ],
      finalAnswer: '[-2, 5]',
      finalAnswerLatex: '[-2, 5]'
    },
    commonMistakes: [
      'Splitting |x| > 5 into x > 5 AND x < -5 instead of OR.',
      'Assuming |a - b| = |a| - |b| (it is generally GREATER than or equal to ||a| - |b||).'
    ],
    relatedFormulaIds: ['olympiad_cauchy_schwarz', 'olympiad_am_gm'],
    practiceQuestions: [
      {
        id: 'q_alg_15',
        question: 'Under what condition does |a + b| = |a| + |b| hold for real numbers?',
        options: ['ab >= 0 (same sign or zero)', 'a = b', 'ab < 0', 'a = -b'],
        correctIndex: 0,
        explanation: 'Equality holds in triangle inequality when both numbers have the same sign (or at least one is zero).'
      }
    ],
    searchKeywords: ['triangle inequality', 'reverse triangle inequality', 'absolute value', 'distance'],
    memoryCard: {
      clozeLatex: '|a + b| \\le ???',
      missingPart: '|a| + |b|',
      missingOptions: ['|a| + |b|', '|a| - |b|', '|ab|', '2|a|'],
      recallPrompt: 'State the upper bound in the Triangle Inequality for |a + b|.',
      identificationPrompt: 'Formula for: Triangle Inequality.'
    }
  }
];
