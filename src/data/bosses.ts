import { BossChallenge } from '../types';

export const calculusBosses: BossChallenge[] = [
  {
    id: 'boss_limit_guardian',
    name: 'The Limit Guardian',
    title: 'Warden of the Infinitesimal Threshold',
    lore: 'An ancient sentient entity residing at the boundary where delta approaches zero. It guards the gateway into the calculus cosmos and tests whether travelers can resolve indeterminate singularities.',
    avatar: '🛡️',
    themeColor: '#38bdf8', // Cyan
    difficulty: 'FOUNDATION',
    rewardXp: 350,
    rewardBadge: 'Keeper of Zero',
    stages: [
      {
        stageNumber: 1,
        bossHp: 100,
        bossAttackName: 'Removable Rift',
        dialogue: 'Halt, novice! To cross this threshold, you must collapse this indeterminate fracture: evaluate lim_{x -> 4} (x - 4)/(sqrt(x) - 2)!',
        question: {
          id: 'bg_stage_1',
          subjectId: 'differential_calculus',
          subtopic: 'Limits',
          difficulty: 'FOUNDATION',
          type: 'multiple_choice',
          prompt: 'Evaluate: lim_{x -> 4} (x - 4) / (sqrt(x) - 2).',
          latexPrompt: '\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}',
          options: [
            { id: 'a', text: '4', latex: '4' },
            { id: 'b', text: '2', latex: '2' },
            { id: 'c', text: '0', latex: '0' },
            { id: 'd', text: 'Undefined', latex: '\\text{Undefined}' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a', '4'],
          hints: ['Multiply top and bottom by sqrt(x) + 2, or factor x - 4 as (sqrt(x) - 2)(sqrt(x) + 2).'],
          solution: {
            ruleOrTechnique: 'Radical Factoring',
            whyItApplies: 'Direct evaluation gives 0/0. Factoring numerator removes the radical zero factor.',
            steps: [
              {
                stepNumber: 1,
                title: 'Factor',
                explanation: 'x - 4 = (sqrt(x) - 2)(sqrt(x) + 2).'
              },
              {
                stepNumber: 2,
                title: 'Evaluate',
                explanation: 'sqrt(4) + 2 = 2 + 2 = 4.'
              }
            ],
            finalAnswerLatex: '4'
          }
        }
      },
      {
        stageNumber: 2,
        bossHp: 150,
        bossAttackName: 'Oscillating Squeeze',
        dialogue: 'Impressive, but can your mind withstand the Squeeze Theorem? Evaluate lim_{x -> 0} x^2 * cos(1/x)!',
        question: {
          id: 'bg_stage_2',
          subjectId: 'differential_calculus',
          subtopic: 'Squeeze Theorem',
          difficulty: 'INTERMEDIATE',
          type: 'multiple_choice',
          prompt: 'Evaluate: lim_{x -> 0} [x^2 * cos(1/x)].',
          latexPrompt: '\\lim_{x \\to 0} x^2 \\cos\\left(\\frac{1}{x}\\right)',
          options: [
            { id: 'a', text: '0', latex: '0' },
            { id: 'b', text: '1', latex: '1' },
            { id: 'c', text: 'Does not exist', latex: '\\text{DNE}' },
            { id: 'd', text: 'Infinity', latex: '\\infty' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a', '0'],
          hints: ['Remember that -1 <= cos(theta) <= 1 for all real theta.'],
          solution: {
            ruleOrTechnique: 'Squeeze Theorem (Sandwich Theorem)',
            whyItApplies: 'Cosine is bounded between -1 and 1, while x^2 converges to 0.',
            steps: [
              {
                stepNumber: 1,
                title: 'Bounding',
                explanation: '-1 <= cos(1/x) <= 1 -> -x^2 <= x^2 cos(1/x) <= x^2.'
              },
              {
                stepNumber: 2,
                title: 'Limit Comparison',
                explanation: 'As x -> 0, both -x^2 and x^2 go to 0. Hence the limit is 0.'
              }
            ],
            finalAnswerLatex: '0'
          }
        }
      }
    ]
  },
  {
    id: 'boss_derivative_master',
    name: 'The Derivative Master',
    title: 'Architect of Instantaneous Velocities',
    lore: 'Master of tangent planes and curvature, who sees the universe not as static shapes, but as dynamic trajectories curving through space.',
    avatar: '⚡',
    themeColor: '#818cf8', // Indigo
    difficulty: 'INTERMEDIATE',
    rewardXp: 500,
    rewardBadge: 'Tangent Master',
    stages: [
      {
        stageNumber: 1,
        bossHp: 120,
        bossAttackName: 'Tangent Strike',
        dialogue: 'Let us see if you can differentiate under pressure! What is the slope of the tangent to y = ln(x^2 + 1) at x = 1?',
        question: {
          id: 'dm_stage_1',
          subjectId: 'differential_calculus',
          subtopic: 'Chain Rule Derivatives',
          difficulty: 'INTERMEDIATE',
          type: 'multiple_choice',
          prompt: 'Find the slope of y = ln(x^2 + 1) at x = 1.',
          latexPrompt: 'y = \\ln(x^2 + 1) \\implies \\left. \\frac{dy}{dx} \\right|_{x=1} = ?',
          options: [
            { id: 'a', text: '1', latex: '1' },
            { id: 'b', text: '1/2', latex: '\\frac{1}{2}' },
            { id: 'c', text: '2', latex: '2' },
            { id: 'd', text: '0', latex: '0' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a', '1'],
          hints: ['d/dx[ln(u)] = (1/u) * u\'. Here u = x^2 + 1.'],
          solution: {
            ruleOrTechnique: 'Logarithmic Chain Rule',
            whyItApplies: 'Derivative of natural logarithm composed with quadratic.',
            steps: [
              {
                stepNumber: 1,
                title: 'Differentiate',
                explanation: 'dy/dx = (1/(x^2 + 1)) * 2x = 2x / (x^2 + 1).'
              },
              {
                stepNumber: 2,
                title: 'Substitute x = 1',
                explanation: '2(1) / (1^2 + 1) = 2 / 2 = 1.'
              }
            ],
            finalAnswerLatex: '1'
          }
        }
      }
    ]
  },
  {
    id: 'boss_chain_rule_architect',
    name: 'The Chain Rule Architect',
    title: 'Weaver of Nested Dimensions',
    lore: 'Constructs labyrinthine nested functions where every layer multiplies the gradient of the next.',
    avatar: '⛓️',
    themeColor: '#a855f7', // Purple
    difficulty: 'ADVANCED',
    rewardXp: 650,
    rewardBadge: 'Nested Sovereign',
    stages: [
      {
        stageNumber: 1,
        bossHp: 140,
        bossAttackName: 'Triple Nesting',
        dialogue: 'Unravel my triple-nested composite: differentiate f(x) = sin(e^(x^2))!',
        question: {
          id: 'cra_stage_1',
          subjectId: 'differential_calculus',
          subtopic: 'Triple Chain Rule',
          difficulty: 'ADVANCED',
          type: 'multiple_choice',
          prompt: 'Find f\'(x) for f(x) = sin(e^(x^2)).',
          latexPrompt: 'f(x) = \\sin(e^{x^2}) \\implies f\'(x) = ?',
          options: [
            { id: 'a', text: '2x * e^(x^2) * cos(e^(x^2))', latex: '2x e^{x^2} \\cos(e^{x^2})' },
            { id: 'b', text: 'e^(x^2) * cos(e^(x^2))', latex: 'e^{x^2} \\cos(e^{x^2})' },
            { id: 'c', text: '2x * cos(e^(x^2))', latex: '2x \\cos(e^{x^2})' },
            { id: 'd', text: '-2x e^(x^2) * cos(e^(x^2))', latex: '-2x e^{x^2} \\cos(e^{x^2})' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a'],
          hints: ['Work from outside in: d/du[sin(u)] = cos(u), d/dv[e^v] = e^v, d/dx[x^2] = 2x.'],
          solution: {
            ruleOrTechnique: 'Chain Rule (Multi-tier)',
            whyItApplies: 'Three nested layers of functional composition.',
            steps: [
              {
                stepNumber: 1,
                title: 'Apply Chain Rule',
                explanation: 'cos(e^(x^2)) * (e^(x^2)) * (2x) = 2x e^(x^2) cos(e^(x^2)).'
              }
            ],
            finalAnswerLatex: '2x e^{x^2} \\cos(e^{x^2})'
          }
        }
      }
    ]
  },
  {
    id: 'boss_optimization_engineer',
    name: 'The Optimization Engineer',
    title: 'Extremum Overlord',
    lore: 'Calculates the exact critical points of efficiency, minimizing cost and maximizing power across all engineering manifolds.',
    avatar: '📐',
    themeColor: '#10b981', // Emerald
    difficulty: 'ADVANCED',
    rewardXp: 700,
    rewardBadge: 'Extremum Sovereign',
    stages: [
      {
        stageNumber: 1,
        bossHp: 150,
        bossAttackName: 'Critical Surge',
        dialogue: 'Find the absolute maximum value of f(x) = x * e^(-x) on [0, infinity)!',
        question: {
          id: 'oe_stage_1',
          subjectId: 'differential_calculus',
          subtopic: 'Optimization',
          difficulty: 'ADVANCED',
          type: 'multiple_choice',
          prompt: 'Find the maximum value of f(x) = x * e^(-x) for x >= 0.',
          latexPrompt: '\\max_{x \\ge 0} \\left( x e^{-x} \\right) = ?',
          options: [
            { id: 'a', text: '1/e', latex: '\\frac{1}{e}' },
            { id: 'b', text: '1', latex: '1' },
            { id: 'c', text: 'e', latex: 'e' },
            { id: 'd', text: '0', latex: '0' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a', '1/e'],
          hints: ['Differentiate with product rule: f\'(x) = e^(-x) - x e^(-x) = e^(-x)(1 - x).'],
          solution: {
            ruleOrTechnique: 'First Derivative Test for Absolute Extrema',
            whyItApplies: 'Find critical point where f\'(x) = 0 on [0, infinity).',
            steps: [
              {
                stepNumber: 1,
                title: 'Differentiate',
                explanation: 'f\'(x) = 1*e^(-x) + x(-e^(-x)) = e^(-x)(1 - x).'
              },
              {
                stepNumber: 2,
                title: 'Solve f\'(x) = 0',
                explanation: 'Since e^(-x) > 0 always, 1 - x = 0 -> x = 1.'
              },
              {
                stepNumber: 3,
                title: 'Calculate Max Value',
                explanation: 'f(1) = 1 * e^(-1) = 1/e.'
              }
            ],
            finalAnswerLatex: '\\frac{1}{e}'
          }
        }
      }
    ]
  },
  {
    id: 'boss_integral_alchemist',
    name: 'The Integral Alchemist',
    title: 'Transmuter of Areas and Volumes',
    lore: 'Commands the mystical crucible of integration, dissolving curves into their infinite differential slices and transmuting them into exact closed forms.',
    avatar: '⚗️',
    themeColor: '#f59e0b', // Amber
    difficulty: 'INTERMEDIATE',
    rewardXp: 600,
    rewardBadge: 'Alchemical Integrator',
    stages: [
      {
        stageNumber: 1,
        bossHp: 130,
        bossAttackName: 'Catalytic Antiderivative',
        dialogue: 'Transmute this integral: what is int (1 / (1 + x^2)) dx?',
        question: {
          id: 'ia_stage_1',
          subjectId: 'integral_calculus',
          subtopic: 'Standard Integrals',
          difficulty: 'BEGINNER',
          type: 'multiple_choice',
          prompt: 'Evaluate: int (1 / (1 + x^2)) dx.',
          latexPrompt: '\\int \\frac{1}{1 + x^2} \\, dx',
          options: [
            { id: 'a', text: 'arctan(x) + C', latex: '\\arctan(x) + C' },
            { id: 'b', text: 'ln|1 + x^2| + C', latex: '\\ln|1 + x^2| + C' },
            { id: 'c', text: 'arcsin(x) + C', latex: '\\arcsin(x) + C' },
            { id: 'd', text: '-1/(1 + x) + C', latex: '-\\frac{1}{1 + x} + C' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a'],
          hints: ['Recall inverse trigonometric derivatives: d/dx[arctan x] = 1/(1 + x^2).'],
          solution: {
            ruleOrTechnique: 'Inverse Trigonometric Antiderivative',
            whyItApplies: 'Direct standard derivative inversion.',
            steps: [
              {
                stepNumber: 1,
                title: 'Recognize Derivative',
                explanation: 'd/dx[arctan(x)] = 1 / (1 + x^2).'
              }
            ],
            finalAnswerLatex: '\\arctan(x) + C'
          }
        }
      }
    ]
  },
  {
    id: 'boss_substitution_specialist',
    name: 'The Substitution Specialist',
    title: 'Shape-Shifter of Variables',
    lore: 'A master of disguises who transforms impenetrable differential equations into simple polynomials with a flick of a u-substitution.',
    avatar: '🌀',
    themeColor: '#ec4899', // Pink
    difficulty: 'ADVANCED',
    rewardXp: 750,
    rewardBadge: 'Substitution Sage',
    stages: [
      {
        stageNumber: 1,
        bossHp: 150,
        bossAttackName: 'Tangent Half-Angle Morph',
        dialogue: 'Can you see through my disguise? Evaluate int (cos(ln x) / x) dx!',
        question: {
          id: 'ss_stage_1',
          subjectId: 'integral_calculus',
          subtopic: 'U-Substitution',
          difficulty: 'INTERMEDIATE',
          type: 'multiple_choice',
          prompt: 'Evaluate: int (cos(ln x) / x) dx.',
          latexPrompt: '\\int \\frac{\\cos(\\ln x)}{x} \\, dx',
          options: [
            { id: 'a', text: 'sin(ln x) + C', latex: '\\sin(\\ln x) + C' },
            { id: 'b', text: '-sin(ln x) + C', latex: '-\\sin(\\ln x) + C' },
            { id: 'c', text: 'cos(ln x) + C', latex: '\\cos(\\ln x) + C' },
            { id: 'd', text: 'ln|cos x| + C', latex: '\\ln|\\cos x| + C' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a'],
          hints: ['Notice that (1/x) dx is exactly d(ln x). Let u = ln(x).'],
          solution: {
            ruleOrTechnique: 'Logarithmic U-Substitution',
            whyItApplies: 'Derivative of ln(x) is 1/x dx.',
            steps: [
              {
                stepNumber: 1,
                title: 'Substitute',
                explanation: 'u = ln(x) -> du = (1/x) dx.'
              },
              {
                stepNumber: 2,
                title: 'Integrate',
                explanation: 'int cos(u) du = sin(u) + C = sin(ln x) + C.'
              }
            ],
            finalAnswerLatex: '\\sin(\\ln x) + C'
          }
        }
      }
    ]
  },
  {
    id: 'boss_infinite_challenger',
    name: 'The Infinite Challenger',
    title: 'The Singularity at the End of Time',
    lore: 'The ultimate boss of the Calculus Academy. It embodies improper integrals, divergent series, and the infinite abyss where Riemann sums meet their limit.',
    avatar: '🌌',
    themeColor: '#ef4444', // Red
    difficulty: 'ELITE',
    rewardXp: 1200,
    rewardBadge: 'Master of the Infinite',
    stages: [
      {
        stageNumber: 1,
        bossHp: 200,
        bossAttackName: 'Gaussian Collapse',
        dialogue: 'Face the pinnacle of analysis! What is the exact value of the Gaussian integral int_(-inf)^inf e^(-x^2) dx?',
        question: {
          id: 'ic_stage_1',
          subjectId: 'integral_calculus',
          subtopic: 'Gaussian Integral & Polar Coordinates',
          difficulty: 'ELITE',
          type: 'multiple_choice',
          prompt: 'Evaluate the Gaussian Integral: int_{-inf}^inf e^(-x^2) dx.',
          latexPrompt: '\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = ?',
          options: [
            { id: 'a', text: 'sqrt(pi)', latex: '\\sqrt{\\pi}' },
            { id: 'b', text: 'pi', latex: '\\pi' },
            { id: 'c', text: 'sqrt(2 * pi)', latex: '\\sqrt{2\\pi}' },
            { id: 'd', text: '1', latex: '1' }
          ],
          correctAnswer: 'a',
          acceptableAnswers: ['a'],
          hints: ['Square the integral: I^2 = int int e^(-(x^2 + y^2)) dx dy, then convert to polar coordinates r dr dtheta.'],
          solution: {
            ruleOrTechnique: 'Polar Coordinate Transformation',
            whyItApplies: 'e^(-x^2) has no elementary antiderivative, but squaring gives rotationally symmetric bivariate Gaussian.',
            steps: [
              {
                stepNumber: 1,
                title: 'Square the Integral',
                explanation: 'I^2 = int_0^(2pi) dtheta int_0^inf e^(-r^2) r dr.'
              },
              {
                stepNumber: 2,
                title: 'Radial Integration',
                explanation: 'int_0^inf e^(-r^2) r dr = [-e^(-r^2) / 2]_0^inf = 1/2.'
              },
              {
                stepNumber: 3,
                title: 'Angular Integration & Root',
                explanation: 'I^2 = 2pi * (1/2) = pi -> I = sqrt(pi).'
              }
            ],
            finalAnswerLatex: '\\sqrt{\\pi}'
          }
        }
      }
    ]
  }
];
