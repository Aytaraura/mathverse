import { Question, SubjectId, DifficultyLevel } from '../types';

export interface QuizTopicDefinition {
  id: string;
  subjectId: SubjectId;
  title: string;
  category: string;
  description: string;
  icon: string;
  questionCount: number;
}

export const quizTopicsList: QuizTopicDefinition[] = [
  {
    id: 'topic_arithmetic_ops',
    subjectId: 'number_theory',
    title: 'Basic Arithmetic & Operations',
    category: 'Arithmetic',
    description: 'Order of operations (PEMDAS), signed integer arithmetic, speed multiplication and division.',
    icon: 'Hash',
    questionCount: 15
  },
  {
    id: 'topic_fractions_percents',
    subjectId: 'number_theory',
    title: 'Fractions, Decimals, Percentages & Ratios',
    category: 'Arithmetic',
    description: 'Fraction operations, percentage changes, ratios, proportions, and unit conversions.',
    icon: 'Percent',
    questionCount: 15
  },
  {
    id: 'topic_algebra_foundations',
    subjectId: 'algebra',
    title: 'Algebra & Advanced Identities',
    category: 'Algebra',
    description: 'Polynomial identities, quadratic formula, Vieta\'s formulas, and sequence summations.',
    icon: 'Variable',
    questionCount: 15
  },
  {
    id: 'topic_geometry_spatial',
    subjectId: 'geometry',
    title: 'Geometry & Spatial Reasoning',
    category: 'Geometry',
    description: '2D shape areas and perimeters, 3D solid volumes, coordinate planes, and Pythagorean theorems.',
    icon: 'Triangle',
    questionCount: 15
  },
  {
    id: 'topic_trigonometry_identities',
    subjectId: 'trigonometry',
    title: 'Trigonometry & Harmonic Identities',
    category: 'Trigonometry',
    description: 'Unit circle values, SOH-CAH-TOA, Law of Sines/Cosines, and double-angle identities.',
    icon: 'Compass',
    questionCount: 15
  },
  {
    id: 'topic_differential_calculus',
    subjectId: 'differential_calculus',
    title: 'Differential Calculus & Applications',
    category: 'Calculus',
    description: 'Product rule, quotient rule, chain rule, implicit differentiation, and optimization.',
    icon: 'Zap',
    questionCount: 15
  },
  {
    id: 'topic_integral_calculus',
    subjectId: 'integral_calculus',
    title: 'Integral Calculus & Techniques',
    category: 'Calculus',
    description: 'Antiderivatives, u-substitution, integration by parts, and solids of revolution.',
    icon: 'Sigma',
    questionCount: 15
  },
  {
    id: 'topic_probability_statistics',
    subjectId: 'probability_statistics',
    title: 'Probability & Statistical Distributions',
    category: 'Statistics',
    description: 'Bayes\' theorem, combinations, permutations, expected value, and variance.',
    icon: 'BarChart2',
    questionCount: 15
  },
  {
    id: 'topic_olympiad_number_theory',
    subjectId: 'advanced_math',
    title: 'Number Theory & Olympiad Theorems',
    category: 'Olympiad',
    description: 'AM-GM inequality, Fermat\'s Little Theorem, CRT, and Ceva\'s theorem.',
    icon: 'Trophy',
    questionCount: 15
  }
];

export interface QuizQuestionItem {
  id: string;
  topicId: string;
  difficulty: DifficultyLevel;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'identification';
  prompt: string;
  latexPrompt?: string;
  options: string[];
  correctAnswer: string;
  correctIndex: number;
  explanation: string;
}

