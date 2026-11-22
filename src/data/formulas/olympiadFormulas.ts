import { FormulaItem } from '../../types/formulas';

export const olympiadFormulas: FormulaItem[] = [
  // ─── INEQUALITIES ───
  {
    id: 'olympiad_am_gm',
    name: 'AM-GM Inequality (Arithmetic Mean - Geometric Mean)',
    subject: 'olympiad',
    category: 'Inequalities',
    topic: 'Classical Inequalities',
    difficulty: 'Expert',
    latex: '\\frac{x_1 + x_2 + \\dots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\dots x_n}, \\quad \\text{Equality holds } \\iff x_1 = x_2 = \\dots = x_n',
    variables: [
      { symbol: 'x_1, \\dots, x_n', name: 'Non-negative real numbers', meaning: 'x_i >= 0' },
      { symbol: 'n', name: 'Number of terms', meaning: 'Positive integer' }
    ],
    conditions: [
      'ALL variables x_i MUST be strictly non-negative (x_i >= 0)',
      'Equality condition: holds if and only if all variables are equal: x_1 = x_2 = ... = x_n',
      'Weighted AM-GM: w_1 x_1 + ... + w_n x_n >= x_1^{w_1} ... x_n^{w_n} for weights w_i >= 0 with sum w_i = 1'
    ],
    whenToUse: 'Olympiad algebra, finding maximum products given fixed sums, minimum sums given fixed products, and bounding multivariable polynomials.',
    derivation: 'For n = 2: (sqrt(a) - sqrt(b))^2 >= 0 => a - 2 sqrt(ab) + b >= 0 => (a + b)/2 >= sqrt(ab). General case proven by Cauchy using forward-backward induction.',
    workedExample: {
      problem: 'Find the minimum value of f(x) = x + \\frac{9}{x} for x > 0.',
      steps: [
        { stepNum: 1, instruction: 'Apply AM-GM to the two positive terms x and 9/x', mathLatex: '\\frac{x + \\frac{9}{x}}{2} \\ge \\sqrt{x \\cdot \\frac{9}{x}}' },
        { stepNum: 2, instruction: 'Simplify the geometric mean: x cancels out', mathLatex: '\\sqrt{x \\cdot \\frac{9}{x}} = \\sqrt{9} = 3' },
        { stepNum: 3, instruction: 'Multiply by 2 and check equality', mathLatex: 'x + \\frac{9}{x} \\ge 2(3) = 6. \\quad \\text{Equality holds when } x = 9/x \\implies x^2 = 9 \\implies x = 3' }
      ],
      finalAnswer: 'Minimum value = 6 at x = 3',
      finalAnswerLatex: '\\min\\left(x + \\frac{9}{x}\\right) = 6'
    },
    commonMistakes: [
      'Applying AM-GM to negative terms (it is INVALID if any term is negative).',
      'Failing to verify that equality can actually be achieved by the variables within the problem domain.'
    ],
    relatedFormulaIds: ['olympiad_cauchy_schwarz', 'olympiad_jensen_inequality'],
    practiceQuestions: [
      {
        id: 'q_oly_1',
        question: 'If a, b, c > 0 and abc = 1, what is the minimum value of a + b + c?',
        options: ['3', '1', '3 * sqrt(3)', '6'],
        correctIndex: 0,
        explanation: '(a + b + c)/3 >= cbrt(abc) = cbrt(1) = 1 => a + b + c >= 3, with equality at a = b = c = 1.'
      }
    ],
    searchKeywords: ['AM-GM inequality', 'arithmetic geometric mean', 'Olympiad inequality', 'Cauchy induction'],
    memoryCard: {
      clozeLatex: '\\frac{x_1 + \\dots + x_n}{n} \\ge \\sqrt[n]{???}',
      missingPart: 'x_1 x_2 \\dots x_n',
      missingOptions: ['x_1 x_2 \\dots x_n', 'x_1 + \\dots + x_n', 'n', 'x_1^n'],
      recallPrompt: 'What product is inside the nth root of the AM-GM inequality?',
      identificationPrompt: 'Formula for: AM-GM Inequality.'
    }
  },
  {
    id: 'olympiad_cauchy_schwarz',
    name: 'Cauchy-Schwarz Inequality & Titu’s Lemma (Engel Form)',
    subject: 'olympiad',
    category: 'Inequalities',
    topic: 'Classical Inequalities',
    difficulty: 'Expert',
    latex: '\\left(\\sum_{i=1}^n a_i^2\\right)\\left(\\sum_{i=1}^n b_i^2\\right) \\ge \\left(\\sum_{i=1}^n a_i b_i\\right)^2, \\quad \\text{Engel\'s Form: } \\sum_{i=1}^n \\frac{a_i^2}{b_i} \\ge \\frac{\\left(\\sum a_i\\right)^2}{\\sum b_i}',
    variables: [
      { symbol: 'a_i, b_i', name: 'Real sequences', meaning: 'Any real numbers (b_i > 0 for Engel form)' }
    ],
    conditions: [
      'Equality holds if and only if sequences are directly proportional: a_i / b_i = c for all i',
      'For Engel form (Titu\'s Lemma), denominators b_i must be strictly positive (b_i > 0)'
    ],
    whenToUse: 'The #1 most frequently used inequality in USAMO/IMO: homogenizing fractional sums, bounding inner products, and minimizing quadratic forms.',
    workedExample: {
      problem: 'For positive reals a, b, c with a + b + c = 1, prove that \\frac{a^2}{b} + \\frac{b^2}{c} + \\frac{c^2}{a} \\ge 1.',
      steps: [
        { stepNum: 1, instruction: 'Apply Titu\'s Lemma directly to the sum of squares over denominators', mathLatex: '\\frac{a^2}{b} + \\frac{b^2}{c} + \\frac{c^2}{a} \\ge \\frac{(a + b + c)^2}{b + c + a}' },
        { stepNum: 2, instruction: 'Substitute the given constraint a + b + c = 1', mathLatex: '\\frac{(1)^2}{1} = 1' },
        { stepNum: 3, instruction: 'Verify equality case', mathLatex: '\\text{Equality holds when } a/b = b/c = c/a \\implies a = b = c = 1/3' }
      ],
      finalAnswer: 'Proved >= 1 with equality at a = b = c = 1/3',
      finalAnswerLatex: '\\sum_{\\text{cyc}} \\frac{a^2}{b} \\ge 1'
    },
    commonMistakes: [
      'Applying Titu\'s lemma when denominators are negative.',
      'Assuming equality holds at points where proportionality fails.'
    ],
    relatedFormulaIds: ['olympiad_am_gm', 'olympiad_rearrangement_chebyshev'],
    practiceQuestions: [
      {
        id: 'q_oly_2',
        question: 'Under what condition does equality hold in Cauchy-Schwarz (sum a_i^2)(sum b_i^2) >= (sum a_i b_i)^2?',
        options: ['a_i and b_i are proportional (a_i = k * b_i)', 'a_i = b_i for all i', 'sum a_i = sum b_i', 'a_i b_i = 1'],
        correctIndex: 0,
        explanation: 'Equality holds iff the vectors (a_1,...,a_n) and (b_1,...,b_n) are collinear/linearly dependent.'
      }
    ],
    searchKeywords: ['Cauchy-Schwarz inequality', 'Titus lemma', 'Engel form', 'Olympiad algebra', 'Sedrakyan inequality'],
    memoryCard: {
      clozeLatex: '\\sum \\frac{a_i^2}{b_i} \\ge \\frac{(\\sum a_i)^2}{???} \\quad (\\text{Titu\'s Lemma})',
      missingPart: '\\sum b_i',
      missingOptions: ['\\sum b_i', 'n', '\\prod b_i', '1'],
      recallPrompt: 'What is the denominator on the right side of Titu\'s Lemma / Engel Form?',
      identificationPrompt: "Formula for: Titu's Lemma (Engel Form of Cauchy-Schwarz)."
    }
  },
  {
    id: 'olympiad_rearrangement_chebyshev',
    name: 'Rearrangement and Chebyshev’s Inequalities',
    subject: 'olympiad',
    category: 'Inequalities',
    topic: 'Ordered Sequences',
    difficulty: 'Expert',
    latex: '\\text{Rearrangement: } a_1 b_n + \\dots + a_n b_1 \\le \\sum_{i=1}^n a_i b_{\\sigma(i)} \\le a_1 b_1 + \\dots + a_n b_n, \\quad \\text{Chebyshev: } \\frac{1}{n}\\sum a_i b_i \\ge \\left(\\frac{1}{n}\\sum a_i\\right)\\left(\\frac{1}{n}\\sum b_i\\right)',
    variables: [
      { symbol: 'a_1 \\le \\dots \\le a_n, b_1 \\le \\dots \\le b_n', name: 'Similarly sorted sequences', meaning: 'Sequences ordered in the same direction' },
      { symbol: '\\sigma', name: 'Permutation', meaning: 'Any rearrangement of {1, ..., n}' }
    ],
    conditions: [
      'Sequences must be similarly ordered (both increasing or both decreasing)',
      'The sum of products is MAXIMIZED when similarly sorted, and MINIMIZED when oppositely sorted'
    ],
    whenToUse: 'Symmetric inequality problems where terms can be sorted without loss of generality (WLOG).',
    workedExample: {
      problem: 'Prove that for positive a, b, c: a^3 + b^3 + c^3 >= a^2 b + b^2 c + c^2 a.',
      steps: [
        { stepNum: 1, instruction: 'WLOG assume a >= b >= c. Then a^2 >= b^2 >= c^2', mathLatex: 'a^2 \\ge b^2 \\ge c^2 \\quad \\text{and} \\quad a \\ge b \\ge c' },
        { stepNum: 2, instruction: 'Apply Rearrangement Inequality: matched product >= permuted product', mathLatex: 'a^2(a) + b^2(b) + c^2(c) \\ge a^2(b) + b^2(c) + c^2(a)' },
        { stepNum: 3, instruction: 'Simplify', mathLatex: 'a^3 + b^3 + c^3 \\ge a^2 b + b^2 c + c^2 a' }
      ],
      finalAnswer: 'Proved via Rearrangement Inequality',
      finalAnswerLatex: 'a^3 + b^3 + c^3 \\ge a^2 b + b^2 c + c^2 a'
    },
    commonMistakes: [
      'Assuming sequences are similarly ordered without sorting or proving monotonic alignment.',
      'Applying Chebyshev when sequences are ordered in opposite directions (the inequality reverses).'
    ],
    relatedFormulaIds: ['olympiad_am_gm', 'olympiad_cauchy_schwarz'],
    practiceQuestions: [
      {
        id: 'q_oly_3',
        question: 'When is the dot product of two sets of numbers maximized under rearrangement?',
        options: ['When both sets are sorted in the same order', 'When one set is sorted in reverse', 'When random', 'When all elements are negative'],
        correctIndex: 0,
        explanation: 'By the Rearrangement Inequality, sorting both sequences in the same monotonic order yields the maximum sum.'
      }
    ],
    searchKeywords: ['rearrangement inequality', 'Chebyshev inequality', 'similarly sorted', 'Olympiad algebra'],
    memoryCard: {
      clozeLatex: '\\sum a_i b_{\\text{rev}(i)} \\le \\sum a_i b_{\\sigma(i)} \\le ???',
      missingPart: '\\sum a_i b_i',
      missingOptions: ['\\sum a_i b_i', '(\\sum a_i)(\\sum b_i)', '\\sum a_i^2', '1'],
      recallPrompt: 'What sum achieves the maximum in the Rearrangement Inequality?',
      identificationPrompt: 'Formula for: Rearrangement Inequality Upper Bound.'
    }
  },
  {
    id: 'olympiad_jensen_inequality',
    name: "Jensen's and Bernoulli's Inequalities",
    subject: 'olympiad',
    category: 'Inequalities',
    topic: 'Convexity',
    difficulty: 'Expert',
    latex: 'f\\left(\\frac{\\sum x_i}{n}\\right) \\le \\frac{\\sum f(x_i)}{n} \\; (f \\text{ convex}), \\quad (1 + x)^r \\ge 1 + rx \\; (x > -1, r \\ge 1)',
    variables: [
      { symbol: 'f(x)', name: 'Convex function', meaning: 'Function with f\'\'(x) >= 0 (curves upward)' },
      { symbol: 'x_i', name: 'Domain points', meaning: 'Points in the convex domain' },
      { symbol: 'r', name: 'Real power in Bernoulli', meaning: 'Power r >= 1 (or r <= 0)' }
    ],
    conditions: [
      'f\'\'(x) >= 0 on the interval for convexity (inequality reverses if f is concave: f\'\'(x) <= 0)',
      'For Bernoulli\'s inequality: x > -1, and if r in [0, 1] the inequality reverses: (1+x)^r <= 1+rx'
    ],
    whenToUse: 'Trigonometric Olympiad inequalities (e.g. maximizing sin A + sin B + sin C in a triangle), exponential bounds.',
    workedExample: {
      problem: 'For angles of any triangle A, B, C, find the maximum value of \\sin A + \\sin B + \\sin C.',
      steps: [
        { stepNum: 1, instruction: 'Notice f(x) = sin(x) has f\'\'(x) = -sin(x) < 0 on (0, pi), so it is CONCAVE', mathLatex: 'f\'\'(x) = -\\sin x < 0 \\implies f \\text{ is strictly concave}' },
        { stepNum: 2, instruction: 'Apply Jensen\'s Inequality for concave functions', mathLatex: '\\frac{\\sin A + \\sin B + \\sin C}{3} \\le \\sin\\left(\\frac{A + B + C}{3}\\right)' },
        { stepNum: 3, instruction: 'Since A + B + C = pi, evaluate sin(pi/3)', mathLatex: '\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2} \\implies \\sin A + \\sin B + \\sin C \\le \\frac{3\\sqrt{3}}{2}' }
      ],
      finalAnswer: 'Maximum = 3*sqrt(3)/2 at equilateral triangle (A = B = C = 60 deg)',
      finalAnswerLatex: '\\max(\\sin A + \\sin B + \\sin C) = \\frac{3\\sqrt{3}}{2}'
    },
    commonMistakes: [
      'Applying Jensen without verifying the sign of f\'\'(x) over the entire interval.',
      'Reversing the inequality for convex vs concave functions.'
    ],
    relatedFormulaIds: ['olympiad_am_gm', 'diff_extrema_concavity_mvt'],
    practiceQuestions: [
      {
        id: 'q_oly_4',
        question: 'If f is concave, what direction is Jensen\'s inequality: f(avg x) vs avg f(x)?',
        options: ['f(avg x) >= avg f(x)', 'f(avg x) <= avg f(x)', 'f(avg x) = avg f(x)', 'Depends on n'],
        correctIndex: 0,
        explanation: 'For concave functions (like sin x on (0, pi) or ln x), the function of the average is GREATER than or equal to the average of the function.'
      }
    ],
    searchKeywords: ['Jensens inequality', 'Bernoullis inequality', 'convexity', 'concave function', 'triangle inequality trig'],
    memoryCard: {
      clozeLatex: 'f\\left(\\frac{\\sum x_i}{n}\\right) ??? \\frac{\\sum f(x_i)}{n} \\quad (f \\text{ convex})',
      missingPart: '\\le',
      missingOptions: ['\\le', '\\ge', '=', '>'],
      recallPrompt: 'What inequality sign holds in Jensen\'s Inequality for a convex function?',
      identificationPrompt: "Formula for: Jensen's Inequality (Convex Form)."
    }
  },

  // ─── NUMBER THEORY & COMBINATORICS ───
  {
    id: 'olympiad_flt_euler_totient',
    name: "Fermat's Little Theorem & Euler's Totient Theorem",
    subject: 'olympiad',
    category: 'Number Theory',
    topic: 'Modular Arithmetic',
    difficulty: 'Expert',
    latex: 'a^{p-1} \\equiv 1 \\pmod p \\; (p \\text{ prime}, p \\nmid a), \\quad a^{\\phi(n)} \\equiv 1 \\pmod n \\; (\\gcd(a, n) = 1), \\quad \\phi(n) = n \\prod_{p|n}\\left(1 - \\frac{1}{p}\\right)',
    variables: [
      { symbol: 'p', name: 'Prime number', meaning: 'Any prime in {2, 3, 5, 7, ...}' },
      { symbol: '\\phi(n)', name: "Euler's totient function", meaning: 'Count of positive integers <= n that are coprime to n' }
    ],
    conditions: [
      'For FLT: p must be prime, and gcd(a, p) = 1 (a is not a multiple of p)',
      'For Euler\'s Totient: gcd(a, n) = 1 (coprime)',
      'Wilson\'s Theorem: (p - 1)! \\equiv -1 \\pmod p \\iff p \\text{ is prime}'
    ],
    whenToUse: 'RSA cryptography, reducing large exponents modulo n, finding modular inverses, divisibility proofs.',
    workedExample: {
      problem: 'Find the remainder when 3^{102} is divided by 19.',
      steps: [
        { stepNum: 1, instruction: 'Notice 19 is prime and gcd(3, 19) = 1. Apply Fermat\'s Little Theorem with p = 19', mathLatex: '3^{19 - 1} = 3^{18} \\equiv 1 \\pmod{19}' },
        { stepNum: 2, instruction: 'Divide exponent 102 by 18: 102 = 18 * 5 + 12', mathLatex: '3^{102} = (3^{18})^5 \\cdot 3^{12} \\equiv 1^5 \\cdot 3^{12} \\equiv 3^{12} \\pmod{19}' },
        { stepNum: 3, instruction: 'Compute 3^{12} using repeated squaring', mathLatex: '3^3 = 27 \\equiv 8 \\implies 3^6 \\equiv 8^2 = 64 \\equiv 7 \\implies 3^{12} \\equiv 7^2 = 49 \\equiv 11 \\pmod{19}' }
      ],
      finalAnswer: 'Remainder = 11',
      finalAnswerLatex: '3^{102} \\equiv 11 \\pmod{19}'
    },
    commonMistakes: [
      'Applying FLT when the modulus is not prime (use Euler\'s Totient theorem instead!).',
      'Forgetting the condition gcd(a, n) = 1.'
    ],
    relatedFormulaIds: ['olympiad_crt', 'olympiad_bezout_identity'],
    practiceQuestions: [
      {
        id: 'q_oly_5',
        question: 'What is phi(12), the count of integers up to 12 coprime to 12?',
        options: ['4 (1, 5, 7, 11)', '6', '5', '3'],
        correctIndex: 0,
        explanation: 'phi(12) = 12 * (1 - 1/2) * (1 - 1/3) = 12 * (1/2) * (2/3) = 4.'
      }
    ],
    searchKeywords: ['Fermats Little Theorem', 'Eulers Totient theorem', 'phi function', 'modular exponentiation', 'Wilsons theorem'],
    memoryCard: {
      clozeLatex: 'a^{\\phi(n)} \\equiv ??? \\pmod n \\quad (\\gcd(a,n)=1)',
      missingPart: '1',
      missingOptions: ['1', '0', 'a', '-1'],
      recallPrompt: 'What is the remainder of a^phi(n) modulo n for coprime a and n?',
      identificationPrompt: "Formula for: Euler's Totient Theorem."
    }
  },
  {
    id: 'olympiad_crt',
    name: 'Chinese Remainder Theorem & Bézout’s Identity',
    subject: 'olympiad',
    category: 'Number Theory',
    topic: 'Congruences',
    difficulty: 'Expert',
    latex: 'ax + by = \\gcd(a, b), \\quad \\begin{cases} x \\equiv a_1 \\pmod{m_1} \\\\ x \\equiv a_2 \\pmod{m_2} \\end{cases} \\implies \\text{Unique } x \\pmod{m_1 m_2}',
    variables: [
      { symbol: 'm_1, m_2', name: 'Pairwise coprime moduli', meaning: 'gcd(m_1, m_2) = 1' },
      { symbol: 'x, y', name: 'Bézout coefficients', meaning: 'Integers found via Extended Euclidean Algorithm' }
    ],
    conditions: [
      'The moduli MUST be pairwise coprime: gcd(m_i, m_j) = 1 for all i != j',
      'Solution is unique modulo M = m_1 * m_2 * ... * m_k'
    ],
    whenToUse: 'Solving systems of simultaneous linear congruences, calendar calculations, secret sharing protocols.',
    workedExample: {
      problem: 'Find the smallest positive integer x such that x \\equiv 2 \\pmod 3 and x \\equiv 3 \\pmod 5.',
      steps: [
        { stepNum: 1, instruction: 'Notice gcd(3, 5) = 1. Solution is unique modulo 3 * 5 = 15', mathLatex: 'M = 15' },
        { stepNum: 2, instruction: 'Express x from first congruence: x = 3k + 2', mathLatex: '3k + 2 \\equiv 3 \\pmod 5 \\implies 3k \\equiv 1 \\pmod 5' },
        { stepNum: 3, instruction: 'Multiply by modular inverse of 3 mod 5 (which is 2 since 3*2 = 6 = 1 mod 5)', mathLatex: 'k \\equiv 2(1) \\equiv 2 \\pmod 5 \\implies k = 2' },
        { stepNum: 4, instruction: 'Substitute k = 2 back into x = 3k + 2', mathLatex: 'x = 3(2) + 2 = 8 \\pmod{15}' }
      ],
      finalAnswer: 'x = 8 (check: 8 = 2 mod 3, 8 = 3 mod 5)',
      finalAnswerLatex: 'x = 8 \\pmod{15}'
    },
    commonMistakes: [
      'Applying CRT directly when moduli share common factors (moduli must be factored into prime powers first).',
      'Forgetting that Bézout coefficients can be negative.'
    ],
    relatedFormulaIds: ['olympiad_flt_euler_totient', 'arith_gcd_lcm'],
    practiceQuestions: [
      {
        id: 'q_oly_6',
        question: 'Does the system x = 1 mod 4 and x = 2 mod 6 have a solution?',
        options: ['No, because gcd(4,6) = 2 does not divide 2 - 1 = 1', 'Yes, unique mod 24', 'Yes, unique mod 12', 'Infinitely many without condition'],
        correctIndex: 0,
        explanation: 'For non-coprime moduli, a solution exists iff gcd(m1, m2) divides (a1 - a2). Here gcd(4,6)=2 does not divide 1, so no solution exists.'
      }
    ],
    searchKeywords: ['Chinese Remainder Theorem', 'CRT', 'Bezouts identity', 'extended Euclidean algorithm', 'congruence system'],
    memoryCard: {
      clozeLatex: 'ax + by = ??? \\quad (\\text{Bézout\'s Identity})',
      missingPart: '\\gcd(a, b)',
      missingOptions: ['\\gcd(a, b)', '\\operatorname{lcm}(a, b)', 'ab', '1'],
      recallPrompt: 'What value is represented as the linear combination ax + by in Bézout\'s Identity?',
      identificationPrompt: "Formula for: Bézout's Identity."
    }
  },
  {
    id: 'olympiad_pigeonhole_inclusion_exclusion',
    name: 'Pigeonhole Principle & Inclusion-Exclusion Principle (PIE)',
    subject: 'olympiad',
    category: 'Combinatorics',
    topic: 'Discrete Mathematics',
    difficulty: 'Intermediate',
    latex: '\\left|\\bigcup_{i=1}^n A_i\\right| = \\sum |A_i| - \\sum |A_i \\cap A_j| + \\sum |A_i \\cap A_j \\cap A_k| - \\dots, \\quad \\lceil n/k \\rceil \\; (\\text{PHP})',
    variables: [
      { symbol: 'n', name: 'Pigeons / Objects', meaning: 'Number of items being sorted' },
      { symbol: 'k', name: 'Holes / Categories', meaning: 'Number of containers' },
      { symbol: 'A_i', name: 'Sets', meaning: 'Finite sets in universal domain' }
    ],
    conditions: [
      'Pigeonhole Principle: If n items are placed into k containers, at least one container must hold at least ceil(n/k) items',
      'PIE signs strictly alternate: odd intersections add, even intersections subtract'
    ],
    whenToUse: 'Derangements (!n count), existence proofs in combinatorics and graph theory, counting integers not divisible by a set of primes.',
    workedExample: {
      problem: 'Find the number of integers from 1 to 100 divisible by neither 2, 3, nor 5.',
      steps: [
        { stepNum: 1, instruction: 'Count multiples of 2, 3, 5 up to 100', mathLatex: '|A_2| = 50, \\; |A_3| = 33, \\; |A_5| = 20' },
        { stepNum: 2, instruction: 'Count pairwise intersections', mathLatex: '|A_2 \\cap A_3| = 16, \\; |A_2 \\cap A_5| = 10, \\; |A_3 \\cap A_5| = 6' },
        { stepNum: 3, instruction: 'Count triple intersection', mathLatex: '|A_2 \\cap A_3 \\cap A_5| = \\lfloor 100/30 \\rfloor = 3' },
        { stepNum: 4, instruction: 'Apply PIE to find count of multiples of at least one prime', mathLatex: '(50 + 33 + 20) - (16 + 10 + 6) + 3 = 103 - 32 + 3 = 74' },
        { stepNum: 5, instruction: 'Subtract from 100 to find neither', mathLatex: '100 - 74 = 26' }
      ],
      finalAnswer: '26 integers',
      finalAnswerLatex: '26'
    },
    commonMistakes: [
      'Sign error in PIE: forgetting that the 3-set intersection is ADDED back.',
      'Misidentifying what constitutes the "pigeons" and the "holes" in Olympiad existence proofs.'
    ],
    relatedFormulaIds: ['adv_permutations_combinations', 'olympiad_flt_euler_totient'],
    practiceQuestions: [
      {
        id: 'q_oly_7',
        question: 'If 13 people are in a room, what is guaranteed by the Pigeonhole Principle regarding birth months?',
        options: ['At least 2 people share a birth month', 'All have different months', 'At least 3 share a month', 'Nobody shares a month'],
        correctIndex: 0,
        explanation: '13 people (pigeons) distributed among 12 months (holes): ceil(13/12) = 2.'
      }
    ],
    searchKeywords: ['Pigeonhole Principle', 'PHP', 'Inclusion Exclusion Principle', 'PIE', 'derangements', 'Dirichlet drawer principle'],
    memoryCard: {
      clozeLatex: '\\text{If } n \\text{ pigeons in } k \\text{ holes, at least one hole has } ???',
      missingPart: '\\lceil n/k \\rceil',
      missingOptions: ['\\lceil n/k \\rceil', '\\lfloor n/k \\rfloor', 'n - k', 'k/n'],
      recallPrompt: 'What ceiling fraction gives the minimum guaranteed item count in a pigeonhole?',
      identificationPrompt: 'Formula for: Generalized Pigeonhole Principle.'
    }
  },

  // ─── OLYMPIAD GEOMETRY ───
  {
    id: 'olympiad_ceva_menelaus',
    name: "Ceva's and Menelaus' Theorems",
    subject: 'olympiad',
    category: 'Geometry',
    topic: 'Triangle Transversals',
    difficulty: 'Expert',
    latex: '\\text{Ceva (Concurrency): } \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1, \\quad \\text{Menelaus (Collinearity): } \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = -1',
    variables: [
      { symbol: 'AD, BE, CF', name: 'Cevians', meaning: 'Lines connecting vertices A, B, C to points D, E, F on opposite sides' },
      { symbol: 'D, E, F', name: 'Points on lines BC, CA, AB', meaning: 'For Menelaus, points lie on the side lines (1 or 3 points lie externally)' }
    ],
    conditions: [
      'Ceva\'s Theorem: AD, BE, CF are CONCURRENT (meet at a single common point) iff product of directed ratios is +1',
      'Menelaus\' Theorem: D, E, F are COLLINEAR (lie on a single straight transversal line) iff product of directed ratios is -1 (an odd number of points lie on external extensions)'
    ],
    whenToUse: 'Proving concurrency of medians, altitudes, angle bisectors, Gergonne/Nagel points, and proving 3 points are collinear.',
    workedExample: {
      problem: 'Prove that the medians of any triangle are concurrent using Ceva\'s Theorem.',
      steps: [
        { stepNum: 1, instruction: 'For medians, D, E, F are midpoints of BC, CA, AB respectively', mathLatex: 'BD = DC, \\quad CE = EA, \\quad AF = FB' },
        { stepNum: 2, instruction: 'Form the Ceva ratio product', mathLatex: '\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = \\frac{1}{1} \\cdot \\frac{1}{1} \\cdot \\frac{1}{1} = 1' },
        { stepNum: 3, instruction: 'Apply Ceva\'s Theorem', mathLatex: '\\text{Since product is 1, the three medians are concurrent (at the Centroid G)}' }
      ],
      finalAnswer: 'Proved concurrent at Centroid G',
      finalAnswerLatex: '\\prod_{\\text{cyc}} \\frac{AF}{FB} = 1'
    },
    commonMistakes: [
      'Confusing Ceva (+1, concurrency) with Menelaus (-1 directed, collinearity).',
      'Traversing the vertices out of order (must go consistently around the perimeter: A->F->B->D->C->E->A).'
    ],
    relatedFormulaIds: ['olympiad_stewart_power_point', 'geom_triangle_centers_euler_line'],
    practiceQuestions: [
      {
        id: 'q_oly_8',
        question: 'What does Ceva\'s theorem prove about three cevians when their ratio product equals 1?',
        options: ['They are concurrent (meet at one point)', 'They are parallel', 'They form an equilateral triangle', 'They are perpendicular'],
        correctIndex: 0,
        explanation: 'Ceva\'s theorem provides the necessary and sufficient condition for three cevians to intersect at a single concurrent point.'
      }
    ],
    searchKeywords: ['Cevas theorem', 'Menelaus theorem', 'concurrency', 'collinearity', 'cevians', 'Olympiad geometry'],
    memoryCard: {
      clozeLatex: '\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = ??? \\quad (\\text{Ceva\'s Theorem})',
      missingPart: '1',
      missingOptions: ['1', '-1', '0', '2'],
      recallPrompt: 'What value does the product of side ratios equal in Ceva\'s Theorem for concurrency?',
      identificationPrompt: "Formula for: Ceva's Theorem."
    }
  },
  {
    id: 'olympiad_stewart_power_point',
    name: 'Stewart’s Theorem & Euler’s Polyhedral Formula',
    subject: 'olympiad',
    category: 'Geometry',
    topic: 'Cevian Lengths & Topology',
    difficulty: 'Expert',
    latex: 'b^2 m + c^2 n = a(d^2 + mn) \\quad (\\text{"man + dad = bmb + cnc"}), \\quad V - E + F = 2 \\; (\\text{Convex Polyhedra})',
    variables: [
      { symbol: 'd', name: 'Cevian length', meaning: 'Segment from vertex A to point D on base BC' },
      { symbol: 'm, n', name: 'Base segments', meaning: 'BD = m, DC = n, with base a = m + n' },
      { symbol: 'V, E, F', name: 'Vertices, Edges, Faces', meaning: 'Combinatorial counts of a 3D convex polyhedron' }
    ],
    conditions: [
      'Stewart\'s theorem mnemonic: "A man and his dad put a bomb in the sink": m*a*n + d*a*d = b*m*b + c*n*c',
      'Euler\'s formula V - E + F = 2 holds for ANY convex 3D polyhedron (spherical topology genus g = 0; generally V - E + F = 2 - 2g)'
    ],
    whenToUse: 'Calculating length of medians (Apollonius\' theorem when m = n), angle bisectors, and planar graph proofs.',
    workedExample: {
      problem: 'In triangle ABC with a = 6, b = 7, c = 5, find the length of median AD.',
      steps: [
        { stepNum: 1, instruction: 'Since AD is a median, m = n = a/2 = 3', mathLatex: 'm = 3, \\quad n = 3, \\quad a = 6' },
        { stepNum: 2, instruction: 'Apply Stewart\'s theorem (Apollonius\' special case: b^2 + c^2 = 2(d^2 + m^2))', mathLatex: '7^2 + 5^2 = 2(d^2 + 3^2) \\implies 49 + 25 = 2(d^2 + 9)' },
        { stepNum: 3, instruction: 'Solve for d', mathLatex: '74 = 2(d^2 + 9) \\implies 37 = d^2 + 9 \\implies d^2 = 28 \\implies d = \\sqrt{28} = 2\\sqrt{7}' }
      ],
      finalAnswer: 'Median AD = 2*sqrt(7) ~ 5.29',
      finalAnswerLatex: 'd = 2\\sqrt{7}'
    },
    commonMistakes: [
      'Swapping the base segments m and n with sides b and c in Stewart\'s formula.',
      'Miscounting vertices or edges on complex polyhedra when applying V - E + F = 2.'
    ],
    relatedFormulaIds: ['geom_pyramid_prism_tetrahedron', 'geom_triangle_centers_euler_line'],
    practiceQuestions: [
      {
        id: 'q_oly_9',
        question: 'A polyhedron has 12 faces and 30 edges. How many vertices does it have by Euler\'s formula?',
        options: ['20', '18', '24', '16'],
        correctIndex: 0,
        explanation: 'V - E + F = 2 => V - 30 + 12 = 2 => V - 18 = 2 => V = 20 (regular dodecahedron).'
      }
    ],
    searchKeywords: ['Stewarts theorem', 'Apollonius theorem', 'Eulers polyhedral formula', 'V - E + F = 2', 'cevian length'],
    memoryCard: {
      clozeLatex: 'V - E + F = ??? \\quad (\\text{Euler\'s Polyhedral Formula})',
      missingPart: '2',
      missingOptions: ['2', '0', '1', '4'],
      recallPrompt: 'What topological invariant equals V - E + F for any convex polyhedron?',
      identificationPrompt: "Formula for: Euler's Polyhedral Formula."
    }
  }
];
