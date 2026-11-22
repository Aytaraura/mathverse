import { DetectiveCase } from '../types';

export const detectiveCases: DetectiveCase[] = [
  {
    id: 'case_one_equals_two',
    title: 'The Crime of 1 = 2',
    mysterySetting: 'A rogue student claimed in the Royal Academy that 1 = 2, threatening to collapse all financial and physical constants. Inspect the suspect derivation.',
    claimedTheorem: '1 = 2',
    crimeCategory: 'Division by Zero',
    steps: [
      {
        stepNumber: 1,
        statement: 'Let a and b be non-zero equal numbers: a = b.',
        mathLatex: 'a = b',
        isFlawed: false
      },
      {
        stepNumber: 2,
        statement: 'Multiply both sides by a.',
        mathLatex: 'a^2 = ab',
        isFlawed: false
      },
      {
        stepNumber: 3,
        statement: 'Subtract b^2 from both sides.',
        mathLatex: 'a^2 - b^2 = ab - b^2',
        isFlawed: false
      },
      {
        stepNumber: 4,
        statement: 'Factor both sides: difference of squares on the left, common factor b on the right.',
        mathLatex: '(a - b)(a + b) = b(a - b)',
        isFlawed: false
      },
      {
        stepNumber: 5,
        statement: 'Divide both sides by the common factor (a - b).',
        mathLatex: 'a + b = b',
        isFlawed: true,
        flawExplanation: 'Since a = b was declared in Step 1, a - b = 0! Dividing by (a - b) is an illegal division by zero, which destroys equality and produces fallacious identities.'
      },
      {
        stepNumber: 6,
        statement: 'Substitute a = b into the remaining equation to get b + b = b, so 2b = b, and divide by b to conclude 2 = 1.',
        mathLatex: '2b = b \\implies 2 = 1',
        isFlawed: false
      }
    ],
    verdictExplanation: 'The culprit is Step 5! In algebra, division by zero is undefined. Multiplying by 0 collapses all distinct numbers into 0, so dividing by zero artificially creates false equivalences.'
  },
  {
    id: 'case_minus_one_equals_one',
    title: 'The Complex Radical Heist: -1 = 1',
    mysterySetting: 'A shadowy mathematician claimed that positive 1 is equal to negative 1 using properties of the imaginary unit i. Detective Hypatia needs your help.',
    claimedTheorem: '-1 = 1',
    crimeCategory: 'Ignoring Branch Cuts',
    steps: [
      {
        stepNumber: 1,
        statement: 'Start with the definition of the imaginary unit: -1 = i^2 = i * i.',
        mathLatex: '-1 = i \\cdot i',
        isFlawed: false
      },
      {
        stepNumber: 2,
        statement: 'Express i as the principal square root of -1: i = sqrt(-1).',
        mathLatex: '-1 = \\sqrt{-1} \\cdot \\sqrt{-1}',
        isFlawed: false
      },
      {
        stepNumber: 3,
        statement: 'Combine the radicals under a single square root using sqrt(x) * sqrt(y) = sqrt(xy).',
        mathLatex: '-1 = \\sqrt{(-1) \\cdot (-1)}',
        isFlawed: true,
        flawExplanation: 'The radical product rule sqrt(a)*sqrt(b) = sqrt(ab) holds strictly only when at least one of a, b is a non-negative real number! It fails for negative reals due to complex multi-valued branch cuts.'
      },
      {
        stepNumber: 4,
        statement: 'Evaluate the multiplication under the root: (-1)*(-1) = 1.',
        mathLatex: '-1 = \\sqrt{1}',
        isFlawed: false
      },
      {
        stepNumber: 5,
        statement: 'The principal square root of 1 is 1, thus concluding -1 = 1.',
        mathLatex: '-1 = 1',
        isFlawed: false
      }
    ],
    verdictExplanation: 'Step 3 is mathematically invalid. The identity sqrt(a) * sqrt(b) = sqrt(ab) cannot be applied when both a < 0 and b < 0. For complex numbers, sqrt is a multi-valued branch function.'
  }
];
