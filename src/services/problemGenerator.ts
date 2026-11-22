import { Question, DifficultyLevel, SubjectId } from '../types';

export const generateProceduralProblem = (
  topic: 'power_rule' | 'limits_rational' | 'linear_diophantine' | 'modular_arithmetic' | 'definite_poly' | 'trig_limit' | 'product_rule',
  difficulty: DifficultyLevel = 'INTERMEDIATE'
): Question => {
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (topic === 'power_rule') {
    const a = randInt(2, 9);
    const n = randInt(3, 7);
    const b = randInt(2, 8);
    const m = randInt(1, 2);
    // f(x) = a x^n + b x^m
    // f'(x) = (a*n) x^(n-1) + (b*m) x^(m-1)
    const coeff1 = a * n;
    const pow1 = n - 1;
    const coeff2 = b * m;
    const pow2 = m - 1;
    const term2 = pow2 === 0 ? `${coeff2}` : (pow2 === 1 ? `${coeff2}x` : `${coeff2}x^${pow2}`);
    const derivLatex = `${coeff1}x^{${pow1}} + ${term2}`;

    const wrong1 = `${a * (n - 1)}x^{${pow1}} + ${b}x`;
    const wrong2 = `${coeff1}x^{${n}} + ${coeff2}x^{${m}}`;
    const wrong3 = `${a + n}x^{${pow1}} + ${b + m}`;

    return {
      id: `gen_pow_${Date.now()}_${randInt(100, 999)}`,
      subjectId: 'differential_calculus',
      subtopic: 'Power Rule',
      difficulty,
      type: 'multiple_choice',
      prompt: `Differentiate the polynomial f(x) = ${a}x^${n} + ${b}x^${m}.`,
      latexPrompt: `f(x) = ${a}x^{${n}} + ${b}x^{${m}} \\implies f'(x) = ?`,
      options: [
        { id: 'a', text: derivLatex, latex: derivLatex },
        { id: 'b', text: wrong1, latex: wrong1 },
        { id: 'c', text: wrong2, latex: wrong2 },
        { id: 'd', text: wrong3, latex: wrong3 }
      ].sort(() => Math.random() - 0.5),
      correctAnswer: derivLatex,
      acceptableAnswers: [derivLatex],
      hints: [
        'Apply the power rule d/dx [x^k] = k * x^(k-1) to each term individually.',
        `For the first term: d/dx [${a}x^${n}] = ${a} * ${n} * x^${n - 1} = ${coeff1}x^${pow1}.`
      ],
      solution: {
        ruleOrTechnique: 'Sum Rule and Power Rule',
        whyItApplies: 'Derivative of a sum of monomials is the sum of their individual derivatives.',
        steps: [
          {
            stepNumber: 1,
            title: 'Differentiate First Monomial',
            explanation: `d/dx[${a}x^${n}] = ${a} * ${n} * x^{${n}-1} = ${coeff1}x^{${pow1}}.`,
            mathExpression: `${coeff1}x^{${pow1}}`
          },
          {
            stepNumber: 2,
            title: 'Differentiate Second Monomial',
            explanation: `d/dx[${b}x^${m}] = ${b} * ${m} * x^{${m}-1} = ${term2}.`,
            mathExpression: `${term2}`
          },
          {
            stepNumber: 3,
            title: 'Sum the Derivatives',
            explanation: `Combine terms: ${derivLatex}.`,
            mathExpression: derivLatex
          }
        ],
        finalAnswerLatex: derivLatex,
        verification: 'Verified via standard polynomial differentiation.'
      },
      errorCategoryIfWrong: 'algebraic'
    };
  }

  if (topic === 'definite_poly') {
    const k = randInt(2, 6); // k x
    const upper = randInt(2, 5);
    // int_0^upper (k x) dx = k * upper^2 / 2
    // Let's pick k even so answer is integer
    const kEven = k * 2;
    const ans = (kEven * upper * upper) / 2;

    return {
      id: `gen_def_${Date.now()}_${randInt(100, 999)}`,
      subjectId: 'integral_calculus',
      subtopic: 'Definite Integrals',
      difficulty,
      type: 'numerical',
      prompt: `Evaluate the definite integral: int_0^${upper} (${kEven}x) dx.`,
      latexPrompt: `\\int_0^{${upper}} ${kEven}x \\, dx = ?`,
      correctAnswer: `${ans}`,
      acceptableAnswers: [`${ans}`, `${ans}.0`],
      tolerance: 0.05,
      hints: [
        `Find the antiderivative of ${kEven}x using the power rule for integration.`,
        `Antiderivative is ${kEven} * (x^2 / 2) = ${kEven / 2}x^2.`,
        `Evaluate at upper bound ${upper} and lower bound 0.`
      ],
      solution: {
        ruleOrTechnique: 'Fundamental Theorem of Calculus Part 2',
        whyItApplies: 'Continuous polynomial function on interval [0, b].',
        steps: [
          {
            stepNumber: 1,
            title: 'Find Antiderivative',
            explanation: `int (${kEven}x) dx = ${kEven / 2}x^2.`,
            mathExpression: `F(x) = ${kEven / 2}x^2`
          },
          {
            stepNumber: 2,
            title: 'Evaluate at Limits',
            explanation: `F(${upper}) - F(0) = ${kEven / 2}(${upper}^2) - 0 = ${kEven / 2}(${upper * upper}) = ${ans}.`,
            mathExpression: `[${kEven / 2}x^2]_0^{${upper}} = ${ans}`
          }
        ],
        finalAnswerLatex: `${ans}`
      },
      errorCategoryIfWrong: 'calculation'
    };
  }

  // Default fallback: limits rational
  const root = randInt(2, 5);
  const sq = root * root;
  const ansLimit = root * 2;

  return {
    id: `gen_lim_${Date.now()}_${randInt(100, 999)}`,
    subjectId: 'differential_calculus',
    subtopic: 'Limits',
    difficulty,
    type: 'multiple_choice',
    prompt: `Evaluate: lim_{x -> ${root}} (x^2 - ${sq}) / (x - ${root}).`,
    latexPrompt: `\\lim_{x \\to ${root}} \\frac{x^2 - ${sq}}{x - ${root}} = ?`,
    options: [
      { id: 'a', text: `${ansLimit}`, latex: `${ansLimit}` },
      { id: 'b', text: `${root}`, latex: `${root}` },
      { id: 'c', text: '0', latex: '0' },
      { id: 'd', text: `${sq}`, latex: `${sq}` }
    ].sort(() => Math.random() - 0.5),
    correctAnswer: `${ansLimit}`,
    acceptableAnswers: [`${ansLimit}`],
    hints: [
      'Factor the numerator as a difference of squares: x^2 - a^2 = (x - a)(x + a).',
      `Cancel (x - ${root}) and substitute x = ${root}.`
    ],
    solution: {
      ruleOrTechnique: 'Factoring Difference of Squares',
      whyItApplies: 'Direct evaluation yields 0/0. Factoring removes the singularity.',
      steps: [
        {
          stepNumber: 1,
          title: 'Factor',
          explanation: `(x - ${root})(x + ${root}) / (x - ${root}) = x + ${root}.`,
          mathExpression: `\\lim_{x \\to ${root}} (x + ${root})`
        },
        {
          stepNumber: 2,
          title: 'Substitute',
          explanation: `${root} + ${root} = ${ansLimit}.`,
          mathExpression: `${ansLimit}`
        }
      ],
      finalAnswerLatex: `${ansLimit}`
    },
    errorCategoryIfWrong: 'algebraic'
  };
};
