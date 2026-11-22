import { Question } from '../../types';

export const calculusQuestions: Question[] = [
  // 1. LIMITS & CONTINUITY
  {
    id: 'lim_001',
    subjectId: 'differential_calculus',
    subtopic: 'Limits & Continuity',
    difficulty: 'FOUNDATION',
    type: 'multiple_choice',
    prompt: 'Evaluate the algebraic limit: lim_{x -> 3} (x^2 - 9) / (x - 3).',
    latexPrompt: '\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}',
    options: [
      { id: 'a', text: '0', latex: '0' },
      { id: 'b', text: '3', latex: '3' },
      { id: 'c', text: '6', latex: '6' },
      { id: 'd', text: 'Undefined', latex: '\\text{Undefined}' }
    ],
    correctAnswer: 'c',
    acceptableAnswers: ['c', '6'],
    hints: [
      'Direct substitution gives 0/0, an indeterminate form.',
      'Factor the difference of squares in the numerator.',
      'Cancel the common factor (x - 3) before evaluating at x = 3.'
    ],
    solution: {
      ruleOrTechnique: 'Factoring Difference of Squares & Cancellation',
      whyItApplies: 'Direct evaluation produces indeterminate form 0/0. Factoring isolates the removable zero factor.',
      steps: [
        {
          stepNumber: 1,
          title: 'Direct Substitution Check',
          explanation: 'At x = 3, (3^2 - 9)/(3 - 3) = 0/0, indicating a removable singularity.'
        },
        {
          stepNumber: 2,
          title: 'Factor Numerator',
          explanation: 'x^2 - 9 = (x - 3)(x + 3).',
          mathExpression: '\\frac{(x - 3)(x + 3)}{x - 3}'
        },
        {
          stepNumber: 3,
          title: 'Cancel Common Factor',
          explanation: 'Since x approaches 3 but x != 3, (x - 3)/(x - 3) = 1.',
          mathExpression: '\\lim_{x \\to 3} (x + 3)'
        },
        {
          stepNumber: 4,
          title: 'Evaluate',
          explanation: '3 + 3 = 6.',
          mathExpression: '6'
        }
      ],
      finalAnswerLatex: '6',
      verification: 'L\'Hôpital\'s Rule: d/dx(x^2 - 9) / d/dx(x - 3) = 2x / 1. At x = 3: 2(3) = 6.'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'lim_002',
    subjectId: 'differential_calculus',
    subtopic: 'Trigonometric Limits',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Evaluate the trigonometric limit: lim_{x -> 0} (sin(7x)) / (2x).',
    latexPrompt: '\\lim_{x \\to 0} \\frac{\\sin(7x)}{2x}',
    options: [
      { id: 'a', text: '7/2', latex: '\\frac{7}{2}' },
      { id: 'b', text: '2/7', latex: '\\frac{2}{7}' },
      { id: 'c', text: '0', latex: '0' },
      { id: 'd', text: '1', latex: '1' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a', '7/2', '3.5'],
    hints: [
      'Recall the fundamental limit lim_{theta -> 0} sin(theta)/theta = 1.',
      'Multiply and divide the argument by 7 to match the sine argument.'
    ],
    solution: {
      ruleOrTechnique: 'Fundamental Trigonometric Limit',
      whyItApplies: 'As x -> 0, sin(7x) -> 0 and 2x -> 0. The standard limit lim_{u -> 0} sin(u)/u = 1 applies.',
      steps: [
        {
          stepNumber: 1,
          title: 'Factor Constants',
          explanation: 'Extract 1/2 from the limit: (1/2) * lim_{x -> 0} [sin(7x) / x].',
          mathExpression: '\\frac{1}{2} \\lim_{x \\to 0} \\frac{\\sin(7x)}{x}'
        },
        {
          stepNumber: 2,
          title: 'Adjust Argument',
          explanation: 'Multiply and divide by 7: (7/2) * lim_{x -> 0} [sin(7x) / (7x)].',
          mathExpression: '\\frac{7}{2} \\lim_{7x \\to 0} \\frac{\\sin(7x)}{7x}'
        },
        {
          stepNumber: 3,
          title: 'Apply Standard Limit',
          explanation: 'lim_{u -> 0} sin(u)/u = 1 with u = 7x.',
          mathExpression: '\\frac{7}{2} \\times 1 = \\frac{7}{2}'
        }
      ],
      finalAnswerLatex: '\\frac{7}{2}',
      verification: 'L\'Hôpital: d/dx[sin(7x)] / d/dx[2x] = 7 cos(7x) / 2. At x = 0: 7 cos(0)/2 = 7/2.'
    },
    errorCategoryIfWrong: 'conceptual'
  },
  {
    id: 'lim_003',
    subjectId: 'differential_calculus',
    subtopic: 'L\'Hôpital\'s Rule',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Evaluate the limit: lim_{x -> 0} (e^(2x) - 1 - 2x) / x^2.',
    latexPrompt: '\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x}{x^2}',
    options: [
      { id: 'a', text: '1', latex: '1' },
      { id: 'b', text: '2', latex: '2' },
      { id: 'c', text: '4', latex: '4' },
      { id: 'd', text: '0', latex: '0' }
    ],
    correctAnswer: 'b',
    acceptableAnswers: ['b', '2'],
    hints: [
      'Check form: e^0 - 1 - 0 = 0, denominator = 0. Indeterminate form 0/0.',
      'Differentiate top and bottom once. If still 0/0, differentiate a second time.'
    ],
    solution: {
      ruleOrTechnique: 'Repeated L\'Hôpital\'s Rule (0/0 form)',
      whyItApplies: 'Direct evaluation yields 0/0 twice consecutively.',
      steps: [
        {
          stepNumber: 1,
          title: 'First Application of L\'Hôpital',
          explanation: 'Differentiate numerator and denominator: d/dx(e^(2x) - 1 - 2x) = 2e^(2x) - 2. d/dx(x^2) = 2x.',
          mathExpression: '\\lim_{x \\to 0} \\frac{2e^{2x} - 2}{2x}'
        },
        {
          stepNumber: 2,
          title: 'Second Check',
          explanation: 'At x = 0: (2 - 2)/0 = 0/0. Apply L\'Hôpital again.'
        },
        {
          stepNumber: 3,
          title: 'Second Differentiation',
          explanation: 'd/dx(2e^(2x) - 2) = 4e^(2x). d/dx(2x) = 2.',
          mathExpression: '\\lim_{x \\to 0} \\frac{4e^{2x}}{2} = \\frac{4e^0}{2} = 2'
        }
      ],
      finalAnswerLatex: '2',
      verification: 'Taylor series expansion: e^(2x) = 1 + 2x + (2x)^2/2! + ... = 1 + 2x + 2x^2 + O(x^3). Subtracting 1 + 2x gives 2x^2. Dividing by x^2 gives exactly 2.'
    },
    errorCategoryIfWrong: 'calculation'
  },
  {
    id: 'lim_004',
    subjectId: 'differential_calculus',
    subtopic: 'Limits at Infinity',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Evaluate: lim_{x -> infinity} (sqrt(x^2 + 6x) - x).',
    latexPrompt: '\\lim_{x \\to \\infty} \\left( \\sqrt{x^2 + 6x} - x \\right)',
    options: [
      { id: 'a', text: '0', latex: '0' },
      { id: 'b', text: '3', latex: '3' },
      { id: 'c', text: '6', latex: '6' },
      { id: 'd', text: 'Infinity', latex: '\\infty' }
    ],
    correctAnswer: 'b',
    acceptableAnswers: ['b', '3'],
    hints: [
      'This has indeterminate form infinity - infinity.',
      'Multiply and divide by the conjugate radical expression sqrt(x^2 + 6x) + x.'
    ],
    solution: {
      ruleOrTechnique: 'Conjugate Multiplication',
      whyItApplies: 'Eliminates the difference of square roots to transform infinity - infinity into a rational expression.',
      steps: [
        {
          stepNumber: 1,
          title: 'Multiply by Conjugate',
          explanation: 'Multiply top and bottom by sqrt(x^2 + 6x) + x.',
          mathExpression: '\\frac{(\\sqrt{x^2+6x}-x)(\\sqrt{x^2+6x}+x)}{\\sqrt{x^2+6x}+x}'
        },
        {
          stepNumber: 2,
          title: 'Simplify Numerator',
          explanation: '(x^2 + 6x) - x^2 = 6x.',
          mathExpression: '\\frac{6x}{\\sqrt{x^2+6x}+x}'
        },
        {
          stepNumber: 3,
          title: 'Divide by x',
          explanation: 'Divide top and bottom by x: 6 / (sqrt(1 + 6/x) + 1). As x -> inf, 6/x -> 0.',
          mathExpression: '\\frac{6}{\\sqrt{1 + 0} + 1} = \\frac{6}{2} = 3'
        }
      ],
      finalAnswerLatex: '3'
    },
    errorCategoryIfWrong: 'algebraic'
  },

  // 2. DIFFERENTIATION RULES
  {
    id: 'diff_001',
    subjectId: 'differential_calculus',
    subtopic: 'Product & Chain Rule',
    difficulty: 'BEGINNER',
    type: 'multiple_choice',
    prompt: 'Find the derivative of f(x) = x^3 * e^(2x).',
    latexPrompt: 'f(x) = x^3 e^{2x} \\implies f\'(x) = ?',
    options: [
      { id: 'a', text: '3x^2 * e^(2x)', latex: '3x^2 e^{2x}' },
      { id: 'b', text: 'x^2 * e^(2x) * (3 + 2x)', latex: 'x^2 e^{2x}(3 + 2x)' },
      { id: 'c', text: '6x^2 * e^(2x)', latex: '6x^2 e^{2x}' },
      { id: 'd', text: 'x^3 * 2e^(2x)', latex: '2x^3 e^{2x}' }
    ],
    correctAnswer: 'b',
    acceptableAnswers: ['b'],
    hints: [
      'Apply Product Rule: (u * v)\' = u\' * v + u * v\'.',
      'Don\'t forget the Chain Rule when differentiating e^(2x): derivative is 2e^(2x).'
    ],
    solution: {
      ruleOrTechnique: 'Product Rule & Exponential Chain Rule',
      whyItApplies: 'f(x) is a product of an algebraic term x^3 and an exponential term e^(2x).',
      steps: [
        {
          stepNumber: 1,
          title: 'Identify Factors',
          explanation: 'u = x^3 -> u\' = 3x^2. v = e^(2x) -> v\' = 2e^(2x).',
          mathExpression: 'u\' = 3x^2, \\quad v\' = 2e^{2x}'
        },
        {
          stepNumber: 2,
          title: 'Apply Product Rule',
          explanation: 'f\'(x) = (3x^2)(e^(2x)) + (x^3)(2e^(2x)).',
          mathExpression: '3x^2 e^{2x} + 2x^3 e^{2x}'
        },
        {
          stepNumber: 3,
          title: 'Factor Common Terms',
          explanation: 'Factor out x^2 e^(2x): x^2 e^(2x) (3 + 2x).',
          mathExpression: 'x^2 e^{2x}(3 + 2x)'
        }
      ],
      finalAnswerLatex: 'x^2 e^{2x}(3 + 2x)',
      verification: 'Differentiating each term separately confirmed via logarithmic differentiation: ln(y) = 3 ln(x) + 2x -> y\'/y = 3/x + 2 -> y\' = x^3 e^(2x)(3/x + 2) = x^2 e^(2x)(3 + 2x).'
    },
    errorCategoryIfWrong: 'conceptual'
  },
  {
    id: 'diff_002',
    subjectId: 'differential_calculus',
    subtopic: 'Quotient Rule',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Find the derivative of g(x) = (2x + 1) / (x^2 + 1).',
    latexPrompt: 'g(x) = \\frac{2x + 1}{x^2 + 1} \\implies g\'(x) = ?',
    options: [
      { id: 'a', text: '(-2x^2 - 2x + 2) / (x^2 + 1)^2', latex: '\\frac{-2x^2 - 2x + 2}{(x^2 + 1)^2}' },
      { id: 'b', text: '(2x^2 + 2x + 2) / (x^2 + 1)^2', latex: '\\frac{2x^2 + 2x + 2}{(x^2 + 1)^2}' },
      { id: 'c', text: '2 / (2x)', latex: '\\frac{2}{2x}' },
      { id: 'd', text: '(2x^2 - 2x - 2) / (x^2 + 1)^2', latex: '\\frac{2x^2 - 2x - 2}{(x^2 + 1)^2}' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Quotient Rule: (u/v)\' = (u\'v - uv\') / v^2.',
      'u = 2x + 1, v = x^2 + 1. Expand carefully in the numerator.'
    ],
    solution: {
      ruleOrTechnique: 'Quotient Rule',
      whyItApplies: 'g(x) is a quotient of two polynomial functions.',
      steps: [
        {
          stepNumber: 1,
          title: 'Differentiate Numerator & Denominator',
          explanation: 'u = 2x + 1 -> u\' = 2. v = x^2 + 1 -> v\' = 2x.',
          mathExpression: 'u\' = 2, \\quad v\' = 2x'
        },
        {
          stepNumber: 2,
          title: 'Set up Quotient Rule',
          explanation: 'g\'(x) = [2(x^2 + 1) - (2x + 1)(2x)] / (x^2 + 1)^2.',
          mathExpression: '\\frac{2(x^2 + 1) - (2x + 1)(2x)}{(x^2 + 1)^2}'
        },
        {
          stepNumber: 3,
          title: 'Expand & Simplify Numerator',
          explanation: '2x^2 + 2 - (4x^2 + 2x) = 2x^2 + 2 - 4x^2 - 2x = -2x^2 - 2x + 2.',
          mathExpression: '\\frac{-2x^2 - 2x + 2}{(x^2 + 1)^2}'
        }
      ],
      finalAnswerLatex: '\\frac{-2x^2 - 2x + 2}{(x^2 + 1)^2}'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'diff_003',
    subjectId: 'differential_calculus',
    subtopic: 'Implicit Differentiation',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Find dy/dx for the curve x^3 + y^3 = 6xy at the point (3, 3) (Folium of Descartes).',
    latexPrompt: 'x^3 + y^3 = 6xy \\implies \\left. \\frac{dy}{dx} \\right|_{(3,3)} = ?',
    options: [
      { id: 'a', text: '1', latex: '1' },
      { id: 'b', text: '-1', latex: '-1' },
      { id: 'c', text: '0', latex: '0' },
      { id: 'd', text: '3', latex: '3' }
    ],
    correctAnswer: 'b',
    acceptableAnswers: ['b', '-1'],
    hints: [
      'Differentiate both sides with respect to x. d/dx(y^3) = 3y^2 (dy/dx).',
      'Use product rule on 6xy: 6y + 6x(dy/dx).',
      'Substitute x = 3, y = 3 and solve for dy/dx.'
    ],
    solution: {
      ruleOrTechnique: 'Implicit Differentiation & Product Rule',
      whyItApplies: 'The equation defines y implicitly as an algebraic curve.',
      steps: [
        {
          stepNumber: 1,
          title: 'Differentiate with respect to x',
          explanation: '3x^2 + 3y^2(dy/dx) = 6(1*y + x(dy/dx)) = 6y + 6x(dy/dx).',
          mathExpression: '3x^2 + 3y^2 \\frac{dy}{dx} = 6y + 6x \\frac{dy}{dx}'
        },
        {
          stepNumber: 2,
          title: 'Group dy/dx terms',
          explanation: '(3y^2 - 6x)(dy/dx) = 6y - 3x^2.',
          mathExpression: '\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}'
        },
        {
          stepNumber: 3,
          title: 'Evaluate at (3, 3)',
          explanation: '(2(3) - 3^2) / (3^2 - 2(3)) = (6 - 9) / (9 - 6) = -3 / 3 = -1.',
          mathExpression: '\\frac{-3}{3} = -1'
        }
      ],
      finalAnswerLatex: '-1'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'diff_004',
    subjectId: 'differential_calculus',
    subtopic: 'Optimization',
    difficulty: 'ADVANCED',
    type: 'numerical',
    prompt: 'A cylindrical can is to hold 54*pi cm^3 of liquid. What radius r (in cm) minimizes the total surface area?',
    latexPrompt: 'V = \\pi r^2 h = 54\\pi, \\quad A = 2\\pi r^2 + 2\\pi rh \\implies r = ?',
    correctAnswer: '3',
    acceptableAnswers: ['3', '3.0', '3 cm'],
    tolerance: 0.05,
    hints: [
      'Express height h in terms of r using V: pi r^2 h = 54 pi -> h = 54 / r^2.',
      'Substitute h into Area: A(r) = 2 pi r^2 + 2 pi r (54 / r^2) = 2 pi r^2 + 108 pi / r.',
      'Differentiate A(r) with respect to r and set equal to 0.'
    ],
    solution: {
      ruleOrTechnique: 'Constrained Calculus Optimization',
      whyItApplies: 'We minimize surface area subject to a fixed volume constraint.',
      steps: [
        {
          stepNumber: 1,
          title: 'Eliminate Constraint Variable',
          explanation: 'h = 54 / r^2.',
          mathExpression: 'A(r) = 2\\pi r^2 + 2\\pi r \\left(\\frac{54}{r^2}\\right) = 2\\pi r^2 + \\frac{108\\pi}{r}'
        },
        {
          stepNumber: 2,
          title: 'Differentiate',
          explanation: 'A\'(r) = 4 pi r - 108 pi / r^2.',
          mathExpression: 'A\'(r) = 4\\pi r - \\frac{108\\pi}{r^2}'
        },
        {
          stepNumber: 3,
          title: 'Set Derivative to Zero',
          explanation: '4 pi r = 108 pi / r^2 -> 4 r^3 = 108 -> r^3 = 27 -> r = 3.',
          mathExpression: 'r^3 = 27 \\implies r = 3'
        },
        {
          stepNumber: 4,
          title: 'Second Derivative Test',
          explanation: 'A\'\'(r) = 4 pi + 216 pi / r^3. At r = 3, A\'\'(3) > 0, confirming a global minimum.'
        }
      ],
      finalAnswerLatex: '3'
    },
    errorCategoryIfWrong: 'conceptual'
  },

  // 3. INTEGRATION TECHNIQUES
  {
    id: 'integ_001',
    subjectId: 'integral_calculus',
    subtopic: 'U-Substitution',
    difficulty: 'FOUNDATION',
    type: 'multiple_choice',
    prompt: 'Evaluate the indefinite integral: int (3x^2 * (x^3 + 5)^4) dx.',
    latexPrompt: '\\int 3x^2 (x^3 + 5)^4 \\, dx',
    options: [
      { id: 'a', text: '(1/5)(x^3 + 5)^5 + C', latex: '\\frac{1}{5}(x^3 + 5)^5 + C' },
      { id: 'b', text: '(x^3 + 5)^5 + C', latex: '(x^3 + 5)^5 + C' },
      { id: 'c', text: '(3/5)(x^3 + 5)^5 + C', latex: '\\frac{3}{5}(x^3 + 5)^5 + C' },
      { id: 'd', text: '(1/4)(x^3 + 5)^4 + C', latex: '\\frac{1}{4}(x^3 + 5)^4 + C' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Notice that 3x^2 is the exact derivative of (x^3 + 5).',
      'Let u = x^3 + 5. Then du = 3x^2 dx.'
    ],
    solution: {
      ruleOrTechnique: 'U-Substitution',
      whyItApplies: 'The integrand features an inside function whose exact derivative is the outer multiplier.',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose Substitution',
          explanation: 'u = x^3 + 5 -> du = 3x^2 dx.',
          mathExpression: 'u = x^3 + 5, \\quad du = 3x^2 \\, dx'
        },
        {
          stepNumber: 2,
          title: 'Transform Integral',
          explanation: 'int u^4 du.',
          mathExpression: '\\int u^4 \\, du'
        },
        {
          stepNumber: 3,
          title: 'Power Rule Integration',
          explanation: 'u^5 / 5 + C.',
          mathExpression: '\\frac{u^5}{5} + C'
        },
        {
          stepNumber: 4,
          title: 'Back-Substitute',
          explanation: '(1/5)(x^3 + 5)^5 + C.',
          mathExpression: '\\frac{1}{5}(x^3 + 5)^5 + C'
        }
      ],
      finalAnswerLatex: '\\frac{1}{5}(x^3 + 5)^5 + C',
      verification: 'Differentiating: d/dx[(1/5)(x^3 + 5)^5 + C] = (1/5) * 5(x^3 + 5)^4 * 3x^2 = 3x^2(x^3 + 5)^4.'
    },
    errorCategoryIfWrong: 'conceptual'
  },
  {
    id: 'integ_002',
    subjectId: 'integral_calculus',
    subtopic: 'Integration by Parts',
    difficulty: 'INTERMEDIATE',
    type: 'multiple_choice',
    prompt: 'Evaluate: int (x * sin(x)) dx.',
    latexPrompt: '\\int x \\sin(x) \\, dx',
    options: [
      { id: 'a', text: '-x cos(x) + sin(x) + C', latex: '-x \\cos(x) + \\sin(x) + C' },
      { id: 'b', text: 'x cos(x) - sin(x) + C', latex: 'x \\cos(x) - \\sin(x) + C' },
      { id: 'c', text: '-x sin(x) + cos(x) + C', latex: '-x \\sin(x) + \\cos(x) + C' },
      { id: 'd', text: '-x cos(x) - sin(x) + C', latex: '-x \\cos(x) - \\sin(x) + C' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Use integration by parts: int u dv = uv - int v du.',
      'By LIATE, let u = x (algebraic) and dv = sin(x) dx.'
    ],
    solution: {
      ruleOrTechnique: 'Integration by Parts (LIATE)',
      whyItApplies: 'Integrand is a product of an algebraic polynomial and a trigonometric function.',
      steps: [
        {
          stepNumber: 1,
          title: 'Assign u and dv',
          explanation: 'u = x -> du = dx. dv = sin(x) dx -> v = -cos(x).',
          mathExpression: 'u = x, \\quad du = dx, \\quad dv = \\sin(x)dx, \\quad v = -\\cos(x)'
        },
        {
          stepNumber: 2,
          title: 'Apply Parts Formula',
          explanation: 'uv - int v du = x(-cos(x)) - int (-cos(x)) dx.',
          mathExpression: '-x\\cos(x) + \\int \\cos(x) \\, dx'
        },
        {
          stepNumber: 3,
          title: 'Integrate Remaining Term',
          explanation: 'int cos(x) dx = sin(x). Thus: -x cos(x) + sin(x) + C.',
          mathExpression: '-x\\cos(x) + \\sin(x) + C'
        }
      ],
      finalAnswerLatex: '-x\\cos(x) + \\sin(x) + C',
      verification: 'Derivative: d/dx[-x cos x + sin x] = (-1*cos x + (-x)*(-sin x)) + cos x = -cos x + x sin x + cos x = x sin x.'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'integ_003',
    subjectId: 'integral_calculus',
    subtopic: 'Partial Fractions',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Evaluate: int (5x - 3) / (x^2 - 2x - 3) dx.',
    latexPrompt: '\\int \\frac{5x - 3}{x^2 - 2x - 3} \\, dx',
    options: [
      { id: 'a', text: '3 ln|x - 3| + 2 ln|x + 1| + C', latex: '3\\ln|x - 3| + 2\\ln|x + 1| + C' },
      { id: 'b', text: '2 ln|x - 3| + 3 ln|x + 1| + C', latex: '2\\ln|x - 3| + 3\\ln|x + 1| + C' },
      { id: 'c', text: '5 ln|x^2 - 2x - 3| + C', latex: '5\\ln|x^2 - 2x - 3| + C' },
      { id: 'd', text: 'ln|(x - 3)^3 / (x + 1)^2| + C', latex: '\\ln\\left|\\frac{(x - 3)^3}{(x + 1)^2}\\right| + C' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Factor denominator: x^2 - 2x - 3 = (x - 3)(x + 1).',
      'Decompose: A / (x - 3) + B / (x + 1) = (5x - 3) / ((x - 3)(x + 1)).',
      'Solve for A and B using the Heaviside cover-up method or clearing denominators.'
    ],
    solution: {
      ruleOrTechnique: 'Partial Fraction Decomposition',
      whyItApplies: 'Rational function with distinct linear denominator factors.',
      steps: [
        {
          stepNumber: 1,
          title: 'Factor Denominator',
          explanation: 'x^2 - 2x - 3 = (x - 3)(x + 1).',
          mathExpression: '\\frac{5x - 3}{(x - 3)(x + 1)} = \\frac{A}{x - 3} + \\frac{B}{x + 1}'
        },
        {
          stepNumber: 2,
          title: 'Solve Coefficients',
          explanation: '5x - 3 = A(x + 1) + B(x - 3). For x = 3: 5(3) - 3 = 12 = A(4) -> A = 3. For x = -1: 5(-1) - 3 = -8 = B(-4) -> B = 2.',
          mathExpression: 'A = 3, \\quad B = 2'
        },
        {
          stepNumber: 3,
          title: 'Integrate Each Term',
          explanation: 'int 3/(x - 3) dx + int 2/(x + 1) dx = 3 ln|x - 3| + 2 ln|x + 1| + C.',
          mathExpression: '3\\ln|x - 3| + 2\\ln|x + 1| + C'
        }
      ],
      finalAnswerLatex: '3\\ln|x - 3| + 2\\ln|x + 1| + C'
    },
    errorCategoryIfWrong: 'algebraic'
  },
  {
    id: 'integ_004',
    subjectId: 'integral_calculus',
    subtopic: 'Definite Integrals & FTC',
    difficulty: 'INTERMEDIATE',
    type: 'numerical',
    prompt: 'Evaluate the definite integral: int_0^1 (6x^2 + 4x) dx.',
    latexPrompt: '\\int_0^1 (6x^2 + 4x) \\, dx = ?',
    correctAnswer: '4',
    acceptableAnswers: ['4', '4.0'],
    hints: [
      'Find the antiderivative of 6x^2 + 4x using the power rule.',
      'Evaluate at upper bound 1 and lower bound 0: F(1) - F(0).'
    ],
    solution: {
      ruleOrTechnique: 'Fundamental Theorem of Calculus Part 2',
      whyItApplies: 'Continuous polynomial function on closed interval [0, 1].',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Antiderivative',
          explanation: 'int (6x^2 + 4x) dx = 6(x^3 / 3) + 4(x^2 / 2) = 2x^3 + 2x^2.',
          mathExpression: 'F(x) = 2x^3 + 2x^2'
        },
        {
          stepNumber: 2,
          title: 'Evaluate Bounds',
          explanation: 'F(1) = 2(1)^3 + 2(1)^2 = 2 + 2 = 4. F(0) = 0.',
          mathExpression: '[2x^3 + 2x^2]_0^1 = 4 - 0 = 4'
        }
      ],
      finalAnswerLatex: '4'
    },
    errorCategoryIfWrong: 'calculation'
  },
  {
    id: 'integ_005',
    subjectId: 'integral_calculus',
    subtopic: 'Solids of Revolution',
    difficulty: 'ADVANCED',
    type: 'multiple_choice',
    prompt: 'Find the volume of the solid generated by revolving y = x^2 from x = 0 to x = 2 around the x-axis.',
    latexPrompt: 'V = \\pi \\int_0^2 (x^2)^2 \\, dx = ?',
    options: [
      { id: 'a', text: '32*pi / 5', latex: '\\frac{32\\pi}{5}' },
      { id: 'b', text: '16*pi / 3', latex: '\\frac{16\\pi}{3}' },
      { id: 'c', text: '8*pi', latex: '8\\pi' },
      { id: 'd', text: '64*pi / 5', latex: '\\frac{64\\pi}{5}' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Use the Disk Method: V = pi * int_a^b [R(x)]^2 dx.',
      'Here R(x) = x^2, so [R(x)]^2 = x^4.',
      'Integrate x^4 from 0 to 2.'
    ],
    solution: {
      ruleOrTechnique: 'Disk Method for Volume of Revolution',
      whyItApplies: 'Rotation of a plane curve around the axis forming solid circular disks.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set up Volume Integral',
          explanation: 'V = pi * int_0^2 (x^2)^2 dx = pi * int_0^2 x^4 dx.',
          mathExpression: 'V = \\pi \\int_0^2 x^4 \\, dx'
        },
        {
          stepNumber: 2,
          title: 'Integrate',
          explanation: 'Antiderivative of x^4 is x^5 / 5.',
          mathExpression: '\\pi \\left[ \\frac{x^5}{5} \\right]_0^2 = \\pi \\left( \\frac{32}{5} - 0 \\right) = \\frac{32\\pi}{5}'
        }
      ],
      finalAnswerLatex: '\\frac{32\\pi}{5}'
    },
    errorCategoryIfWrong: 'calculation'
  },
  {
    id: 'integ_006',
    subjectId: 'integral_calculus',
    subtopic: 'Elite Calculus Challenge',
    difficulty: 'OLYMPIAD',
    type: 'multiple_choice',
    prompt: 'Evaluate the definite integral: I = int_0^(pi/2) ln(sin(x)) dx (Euler\'s Log-Sine Integral).',
    latexPrompt: 'I = \\int_0^{\\pi/2} \\ln(\\sin x) \\, dx',
    options: [
      { id: 'a', text: '-(pi / 2) * ln(2)', latex: '-\\frac{\\pi}{2} \\ln(2)' },
      { id: 'b', text: '-pi * ln(2)', latex: '-\\pi \\ln(2)' },
      { id: 'c', text: '0', latex: '0' },
      { id: 'd', text: '(pi / 2) * ln(2)', latex: '\\frac{\\pi}{2} \\ln(2)' }
    ],
    correctAnswer: 'a',
    acceptableAnswers: ['a'],
    hints: [
      'Use King\'s Property: int_0^a f(x) dx = int_0^a f(a - x) dx.',
      'Substitute x -> pi/2 - x to see I = int_0^(pi/2) ln(cos(x)) dx.',
      'Add the two representations: 2I = int_0^(pi/2) ln(sin x cos x) dx = int_0^(pi/2) ln((1/2) sin(2x)) dx.'
    ],
    solution: {
      ruleOrTechnique: 'King\'s Property & Double Angle Symmetry',
      whyItApplies: 'Symmetry of trigonometric functions over the interval [0, pi/2].',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Symmetry Identity',
          explanation: 'I = int_0^(pi/2) ln(sin(pi/2 - x)) dx = int_0^(pi/2) ln(cos x) dx.',
          mathExpression: 'I = \\int_0^{\\pi/2} \\ln(\\cos x) \\, dx'
        },
        {
          stepNumber: 2,
          title: 'Sum Integrals',
          explanation: '2I = int_0^(pi/2) [ln(sin x) + ln(cos x)] dx = int_0^(pi/2) ln(sin x cos x) dx = int_0^(pi/2) ln(sin(2x) / 2) dx.',
          mathExpression: '2I = \\int_0^{\\pi/2} \\ln(\\sin(2x)) \\, dx - \\int_0^{\\pi/2} \\ln(2) \\, dx'
        },
        {
          stepNumber: 3,
          title: 'Substitute u = 2x',
          explanation: 'int_0^(pi/2) ln(sin(2x)) dx = (1/2) int_0^pi ln(sin u) du = int_0^(pi/2) ln(sin u) du = I.',
          mathExpression: '2I = I - \\frac{\\pi}{2} \\ln(2) \\implies I = -\\frac{\\pi}{2} \\ln(2)'
        }
      ],
      finalAnswerLatex: '-\\frac{\\pi}{2} \\ln(2)'
    },
    errorCategoryIfWrong: 'incomplete_reasoning'
  }
];

export const getQuestionsForCategory = (
  category: string,
  difficulty?: string,
  count: number = 10
): Question[] => {
  let pool = [...calculusQuestions];
  
  if (category.includes('diff_mock') || category.includes('diff_rules') || category.includes('diff_applications')) {
    pool = pool.filter(q => q.subjectId === 'differential_calculus');
  } else if (category.includes('integ_mock') || category.includes('integ_techniques') || category.includes('def_indef_integrals')) {
    pool = pool.filter(q => q.subjectId === 'integral_calculus');
  } else if (category.includes('limits_continuity')) {
    pool = pool.filter(q => q.subtopic.toLowerCase().includes('limit') || q.subtopic.toLowerCase().includes('continuity'));
  }

  if (difficulty && difficulty !== 'ALL') {
    const diffFiltered = pool.filter(q => q.difficulty === difficulty);
    if (diffFiltered.length > 0) pool = diffFiltered;
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  
  // If count exceeds pool length, duplicate with slight variations or repeat cleanly
  const result: Question[] = [];
  while (result.length < count) {
    for (const q of shuffled) {
      if (result.length >= count) break;
      result.push({
        ...q,
        id: `${q.id}_inst_${result.length + 1}`
      });
    }
  }
  return result;
};
