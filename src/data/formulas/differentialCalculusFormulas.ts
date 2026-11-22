import { FormulaItem } from '../../types/formulas';

export const differentialCalculusFormulas: FormulaItem[] = [
  // ─── FUNDAMENTAL RULES ───
  {
    id: 'diff_power_constant_multiple',
    name: 'Power Rule, Constant Rule & Constant Multiple',
    subject: 'differential_calculus',
    category: 'Fundamental Rules',
    topic: 'Basic Differentiation',
    difficulty: 'Beginner',
    latex: '\\frac{d}{dx}[c] = 0, \\quad \\frac{d}{dx}[x^n] = n x^{n-1}, \\quad \\frac{d}{dx}[c f(x)] = c f\'(x)',
    variables: [
      { symbol: 'c', name: 'Constant scalar', meaning: 'Any real or complex constant' },
      { symbol: 'n', name: 'Exponent', meaning: 'Any real number (positive, negative, fraction)' },
      { symbol: 'x', name: 'Independent variable', meaning: 'The variable differentiated with respect to' }
    ],
    conditions: [
      'Applies for all real exponents n (including negative numbers and fractions)',
      'For x = 0 with n < 1, the derivative is undefined (vertical tangent or cusp)'
    ],
    whenToUse: 'Differentiating polynomial terms, power functions, square roots, and reciprocal powers.',
    derivation: 'By limit definition: lim_{h->0} [(x+h)^n - x^n]/h. Using binomial expansion (x+h)^n = x^n + n x^{n-1} h + O(h^2), dividing by h and taking h->0 gives n x^{n-1}.',
    workedExample: {
      problem: 'Find the derivative of f(x) = 5x^4 - \\frac{3}{x^2} + 4\\sqrt{x} - 7.',
      steps: [
        { stepNum: 1, instruction: 'Rewrite all terms in power form x^n', mathLatex: 'f(x) = 5x^4 - 3x^{-2} + 4x^{1/2} - 7' },
        { stepNum: 2, instruction: 'Differentiate term by term using Power Rule', mathLatex: 'f\'(x) = 5(4x^3) - 3(-2x^{-3}) + 4\\left(\\frac{1}{2}x^{-1/2}\\right) - 0' },
        { stepNum: 3, instruction: 'Simplify coefficients and convert back to standard notation', mathLatex: 'f\'(x) = 20x^3 + \\frac{6}{x^3} + \\frac{2}{\\sqrt{x}}' }
      ],
      finalAnswer: '20x^3 + 6/x^3 + 2/sqrt(x)',
      finalAnswerLatex: '20x^3 + \\frac{6}{x^3} + \\frac{2}{\\sqrt{x}}'
    },
    commonMistakes: [
      'Differentiating a constant to itself: d/dx[5] is 0, NOT 5.',
      'Subtracting 1 incorrectly from negative exponents: -2 - 1 = -3, NOT -1.',
      'Forgetting that d/dx[x] = 1*x^0 = 1.'
    ],
    relatedFormulaIds: ['diff_sum_difference', 'diff_product_quotient'],
    practiceQuestions: [
      {
        id: 'q_diff_1',
        question: 'What is the derivative of f(x) = 7x^3 - 9?',
        options: ['21x^2', '21x^2 - 9', '7x^2', '14x'],
        correctIndex: 0,
        explanation: 'd/dx[7x^3] = 7*3x^2 = 21x^2. The derivative of constant 9 is 0.'
      }
    ],
    searchKeywords: ['power rule', 'constant rule', 'constant multiple rule', 'derivative of polynomial', 'nx^(n-1)'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[x^n] = n \\times ???',
      missingPart: 'x^{n-1}',
      missingOptions: ['x^{n-1}', 'x^n', 'x^{n+1}', '(n-1)x'],
      recallPrompt: 'What is the resulting power of x in the Power Rule of differentiation?',
      identificationPrompt: 'Formula for: Power Rule of Differentiation.'
    }
  },
  {
    id: 'diff_sum_difference',
    name: 'Sum and Difference Rules',
    subject: 'differential_calculus',
    category: 'Fundamental Rules',
    topic: 'Basic Differentiation',
    difficulty: 'Beginner',
    latex: '\\frac{d}{dx}[f(x) \\pm g(x)] = f\'(x) \\pm g\'(x)',
    variables: [
      { symbol: 'f(x), g(x)', name: 'Differentiable functions', meaning: 'Functions that possess derivatives at x' }
    ],
    conditions: [
      'Both f and g must be differentiable at the point x',
      'Reflects the linearity of the derivative differential operator D = d/dx'
    ],
    whenToUse: 'Differentiating polynomials and expressions composed of added or subtracted terms.',
    workedExample: {
      problem: 'Differentiate h(x) = e^x + \\sin(x) - x^3.',
      steps: [
        { stepNum: 1, instruction: 'Apply sum and difference linearity rule', mathLatex: 'h\'(x) = \\frac{d}{dx}[e^x] + \\frac{d}{dx}[\\sin x] - \\frac{d}{dx}[x^3]' },
        { stepNum: 2, instruction: 'Evaluate each basic derivative', mathLatex: 'h\'(x) = e^x + \\cos(x) - 3x^2' }
      ],
      finalAnswer: 'e^x + cos(x) - 3x^2',
      finalAnswerLatex: 'e^x + \\cos(x) - 3x^2'
    },
    commonMistakes: [
      'Thinking that the product or quotient also distributes linearly (d/dx[fg] != f\'g\').'
    ],
    relatedFormulaIds: ['diff_power_constant_multiple', 'diff_product_quotient'],
    practiceQuestions: [
      {
        id: 'q_diff_2',
        question: 'Differentiate y = x^2 + 4x.',
        options: ['2x + 4', '2x', 'x + 4', '2x^2 + 4'],
        correctIndex: 0,
        explanation: 'd/dx[x^2] + d/dx[4x] = 2x + 4.'
      }
    ],
    searchKeywords: ['sum rule', 'difference rule', 'linearity of derivative'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[f(x) + g(x)] = f\'(x) + ???',
      missingPart: 'g\'(x)',
      missingOptions: ['g\'(x)', 'g(x)', 'f(x)g\'(x)', '1'],
      recallPrompt: 'What is the second term in the sum rule for derivatives?',
      identificationPrompt: 'Formula for: Sum Rule of Differentiation.'
    }
  },
  {
    id: 'diff_product_quotient',
    name: 'Product Rule and Quotient Rule',
    subject: 'differential_calculus',
    category: 'Fundamental Rules',
    topic: 'Derivative Rules',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[u \\cdot v] = u\'v + uv\', \\quad \\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u\'v - uv\'}{v^2}',
    variables: [
      { symbol: 'u, v', name: 'Functions of x', meaning: 'Differentiable numerator and denominator functions' },
      { symbol: 'u\', v\'', name: 'First derivatives', meaning: 'du/dx and dv/dx' }
    ],
    conditions: [
      'v(x) \\neq 0 for Quotient Rule',
      'Mnemonic for Quotient Rule: "Low d-High minus High d-Low, over Low-Low" = (v u\' - u v\') / v^2'
    ],
    whenToUse: 'Differentiating products of functions (e.g. x^2 sin x) or fractions/rational functions.',
    workedExample: {
      problem: 'Find the derivative of f(x) = \\frac{x^2 + 1}{2x - 3}.',
      steps: [
        { stepNum: 1, instruction: 'Identify u and v and their derivatives', mathLatex: 'u = x^2 + 1 \\implies u\' = 2x, \\quad v = 2x - 3 \\implies v\' = 2' },
        { stepNum: 2, instruction: 'Apply Quotient Rule formula: (u\'v - uv\') / v^2', mathLatex: 'f\'(x) = \\frac{(2x)(2x - 3) - (x^2 + 1)(2)}{(2x - 3)^2}' },
        { stepNum: 3, instruction: 'Expand and collect like terms in numerator', mathLatex: 'f\'(x) = \\frac{4x^2 - 6x - (2x^2 + 2)}{(2x - 3)^2} = \\frac{2x^2 - 6x - 2}{(2x - 3)^2}' }
      ],
      finalAnswer: '(2x^2 - 6x - 2) / (2x - 3)^2',
      finalAnswerLatex: '\\frac{2x^2 - 6x - 2}{(2x - 3)^2}'
    },
    commonMistakes: [
      'Differentiating numerator and denominator separately: d/dx[u/v] = u\'/v\' is the SINGLE MOST COMMON ERROR in beginner calculus!',
      'Swapping the order in quotient rule: writing (uv\' - u\'v)/v^2 produces the NEGATIVE of the true derivative.',
      'Forgetting to square the denominator (v^2).'
    ],
    relatedFormulaIds: ['diff_chain_rule', 'diff_power_constant_multiple'],
    practiceQuestions: [
      {
        id: 'q_diff_3',
        question: 'Differentiate y = x * e^x.',
        options: ['(x + 1)e^x', 'e^x', 'x e^x', 'e^x + x'],
        correctIndex: 0,
        explanation: 'By product rule: (1)*e^x + x*(e^x) = e^x(1 + x).'
      }
    ],
    searchKeywords: ['product rule', 'quotient rule', 'u prime v', 'low d high', 'derivative of product', 'derivative of quotient'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u\'v - ???}{v^2}',
      missingPart: 'uv\'',
      missingOptions: ['uv\'', 'u\'v\'', 'v\'', 'u'],
      recallPrompt: 'What is subtracted in the numerator of the Quotient Rule?',
      identificationPrompt: 'Formula for: Quotient Rule of Differentiation.'
    }
  },
  {
    id: 'diff_chain_rule',
    name: 'Chain Rule (Derivative of Composite Functions)',
    subject: 'differential_calculus',
    category: 'Fundamental Rules',
    topic: 'Chain Rule',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x), \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
    variables: [
      { symbol: 'f(u)', name: 'Outer function', meaning: 'Evaluated at inner function u = g(x)' },
      { symbol: 'g(x)', name: 'Inner function', meaning: 'The input to the outer function' },
      { symbol: 'g\'(x)', name: 'Inner derivative', meaning: 'Derivative of the "inside" expression' }
    ],
    conditions: [
      'g must be differentiable at x, and f must be differentiable at g(x)'
    ],
    whenToUse: 'Differentiating nested functions such as sin(x^2), (3x + 1)^5, e^{4x}, sqrt{x^3 + 2}.',
    workedExample: {
      problem: 'Find the derivative of y = \\sin(3x^2 + 5).',
      steps: [
        { stepNum: 1, instruction: 'Identify outer function f(u) = sin(u) and inner function u = 3x^2 + 5', mathLatex: 'u = 3x^2 + 5, \\quad y = \\sin(u)' },
        { stepNum: 2, instruction: 'Differentiate outer function: dy/du = cos(u)', mathLatex: '\\frac{dy}{du} = \\cos(u) = \\cos(3x^2 + 5)' },
        { stepNum: 3, instruction: 'Differentiate inner function: du/dx = 6x', mathLatex: '\\frac{du}{dx} = 6x' },
        { stepNum: 4, instruction: 'Multiply outer by inner derivative', mathLatex: '\\frac{dy}{dx} = \\cos(3x^2 + 5) \\cdot 6x = 6x\\cos(3x^2 + 5)' }
      ],
      finalAnswer: '6x cos(3x^2 + 5)',
      finalAnswerLatex: '6x\\cos(3x^2 + 5)'
    },
    commonMistakes: [
      'Forgetting to multiply by the derivative of the inside: writing d/dx[sin(3x^2)] = cos(3x^2) without the 6x factor!',
      'Differentiating the inside WHILE keeping it inside the outer derivative: cos(6x) is FALSE.'
    ],
    relatedFormulaIds: ['diff_product_quotient', 'diff_implicit_differentiation'],
    practiceQuestions: [
      {
        id: 'q_diff_4',
        question: 'What is the derivative of (2x + 1)^4?',
        options: ['8(2x + 1)^3', '4(2x + 1)^3', '2(2x + 1)^3', '8x(2x + 1)^3'],
        correctIndex: 0,
        explanation: 'Outer derivative 4(2x+1)^3 * inner derivative 2 = 8(2x+1)^3.'
      }
    ],
    searchKeywords: ['chain rule', 'composite function derivative', 'inner derivative', 'dy/du * du/dx'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\times ???',
      missingPart: 'g\'(x)',
      missingOptions: ['g\'(x)', 'g(x)', 'f\'(x)', '1'],
      recallPrompt: 'What factor multiplies f\'(g(x)) in the Chain Rule?',
      identificationPrompt: 'Formula for: Chain Rule of Differentiation.'
    }
  },

  // ─── COMMON DERIVATIVES ───
  {
    id: 'diff_exponential',
    name: 'Exponential Derivatives (e^x and a^x)',
    subject: 'differential_calculus',
    category: 'Common Derivatives',
    topic: 'Exponential Functions',
    difficulty: 'Beginner',
    latex: '\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[e^{u(x)}] = e^u \\cdot u\', \\quad \\frac{d}{dx}[a^x] = a^x \\ln a, \\quad \\frac{d}{dx}[a^{u(x)}] = a^u \\ln a \\cdot u\'',
    variables: [
      { symbol: 'e', name: "Euler's number", meaning: 'Base of natural exponential ~ 2.71828' },
      { symbol: 'a', name: 'Constant base', meaning: 'Any positive constant a > 0, a != 1' }
    ],
    conditions: [
      'a > 0, a \\neq 1',
      'e^x is the UNIQUE non-trivial function equal to its own derivative: f\'(x) = f(x)'
    ],
    whenToUse: 'Radioactive decay, bacterial growth, RC circuit transient discharges, continuous compound interest.',
    workedExample: {
      problem: 'Find the derivative of y = 3^{x^2}.',
      steps: [
        { stepNum: 1, instruction: 'Use formula for a^u: dy/dx = a^u * ln(a) * u\'', mathLatex: 'a = 3, \\quad u = x^2 \\implies u\' = 2x' },
        { stepNum: 2, instruction: 'Substitute components', mathLatex: '\\frac{dy}{dx} = 3^{x^2} \\cdot \\ln(3) \\cdot 2x = 2x \\ln(3) \\cdot 3^{x^2}' }
      ],
      finalAnswer: '2x ln(3) * 3^(x^2)',
      finalAnswerLatex: '2x\\ln(3) \\cdot 3^{x^2}'
    },
    commonMistakes: [
      'Treating a^x like a polynomial: d/dx[2^x] is 2^x ln 2, NOT x * 2^{x-1}!',
      'Forgetting the factor of ln(a) when base is not e.'
    ],
    relatedFormulaIds: ['diff_logarithmic', 'integ_exponential_functions'],
    practiceQuestions: [
      {
        id: 'q_diff_5',
        question: 'What is the derivative of e^(5x)?',
        options: ['5 e^(5x)', 'e^(5x)', '5x e^(5x-1)', 'e^5'],
        correctIndex: 0,
        explanation: 'By chain rule: e^(5x) * d/dx[5x] = 5 e^(5x).'
      }
    ],
    searchKeywords: ['derivative of e^x', 'derivative of a^x', 'natural exponential', 'exponential derivative'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[a^x] = a^x \\times ???',
      missingPart: '\\ln a',
      missingOptions: ['\\ln a', '\\log a', 'a', 'x'],
      recallPrompt: 'What factor multiplies a^x in its derivative?',
      identificationPrompt: 'Formula for: Derivative of General Exponential a^x.'
    }
  },
  {
    id: 'diff_logarithmic',
    name: 'Logarithmic Derivatives (ln x and log_a x)',
    subject: 'differential_calculus',
    category: 'Common Derivatives',
    topic: 'Logarithmic Functions',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[\\ln x] = \\frac{1}{x}, \\quad \\frac{d}{dx}[\\ln|u|] = \\frac{u\'}{u}, \\quad \\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}',
    variables: [
      { symbol: 'x, u', name: 'Argument', meaning: 'Must be positive in domain (or nonzero if inside absolute value)' },
      { symbol: 'a', name: 'Logarithm base', meaning: 'Positive base a > 0, a != 1' }
    ],
    conditions: [
      'x > 0 for standard domain; d/dx[ln|x|] = 1/x for all x != 0'
    ],
    whenToUse: 'Differentiating logarithms, simplifying messy products/powers via Logarithmic Differentiation.',
    workedExample: {
      problem: 'Find the derivative of f(x) = \\ln(x^3 + 4x).',
      steps: [
        { stepNum: 1, instruction: 'Use formula d/dx[ln(u)] = u\' / u', mathLatex: 'u = x^3 + 4x \\implies u\' = 3x^2 + 4' },
        { stepNum: 2, instruction: 'Assemble the quotient', mathLatex: 'f\'(x) = \\frac{3x^2 + 4}{x^3 + 4x}' }
      ],
      finalAnswer: '(3x^2 + 4) / (x^3 + 4x)',
      finalAnswerLatex: '\\frac{3x^2 + 4}{x^3 + 4x}'
    },
    commonMistakes: [
      'Forgetting the chain rule: writing d/dx[ln(x^2)] = 1/x^2 instead of 2x/x^2 = 2/x.',
      'Putting ln a in the numerator for log_a(x) instead of the denominator.'
    ],
    relatedFormulaIds: ['diff_logarithmic_diff', 'integ_logarithmic_functions'],
    practiceQuestions: [
      {
        id: 'q_diff_6',
        question: 'What is the derivative of ln(7x)?',
        options: ['1/x', '7/x', '1/(7x)', '7'],
        correctIndex: 0,
        explanation: 'd/dx[ln(7x)] = 7 / (7x) = 1/x (or rewrite ln(7x) = ln 7 + ln x, where ln 7 is a constant with derivative 0).'
      }
    ],
    searchKeywords: ['derivative of ln x', 'derivative of log', 'logarithmic derivative', '1/x'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[\\ln(u)] = \\frac{???}{u}',
      missingPart: 'u\'',
      missingOptions: ['u\'', '1', 'u^2', '\\ln u'],
      recallPrompt: 'What is the numerator in the chain rule derivative of ln(u)?',
      identificationPrompt: 'Formula for: Chain Rule Derivative of Natural Logarithm.'
    }
  },
  {
    id: 'diff_trigonometric',
    name: 'Derivatives of Trigonometric Functions',
    subject: 'differential_calculus',
    category: 'Common Derivatives',
    topic: 'Trigonometric Derivatives',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[\\sin x] = \\cos x, \\quad \\frac{d}{dx}[\\cos x] = -\\sin x, \\quad \\frac{d}{dx}[\\tan x] = \\sec^2 x, \\quad \\frac{d}{dx}[\\cot x] = -\\csc^2 x, \\quad \\frac{d}{dx}[\\sec x] = \\sec x\\tan x, \\quad \\frac{d}{dx}[\\csc x] = -\\csc x\\cot x',
    variables: [
      { symbol: 'x', name: 'Angle in radians', meaning: 'CALCULUS FORMULAS REQUIRE RADIAN MEASURE!' }
    ],
    conditions: [
      'Angles MUST be measured in RADIANS (otherwise extra factors of pi/180 appear)',
      'Pattern: Every "CO-" function (Cosine, Cotangent, Cosecant) has a NEGATIVE derivative!'
    ],
    whenToUse: 'Oscillations, wave equations, periodic motion, alternating currents, pendulum kinematics.',
    workedExample: {
      problem: 'Find the derivative of y = \\tan(4x) - \\sec(2x).',
      steps: [
        { stepNum: 1, instruction: 'Differentiate tan(4x) using chain rule: sec^2(4x) * 4', mathLatex: '\\frac{d}{dx}[\\tan(4x)] = 4\\sec^2(4x)' },
        { stepNum: 2, instruction: 'Differentiate sec(2x) using chain rule: sec(2x)tan(2x) * 2', mathLatex: '\\frac{d}{dx}[\\sec(2x)] = 2\\sec(2x)\\tan(2x)' },
        { stepNum: 3, instruction: 'Combine results', mathLatex: 'y\' = 4\\sec^2(4x) - 2\\sec(2x)\\tan(2x)' }
      ],
      finalAnswer: '4 sec^2(4x) - 2 sec(2x) tan(2x)',
      finalAnswerLatex: '4\\sec^2(4x) - 2\\sec(2x)\\tan(2x)'
    },
    commonMistakes: [
      'Forgetting the negative sign on derivatives of cosine, cotangent, and cosecant.',
      'Writing d/dx[tan x] = sec x instead of sec^2 x.'
    ],
    relatedFormulaIds: ['diff_inverse_trig', 'integ_trig_functions'],
    practiceQuestions: [
      {
        id: 'q_diff_7',
        question: 'What is the derivative of cos(3x)?',
        options: ['-3 sin(3x)', '3 sin(3x)', '-sin(3x)', '-3 cos(3x)'],
        correctIndex: 0,
        explanation: 'd/dx[cos(3x)] = -sin(3x) * 3 = -3 sin(3x).'
      }
    ],
    searchKeywords: ['derivative of sin', 'derivative of cos', 'derivative of tan', 'derivative of sec', 'trig derivatives'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[\\tan x] = ???',
      missingPart: '\\sec^2 x',
      missingOptions: ['\\sec^2 x', '\\sec x', '\\cot x', '-\\sec^2 x'],
      recallPrompt: 'What is the derivative of tan(x)?',
      identificationPrompt: 'Formula for: Derivative of Tangent.'
    }
  },
  {
    id: 'diff_inverse_trig',
    name: 'Derivatives of Inverse Trigonometric Functions',
    subject: 'differential_calculus',
    category: 'Common Derivatives',
    topic: 'Inverse Trig Derivatives',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}, \\quad \\frac{d}{dx}[\\arccos x] = \\frac{-1}{\\sqrt{1-x^2}}, \\quad \\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}, \\quad \\frac{d}{dx}[\\operatorname{arcsec} x] = \\frac{1}{|x|\\sqrt{x^2-1}}',
    variables: [
      { symbol: 'x', name: 'Input ratio', meaning: '|x| < 1 for arcsin and arccos; all real x for arctan' }
    ],
    conditions: [
      '|x| < 1 for arcsin and arccos (derivative has vertical asymptotes at x = +/- 1)',
      'x in R for arctan (positive and bounded everywhere)'
    ],
    whenToUse: 'Integrating rational functions and square root quadratic terms, angle-of-sight tracking problems.',
    workedExample: {
      problem: 'Find the derivative of f(x) = \\arctan(3x).',
      steps: [
        { stepNum: 1, instruction: 'Use chain rule with u = 3x: d/dx[arctan(u)] = u\' / (1 + u^2)', mathLatex: 'u = 3x \\implies u\' = 3' },
        { stepNum: 2, instruction: 'Substitute into formula', mathLatex: 'f\'(x) = \\frac{3}{1 + (3x)^2} = \\frac{3}{1 + 9x^2}' }
      ],
      finalAnswer: '3 / (1 + 9x^2)',
      finalAnswerLatex: '\\frac{3}{1 + 9x^2}'
    },
    commonMistakes: [
      'Squaring 3x as 3x^2 instead of 9x^2 in 1 + (3x)^2.',
      'Putting a radical inside arctan\'s derivative (arctan has NO square root: 1/(1+x^2)).'
    ],
    relatedFormulaIds: ['integ_trig_substitution', 'trig_inverse_relationships'],
    practiceQuestions: [
      {
        id: 'q_diff_8',
        question: 'What is the derivative of arctan(x) at x = 1?',
        options: ['1/2', '1', 'pi/4', '0'],
        correctIndex: 0,
        explanation: 'f\'(x) = 1 / (1 + x^2). At x = 1, f\'(1) = 1 / (1 + 1^2) = 1/2.'
      }
    ],
    searchKeywords: ['derivative of arctan', 'derivative of arcsin', 'derivative of arccos', 'inverse trig derivatives'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[\\arctan x] = \\frac{1}{???}',
      missingPart: '1 + x^2',
      missingOptions: ['1 + x^2', '\\sqrt{1 - x^2}', '1 - x^2', 'x^2 - 1'],
      recallPrompt: 'What is the denominator in the derivative of arctan(x)?',
      identificationPrompt: 'Formula for: Derivative of Arctangent.'
    }
  },
  {
    id: 'diff_hyperbolic',
    name: 'Derivatives of Hyperbolic Functions',
    subject: 'differential_calculus',
    category: 'Common Derivatives',
    topic: 'Hyperbolic Functions',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[\\sinh x] = \\cosh x, \\quad \\frac{d}{dx}[\\cosh x] = \\sinh x, \\quad \\frac{d}{dx}[\\tanh x] = \\operatorname{sech}^2 x, \\quad \\cosh^2 x - \\sinh^2 x = 1',
    variables: [
      { symbol: '\\sinh x', name: 'Hyperbolic sine', meaning: '\\sinh x = (e^x - e^{-x})/2' },
      { symbol: '\\cosh x', name: 'Hyperbolic cosine', meaning: '\\cosh x = (e^x + e^{-x})/2' },
      { symbol: '\\tanh x', name: 'Hyperbolic tangent', meaning: '\\tanh x = \\sinh x / \\cosh x' }
    ],
    conditions: [
      'CRUCIAL DIFFERENCE from circular trig: d/dx[cosh x] = +sinh x (NO MINUS SIGN!)',
      'Fundamental hyperbolic identity: cosh^2 x - sinh^2 x = 1'
    ],
    whenToUse: 'Catenary curves (hanging power cables), relativistic spacetime rapidity, fluid mechanics.',
    workedExample: {
      problem: 'Differentiate y = \\cosh(3x^2).',
      steps: [
        { stepNum: 1, instruction: 'Apply chain rule with u = 3x^2', mathLatex: 'u = 3x^2 \\implies u\' = 6x' },
        { stepNum: 2, instruction: 'Differentiate outer hyperbolic function: d/du[cosh u] = sinh u', mathLatex: '\\frac{dy}{du} = \\sinh(3x^2)' },
        { stepNum: 3, instruction: 'Multiply by u\'', mathLatex: 'y\' = 6x\\sinh(3x^2)' }
      ],
      finalAnswer: '6x sinh(3x^2)',
      finalAnswerLatex: '6x\\sinh(3x^2)'
    },
    commonMistakes: [
      'Putting a negative sign on d/dx[cosh x] (unlike cos x, the derivative of cosh x is POSITIVE sinh x).',
      'Confusing cosh^2 x - sinh^2 x = 1 with cos^2 x + sin^2 x = 1.'
    ],
    relatedFormulaIds: ['diff_trigonometric', 'diff_exponential'],
    practiceQuestions: [
      {
        id: 'q_diff_9',
        question: 'What is d/dx[sinh(x)]?',
        options: ['cosh(x)', '-cosh(x)', 'tanh(x)', 'sech(x)'],
        correctIndex: 0,
        explanation: 'd/dx[sinh x] = cosh x.'
      }
    ],
    searchKeywords: ['hyperbolic derivatives', 'sinh', 'cosh', 'tanh', 'catenary'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[\\cosh x] = ???',
      missingPart: '\\sinh x',
      missingOptions: ['\\sinh x', '-\\sinh x', '\\cosh x', '\\operatorname{sech}^2 x'],
      recallPrompt: 'What is the derivative of cosh(x)? (Watch the sign!)',
      identificationPrompt: 'Formula for: Derivative of Hyperbolic Cosine.'
    }
  },

  // ─── ADVANCED DIFFERENTIATION ───
  {
    id: 'diff_implicit_differentiation',
    name: 'Implicit Differentiation',
    subject: 'differential_calculus',
    category: 'Advanced Differentiation',
    topic: 'Implicit Curves',
    difficulty: 'Advanced',
    latex: '\\frac{d}{dx}[F(x, y) = 0] \\implies \\frac{dy}{dx} = -\\frac{F_x}{F_y} = -\\frac{\\partial F / \\partial x}{\\partial F / \\partial y}',
    variables: [
      { symbol: 'y', name: 'Implicit dependent function', meaning: 'Treated as an unknown function y(x); requires chain rule dy/dx whenever differentiated' },
      { symbol: 'F_x, F_y', name: 'Partial derivatives', meaning: 'Partial derivatives treating y and x as constant respectively' }
    ],
    conditions: [
      'F_y = \\partial F / \\partial y \\neq 0 (points where F_y = 0 have vertical tangents)'
    ],
    whenToUse: 'Finding slopes on curves where y cannot be solved explicitly for x (e.g. Folium of Descartes x^3 + y^3 = 6xy, circles x^2 + y^2 = r^2).',
    workedExample: {
      problem: 'Find dy/dx for the circle x^2 + y^2 = 25 at the point (3, 4).',
      steps: [
        { stepNum: 1, instruction: 'Differentiate both sides with respect to x, treating y as y(x)', mathLatex: '\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25]' },
        { stepNum: 2, instruction: 'Apply chain rule to y^2: d/dx[y^2] = 2y (dy/dx)', mathLatex: '2x + 2y\\frac{dy}{dx} = 0' },
        { stepNum: 3, instruction: 'Solve for dy/dx', mathLatex: '2y\\frac{dy}{dx} = -2x \\implies \\frac{dy}{dx} = -\\frac{x}{y}' },
        { stepNum: 4, instruction: 'Evaluate at (3, 4)', mathLatex: '\\left.\\frac{dy}{dx}\\right|_{(3,4)} = -\\frac{3}{4}' }
      ],
      finalAnswer: 'dy/dx = -x/y = -3/4',
      finalAnswerLatex: '\\frac{dy}{dx} = -\\frac{x}{y} = -\\frac{3}{4}'
    },
    commonMistakes: [
      'Forgetting to attach dy/dx when differentiating any y term (e.g. writing d/dx[y^3] = 3y^2 instead of 3y^2 dy/dx).',
      'Forgetting to use product rule on mixed terms like xy: d/dx[xy] = 1*y + x(dy/dx).'
    ],
    relatedFormulaIds: ['diff_chain_rule', 'diff_tangent_normal_lines'],
    practiceQuestions: [
      {
        id: 'q_diff_10',
        question: 'Differentiate x^2 + y^2 = 1 to find dy/dx.',
        options: ['-x/y', 'x/y', '-y/x', '2x + 2y'],
        correctIndex: 0,
        explanation: '2x + 2y(dy/dx) = 0 => dy/dx = -2x / (2y) = -x/y.'
      }
    ],
    searchKeywords: ['implicit differentiation', 'dy/dx', 'tangent to curve', 'circle slope', 'partial derivative shortcut'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[y^2] = 2y \\times ???',
      missingPart: '\\frac{dy}{dx}',
      missingOptions: ['\\frac{dy}{dx}', '1', '2', 'x'],
      recallPrompt: 'What factor attaches to 2y by the chain rule when differentiating y^2 with respect to x?',
      identificationPrompt: 'Formula for: Implicit Differentiation of y^2.'
    }
  },
  {
    id: 'diff_logarithmic_diff',
    name: 'Logarithmic Differentiation',
    subject: 'differential_calculus',
    category: 'Advanced Differentiation',
    topic: 'Variable Exponents',
    difficulty: 'Advanced',
    latex: 'y = f(x)^{g(x)} \\implies \\ln y = g(x)\\ln f(x) \\implies y\' = y \\left[ g\'(x)\\ln f(x) + g(x)\\frac{f\'(x)}{f(x)} \\right]',
    variables: [
      { symbol: 'f(x)^{g(x)}', name: 'Variable base and variable exponent', meaning: 'Neither Power Rule nor Exponential Rule alone applies!' }
    ],
    conditions: [
      'f(x) > 0 so that natural logarithm ln(f(x)) is well-defined'
    ],
    whenToUse: 'Functions of the form x^x, x^{sin x}, or huge rational products with multiple square roots and factors.',
    workedExample: {
      problem: 'Find the derivative of y = x^x for x > 0.',
      steps: [
        { stepNum: 1, instruction: 'Take natural log of both sides', mathLatex: '\\ln y = \\ln(x^x) = x\\ln x' },
        { stepNum: 2, instruction: 'Differentiate both sides implicitly with respect to x', mathLatex: '\\frac{1}{y} y\' = (1)\\ln x + x\\left(\\frac{1}{x}\\right) = \\ln x + 1' },
        { stepNum: 3, instruction: 'Multiply by y and substitute back y = x^x', mathLatex: 'y\' = y(\\ln x + 1) = x^x(\\ln x + 1)' }
      ],
      finalAnswer: 'x^x (ln x + 1)',
      finalAnswerLatex: 'x^x(\\ln x + 1)'
    },
    commonMistakes: [
      'Attempting to use power rule d/dx[x^x] = x * x^{x-1} = x^x (WRONG).',
      'Forgetting to multiply the final bracket by y to solve for y\'.'
    ],
    relatedFormulaIds: ['diff_logarithmic', 'diff_exponential'],
    practiceQuestions: [
      {
        id: 'q_diff_11',
        question: 'What is the derivative of x^x at x = 1?',
        options: ['1', '0', 'e', '2'],
        correctIndex: 0,
        explanation: 'y\' = x^x (ln x + 1). At x = 1: 1^1 * (ln 1 + 1) = 1 * (0 + 1) = 1.'
      }
    ],
    searchKeywords: ['logarithmic differentiation', 'derivative of x^x', 'variable to variable power', 'ln y'],
    memoryCard: {
      clozeLatex: '\\frac{d}{dx}[x^x] = x^x (??? + 1)',
      missingPart: '\\ln x',
      missingOptions: ['\\ln x', 'x', '\\frac{1}{x}', 'e^x'],
      recallPrompt: 'What term adds to 1 inside the parenthesis in d/dx[x^x] = x^x(... + 1)?',
      identificationPrompt: 'Formula for: Derivative of x^x via Logarithmic Differentiation.'
    }
  },
  {
    id: 'diff_parametric_higher_order',
    name: 'Parametric and Higher-Order Derivatives',
    subject: 'differential_calculus',
    category: 'Advanced Differentiation',
    topic: 'Parametric & Higher Derivatives',
    difficulty: 'Advanced',
    latex: '\\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)}, \\quad \\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{x\'(t)}, \\quad (f^{-1})\'(a) = \\frac{1}{f\'(f^{-1}(a))}',
    variables: [
      { symbol: 'x(t), y(t)', name: 'Parametric equations', meaning: 'Coordinates defined as functions of parameter t' },
      { symbol: 'd^2y/dx^2', name: 'Second derivative', meaning: 'Rate of change of slope with respect to x (concavity)' },
      { symbol: 'f^{-1}', name: 'Inverse function', meaning: 'Function satisfying f(f^{-1}(x)) = x' }
    ],
    conditions: [
      'x\'(t) \\neq 0',
      'For second parametric derivative: d^2y/dx^2 is NOT simply y\'\'(t) / x\'\'(t)!'
    ],
    whenToUse: 'Physics trajectories (position parameterized by time t), projectile motion, curvature calculations.',
    workedExample: {
      problem: 'A curve is given by x = t^2, y = t^3. Find dy/dx and d^2y/dx^2 in terms of t.',
      steps: [
        { stepNum: 1, instruction: 'Find dx/dt and dy/dt', mathLatex: 'x\'(t) = 2t, \\quad y\'(t) = 3t^2' },
        { stepNum: 2, instruction: 'Calculate first derivative dy/dx = y\'(t) / x\'(t)', mathLatex: '\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3}{2}t' },
        { stepNum: 3, instruction: 'Differentiate dy/dx with respect to t', mathLatex: '\\frac{d}{dt}\\left(\\frac{3}{2}t\\right) = \\frac{3}{2}' },
        { stepNum: 4, instruction: 'Divide by dx/dt to find d^2y/dx^2', mathLatex: '\\frac{d^2y}{dx^2} = \\frac{3/2}{2t} = \\frac{3}{4t}' }
      ],
      finalAnswer: 'dy/dx = (3/2)t, d^2y/dx^2 = 3 / (4t)',
      finalAnswerLatex: '\\frac{dy}{dx} = \\frac{3}{2}t, \\quad \\frac{d^2y}{dx^2} = \\frac{3}{4t}'
    },
    commonMistakes: [
      'Computing d^2y/dx^2 as y\'\'(t) / x\'\'(t): here 6t / 2 = 3t is WRONG; the true answer is 3 / (4t)!',
      'Forgetting to divide by dx/dt during the second derivative step.'
    ],
    relatedFormulaIds: ['diff_tangent_normal_lines', 'diff_implicit_differentiation'],
    practiceQuestions: [
      {
        id: 'q_diff_12',
        question: 'If x = cos(t) and y = sin(t), what is dy/dx?',
        options: ['-cot(t)', '-tan(t)', 'cot(t)', 'tan(t)'],
        correctIndex: 0,
        explanation: 'dy/dx = (dy/dt) / (dx/dt) = cos(t) / (-sin(t)) = -cot(t).'
      }
    ],
    searchKeywords: ['parametric differentiation', 'second derivative parametric', 'inverse function derivative', 'd2y/dx2'],
    memoryCard: {
      clozeLatex: '\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}[dy/dx]}{???}',
      missingPart: 'x\'(t)',
      missingOptions: ['x\'(t)', 'x\'\'(t)', 't', 'y\'(t)'],
      recallPrompt: 'What is in the denominator of the second parametric derivative d^2y/dx^2?',
      identificationPrompt: 'Formula for: Second Derivative in Parametric Form.'
    }
  },

  // ─── APPLICATIONS ───
  {
    id: 'diff_tangent_normal_lines',
    name: 'Tangent Line and Normal Line Equations',
    subject: 'differential_calculus',
    category: 'Applications',
    topic: 'Tangent & Normal Lines',
    difficulty: 'Beginner',
    latex: '\\text{Tangent: } y - y_0 = f\'(x_0)(x - x_0), \\quad \\text{Normal: } y - y_0 = -\\frac{1}{f\'(x_0)}(x - x_0)',
    variables: [
      { symbol: '(x_0, y_0)', name: 'Point of tangency', meaning: 'Point on curve: y_0 = f(x_0)' },
      { symbol: 'f\'(x_0)', name: 'Tangent slope', meaning: 'Instantaneous slope m_tan = f\'(x_0)' },
      { symbol: '-1/f\'(x_0)', name: 'Normal slope', meaning: 'Perpendicular slope m_norm = -1/m_tan' }
    ],
    conditions: [
      'f must be differentiable at x_0',
      'If f\'(x_0) = 0, tangent is horizontal (y = y_0) and normal is vertical (x = x_0)'
    ],
    whenToUse: 'Linearization, optics (angle of incidence to surface normal), mechanics tangents.',
    workedExample: {
      problem: 'Find equations of the tangent and normal lines to f(x) = x^2 at x = 3.',
      steps: [
        { stepNum: 1, instruction: 'Find the point: evaluate f(3)', mathLatex: 'y_0 = f(3) = 3^2 = 9 \\implies (3, 9)' },
        { stepNum: 2, instruction: 'Find tangent slope: evaluate f\'(3)', mathLatex: 'f\'(x) = 2x \\implies m_{\\text{tan}} = 2(3) = 6' },
        { stepNum: 3, instruction: 'Write tangent line in point-slope form', mathLatex: 'y - 9 = 6(x - 3) \\implies y = 6x - 9' },
        { stepNum: 4, instruction: 'Find normal slope and write normal line', mathLatex: 'm_{\\text{norm}} = -\\frac{1}{6} \\implies y - 9 = -\\frac{1}{6}(x - 3) \\implies y = -\\frac{1}{6}x + \\frac{19}{2}' }
      ],
      finalAnswer: 'Tangent: y = 6x - 9; Normal: y = -x/6 + 19/2',
      finalAnswerLatex: '\\text{Tangent: } y = 6x - 9, \\quad \\text{Normal: } y = -\\frac{1}{6}x + 9.5'
    },
    commonMistakes: [
      'Plugging x into f\'(x) to get y_0 instead of into f(x).',
      'Forgetting the negative reciprocal sign for the normal line.'
    ],
    relatedFormulaIds: ['diff_linear_approximation_differentials', 'geom_coordinate_geometry'],
    practiceQuestions: [
      {
        id: 'q_diff_13',
        question: 'What is the slope of the normal line to y = x^3 at x = 1?',
        options: ['-1/3', '3', '-3', '1/3'],
        correctIndex: 0,
        explanation: 'f\'(x) = 3x^2 => f\'(1) = 3. Normal slope is -1/3.'
      }
    ],
    searchKeywords: ['tangent line', 'normal line', 'point-slope form', 'slope of curve'],
    memoryCard: {
      clozeLatex: 'm_{\\text{normal}} = -\\frac{1}{???}',
      missingPart: 'f\'(x_0)',
      missingOptions: ['f\'(x_0)', 'f(x_0)', 'x_0', 'f\'\'(x_0)'],
      recallPrompt: 'What is the relationship between the slope of the normal line and the tangent derivative?',
      identificationPrompt: 'Formula for: Normal Line Slope.'
    }
  },
  {
    id: 'diff_extrema_concavity_mvt',
    name: 'Critical Points, Extrema, Concavity & Mean Value Theorem',
    subject: 'differential_calculus',
    category: 'Applications',
    topic: 'Curve Sketching & Theorems',
    difficulty: 'Intermediate',
    latex: 'f\'(c) = 0 \\text{ or undefined } (\\text{Critical Pt}), \\quad f\'\'(c) > 0 \\implies \\text{Min}, \\; f\'\'(c) < 0 \\implies \\text{Max}, \\quad f\'(c) = \\frac{f(b) - f(a)}{b - a} \\; (\\text{MVT})',
    variables: [
      { symbol: 'c', name: 'Critical value / Intermediate point', meaning: 'c in (a, b)' },
      { symbol: 'f\'\'(x)', name: 'Second derivative', meaning: 'Measures concavity and bending rate' }
    ],
    conditions: [
      'For MVT: f must be continuous on [a, b] and differentiable on (a, b)',
      'Inflection point: Point where concavity changes sign (f\'\'(x) changes between + and -)'
    ],
    whenToUse: 'Optimization (maximizing profit, minimizing material), curve sketching, proving inequalities, rate validation.',
    workedExample: {
      problem: 'Find the local extrema of f(x) = x^3 - 3x + 2 using the Second Derivative Test.',
      steps: [
        { stepNum: 1, instruction: 'Find first derivative and critical points f\'(x) = 0', mathLatex: 'f\'(x) = 3x^2 - 3 = 0 \\implies 3(x^2 - 1) = 0 \\implies x = 1, -1' },
        { stepNum: 2, instruction: 'Compute second derivative f\'\'(x)', mathLatex: 'f\'\'(x) = 6x' },
        { stepNum: 3, instruction: 'Evaluate at critical points', mathLatex: 'f\'\'(1) = 6 > 0 \\implies \\text{Local Min at } x = 1; \\quad f\'\'(-1) = -6 < 0 \\implies \\text{Local Max at } x = -1' }
      ],
      finalAnswer: 'Local Min at x = 1 (value 0), Local Max at x = -1 (value 4)',
      finalAnswerLatex: '\\text{Min at } (1, 0), \\quad \\text{Max at } (-1, 4)'
    },
    commonMistakes: [
      'Assuming f\'(c) = 0 is automatically an extremum: f(x) = x^3 has f\'(0) = 0, but is neither a min nor a max (inflection point)!',
      'Forgetting to verify continuity and differentiability before invoking the Mean Value Theorem.'
    ],
    relatedFormulaIds: ['diff_tangent_normal_lines', 'diff_linear_approximation_differentials'],
    practiceQuestions: [
      {
        id: 'q_diff_14',
        question: 'If f\'\'(2) = -5 at a critical point where f\'(2) = 0, what can we conclude?',
        options: ['Local maximum at x = 2', 'Local minimum at x = 2', 'Inflection point', 'Test is inconclusive'],
        correctIndex: 0,
        explanation: 'By the Second Derivative Test, f\'\'(c) < 0 indicates concave down, so it is a local maximum.'
      }
    ],
    searchKeywords: ['critical points', 'local extrema', 'concavity', 'inflection point', 'Mean Value Theorem', 'MVT', 'Rolles theorem'],
    memoryCard: {
      clozeLatex: 'f\'(c) = \\frac{f(b) - f(a)}{???} \\quad (\\text{Mean Value Theorem})',
      missingPart: 'b - a',
      missingOptions: ['b - a', '2', 'a - b', '(b - a)^2'],
      recallPrompt: 'What is the denominator in the secant slope of the Mean Value Theorem?',
      identificationPrompt: 'Formula for: Mean Value Theorem (MVT).'
    }
  },
  {
    id: 'diff_linear_approximation_differentials',
    name: 'Linear Approximation and Differentials',
    subject: 'differential_calculus',
    category: 'Applications',
    topic: 'Approximations',
    difficulty: 'Intermediate',
    latex: 'L(x) = f(a) + f\'(a)(x - a), \\quad dy = f\'(x) \\, dx, \\quad \\Delta y \\approx dy',
    variables: [
      { symbol: 'L(x)', name: 'Linear approximation', meaning: 'Tangent line approximation near x = a' },
      { symbol: 'dy', name: 'Differential of y', meaning: 'Approximate change along tangent line' },
      { symbol: '\\Delta y', name: 'Actual change', meaning: 'f(x + dx) - f(x)' },
      { symbol: 'dx', name: 'Differential of x', meaning: 'Small increment / error in input' }
    ],
    conditions: [
      'Valid for x close to a (|x - a| is small)'
    ],
    whenToUse: 'Estimating square roots and non-linear values without a calculator, error propagation in experimental physics.',
    workedExample: {
      problem: 'Use linear approximation to estimate \\sqrt{9.2}.',
      steps: [
        { stepNum: 1, instruction: 'Choose function f(x) = sqrt(x) and anchor point a = 9 (close to 9.2 with known exact value)', mathLatex: 'f(x) = \\sqrt{x}, \\quad a = 9 \\implies f(9) = 3' },
        { stepNum: 2, instruction: 'Compute derivative f\'(a)', mathLatex: 'f\'(x) = \\frac{1}{2\\sqrt{x}} \\implies f\'(9) = \\frac{1}{2(3)} = \\frac{1}{6}' },
        { stepNum: 3, instruction: 'Construct linear approximation L(x) = f(a) + f\'(a)(x - a)', mathLatex: 'L(9.2) = 3 + \\frac{1}{6}(9.2 - 9) = 3 + \\frac{1}{6}(0.2) = 3 + \\frac{1}{30} = 3.0333...' }
      ],
      finalAnswer: '3.0333 (actual sqrt(9.2) ~ 3.03315)',
      finalAnswerLatex: 'L(9.2) = 3.0333...'
    },
    commonMistakes: [
      'Choosing an anchor point a too far from the desired x value, causing large linear truncation error.',
      'Confusing actual change Delta y with differential dy.'
    ],
    relatedFormulaIds: ['diff_tangent_normal_lines', 'adv_taylor_series'],
    practiceQuestions: [
      {
        id: 'q_diff_15',
        question: 'If f(4) = 5 and f\'(4) = 2, what is the linear approximation L(4.1)?',
        options: ['5.2', '5.1', '5.4', '7'],
        correctIndex: 0,
        explanation: 'L(4.1) = f(4) + f\'(4)*(4.1 - 4) = 5 + 2*(0.1) = 5 + 0.2 = 5.2.'
      }
    ],
    searchKeywords: ['linear approximation', 'differentials', 'tangent line approximation', 'error propagation'],
    memoryCard: {
      clozeLatex: 'L(x) = f(a) + ??? \\cdot (x - a)',
      missingPart: 'f\'(a)',
      missingOptions: ['f\'(a)', 'f(a)', 'f\'\'(a)', '1'],
      recallPrompt: 'What slope coefficient multiplies (x - a) in the linear approximation formula?',
      identificationPrompt: 'Formula for: Linear Approximation.'
    }
  }
];
