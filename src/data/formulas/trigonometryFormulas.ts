import { FormulaItem } from '../../types/formulas';

export const trigonometryFormulas: FormulaItem[] = [
  {
    id: 'trig_soh_cah_toa',
    name: 'Right Triangle Trigonometric Ratios (SOH-CAH-TOA)',
    subject: 'trigonometry',
    category: 'Foundations',
    topic: 'Right Triangle Trigonometry',
    difficulty: 'Beginner',
    latex: '\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}, \\quad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}, \\quad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}',
    variables: [
      { symbol: '\\theta', name: 'Acute angle', meaning: 'One of the acute angles in a right-angled triangle' },
      { symbol: '\\text{Opp}', name: 'Opposite side', meaning: 'Leg directly across from angle theta' },
      { symbol: '\\text{Adj}', name: 'Adjacent side', meaning: 'Leg touching angle theta (other than hypotenuse)' },
      { symbol: '\\text{Hyp}', name: 'Hypotenuse', meaning: 'Longest side opposite the 90-degree right angle' }
    ],
    conditions: [
      'Applies directly to right triangles (0 < theta < 90 deg / 0 < theta < pi/2 rad)',
      'Extended to all angles via the Unit Circle: (x, y) = (cos theta, sin theta)'
    ],
    whenToUse: 'Finding unknown heights, distances, angles of elevation and depression, vector resolution.',
    workedExample: {
      problem: 'In a right triangle with acute angle theta, the opposite side is 3 and the adjacent side is 4. Find sin(theta), cos(theta), and tan(theta).',
      steps: [
        { stepNum: 1, instruction: 'Find the hypotenuse using Pythagorean theorem', mathLatex: '\\text{Hyp} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5' },
        { stepNum: 2, instruction: 'Compute the ratios', mathLatex: '\\sin\\theta = \\frac{3}{5} = 0.6, \\quad \\cos\\theta = \\frac{4}{5} = 0.8, \\quad \\tan\\theta = \\frac{3}{4} = 0.75' }
      ],
      finalAnswer: 'sin = 3/5, cos = 4/5, tan = 3/4',
      finalAnswerLatex: '\\sin\\theta = \\frac{3}{5}, \\; \\cos\\theta = \\frac{4}{5}, \\; \\tan\\theta = \\frac{3}{4}'
    },
    commonMistakes: [
      'Swapping the opposite and adjacent sides when looking from the other acute angle.',
      'Using the hypotenuse as the adjacent side.'
    ],
    relatedFormulaIds: ['trig_reciprocal_quotient', 'trig_pythagorean_identities', 'geom_pythagorean_theorem'],
    practiceQuestions: [
      {
        id: 'q_trig_1',
        question: 'If sin(theta) = 5/13 in a right triangle, what is cos(theta)?',
        options: ['12/13', '5/12', '13/12', '8/13'],
        correctIndex: 0,
        explanation: 'Adjacent side = sqrt(13^2 - 5^2) = sqrt(144) = 12. cos(theta) = Adj / Hyp = 12/13.'
      }
    ],
    searchKeywords: ['SOH CAH TOA', 'sine', 'cosine', 'tangent', 'trig ratios', 'right triangle'],
    memoryCard: {
      clozeLatex: '\\tan\\theta = \\frac{\\text{Opposite}}{???}',
      missingPart: '\\text{Adjacent}',
      missingOptions: ['\\text{Adjacent}', '\\text{Hypotenuse}', '1', '\\text{Opposite}'],
      recallPrompt: 'What is the denominator of tan(theta) in right-triangle trigonometry?',
      identificationPrompt: 'Formula for: Tangent Ratio (SOH CAH TOA).'
    }
  },
  {
    id: 'trig_reciprocal_quotient',
    name: 'Reciprocal and Quotient Identities',
    subject: 'trigonometry',
    category: 'Identities',
    topic: 'Fundamental Identities',
    difficulty: 'Beginner',
    latex: '\\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta}, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}',
    variables: [
      { symbol: '\\csc', name: 'Cosecant', meaning: 'Reciprocal of sine' },
      { symbol: '\\sec', name: 'Secant', meaning: 'Reciprocal of cosine' },
      { symbol: '\\cot', name: 'Cotangent', meaning: 'Reciprocal of tangent' }
    ],
    conditions: [
      '\\sin\\theta \\neq 0 \\text{ for } \\csc\\theta, \\cot\\theta (\\theta \\neq k\\pi)',
      '\\cos\\theta \\neq 0 \\text{ for } \\sec\\theta, \\tan\\theta (\\theta \\neq \\frac{\\pi}{2} + k\\pi)'
    ],
    whenToUse: 'Simplifying trigonometric expressions and evaluating non-primary trig functions.',
    workedExample: {
      problem: 'Simplify the expression: \\sin\\theta \\cdot \\sec\\theta.',
      steps: [
        { stepNum: 1, instruction: 'Rewrite sec(theta) in terms of cosine', mathLatex: '\\sec\\theta = \\frac{1}{\\cos\\theta}' },
        { stepNum: 2, instruction: 'Multiply by sin(theta)', mathLatex: '\\sin\\theta \\cdot \\frac{1}{\\cos\\theta} = \\frac{\\sin\\theta}{\\cos\\theta}' },
        { stepNum: 3, instruction: 'Apply quotient identity', mathLatex: '\\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta' }
      ],
      finalAnswer: 'tan(theta)',
      finalAnswerLatex: '\\tan\\theta'
    },
    commonMistakes: [
      'Thinking secant is the reciprocal of sine because they both start with "s". Remember: "s" goes with "c" (sec = 1/cos, csc = 1/sin).',
      'Confusing reciprocal functions (e.g. sec x = 1/cos x) with inverse functions (e.g. arccos x).'
    ],
    relatedFormulaIds: ['trig_soh_cah_toa', 'trig_pythagorean_identities'],
    practiceQuestions: [
      {
        id: 'q_trig_2',
        question: 'If cos(theta) = 2/3, what is sec(theta)?',
        options: ['3/2', '-2/3', 'sqrt(5)/3', '1/3'],
        correctIndex: 0,
        explanation: 'sec(theta) = 1 / cos(theta) = 1 / (2/3) = 3/2.'
      }
    ],
    searchKeywords: ['reciprocal identities', 'quotient identities', 'secant', 'cosecant', 'cotangent'],
    memoryCard: {
      clozeLatex: '\\sec\\theta = \\frac{1}{???}',
      missingPart: '\\cos\\theta',
      missingOptions: ['\\cos\\theta', '\\sin\\theta', '\\tan\\theta', '-\\cos\\theta'],
      recallPrompt: 'What is the reciprocal of sec(theta)?',
      identificationPrompt: 'Formula for: Secant Reciprocal Identity.'
    }
  },
  {
    id: 'trig_pythagorean_identities',
    name: 'Pythagorean Trigonometric Identities',
    subject: 'trigonometry',
    category: 'Identities',
    topic: 'Fundamental Identities',
    difficulty: 'Beginner',
    latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta',
    variables: [
      { symbol: '\\theta', name: 'Angle', meaning: 'Any real or complex angle' }
    ],
    conditions: [
      'sin^2 theta + cos^2 theta = 1 holds universally for ALL angles',
      '1 + tan^2 theta = sec^2 theta holds wherever cos theta != 0',
      '1 + cot^2 theta = csc^2 theta holds wherever sin theta != 0'
    ],
    whenToUse: 'Trigonometric substitutions in calculus (e.g. x = a*tan theta), simplifying expressions, circle equations.',
    derivation: 'In the unit circle x^2 + y^2 = 1. Since x = cos theta and y = sin theta, cos^2 theta + sin^2 theta = 1. Divide by cos^2 theta to obtain 1 + tan^2 theta = sec^2 theta; divide by sin^2 theta to obtain 1 + cot^2 theta = csc^2 theta.',
    workedExample: {
      problem: 'If \\sin\\theta = 3/5 and \\theta is in Quadrant II, find \\cos\\theta and \\tan\\theta.',
      steps: [
        { stepNum: 1, instruction: 'Use Pythagorean identity: cos^2 theta = 1 - sin^2 theta', mathLatex: '\\cos^2\\theta = 1 - \\left(\\frac{3}{5}\\right)^2 = 1 - \\frac{9}{25} = \\frac{16}{25}' },
        { stepNum: 2, instruction: 'In Quadrant II, cosine is negative', mathLatex: '\\cos\\theta = -\\sqrt{\\frac{16}{25}} = -\\frac{4}{5}' },
        { stepNum: 3, instruction: 'Compute tangent: sin / cos', mathLatex: '\\tan\\theta = \\frac{3/5}{-4/5} = -\\frac{3}{4}' }
      ],
      finalAnswer: 'cos = -4/5, tan = -3/4',
      finalAnswerLatex: '\\cos\\theta = -\\frac{4}{5}, \\quad \\tan\\theta = -\\frac{3}{4}'
    },
    commonMistakes: [
      'Writing sin^2 theta - cos^2 theta = 1 (it is PLUS, not minus).',
      'Writing tan^2 theta - 1 = sec^2 theta instead of sec^2 theta - tan^2 theta = 1.',
      'Forgetting quadrant signs when taking the square root for sin or cos.'
    ],
    relatedFormulaIds: ['trig_reciprocal_quotient', 'integ_trig_substitution'],
    practiceQuestions: [
      {
        id: 'q_trig_3',
        question: 'Simplify: sec^2(x) - tan^2(x).',
        options: ['1', '0', '-1', '2 tan^2(x)'],
        correctIndex: 0,
        explanation: 'From 1 + tan^2(x) = sec^2(x), rearranging gives sec^2(x) - tan^2(x) = 1.'
      }
    ],
    searchKeywords: ['Pythagorean identity', 'sin2+cos2=1', 'sec2-tan2=1', 'trig identities'],
    memoryCard: {
      clozeLatex: '1 + \\tan^2\\theta = ???',
      missingPart: '\\sec^2\\theta',
      missingOptions: ['\\sec^2\\theta', '\\csc^2\\theta', '\\cos^2\\theta', '1'],
      recallPrompt: 'What does 1 + tan^2(theta) equal?',
      identificationPrompt: 'Formula for: Tangent-Secant Pythagorean Identity.'
    }
  },
  {
    id: 'trig_sum_difference',
    name: 'Sum and Difference Angle Formulas',
    subject: 'trigonometry',
    category: 'Identities',
    topic: 'Compound Angles',
    difficulty: 'Intermediate',
    latex: '\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta, \\quad \\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta, \\quad \\tan(\\alpha \\pm \\beta) = \\frac{\\tan\\alpha \\pm \\tan\\beta}{1 \\mp \\tan\\alpha\\tan\\beta}',
    variables: [
      { symbol: '\\alpha, \\beta', name: 'Angles', meaning: 'Any two angles in radians or degrees' }
    ],
    conditions: [
      'Note the sign flip in cosine: cos(alpha + beta) has a MINUS sign: cos*cos - sin*sin',
      'For tangent, denominator must not equal zero'
    ],
    whenToUse: 'Evaluating exact values of non-standard angles (e.g. 75 deg = 45 deg + 30 deg, 15 deg = 45 deg - 30 deg).',
    workedExample: {
      problem: 'Find the exact value of \\sin(75^\\circ).',
      steps: [
        { stepNum: 1, instruction: 'Decompose 75 deg into 45 deg + 30 deg', mathLatex: '\\sin(75^\\circ) = \\sin(45^\\circ + 30^\\circ)' },
        { stepNum: 2, instruction: 'Apply sum identity for sine', mathLatex: '\\sin(45^\\circ)\\cos(30^\\circ) + \\cos(45^\\circ)\\sin(30^\\circ)' },
        { stepNum: 3, instruction: 'Substitute exact unit circle values', mathLatex: '\\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) + \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{\\sqrt{6} + \\sqrt{2}}{4}' }
      ],
      finalAnswer: '(sqrt(6) + sqrt(2)) / 4',
      finalAnswerLatex: '\\frac{\\sqrt{6} + \\sqrt{2}}{4}'
    },
    commonMistakes: [
      'Distributing trig functions linearly: sin(A + B) = sin A + sin B is FALSE.',
      'Forgetting the sign reversal in the cosine sum formula: cos(A + B) = cos A cos B - sin A sin B.'
    ],
    relatedFormulaIds: ['trig_double_angle', 'trig_product_sum'],
    practiceQuestions: [
      {
        id: 'q_trig_4',
        question: 'What is cos(A - B)?',
        options: [
          'cos A cos B + sin A sin B',
          'cos A cos B - sin A sin B',
          'sin A cos B - cos A sin B',
          'cos A - cos B'
        ],
        correctIndex: 0,
        explanation: 'Cosine difference formula reverses sign: cos(A - B) = cos A cos B + sin A sin B.'
      }
    ],
    searchKeywords: ['sum and difference formulas', 'compound angle', 'sin(A+B)', 'cos(A+B)', 'tan(A+B)'],
    memoryCard: {
      clozeLatex: '\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta ??? \\sin\\alpha\\sin\\beta',
      missingPart: '-',
      missingOptions: ['-', '+', '\\times', '\\div'],
      recallPrompt: 'What is the sign between the products in cos(alpha + beta)?',
      identificationPrompt: 'Formula for: Cosine Angle Sum Identity.'
    }
  },
  {
    id: 'trig_double_half_angle',
    name: 'Double-Angle & Half-Angle Formulas',
    subject: 'trigonometry',
    category: 'Identities',
    topic: 'Multiple Angles',
    difficulty: 'Intermediate',
    latex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta, \\quad \\sin^2\\theta = \\frac{1-\\cos 2\\theta}{2}, \\quad \\cos^2\\theta = \\frac{1+\\cos 2\\theta}{2}',
    variables: [
      { symbol: '\\theta', name: 'Angle', meaning: 'Any angle' },
      { symbol: '2\\theta', name: 'Double angle', meaning: 'Twice the base angle' }
    ],
    conditions: [
      'Half-angle formulas: \\sin(\\theta/2) = \\pm\\sqrt{\\frac{1-\\cos\\theta}{2}}, \\; \\cos(\\theta/2) = \\pm\\sqrt{\\frac{1+\\cos\\theta}{2}}',
      'The +/- sign in half-angle formulas is determined by the quadrant containing theta/2'
    ],
    whenToUse: 'Integrating powers of sine and cosine (power-reduction in calculus), solving trigonometric equations.',
    workedExample: {
      problem: 'Evaluate \\cos(2\\theta) given that \\cos\\theta = 4/5.',
      steps: [
        { stepNum: 1, instruction: 'Use the cosine-only double angle formula: cos(2*theta) = 2*cos^2(theta) - 1', mathLatex: '\\cos 2\\theta = 2\\left(\\frac{4}{5}\\right)^2 - 1' },
        { stepNum: 2, instruction: 'Compute square and multiply', mathLatex: '2\\left(\\frac{16}{25}\\right) - 1 = \\frac{32}{25} - \\frac{25}{25}' },
        { stepNum: 3, instruction: 'Subtract', mathLatex: '\\frac{7}{25}' }
      ],
      finalAnswer: '7/25',
      finalAnswerLatex: '\\frac{7}{25}'
    },
    commonMistakes: [
      'Writing sin(2*theta) = 2*sin(theta) (dropping the cos theta factor).',
      'Confusing the signs in power reduction: sin^2 has MINUS (1 - cos 2x)/2 while cos^2 has PLUS (1 + cos 2x)/2.'
    ],
    relatedFormulaIds: ['integ_trig_functions', 'trig_sum_difference'],
    practiceQuestions: [
      {
        id: 'q_trig_5',
        question: 'If sin(x) = 1/2 and cos(x) = sqrt(3)/2, what is sin(2x)?',
        options: ['sqrt(3)/2', '1', '1/2', 'sqrt(3)/4'],
        correctIndex: 0,
        explanation: 'sin(2x) = 2 * sin(x) * cos(x) = 2 * (1/2) * (sqrt(3)/2) = sqrt(3)/2.'
      }
    ],
    searchKeywords: ['double angle formulas', 'half angle formulas', 'power reduction formulas', 'sin 2x', 'cos 2x'],
    memoryCard: {
      clozeLatex: '\\sin 2\\theta = 2\\sin\\theta \\times ???',
      missingPart: '\\cos\\theta',
      missingOptions: ['\\cos\\theta', '\\sin\\theta', '1', '\\tan\\theta'],
      recallPrompt: 'What multiplies 2 sin(theta) in the double angle formula for sine?',
      identificationPrompt: 'Formula for: Double Angle Formula for Sine.'
    }
  },
  {
    id: 'trig_product_sum_identities',
    name: 'Product-to-Sum and Sum-to-Product Identities',
    subject: 'trigonometry',
    category: 'Identities',
    topic: 'Product & Sum Transformations',
    difficulty: 'Advanced',
    latex: '\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)], \\quad \\sin u + \\sin v = 2\\sin\\left(\\frac{u+v}{2}\\right)\\cos\\left(\\frac{u-v}{2}\\right), \\quad \\cos u - \\cos v = -2\\sin\\left(\\frac{u+v}{2}\\right)\\sin\\left(\\frac{u-v}{2}\\right)',
    variables: [
      { symbol: '\\alpha, \\beta, u, v', name: 'Angles', meaning: 'Angles being summed or multiplied' }
    ],
    conditions: [
      'Essential for Fourier series integrals and solving trigonometric equations with differing frequencies',
      'Note the minus sign in cos u - cos v = -2 sin((u+v)/2) sin((u-v)/2)'
    ],
    whenToUse: 'Acoustics (beat frequencies), radio modulation, evaluating integrals of sin(mx)cos(nx).',
    workedExample: {
      problem: 'Express \\sin(5x)\\cos(3x) as a sum of trigonometric functions.',
      steps: [
        { stepNum: 1, instruction: 'Use product-to-sum: sin(A)cos(B) = (1/2)[sin(A+B) + sin(A-B)]', mathLatex: '\\sin(5x)\\cos(3x) = \\frac{1}{2}[\\sin(5x + 3x) + \\sin(5x - 3x)]' },
        { stepNum: 2, instruction: 'Simplify arguments', mathLatex: '\\frac{1}{2}[\\sin(8x) + \\sin(2x)]' }
      ],
      finalAnswer: '(1/2)[sin(8x) + sin(2x)]',
      finalAnswerLatex: '\\frac{1}{2}[\\sin(8x) + \\sin(2x)]'
    },
    commonMistakes: [
      'Missing the factor of 1/2 in the product-to-sum identities.',
      'Missing the negative sign in the difference of cosines: cos u - cos v.'
    ],
    relatedFormulaIds: ['integ_trig_functions', 'trig_sum_difference'],
    practiceQuestions: [
      {
        id: 'q_trig_6',
        question: 'What is 2 sin(40 deg) cos(20 deg)?',
        options: ['sin(60 deg) + sin(20 deg)', 'sin(60 deg) - sin(20 deg)', 'cos(60 deg) + cos(20 deg)', 'sin(80 deg)'],
        correctIndex: 0,
        explanation: '2 sin(A) cos(B) = sin(A+B) + sin(A-B) = sin(40+20) + sin(40-20) = sin(60) + sin(20).'
      }
    ],
    searchKeywords: ['product to sum', 'sum to product', 'Prosthaphaeresis', 'beat frequency'],
    memoryCard: {
      clozeLatex: '\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta) + ???]',
      missingPart: '\\sin(\\alpha-\\beta)',
      missingOptions: ['\\sin(\\alpha-\\beta)', '\\cos(\\alpha-\\beta)', '-\\sin(\\alpha-\\beta)', '\\sin\\alpha'],
      recallPrompt: 'What is the second term in the product-to-sum identity for sin(alpha)*cos(beta)?',
      identificationPrompt: 'Formula for: Product-to-Sum (Sine * Cosine).'
    }
  },
  {
    id: 'trig_law_of_sines',
    name: 'Law of Sines and Circumradius Relation',
    subject: 'trigonometry',
    category: 'Triangle Laws',
    topic: 'Non-Right Triangles',
    difficulty: 'Intermediate',
    latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R',
    variables: [
      { symbol: 'a, b, c', name: 'Side lengths', meaning: 'Sides opposite to angles A, B, C' },
      { symbol: 'A, B, C', name: 'Interior angles', meaning: 'Angles opposite to sides a, b, c' },
      { symbol: 'R', name: 'Circumradius', meaning: 'Radius of the circumscribed circle passing through all 3 vertices' }
    ],
    conditions: [
      'Applies to any non-degenerate triangle in Euclidean plane',
      'Ambiguous Case (SSA): When two sides and a non-included acute angle are given, there can be 0, 1, or 2 valid triangles'
    ],
    whenToUse: 'Solving triangles when given ASA, AAS, or SSA (ambiguous case), and calculating circumcircle radius.',
    workedExample: {
      problem: 'In triangle ABC, angle A = 30 degrees, side a = 8 cm. Find the radius R of its circumcircle.',
      steps: [
        { stepNum: 1, instruction: 'Use the extended Law of Sines: a / sin A = 2R', mathLatex: '\\frac{8}{\\sin(30^\\circ)} = 2R' },
        { stepNum: 2, instruction: 'Substitute sin(30 deg) = 1/2', mathLatex: '\\frac{8}{0.5} = 2R \\implies 16 = 2R' },
        { stepNum: 3, instruction: 'Solve for R', mathLatex: 'R = 8\\text{ cm}' }
      ],
      finalAnswer: 'R = 8 cm',
      finalAnswerLatex: 'R = 8\\text{ cm}'
    },
    commonMistakes: [
      'Overlooking the second triangle in the SSA ambiguous case (B_2 = 180 deg - B_1).',
      'Dividing by R instead of 2R (the diameter).'
    ],
    relatedFormulaIds: ['trig_law_of_cosines', 'geom_triangle_general'],
    practiceQuestions: [
      {
        id: 'q_trig_7',
        question: 'In triangle ABC, side a = 10, A = 45 degrees, B = 30 degrees. What is side b?',
        options: ['10*sqrt(2)/2 = 5*sqrt(2)', '10*sqrt(2)', '5', '10'],
        correctIndex: 0,
        explanation: 'b = a * sin(B) / sin(A) = 10 * (1/2) / (sqrt(2)/2) = 5 / (sqrt(2)/2) = 5*sqrt(2).'
      }
    ],
    searchKeywords: ['Law of Sines', 'sine rule', 'circumradius', 'ambiguous case SSA', 'extended law of sines'],
    memoryCard: {
      clozeLatex: '\\frac{a}{\\sin A} = ??? \\quad (\\text{Extended Law of Sines})',
      missingPart: '2R',
      missingOptions: ['2R', 'R', 'R^2', '4R'],
      recallPrompt: 'What circumcircle parameter equals a / sin A in the extended Law of Sines?',
      identificationPrompt: 'Formula for: Extended Law of Sines with Circumradius.'
    }
  },
  {
    id: 'trig_law_of_cosines',
    name: 'Law of Cosines',
    subject: 'trigonometry',
    category: 'Triangle Laws',
    topic: 'Non-Right Triangles',
    difficulty: 'Intermediate',
    latex: 'c^2 = a^2 + b^2 - 2ab\\cos C, \\quad \\cos C = \\frac{a^2 + b^2 - c^2}{2ab}',
    variables: [
      { symbol: 'a, b, c', name: 'Side lengths', meaning: 'Sides of the triangle' },
      { symbol: 'C', name: 'Included angle', meaning: 'Angle opposite to side c' }
    ],
    conditions: [
      'Generalization of the Pythagorean theorem: when C = 90 deg, cos(90) = 0 and c^2 = a^2 + b^2',
      'For obtuse angle C (> 90 deg), cos C is negative, making c^2 > a^2 + b^2'
    ],
    whenToUse: 'Solving triangles when given SAS (two sides and included angle) or SSS (all three sides).',
    workedExample: {
      problem: 'Find side c in a triangle with a = 5 cm, b = 8 cm, and included angle C = 60 degrees.',
      steps: [
        { stepNum: 1, instruction: 'Set up Law of Cosines formula', mathLatex: 'c^2 = 5^2 + 8^2 - 2(5)(8)\\cos(60^\\circ)' },
        { stepNum: 2, instruction: 'Substitute cos(60 deg) = 0.5', mathLatex: 'c^2 = 25 + 64 - 80(0.5) = 89 - 40 = 49' },
        { stepNum: 3, instruction: 'Take square root', mathLatex: 'c = \\sqrt{49} = 7\\text{ cm}' }
      ],
      finalAnswer: 'c = 7 cm',
      finalAnswerLatex: 'c = 7\\text{ cm}'
    },
    commonMistakes: [
      'Order of operations error: computing (a^2 + b^2 - 2ab) * cos C instead of (a^2 + b^2) - (2ab cos C).',
      'Using the wrong angle (must be the angle OPPOSITE side c).'
    ],
    relatedFormulaIds: ['trig_law_of_sines', 'geom_pythagorean_theorem', 'geom_heron_formula'],
    practiceQuestions: [
      {
        id: 'q_trig_8',
        question: 'If a triangle has sides 3, 5, 7, what is the measure of the angle opposite the side of length 7?',
        options: ['120 degrees', '90 degrees', '135 degrees', '150 degrees'],
        correctIndex: 0,
        explanation: 'cos C = (3^2 + 5^2 - 7^2)/(2*3*5) = (9 + 25 - 49)/30 = -15/30 = -1/2. C = 120 degrees.'
      }
    ],
    searchKeywords: ['Law of Cosines', 'cosine rule', 'SAS triangle', 'SSS triangle', 'generalized Pythagorean'],
    memoryCard: {
      clozeLatex: 'c^2 = a^2 + b^2 - ??? \\cos C',
      missingPart: '2ab',
      missingOptions: ['2ab', 'ab', '4ab', '2(a+b)'],
      recallPrompt: 'What product coefficient precedes cos C in the Law of Cosines?',
      identificationPrompt: 'Formula for: Law of Cosines.'
    }
  },
  {
    id: 'trig_unit_circle_values',
    name: 'Unit Circle Exact Values & Radian Conversions',
    subject: 'trigonometry',
    category: 'Foundations',
    topic: 'Unit Circle',
    difficulty: 'Beginner',
    latex: '\\text{rad} = \\text{deg} \\times \\frac{\\pi}{180^\\circ}, \\quad (x, y) = (\\cos\\theta, \\sin\\theta), \\quad \\sin\\left(\\frac{\\pi}{6}\\right)=\\frac{1}{2}, \\quad \\cos\\left(\\frac{\\pi}{4}\\right)=\\frac{\\sqrt{2}}{2}, \\quad \\tan\\left(\\frac{\\pi}{3}\\right)=\\sqrt{3}',
    variables: [
      { symbol: '\\theta', name: 'Angle', meaning: 'Rotational angle from positive x-axis' },
      { symbol: '(x, y)', name: 'Circle coordinates', meaning: 'Coordinates on circle x^2 + y^2 = 1' }
    ],
    conditions: [
      'Key angles: 0, pi/6 (30 deg), pi/4 (45 deg), pi/3 (60 deg), pi/2 (90 deg), pi (180 deg)',
      'Pattern for sine in Q1: sqrt(0)/2, sqrt(1)/2, sqrt(2)/2, sqrt(3)/2, sqrt(4)/2 = 1'
    ],
    whenToUse: 'Mental trigonometry, calculus limit evaluation, evaluating wave expressions.',
    workedExample: {
      problem: 'Find the exact values of cos(5pi/6) and sin(5pi/6).',
      steps: [
        { stepNum: 1, instruction: 'Identify quadrant and reference angle', mathLatex: '\\theta = \\frac{5\\pi}{6} = 150^\\circ \\; (\\text{Quadrant II}), \\quad \\theta_{\\text{ref}} = \\pi - \\frac{5\\pi}{6} = \\frac{\\pi}{6}' },
        { stepNum: 2, instruction: 'Determine signs in Quadrant II: x (cosine) is negative, y (sine) is positive', mathLatex: '\\cos(5\\pi/6) = -\\cos(\\pi/6) = -\\frac{\\sqrt{3}}{2}' },
        { stepNum: 3, instruction: 'Evaluate sine', mathLatex: '\\sin(5\\pi/6) = +\\sin(\\pi/6) = \\frac{1}{2}' }
      ],
      finalAnswer: 'cos = -sqrt(3)/2, sin = 1/2',
      finalAnswerLatex: '\\cos(5\\pi/6) = -\\frac{\\sqrt{3}}{2}, \\quad \\sin(5\\pi/6) = \\frac{1}{2}'
    },
    commonMistakes: [
      'Inverting the radian conversion factor as 180/pi instead of pi/180.',
      'Mixing up sin and cos for 30 and 60 degrees (sin 30 = 1/2, sin 60 = sqrt(3)/2).'
    ],
    relatedFormulaIds: ['trig_soh_cah_toa', 'geom_semicircle_sector'],
    practiceQuestions: [
      {
        id: 'q_trig_9',
        question: 'Convert 135 degrees to radians in terms of pi.',
        options: ['3pi/4', '2pi/3', '5pi/6', '4pi/5'],
        correctIndex: 0,
        explanation: '135 * (pi / 180) = (135/45) * (pi / (180/45)) = 3pi / 4.'
      }
    ],
    searchKeywords: ['unit circle', 'exact values', 'radians to degrees', 'special angles', 'reference angle'],
    memoryCard: {
      clozeLatex: '\\text{Radians} = \\text{Degrees} \\times \\frac{\\pi}{???}',
      missingPart: '180^\\circ',
      missingOptions: ['180^\\circ', '360^\\circ', '90^\\circ', '2\\pi'],
      recallPrompt: 'What degree value is in the denominator of the degree-to-radian conversion?',
      identificationPrompt: 'Formula for: Degrees to Radians Conversion.'
    }
  },
  {
    id: 'trig_general_equations',
    name: 'General Solutions of Trigonometric Equations',
    subject: 'trigonometry',
    category: 'Equations',
    topic: 'Trig Equations',
    difficulty: 'Advanced',
    latex: '\\sin\\theta = \\sin\\alpha \\implies \\theta = n\\pi + (-1)^n\\alpha, \\quad \\cos\\theta = \\cos\\alpha \\implies \\theta = 2n\\pi \\pm \\alpha, \\quad \\tan\\theta = \\tan\\alpha \\implies \\theta = n\\pi + \\alpha \\quad (n \\in \\mathbb{Z})',
    variables: [
      { symbol: '\\theta', name: 'Unknown variable', meaning: 'General solution set' },
      { symbol: '\\alpha', name: 'Principal solution', meaning: 'The principal value angle' },
      { symbol: 'n', name: 'Arbitrary integer', meaning: 'n in {..., -2, -1, 0, 1, 2, ...}' }
    ],
    conditions: [
      '\\alpha must be the principal angle: -pi/2 <= alpha <= pi/2 for sine/tangent; 0 <= alpha <= pi for cosine',
      'For tan theta, theta != pi/2 + k*pi'
    ],
    whenToUse: 'Finding all infinitely many solutions to periodic wave equations, vibrations, orbital intersections.',
    workedExample: {
      problem: 'Find all general solutions to 2\\cos(x) - 1 = 0.',
      steps: [
        { stepNum: 1, instruction: 'Isolate cos(x)', mathLatex: '\\cos(x) = \\frac{1}{2}' },
        { stepNum: 2, instruction: 'Find principal angle alpha', mathLatex: '\\alpha = \\frac{\\pi}{3} \\; (60^\\circ)' },
        { stepNum: 3, instruction: 'Apply cosine general solution formula: x = 2n*pi +/- alpha', mathLatex: 'x = 2n\\pi \\pm \\frac{\\pi}{3}, \\quad n \\in \\mathbb{Z}' }
      ],
      finalAnswer: 'x = 2n pi +/- pi/3',
      finalAnswerLatex: 'x = 2n\\pi \\pm \\frac{\\pi}{3}, \\quad n \\in \\mathbb{Z}'
    },
    commonMistakes: [
      'Forgetting the infinite periodic families and only reporting one solution.',
      'Using 2n*pi for tangent when tangent has period pi (so x = n*pi + alpha).'
    ],
    relatedFormulaIds: ['trig_graph_transformations', 'trig_inverse_relationships'],
    practiceQuestions: [
      {
        id: 'q_trig_10',
        question: 'What is the period of tan(x)?',
        options: ['pi', '2pi', 'pi/2', '4pi'],
        correctIndex: 0,
        explanation: 'Tangent has period pi, repeating every pi radians.'
      }
    ],
    searchKeywords: ['trigonometric equations', 'general solutions', 'principal value', 'periodic solutions'],
    memoryCard: {
      clozeLatex: '\\cos\\theta = \\cos\\alpha \\implies \\theta = ??? \\pm \\alpha',
      missingPart: '2n\\pi',
      missingOptions: ['2n\\pi', 'n\\pi', '\\frac{n\\pi}{2}', '4n\\pi'],
      recallPrompt: 'What multiple of pi appears in the cosine general solution theta = ... +/- alpha?',
      identificationPrompt: 'Formula for: General Solution of Cosine Equation.'
    }
  },
  {
    id: 'trig_inverse_relationships',
    name: 'Inverse Trigonometric Relationships & Co-function Identities',
    subject: 'trigonometry',
    category: 'Inverse Trig',
    topic: 'Inverse Functions',
    difficulty: 'Intermediate',
    latex: '\\arcsin x + \\arccos x = \\frac{\\pi}{2}, \\quad \\arctan x + \\operatorname{arccot} x = \\frac{\\pi}{2}, \\quad \\arcsin(-x) = -\\arcsin x, \\quad \\arccos(-x) = \\pi - \\arccos x',
    variables: [
      { symbol: 'x', name: 'Input ratio', meaning: 'Must be in [-1, 1] for arcsin and arccos' },
      { symbol: '\\arcsin, \\arccos, \\arctan', name: 'Inverse trig functions', meaning: 'Return angle in radians within restricted principal range' }
    ],
    conditions: [
      'Range of arcsin: [-\\pi/2, \\pi/2]',
      'Range of arccos: [0, \\pi]',
      'Range of arctan: (-\\pi/2, \\pi/2)'
    ],
    whenToUse: 'Differentiating inverse trig functions in calculus, integration by substitution, angle finding.',
    workedExample: {
      problem: 'Evaluate \\cos(\\arcsin(3/5)).',
      steps: [
        { stepNum: 1, instruction: 'Let theta = arcsin(3/5). Then sin(theta) = 3/5 with theta in [0, pi/2]', mathLatex: '\\sin\\theta = \\frac{3}{5}' },
        { stepNum: 2, instruction: 'Find cos(theta) using cos(theta) = sqrt(1 - sin^2 theta)', mathLatex: '\\cos\\theta = \\sqrt{1 - \\left(\\frac{3}{5}\\right)^2} = \\sqrt{1 - \\frac{9}{25}} = \\sqrt{\\frac{16}{25}} = \\frac{4}{5}' }
      ],
      finalAnswer: '4/5',
      finalAnswerLatex: '\\frac{4}{5}'
    },
    commonMistakes: [
      'Assuming arccos(-x) = -arccos(x) (it is actually pi - arccos(x) because range is [0, pi]).',
      'Confusing inverse trig arcsin(x) with 1/sin(x) = csc(x).'
    ],
    relatedFormulaIds: ['diff_inverse_trig', 'trig_soh_cah_toa'],
    practiceQuestions: [
      {
        id: 'q_trig_11',
        question: 'What is arcsin(x) + arccos(x) for any x in [-1, 1]?',
        options: ['pi/2', 'pi', '0', '1'],
        correctIndex: 0,
        explanation: 'By complementary angles identity, arcsin(x) + arccos(x) = pi/2 (90 degrees).'
      }
    ],
    searchKeywords: ['inverse trig', 'arcsin', 'arccos', 'arctan', 'principal branch', 'cofunction identity'],
    memoryCard: {
      clozeLatex: '\\arcsin x + \\arccos x = ???',
      missingPart: '\\frac{\\pi}{2}',
      missingOptions: ['\\frac{\\pi}{2}', '\\pi', '0', '1'],
      recallPrompt: 'What constant does arcsin(x) + arccos(x) always sum to for x in [-1, 1]?',
      identificationPrompt: 'Formula for: Sum of Arcsin and Arccos Complementary Identity.'
    }
  },
  {
    id: 'trig_graph_transformations',
    name: 'Sinusoidal Graphs (Amplitude, Period & Phase Shift)',
    subject: 'trigonometry',
    category: 'Functions & Graphs',
    topic: 'Graph Transformations',
    difficulty: 'Intermediate',
    latex: 'y = A\\sin(B(x - C)) + D, \\quad \\text{Amp} = |A|, \\quad T = \\frac{2\\pi}{|B|}, \\quad \\text{Phase Shift} = C, \\quad \\text{Vertical Shift} = D',
    variables: [
      { symbol: 'A', name: 'Amplitude coefficient', meaning: 'Vertical stretch/compression; peak height is |A|' },
      { symbol: 'B', name: 'Angular frequency', meaning: 'Determines period T = 2*pi / |B|' },
      { symbol: 'C', name: 'Phase shift', meaning: 'Horizontal shift (to right if C > 0)' },
      { symbol: 'D', name: 'Vertical displacement', meaning: 'Midline / equilibrium axis y = D' }
    ],
    conditions: [
      'B \\neq 0',
      'For tangent graph y = A tan(B(x-C)) + D, the fundamental period is T = pi / |B|'
    ],
    whenToUse: 'AC electric voltage, tides, harmonic oscillator waves, sound synthesis.',
    workedExample: {
      problem: 'Find the amplitude, period, and midline of y = 3\\cos(4x - \\pi) + 2.',
      steps: [
        { stepNum: 1, instruction: 'Factor out B = 4 to isolate phase shift C', mathLatex: 'y = 3\\cos\\left(4\\left(x - \\frac{\\pi}{4}\\right)\\right) + 2' },
        { stepNum: 2, instruction: 'Identify amplitude |A| and midline D', mathLatex: '\\text{Amplitude} = |3| = 3, \\quad \\text{Midline: } y = 2' },
        { stepNum: 3, instruction: 'Calculate period T = 2*pi / B', mathLatex: 'T = \\frac{2\\pi}{4} = \\frac{\\pi}{2}' }
      ],
      finalAnswer: 'Amplitude = 3, Period = pi/2, Midline: y = 2',
      finalAnswerLatex: '\\text{Amp} = 3, \\quad T = \\frac{\\pi}{2}, \\quad y = 2'
    },
    commonMistakes: [
      'Thinking the phase shift is pi instead of factoring out 4 first (shift is pi/4).',
      'Reporting a negative amplitude (amplitude is ALWAYS non-negative: |A|).'
    ],
    relatedFormulaIds: ['trig_general_equations'],
    practiceQuestions: [
      {
        id: 'q_trig_12',
        question: 'What is the period of the function f(x) = 5 sin(2*pi*x)?',
        options: ['1', '2*pi', 'pi', '2'],
        correctIndex: 0,
        explanation: 'Period T = 2*pi / B = 2*pi / (2*pi) = 1.'
      }
    ],
    searchKeywords: ['amplitude', 'period', 'phase shift', 'sinusoid', 'midline', 'harmonic motion'],
    memoryCard: {
      clozeLatex: 'T = \\frac{2\\pi}{???} \\quad (\\text{Period of } \\sin(Bx))',
      missingPart: '|B|',
      missingOptions: ['|B|', '|A|', 'C', 'D'],
      recallPrompt: 'What parameter divides 2*pi to give the period of sin(Bx)?',
      identificationPrompt: 'Formula for: Sinusoidal Period Formula.'
    }
  }
];
