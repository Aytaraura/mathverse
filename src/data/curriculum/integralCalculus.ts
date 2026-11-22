import { CurriculumModule } from '../../types';

export const integralCurriculum: CurriculumModule[] = [
  {
    id: 'integ_fundamentals',
    division: 'integral',
    title: '1. Integration Fundamentals & Antiderivatives',
    description: 'Understand antiderivatives, indefinite integrals, constant of integration, power rule for integrals, logarithmic and exponential integrals.',
    icon: 'Compass',
    lessons: [
      {
        id: 'antiderivatives_intro',
        title: 'Antiderivatives & The Indefinite Integral',
        content: 'An antiderivative of \\(f(x)\\) is a function \\(F(x)\\) such that \\(F\'(x) = f(x)\\). Because the derivative of any constant is zero, if \\(F(x)\\) is an antiderivative, then \\(F(x) + C\\) represents the entire family of antiderivatives, where \\(C\\) is the arbitrary constant of integration.\nWe denote this by:\n\\[\\int f(x) \\, dx = F(x) + C\\]',
        latexFormulas: [
          '\\int f(x) \\, dx = F(x) + C \\iff \\frac{d}{dx}[F(x) + C] = f(x)',
          '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
          '\\int \\frac{1}{x} \\, dx = \\ln|x| + C'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\int (4x^3 - 6x + 5) \\, dx\\)',
            latex: '\\int (4x^3 - 6x + 5) \\, dx',
            steps: [
              'Integrate term by term using Power Rule:',
              '\\(\\int 4x^3 \\, dx = 4 \\cdot \\frac{x^4}{4} = x^4\\)',
              '\\(\\int -6x \\, dx = -6 \\cdot \\frac{x^2}{2} = -3x^2\\)',
              '\\(\\int 5 \\, dx = 5x\\)',
              'Combine and add constant \\(C\\): \\(x^4 - 3x^2 + 5x + C\\).'
            ],
            answer: 'x^4 - 3x^2 + 5x + C'
          }
        ],
        quickCheck: {
          question: 'What is the integral of 1/x dx?',
          options: ['x^0 / 0 + C', 'ln|x| + C', '-1/x^2 + C', 'e^x + C'],
          correctIndex: 1,
          explanation: 'The power rule fails when n = -1. The unique antiderivative of 1/x is the natural logarithm ln|x| + C.'
        }
      },
      {
        id: 'exp_trig_integrals',
        title: 'Exponential & Trigonometric Integrals',
        content: 'Standard antiderivative formulas directly invert differentiation:\n- \\(\\int e^{kx} \\, dx = \\frac{1}{k}e^{kx} + C\\)\n- \\(\\int \\cos(x) \\, dx = \\sin(x) + C\\)\n- \\(\\int \\sin(x) \\, dx = -\\cos(x) + C\\)\n- \\(\\int \\sec^2(x) \\, dx = \\tan(x) + C\\)\n- \\(\\int \\sec(x) \\tan(x) \\, dx = \\sec(x) + C\\)',
        latexFormulas: [
          '\\int e^x \\, dx = e^x + C',
          '\\int \\sin x \\, dx = -\\cos x + C',
          '\\int \\cos x \\, dx = \\sin x + C'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\int (3e^{2x} + 4\\sin(x)) \\, dx\\)',
            latex: '\\int (3e^{2x} + 4\\sin(x)) \\, dx',
            steps: [
              'Antiderivative of \\(e^{2x}\\) is \\(\\frac{1}{2}e^{2x}\\), so \\(3 \\cdot \\frac{1}{2}e^{2x} = \\frac{3}{2}e^{2x}\\).',
              'Antiderivative of \\(\\sin(x)\\) is \\(-\\cos(x)\\), so \\(4(-\\cos(x)) = -4\\cos(x)\\).',
              'Final: \\(\\frac{3}{2}e^{2x} - 4\\cos(x) + C\\).'
            ],
            answer: '(3/2)e^(2x) - 4cos(x) + C'
          }
        ],
        quickCheck: {
          question: 'What is the antiderivative of cos(3x)?',
          options: ['3 sin(3x) + C', '(1/3) sin(3x) + C', '-(1/3) sin(3x) + C', '-3 sin(3x) + C'],
          correctIndex: 1,
          explanation: 'Since d/dx [sin(3x)] = 3 cos(3x), we divide by the coefficient 3 to get (1/3) sin(3x) + C.'
        }
      }
    ]
  },
  {
    id: 'integ_techniques',
    division: 'integral',
    title: '2. Integration Techniques & Transformations',
    description: 'Master U-Substitution, Integration by Parts, Trigonometric Substitution, Partial Fractions, and Improper Integrals.',
    icon: 'Shuffle',
    lessons: [
      {
        id: 'u_substitution',
        title: 'U-Substitution (The Reverse Chain Rule)',
        content: 'Substitution reverses the Chain Rule. When an integral contains a composite function multiplied by the inner function\'s derivative:\n\\[\\int f(g(x)) g\'(x) \\, dx = \\int f(u) \\, du \\quad \\text{where } u = g(x), \\, du = g\'(x) \\, dx\\]\nStrategy: choose \\(u\\) to be the "inside" expression whose derivative \\(du\\) is present elsewhere in the integrand.',
        latexFormulas: [
          '\\int f(g(x)) g\'(x) \\, dx = \\int f(u) \\, du'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\int 2x \\sqrt{x^2 + 1} \\, dx\\)',
            latex: '\\int 2x \\sqrt{x^2 + 1} \\, dx',
            steps: [
              'Let \\(u = x^2 + 1 \\implies du = 2x \\, dx\\).',
              'Substitute: \\(\\int u^{1/2} \\, du\\).',
              'Integrate: \\(\\frac{u^{3/2}}{3/2} + C = \\frac{2}{3}u^{3/2} + C\\).',
              'Back-substitute \\(u\\): \\(\\frac{2}{3}(x^2 + 1)^{3/2} + C\\).'
            ],
            answer: '(2/3)(x^2 + 1)^(3/2) + C'
          }
        ],
        quickCheck: {
          question: 'To integrate x * e^(x^2) dx, what is the ideal choice for u?',
          options: ['u = x', 'u = x^2', 'u = e^x', 'u = e^(x^2)'],
          correctIndex: 1,
          explanation: 'Setting u = x^2 gives du = 2x dx, so x dx = du/2. The integral simplifies cleanly to (1/2) int e^u du.'
        }
      },
      {
        id: 'integration_by_parts',
        title: 'Integration by Parts (The Reverse Product Rule)',
        content: 'Derived from the product rule \\((uv)\' = u\'v + uv\'\\):\n\\[\\int u \\, dv = uv - \\int v \\, du\\]\nUse the **LIATE** heuristic rule to choose \\(u\\) in order of priority:\n1. **L**ogarithmic functions (\\(\\ln x\\))\n2. **I**nverse trigonometric functions (\\(\\arctan x\\))\n3. **A**lgebraic functions (\\(x^n\\))\n4. **T**rigonometric functions (\\(\\sin x, \\cos x\\))\n5. **E**xponential functions (\\(e^x\\))',
        latexFormulas: [
          '\\int u \\, dv = uv - \\int v \\, du'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\int x e^x \\, dx\\)',
            latex: '\\int x e^x \\, dx',
            steps: [
              'By LIATE, choose \\(u = x\\) (algebraic) and \\(dv = e^x \\, dx\\).',
              'Then \\(du = dx\\) and \\(v = e^x\\).',
              'Apply formula: \\(uv - \\int v \\, du = x e^x - \\int e^x \\, dx\\).',
              'Integrate: \\(x e^x - e^x + C = e^x(x - 1) + C\\).'
            ],
            answer: 'e^x(x - 1) + C'
          }
        ],
        quickCheck: {
          question: 'When evaluating int ln(x) dx using parts, what should you choose for dv?',
          options: ['dv = ln(x) dx', 'dv = dx', 'dv = (1/x) dx', 'dv = x dx'],
          correctIndex: 1,
          explanation: 'Choose u = ln(x) (since we do not know its integral yet!) and dv = dx. Then du = (1/x)dx and v = x, giving x ln(x) - int x*(1/x)dx = x ln(x) - x + C.'
        }
      },
      {
        id: 'partial_fractions_improper',
        title: 'Partial Fractions & Improper Integrals',
        content: 'Partial fractions decomposes rational expressions \\(\\frac{P(x)}{Q(x)}\\) into simpler fractions whose denominators are linear or irreducible quadratic factors.\nImproper integrals involve infinite intervals (\\([a, \\infty)\\)) or integrands with vertical asymptotes, evaluated strictly as limits:\n\\[\\int_a^\\infty f(x) \\, dx = \\lim_{t \\to \\infty} \\int_a^t f(x) \\, dx\\]\nIf the limit is finite, the integral **converges**; otherwise, it **diverges**.',
        latexFormulas: [
          '\\frac{1}{x^2 - 1} = \\frac{1}{2(x-1)} - \\frac{1}{2(x+1)}',
          '\\int_1^\\infty \\frac{1}{x^p} \\, dx \\text{ converges } \\iff p > 1'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\int_1^\\infty \\frac{1}{x^2} \\, dx\\)',
            latex: '\\int_1^\\infty \\frac{1}{x^2} \\, dx',
            steps: [
              'Write as limit: \\(\\lim_{t \\to \\infty} \\int_1^t x^{-2} \\, dx\\).',
              'Antiderivative: \\([-x^{-1}]_1^t = -\\frac{1}{t} - \\left(-\\frac{1}{1}\\right) = 1 - \\frac{1}{t}\\).',
              'Take limit as \\(t \\to \\infty\\): \\(1 - 0 = 1\\).'
            ],
            answer: '1 (Converges)'
          }
        ],
        quickCheck: {
          question: 'Does the improper integral int_1^inf (1/x) dx converge or diverge?',
          options: ['Converges to 1', 'Converges to 0', 'Diverges to infinity', 'Converges to e'],
          correctIndex: 2,
          explanation: 'The antiderivative is ln(t) - ln(1) = ln(t). As t -> infinity, ln(t) -> infinity, so the harmonic integral diverges.'
        }
      }
    ]
  },
  {
    id: 'integ_definite_ftc',
    division: 'integral',
    title: '3. Definite Integrals & Fundamental Theorem',
    description: 'Riemann sums, signed area, properties of definite integrals, and the dual Fundamental Theorem of Calculus (FTC 1 and FTC 2).',
    icon: 'Maximize',
    lessons: [
      {
        id: 'riemann_sums',
        title: 'Riemann Sums & Definition of Definite Integral',
        content: 'The definite integral \\(\\int_a^b f(x) \\, dx\\) represents the net signed area bounded by the curve and the x-axis, defined as the limit of Riemann sums:\n\\[\\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x\\]\nwhere \\(\\Delta x = \\frac{b - a}{n}\\) and \\(x_i^*\\) is a sample point in the \\(i\\)-th subinterval (Left, Right, Midpoint, or Trapezoid rule).',
        latexFormulas: [
          '\\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(a + i\\Delta x) \\Delta x',
          '\\Delta x = \\frac{b - a}{n}'
        ],
        interactiveDemoType: 'riemann',
        workedExamples: [
          {
            problem: 'Calculate the right-endpoint Riemann sum for \\(f(x) = 2x\\) on \\([0, 3]\\) with \\(n = 3\\).',
            latex: 'f(x) = 2x, \\quad [0, 3], \\quad n = 3',
            steps: [
              '\\(\\Delta x = \\frac{3 - 0}{3} = 1\\). Subintervals are \\([0, 1], [1, 2], [2, 3]\\).',
              'Right endpoints: \\(x_1 = 1, x_2 = 2, x_3 = 3\\).',
              'Function values: \\(f(1) = 2, f(2) = 4, f(3) = 6\\).',
              'Sum: \\((2 + 4 + 6) \\times 1 = 12\\).',
              '(Exact integral is \\([x^2]_0^3 = 9\\); the right sum overestimates because \\(f\\) is increasing).'
            ],
            answer: '12'
          }
        ],
        quickCheck: {
          question: 'If a function is strictly increasing on [a, b], which Riemann sum is guaranteed to overestimate the exact integral?',
          options: ['Left Riemann Sum', 'Right Riemann Sum', 'Midpoint Rule', 'None'],
          correctIndex: 1,
          explanation: 'For an increasing function, the right endpoint has the highest value in each subinterval, making the rectangle taller than the curve throughout.'
        }
      },
      {
        id: 'fundamental_theorem_calculus',
        title: 'The Fundamental Theorem of Calculus (FTC)',
        content: 'The Fundamental Theorem bridges differentiation and integration into two reciprocal sides of the same coin:\n**FTC Part 1 (Rate of Accumulation)**: If \\(f\\) is continuous on \\([a, b]\\), then the area function \\(g(x) = \\int_a^x f(t) \\, dt\\) is differentiable on \\((a, b)\\), and:\n\\[g\'(x) = \\frac{d}{dx} \\left[\\int_a^x f(t) \\, dt\\right] = f(x)\\]\n**FTC Part 2 (Evaluation Theorem)**: If \\(F\\) is any antiderivative of \\(f\\), then:\n\\[\\int_a^b f(x) \\, dx = F(b) - F(a) = [F(x)]_a^b\\]',
        latexFormulas: [
          '\\frac{d}{dx}\\int_a^x f(t) \\, dt = f(x)',
          '\\int_a^b f(x) \\, dx = F(b) - F(a)'
        ],
        interactiveDemoType: 'ftc',
        workedExamples: [
          {
            problem: 'Find \\(\\frac{d}{dx} \\int_2^{x^3} \\cos(t) \\, dt\\)',
            latex: '\\frac{d}{dx} \\int_2^{x^3} \\cos(t) \\, dt',
            steps: [
              'Combine FTC Part 1 with the Chain Rule.',
              'Substitute the upper bound \\(u = x^3\\) into the integrand: \\(\\cos(x^3)\\).',
              'Multiply by derivative of upper bound: \\(\\frac{d}{dx}[x^3] = 3x^2\\).',
              'Result: \\(3x^2 \\cos(x^3)\\).'
            ],
            answer: '3x^2 cos(x^3)'
          }
        ],
        quickCheck: {
          question: 'What is int_0^pi sin(x) dx?',
          options: ['0', '2', '1', '-2'],
          correctIndex: 1,
          explanation: '[-cos(x)]_0^pi = -cos(pi) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2.'
        }
      }
    ]
  },
  {
    id: 'integ_applications',
    division: 'integral',
    title: '4. Geometric & Physical Applications of Integration',
    description: 'Area between curves, volumes of revolution (Disk and Washer methods), average value of a function, and kinematic motion.',
    icon: 'Box',
    lessons: [
      {
        id: 'area_between_curves',
        title: 'Area Between Curves & Average Value',
        content: 'The area between two curves \\(y = f(x)\\) (upper) and \\(y = g(x)\\) (lower) on \\([a, b]\\) is:\n\\[A = \\int_a^b [f(x) - g(x)] \\, dx\\]\nIf curves intersect, split into intervals where \\(f \\ge g\\) and \\(g \\ge f\\).\nThe average value of \\(f\\) on \\([a, b]\\) is:\n\\[f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x) \\, dx\\]',
        latexFormulas: [
          'A = \\int_a^b [f_{\\text{top}}(x) - g_{\\text{bottom}}(x)] \\, dx',
          'f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x) \\, dx'
        ],
        workedExamples: [
          {
            problem: 'Find the area between \\(y = x^2\\) and \\(y = 2x - x^2\\).',
            latex: 'y_1 = x^2, \\quad y_2 = 2x - x^2',
            steps: [
              'Find intersection points: \\(x^2 = 2x - x^2 \\implies 2x^2 - 2x = 0 \\implies 2x(x - 1) = 0\\), so \\(x = 0\\) and \\(x = 1\\).',
              'On \\([0, 1]\\), \\(2x - x^2 \\ge x^2\\).',
              'Integrate top minus bottom: \\(\\int_0^1 (2x - 2x^2) \\, dx\\).',
              'Evaluate: \\([x^2 - \\frac{2}{3}x^3]_0^1 = 1 - \\frac{2}{3} = \\frac{1}{3}\\).'
            ],
            answer: '1/3'
          }
        ],
        quickCheck: {
          question: 'What is the average value of f(x) = 6x on [0, 4]?',
          options: ['24', '12', '48', '6'],
          correctIndex: 1,
          explanation: '(1 / (4 - 0)) * int_0^4 6x dx = (1/4) * [3x^2]_0^4 = (1/4) * 3(16) = (1/4) * 48 = 12.'
        }
      },
      {
        id: 'volumes_revolution',
        title: 'Volumes of Solids of Revolution (Disk & Washer)',
        content: 'When a region rotates around a horizontal axis:\n**Disk Method** (no hole): \\(V = \\pi \\int_a^b [R(x)]^2 \\, dx\\).\n**Washer Method** (hollow core): \\(V = \\pi \\int_a^b \\left( [R_{\\text{outer}}(x)]^2 - [r_{\\text{inner}}(x)]^2 \\right) \\, dx\\).\nEach cross section perpendicular to the axis of rotation forms a circle or an annular ring (washer) of area \\(A(x) = \\pi(R^2 - r^2)\\).',
        latexFormulas: [
          'V_{\\text{disk}} = \\pi \\int_a^b [R(x)]^2 \\, dx',
          'V_{\\text{washer}} = \\pi \\int_a^b [R^2(x) - r^2(x)] \\, dx'
        ],
        workedExamples: [
          {
            problem: 'Find the volume generated by rotating \\(y = \\sqrt{x}\\) from \\(x = 0\\) to \\(x = 4\\) around the x-axis.',
            latex: 'y = \\sqrt{x}, \\quad x \\in [0, 4], \\quad \\text{axis: } y = 0',
            steps: [
              'Use Disk method: \\(R(x) = \\sqrt{x}\\).',
              'Volume: \\(V = \\pi \\int_0^4 (\\sqrt{x})^2 \\, dx = \\pi \\int_0^4 x \\, dx\\).',
              'Evaluate: \\(\\pi \\left[\\frac{x^2}{2}\\right]_0^4 = \\pi \\left(\\frac{16}{2}\\right) = 8\\pi\\).'
            ],
            answer: '8 pi'
          }
        ],
        quickCheck: {
          question: 'In the Washer Method, why is the cross-sectional area pi(R^2 - r^2) and NOT pi(R - r)^2?',
          options: [
            'Because (R-r)^2 would subtract the radii before squaring, which violates the area of concentric circles pi R^2 - pi r^2',
            'Because pi is squared',
            'It is actually the same thing',
            'Because washers only exist in three dimensions'
          ],
          correctIndex: 0,
          explanation: 'The area of an annular ring is the area of the outer disk (pi R^2) minus the area of the inner hole (pi r^2) = pi(R^2 - r^2). Squaring (R - r) would give an entirely wrong area.'
        }
      }
    ]
  }
];
