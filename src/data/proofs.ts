import { ProofChallenge } from '../types';

export const proofChallenges: ProofChallenge[] = [
  {
    id: 'proof_irrational_sqrt2',
    title: 'Irrationality of the Square Root of 2',
    theorem: 'The square root of 2 is an irrational number.',
    theoremLatex: '\\sqrt{2} \\notin \\mathbb{Q}',
    method: 'Proof by Contradiction',
    initialState: [],
    availableSteps: [
      {
        id: 's1',
        content: 'Assume for contradiction that sqrt(2) is rational, so sqrt(2) = a / b with coprime integers a and b (gcd(a, b) = 1).',
        latex: '\\text{Assume } \\sqrt{2} = \\frac{a}{b}, \\quad \\gcd(a, b) = 1',
        justification: 'Assumption of the negation for proof by contradiction'
      },
      {
        id: 's2',
        content: 'Squaring both sides yields 2 = a^2 / b^2, which implies a^2 = 2 * b^2.',
        latex: 'a^2 = 2b^2',
        justification: 'Algebraic squaring and clearing denominators'
      },
      {
        id: 's3',
        content: 'Since a^2 is even, 2 must divide a. Thus a = 2k for some integer k.',
        latex: '2 \\mid a^2 \\implies 2 \\mid a \\implies a = 2k',
        justification: 'Euclid\'s lemma on prime divisibility'
      },
      {
        id: 's4',
        content: 'Substitute a = 2k into a^2 = 2b^2 to obtain (2k)^2 = 4k^2 = 2b^2, which simplifies to b^2 = 2k^2.',
        latex: '4k^2 = 2b^2 \\implies b^2 = 2k^2',
        justification: 'Substitution and division by 2'
      },
      {
        id: 's5',
        content: 'This implies b^2 is even, so 2 must divide b as well.',
        latex: '2 \\mid b^2 \\implies 2 \\mid b',
        justification: 'Euclid\'s lemma on prime divisibility applied to b'
      },
      {
        id: 's6',
        content: 'Both a and b are divisible by 2, contradicting the initial assumption that gcd(a, b) = 1. Therefore, sqrt(2) is irrational.',
        latex: '\\gcd(a, b) \\ge 2 \\implies \\text{Contradiction! Hence } \\sqrt{2} \\notin \\mathbb{Q}',
        justification: 'Reaching a contradiction with coprimality'
      }
    ],
    correctSequence: ['s1', 's2', 's3', 's4', 's5', 's6'],
    explanation: 'Classic Pythagorean reductio ad absurdum proof. By showing that both numerator and denominator must share a common factor of 2, the assumption of simplest rational form is refuted.'
  },
  {
    id: 'proof_delta_epsilon_linear',
    title: 'Delta-Epsilon Limit Proof: lim_{x -> 3} (2x + 1) = 7',
    theorem: 'Prove that the limit of (2x + 1) as x approaches 3 is equal to 7.',
    theoremLatex: '\\lim_{x \\to 3} (2x + 1) = 7',
    method: 'Delta-Epsilon',
    initialState: [],
    availableSteps: [
      {
        id: 'de1',
        content: 'Let epsilon > 0 be an arbitrary given positive real number.',
        latex: '\\text{Let } \\varepsilon > 0 \\text{ be arbitrary.}',
        justification: 'Universal quantifier definition of limits'
      },
      {
        id: 'de2',
        content: 'Examine the difference |f(x) - L| = |(2x + 1) - 7| = |2x - 6| = 2|x - 3|.',
        latex: '|f(x) - L| = |(2x + 1) - 7| = 2|x - 3|',
        justification: 'Algebraic simplification of error distance'
      },
      {
        id: 'de3',
        content: 'We desire 2|x - 3| < epsilon, which is equivalent to |x - 3| < epsilon / 2.',
        latex: '2|x - 3| < \\varepsilon \\iff |x - 3| < \\frac{\\varepsilon}{2}',
        justification: 'Solving for delta bound in terms of epsilon'
      },
      {
        id: 'de4',
        content: 'Choose delta = epsilon / 2. Since epsilon > 0, delta is strictly positive.',
        latex: '\\text{Choose } \\delta = \\frac{\\varepsilon}{2} > 0',
        justification: 'Selection of delta witness'
      },
      {
        id: 'de5',
        content: 'Assume 0 < |x - 3| < delta. Then |(2x + 1) - 7| = 2|x - 3| < 2 * delta = 2 * (epsilon / 2) = epsilon.',
        latex: '0 < |x - 3| < \\delta \\implies 2|x - 3| < 2\\left(\\frac{\\varepsilon}{2}\\right) = \\varepsilon',
        justification: 'Direct conditional verification'
      },
      {
        id: 'de6',
        content: 'Therefore, by the Cauchy-Weierstrass definition of a limit, lim_{x -> 3} (2x + 1) = 7.',
        latex: '\\text{Q.E.D. } \\lim_{x \\to 3}(2x + 1) = 7',
        justification: 'Conclusion by definition of limit'
      }
    ],
    correctSequence: ['de1', 'de2', 'de3', 'de4', 'de5', 'de6'],
    explanation: 'Rigorous delta-epsilon proof showing the linear dependency between input tolerance delta and output tolerance epsilon.'
  },
  {
    id: 'proof_induction_sum',
    title: 'Mathematical Induction: Sum of First n Natural Numbers',
    theorem: 'The sum of the first n positive integers is n(n + 1) / 2.',
    theoremLatex: '\\sum_{k=1}^n k = 1 + 2 + \\dots + n = \\frac{n(n+1)}{2}',
    method: 'Mathematical Induction',
    initialState: [],
    availableSteps: [
      {
        id: 'ind1',
        content: 'Base Case (n = 1): Left-hand side is 1. Right-hand side is 1(1 + 1)/2 = 2/2 = 1. The base case holds.',
        latex: 'P(1): 1 = \\frac{1(2)}{2} = 1',
        justification: 'Verification of initial anchor state'
      },
      {
        id: 'ind2',
        content: 'Inductive Hypothesis: Assume statement holds for some positive integer k, so 1 + 2 + ... + k = k(k + 1) / 2.',
        latex: '\\text{Assume } P(k): \\sum_{i=1}^k i = \\frac{k(k+1)}{2}',
        justification: 'Assumption for inductive step'
      },
      {
        id: 'ind3',
        content: 'Inductive Step (n = k + 1): We examine the sum up to (k + 1): (1 + 2 + ... + k) + (k + 1).',
        latex: '\\sum_{i=1}^{k+1} i = \\left( \\sum_{i=1}^k i \\right) + (k + 1)',
        justification: 'Splitting the summation'
      },
      {
        id: 'ind4',
        content: 'Substitute the Inductive Hypothesis: k(k + 1)/2 + (k + 1).',
        latex: '= \\frac{k(k+1)}{2} + (k + 1)',
        justification: 'Application of induction hypothesis'
      },
      {
        id: 'ind5',
        content: 'Factor out (k + 1): (k + 1) [k/2 + 1] = (k + 1) [(k + 2)/2] = (k + 1)((k + 1) + 1) / 2.',
        latex: '= (k + 1)\\left(\\frac{k}{2} + 1\\right) = \\frac{(k+1)(k+2)}{2}',
        justification: 'Algebraic factoring'
      },
      {
        id: 'ind6',
        content: 'The equality matches the formula for n = k + 1. By the Principle of Mathematical Induction, the formula holds for all integers n >= 1.',
        latex: 'P(k+1) \\text{ holds. Q.E.D.}',
        justification: 'Principle of Mathematical Induction conclusion'
      }
    ],
    correctSequence: ['ind1', 'ind2', 'ind3', 'ind4', 'ind5', 'ind6'],
    explanation: 'Classic induction proof establishing base case anchor and algebraic step to transfer truth from k to k + 1.'
  }
];
