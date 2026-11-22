export interface ResearchTopic {
  id: string;
  title: string;
  field: string;
  status: 'Open Problem' | 'Resolved Breakthrough' | 'Grand Unified Theory';
  summary: string;
  latex?: string;
  deepDive: string;
  implications: string;
  prizeOrYear?: string;
}

export const researchTopics: ResearchTopic[] = [
  {
    id: 'res_riemann_hypothesis',
    title: 'The Riemann Hypothesis',
    field: 'Analytic Number Theory',
    status: 'Open Problem',
    prizeOrYear: 'Clay Millennium Prize ($1,000,000)',
    summary: 'Asserts that all non-trivial zeros of the Riemann Zeta Function have real part equal to 1/2.',
    latex: '\\zeta(s) = \\sum_{n=1}^\\infty \\frac{1}{n^s} = 0 \\implies \\text{Re}(s) = \\frac{1}{2}',
    deepDive: 'The distribution of prime numbers is intimately connected to the frequencies of the zeros of zeta(s). If proven true, it provides the sharpest possible error bound for the Prime Number Theorem, establishing that primes fluctuate like quantum chaotic spectra.',
    implications: 'Proof would validate hundreds of conditional theorems across arithmetic geometry, cryptography, and quantum chaos.'
  },
  {
    id: 'res_poincare_conjecture',
    title: 'Poincaré Conjecture & Ricci Flow',
    field: 'Differential Geometry & 3-Manifolds',
    status: 'Resolved Breakthrough',
    prizeOrYear: 'Solved by Grigori Perelman (2003)',
    summary: 'Every simply connected, closed 3-manifold is homeomorphic to the 3-sphere.',
    latex: '\\pi_1(M^3) = 0 \\implies M^3 \\cong S^3',
    deepDive: 'Using Richard Hamilton\'s Ricci flow with surgery—a non-linear parabolic partial differential equation analogous to heat diffusion on metric tensors—Perelman showed that geometric singularities can be smoothed out, completing Thurston\'s Geometrization Conjecture.',
    implications: 'The first and only solved Clay Millennium Problem to date; revolutionized geometric analysis and topological classification.'
  },
  {
    id: 'res_navier_stokes',
    title: 'Navier-Stokes Smoothness & Turbulence',
    field: 'Partial Differential Equations & Fluid Dynamics',
    status: 'Open Problem',
    prizeOrYear: 'Clay Millennium Prize ($1,000,000)',
    summary: 'Do smooth, physically reasonable solutions to the 3D Navier-Stokes equations always exist for all time, or can finite-time blow-ups occur?',
    latex: '\\rho \\left( \\frac{\\partial \\mathbf{u}}{\\partial t} + \\mathbf{u} \\cdot \\nabla \\mathbf{u} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{u} + \\mathbf{f}',
    deepDive: 'While 2D fluids are proven to remain smooth, whether turbulence in 3D can concentrate kinetic energy into an infinitesimal vortex singularity in finite time remains one of physics and mathematics\' greatest mysteries.',
    implications: 'Crucial for climate modeling, aerodynamics, fusion containment, and turbulence theory.'
  },
  {
    id: 'res_euler_basel',
    title: 'The Basel Problem & Zeta(2)',
    field: 'Infinite Series & Analysis',
    status: 'Resolved Breakthrough',
    prizeOrYear: 'Solved by Leonhard Euler (1734)',
    summary: 'The exact infinite sum of reciprocal squares converges to pi squared over 6.',
    latex: '\\sum_{n=1}^\\infty \\frac{1}{n^2} = 1 + \\frac{1}{4} + \\frac{1}{9} + \\frac{1}{16} + \\dots = \\frac{\\pi^2}{6}',
    deepDive: 'After defying Jakob Bernoulli and the greatest minds of Europe, 28-year-old Euler treated the Taylor series of sin(x)/x like an infinite polynomial, factoring it across its roots at multiples of pi.',
    implications: 'Pioneered the entire field of complex analysis and special values of L-functions.'
  }
];
