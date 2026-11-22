import { CurriculumModule } from '../../types';

export const differentialCurriculum: CurriculumModule[] = [
  {
    id: 'diff_limits',
    division: 'differential',
    title: '1. Limits & Asymptotic Behavior',
    description: 'Master the rigorous conceptual foundation of calculus, limit laws, algebraic and trigonometric evaluation, and L\'Hôpital\'s rule.',
    icon: 'Maximize2',
    lessons: [
      {
        id: 'limits_intro',
        title: 'Introduction to Limits & Intuitive Concept',
        content: 'A limit describes the value that a function approaches as the input approaches some value. Rigorously, we write \\(\\lim_{x \\to c} f(x) = L\\) to mean that for every \\(\\varepsilon > 0\\), there exists a \\(\\delta > 0\\) such that if \\(0 < |x - c| < \\delta\\), then \\(|f(x) - L| < \\varepsilon\\). Notice that \\(f(c)\\) does NOT need to exist for \\(\\lim_{x \\to c} f(x)\\) to exist.',
        latexFormulas: [
          '\\lim_{x \\to c} f(x) = L \\iff \\forall \\varepsilon > 0, \\exists \\delta > 0 : (0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon)'
        ],
        interactiveDemoType: 'graph',
        workedExamples: [
          {
            problem: 'Evaluate \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}\\)',
            latex: '\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}',
            steps: [
              'Notice direct substitution gives \\(\\frac{0}{0}\\), an indeterminate form.',
              'Factor the numerator: \\(x^2 - 4 = (x - 2)(x + 2)\\).',
              'Cancel the factor \\((x - 2)\\) since \\(x \\neq 2\\) in the limit process: \\(\\lim_{x \\to 2} (x + 2)\\).',
              'Substitute \\(x = 2\\): \\(2 + 2 = 4\\).'
            ],
            answer: '4'
          }
        ],
        quickCheck: {
          question: 'If f(3) is undefined, what can we say about lim_{x -> 3} f(x)?',
          options: [
            'It definitely does not exist',
            'It must be 0',
            'It can still exist and be any real number L',
            'It must equal infinity'
          ],
          correctIndex: 2,
          explanation: 'The limit only depends on the behavior of f(x) as x gets arbitrarily close to 3, never on the actual value f(3).'
        }
      },
      {
        id: 'one_sided_limits',
        title: 'One-Sided Limits & Existence Criterion',
        content: 'The left-hand limit \\(\\lim_{x \\to c^-} f(x)\\) approaches from values \\(x < c\\), while the right-hand limit \\(\\lim_{x \\to c^+} f(x)\\) approaches from \\(x > c\\). The two-sided limit exists if and only if both one-sided limits exist and are equal: \\(\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L\\).',
        latexFormulas: [
          '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{|x|}{x}\\)',
            latex: '\\lim_{x \\to 0} \\frac{|x|}{x}',
            steps: [
              'For \\(x > 0\\), \\(|x| = x\\), so \\(\\lim_{x \\to 0^+} \\frac{x}{x} = 1\\).',
              'For \\(x < 0\\), \\(|x| = -x\\), so \\(\\lim_{x \\to 0^-} \\frac{-x}{x} = -1\\).',
              'Since \\(1 \\neq -1\\), the left and right limits disagree.'
            ],
            answer: 'Does Not Exist (DNE)'
          }
        ],
        quickCheck: {
          question: 'If lim_{x -> 1^-} g(x) = 5 and lim_{x -> 1^+} g(x) = 5, but g(1) = 9, what is lim_{x -> 1} g(x)?',
          options: ['9', '5', 'Does not exist', '14'],
          correctIndex: 1,
          explanation: 'Since both one-sided limits are 5, the two-sided limit is 5 regardless of g(1).'
        }
      },
      {
        id: 'limit_laws',
        title: 'Limit Laws & Algebraic Evaluation',
        content: 'Limit laws state that the limit of a sum, difference, product, or quotient is the respective operation of the limits (provided the individual limits exist and denominator is non-zero). Common algebraic techniques include factoring, rationalizing conjugations (multiplying by conjugate radical), and finding common denominators.',
        latexFormulas: [
          '\\lim [f(x) \\pm g(x)] = \\lim f(x) \\pm \\lim g(x)',
          '\\lim [f(x) \\cdot g(x)] = \\lim f(x) \\cdot \\lim g(x)',
          '\\lim \\frac{f(x)}{g(x)} = \\frac{\\lim f(x)}{\\lim g(x)} \\quad (\\text{if } \\lim g(x) \\neq 0)'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x}\\)',
            latex: '\\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x}',
            steps: [
              'Multiply numerator and denominator by conjugate \\(\\sqrt{x + 9} + 3\\).',
              'Numerator: \\((\\sqrt{x+9}-3)(\\sqrt{x+9}+3) = (x+9) - 9 = x\\).',
              'Denominator: \\(x(\\sqrt{x+9} + 3)\\).',
              'Cancel \\(x\\): \\(\\lim_{x \\to 0} \\frac{1}{\\sqrt{x+9} + 3} = \\frac{1}{3 + 3} = \\frac{1}{6}\\).'
            ],
            answer: '1/6'
          }
        ],
        quickCheck: {
          question: 'What is lim_{x -> 4} (3x^2 - 5x + 2)?',
          options: ['30', '28', '32', '26'],
          correctIndex: 0,
          explanation: 'By direct substitution for polynomials: 3(4)^2 - 5(4) + 2 = 3(16) - 20 + 2 = 48 - 18 = 30.'
        }
      },
      {
        id: 'trig_limits',
        title: 'Special Trigonometric Limits & Squeeze Theorem',
        content: 'The fundamental trigonometric limits rely on geometric comparison and the Squeeze Theorem: \\(\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1\\) (where \\(\\theta\\) is in radians) and \\(\\lim_{\\theta \\to 0} \\frac{1 - \\cos \\theta}{\\theta} = 0\\). These form the backbone of trigonometric differentiation.',
        latexFormulas: [
          '\\lim_{x \\to 0} \\frac{\\sin(kx)}{kx} = 1',
          '\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\sin(3x)}\\)',
            latex: '\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\sin(3x)}',
            steps: [
              'Rewrite as \\(\\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} \\cdot \\frac{3x}{\\sin(3x)} \\cdot \\frac{5}{3}\\).',
              'Apply standard limits: \\(1 \\cdot 1 \\cdot \\frac{5}{3} = \\frac{5}{3}\\).'
            ],
            answer: '5/3'
          }
        ],
        quickCheck: {
          question: 'What is lim_{x -> 0} (x * sin(1/x))?',
          options: ['1', '0', 'Does not exist', 'Infinity'],
          correctIndex: 1,
          explanation: 'Since -1 <= sin(1/x) <= 1, multiplying by |x| yields -|x| <= x*sin(1/x) <= |x|. As x -> 0, both bounds approach 0, so by the Squeeze Theorem, the limit is 0.'
        }
      },
      {
        id: 'limits_infinity_lhopital',
        title: 'Limits at Infinity & L\'Hôpital\'s Rule',
        content: 'When evaluating limits of indeterminate form \\(\\frac{0}{0}\\) or \\(\\frac{\\infty}{\\infty}\\), L\'Hôpital\'s Rule states \\(\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f\'(x)}{g\'(x)}\\), provided this latter limit exists. Caution: verify the indeterminate form holds BEFORE differentiating!',
        latexFormulas: [
          '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)} \\quad \\left(\\text{for } \\left[\\frac{0}{0}\\right] \\text{ or } \\left[\\frac{\\infty}{\\infty}\\right]\\right)'
        ],
        workedExamples: [
          {
            problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}\\)',
            latex: '\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}',
            steps: [
              'At \\(x = 0\\), \\(\\frac{1 - 1 - 0}{0} = \\frac{0}{0}\\). Apply L\'Hôpital once: \\(\\lim_{x \\to 0} \\frac{e^x - 1}{2x}\\).',
              'Again gives \\(\\frac{0}{0}\\). Apply L\'Hôpital second time: \\(\\lim_{x \\to 0} \\frac{e^x}{2}\\).',
              'Evaluate at \\(x = 0\\): \\(\\frac{e^0}{2} = \\frac{1}{2}\\).'
            ],
            answer: '1/2'
          }
        ],
        quickCheck: {
          question: 'Can L\'Hôpital\'s Rule be applied directly to lim_{x -> 0} (cos x) / x?',
          options: [
            'Yes, it gives -sin(x) / 1 = 0',
            'No, because cos(0)/0 = 1/0, which is not an indeterminate form 0/0 or inf/inf',
            'Yes, always differentiate numerator and denominator',
            'Only if x approaches infinity'
          ],
          correctIndex: 1,
          explanation: 'L\'Hôpital\'s Rule strictly requires the ratio to be indeterminate 0/0 or +/- inf/inf. Here cos(0) = 1, so the limit is infinite (DNE).'
        }
      }
    ]
  },
  {
    id: 'diff_continuity',
    title: '2. Continuity & Global Theorems',
    description: 'Explore point-wise continuity, interval continuity, removable/jump/essential discontinuities, and the Intermediate Value Theorem.',
    icon: 'Activity',
    lessons: [
      {
        id: 'continuity_point',
        title: 'Continuity at a Point & 3 Conditions',
        content: 'A function \\(f\\) is continuous at \\(x = c\\) if and only if three strict conditions are fulfilled:\n1. \\(f(c)\\) is defined (in domain).\n2. \\(\\lim_{x \\to c} f(x)\\) exists.\n3. \\(\\lim_{x \\to c} f(x) = f(c)\\).\nIf any of these fail, \\(f\\) is discontinuous at \\(c\\).',
        latexFormulas: [
          'f \\text{ continuous at } c \\iff \\lim_{x \\to c} f(x) = f(c)'
        ],
        interactiveDemoType: 'continuity',
        workedExamples: [
          {
            problem: 'Find constant k so that f(x) is continuous at x=3: f(x) = (x^2-9)/(x-3) for x!=3, and f(3) = k.',
            latex: 'f(x) = \\begin{cases} \\frac{x^2 - 9}{x - 3} & x \\neq 3 \\\\ k & x = 3 \\end{cases}',
            steps: [
              'Evaluate the limit: \\(\\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x-3} = 3 + 3 = 6\\).',
              'For continuity, \\(f(3) = \\lim_{x \\to 3} f(x)\\).',
              'Therefore, \\(k = 6\\).'
            ],
            answer: 'k = 6'
          }
        ],
        quickCheck: {
          question: 'What kind of discontinuity does g(x) = (x - 2)/(x^2 - 4) have at x = 2?',
          options: ['Jump discontinuity', 'Removable discontinuity', 'Infinite/essential discontinuity', 'No discontinuity'],
          correctIndex: 1,
          explanation: 'At x = 2, factoring gives 1/(x+2), so lim_{x->2} g(x) = 1/4 exists. Since the limit exists but the function was undefined, it is removable.'
        }
      },
      {
        id: 'intermediate_value_theorem',
        title: 'Intermediate Value Theorem (IVT)',
        content: 'The Intermediate Value Theorem states: If \\(f\\) is continuous on a closed interval \\([a, b]\\), and \\(u\\) is any number strictly between \\(f(a)\\) and \\(f(b)\\), then there exists at least one number \\(c \\in (a, b)\\) such that \\(f(c) = u\\). A crucial corollary is Bolzano\'s Theorem: if \\(f(a)\\) and \\(f(b)\\) have opposite signs, \\(f\\) has at least one real root in \\((a, b)\\).',
        latexFormulas: [
          'f \\in C[a,b], \\, u \\in (f(a), f(b)) \\implies \\exists c \\in (a,b) : f(c) = u'
        ],
        workedExamples: [
          {
            problem: 'Prove that \\(x^5 - 3x - 1 = 0\\) has a solution in \\([1, 2]\\).',
            latex: 'f(x) = x^5 - 3x - 1 \\quad \\text{on } [1, 2]',
            steps: [
              'Polynomials are continuous everywhere, so \\(f\\) is continuous on \\([1, 2]\\).',
              'Evaluate at endpoints: \\(f(1) = 1 - 3 - 1 = -3 < 0\\).',
              '\\(f(2) = 32 - 6 - 1 = 25 > 0\\).',
              'Since \\(0\\) lies between \\(-3\\) and \\(25\\), by IVT there exists \\(c \\in (1, 2)\\) such that \\(f(c) = 0\\).'
            ],
            answer: 'Root exists in (1, 2)'
          }
        ],
        quickCheck: {
          question: 'Why does IVT fail for h(x) = 1/x on [-1, 1] seeking h(c) = 0?',
          options: [
            'Because 0 is not between h(-1) and h(1)',
            'Because h(x) is discontinuous at x = 0 (infinite discontinuity)',
            'Because h(x) is not differentiable',
            'IVT never fails'
          ],
          correctIndex: 1,
          explanation: 'Continuity on the ENTIRE closed interval [a, b] is an absolute prerequisite. Since 1/x has an asymptote at 0, IVT cannot be applied.'
        }
      }
    ]
  },
  {
    id: 'diff_fundamentals',
    title: '3. Differentiation Fundamentals & Core Rules',
    description: 'Learn the first principles definition, the power, product, quotient, and chain rules, plus implicit and logarithmic differentiation.',
    icon: 'Percent',
    lessons: [
      {
        id: 'derivative_first_principles',
        title: 'Definition of Derivative from First Principles',
        content: 'The derivative \\(f\'(x)\\) is the limit of the average rate of change (secant slope) as the step \\(h \\to 0\\):\n\\[f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}\\]\nGeometrically, this is the slope of the tangent line to the curve at \\((x, f(x))\\).',
        latexFormulas: [
          'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
          'f\'(a) = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}'
        ],
        interactiveDemoType: 'tangent',
        workedExamples: [
          {
            problem: 'Find the derivative of \\(f(x) = x^2\\) using the limit definition.',
            latex: 'f(x) = x^2',
            steps: [
              'Write the difference quotient: \\(\\frac{(x+h)^2 - x^2}{h}\\).',
              'Expand: \\(\\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h}\\).',
              'Factor \\(h\\): \\(\\frac{h(2x + h)}{h} = 2x + h\\).',
              'Take limit as \\(h \\to 0\\): \\(2x + 0 = 2x\\).'
            ],
            answer: '2x'
          }
        ],
        quickCheck: {
          question: 'If a function is differentiable at x = a, must it be continuous at x = a?',
          options: [
            'Yes, differentiability strictly implies continuity',
            'No, continuity has nothing to do with differentiability',
            'Only if the derivative is positive',
            'No, continuity implies differentiability instead'
          ],
          correctIndex: 0,
          explanation: 'Differentiability implies continuity: if f\'(a) exists, lim_{x->a} [f(x) - f(a)] = lim (f(x)-f(a))/(x-a) * (x-a) = f\'(a) * 0 = 0. The converse is false (e.g. |x| at 0).'
        }
      },
      {
        id: 'power_product_quotient',
        title: 'Power, Product, and Quotient Rules',
        content: '1. Power Rule: \\(\\frac{d}{dx} [x^n] = n x^{n-1}\\) for any real \\(n\\).\n2. Product Rule: \\(\\frac{d}{dx} [uv] = u\'v + uv\'\\).\n3. Quotient Rule: \\(\\frac{d}{dx} \\left[\\frac{u}{v}\\right] = \\frac{u\'v - uv\'}{v^2}\\) ("low d-high minus high d-low over low squared").',
        latexFormulas: [
          '\\frac{d}{dx}[x^n] = n x^{n-1}',
          '(uv)\' = u\'v + uv\'',
          '\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}'
        ],
        workedExamples: [
          {
            problem: 'Differentiate \\(h(x) = \\frac{x^3 + 1}{x^2 + 2}\\)',
            latex: 'h(x) = \\frac{x^3 + 1}{x^2 + 2}',
            steps: [
              'Let \\(u = x^3 + 1 \\implies u\' = 3x^2\\).',
              'Let \\(v = x^2 + 2 \\implies v\' = 2x\\).',
              'Apply Quotient Rule: \\(h\'(x) = \\frac{(3x^2)(x^2 + 2) - (x^3 + 1)(2x)}{(x^2 + 2)^2}\\).',
              'Expand numerator: \\(3x^4 + 6x^2 - 2x^4 - 2x = x^4 + 6x^2 - 2x\\).'
            ],
            answer: '(x^4 + 6x^2 - 2x) / (x^2 + 2)^2'
          }
        ],
        quickCheck: {
          question: 'What is d/dx [x^4 * sin(x)]?',
          options: [
            '4x^3 * cos(x)',
            '4x^3 * sin(x) + x^4 * cos(x)',
            '4x^3 * sin(x) - x^4 * cos(x)',
            'x^3 * (sin(x) + cos(x))'
          ],
          correctIndex: 1,
          explanation: 'By the Product Rule (uv)\' = u\'v + uv\', with u = x^4, v = sin(x), we get 4x^3 sin(x) + x^4 cos(x).'
        }
      },
      {
        id: 'chain_rule',
        title: 'The Chain Rule for Composite Functions',
        content: 'When a function is composed inside another, \\(y = f(g(x))\\), the rate of change multiplies:\n\\[\\frac{dy}{dx} = f\'(g(x)) \\cdot g\'(x) \\quad \\text{or} \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\]\nAlways differentiate the "outside" holding the "inside" constant, then multiply by the derivative of the inside.',
        latexFormulas: [
          '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)'
        ],
        workedExamples: [
          {
            problem: 'Find the derivative of \\(y = (3x^2 - 5x + 7)^4\\)',
            latex: 'y = (3x^2 - 5x + 7)^4',
            steps: [
              'Outer function: \\(u^4 \\implies 4u^3\\).',
              'Inner function: \\(u = 3x^2 - 5x + 7 \\implies u\' = 6x - 5\\).',
              'Chain Rule: \\(4(3x^2 - 5x + 7)^3 \\cdot (6x - 5)\\).'
            ],
            answer: '4(6x - 5)(3x^2 - 5x + 7)^3'
          }
        ],
        quickCheck: {
          question: 'What is d/dx [sin(x^3)]?',
          options: [
            '3x^2 * cos(x^3)',
            'cos(3x^2)',
            '3x^2 * sin(x^2)',
            'cos(x^3)'
          ],
          correctIndex: 0,
          explanation: 'Outer function is sin(u) -> cos(u). Inner function is u = x^3 -> 3x^2. Product is 3x^2 cos(x^3).'
        }
      },
      {
        id: 'implicit_logarithmic',
        title: 'Implicit & Logarithmic Differentiation',
        content: 'When an equation relates \\(x\\) and \\(y\\) implicitly (e.g. \\(x^2 + y^2 = 25\\)), differentiate both sides with respect to \\(x\\), remembering by the Chain Rule that \\(\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}\\). Then algebraically solve for \\(\\frac{dy}{dx}\\).\nLogarithmic differentiation uses \\(\\ln(y)\\) to break down complicated products, quotients, and variable towers \\(y = f(x)^{g(x)}\\).',
        latexFormulas: [
          '\\frac{d}{dx}[y^2] = 2y \\frac{dy}{dx}',
          'y = x^x \\implies \\ln y = x \\ln x \\implies \\frac{y\'}{y} = \\ln x + 1 \\implies y\' = x^x(1 + \\ln x)'
        ],
        workedExamples: [
          {
            problem: 'Find \\(\\frac{dy}{dx}\\) on the circle \\(x^2 + y^2 = 25\\).',
            latex: 'x^2 + y^2 = 25',
            steps: [
              'Differentiate both sides with respect to \\(x\\): \\(2x + 2y \\frac{dy}{dx} = 0\\).',
              'Subtract \\(2x\\): \\(2y \\frac{dy}{dx} = -2x\\).',
              'Divide by \\(2y\\): \\(\\frac{dy}{dx} = -\\frac{x}{y}\\).'
            ],
            answer: '-x / y'
          }
        ],
        quickCheck: {
          question: 'What is d/dx [x^x] for x > 0?',
          options: [
            'x * x^(x-1) = x^x',
            'x^x * (1 + ln(x))',
            'x^x * ln(x)',
            'x^(x-1)'
          ],
          correctIndex: 1,
          explanation: 'Taking ln of both sides gives ln(y) = x ln(x). Differentiating implicitly gives y\'/y = 1*ln(x) + x*(1/x) = ln(x) + 1. Multiplying by y = x^x yields x^x (1 + ln x).'
        }
      }
    ]
  },
  {
    id: 'diff_functions',
    title: '4. Derivatives of Specific Function Families',
    description: 'Catalog derivatives of polynomial, rational, exponential, logarithmic, trigonometric, inverse trig, and hyperbolic functions.',
    icon: 'Layers',
    lessons: [
      {
        id: 'exp_log_derivatives',
        title: 'Exponential & Logarithmic Derivatives',
        content: 'Natural exponential function \\(e^x\\) is its own derivative: \\(\\frac{d}{dx}[e^x] = e^x\\). For arbitrary base \\(a > 0\\), \\(\\frac{d}{dx}[a^x] = a^x \\ln a\\).\nThe natural logarithm has \\(\\frac{d}{dx}[\\ln x] = \\frac{1}{x}\\) for \\(x > 0\\), and \\(\\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}\\).',
        latexFormulas: [
          '\\frac{d}{dx}[e^x] = e^x',
          '\\frac{d}{dx}[a^x] = a^x \\ln(a)',
          '\\frac{d}{dx}[\\ln |x|] = \\frac{1}{x}',
          '\\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}'
        ],
        workedExamples: [
          {
            problem: 'Differentiate \\(f(x) = e^{-3x^2}\\)',
            latex: 'f(x) = e^{-3x^2}',
            steps: [
              'Chain rule with outer \\(e^u\\) and inner \\(u = -3x^2\\).',
              '\\(u\' = -6x\\).',
              '\\(f\'(x) = e^{-3x^2} \\cdot (-6x) = -6x e^{-3x^2}\\).'
            ],
            answer: '-6x e^(-3x^2)'
          }
        ],
        quickCheck: {
          question: 'What is d/dx [ln(5x)] for x > 0?',
          options: ['5/x', '1/x', '1/(5x)', 'ln(5)/x'],
          correctIndex: 1,
          explanation: 'By chain rule: (1/(5x)) * 5 = 1/x. Alternatively, ln(5x) = ln(5) + ln(x), so its derivative is 0 + 1/x = 1/x.'
        }
      },
      {
        id: 'trig_inverse_trig',
        title: 'Trigonometric & Inverse Trigonometric Functions',
        content: 'The derivatives of the 6 standard trig functions:\n- \\(\\frac{d}{dx}[\\sin x] = \\cos x\\)\n- \\(\\frac{d}{dx}[\\cos x] = -\\sin x\\)\n- \\(\\frac{d}{dx}[\\tan x] = \\sec^2 x\\)\n- \\(\\frac{d}{dx}[\\cot x] = -\\csc^2 x\\)\n- \\(\\frac{d}{dx}[\\sec x] = \\sec x \\tan x\\)\n- \\(\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x\\)\nAnd the crucial inverse trig formulas:\n- \\(\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1 - x^2}}\\)\n- \\(\\frac{d}{dx}[\\arctan x] = \\frac{1}{1 + x^2}\\)',
        latexFormulas: [
          '\\frac{d}{dx}[\\arcsin(x)] = \\frac{1}{\\sqrt{1 - x^2}}',
          '\\frac{d}{dx}[\\arctan(x)] = \\frac{1}{1 + x^2}'
        ],
        workedExamples: [
          {
            problem: 'Differentiate \\(y = \\arctan(4x)\\)',
            latex: 'y = \\arctan(4x)',
            steps: [
              'Apply chain rule: \\(\\frac{d}{dx}[\\arctan(u)] = \\frac{1}{1 + u^2} \\cdot u\'\\).',
              'Here \\(u = 4x \\implies u^2 = 16x^2\\) and \\(u\' = 4\\).',
              'Result: \\(\\frac{4}{1 + 16x^2}\\).'
            ],
            answer: '4 / (1 + 16x^2)'
          }
        ],
        quickCheck: {
          question: 'What is d/dx [tan(x)]?',
          options: ['sec(x) tan(x)', 'sec^2(x)', '-csc^2(x)', 'cos^2(x)'],
          correctIndex: 1,
          explanation: 'Using quotient rule on sin(x)/cos(x): (cos^2 x - (-sin^2 x))/cos^2 x = (cos^2 x + sin^2 x)/cos^2 x = 1/cos^2 x = sec^2(x).'
        }
      }
    ]
  },
  {
    id: 'diff_applications',
    title: '5. Applications of Derivatives',
    description: 'Optimization, related rates, tangent & normal lines, Mean Value Theorem, curve sketching, concavity, and inflection points.',
    icon: 'TrendingUp',
    lessons: [
      {
        id: 'tangents_normals',
        title: 'Tangent & Normal Lines to Curves',
        content: 'The tangent line to \\(y = f(x)\\) at \\((x_0, y_0)\\) has slope \\(m = f\'(x_0)\\). Its equation in point-slope form is:\n\\[y - y_0 = f\'(x_0)(x - x_0)\\]\nThe normal line is perpendicular to the tangent line, so its slope is \\(m_{\\perp} = -\\frac{1}{f\'(x_0)}\\) (provided \\(f\'(x_0) \\neq 0\\)).',
        latexFormulas: [
          'y - y_0 = f\'(x_0)(x - x_0) \\quad (\\text{Tangent})',
          'y - y_0 = -\\frac{1}{f\'(x_0)}(x - x_0) \\quad (\\text{Normal})'
        ],
        workedExamples: [
          {
            problem: 'Find the tangent line to \\(f(x) = x^3 - 2x + 1\\) at \\(x = 2\\).',
            latex: 'f(x) = x^3 - 2x + 1, \\quad x = 2',
            steps: [
              'Point: \\(f(2) = 8 - 4 + 1 = 5\\), so point is \\((2, 5)\\).',
              'Derivative: \\(f\'(x) = 3x^2 - 2\\).',
              'Slope: \\(m = f\'(2) = 3(4) - 2 = 10\\).',
              'Equation: \\(y - 5 = 10(x - 2) \\implies y = 10x - 15\\).'
            ],
            answer: 'y = 10x - 15'
          }
        ],
        quickCheck: {
          question: 'If the tangent line to a curve at (1, 3) has slope 4, what is the slope of the normal line?',
          options: ['4', '-4', '-1/4', '1/4'],
          correctIndex: 2,
          explanation: 'Perpendicular lines have negative reciprocal slopes: m_normal = -1/m_tangent = -1/4.'
        }
      },
      {
        id: 'mvt_rolle',
        title: 'Mean Value Theorem & Rolle\'s Theorem',
        content: 'Rolle\'s Theorem: If \\(f\\) is continuous on \\([a, b]\\), differentiable on \\((a, b)\\), and \\(f(a) = f(b)\\), then there exists at least one \\(c \\in (a, b)\\) such that \\(f\'(c) = 0\\).\nMean Value Theorem (MVT): If \\(f\\) is continuous on \\([a, b]\\) and differentiable on \\((a, b)\\), then there exists at least one \\(c \\in (a, b)\\) such that:\n\\[f\'(c) = \\frac{f(b) - f(a)}{b - a}\\]\nThis guarantees instantaneous rate of change equals average rate of change at some point.',
        latexFormulas: [
          '\\exists c \\in (a, b) : f\'(c) = \\frac{f(b) - f(a)}{b - a}'
        ],
        workedExamples: [
          {
            problem: 'Find the value of c guaranteed by MVT for \\(f(x) = x^2\\) on \\([0, 4]\\).',
            latex: 'f(x) = x^2 \\quad \\text{on } [0, 4]',
            steps: [
              'Average slope: \\(\\frac{f(4) - f(0)}{4 - 0} = \\frac{16 - 0}{4} = 4\\).',
              'Derivative: \\(f\'(x) = 2x\\).',
              'Set \\(f\'(c) = 4 \\implies 2c = 4 \\implies c = 2\\).',
              'Notice \\(c = 2 \\in (0, 4)\\).'
            ],
            answer: 'c = 2'
          }
        ],
        quickCheck: {
          question: 'If a car travels 120 miles in 2 hours, what does the Mean Value Theorem guarantee?',
          options: [
            'The car traveled at exactly 60 mph the entire time',
            'At some moment during the 2 hours, the speedometer read exactly 60 mph',
            'The car never exceeded 60 mph',
            'The car stopped at least once'
          ],
          correctIndex: 1,
          explanation: 'MVT proves that the instantaneous speed f\'(c) must equal the average speed (120 miles / 2 hours = 60 mph) at some point c during the trip.'
        }
      },
      {
        id: 'optimization_extrema',
        title: 'Curve Analysis, Inflection Points & Optimization',
        content: 'To optimize an objective function \\(f(x)\\):\n1. Find critical points where \\(f\'(x) = 0\\) or \\(f\'(x)\\) is undefined.\n2. First Derivative Test: if \\(f\'\\) changes \\(+ \\to -\\), local max; if \\(- \\to +\\), local min.\n3. Second Derivative Test: if \\(f\'(c) = 0\\) and \\(f\'\'(c) > 0\\), local min (concave up); if \\(f\'\'(c) < 0\\), local max (concave down).\n4. Inflection points occur where concavity changes sign (\\(f\'\'(x) = 0\\) or undefined with sign change).',
        latexFormulas: [
          'f\'(c) = 0 \\land f\'\'(c) > 0 \\implies \\text{Local Minimum}',
          'f\'(c) = 0 \\land f\'\'(c) < 0 \\implies \\text{Local Maximum}',
          'f\'\'(x) \\text{ changes sign} \\implies \\text{Inflection Point}'
        ],
        workedExamples: [
          {
            problem: 'Find dimensions of a rectangle with perimeter 40 that maximizes area.',
            latex: 'P = 2x + 2y = 40, \\quad A = xy',
            steps: [
              'Constraint: \\(x + y = 20 \\implies y = 20 - x\\).',
              'Area function: \\(A(x) = x(20 - x) = 20x - x^2\\).',
              'Derivative: \\(A\'(x) = 20 - 2x = 0 \\implies x = 10\\).',
              'Second derivative: \\(A\'\'(x) = -2 < 0\\) (confirms maximum).',
              'Dimensions: \\(x = 10, y = 10\\) (a square), max area = 100.'
            ],
            answer: '10 by 10 (Area = 100)'
          }
        ],
        quickCheck: {
          question: 'If f\'(3) = 0 and f\'\'(3) = 8, what happens at x = 3?',
          options: [
            'Local maximum',
            'Local minimum',
            'Inflection point',
            'Inconclusive'
          ],
          correctIndex: 1,
          explanation: 'By the Second Derivative Test, since f\'\'(3) > 0, the curve is concave up (bowl-shaped), so x = 3 is a local minimum.'
        }
      }
    ]
  }
];
