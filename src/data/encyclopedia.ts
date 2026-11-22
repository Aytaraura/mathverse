import { EncyclopediaEntry } from '../types';

export const encyclopediaEntries: EncyclopediaEntry[] = [
  {
    id: 'enc_ftc',
    title: 'Fundamental Theorem of Calculus',
    category: 'Calculus',
    definition: 'The cornerstone theorem that establishes the reciprocal relationship between differentiation and integration.',
    latex: '\\frac{d}{dx} \\int_a^x f(t) \\, dt = f(x) \\quad \\text{and} \\quad \\int_a^b f(x) \\, dx = F(b) - F(a)',
    theoremStatement: 'If f is continuous on [a, b], then the accumulation function F(x) = int_a^x f(t) dt has derivative f(x), and definite integrals can be computed using any antiderivative.',
    applications: ['Evaluating physical work, area, and volume', 'Solving initial value differential equations', 'Fluid dynamics accumulation'],
    historicalNote: 'Discovered independently by Isaac Newton and Gottfried Wilhelm Leibniz in the late 17th century.'
  },
  {
    id: 'enc_mvt',
    title: 'Mean Value Theorem (MVT)',
    category: 'Calculus',
    definition: 'Guarantees that on any smooth curve segment, there exists a point where the instantaneous slope equals the average secant slope.',
    latex: 'f\'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for some } c \\in (a, b)',
    theoremStatement: 'Let f: [a, b] -> R be continuous on [a, b] and differentiable on (a, b). Then there exists c in (a, b) such that f\'(c) = (f(b) - f(a))/(b - a).',
    applications: ['Proving monotonicity of functions', 'Bounding approximation errors in Taylor polynomials', 'Speed enforcement radar validation'],
    historicalNote: 'First stated for polynomials by Parameshvara in 14th century India, and formally proven in modern form by Augustin-Louis Cauchy in 1823.'
  },
  {
    id: 'enc_lhopital',
    title: 'L\'Hôpital\'s Rule',
    category: 'Calculus',
    definition: 'An analytical method that uses derivatives to evaluate limits of quotients that initially appear in indeterminate forms 0/0 or +/- inf/inf.',
    latex: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
    theoremStatement: 'Suppose f and g are differentiable near c (except possibly at c), g\'(x) != 0, and lim f(x)/g(x) is indeterminate of type 0/0 or inf/inf. If lim f\'(x)/g\'(x) exists, then lim f(x)/g(x) exists and equals it.',
    applications: ['Asymptotic algorithm complexity analysis', 'Evaluation of entropy limits in thermodynamics', 'Electrical circuit transient responses'],
    historicalNote: 'Discovered by the Swiss mathematician Johann Bernoulli, but named after Guillaume de l\'Hôpital who published it in the first calculus textbook in 1696.'
  },
  {
    id: 'enc_am_gm',
    title: 'AM-GM Inequality (Arithmetic-Geometric Mean)',
    category: 'Algebra',
    definition: 'States that the arithmetic mean of a list of non-negative real numbers is always greater than or equal to their geometric mean, with equality if and only if all numbers are identical.',
    latex: '\\frac{x_1 + x_2 + \\dots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\dots x_n}',
    theoremStatement: 'For any non-negative reals x_1, ..., x_n: AM >= GM. Equality holds iff x_1 = x_2 = ... = x_n.',
    applications: ['Olympiad inequality proofs', 'Bounding algebraic expressions', 'Information theory and channel capacity'],
    historicalNote: 'One of the most powerful and fundamental inequalities in competitive mathematics, proven by Cauchy using backward induction.'
  },
  {
    id: 'enc_euler_formula',
    title: 'Euler\'s Identity & Formula',
    category: 'Analysis',
    definition: 'The most beautiful equation in mathematics, linking the five fundamental constants e, i, pi, 1, and 0.',
    latex: 'e^{i\\pi} + 1 = 0 \\quad \\text{from} \\quad e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
    theoremStatement: 'For any real theta, the complex exponential e^(i theta) traces a unit circle in the complex plane with coordinates (cos theta, sin theta).',
    applications: ['Fourier transform and signal processing', 'Quantum mechanics wavefunctions', 'AC electrical circuits and phasor analysis'],
    historicalNote: 'Published by Leonhard Euler in Introductio in analysin infinitorum (1748).'
  },
  {
    id: 'enc_flt',
    title: 'Fermat\'s Little Theorem',
    category: 'Number Theory',
    definition: 'States that if p is a prime number and a is an integer not divisible by p, then a^(p-1) is congruent to 1 modulo p.',
    latex: 'a^{p-1} \\equiv 1 \\pmod{p} \\quad \\iff \\quad a^p \\equiv a \\pmod{p}',
    theoremStatement: 'Let p be prime. For all integers a: a^p - a is a multiple of p.',
    applications: ['RSA Public-Key Cryptography', 'Primality testing algorithms (Fermat test, Miller-Rabin)', 'Modular inverse computation: a^(p-2) mod p'],
    historicalNote: 'Stated by Pierre de Fermat in a letter in 1640, first published with proof by Leonhard Euler in 1736.'
  }
];