export const masterQuizBank: QuizQuestionItem[] = [
  // ─── 1. ARITHMETIC OPERATIONS ───
  {
    id: 'q_arith_op_1',
    topicId: 'topic_arithmetic_ops',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Evaluate using the correct order of operations (PEMDAS): 8 + 6 * (5 - 2)^2 / 3.',
    latexPrompt: '8 + \\frac{6(5 - 2)^2}{3}',
    options: ['26', '42', '18', '32'],
    correctAnswer: '26',
    correctIndex: 0,
    explanation: '(5 - 2) = 3. 3^2 = 9. 6 * 9 = 54. 54 / 3 = 18. 8 + 18 = 26.'
  },
  {
    id: 'q_arith_op_2',
    topicId: 'topic_arithmetic_ops',
    difficulty: 'BEGINNER',
    type: 'true_false',
    prompt: 'True or False: Any negative number raised to an even power yields a positive result.',
    latexPrompt: '(-x)^{2k} > 0 \\quad (x \\neq 0, k \\in \\mathbb{Z})',
    options: ['True', 'False'],
    correctAnswer: 'True',
    correctIndex: 0,
    explanation: 'A negative number multiplied by a negative number is positive, so even powers always result in a positive value.'
  },
  {
    id: 'q_arith_op_3',
    topicId: 'topic_arithmetic_ops',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'What is the greatest common divisor (GCD) of 84 and 180?',
    options: ['12', '6', '18', '24'],
    correctAnswer: '12',
    correctIndex: 0,
    explanation: '84 = 2^2 * 3 * 7; 180 = 2^2 * 3^2 * 5. GCD = 2^2 * 3 = 12.'
  },

  // ─── 2. FRACTIONS, DECIMALS & RATIOS ───
  {
    id: 'q_frac_1',
    topicId: 'topic_fractions_percents',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Compute the difference of fractions: 5/6 - 3/8.',
    latexPrompt: '\\frac{5}{6} - \\frac{3}{8}',
    options: ['11/24', '2/2', '7/24', '1/12'],
    correctAnswer: '11/24',
    correctIndex: 0,
    explanation: 'LCD of 6 and 8 is 24. 5/6 = 20/24, 3/8 = 9/24. 20/24 - 9/24 = 11/24.'
  },
  {
    id: 'q_frac_2',
    topicId: 'topic_fractions_percents',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'A price decreases by 20% and then increases by 20%. Compared to the original price, the final price is:',
    options: ['4% lower', 'The same', '4% higher', '2% lower'],
    correctAnswer: '4% lower',
    correctIndex: 0,
    explanation: '1.00 * (1 - 0.20) * (1 + 0.20) = 0.80 * 1.20 = 0.96 (a 4% net decrease).'
  },
  {
    id: 'q_frac_3',
    topicId: 'topic_fractions_percents',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Divide $600 among Alice and Bob in the ratio 3:5. How much does Bob receive?',
    options: ['$375', '$225', '$350', '$400'],
    correctAnswer: '$375',
    correctIndex: 0,
    explanation: 'Total parts = 3 + 5 = 8. Bob\'s share = (5/8) * 600 = 5 * 75 = $375.'
  },

  // ─── 3. ALGEBRA & IDENTITIES ───
  {
    id: 'q_alg_op_1',
    topicId: 'topic_algebra_foundations',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Solve the quadratic equation x^2 - 7x + 12 = 0.',
    latexPrompt: 'x^2 - 7x + 12 = 0',
    options: ['x = 3 or x = 4', 'x = -3 or x = -4', 'x = 2 or x = 6', 'x = 1 or x = 12'],
    correctAnswer: 'x = 3 or x = 4',
    correctIndex: 0,
    explanation: 'Factor into (x - 3)(x - 4) = 0, giving roots x = 3 and x = 4.'
  },
  {
    id: 'q_alg_op_2',
    topicId: 'topic_algebra_foundations',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'If r1 and r2 are the roots of 3x^2 - 9x + 4 = 0, what is the value of r1 + r2?',
    options: ['3', '-3', '4/3', '-4/3'],
    correctAnswer: '3',
    correctIndex: 0,
    explanation: 'By Vieta\'s formulas, sum of roots = -b / a = -(-9) / 3 = 3.'
  },
  {
    id: 'q_alg_op_3',
    topicId: 'topic_algebra_foundations',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Evaluate the sum of the infinite geometric series: 16 - 8 + 4 - 2 + ...',
    latexPrompt: '16 - 8 + 4 - 2 + \\dots',
    options: ['32/3 (or 10.67)', '12', '16', '32'],
    correctAnswer: '32/3 (or 10.67)',
    correctIndex: 0,
    explanation: 'First term a = 16, ratio r = -1/2. S = a / (1 - r) = 16 / (1 - (-0.5)) = 16 / 1.5 = 32/3.'
  },

  // ─── 4. GEOMETRY & SPATIAL REASONING ───
  {
    id: 'q_geom_op_1',
    topicId: 'topic_geometry_spatial',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Find the area of a trapezoid with parallel bases 8 cm and 14 cm, and perpendicular height 5 cm.',
    latexPrompt: 'A = \\frac{a+b}{2}h',
    options: ['55 cm²', '110 cm²', '45 cm²', '60 cm²'],
    correctAnswer: '55 cm²',
    correctIndex: 0,
    explanation: 'A = ((8 + 14) / 2) * 5 = 11 * 5 = 55 cm².'
  },
  {
    id: 'q_geom_op_2',
    topicId: 'topic_geometry_spatial',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'A right circular cylinder has base radius 3 and height 8. What is its volume in terms of pi?',
    latexPrompt: 'V = \\pi r^2 h',
    options: ['72π', '24π', '48π', '144π'],
    correctAnswer: '72π',
    correctIndex: 0,
    explanation: 'V = pi * (3^2) * 8 = pi * 9 * 8 = 72*pi.'
  },
  {
    id: 'q_geom_op_3',
    topicId: 'topic_geometry_spatial',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'What is the distance between points (-2, 1) and (4, 9) in the Cartesian plane?',
    options: ['10', '12', '8', '14'],
    correctIndex: 0,
    explanation: 'd = sqrt((4 - (-2))^2 + (9 - 1)^2) = sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10.'
  },

  // ─── 5. TRIGONOMETRY ───
  {
    id: 'q_trig_op_1',
    topicId: 'topic_trigonometry_identities',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'What is the exact value of sin(2π/3)?',
    latexPrompt: '\\sin\\left(\\frac{2\\pi}{3}\\right)',
    options: ['√3/2', '1/2', '-√3/2', '-1/2'],
    correctAnswer: '√3/2',
    correctIndex: 0,
    explanation: '2pi/3 is in Quadrant II where sine is positive. Reference angle is pi/3. sin(pi/3) = sqrt(3)/2.'
  },
  {
    id: 'q_trig_op_2',
    topicId: 'topic_trigonometry_identities',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Simplify the expression: (1 - cos² θ) / sin θ.',
    latexPrompt: '\\frac{1 - \\cos^2\\theta}{\\sin\\theta}',
    options: ['sin θ', 'cos θ', 'tan θ', 'csc θ'],
    correctAnswer: 'sin θ',
    correctIndex: 0,
    explanation: '1 - cos² θ = sin² θ. sin² θ / sin θ = sin θ.'
  },
  {
    id: 'q_trig_op_3',
    topicId: 'topic_trigonometry_identities',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'In triangle ABC, side a = 6, side b = 10, and included angle C = 60°. What is the length of side c?',
    latexPrompt: 'c^2 = a^2 + b^2 - 2ab\\cos C',
    options: ['2√19 (or ~8.72)', '8', '14', '2√21'],
    correctAnswer: '2√19 (or ~8.72)',
    correctIndex: 0,
    explanation: 'c^2 = 6^2 + 10^2 - 2(6)(10)(cos 60°) = 36 + 100 - 120(0.5) = 136 - 60 = 76. c = sqrt(76) = 2*sqrt(19).'
  },

  // ─── 6. DIFFERENTIAL CALCULUS ───
  {
    id: 'q_diff_op_1',
    topicId: 'topic_differential_calculus',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Find the derivative of f(x) = 4x^3 - 5x^2 + 7x - 9.',
    latexPrompt: '\\frac{d}{dx}[4x^3 - 5x^2 + 7x - 9]',
    options: ['12x^2 - 10x + 7', '12x^2 - 10x', '4x^2 - 5x + 7', '12x^3 - 10x^2 + 7'],
    correctAnswer: '12x^2 - 10x + 7',
    correctIndex: 0,
    explanation: 'Power rule: 4(3x^2) - 5(2x) + 7(1) - 0 = 12x^2 - 10x + 7.'
  },
  {
    id: 'q_diff_op_2',
    topicId: 'topic_differential_calculus',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Differentiate y = (x² + 1) * e^x using the Product Rule.',
    latexPrompt: '\\frac{d}{dx}[(x^2 + 1)e^x]',
    options: ['(x² + 2x + 1)e^x', '2x e^x', '(x² + 1)e^x', '(2x + 1)e^x'],
    correctAnswer: '(x² + 2x + 1)e^x',
    correctIndex: 0,
    explanation: 'u\'v + uv\' = 2x*e^x + (x^2+1)*e^x = e^x(x^2 + 2x + 1).'
  },
  {
    id: 'q_diff_op_3',
    topicId: 'topic_differential_calculus',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'What are the critical points of f(x) = 2x^3 - 9x^2 + 12x?',
    options: ['x = 1 and x = 2', 'x = 0 and x = 3', 'x = -1 and x = -2', 'x = 3/2'],
    correctAnswer: 'x = 1 and x = 2',
    correctIndex: 0,
    explanation: 'f\'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0 => x = 1, x = 2.'
  },

  // ─── 7. INTEGRAL CALCULUS ───
  {
    id: 'q_integ_op_1',
    topicId: 'topic_integral_calculus',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Evaluate the indefinite integral: ∫ (6x^2 - 4x + 3) dx.',
    latexPrompt: '\\int (6x^2 - 4x + 3) \\, dx',
    options: ['2x^3 - 2x^2 + 3x + C', '6x^3 - 4x^2 + 3x + C', '12x - 4 + C', '2x^3 - x^2 + 3x + C'],
    correctAnswer: '2x^3 - 2x^2 + 3x + C',
    correctIndex: 0,
    explanation: '6*(x^3/3) - 4*(x^2/2) + 3x + C = 2x^3 - 2x^2 + 3x + C.'
  },
  {
    id: 'q_integ_op_2',
    topicId: 'topic_integral_calculus',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Evaluate the definite integral: ∫ from 0 to 3 of (2x + 1) dx.',
    latexPrompt: '\\int_0^3 (2x + 1) \\, dx',
    options: ['12', '9', '15', '7'],
    correctAnswer: '12',
    correctIndex: 0,
    explanation: 'Antiderivative is x^2 + x. [3^2 + 3] - [0] = 9 + 3 = 12.'
  },
  {
    id: 'q_integ_op_3',
    topicId: 'topic_integral_calculus',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Evaluate ∫ x * cos(x) dx using integration by parts.',
    latexPrompt: '\\int x \\cos x \\, dx',
    options: ['x sin x + cos x + C', 'x sin x - cos x + C', '-x sin x + cos x + C', 'x cos x + sin x + C'],
    correctAnswer: 'x sin x + cos x + C',
    correctIndex: 0,
    explanation: 'u = x, dv = cos x dx => du = dx, v = sin x. uv - int v du = x sin x - int sin x dx = x sin x - (-cos x) = x sin x + cos x + C.'
  },

  // ─── 8. PROBABILITY & STATISTICS ───
  {
    id: 'q_prob_op_1',
    topicId: 'topic_probability_statistics',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Two standard 6-sided dice are rolled. What is the probability that the sum of the dice is 7?',
    options: ['1/6 (or 6/36)', '1/12', '7/36', '5/36'],
    correctAnswer: '1/6 (or 6/36)',
    correctIndex: 0,
    explanation: 'Favorable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36. 6/36 = 1/6.'
  },
  {
    id: 'q_prob_op_2',
    topicId: 'topic_probability_statistics',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'In how many different orders can 5 distinct books be arranged on a shelf?',
    options: ['120', '60', '24', '720'],
    correctAnswer: '120',
    correctIndex: 0,
    explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120.'
  },
  {
    id: 'q_prob_op_3',
    topicId: 'topic_probability_statistics',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'If a random variable X has mean E[X] = 4 and E[X²] = 25, what is its variance?',
    latexPrompt: '\\operatorname{Var}(X) = E[X^2] - (E[X])^2',
    options: ['9', '21', '3', '16'],
    correctAnswer: '9',
    correctIndex: 0,
    explanation: 'Var(X) = E[X²] - (E[X])² = 25 - 4² = 25 - 16 = 9.'
  },

  // ─── 9. OLYMPIAD & NUMBER THEORY ───
  {
    id: 'q_oly_op_1',
    topicId: 'topic_olympiad_number_theory',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'According to Fermat\'s Little Theorem, what is 2^{12} modulo 13?',
    latexPrompt: '2^{13-1} \\pmod{13}',
    options: ['1', '2', '12', '0'],
    correctAnswer: '1',
    correctIndex: 0,
    explanation: 'Since 13 is prime and gcd(2, 13) = 1, a^(p-1) = 2^12 = 1 (mod 13).'
  },
  {
    id: 'q_oly_op_2',
    topicId: 'topic_olympiad_number_theory',
    difficulty: 'EXPERT',
    type: 'multiple_choice',
    prompt: 'A polyhedron has 8 faces and 12 vertices. How many edges must it have according to Euler\'s formula?',
    latexPrompt: 'V - E + F = 2',
    options: ['18', '20', '16', '14'],
    correctAnswer: '18',
    correctIndex: 0,
    explanation: 'V - E + F = 2 => 12 - E + 8 = 2 => 20 - E = 2 => E = 18.'
  },
  {
    id: 'q_oly_op_3',
    topicId: 'topic_olympiad_number_theory',
    difficulty: 'EXPERT',
    type: 'multiple_choice',
    prompt: 'By the AM-GM inequality, if x, y, z are positive reals such that xyz = 8, what is the minimum value of x + y + z?',
    latexPrompt: '\\frac{x + y + z}{3} \\ge \\sqrt[3]{xyz}',
    options: ['6', '8', '3', '4'],
    correctAnswer: '6',
    correctIndex: 0,
    explanation: '(x + y + z) / 3 >= cbrt(8) = 2 => x + y + z >= 6, with equality at x = y = z = 2.'
  }
];
