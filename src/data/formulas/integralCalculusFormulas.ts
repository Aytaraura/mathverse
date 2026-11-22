import { FormulaItem } from '../../types/formulas';

export const integralCalculusFormulas: FormulaItem[] = [
  // ─── BASIC INTEGRATION RULES ───
  {
    id: 'integ_power_basic_rules',
    name: 'Power Rule, Constant Rule & Linearity of Integration',
    subject: 'integral_calculus',
    category: 'Basic Rules',
    topic: 'Antiderivatives',
    difficulty: 'Beginner',
    latex: '\\int k \\, dx = kx + C, \\quad \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1), \\quad \\int [c f(x) \\pm g(x)] \\, dx = c\\int f(x)\\,dx \\pm \\int g(x)\\,dx',
    variables: [
      { symbol: 'k, c', name: 'Constants', meaning: 'Scalars factored out by linearity' },
      { symbol: 'n', name: 'Power exponent', meaning: 'Any real number except n = -1' },
      { symbol: 'C', name: 'Constant of Integration', meaning: 'Arbitrary constant representing family of antiderivatives' }
    ],
    conditions: [
      'For n = -1, the power rule denominator becomes zero; use the logarithmic integral \\int \\frac{1}{x} dx = \\ln|x| + C',
      'Always include the arbitrary constant + C for indefinite integrals'
    ],
    whenToUse: 'Finding general antiderivatives of polynomials, power terms, square roots, and reciprocal powers.',
    derivation: 'By FTC, integration is the inverse of differentiation: since d/dx [x^{n+1}/(n+1)] = (n+1)x^n/(n+1) = x^n, reversing gives the power rule.',
    workedExample: {
      problem: 'Evaluate \\int (6x^2 - 4x + 5 - \\frac{2}{x^3}) \\, dx.',
      steps: [
        { stepNum: 1, instruction: 'Rewrite reciprocal power in x^n form', mathLatex: '\\int (6x^2 - 4x^1 + 5x^0 - 2x^{-3}) \\, dx' },
        { stepNum: 2, instruction: 'Integrate term by term: add 1 to exponent and divide by new exponent', mathLatex: '6\\left(\\frac{x^3}{3}\\right) - 4\\left(\\frac{x^2}{2}\\right) + 5x - 2\\left(\\frac{x^{-2}}{-2}\\right) + C' },
        { stepNum: 3, instruction: 'Simplify coefficients and negative powers', mathLatex: '2x^3 - 2x^2 + 5x + \\frac{1}{x^2} + C' }
      ],
      finalAnswer: '2x^3 - 2x^2 + 5x + 1/x^2 + C',
      finalAnswerLatex: '2x^3 - 2x^2 + 5x + \\frac{1}{x^2} + C'
    },
    commonMistakes: [
      'Forgetting the constant of integration (+ C).',
      'Dividing by n instead of (n + 1).',
      'Attempting to use the power rule on x^{-1} (1/x): (x^0)/0 is UNDEFINED!'
    ],
    relatedFormulaIds: ['integ_logarithmic_exponential', 'diff_power_constant_multiple'],
    practiceQuestions: [
      {
        id: 'q_int_1',
        question: 'Evaluate the indefinite integral: int 3x^2 dx.',
        options: ['x^3 + C', '6x + C', '3x^3 + C', 'x^2 + C'],
        correctIndex: 0,
        explanation: '3 * (x^(2+1) / (2+1)) + C = 3 * (x^3 / 3) + C = x^3 + C.'
      }
    ],
    searchKeywords: ['power rule integral', 'antiderivative', 'constant of integration', 'polynomial integral'],
    memoryCard: {
      clozeLatex: '\\int x^n \\, dx = \\frac{x^{n+1}}{???} + C \\quad (n \\neq -1)',
      missingPart: 'n + 1',
      missingOptions: ['n + 1', 'n', 'n - 1', '2n'],
      recallPrompt: 'What is the denominator in the Power Rule of integration?',
      identificationPrompt: 'Formula for: Power Rule of Integration.'
    }
  },
  {
    id: 'integ_logarithmic_exponential',
    name: 'Logarithmic and Exponential Integrals',
    subject: 'integral_calculus',
    category: 'Basic Rules',
    topic: 'Transcendental Integrals',
    difficulty: 'Beginner',
    latex: '\\int \\frac{1}{x} \\, dx = \\ln|x| + C, \\quad \\int e^x \\, dx = e^x + C, \\quad \\int a^x \\, dx = \\frac{a^x}{\\ln a} + C',
    variables: [
      { symbol: 'e^x', name: 'Natural exponential', meaning: 'Self-integrating function' },
      { symbol: 'a^x', name: 'General exponential', meaning: 'Exponential with constant base a > 0, a != 1' },
      { symbol: '|x|', name: 'Absolute value', meaning: 'Preserves the domain x < 0 in ln|x|' }
    ],
    conditions: [
      'For 1/x, the absolute value in ln|x| is MANDATORY whenever x can be negative',
      'a > 0 and a \\neq 1'
    ],
    whenToUse: 'Exponential decay/growth problems, half-life integrals, electrical circuits.',
    workedExample: {
      problem: 'Evaluate \\int (4e^{2x} + \\frac{5}{x}) \\, dx.',
      steps: [
        { stepNum: 1, instruction: 'Integrate e^{2x} using linear substitution: (1/2) e^{2x}', mathLatex: '\\int 4e^{2x}\\,dx = 4\\left(\\frac{e^{2x}}{2}\\right) = 2e^{2x}' },
        { stepNum: 2, instruction: 'Integrate 5/x: 5 ln|x|', mathLatex: '\\int \\frac{5}{x}\\,dx = 5\\ln|x|' },
        { stepNum: 3, instruction: 'Combine and append + C', mathLatex: '2e^{2x} + 5\\ln|x| + C' }
      ],
      finalAnswer: '2e^{2x} + 5 ln|x| + C',
      finalAnswerLatex: '2e^{2x} + 5\\ln|x| + C'
    },
    commonMistakes: [
      'Omitting the absolute value signs: writing ln(x) instead of ln|x| loses half the domain.',
      'Multiplying by ln(a) instead of DIVIDING by ln(a) when integrating a^x.'
    ],
    relatedFormulaIds: ['diff_exponential', 'diff_logarithmic'],
    practiceQuestions: [
      {
        id: 'q_int_2',
        question: 'What is the indefinite integral of 2^x dx?',
        options: ['(2^x) / ln 2 + C', '(2^x) * ln 2 + C', '2^(x+1) / (x+1) + C', '2^x + C'],
        correctIndex: 0,
        explanation: 'int a^x dx = a^x / ln a + C, so for a = 2 it is 2^x / ln 2 + C.'
      }
    ],
    searchKeywords: ['integral of e^x', 'integral of 1/x', 'ln|x|', 'integral of a^x', 'exponential integration'],
    memoryCard: {
      clozeLatex: '\\int \\frac{1}{x} \\, dx = \\ln|???| + C',
      missingPart: 'x',
      missingOptions: ['x', 'x^2', '1/x', 'e^x'],
      recallPrompt: 'What is inside the natural logarithm in int (1/x) dx?',
      identificationPrompt: 'Formula for: Reciprocal (Logarithmic) Integral.'
    }
  },
  {
    id: 'integ_trig_functions',
    name: 'Trigonometric Integrals (All 6 Primary Functions & Secant Squared)',
    subject: 'integral_calculus',
    category: 'Trigonometric Integrals',
    topic: 'Trigonometric Integration',
    difficulty: 'Intermediate',
    latex: '\\int \\sin x \\, dx = -\\cos x + C, \\quad \\int \\cos x \\, dx = \\sin x + C, \\quad \\int \\tan x \\, dx = \\ln|\\sec x| + C, \\quad \\int \\cot x \\, dx = \\ln|\\sin x| + C, \\quad \\int \\sec x \\, dx = \\ln|\\sec x + \\tan x| + C, \\quad \\int \\sec^2 x \\, dx = \\tan x + C',
    variables: [
      { symbol: 'x', name: 'Angle in radians', meaning: 'Required radian argument' }
    ],
    conditions: [
      'Note: \\int \\sin x \\, dx has a NEGATIVE sign: -\\cos x + C (opposite of the derivative sign!)',
      '\\int \\csc x \\, dx = -\\ln|\\csc x + \\cot x| + C',
      '\\int \\csc^2 x \\, dx = -\\cot x + C'
    ],
    whenToUse: 'AC power calculations, Fourier coefficients, harmonic oscillator potential energy.',
    workedExample: {
      problem: 'Evaluate \\int (3\\cos x - 2\\sec^2 x) \\, dx.',
      steps: [
        { stepNum: 1, instruction: 'Integrate 3 cos x: 3 sin x', mathLatex: '\\int 3\\cos x \\, dx = 3\\sin x' },
        { stepNum: 2, instruction: 'Integrate 2 sec^2 x: 2 tan x', mathLatex: '\\int 2\\sec^2 x \\, dx = 2\\tan x' },
        { stepNum: 3, instruction: 'Combine with constant + C', mathLatex: '3\\sin x - 2\\tan x + C' }
      ],
      finalAnswer: '3 sin x - 2 tan x + C',
      finalAnswerLatex: '3\\sin x - 2\\tan x + C'
    },
    commonMistakes: [
      'Mixing up the signs of sin and cos between derivatives and integrals: d/dx[cos] = -sin, but int sin = -cos!',
      'Thinking int tan x dx is sec^2 x (sec^2 x is the DERIVATIVE of tan x, not the integral; the integral is ln|sec x|).'
    ],
    relatedFormulaIds: ['diff_trigonometric', 'trig_pythagorean_identities'],
    practiceQuestions: [
      {
        id: 'q_int_3',
        question: 'What is the indefinite integral of sec(x) dx?',
        options: ['ln|sec x + tan x| + C', 'tan x + C', 'sec x tan x + C', 'ln|sec x| + C'],
        correctIndex: 0,
        explanation: 'int sec x dx = ln|sec x + tan x| + C.'
      }
    ],
    searchKeywords: ['integral of sin', 'integral of cos', 'integral of tan', 'integral of sec', 'trig integrals'],
    memoryCard: {
      clozeLatex: '\\int \\tan x \\, dx = \\ln|???| + C',
      missingPart: '\\sec x',
      missingOptions: ['\\sec x', '\\sin x', '\\cos x', '\\tan x'],
      recallPrompt: 'What function is inside the natural log in int tan(x) dx?',
      identificationPrompt: 'Formula for: Integral of Tangent.'
    }
  },

  // ─── INTEGRATION TECHNIQUES ───
  {
    id: 'integ_u_substitution',
    name: 'U-Substitution (Change of Variables)',
    subject: 'integral_calculus',
    category: 'Integration Techniques',
    topic: 'Substitution Method',
    difficulty: 'Intermediate',
    latex: '\\int f(g(x))g\'(x) \\, dx = \\int f(u) \\, du, \\quad \\int_a^b f(g(x))g\'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du',
    variables: [
      { symbol: 'u = g(x)', name: 'Substituted variable', meaning: 'Inner function chosen so that du = g\'(x) dx appears in integrand' },
      { symbol: 'du = g\'(x) dx', name: 'Differential', meaning: 'Replaces dx' }
    ],
    conditions: [
      'For definite integrals, update limits of integration from x-limits [a, b] to u-limits [g(a), g(b)]'
    ],
    whenToUse: 'Whenever the integrand contains a composite function alongside the derivative of its inner function.',
    derivation: 'Directly mirrors the Chain Rule in reverse: since d/dx [F(g(x))] = F\'(g(x)) g\'(x) = f(g(x)) g\'(x), integrating both sides gives the u-substitution formula.',
    workedExample: {
      problem: 'Evaluate \\int 2x \\cos(x^2 + 1) \\, dx.',
      steps: [
        { stepNum: 1, instruction: 'Choose u as the inner function', mathLatex: 'u = x^2 + 1' },
        { stepNum: 2, instruction: 'Compute du = 2x dx and substitute', mathLatex: 'du = 2x\\,dx \\implies \\int \\cos(u)\\,du' },
        { stepNum: 3, instruction: 'Integrate with respect to u', mathLatex: '\\sin(u) + C' },
        { stepNum: 4, instruction: 'Substitute back u = x^2 + 1', mathLatex: '\\sin(x^2 + 1) + C' }
      ],
      finalAnswer: 'sin(x^2 + 1) + C',
      finalAnswerLatex: '\\sin(x^2 + 1) + C'
    },
    commonMistakes: [
      'Forgetting to change the integration bounds in a definite integral: evaluating at a and b instead of g(a) and g(b).',
      'Forgetting to balance constant multipliers (e.g. dividing by 2 if du = 2x dx and only x dx is present).'
    ],
    relatedFormulaIds: ['diff_chain_rule', 'integ_by_parts'],
    practiceQuestions: [
      {
        id: 'q_int_4',
        question: 'Evaluate int 2x (x^2 + 3)^4 dx.',
        options: ['(x^2 + 3)^5 / 5 + C', '(x^2 + 3)^5 + C', '2(x^2 + 3)^5 / 5 + C', '(x^2 + 3)^4 + C'],
        correctIndex: 0,
        explanation: 'Let u = x^2 + 3, du = 2x dx. int u^4 du = u^5 / 5 + C = (x^2 + 3)^5 / 5 + C.'
      }
    ],
    searchKeywords: ['u substitution', 'change of variables', 'integration by substitution', 'du'],
    memoryCard: {
      clozeLatex: '\\int f(g(x))g\'(x) \\, dx = \\int f(u) \\, ???',
      missingPart: 'du',
      missingOptions: ['du', 'dx', 'u', 'g\'(u)'],
      recallPrompt: 'What differential replaces g\'(x) dx in u-substitution?',
      identificationPrompt: 'Formula for: U-Substitution Form.'
    }
  },
  {
    id: 'integ_by_parts',
    name: 'Integration by Parts (LIATE Rule)',
    subject: 'integral_calculus',
    category: 'Integration Techniques',
    topic: 'Product Integration',
    difficulty: 'Intermediate',
    latex: '\\int u \\, dv = uv - \\int v \\, du, \\quad \\int_a^b u \\, dv = [uv]_a^b - \\int_a^b v \\, du',
    variables: [
      { symbol: 'u', name: 'Function to differentiate', meaning: 'Chosen via LIATE priority: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential' },
      { symbol: 'dv', name: 'Part to integrate', meaning: 'Easily integrable portion along with dx' },
      { symbol: 'du', name: 'Derivative of u', meaning: 'du = u\' dx' },
      { symbol: 'v', name: 'Antiderivative of dv', meaning: 'v = int dv' }
    ],
    conditions: [
      'LIATE Rule for choosing u (highest priority goes to u):',
      'L: Logarithmic (ln x)',
      'I: Inverse trigonometric (arctan x, arcsin x)',
      'A: Algebraic polynomials (x^2, x)',
      'T: Trigonometric (sin x, cos x)',
      'E: Exponential (e^x, 2^x)'
    ],
    whenToUse: 'Integrating products of different function classes, such as x*sin(x), x*e^x, ln(x), x*arctan(x).',
    derivation: 'Reversal of Product Rule: d/dx[uv] = u\'v + uv\'. Integrating both sides gives uv = int v du + int u dv. Rearranging yields int u dv = uv - int v du.',
    workedExample: {
      problem: 'Evaluate \\int x e^x \\, dx.',
      steps: [
        { stepNum: 1, instruction: 'Choose u and dv via LIATE (Algebraic before Exponential)', mathLatex: 'u = x \\implies du = dx, \\quad dv = e^x\\,dx \\implies v = e^x' },
        { stepNum: 2, instruction: 'Apply formula: uv - int v du', mathLatex: 'x e^x - \\int e^x \\, dx' },
        { stepNum: 3, instruction: 'Integrate the remaining integral', mathLatex: 'x e^x - e^x + C = e^x(x - 1) + C' }
      ],
      finalAnswer: 'e^x(x - 1) + C',
      finalAnswerLatex: 'e^x(x - 1) + C'
    },
    commonMistakes: [
      'Picking the wrong function for u (e.g. setting u = e^x and dv = x dx makes the second integral harder!).',
      'Sign error: forgetting that it is uv MINUS the integral of v du.'
    ],
    relatedFormulaIds: ['diff_product_quotient', 'integ_u_substitution'],
    practiceQuestions: [
      {
        id: 'q_int_5',
        question: 'Evaluate int ln(x) dx by parts.',
        options: ['x ln(x) - x + C', '1/x + C', 'x ln(x) + x + C', '(ln x)^2 / 2 + C'],
        correctIndex: 0,
        explanation: 'Set u = ln x, dv = dx. Then du = 1/x dx, v = x. int u dv = x ln x - int x(1/x) dx = x ln x - x + C.'
      }
    ],
    searchKeywords: ['integration by parts', 'LIATE rule', 'int u dv', 'tabular integration'],
    memoryCard: {
      clozeLatex: '\\int u \\, dv = uv - \\int ??? \\, du',
      missingPart: 'v',
      missingOptions: ['v', 'u', 'v^2', 'u\''],
      recallPrompt: 'What function multiplies du inside the subtracted integral in Integration by Parts?',
      identificationPrompt: 'Formula for: Integration by Parts.'
    }
  },
  {
    id: 'integ_trig_substitution_partial_fractions',
    name: 'Trigonometric Substitution & Partial Fractions',
    subject: 'integral_calculus',
    category: 'Integration Techniques',
    topic: 'Advanced Techniques',
    difficulty: 'Advanced',
    latex: '\\sqrt{a^2 - x^2} \\implies x = a\\sin\\theta, \\quad \\sqrt{a^2 + x^2} \\implies x = a\\tan\\theta, \\quad \\sqrt{x^2 - a^2} \\implies x = a\\sec\\theta, \\quad \\frac{P(x)}{(x-r_1)(x-r_2)} = \\frac{A}{x-r_1} + \\frac{B}{x-r_2}',
    variables: [
      { symbol: 'a', name: 'Constant radius/scalar', meaning: 'Positive real number' },
      { symbol: '\\theta', name: 'Substituted angle', meaning: 'Restricted to principal range' }
    ],
    conditions: [
      'Trig sub simplifies square roots using Pythagorean identities:',
      'a^2 - a^2 sin^2 theta = a^2 cos^2 theta',
      'a^2 + a^2 tan^2 theta = a^2 sec^2 theta',
      'a^2 sec^2 theta - a^2 = a^2 tan^2 theta',
      'For partial fractions, degree of P(x) MUST be strictly less than degree of Q(x) (use polynomial long division first if not)'
    ],
    whenToUse: 'Integrals involving square roots of quadratic forms, and rational functions with factorable polynomial denominators.',
    workedExample: {
      problem: 'Evaluate \\int \\frac{1}{x^2 - 4} \\, dx using partial fractions.',
      steps: [
        { stepNum: 1, instruction: 'Factor the denominator: (x - 2)(x + 2)', mathLatex: '\\frac{1}{(x-2)(x+2)} = \\frac{A}{x-2} + \\frac{B}{x+2}' },
        { stepNum: 2, instruction: 'Multiply through and solve for A and B', mathLatex: '1 = A(x+2) + B(x-2) \\implies x=2 \\implies A = 1/4; \\; x=-2 \\implies B = -1/4' },
        { stepNum: 3, instruction: 'Integrate the decomposed partial fractions', mathLatex: '\\int \\left( \\frac{1/4}{x-2} - \\frac{1/4}{x+2} \\right) dx = \\frac{1}{4}\\ln|x-2| - \\frac{1}{4}\\ln|x+2| + C' },
        { stepNum: 4, instruction: 'Combine using log laws', mathLatex: '\\frac{1}{4}\\ln\\left|\\frac{x-2}{x+2}\\right| + C' }
      ],
      finalAnswer: '(1/4) ln|(x-2)/(x+2)| + C',
      finalAnswerLatex: '\\frac{1}{4}\\ln\\left|\\frac{x-2}{x+2}\\right| + C'
    },
    commonMistakes: [
      'Using the wrong trig substitution: using sin instead of tan for a^2 + x^2.',
      'Forgetting to substitute dx = a cos theta d theta when making the trig substitution.',
      'Performing partial fractions before dividing out an improper rational function (degree of top >= degree of bottom).'
    ],
    relatedFormulaIds: ['integ_trig_functions', 'trig_pythagorean_identities'],
    practiceQuestions: [
      {
        id: 'q_int_6',
        question: 'Which substitution is appropriate for int sqrt(9 - x^2) dx?',
        options: ['x = 3 sin(theta)', 'x = 3 tan(theta)', 'x = 3 sec(theta)', 'x = 9 sin(theta)'],
        correctIndex: 0,
        explanation: 'For a^2 - x^2 with a^2 = 9, use x = a sin(theta) = 3 sin(theta).'
      }
    ],
    searchKeywords: ['trigonometric substitution', 'partial fractions', 'trig sub', 'rational function integral'],
    memoryCard: {
      clozeLatex: '\\text{For } \\sqrt{a^2 + x^2}, \\text{ substitute } x = a \\times ???',
      missingPart: '\\tan\\theta',
      missingOptions: ['\\tan\\theta', '\\sin\\theta', '\\sec\\theta', '\\cos\\theta'],
      recallPrompt: 'What trig function is used to substitute for x in sqrt(a^2 + x^2)?',
      identificationPrompt: 'Formula for: Trigonometric Substitution for Sum of Squares.'
    }
  },

  // ─── DEFINITE INTEGRALS & FTC ───
  {
    id: 'integ_ftc_theorems',
    name: 'Fundamental Theorem of Calculus (FTC Parts 1 & 2)',
    subject: 'integral_calculus',
    category: 'Definite Integrals',
    topic: 'Fundamental Theorem of Calculus',
    difficulty: 'Intermediate',
    latex: '\\text{FTC 1: } \\frac{d}{dx}\\left[ \\int_a^{g(x)} f(t) \\, dt \\right] = f(g(x)) \\cdot g\'(x), \\quad \\text{FTC 2: } \\int_a^b f(x) \\, dx = F(b) - F(a) = [F(x)]_a^b',
    variables: [
      { symbol: 'f(t)', name: 'Continuous integrand', meaning: 'Function continuous on [a, b]' },
      { symbol: 'F(x)', name: 'Antiderivative', meaning: 'Any function such that F\'(x) = f(x)' },
      { symbol: 'g(x)', name: 'Variable upper bound', meaning: 'Upper limit of integration; requires chain rule factor g\'(x)' }
    ],
    conditions: [
      'f must be continuous on [a, b]',
      'Symmetry properties: If f is odd (f(-x) = -f(x)), then \\int_{-a}^a f(x) dx = 0; If f is even, \\int_{-a}^a f(x) dx = 2\\int_0^a f(x) dx',
      'Reversal of bounds: \\int_b^a f(x) dx = -\\int_a^b f(x) dx'
    ],
    whenToUse: 'Evaluating definite integrals, differentiating accumulation functions, verifying total change.',
    workedExample: {
      problem: 'Find the derivative of H(x) = \\int_2^{x^3} \\cos(t) \\, dt.',
      steps: [
        { stepNum: 1, instruction: 'Apply Leibniz rule (FTC 1 with chain rule)', mathLatex: 'H\'(x) = \\cos(g(x)) \\cdot g\'(x)' },
        { stepNum: 2, instruction: 'Substitute upper limit g(x) = x^3 and its derivative g\'(x) = 3x^2', mathLatex: 'H\'(x) = \\cos(x^3) \\cdot 3x^2 = 3x^2\\cos(x^3)' }
      ],
      finalAnswer: '3x^2 cos(x^3)',
      finalAnswerLatex: '3x^2\\cos(x^3)'
    },
    commonMistakes: [
      'Forgetting the chain rule when differentiating an integral whose upper bound is not just x: g\'(x) MUST be multiplied!',
      'Evaluating F(a) - F(b) instead of F(b) - F(a).'
    ],
    relatedFormulaIds: ['integ_applications_area_volume', 'integ_power_basic_rules'],
    practiceQuestions: [
      {
        id: 'q_int_7',
        question: 'Evaluate the definite integral int_0^2 3x^2 dx.',
        options: ['8', '12', '6', '4'],
        correctIndex: 0,
        explanation: 'Antiderivative is x^3. [x^3]_0^2 = 2^3 - 0^3 = 8.'
      }
    ],
    searchKeywords: ['Fundamental Theorem of Calculus', 'FTC', 'FTC Part 1', 'FTC Part 2', 'definite integral', 'Leibniz rule'],
    memoryCard: {
      clozeLatex: '\\int_a^b f(x) \\, dx = F(b) - ???',
      missingPart: 'F(a)',
      missingOptions: ['F(a)', 'F\'(a)', 'f(a)', '0'],
      recallPrompt: 'What is subtracted from F(b) in the Fundamental Theorem of Calculus?',
      identificationPrompt: 'Formula for: Fundamental Theorem of Calculus Part 2.'
    }
  },

  // ─── APPLICATIONS ───
  {
    id: 'integ_applications_area_volume',
    name: 'Applications of Integrals (Area, Disk, Washer & Cylindrical Shells)',
    subject: 'integral_calculus',
    category: 'Applications',
    topic: 'Geometric Applications',
    difficulty: 'Advanced',
    latex: 'A = \\int_a^b [f(x) - g(x)] \\, dx, \\quad V_{\\text{disk/washer}} = \\pi \\int_a^b [R(x)^2 - r(x)^2] \\, dx, \\quad V_{\\text{shell}} = 2\\pi \\int_a^b x [f(x) - g(x)] \\, dx',
    variables: [
      { symbol: 'f(x) - g(x)', name: 'Height / Top - Bottom', meaning: 'Upper curve minus lower curve' },
      { symbol: 'R(x), r(x)', name: 'Outer and Inner radii', meaning: 'Distance from curves to axis of revolution' },
      { symbol: 'V', name: 'Volume of solid of revolution', meaning: 'Volume generated by rotating region about an axis' }
    ],
    conditions: [
      'f(x) \\ge g(x) on [a, b]',
      'Disk method used when cross-sections are perpendicular to axis of revolution; Shell method used when cylindrical slices are parallel to axis of revolution'
    ],
    whenToUse: 'Computing irregular areas, volumes of bottles, goblets, tanks, and rotational machinery parts.',
    workedExample: {
      problem: 'Find the volume of the solid formed by rotating the region under y = \\sqrt{x} from x = 0 to x = 4 about the x-axis.',
      steps: [
        { stepNum: 1, instruction: 'Use Disk Method formula V = pi * int [R(x)]^2 dx', mathLatex: 'V = \\pi \\int_0^4 (\\sqrt{x})^2 \\, dx = \\pi \\int_0^4 x \\, dx' },
        { stepNum: 2, instruction: 'Find antiderivative and evaluate bounds', mathLatex: 'V = \\pi \\left[ \\frac{x^2}{2} \\right]_0^4 = \\pi \\left( \\frac{16}{2} - 0 \\right) = 8\\pi' }
      ],
      finalAnswer: '8 pi',
      finalAnswerLatex: '8\\pi'
    },
    commonMistakes: [
      'Squaring the difference [R - r]^2 instead of the difference of squares: R^2 - r^2.',
      'Forgetting the factor of pi in disk/washer or 2*pi in shell method.'
    ],
    relatedFormulaIds: ['integ_arc_length_surface_area', 'integ_ftc_theorems'],
    practiceQuestions: [
      {
        id: 'q_int_8',
        question: 'What is the area between y = x and y = x^2 from x = 0 to x = 1?',
        options: ['1/6', '1/3', '1/2', '1/12'],
        correctIndex: 0,
        explanation: 'int_0^1 (x - x^2) dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6.'
      }
    ],
    searchKeywords: ['area between curves', 'disk method', 'washer method', 'cylindrical shells', 'solids of revolution'],
    memoryCard: {
      clozeLatex: 'V_{\\text{washer}} = \\pi \\int_a^b [R(x)^2 - ???] \\, dx',
      missingPart: 'r(x)^2',
      missingOptions: ['r(x)^2', 'r(x)', '2r(x)', 'R(x)r(x)'],
      recallPrompt: 'What is subtracted from R(x)^2 in the washer method volume formula?',
      identificationPrompt: 'Formula for: Washer Method Volume of Revolution.'
    }
  },
  {
    id: 'integ_arc_length_surface_area',
    name: 'Arc Length, Surface Area of Revolution & Average Value',
    subject: 'integral_calculus',
    category: 'Applications',
    topic: 'Lengths & Averages',
    difficulty: 'Advanced',
    latex: 'L = \\int_a^b \\sqrt{1 + [f\'(x)]^2} \\, dx, \\quad S = 2\\pi \\int_a^b f(x)\\sqrt{1 + [f\'(x)]^2} \\, dx, \\quad f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x) \\, dx',
    variables: [
      { symbol: 'L', name: 'Arc length', meaning: 'Exact path distance along curve y = f(x)' },
      { symbol: 'S', name: 'Surface Area of Revolution', meaning: 'Surface area generated by rotating curve around x-axis' },
      { symbol: 'f_{\\text{avg}}', name: 'Mean value of function', meaning: 'Average continuous height over interval [a, b]' },
      { symbol: 'ds = \\sqrt{1 + (f\')^2} dx', name: 'Arc length differential', meaning: 'Infinitesimal hypotenuse' }
    ],
    conditions: [
      'f\' must be continuous on [a, b]',
      'Mean Value Theorem for Integrals: There exists c in (a, b) such that f(c) = f_avg'
    ],
    whenToUse: 'Cable sag lengths, power line tensions, aerodynamic surface areas, average temperature/power.',
    workedExample: {
      problem: 'Find the average value of f(x) = 3x^2 on [0, 2].',
      steps: [
        { stepNum: 1, instruction: 'Use average value formula f_avg = (1 / (b - a)) * int_a^b f(x) dx', mathLatex: 'f_{\\text{avg}} = \\frac{1}{2 - 0} \\int_0^2 3x^2 \\, dx' },
        { stepNum: 2, instruction: 'Evaluate the definite integral', mathLatex: '\\int_0^2 3x^2 \\, dx = [x^3]_0^2 = 8 - 0 = 8' },
        { stepNum: 3, instruction: 'Multiply by 1/(b - a)', mathLatex: 'f_{\\text{avg}} = \\frac{1}{2}(8) = 4' }
      ],
      finalAnswer: '4',
      finalAnswerLatex: '4'
    },
    commonMistakes: [
      'Forgetting the square on the derivative inside arc length: sqrt(1 + f\'^2), NOT sqrt(1 + f\').',
      'Forgetting to divide by (b - a) when finding the average value.'
    ],
    relatedFormulaIds: ['integ_applications_area_volume', 'diff_extrema_concavity_mvt'],
    practiceQuestions: [
      {
        id: 'q_int_9',
        question: 'What is the average value of f(x) = 2x on [0, 4]?',
        options: ['4', '8', '2', '16'],
        correctIndex: 0,
        explanation: 'f_avg = (1/4) * int_0^4 2x dx = (1/4) * [x^2]_0^4 = (1/4) * 16 = 4.'
      }
    ],
    searchKeywords: ['arc length formula', 'surface area of revolution', 'average value of function', 'MVT for integrals'],
    memoryCard: {
      clozeLatex: 'f_{\\text{avg}} = \\frac{1}{???} \\int_a^b f(x) \\, dx',
      missingPart: 'b - a',
      missingOptions: ['b - a', '2', 'b + a', 'n'],
      recallPrompt: 'What normalizes the integral in the average value of a function formula?',
      identificationPrompt: 'Formula for: Average Value of a Continuous Function.'
    }
  }
];
