import { FormulaItem } from '../../types/formulas';

export const advancedMathFormulas: FormulaItem[] = [
  // ─── LINEAR ALGEBRA & VECTORS ───
  {
    id: 'adv_matrix_operations_inverse',
    name: 'Matrix Operations, Determinants & Inverse Matrix',
    subject: 'advanced_math',
    category: 'Linear Algebra',
    topic: 'Matrices & Determinants',
    difficulty: 'Intermediate',
    latex: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc, \\quad A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}, \\quad \\det(AB) = \\det(A)\\det(B)',
    variables: [
      { symbol: 'A, B', name: 'Matrices', meaning: 'Square matrices of identical order' },
      { symbol: '\\det(A)', name: 'Determinant', meaning: 'Scalar measure of volume scaling and invertibility' },
      { symbol: 'A^{-1}', name: 'Multiplicative Inverse', meaning: 'Matrix satisfying A * A^{-1} = I' }
    ],
    conditions: [
      'A matrix is invertible (non-singular) IF AND ONLY IF \\det(A) \\neq 0',
      'Matrix multiplication is associative A(BC) = (AB)C, but generally NOT commutative (AB != BA)'
    ],
    whenToUse: 'Solving systems of linear equations (Cramer\'s rule), 3D transformations, graphics projections, state space models.',
    workedExample: {
      problem: 'Find the inverse of matrix A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}.',
      steps: [
        { stepNum: 1, instruction: 'Calculate determinant: ad - bc', mathLatex: '\\det A = (4)(6) - (7)(2) = 24 - 14 = 10' },
        { stepNum: 2, instruction: 'Swap main diagonal and negate off-diagonal elements', mathLatex: '\\operatorname{adj}(A) = \\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}' },
        { stepNum: 3, instruction: 'Multiply by 1 / det(A)', mathLatex: 'A^{-1} = \\frac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix} = \\begin{pmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{pmatrix}' }
      ],
      finalAnswer: 'A^-1 = [[0.6, -0.7], [-0.2, 0.4]]',
      finalAnswerLatex: 'A^{-1} = \\frac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}'
    },
    commonMistakes: [
      'Multiplying corresponding elements together instead of dot products of rows and columns when multiplying matrices.',
      'Assuming AB = BA (matrix multiplication is non-commutative).',
      'Forgetting to divide by the determinant when finding the inverse.'
    ],
    relatedFormulaIds: ['adv_vector_operations', 'alg_vieta_formulas'],
    practiceQuestions: [
      {
        id: 'q_adv_1',
        question: 'What is the determinant of [[3, 2], [1, 4]]?',
        options: ['10', '14', '12', '-2'],
        correctIndex: 0,
        explanation: 'det = (3)(4) - (2)(1) = 12 - 2 = 10.'
      }
    ],
    searchKeywords: ['matrix inverse', 'determinant', 'matrix multiplication', 'ad - bc', 'invertible matrix'],
    memoryCard: {
      clozeLatex: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ??? - bc',
      missingPart: 'ad',
      missingOptions: ['ad', 'a+d', 'ab', 'cd'],
      recallPrompt: 'What is the leading product in a 2x2 matrix determinant?',
      identificationPrompt: 'Formula for: 2x2 Matrix Determinant.'
    }
  },
  {
    id: 'adv_vector_operations',
    name: 'Vector Operations (Dot Product & Cross Product)',
    subject: 'advanced_math',
    category: 'Linear Algebra',
    topic: 'Vectors',
    difficulty: 'Intermediate',
    latex: '\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta = u_1 v_1 + u_2 v_2 + u_3 v_3, \\quad \\vec{u} \\times \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\sin\\theta \\, \\hat{n} = \\det\\begin{pmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{pmatrix}',
    variables: [
      { symbol: '\\vec{u}, \\vec{v}', name: 'Vectors', meaning: 'Elements of R^3 with magnitude and direction' },
      { symbol: '\\theta', name: 'Angle between vectors', meaning: 'Angle in [0, pi]' },
      { symbol: '\\hat{n}', name: 'Unit normal vector', meaning: 'Perpendicular to both u and v via right-hand rule' }
    ],
    conditions: [
      'Orthogonal (perpendicular) test: \\vec{u} \\cdot \\vec{v} = 0',
      'Parallel test: \\vec{u} \\times \\vec{v} = \\vec{0}',
      'Cross product is anti-commutative: \\vec{v} \\times \\vec{u} = -(\\vec{u} \\times \\vec{v})'
    ],
    whenToUse: 'Work done by force (W = F . d), torque (tau = r x F), magnetic Lorentz force, surface normal computation.',
    workedExample: {
      problem: 'Find the dot product and cross product of u = (1, 2, 3) and v = (4, 5, 6).',
      steps: [
        { stepNum: 1, instruction: 'Compute dot product: sum of coordinate products', mathLatex: '\\vec{u} \\cdot \\vec{v} = (1)(4) + (2)(5) + (3)(6) = 4 + 10 + 18 = 32' },
        { stepNum: 2, instruction: 'Set up cross product determinant', mathLatex: '\\vec{u} \\times \\vec{v} = \\hat{i}(2\\cdot 6 - 3\\cdot 5) - \\hat{j}(1\\cdot 6 - 3\\cdot 4) + \\hat{k}(1\\cdot 5 - 2\\cdot 4)' },
        { stepNum: 3, instruction: 'Evaluate components', mathLatex: '\\hat{i}(12 - 15) - \\hat{j}(6 - 12) + \\hat{k}(5 - 8) = -3\\hat{i} + 6\\hat{j} - 3\\hat{k} = (-3, 6, -3)' }
      ],
      finalAnswer: 'u . v = 32, u x v = (-3, 6, -3)',
      finalAnswerLatex: '\\vec{u} \\cdot \\vec{v} = 32, \\quad \\vec{u} \\times \\vec{v} = (-3, 6, -3)'
    },
    commonMistakes: [
      'Confusing dot product (which yields a SCALAR) with cross product (which yields a VECTOR).',
      'Forgetting the alternating minus sign on the j-hat component in cross product.'
    ],
    relatedFormulaIds: ['adv_matrix_operations_inverse', 'geom_parallelogram'],
    practiceQuestions: [
      {
        id: 'q_adv_2',
        question: 'If two nonzero vectors have dot product equal to zero, what is the angle between them?',
        options: ['90 degrees (pi/2 rad)', '0 degrees', '180 degrees', '45 degrees'],
        correctIndex: 0,
        explanation: 'u . v = ||u|| ||v|| cos(theta) = 0 => cos(theta) = 0 => theta = 90 degrees (perpendicular).'
      }
    ],
    searchKeywords: ['dot product', 'cross product', 'vector orthogonal', 'torque', 'determinant formula for cross product'],
    memoryCard: {
      clozeLatex: '\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\| \\times ???',
      missingPart: '\\cos\\theta',
      missingOptions: ['\\cos\\theta', '\\sin\\theta', '\\tan\\theta', '1'],
      recallPrompt: 'What trig function relates vector magnitudes to the dot product?',
      identificationPrompt: 'Formula for: Geometric Dot Product.'
    }
  },

  // ─── PROBABILITY & STATISTICS ───
  {
    id: 'adv_probability_bayes',
    name: "Probability Rules, Conditional Probability & Bayes' Theorem",
    subject: 'advanced_math',
    category: 'Probability & Statistics',
    topic: 'Probability Theory',
    difficulty: 'Intermediate',
    latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(A|B) = \\frac{P(B|A)P(A)}{P(B)} = \\frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|A^c)P(A^c)}',
    variables: [
      { symbol: 'P(A), P(B)', name: 'Prior probabilities', meaning: 'Probabilities of events A and B' },
      { symbol: 'P(A|B)', name: 'Posterior probability', meaning: 'Probability of A given that event B has occurred' },
      { symbol: 'P(B|A)', name: 'Likelihood', meaning: 'Probability of observing evidence B given hypothesis A' }
    ],
    conditions: [
      'P(B) > 0',
      'For independent events: P(A \\cap B) = P(A) \\cdot P(B) \\implies P(A|B) = P(A)'
    ],
    whenToUse: 'Medical diagnostic testing (false positives), spam filters, machine learning classification, risk analysis.',
    workedExample: {
      problem: 'A disease affects 1% of a population (P(D) = 0.01). A test is 95% accurate (P(+|D) = 0.95) with a 5% false positive rate (P(+|D^c) = 0.05). If a person tests positive, what is the probability they actually have the disease?',
      steps: [
        { stepNum: 1, instruction: 'Calculate total probability of testing positive P(+)', mathLatex: 'P(+) = P(+|D)P(D) + P(+|D^c)P(D^c) = (0.95)(0.01) + (0.05)(0.99) = 0.0095 + 0.0495 = 0.059' },
        { stepNum: 2, instruction: 'Apply Bayes\' Theorem: P(D|+) = P(+|D)P(D) / P(+)', mathLatex: 'P(D|+) = \\frac{0.0095}{0.059} \\approx 0.161 = 16.1\\%' }
      ],
      finalAnswer: '16.1% (base rate fallacy: despite 95% test accuracy, rare diseases yield mostly false positives)',
      finalAnswerLatex: 'P(D|+) \\approx 16.1\\%'
    },
    commonMistakes: [
      'The Base Rate Fallacy: confusing P(A|B) with P(B|A). Testing positive is NOT a 95% chance of being sick!',
      'Forgetting to subtract P(A and B) in the union rule P(A or B).'
    ],
    relatedFormulaIds: ['adv_permutations_combinations', 'adv_expected_value_variance'],
    practiceQuestions: [
      {
        id: 'q_adv_3',
        question: 'If P(A) = 0.4, P(B) = 0.5, and A and B are independent, what is P(A and B)?',
        options: ['0.20', '0.90', '0.10', '0.50'],
        correctIndex: 0,
        explanation: 'For independent events: P(A and B) = P(A) * P(B) = 0.4 * 0.5 = 0.20.'
      }
    ],
    searchKeywords: ['Bayes theorem', 'conditional probability', 'base rate fallacy', 'independent events', 'probability union'],
    memoryCard: {
      clozeLatex: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{???}',
      missingPart: 'P(B)',
      missingOptions: ['P(B)', 'P(A)', 'P(A \\cap B)', '1'],
      recallPrompt: 'What is the denominator in the standard form of Bayes\' Theorem?',
      identificationPrompt: "Formula for: Bayes' Theorem."
    }
  },
  {
    id: 'adv_permutations_combinations',
    name: 'Permutations, Combinations & Binomial Probability',
    subject: 'advanced_math',
    category: 'Combinatorics',
    topic: 'Counting & Distributions',
    difficulty: 'Intermediate',
    latex: 'P(n, r) = \\frac{n!}{(n-r)!}, \\quad \\binom{n}{r} = C(n, r) = \\frac{n!}{r!(n-r)!}, \\quad P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
    variables: [
      { symbol: 'n', name: 'Total items / Trials', meaning: 'Size of the pool or number of independent trials' },
      { symbol: 'r, k', name: 'Selected items / Successes', meaning: 'Number of items chosen or successes observed' },
      { symbol: 'p', name: 'Probability of success', meaning: 'Single trial success rate' }
    ],
    conditions: [
      '0 <= r <= n, 0 <= p <= 1',
      'Permutations: ORDER MATTERS (e.g. race podium, passwords)',
      'Combinations: ORDER DOES NOT MATTER (e.g. lottery numbers, committees)'
    ],
    whenToUse: 'Lottery odds, genetics allele combinations, poker hand rankings, coin flip probability.',
    workedExample: {
      problem: 'A fair coin is flipped 5 times. What is the probability of getting exactly 3 heads?',
      steps: [
        { stepNum: 1, instruction: 'Identify parameters: n = 5, k = 3, p = 0.5', mathLatex: 'n = 5, \\quad k = 3, \\quad p = 0.5, \\quad 1 - p = 0.5' },
        { stepNum: 2, instruction: 'Calculate binomial coefficient binom(5, 3)', mathLatex: '\\binom{5}{3} = \\frac{5!}{3!2!} = \\frac{120}{6 \\times 2} = 10' },
        { stepNum: 3, instruction: 'Compute binomial probability', mathLatex: 'P(X = 3) = 10 \\cdot (0.5)^3 \\cdot (0.5)^2 = 10 \\cdot (0.5)^5 = \\frac{10}{32} = \\frac{5}{16} = 0.3125' }
      ],
      finalAnswer: '5/16 (31.25%)',
      finalAnswerLatex: 'P(X = 3) = \\frac{5}{16} = 31.25\\%'
    },
    commonMistakes: [
      'Using permutations when combinations are required (e.g. a committee of 3 has no ranking, so order does not matter).',
      'Forgetting that 0! = 1.'
    ],
    relatedFormulaIds: ['alg_binomial_theorem', 'adv_expected_value_variance'],
    practiceQuestions: [
      {
        id: 'q_adv_4',
        question: 'How many ways can a team of 3 be chosen from 7 people?',
        options: ['35', '210', '21', '42'],
        correctIndex: 0,
        explanation: 'C(7, 3) = (7 * 6 * 5) / (3 * 2 * 1) = 35.'
      }
    ],
    searchKeywords: ['combinations', 'permutations', 'binomial probability', 'n choose k', 'factorial'],
    memoryCard: {
      clozeLatex: '\\binom{n}{r} = \\frac{n!}{r! \\times ???}',
      missingPart: '(n - r)!',
      missingOptions: ['(n - r)!', 'n!', '(n + r)!', 'r!'],
      recallPrompt: 'What factorial term is multiplied by r! in the denominator of n choose r?',
      identificationPrompt: 'Formula for: Combinations (n Choose r).'
    }
  },
  {
    id: 'adv_expected_value_variance',
    name: 'Expected Value, Variance & Standard Deviation',
    subject: 'advanced_math',
    category: 'Probability & Statistics',
    topic: 'Random Variables',
    difficulty: 'Intermediate',
    latex: 'E[X] = \\mu = \\sum x_i P(x_i), \\quad \\operatorname{Var}(X) = \\sigma^2 = E[X^2] - (E[X])^2, \\quad \\sigma = \\sqrt{\\operatorname{Var}(X)}',
    variables: [
      { symbol: 'E[X], \\mu', name: 'Expected value / Mean', meaning: 'Long-term theoretical average' },
      { symbol: '\\operatorname{Var}(X), \\sigma^2', name: 'Variance', meaning: 'Expected squared deviation from mean' },
      { symbol: '\\sigma', name: 'Standard deviation', meaning: 'Square root of variance in native units' }
    ],
    conditions: [
      'Sum of all probabilities sum P(x_i) = 1',
      'For Binomial distribution: \\mu = np, \\sigma^2 = np(1-p)',
      'Linearity of Expectation: E[aX + b] = a E[X] + b; Variance property: Var(aX + b) = a^2 Var(X)'
    ],
    whenToUse: 'Casino games expected payout, portfolio financial risk, quality control variance.',
    workedExample: {
      problem: 'A game pays $10 with probability 0.2 and $0 with probability 0.8. Find the expected payout and variance.',
      steps: [
        { stepNum: 1, instruction: 'Calculate expected value E[X]', mathLatex: 'E[X] = 10(0.2) + 0(0.8) = 2' },
        { stepNum: 2, instruction: 'Calculate E[X^2]', mathLatex: 'E[X^2] = 10^2(0.2) + 0^2(0.8) = 100(0.2) = 20' },
        { stepNum: 3, instruction: 'Calculate variance Var(X) = E[X^2] - (E[X])^2', mathLatex: '\\operatorname{Var}(X) = 20 - (2)^2 = 20 - 4 = 16 \\implies \\sigma = \\sqrt{16} = 4' }
      ],
      finalAnswer: 'E[X] = $2, Variance = 16, Std Dev = $4',
      finalAnswerLatex: 'E[X] = 2, \\quad \\operatorname{Var}(X) = 16, \\quad \\sigma = 4'
    },
    commonMistakes: [
      'Forgetting to square the expected value in E[X^2] - (E[X])^2.',
      'Assuming Var(aX) = a * Var(X) instead of a^2 * Var(X).'
    ],
    relatedFormulaIds: ['adv_probability_bayes', 'arith_average_weighted'],
    practiceQuestions: [
      {
        id: 'q_adv_5',
        question: 'If a random variable has variance 49, what is its standard deviation?',
        options: ['7', '2401', '14', '49'],
        correctIndex: 0,
        explanation: 'sigma = sqrt(Var) = sqrt(49) = 7.'
      }
    ],
    searchKeywords: ['expected value', 'variance', 'standard deviation', 'E[X^2] - (E[X])^2', 'mean'],
    memoryCard: {
      clozeLatex: '\\operatorname{Var}(X) = E[X^2] - (???)^2',
      missingPart: 'E[X]',
      missingOptions: ['E[X]', 'X', '\\sigma', 'E[X^2]'],
      recallPrompt: 'What squared expectation is subtracted from E[X^2] to compute variance?',
      identificationPrompt: 'Formula for: Shortcut Formula for Variance.'
    }
  },

  // ─── ANALYSIS & CALCULUS ───
  {
    id: 'adv_complex_numbers_euler',
    name: "Euler's Formula & Polar Coordinates",
    subject: 'advanced_math',
    category: 'Analysis',
    topic: 'Complex Analysis & Polar',
    difficulty: 'Advanced',
    latex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta, \\quad e^{i\\pi} + 1 = 0, \\quad x = r\\cos\\theta, \\; y = r\\sin\\theta, \\quad A_{\\text{polar}} = \\frac{1}{2}\\int_\\alpha^\\beta r^2 \\, d\\theta',
    variables: [
      { symbol: 'e^{i\\theta}', name: 'Complex exponential', meaning: 'Unit circle rotation in the complex plane' },
      { symbol: 'r, \\theta', name: 'Polar coordinates', meaning: 'Radial distance r and polar angle theta' },
      { symbol: 'A_{\\text{polar}}', name: 'Polar area', meaning: 'Area swept out by radius vector r(theta)' }
    ],
    conditions: [
      'Euler\'s Identity e^{i pi} + 1 = 0 connects the 5 most fundamental constants: e, i, pi, 1, 0'
    ],
    whenToUse: 'AC electrical impedance, signal processing (FFT), quantum physics wavefunctions, polar curves (cardioids, roses).',
    workedExample: {
      problem: 'Find the area enclosed by the circle r = 2\\cos\\theta for -\\pi/2 \\le \\theta \\le \\pi/2.',
      steps: [
        { stepNum: 1, instruction: 'Use polar area formula A = (1/2) int r^2 d theta', mathLatex: 'A = \\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2} (2\\cos\\theta)^2 \\, d\\theta = 2\\int_{-\\pi/2}^{\\pi/2} \\cos^2\\theta \\, d\\theta' },
        { stepNum: 2, instruction: 'Use power reduction cos^2 theta = (1 + cos 2theta)/2', mathLatex: 'A = 2 \\int_{-\\pi/2}^{\\pi/2} \\frac{1 + \\cos 2\\theta}{2} \\, d\\theta = \\left[ \\theta + \\frac{\\sin 2\\theta}{2} \\right]_{-\\pi/2}^{\\pi/2}' },
        { stepNum: 3, instruction: 'Evaluate bounds', mathLatex: '\\left( \\frac{\\pi}{2} + 0 \\right) - \\left( -\\frac{\\pi}{2} + 0 \\right) = \\pi' }
      ],
      finalAnswer: 'pi',
      finalAnswerLatex: '\\pi'
    },
    commonMistakes: [
      'Forgetting the 1/2 factor in the polar area formula: (1/2) int r^2 d theta.',
      'Integrating over an incorrect interval (sweeping through the curve twice).'
    ],
    relatedFormulaIds: ['alg_complex_numbers', 'integ_applications_area_volume'],
    practiceQuestions: [
      {
        id: 'q_adv_6',
        question: 'What is e^(i * pi / 2)?',
        options: ['i', '-1', '1', '-i'],
        correctIndex: 0,
        explanation: 'e^(i * pi/2) = cos(pi/2) + i sin(pi/2) = 0 + i(1) = i.'
      }
    ],
    searchKeywords: ['Eulers formula', 'Eulers identity', 'polar coordinates', 'polar area', 'complex exponential'],
    memoryCard: {
      clozeLatex: 'e^{i\\theta} = \\cos\\theta + i \\times ???',
      missingPart: '\\sin\\theta',
      missingOptions: ['\\sin\\theta', '\\cos\\theta', '-\\sin\\theta', '1'],
      recallPrompt: 'What trig function multiplies imaginary unit i in Euler\'s formula?',
      identificationPrompt: "Formula for: Euler's Formula."
    }
  },
  {
    id: 'adv_infinite_series_tests',
    name: 'Infinite Series Convergence Tests (Ratio, Root, Alternating & Integral)',
    subject: 'advanced_math',
    category: 'Analysis',
    topic: 'Series Convergence',
    difficulty: 'Advanced',
    latex: '\\text{Ratio: } L = \\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right| < 1 \\implies \\text{Conv}, \\quad \\text{Root: } L = \\lim_{n\\to\\infty}\\sqrt[n]{|a_n|} < 1 \\implies \\text{Conv}, \\quad \\text{AST: } a_{n+1} \\le a_n, \\lim a_n = 0 \\implies \\text{Conv}',
    variables: [
      { symbol: 'a_n', name: 'Series terms', meaning: 'Terms of infinite series sum_{n=1}^inf a_n' },
      { symbol: 'L', name: 'Limit value', meaning: 'L < 1: absolutely converges; L > 1: diverges; L = 1: inconclusive' }
    ],
    conditions: [
      'If L = 1 for Ratio or Root Test, the test is completely INCONCLUSIVE (must use Comparison, Integral, or p-series test)',
      'p-series \\sum \\frac{1}{n^p} converges if and only if p > 1 (diverges for p <= 1, including Harmonic series p = 1)'
    ],
    whenToUse: 'Determining the radius and interval of convergence of power series, perturbation series.',
    workedExample: {
      problem: 'Determine whether \\sum_{n=1}^\\infty \\frac{n}{2^n} converges using the Ratio Test.',
      steps: [
        { stepNum: 1, instruction: 'Form the ratio |a_{n+1} / a_n|', mathLatex: '\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{n+1}{2^{n+1}} \\cdot \\frac{2^n}{n} = \\frac{n+1}{2n}' },
        { stepNum: 2, instruction: 'Take limit as n -> infinity', mathLatex: 'L = \\lim_{n\\to\\infty} \\frac{n+1}{2n} = \\frac{1}{2}' },
        { stepNum: 3, instruction: 'Compare L to 1', mathLatex: 'L = \\frac{1}{2} < 1 \\implies \\text{Series converges absolutely}' }
      ],
      finalAnswer: 'Converges absolutely (L = 1/2 < 1)',
      finalAnswerLatex: 'L = \\frac{1}{2} < 1 \\implies \\text{Converges}'
    },
    commonMistakes: [
      'Concluding convergence or divergence when L = 1 (Ratio Test fails for all p-series: L = 1).',
      'Forgetting absolute values in the ratio test.'
    ],
    relatedFormulaIds: ['adv_taylor_series', 'alg_geometric_series'],
    practiceQuestions: [
      {
        id: 'q_adv_7',
        question: 'Does the harmonic series sum_{n=1}^inf 1/n converge or diverge?',
        options: ['Diverges (p-series with p = 1)', 'Converges to 1', 'Converges to ln 2', 'Converges to 0'],
        correctIndex: 0,
        explanation: 'The harmonic series is a p-series with p = 1, which diverges to infinity.'
      }
    ],
    searchKeywords: ['ratio test', 'root test', 'alternating series test', 'p-series', 'harmonic series', 'convergence tests'],
    memoryCard: {
      clozeLatex: '\\text{Ratio Test converges when } L = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right| ??? 1',
      missingPart: '<',
      missingOptions: ['<', '>', '=', '\\le'],
      recallPrompt: 'What inequality condition on limit L guarantees absolute convergence in the Ratio Test?',
      identificationPrompt: 'Formula for: Ratio Test Convergence Condition.'
    }
  },
  {
    id: 'adv_taylor_series',
    name: 'Taylor and Maclaurin Series',
    subject: 'advanced_math',
    category: 'Analysis',
    topic: 'Power Series',
    difficulty: 'Advanced',
    latex: 'f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x - a)^n, \\quad e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}, \\quad \\sin x = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}, \\quad \\cos x = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}',
    variables: [
      { symbol: 'a', name: 'Expansion center', meaning: 'If a = 0, the series is specifically called a Maclaurin series' },
      { symbol: 'f^{(n)}(a)', name: 'nth derivative evaluated at center', meaning: 'Coefficients matching curvature at a' },
      { symbol: 'n!', name: 'Factorial', meaning: 'Factorial normalizer' }
    ],
    conditions: [
      'f must be infinitely differentiable at x = a',
      'e^x, sin x, cos x series converge for ALL real x (radius of convergence R = infinity)',
      'Geometric power series 1/(1-x) = \\sum x^n converges only for |x| < 1'
    ],
    whenToUse: 'Approximating non-linear functions in physics, computing irrational constants, evaluating unsolvable integrals like int e^{-x^2} dx.',
    workedExample: {
      problem: 'Write the first three non-zero terms of the Maclaurin series for \\cos(x).',
      steps: [
        { stepNum: 1, instruction: 'Evaluate derivatives of cos(x) at x = 0', mathLatex: 'f(0) = 1, \\quad f\'(0) = 0, \\quad f\'\'(0) = -1, \\quad f^{(3)}(0) = 0, \\quad f^{(4)}(0) = 1' },
        { stepNum: 2, instruction: 'Assemble Maclaurin series using even powers', mathLatex: '\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots' },
        { stepNum: 3, instruction: 'Simplify factorials', mathLatex: '1 - \\frac{x^2}{2} + \\frac{x^4}{24}' }
      ],
      finalAnswer: '1 - x^2/2 + x^4/24',
      finalAnswerLatex: '1 - \\frac{x^2}{2} + \\frac{x^4}{24}'
    },
    commonMistakes: [
      'Forgetting the factorial in the denominator n!.',
      'Mixing up odd powers (sine) with even powers (cosine).'
    ],
    relatedFormulaIds: ['diff_linear_approximation_differentials', 'adv_infinite_series_tests'],
    practiceQuestions: [
      {
        id: 'q_adv_8',
        question: 'What is the coefficient of x^3 in the Maclaurin series for sin(x)?',
        options: ['-1/6', '1/6', '-1/3', '0'],
        correctIndex: 0,
        explanation: 'The x^3 term is -x^3 / 3! = -x^3 / 6, so coefficient is -1/6.'
      }
    ],
    searchKeywords: ['Taylor series', 'Maclaurin series', 'power series', 'expansion of e^x', 'expansion of sin x'],
    memoryCard: {
      clozeLatex: 'f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{???}(x - a)^n',
      missingPart: 'n!',
      missingOptions: ['n!', 'n', '2n', 'n^2'],
      recallPrompt: 'What factorial term divides the nth derivative in a Taylor series?',
      identificationPrompt: 'Formula for: Taylor Series Expansion.'
    }
  },
  {
    id: 'adv_differential_equations',
    name: 'First-Order Differential Equations (Separable & Integrating Factor)',
    subject: 'advanced_math',
    category: 'Differential Equations',
    topic: 'ODEs',
    difficulty: 'Advanced',
    latex: '\\text{Separable: } \\frac{dy}{dx} = g(x)h(y) \\implies \\int \\frac{1}{h(y)}dy = \\int g(x)dx, \\quad \\text{Linear 1st Order: } \\frac{dy}{dx} + P(x)y = Q(x) \\implies y = \\frac{1}{I(x)}\\int I(x)Q(x)\\,dx, \\quad I(x) = e^{\\int P(x)\\,dx}',
    variables: [
      { symbol: 'I(x)', name: 'Integrating Factor', meaning: 'Exponential multiplier converting left-hand side into product rule derivative' },
      { symbol: 'P(x), Q(x)', name: 'Continuous coefficient functions', meaning: 'Functions defining standard 1st order linear ODE' }
    ],
    conditions: [
      'For linear 1st order, equation MUST be placed in standard form y\' + P(x)y = Q(x) with leading coefficient 1 before calculating I(x)',
      'h(y) \\neq 0 for separation (check for equilibrium/singular solutions where h(y) = 0)'
    ],
    whenToUse: 'Newton\'s law of cooling, RL/RC circuits, population dynamics (logistic growth), chemical reaction kinetics.',
    workedExample: {
      problem: 'Solve the differential equation \\frac{dy}{dx} + 2y = 4.',
      steps: [
        { stepNum: 1, instruction: 'Identify P(x) = 2 and Q(x) = 4', mathLatex: 'P(x) = 2, \\quad Q(x) = 4' },
        { stepNum: 2, instruction: 'Find integrating factor I(x) = e^{int P(x) dx}', mathLatex: 'I(x) = e^{\\int 2\\,dx} = e^{2x}' },
        { stepNum: 3, instruction: 'Multiply equation by I(x): d/dx [y * e^{2x}] = 4 e^{2x}', mathLatex: '\\frac{d}{dx}[y e^{2x}] = 4e^{2x}' },
        { stepNum: 4, instruction: 'Integrate both sides and solve for y', mathLatex: 'y e^{2x} = \\int 4e^{2x}\\,dx = 2e^{2x} + C \\implies y = 2 + C e^{-2x}' }
      ],
      finalAnswer: 'y = 2 + C e^{-2x}',
      finalAnswerLatex: 'y = 2 + C e^{-2x}'
    },
    commonMistakes: [
      'Calculating the integrating factor before dividing out a non-one coefficient on dy/dx.',
      'Forgetting the constant of integration C before dividing by I(x) (it multiplies e^{-int P dx}!).'
    ],
    relatedFormulaIds: ['diff_exponential', 'integ_logarithmic_exponential'],
    practiceQuestions: [
      {
        id: 'q_adv_9',
        question: 'What is the integrating factor I(x) for y\' + (3/x) y = x^2?',
        options: ['x^3', '3x', 'e^(3x)', 'x'],
        correctIndex: 0,
        explanation: 'I(x) = e^(int 3/x dx) = e^(3 ln x) = e^(ln x^3) = x^3.'
      }
    ],
    searchKeywords: ['differential equations', 'separable ODE', 'integrating factor', 'first order linear', 'I(x) = e^int P'],
    memoryCard: {
      clozeLatex: 'I(x) = e^{\\int ??? \\, dx} \\quad (\\text{Integrating Factor})',
      missingPart: 'P(x)',
      missingOptions: ['P(x)', 'Q(x)', 'y', 'P(x)Q(x)'],
      recallPrompt: 'What function is integrated in the exponent of the integrating factor I(x)?',
      identificationPrompt: 'Formula for: Integrating Factor for Linear 1st Order ODE.'
    }
  }
];
