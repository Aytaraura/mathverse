import { SubjectId } from '../../types';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  category: string;
  level: 'High School' | 'Undergraduate' | 'Research & Olympiad';
  icon: string;
  tagline: string;
  description: string;
  theorems: string[];
  coreTopics: string[];
  prerequisites: string[];
  sampleQuestion: {
    prompt: string;
    latex: string;
    answer: string;
    explanation: string;
  };
}

export const mathSubjects: SubjectInfo[] = [
  {
    id: 'differential_calculus',
    name: 'Differential Calculus',
    category: 'Analysis & Rates',
    level: 'High School',
    icon: 'Percent',
    tagline: 'The mathematics of instantaneous change, slopes, tangents, and optimization.',
    description: 'Explore the foundations of real analysis through limits, continuity, first principles, differentiation rules, implicit rates, and classical optimization.',
    theorems: ["Mean Value Theorem", "Rolle's Theorem", "Extreme Value Theorem", "L'Hôpital's Rule"],
    coreTopics: ['Limits & Indeterminate Forms', 'Continuity & IVT', 'Power, Product, Chain Rules', 'Implicit Differentiation', 'Curve Sketching & Concavity', 'Related Rates & Optimization'],
    prerequisites: ['Algebra', 'Functions & Trigonometry'],
    sampleQuestion: {
      prompt: 'Find the derivative of f(x) = x * ln(x) for x > 0.',
      latex: 'f(x) = x \\ln(x) \\implies f\'(x) = ?',
      answer: 'ln(x) + 1',
      explanation: 'By product rule: (1)*ln(x) + x*(1/x) = ln(x) + 1.'
    }
  },
  {
    id: 'integral_calculus',
    name: 'Integral Calculus',
    category: 'Accumulation & Geometry',
    level: 'High School',
    icon: 'Maximize',
    tagline: 'The mathematics of continuous accumulation, areas, volumes, and reconstruction.',
    description: 'Unify antiderivatives with geometric areas via the Fundamental Theorem of Calculus. Master U-substitution, integration by parts, partial fractions, and solids of revolution.',
    theorems: ['Fundamental Theorem of Calculus (FTC 1 & 2)', 'Mean Value Theorem for Integrals', 'Fubini\'s Theorem'],
    coreTopics: ['Riemann Sums & Definite Integrals', 'Antiderivative Families', 'U-Substitution & Parts', 'Partial Fraction Decomposition', 'Volumes of Revolution (Disks/Washers)', 'Improper Integrals'],
    prerequisites: ['Differential Calculus'],
    sampleQuestion: {
      prompt: 'Evaluate the definite integral of (3x^2) dx from 0 to 2.',
      latex: '\\int_0^2 3x^2 \\, dx',
      answer: '8',
      explanation: '[x^3]_0^2 = 2^3 - 0 = 8.'
    }
  },
  {
    id: 'number_theory',
    name: 'Number Theory & Cryptography',
    category: 'Arithmetic & Primes',
    level: 'Research & Olympiad',
    icon: 'Hash',
    tagline: 'The Queen of Mathematics — primes, modular arithmetic, and Diophantine equations.',
    description: 'Investigate the deep structural properties of integers, prime distribution, Euclidean algorithm, Bézout\'s identity, Fermat\'s Little Theorem, and Euler\'s totient.',
    theorems: ['Fundamental Theorem of Arithmetic', 'Fermat\'s Little Theorem', 'Chinese Remainder Theorem', 'Euler\'s Totient Theorem', 'Wilson\'s Theorem'],
    coreTopics: ['Prime Factorization', 'Modular Arithmetic & Inverses', 'Linear Diophantine Equations', 'Quadratic Residues & Legendre Symbol', 'Arithmetic Functions (tau, sigma, phi)', 'Primitive Roots'],
    prerequisites: ['Basic Arithmetic', 'Proof Techniques'],
    sampleQuestion: {
      prompt: 'Find the remainder when 2^100 is divided by 13.',
      latex: '2^{100} \\pmod{13}',
      answer: '3',
      explanation: 'By Fermat\'s Little Theorem, 2^12 = 1 (mod 13). 100 = 8 * 12 + 4. So 2^100 = (2^12)^8 * 2^4 = 1^8 * 16 = 16 = 3 (mod 13).'
    }
  },
  {
    id: 'algebra',
    name: 'Algebra & Polynomials',
    category: 'Structures & Roots',
    level: 'High School',
    icon: 'Code',
    tagline: 'Symmetry, polynomials, roots, inequalities, and functional equations.',
    description: 'Master polynomial division, Vieta\'s formulas, symmetric polynomials, Cauchy-Schwarz and AM-GM inequalities, complex numbers, and Olympiad functional equations.',
    theorems: ['Fundamental Theorem of Algebra', 'Vieta\'s Formulas', 'AM-GM Inequality', 'Cauchy-Schwarz Inequality'],
    coreTopics: ['Polynomial Roots & Factorization', 'Vieta\'s Relations', 'Classic Inequalities (AM-GM, Cauchy)', 'Sequences & Series', 'Functional Equations', 'Complex Numbers (Euler\'s Formula)'],
    prerequisites: ['Pre-Algebra'],
    sampleQuestion: {
      prompt: 'If the roots of x^2 - 7x + 12 = 0 are r and s, what is r^2 + s^2?',
      latex: 'x^2 - 7x + 12 = 0 \\implies r^2 + s^2 = ?',
      answer: '25',
      explanation: 'By Vieta: r + s = 7 and rs = 12. Then r^2 + s^2 = (r + s)^2 - 2rs = 49 - 24 = 25.'
    }
  },
  {
    id: 'geometry',
    name: 'Euclidean & Projective Geometry',
    category: 'Form & Space',
    level: 'High School',
    icon: 'Triangle',
    tagline: 'Geometric loci, cyclic quadrilaterals, projective invariants, and coordinate methods.',
    description: 'Conquer competition geometry with power of a point, radical axes, Ptolemy\'s theorem, Menelaus and Ceva, circumcenters, orthocenters, and inversion transformations.',
    theorems: ['Ptolemy\'s Theorem', 'Ceva\'s Theorem', 'Menelaus\' Theorem', 'Power of a Point Theorem', 'Euler Line & 9-Point Circle'],
    coreTopics: ['Cyclic Quadrilaterals & Inscribed Angles', 'Triangle Centers (H, G, O, I)', 'Power of a Point & Radical Axis', 'Trigonometric Ceva', 'Geometric Transformations & Inversion'],
    prerequisites: ['Basic 2D Shapes', 'Trigonometry'],
    sampleQuestion: {
      prompt: 'In a cyclic quadrilateral ABCD with sides a=2, b=3, c=4, d=5, what is the product of its diagonals AC * BD?',
      latex: 'AC \\cdot BD = ?',
      answer: '23',
      explanation: 'By Ptolemy\'s Theorem, AC * BD = ac + bd = (2)(4) + (3)(5) = 8 + 15 = 23.'
    }
  },
  {
    id: 'combinatorics',
    name: 'Combinatorics & Graph Theory',
    category: 'Counting & Structures',
    level: 'Research & Olympiad',
    icon: 'Grid',
    tagline: 'Enumeration, pigeonhole principle, double counting, graphs, and invariants.',
    description: 'From bijective proofs and generating functions to Ramsey theory, extremal graph theory, combinatorial games, and Eulerian trails.',
    theorems: ['Pigeonhole Principle', 'Inclusion-Exclusion Principle', 'Burnside\'s Lemma', 'Hall\'s Marriage Theorem'],
    coreTopics: ['Permutations & Combinations (nCr)', 'Stars and Bars', 'Recurrence Relations', 'Inclusion-Exclusion Principle', 'Graph Planarity & Coloring', 'Combinatorial Invariants'],
    prerequisites: ['Basic Discrete Math'],
    sampleQuestion: {
      prompt: 'How many non-negative integer solutions are there to x1 + x2 + x3 = 10?',
      latex: 'x_1 + x_2 + x_3 = 10, \\quad x_i \\in \\mathbb{N}_0',
      answer: '66',
      explanation: 'By Stars and Bars: C(n + k - 1, k - 1) = C(10 + 3 - 1, 3 - 1) = C(12, 2) = (12 * 11) / 2 = 66.'
    }
  },
  {
    id: 'linear_algebra',
    name: 'Linear Algebra & Vector Spaces',
    category: 'Vectors & Transformations',
    level: 'Undergraduate',
    icon: 'Box',
    tagline: 'Vector spaces, matrices, eigenvalues, spectral decomposition, and transformations.',
    description: 'Explore multi-dimensional spaces, linear transformations, determinants, kernel/image, orthogonal projections, and singular value decomposition.',
    theorems: ['Rank-Nullity Theorem', 'Spectral Theorem', 'Cayley-Hamilton Theorem', 'Singular Value Decomposition (SVD)'],
    coreTopics: ['Vector Spaces & Subspaces', 'Matrix Inverses & Determinants', 'Eigenvalues & Eigenvectors', 'Diagonalization', 'Gram-Schmidt Orthogonalization', 'Inner Product Spaces'],
    prerequisites: ['High School Algebra'],
    sampleQuestion: {
      prompt: 'What is the determinant of the 2x2 matrix [[4, 2], [3, 5]]?',
      latex: '\\det \\begin{pmatrix} 4 & 2 \\\\ 3 & 5 \\end{pmatrix}',
      answer: '14',
      explanation: 'ad - bc = (4)(5) - (2)(3) = 20 - 6 = 14.'
    }
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry & Polar Coordinates',
    category: 'Angles & Oscillations',
    level: 'High School',
    icon: 'Radio',
    tagline: 'Circle geometry, trigonometric identities, complex rotation, and wave mechanics.',
    description: 'Deep dive into angle sum identities, double/half angle formulas, Law of Sines/Cosines, polar curves, and harmonic synthesis.',
    theorems: ['Law of Cosines', 'Law of Sines', 'De Moivre\'s Formula', 'Euler\'s Formula'],
    coreTopics: ['Unit Circle Definitions', 'Pythagorean & Angle Identities', 'Polar Coordinates & Rose Curves', 'Complex Exponentials', 'Trigonometric Equations'],
    prerequisites: ['Geometry', 'Algebra'],
    sampleQuestion: {
      prompt: 'What is sin(2x) if sin(x) = 3/5 and x is in the first quadrant?',
      latex: '\\sin(x) = \\frac{3}{5} \\implies \\sin(2x) = ?',
      answer: '24/25',
      explanation: 'cos(x) = sqrt(1 - 9/25) = 4/5. Then sin(2x) = 2 sin(x) cos(x) = 2 (3/5)(4/5) = 24/25.'
    }
  },
  {
    id: 'probability_statistics',
    name: 'Probability & Statistical Inference',
    category: 'Chance & Inference',
    level: 'Undergraduate',
    icon: 'BarChart2',
    tagline: 'Random variables, distributions, Bayesian inference, and the Central Limit Theorem.',
    description: 'Probability axioms, conditional probability, Bayes\' theorem, discrete and continuous random variables, expectation, variance, and hypothesis testing.',
    theorems: ['Bayes\' Theorem', 'Law of Large Numbers (LLN)', 'Central Limit Theorem (CLT)', 'Chebyshev\'s Inequality'],
    coreTopics: ['Conditional Probability & Bayes', 'Binomial, Poisson, Normal Distributions', 'Expected Value & Variance', 'Joint Distributions', 'Hypothesis Testing & Confidence Intervals'],
    prerequisites: ['Calculus', 'Combinatorics'],
    sampleQuestion: {
      prompt: 'What is the expected value of rolling a fair 6-sided die?',
      latex: '\\mathbb{E}[X] = \\sum_{k=1}^6 k \\cdot \\frac{1}{6}',
      answer: '3.5',
      explanation: '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3.5.'
    }
  },
  {
    id: 'advanced_math',
    name: 'Abstract Algebra & Group Theory',
    category: 'Structures & Symmetry',
    level: 'Undergraduate',
    icon: 'Cpu',
    tagline: 'Groups, rings, fields, ideals, quotient structures, and Galois theory.',
    description: 'The deep architecture of abstract algebraic systems: Homomorphisms, Isomorphism Theorems, Lagrange\'s Theorem, Group Actions, and Field Extensions.',
    theorems: ['First Isomorphism Theorem', 'Lagrange\'s Group Theorem', 'Sylow\'s Theorems', 'Fundamental Theorem of Galois Theory'],
    coreTopics: ['Normal Subgroups & Quotients', 'Cyclic & Permutation Groups', 'Rings, Ideals & PID/UFD', 'Field Extensions & Splitting Fields', 'Galois Solvability of Polynomials'],
    prerequisites: ['Linear Algebra', 'Proof Theory'],
    sampleQuestion: {
      prompt: 'What is the order of the cyclic group Z_12?',
      latex: '|\\mathbb{Z}_{12}| = ?',
      answer: '12',
      explanation: 'The group of integers modulo 12 has exactly 12 distinct elements {0, 1, ..., 11}.'
    }
  },
  {
    id: 'limits_continuity',
    name: 'Real Analysis & Measure Theory',
    category: 'Rigorous Foundations',
    level: 'Undergraduate',
    icon: 'Layers',
    tagline: 'Epsilon-delta rigour, metric spaces, compactness, Lebesgue integration.',
    description: 'Transcend naive calculus with formal topology of R^n: Bolzano-Weierstrass, Heine-Borel, uniform continuity, Riemann vs Lebesgue integrals, and sigma-algebras.',
    theorems: ['Bolzano-Weierstrass Theorem', 'Heine-Borel Theorem', 'Lebesgue Dominated Convergence Theorem', 'Arzelà-Ascoli Theorem'],
    coreTopics: ['Epsilon-Delta Formalism', 'Metric Spaces & Open/Closed Sets', 'Sequences & Cauchy Completeness', 'Uniform Convergence of Function Series', 'Lebesgue Measure & Integration'],
    prerequisites: ['Multivariable Calculus', 'Linear Algebra'],
    sampleQuestion: {
      prompt: 'Let f_n(x) = x^n on [0, 1]. Does f_n converge uniformly?',
      latex: 'f_n(x) = x^n \\quad \\text{on } [0, 1]',
      answer: 'No',
      explanation: 'Pointwise limit is 0 for x < 1 and 1 at x = 1, which is discontinuous. By Uniform Limit Theorem, continuous functions converging uniformly must have a continuous limit; thus convergence is not uniform.'
    }
  },
  {
    id: 'precalculus',
    name: 'Topology & Differential Geometry',
    category: 'Higher Geometry',
    level: 'Research & Olympiad',
    icon: 'Compass',
    tagline: 'Topological spaces, fundamental groups, smooth manifolds, and curvature.',
    description: 'Investigate properties invariant under continuous deformation: Homeomorphisms, compactness, connectedness, homotopy, smooth manifolds, tangent bundles, and Gauss-Bonnet theorem.',
    theorems: ['Gauss-Bonnet Theorem', 'Poincaré-Hopf Theorem', 'Van Kampen\'s Theorem', 'Stokes\' Theorem on Manifolds'],
    coreTopics: ['Topological Spaces & Bases', 'Fundamental Group pi_1(X)', 'Smooth Manifolds & Charts', 'Differential Forms & Exterior Derivative', 'Riemannian Metrics & Curvature'],
    prerequisites: ['Real Analysis', 'Linear Algebra'],
    sampleQuestion: {
      prompt: 'What is the Euler characteristic chi of a 2-dimensional sphere S^2?',
      latex: '\\chi(S^2) = V - E + F = ?',
      answer: '2',
      explanation: 'For any polyhedron homeomorphic to a sphere (e.g., tetrahedron V=4, E=6, F=4), V - E + F = 4 - 6 + 4 = 2.'
    }
  }
];
