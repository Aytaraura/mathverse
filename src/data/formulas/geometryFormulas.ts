import { FormulaItem } from '../../types/formulas';

export const geometryFormulas: FormulaItem[] = [
  // ─── 2D SHAPES ───
  {
    id: 'geom_square',
    name: 'Square (Perimeter, Area & Diagonals)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Polygons',
    difficulty: 'Beginner',
    latex: 'P = 4s, \\quad A = s^2 = \\frac{1}{2}d^2, \\quad d = s\\sqrt{2}',
    variables: [
      { symbol: 's', name: 'Side length', meaning: 'Length of any of the 4 equal sides' },
      { symbol: 'P', name: 'Perimeter', meaning: 'Total boundary length' },
      { symbol: 'A', name: 'Area', meaning: '2D interior surface area' },
      { symbol: 'd', name: 'Diagonal', meaning: 'Line connecting opposite vertices' }
    ],
    conditions: [
      'All 4 sides equal, all 4 interior angles equal to 90 degrees',
      'Diagonals are equal, bisect each other perpendicularly at 90 degrees, and bisect the vertex angles (45 deg)'
    ],
    whenToUse: 'Tiling, floor area, screen dimensions, maximizing area given fixed rectangular perimeter.',
    workedExample: {
      problem: 'Find the area of a square whose diagonal is 10 cm.',
      steps: [
        { stepNum: 1, instruction: 'Use area in terms of diagonal: A = (1/2)d^2', mathLatex: 'A = \\frac{1}{2}(10)^2' },
        { stepNum: 2, instruction: 'Compute square and halve', mathLatex: 'A = \\frac{1}{2}(100) = 50\\text{ cm}^2' }
      ],
      finalAnswer: '50 cm^2',
      finalAnswerLatex: '50\\text{ cm}^2'
    },
    commonMistakes: [
      'Confusing diagonal d = s*sqrt(2) with d = s/sqrt(2).',
      'Thinking diagonal length equals side length.'
    ],
    relatedFormulaIds: ['geom_rectangle', 'geom_pythagorean_theorem'],
    practiceQuestions: [
      {
        id: 'q_geom_1',
        question: 'If a square has perimeter 28 m, what is its diagonal?',
        options: ['7*sqrt(2) m', '14 m', '7 m', '14*sqrt(2) m'],
        correctIndex: 0,
        explanation: 's = 28 / 4 = 7 m. Diagonal d = s*sqrt(2) = 7*sqrt(2) m.'
      }
    ],
    searchKeywords: ['square area', 'square perimeter', 'diagonal of square', 'quadrilateral'],
    memoryCard: {
      clozeLatex: 'd_{\\text{square}} = s \\times ???',
      missingPart: '\\sqrt{2}',
      missingOptions: ['\\sqrt{2}', '\\sqrt{3}', '2', '\\frac{1}{2}'],
      recallPrompt: 'What factor relates the diagonal of a square to its side length s?',
      identificationPrompt: 'Formula for: Diagonal of a Square.'
    }
  },
  {
    id: 'geom_rectangle',
    name: 'Rectangle (Perimeter, Area & Diagonal)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Polygons',
    difficulty: 'Beginner',
    latex: 'P = 2(l + w), \\quad A = l \\cdot w, \\quad d = \\sqrt{l^2 + w^2}',
    variables: [
      { symbol: 'l', name: 'Length', meaning: 'Longer dimension' },
      { symbol: 'w', name: 'Width', meaning: 'Shorter dimension' },
      { symbol: 'd', name: 'Diagonal', meaning: 'Hypotenuse of right triangle with legs l and w' }
    ],
    conditions: [
      'Opposite sides are parallel and equal',
      'All 4 angles are 90 degrees; diagonals are equal and bisect each other (not perpendicularly unless square)'
    ],
    whenToUse: 'Floor plans, land plots, display resolutions, packaging.',
    workedExample: {
      problem: 'A rectangle has length 12 cm and diagonal 13 cm. Find its area.',
      steps: [
        { stepNum: 1, instruction: 'Find width w using Pythagorean theorem', mathLatex: 'w = \\sqrt{d^2 - l^2} = \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5\\text{ cm}' },
        { stepNum: 2, instruction: 'Calculate area A = l * w', mathLatex: 'A = 12 \\times 5 = 60\\text{ cm}^2' }
      ],
      finalAnswer: '60 cm^2',
      finalAnswerLatex: '60\\text{ cm}^2'
    },
    commonMistakes: [
      'Multiplying diagonal by side to get area.',
      'Forgetting to double (l + w) for perimeter.'
    ],
    relatedFormulaIds: ['geom_square', 'geom_parallelogram'],
    practiceQuestions: [
      {
        id: 'q_geom_2',
        question: 'What is the perimeter of a rectangle with length 8 and width 3?',
        options: ['22', '24', '11', '26'],
        correctIndex: 0,
        explanation: 'P = 2(8 + 3) = 2(11) = 22.'
      }
    ],
    searchKeywords: ['rectangle area', 'rectangle perimeter', 'diagonal of rectangle'],
    memoryCard: {
      clozeLatex: 'd_{\\text{rectangle}} = \\sqrt{l^2 + ???}',
      missingPart: 'w^2',
      missingOptions: ['w^2', '2w', 'lw', 'h^2'],
      recallPrompt: 'What is inside the square root for the diagonal of a rectangle?',
      identificationPrompt: 'Formula for: Diagonal of a Rectangle.'
    }
  },
  {
    id: 'geom_triangle_general',
    name: 'Triangle Area Formulas (Base-Height & Trigonometric)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Triangles',
    difficulty: 'Beginner',
    latex: 'A = \\frac{1}{2}bh = \\frac{1}{2}ab\\sin C = \\frac{abc}{4R} = rs',
    variables: [
      { symbol: 'b, h', name: 'Base and Altitude', meaning: 'Side and perpendicular height' },
      { symbol: 'a, b, c', name: 'Sides', meaning: 'Lengths of the 3 sides' },
      { symbol: 'C', name: 'Included angle', meaning: 'Angle between sides a and b' },
      { symbol: 'R', name: 'Circumradius', meaning: 'Radius of circumscribed circle' },
      { symbol: 'r', name: 'Inradius', meaning: 'Radius of inscribed circle' },
      { symbol: 's', name: 'Semi-perimeter', meaning: 's = (a + b + c) / 2' }
    ],
    conditions: [
      'Triangle inequality: a + b > c, a + c > b, b + c > a',
      'Sum of angles: A + B + C = 180 degrees (pi rad)'
    ],
    whenToUse: 'Calculating triangle area when base and height or SAS (side-angle-side) are known.',
    workedExample: {
      problem: 'Find the area of a triangle with sides a = 8 cm, b = 10 cm, and included angle C = 30 degrees.',
      steps: [
        { stepNum: 1, instruction: 'Use SAS trigonometric area formula A = (1/2)ab sin C', mathLatex: 'A = \\frac{1}{2}(8)(10)\\sin(30^\\circ)' },
        { stepNum: 2, instruction: 'Recall sin(30 deg) = 0.5', mathLatex: 'A = 40 \\times 0.5 = 20\\text{ cm}^2' }
      ],
      finalAnswer: '20 cm^2',
      finalAnswerLatex: '20\\text{ cm}^2'
    },
    commonMistakes: [
      'Using the length of a slanted side instead of the perpendicular height h.',
      'Using an angle not included between the two known sides.'
    ],
    relatedFormulaIds: ['geom_heron_formula', 'geom_equilateral_triangle', 'trig_law_of_sines'],
    practiceQuestions: [
      {
        id: 'q_geom_3',
        question: 'If a triangle has base 14 and height 6, what is its area?',
        options: ['42', '84', '20', '28'],
        correctIndex: 0,
        explanation: 'A = (1/2) * 14 * 6 = 7 * 6 = 42.'
      }
    ],
    searchKeywords: ['triangle area', '1/2 ab sin C', 'inradius', 'circumradius', 'semiperimeter'],
    memoryCard: {
      clozeLatex: 'A = \\frac{1}{2}ab\\sin(???)',
      missingPart: 'C',
      missingOptions: ['C', 'A', 'B', '90^\\circ'],
      recallPrompt: 'Which angle is used in A = 1/2 a b sin(...) for sides a and b?',
      identificationPrompt: 'Formula for: Trigonometric Triangle Area (SAS).'
    }
  },
  {
    id: 'geom_equilateral_triangle',
    name: 'Equilateral Triangle',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Triangles',
    difficulty: 'Beginner',
    latex: 'P = 3s, \\quad A = \\frac{\\sqrt{3}}{4}s^2, \\quad h = \\frac{\\sqrt{3}}{2}s, \\quad R = \\frac{s}{\\sqrt{3}}, \\quad r = \\frac{s}{2\\sqrt{3}}',
    variables: [
      { symbol: 's', name: 'Side length', meaning: 'All 3 sides are equal' },
      { symbol: 'h', name: 'Height / Altitude', meaning: 'Perpendicular from vertex to opposite side' },
      { symbol: 'R', name: 'Circumradius', meaning: 'Distance from center to any vertex (2/3 h)' },
      { symbol: 'r', name: 'Inradius', meaning: 'Distance from center to any side (1/3 h)' }
    ],
    conditions: [
      'All 3 sides equal, all 3 angles equal to 60 degrees',
      'The centroid, circumcenter, incenter, and orthocenter all coincide at one point'
    ],
    whenToUse: 'Hexagonal tessellations, regular tetrahedral faces, equilateral prism cross sections.',
    workedExample: {
      problem: 'Find the area of an equilateral triangle with side length 6 cm.',
      steps: [
        { stepNum: 1, instruction: 'Use formula A = (sqrt(3)/4) s^2', mathLatex: 'A = \\frac{\\sqrt{3}}{4}(6)^2' },
        { stepNum: 2, instruction: 'Simplify (36 / 4)', mathLatex: 'A = 9\\sqrt{3}\\text{ cm}^2 \\approx 15.59\\text{ cm}^2' }
      ],
      finalAnswer: '9*sqrt(3) cm^2',
      finalAnswerLatex: '9\\sqrt{3}\\text{ cm}^2'
    },
    commonMistakes: [
      'Confusing the height formula (sqrt(3)/2)*s with the area coefficient (sqrt(3)/4)*s^2.',
      'Treating 30-60-90 ratios incorrectly.'
    ],
    relatedFormulaIds: ['geom_triangle_general', 'geom_tetrahedron'],
    practiceQuestions: [
      {
        id: 'q_geom_4',
        question: 'What is the altitude of an equilateral triangle with side length 10 cm?',
        options: ['5*sqrt(3) cm', '10*sqrt(3) cm', '25*sqrt(3) cm', '5 cm'],
        correctIndex: 0,
        explanation: 'h = (sqrt(3)/2) * 10 = 5*sqrt(3) cm.'
      }
    ],
    searchKeywords: ['equilateral triangle', 'sqrt(3)/4 s^2', 'regular triangle', 'inradius equilateral'],
    memoryCard: {
      clozeLatex: 'A_{\\text{equilateral}} = \\frac{\\sqrt{3}}{???}s^2',
      missingPart: '4',
      missingOptions: ['4', '2', '3', '6'],
      recallPrompt: 'What is the denominator in the area formula for an equilateral triangle of side s?',
      identificationPrompt: 'Formula for: Area of an Equilateral Triangle.'
    }
  },
  {
    id: 'geom_parallelogram',
    name: 'Parallelogram (Area, Perimeter & Law of Diagonals)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Quadrilaterals',
    difficulty: 'Intermediate',
    latex: 'P = 2(a + b), \\quad A = bh = ab\\sin\\theta, \\quad d_1^2 + d_2^2 = 2(a^2 + b^2)',
    variables: [
      { symbol: 'a, b', name: 'Adjacent sides', meaning: 'Lengths of the two distinct side pairs' },
      { symbol: 'h', name: 'Height / Altitude', meaning: 'Perpendicular distance between parallel bases' },
      { symbol: '\\theta', name: 'Interior angle', meaning: 'Angle between sides a and b' },
      { symbol: 'd_1, d_2', name: 'Diagonals', meaning: 'Lines connecting opposite vertices' }
    ],
    conditions: [
      'Opposite sides are equal and parallel',
      'Consecutive angles are supplementary: \\theta_1 + \\theta_2 = 180^\\circ',
      'The Parallelogram Law d_1^2 + d_2^2 = 2(a^2 + b^2) is fundamental in vector algebra (\\|u+v\\|^2 + \\|u-v\\|^2 = 2\\|u\\|^2 + 2\\|v\\|^2)'
    ],
    whenToUse: 'Vector addition, mechanics force diagrams, sheared grid calculations.',
    workedExample: {
      problem: 'A parallelogram has sides a = 5, b = 7, and one diagonal d_1 = 8. Find the length of the second diagonal d_2.',
      steps: [
        { stepNum: 1, instruction: 'Apply Parallelogram Law: d_1^2 + d_2^2 = 2(a^2 + b^2)', mathLatex: '8^2 + d_2^2 = 2(5^2 + 7^2)' },
        { stepNum: 2, instruction: 'Compute right-hand side', mathLatex: '64 + d_2^2 = 2(25 + 49) = 2(74) = 148' },
        { stepNum: 3, instruction: 'Solve for d_2', mathLatex: 'd_2^2 = 148 - 64 = 84 \\implies d_2 = \\sqrt{84} = 2\\sqrt{21} \\approx 9.17' }
      ],
      finalAnswer: '2*sqrt(21)',
      finalAnswerLatex: '2\\sqrt{21}'
    },
    commonMistakes: [
      'Multiplying side a by side b to find area instead of using perpendicular height or ab*sin(theta).',
      'Assuming the diagonals are equal (they are only equal if it is a rectangle).'
    ],
    relatedFormulaIds: ['geom_rhombus', 'geom_rectangle', 'adv_vector_operations'],
    practiceQuestions: [
      {
        id: 'q_geom_5',
        question: 'A parallelogram has base 10 m, side 6 m, and acute angle 30 degrees. What is its area?',
        options: ['30 m^2', '60 m^2', '15 m^2', '45 m^2'],
        correctIndex: 0,
        explanation: 'A = a*b*sin(theta) = 10 * 6 * sin(30 deg) = 60 * 0.5 = 30 m^2.'
      }
    ],
    searchKeywords: ['parallelogram area', 'parallelogram law', 'diagonals of parallelogram', 'quadrilateral'],
    memoryCard: {
      clozeLatex: 'd_1^2 + d_2^2 = 2(a^2 + ???)',
      missingPart: 'b^2',
      missingOptions: ['b^2', '2b', 'ab', 'h^2'],
      recallPrompt: 'State the right side of the Parallelogram Law: d1^2 + d2^2 = 2(a^2 + ...)',
      identificationPrompt: 'Formula for: Parallelogram Law of Diagonals.'
    }
  },
  {
    id: 'geom_rhombus',
    name: 'Rhombus (Area, Perimeter & Diagonals)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Quadrilaterals',
    difficulty: 'Beginner',
    latex: 'P = 4s, \\quad A = \\frac{1}{2}d_1 d_2 = s^2\\sin\\theta, \\quad s = \\frac{1}{2}\\sqrt{d_1^2 + d_2^2}',
    variables: [
      { symbol: 's', name: 'Side length', meaning: 'All 4 sides are equal' },
      { symbol: 'd_1, d_2', name: 'Diagonals', meaning: 'Perpendicular bisectors of each other' },
      { symbol: '\\theta', name: 'Interior angle', meaning: 'Angle between adjacent sides' }
    ],
    conditions: [
      'All 4 sides equal',
      'Diagonals intersect perpendicularly at 90 degrees and bisect each other and the vertex angles'
    ],
    whenToUse: 'Diamond patterns, kites with equal sides, coordinate geometry diagonals.',
    workedExample: {
      problem: 'Find the area and side length of a rhombus whose diagonals measure 16 cm and 12 cm.',
      steps: [
        { stepNum: 1, instruction: 'Calculate area A = (1/2) * d_1 * d_2', mathLatex: 'A = \\frac{1}{2}(16)(12) = 96\\text{ cm}^2' },
        { stepNum: 2, instruction: 'Calculate side length using right triangle with legs d_1/2 and d_2/2', mathLatex: 's = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}' }
      ],
      finalAnswer: 'Area = 96 cm^2, Side = 10 cm',
      finalAnswerLatex: 'A = 96\\text{ cm}^2, \\quad s = 10\\text{ cm}'
    },
    commonMistakes: [
      'Forgetting the factor 1/2 in the diagonal area formula A = (1/2)d1*d2.',
      'Assuming the diagonals are of equal length (they are only equal if the rhombus is a square).'
    ],
    relatedFormulaIds: ['geom_kite', 'geom_square', 'geom_parallelogram'],
    practiceQuestions: [
      {
        id: 'q_geom_6',
        question: 'If the diagonals of a rhombus are 10 and 24, what is the perimeter?',
        options: ['52', '26', '68', '48'],
        correctIndex: 0,
        explanation: 'Half diagonals are 5 and 12. Side s = sqrt(5^2 + 12^2) = 13. Perimeter = 4 * 13 = 52.'
      }
    ],
    searchKeywords: ['rhombus area', 'rhombus perimeter', 'perpendicular diagonals', 'diamond'],
    memoryCard: {
      clozeLatex: 'A_{\\text{rhombus}} = \\frac{1}{2} ???',
      missingPart: 'd_1 d_2',
      missingOptions: ['d_1 d_2', 'd_1 + d_2', 's^2', '2(d_1 + d_2)'],
      recallPrompt: 'What is the product in the area formula for a rhombus given diagonals d1 and d2?',
      identificationPrompt: 'Formula for: Area of a Rhombus via Diagonals.'
    }
  },
  {
    id: 'geom_trapezoid',
    name: 'Trapezoid / Trapezium (Area & Midsegment)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Quadrilaterals',
    difficulty: 'Beginner',
    latex: 'A = \\frac{a + b}{2}h = mh, \\quad m = \\frac{a + b}{2}, \\quad P = a + b + c + d',
    variables: [
      { symbol: 'a, b', name: 'Parallel bases', meaning: 'The two parallel opposite sides' },
      { symbol: 'h', name: 'Height', meaning: 'Perpendicular distance between parallel bases' },
      { symbol: 'm', name: 'Midsegment / Median', meaning: 'Line connecting midpoints of non-parallel legs' }
    ],
    conditions: [
      'At least one pair of parallel sides (a and b)',
      'For an isosceles trapezoid, non-parallel legs are equal and base angles are equal'
    ],
    whenToUse: 'Trapezoidal rule numerical integration, land surveying, roof cross-sections.',
    workedExample: {
      problem: 'Find the area of a trapezoid with parallel bases 14 cm and 26 cm, and height 8 cm.',
      steps: [
        { stepNum: 1, instruction: 'Calculate the midsegment m = (a + b)/2', mathLatex: 'm = \\frac{14 + 26}{2} = \\frac{40}{2} = 20\\text{ cm}' },
        { stepNum: 2, instruction: 'Multiply midsegment by height', mathLatex: 'A = m \\cdot h = 20 \\times 8 = 160\\text{ cm}^2' }
      ],
      finalAnswer: '160 cm^2',
      finalAnswerLatex: '160\\text{ cm}^2'
    },
    commonMistakes: [
      'Using the length of the slanted leg instead of the perpendicular height h.',
      'Forgetting to divide the sum of bases by 2.'
    ],
    relatedFormulaIds: ['integ_ftc_explorer', 'geom_parallelogram'],
    practiceQuestions: [
      {
        id: 'q_geom_7',
        question: 'If the median of a trapezoid is 15 cm and its area is 120 cm^2, what is its height?',
        options: ['8 cm', '6 cm', '10 cm', '12 cm'],
        correctIndex: 0,
        explanation: 'A = m * h => 120 = 15 * h => h = 120 / 15 = 8 cm.'
      }
    ],
    searchKeywords: ['trapezoid area', 'trapezium', 'midsegment of trapezoid', 'bases'],
    memoryCard: {
      clozeLatex: 'A_{\\text{trapezoid}} = \\frac{a + b}{???} \\cdot h',
      missingPart: '2',
      missingOptions: ['2', '4', '3', '1'],
      recallPrompt: 'What is the denominator for averaging the parallel bases of a trapezoid?',
      identificationPrompt: 'Formula for: Area of a Trapezoid.'
    }
  },
  {
    id: 'geom_kite',
    name: 'Kite (Perimeter & Area)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Quadrilaterals',
    difficulty: 'Beginner',
    latex: 'P = 2(a + b), \\quad A = \\frac{1}{2}d_1 d_2',
    variables: [
      { symbol: 'a, b', name: 'Pair of adjacent equal sides', meaning: 'Two distinct pairs of adjacent congruent sides' },
      { symbol: 'd_1, d_2', name: 'Diagonals', meaning: 'Intersect at right angles; one diagonal bisects the other' }
    ],
    conditions: [
      'Two distinct pairs of adjacent equal-length sides',
      'Diagonals are perpendicular (orthogonal), and the main axis of symmetry bisects the other diagonal'
    ],
    whenToUse: 'Aerodynamic kite design, facet diamond cuts, quadrilateral proofs.',
    workedExample: {
      problem: 'A kite has diagonals of 12 cm and 18 cm. Find its area.',
      steps: [
        { stepNum: 1, instruction: 'Use orthogonal diagonal area formula', mathLatex: 'A = \\frac{1}{2}d_1 d_2' },
        { stepNum: 2, instruction: 'Evaluate with given diagonals', mathLatex: 'A = \\frac{1}{2}(12)(18) = 6 \\times 18 = 108\\text{ cm}^2' }
      ],
      finalAnswer: '108 cm^2',
      finalAnswerLatex: '108\\text{ cm}^2'
    },
    commonMistakes: [
      'Assuming the diagonals bisect each other equally (only one diagonal is bisected by the other).',
      'Confusing kite properties with a general quadrilateral.'
    ],
    relatedFormulaIds: ['geom_rhombus', 'geom_trapezoid'],
    practiceQuestions: [
      {
        id: 'q_geom_8',
        question: 'If a kite has sides of 5 and 12, what is its perimeter?',
        options: ['34', '17', '60', '24'],
        correctIndex: 0,
        explanation: 'P = 2(5 + 12) = 2(17) = 34.'
      }
    ],
    searchKeywords: ['kite area', 'kite perimeter', 'orthogonal diagonals'],
    memoryCard: {
      clozeLatex: 'A_{\\text{kite}} = \\frac{1}{2} ???',
      missingPart: 'd_1 d_2',
      missingOptions: ['d_1 d_2', 'ab', '2(a+b)', 'd_1 + d_2'],
      recallPrompt: 'What is the formula for the area of a kite in terms of diagonals?',
      identificationPrompt: 'Formula for: Area of a Kite.'
    }
  },
  {
    id: 'geom_regular_polygons',
    name: 'Regular Polygons (Area, Perimeter & Apothem)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Polygons',
    difficulty: 'Intermediate',
    latex: 'P = ns, \\quad A = \\frac{1}{2}Pa = \\frac{1}{4}ns^2\\cot\\left(\\frac{\\pi}{n}\\right), \\quad a = \\frac{s}{2\\tan(\\pi/n)}',
    variables: [
      { symbol: 'n', name: 'Number of sides', meaning: 'Integer n >= 3' },
      { symbol: 's', name: 'Side length', meaning: 'Length of each equal side' },
      { symbol: 'a', name: 'Apothem', meaning: 'Perpendicular distance from center to midpoint of any side (inradius)' },
      { symbol: 'P', name: 'Perimeter', meaning: 'Total boundary ns' }
    ],
    conditions: [
      'n \\ge 3',
      'Sum of interior angles = (n - 2) * 180 deg',
      'Each interior angle = (n - 2) * 180 deg / n',
      'Each central angle = 360 deg / n'
    ],
    whenToUse: 'Hexagons, octagons, architecture, gears, honeycomb structures.',
    workedExample: {
      problem: 'Find the area of a regular hexagon with side length s = 4 cm.',
      steps: [
        { stepNum: 1, instruction: 'Notice a regular hexagon is composed of 6 equilateral triangles', mathLatex: 'A = 6 \\times \\left(\\frac{\\sqrt{3}}{4}s^2\\right)' },
        { stepNum: 2, instruction: 'Substitute s = 4', mathLatex: 'A = 6 \\times \\frac{\\sqrt{3}}{4}(16) = 6 \\times 4\\sqrt{3} = 24\\sqrt{3}\\text{ cm}^2 \\approx 41.57\\text{ cm}^2' }
      ],
      finalAnswer: '24*sqrt(3) cm^2',
      finalAnswerLatex: '24\\sqrt{3}\\text{ cm}^2'
    },
    commonMistakes: [
      'Confusing the apothem (inradius a) with the circumradius R (distance to vertex).',
      'Using degrees inside radian formulas.'
    ],
    relatedFormulaIds: ['geom_polygon_angles', 'geom_equilateral_triangle'],
    practiceQuestions: [
      {
        id: 'q_geom_9',
        question: 'What is the sum of the interior angles of a regular octagon (8 sides)?',
        options: ['1080 degrees', '720 degrees', '1440 degrees', '900 degrees'],
        correctIndex: 0,
        explanation: '(8 - 2) * 180 = 6 * 180 = 1080 degrees.'
      }
    ],
    searchKeywords: ['regular polygon', 'apothem', 'hexagon area', 'interior angles', 'octagon'],
    memoryCard: {
      clozeLatex: 'A_{\\text{regular polygon}} = \\frac{1}{2} P \\times ???',
      missingPart: 'a',
      missingOptions: ['a', 's', 'R', 'h'],
      recallPrompt: 'What multiplies the perimeter P in A = (1/2) P (...) for regular polygons?',
      identificationPrompt: 'Formula for: Regular Polygon Area via Apothem.'
    }
  },
  {
    id: 'geom_circle',
    name: 'Circle (Circumference & Area)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Circles',
    difficulty: 'Beginner',
    latex: 'C = 2\\pi r = \\pi d, \\quad A = \\pi r^2 = \\frac{1}{4}\\pi d^2',
    variables: [
      { symbol: 'r', name: 'Radius', meaning: 'Distance from center to any point on boundary' },
      { symbol: 'd', name: 'Diameter', meaning: 'Distance across circle through center (d = 2r)' },
      { symbol: 'C', name: 'Circumference', meaning: 'Perimeter of circle' },
      { symbol: 'A', name: 'Area', meaning: 'Surface enclosed by circle' }
    ],
    conditions: [
      'r > 0',
      '\\pi \\approx 3.14159265...'
    ],
    whenToUse: 'Pipes, wheels, circular motion, rotational dynamics, cross sections.',
    workedExample: {
      problem: 'A circular pizza has diameter 14 inches. Find its area in terms of pi and approx.',
      steps: [
        { stepNum: 1, instruction: 'Determine radius', mathLatex: 'r = \\frac{d}{2} = \\frac{14}{2} = 7\\text{ in}' },
        { stepNum: 2, instruction: 'Apply area formula A = pi * r^2', mathLatex: 'A = \\pi (7)^2 = 49\\pi \\approx 49(3.1416) \\approx 153.94\\text{ sq inches}' }
      ],
      finalAnswer: '49 pi sq inches (~153.94 sq in)',
      finalAnswerLatex: '49\\pi\\text{ in}^2'
    },
    commonMistakes: [
      'Squaring diameter instead of radius (forgetting to divide by 2 first).',
      'Confusing 2*pi*r (circumference) with pi*r^2 (area).'
    ],
    relatedFormulaIds: ['geom_sector', 'geom_sphere'],
    practiceQuestions: [
      {
        id: 'q_geom_10',
        question: 'If a circle has area 36*pi, what is its circumference?',
        options: ['12*pi', '6*pi', '18*pi', '24*pi'],
        correctIndex: 0,
        explanation: 'pi*r^2 = 36*pi => r = 6. Circumference = 2*pi*r = 12*pi.'
      }
    ],
    searchKeywords: ['circle area', 'circumference', 'pi r squared', 'radius', 'diameter'],
    memoryCard: {
      clozeLatex: 'A_{\\text{circle}} = \\pi \\times ???',
      missingPart: 'r^2',
      missingOptions: ['r^2', '2r', 'd^2', 'r'],
      recallPrompt: 'What is the radius raised to in the area of a circle?',
      identificationPrompt: 'Formula for: Area of a Circle.'
    }
  },
  {
    id: 'geom_semicircle_sector',
    name: 'Sector and Semicircle (Arc Length & Area)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Circles & Sectors',
    difficulty: 'Intermediate',
    latex: 'L_{\\text{arc}} = r\\theta, \\quad A_{\\text{sector}} = \\frac{1}{2}r^2\\theta = \\frac{1}{2}L r, \\quad A_{\\text{semicircle}} = \\frac{1}{2}\\pi r^2, \\quad P_{\\text{semicircle}} = \\pi r + 2r',
    variables: [
      { symbol: 'r', name: 'Radius', meaning: 'Radius of circular arc' },
      { symbol: '\\theta', name: 'Central angle', meaning: 'Angle measured in RADIANS' },
      { symbol: 'L', name: 'Arc length', meaning: 'Distance along circular arc' }
    ],
    conditions: [
      '\\theta MUST be in radians for L = r*theta and A = (1/2)r^2*theta.',
      'If given in degrees \\alpha: L = \\frac{\\alpha}{360^\\circ}(2\\pi r), \\; A = \\frac{\\alpha}{360^\\circ}(\\pi r^2)'
    ],
    whenToUse: 'Pendulums, circular tracks, pizza slices, radar sweeps, polar coordinates.',
    workedExample: {
      problem: 'Find the area of a sector with radius 6 cm and central angle theta = pi/3 radians (60 deg).',
      steps: [
        { stepNum: 1, instruction: 'Use radian sector area formula A = (1/2) r^2 theta', mathLatex: 'A = \\frac{1}{2}(6^2)\\left(\\frac{\\pi}{3}\\right)' },
        { stepNum: 2, instruction: 'Simplify arithmetic', mathLatex: 'A = \\frac{1}{2}(36)\\left(\\frac{\\pi}{3}\\right) = 18 \\times \\frac{\\pi}{3} = 6\\pi\\text{ cm}^2 \\approx 18.85\\text{ cm}^2' }
      ],
      finalAnswer: '6 pi cm^2',
      finalAnswerLatex: '6\\pi\\text{ cm}^2'
    },
    commonMistakes: [
      'Plugging in degrees directly into (1/2) r^2 theta (e.g. putting 60 instead of pi/3).',
      'Forgetting to add the diameter 2r to perimeter of a semicircle (P = pi*r + 2r, NOT just pi*r).'
    ],
    relatedFormulaIds: ['geom_circle', 'trig_degrees_radians'],
    practiceQuestions: [
      {
        id: 'q_geom_11',
        question: 'What is the arc length of a circle of radius 10 intercepted by central angle 0.5 radians?',
        options: ['5', '10', '2.5', '5*pi'],
        correctIndex: 0,
        explanation: 'L = r * theta = 10 * 0.5 = 5.'
      }
    ],
    searchKeywords: ['sector area', 'arc length', 'semicircle', 'central angle', 'radians'],
    memoryCard: {
      clozeLatex: 'A_{\\text{sector}} = \\frac{1}{2} r^2 \\times ??? \\quad (\\text{in radians})',
      missingPart: '\\theta',
      missingOptions: ['\\theta', '2\\pi', '\\pi', 'L'],
      recallPrompt: 'What angle variable appears in the radian sector area formula?',
      identificationPrompt: 'Formula for: Area of a Circular Sector.'
    }
  },
  {
    id: 'geom_ellipse',
    name: 'Ellipse (Area & Perimeter Ramanujan Approximation)',
    subject: 'geometry',
    category: '2D Shapes',
    topic: 'Conics',
    difficulty: 'Intermediate',
    latex: 'A = \\pi a b, \\quad P \\approx \\pi \\left[ 3(a+b) - \\sqrt{(3a+b)(a+3b)} \\right], \\quad c = \\sqrt{a^2 - b^2}',
    variables: [
      { symbol: 'a', name: 'Semi-major axis', meaning: 'Half the length of longest diameter' },
      { symbol: 'b', name: 'Semi-minor axis', meaning: 'Half the length of shortest diameter' },
      { symbol: 'c', name: 'Focal distance', meaning: 'Distance from center to each focus' },
      { symbol: 'e', name: 'Eccentricity', meaning: 'e = c/a, where 0 <= e < 1' }
    ],
    conditions: [
      'a \\ge b > 0',
      'If a = b, the ellipse becomes a circle with radius r = a = b, area pi*a^2, and perimeter 2*pi*a'
    ],
    whenToUse: 'Keplerian planetary orbits, whispering galleries, acoustic reflectors, oval tracks.',
    workedExample: {
      problem: 'An elliptical garden has semi-major axis a = 5 m and semi-minor axis b = 3 m. Find its exact area.',
      steps: [
        { stepNum: 1, instruction: 'Apply ellipse area formula A = pi * a * b', mathLatex: 'A = \\pi (5)(3)' },
        { stepNum: 2, instruction: 'Compute exact and approximate values', mathLatex: 'A = 15\\pi\\text{ m}^2 \\approx 47.12\\text{ m}^2' }
      ],
      finalAnswer: '15 pi m^2',
      finalAnswerLatex: '15\\pi\\text{ m}^2'
    },
    commonMistakes: [
      'Confusing the full major axis (2a) with the semi-major axis (a).',
      'Thinking ellipse perimeter has an exact elementary formula without elliptic integrals.'
    ],
    relatedFormulaIds: ['geom_circle'],
    practiceQuestions: [
      {
        id: 'q_geom_12',
        question: 'If an ellipse has major axis 10 and minor axis 6, what is its area?',
        options: ['15*pi', '60*pi', '30*pi', '25*pi'],
        correctIndex: 0,
        explanation: 'Semi-axes are a = 10/2 = 5, b = 6/2 = 3. A = pi * a * b = 15*pi.'
      }
    ],
    searchKeywords: ['ellipse area', 'ellipse perimeter', 'semi-major axis', 'Ramanujan approximation'],
    memoryCard: {
      clozeLatex: 'A_{\\text{ellipse}} = \\pi \\times ???',
      missingPart: 'ab',
      missingOptions: ['ab', 'a^2 + b^2', '\\frac{a+b}{2}', 'a^2 b^2'],
      recallPrompt: 'What product of semi-axes gives the area of an ellipse when multiplied by pi?',
      identificationPrompt: 'Formula for: Area of an Ellipse.'
    }
  },

  // ─── 3D SOLIDS ───
  {
    id: 'geom_cube',
    name: 'Cube (Volume, Surface Areas & Space Diagonal)',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Polyhedra',
    difficulty: 'Beginner',
    latex: 'V = s^3, \\quad TSA = 6s^2, \\quad LSA = 4s^2, \\quad d_{\\text{space}} = s\\sqrt{3}',
    variables: [
      { symbol: 's', name: 'Side / Edge length', meaning: 'All 12 edges have equal length' },
      { symbol: 'V', name: 'Volume', meaning: 'Total 3D space occupied' },
      { symbol: 'TSA', name: 'Total Surface Area', meaning: 'Sum of areas of all 6 square faces' },
      { symbol: 'LSA', name: 'Lateral Surface Area', meaning: 'Area of 4 vertical side faces' },
      { symbol: 'd_{\\text{space}}', name: 'Space Diagonal', meaning: 'Interior diagonal connecting opposite corners' }
    ],
    conditions: [
      '6 square faces, 12 edges, 8 vertices'
    ],
    whenToUse: 'Cubic storage, density calculations, dice, crystalline lattices.',
    workedExample: {
      problem: 'Find the total surface area and space diagonal of a cube with volume 64 cm^3.',
      steps: [
        { stepNum: 1, instruction: 'Find side length s by cube root', mathLatex: 's = \\sqrt[3]{64} = 4\\text{ cm}' },
        { stepNum: 2, instruction: 'Calculate TSA = 6s^2', mathLatex: 'TSA = 6(4^2) = 6(16) = 96\\text{ cm}^2' },
        { stepNum: 3, instruction: 'Calculate space diagonal d = s*sqrt(3)', mathLatex: 'd = 4\\sqrt{3}\\text{ cm} \\approx 6.93\\text{ cm}' }
      ],
      finalAnswer: 'TSA = 96 cm^2, Diagonal = 4*sqrt(3) cm',
      finalAnswerLatex: 'TSA = 96\\text{ cm}^2, \\quad d = 4\\sqrt{3}\\text{ cm}'
    },
    commonMistakes: [
      'Confusing face diagonal (s*sqrt(2)) with space diagonal (s*sqrt(3)).',
      'Confusing lateral surface area (4 faces) with total surface area (6 faces).'
    ],
    relatedFormulaIds: ['geom_cuboid', 'geom_tetrahedron'],
    practiceQuestions: [
      {
        id: 'q_geom_13',
        question: 'If the edge of a cube is doubled, by what factor does its volume increase?',
        options: ['8', '4', '2', '6'],
        correctIndex: 0,
        explanation: 'V_new = (2s)^3 = 8s^3 = 8 * V_old.'
      }
    ],
    searchKeywords: ['cube volume', 'cube surface area', 'space diagonal', 'polyhedron'],
    memoryCard: {
      clozeLatex: 'd_{\\text{space, cube}} = s \\times ???',
      missingPart: '\\sqrt{3}',
      missingOptions: ['\\sqrt{3}', '\\sqrt{2}', '3', '2'],
      recallPrompt: 'What radical factor multiplies s to give the space diagonal of a cube?',
      identificationPrompt: 'Formula for: Space Diagonal of a Cube.'
    }
  },
  {
    id: 'geom_cuboid',
    name: 'Cuboid / Rectangular Prism',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Prisms',
    difficulty: 'Beginner',
    latex: 'V = lwh, \\quad TSA = 2(lw + wh + hl), \\quad LSA = 2h(l + w), \\quad d = \\sqrt{l^2 + w^2 + h^2}',
    variables: [
      { symbol: 'l, w, h', name: 'Length, Width, Height', meaning: 'The 3 mutually perpendicular dimensions' },
      { symbol: 'V', name: 'Volume', meaning: 'Total capacity' },
      { symbol: 'TSA', name: 'Total Surface Area', meaning: 'Area of all 6 rectangular faces' },
      { symbol: 'd', name: 'Space Diagonal', meaning: 'Longest internal line segment' }
    ],
    conditions: [
      'All 6 faces are rectangles meet at right angles'
    ],
    whenToUse: 'Shipping boxes, swimming pools, rooms, bricks, luggage capacity.',
    workedExample: {
      problem: 'Find the length of the longest stick that can fit inside a box of dimensions 3 cm by 4 cm by 12 cm.',
      steps: [
        { stepNum: 1, instruction: 'The longest stick equals the space diagonal d', mathLatex: 'd = \\sqrt{l^2 + w^2 + h^2}' },
        { stepNum: 2, instruction: 'Substitute dimensions', mathLatex: 'd = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169}' },
        { stepNum: 3, instruction: 'Evaluate square root', mathLatex: 'd = 13\\text{ cm}' }
      ],
      finalAnswer: '13 cm',
      finalAnswerLatex: '13\\text{ cm}'
    },
    commonMistakes: [
      'Forgetting to double each pair of faces for TSA: 2*(lw + wh + hl).',
      'Using 2D diagonal instead of 3D space diagonal.'
    ],
    relatedFormulaIds: ['geom_cube', 'geom_cylinder'],
    practiceQuestions: [
      {
        id: 'q_geom_14',
        question: 'What is the volume of a rectangular prism with length 5, width 4, and height 3?',
        options: ['60', '94', '48', '30'],
        correctIndex: 0,
        explanation: 'V = l * w * h = 5 * 4 * 3 = 60.'
      }
    ],
    searchKeywords: ['cuboid volume', 'rectangular prism', 'total surface area', 'space diagonal'],
    memoryCard: {
      clozeLatex: 'd_{\\text{cuboid}} = \\sqrt{l^2 + w^2 + ???}',
      missingPart: 'h^2',
      missingOptions: ['h^2', '2h', 'lh', '0'],
      recallPrompt: 'What is the third term under the square root for a cuboid space diagonal?',
      identificationPrompt: 'Formula for: Space Diagonal of a Cuboid.'
    }
  },
  {
    id: 'geom_cylinder',
    name: 'Right Circular Cylinder',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Cylinders',
    difficulty: 'Beginner',
    latex: 'V = \\pi r^2 h, \\quad CSA = 2\\pi rh, \\quad TSA = 2\\pi r(r + h)',
    variables: [
      { symbol: 'r', name: 'Base Radius', meaning: 'Radius of circular top and bottom faces' },
      { symbol: 'h', name: 'Height', meaning: 'Perpendicular altitude between circular bases' },
      { symbol: 'CSA', name: 'Curved (Lateral) Surface Area', meaning: 'Area of the unrolled rectangle: 2*pi*r * h' },
      { symbol: 'TSA', name: 'Total Surface Area', meaning: 'Curved area plus 2 circular bases: 2*pi*r*h + 2*pi*r^2' }
    ],
    conditions: [
      'Bases are parallel, identical circles centered along the perpendicular axis'
    ],
    whenToUse: 'Cans, pipes, engine pistons, tanks, wires, grain silos.',
    workedExample: {
      problem: 'A cylinder has radius 3 cm and height 7 cm. Find its volume and total surface area in terms of pi.',
      steps: [
        { stepNum: 1, instruction: 'Calculate Volume V = pi * r^2 * h', mathLatex: 'V = \\pi (3^2)(7) = \\pi (9)(7) = 63\\pi\\text{ cm}^3' },
        { stepNum: 2, instruction: 'Calculate TSA = 2*pi*r(r + h)', mathLatex: 'TSA = 2\\pi (3)(3 + 7) = 6\\pi (10) = 60\\pi\\text{ cm}^2' }
      ],
      finalAnswer: 'V = 63 pi cm^3, TSA = 60 pi cm^2',
      finalAnswerLatex: 'V = 63\\pi\\text{ cm}^3, \\quad TSA = 60\\pi\\text{ cm}^2'
    },
    commonMistakes: [
      'Forgetting one or both circular bases in total surface area calculation.',
      'Confusing CSA (2*pi*r*h) with Volume (pi*r^2*h).'
    ],
    relatedFormulaIds: ['geom_cone', 'geom_sphere'],
    practiceQuestions: [
      {
        id: 'q_geom_15',
        question: 'If the height of a cylinder is doubled while keeping radius unchanged, what happens to volume?',
        options: ['Doubles', 'Quadruples', 'Increases 8-fold', 'Stays same'],
        correctIndex: 0,
        explanation: 'V is proportional to h, so doubling h doubles the volume.'
      }
    ],
    searchKeywords: ['cylinder volume', 'curved surface area', 'cylinder TSA', 'right circular cylinder'],
    memoryCard: {
      clozeLatex: 'V_{\\text{cylinder}} = \\pi r^2 \\times ???',
      missingPart: 'h',
      missingOptions: ['h', '2h', '\\frac{1}{3}h', 'r'],
      recallPrompt: 'What multiplies base area pi*r^2 to give cylinder volume?',
      identificationPrompt: 'Formula for: Volume of a Cylinder.'
    }
  },
  {
    id: 'geom_cone',
    name: 'Right Circular Cone',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Cones',
    difficulty: 'Intermediate',
    latex: 'V = \\frac{1}{3}\\pi r^2 h, \\quad l = \\sqrt{r^2 + h^2}, \\quad CSA = \\pi rl, \\quad TSA = \\pi r(r + l)',
    variables: [
      { symbol: 'r', name: 'Base Radius', meaning: 'Radius of circular base' },
      { symbol: 'h', name: 'Vertical Height', meaning: 'Perpendicular altitude from base to apex' },
      { symbol: 'l', name: 'Slant Height', meaning: 'Length along the curved surface: l = sqrt(r^2 + h^2)' },
      { symbol: 'CSA', name: 'Curved Surface Area', meaning: 'Lateral surface area = pi * r * l' }
    ],
    conditions: [
      'Volume is exactly 1/3 the volume of a cylinder with identical base and height'
    ],
    whenToUse: 'Funnels, volcanic cones, party hats, traffic cones, sand piles.',
    workedExample: {
      problem: 'A cone has radius 5 cm and height 12 cm. Find its slant height and curved surface area.',
      steps: [
        { stepNum: 1, instruction: 'Calculate slant height l = sqrt(r^2 + h^2)', mathLatex: 'l = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\text{ cm}' },
        { stepNum: 2, instruction: 'Compute CSA = pi * r * l', mathLatex: 'CSA = \\pi (5)(13) = 65\\pi\\text{ cm}^2 \\approx 204.20\\text{ cm}^2' }
      ],
      finalAnswer: 'l = 13 cm, CSA = 65 pi cm^2',
      finalAnswerLatex: 'l = 13\\text{ cm}, \\quad CSA = 65\\pi\\text{ cm}^2'
    },
    commonMistakes: [
      'Using vertical height h instead of slant height l when calculating surface area.',
      'Forgetting the 1/3 factor in volume.'
    ],
    relatedFormulaIds: ['geom_cylinder', 'geom_pyramid'],
    practiceQuestions: [
      {
        id: 'q_geom_16',
        question: 'What is the volume of a cone with radius 6 and height 7 in terms of pi?',
        options: ['84*pi', '252*pi', '42*pi', '126*pi'],
        correctIndex: 0,
        explanation: 'V = (1/3)*pi*(6^2)*7 = (1/3)*pi*(36)*7 = 12 * 7 * pi = 84*pi.'
      }
    ],
    searchKeywords: ['cone volume', 'slant height', 'cone surface area', 'right circular cone'],
    memoryCard: {
      clozeLatex: 'CSA_{\\text{cone}} = \\pi r \\times ???',
      missingPart: 'l',
      missingOptions: ['l', 'h', '2h', 'r'],
      recallPrompt: 'What height (slant height l vs vertical height h) is used in cone CSA = pi * r * ...?',
      identificationPrompt: 'Formula for: Curved Surface Area of a Cone.'
    }
  },
  {
    id: 'geom_sphere_hemisphere',
    name: 'Sphere and Hemisphere',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Spheres',
    difficulty: 'Intermediate',
    latex: 'V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3, \\quad TSA_{\\text{sphere}} = 4\\pi r^2, \\quad V_{\\text{hemi}} = \\frac{2}{3}\\pi r^3, \\quad TSA_{\\text{hemi}} = 3\\pi r^2',
    variables: [
      { symbol: 'r', name: 'Radius', meaning: 'Distance from spherical center to any surface point' },
      { symbol: 'V', name: 'Volume', meaning: '3D interior space' },
      { symbol: 'TSA', name: 'Total Surface Area', meaning: 'For hemisphere, includes flat base: 2*pi*r^2 + pi*r^2 = 3*pi*r^2' }
    ],
    conditions: [
      'Archimedes discovery: A sphere has 2/3 the volume and 2/3 the surface area of its circumscribed cylinder'
    ],
    whenToUse: 'Planets, bubbles, ball bearings, domes, celestial mechanics.',
    workedExample: {
      problem: 'Find the total surface area and volume of a solid hemisphere of radius 6 cm in terms of pi.',
      steps: [
        { stepNum: 1, instruction: 'Apply hemisphere volume formula V = (2/3) pi r^3', mathLatex: 'V = \\frac{2}{3}\\pi (6^3) = \\frac{2}{3}\\pi (216) = 144\\pi\\text{ cm}^3' },
        { stepNum: 2, instruction: 'Apply solid hemisphere TSA = 3 pi r^2 (curved bowl + flat circular face)', mathLatex: 'TSA = 3\\pi (6^2) = 3\\pi (36) = 108\\pi\\text{ cm}^2' }
      ],
      finalAnswer: 'V = 144 pi cm^3, TSA = 108 pi cm^2',
      finalAnswerLatex: 'V = 144\\pi\\text{ cm}^3, \\quad TSA = 108\\pi\\text{ cm}^2'
    },
    commonMistakes: [
      'Using 2*pi*r^2 for the total surface area of a SOLID hemisphere, forgetting the flat base (+ pi*r^2 = 3*pi*r^2).',
      'Confusing the derivative relationship: d/dr[(4/3)pi*r^3] = 4*pi*r^2.'
    ],
    relatedFormulaIds: ['geom_cylinder', 'geom_circle'],
    practiceQuestions: [
      {
        id: 'q_geom_17',
        question: 'If a sphere has surface area 100*pi, what is its radius?',
        options: ['5', '10', '25', '2.5'],
        correctIndex: 0,
        explanation: '4*pi*r^2 = 100*pi => r^2 = 25 => r = 5.'
      }
    ],
    searchKeywords: ['sphere volume', 'sphere surface area', 'hemisphere', 'Archimedes'],
    memoryCard: {
      clozeLatex: 'V_{\\text{sphere}} = \\frac{4}{3}\\pi \\times ???',
      missingPart: 'r^3',
      missingOptions: ['r^3', 'r^2', '3r', 'd^3'],
      recallPrompt: 'What power of radius appears in sphere volume?',
      identificationPrompt: 'Formula for: Volume of a Sphere.'
    }
  },
  {
    id: 'geom_pyramid_prism_tetrahedron',
    name: 'General Pyramids, Prisms & Regular Tetrahedron',
    subject: 'geometry',
    category: '3D Solids',
    topic: 'Polyhedra',
    difficulty: 'Advanced',
    latex: 'V_{\\text{prism}} = B h, \\quad V_{\\text{pyramid}} = \\frac{1}{3}B h, \\quad V_{\\text{tetra}} = \\frac{s^3}{6\\sqrt{2}}, \\quad TSA_{\\text{tetra}} = \\sqrt{3}s^2, \\quad h_{\\text{tetra}} = s\\sqrt{\\frac{2}{3}}',
    variables: [
      { symbol: 'B', name: 'Base Area', meaning: 'Area of polygon at bottom' },
      { symbol: 'h', name: 'Height', meaning: 'Perpendicular altitude' },
      { symbol: 's', name: 'Edge length of regular tetrahedron', meaning: 'All 6 edges equal' }
    ],
    conditions: [
      'A regular tetrahedron has 4 equilateral triangle faces, 4 vertices, 6 edges',
      'Euler characteristic holds: V - E + F = 4 - 6 + 4 = 2'
    ],
    whenToUse: 'Crystallography, architectural trusses, polyhedral models.',
    workedExample: {
      problem: 'Find the volume and total surface area of a regular tetrahedron of edge s = 6 cm.',
      steps: [
        { stepNum: 1, instruction: 'Calculate TSA = sqrt(3) * s^2', mathLatex: 'TSA = \\sqrt{3}(6^2) = 36\\sqrt{3}\\text{ cm}^2' },
        { stepNum: 2, instruction: 'Calculate Volume V = s^3 / (6*sqrt(2))', mathLatex: 'V = \\frac{6^3}{6\\sqrt{2}} = \\frac{216}{6\\sqrt{2}} = \\frac{36}{\\sqrt{2}} = 18\\sqrt{2}\\text{ cm}^3' }
      ],
      finalAnswer: 'TSA = 36*sqrt(3) cm^2, V = 18*sqrt(2) cm^3',
      finalAnswerLatex: 'TSA = 36\\sqrt{3}\\text{ cm}^2, \\quad V = 18\\sqrt{2}\\text{ cm}^3'
    },
    commonMistakes: [
      'Confusing the slant height of a triangular face with the overall altitude of the pyramid.',
      'Forgetting the 1/3 factor on pyramid volumes.'
    ],
    relatedFormulaIds: ['geom_cube', 'geom_equilateral_triangle', 'olympiad_euler_polyhedral'],
    practiceQuestions: [
      {
        id: 'q_geom_18',
        question: 'A square pyramid has base side 6 and height 10. What is its volume?',
        options: ['120', '360', '60', '180'],
        correctIndex: 0,
        explanation: 'Base area B = 6^2 = 36. V = (1/3) * B * h = (1/3) * 36 * 10 = 120.'
      }
    ],
    searchKeywords: ['regular tetrahedron', 'pyramid volume', 'prism volume', 'polyhedron'],
    memoryCard: {
      clozeLatex: 'V_{\\text{pyramid}} = ??? \\times B \\cdot h',
      missingPart: '\\frac{1}{3}',
      missingOptions: ['\\frac{1}{3}', '\\frac{1}{2}', '1', '\\frac{1}{4}'],
      recallPrompt: 'What fraction multiplies Base * Height to give pyramid volume?',
      identificationPrompt: 'Formula for: Volume of a Pyramid.'
    }
  },

  // ─── ADVANCED GEOMETRY ───
  {
    id: 'geom_pythagorean_theorem',
    name: 'Pythagorean Theorem',
    subject: 'geometry',
    category: 'Advanced Geometry',
    topic: 'Triangles & Trigonometry',
    difficulty: 'Beginner',
    latex: 'a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2}',
    variables: [
      { symbol: 'a, b', name: 'Legs / Catheti', meaning: 'Sides adjacent to the 90-degree right angle' },
      { symbol: 'c', name: 'Hypotenuse', meaning: 'Longest side opposite the right angle' }
    ],
    conditions: [
      'Applies ONLY to right-angled triangles in Euclidean flat geometry',
      'Converse holds: if a^2 + b^2 = c^2, the triangle MUST be a right triangle'
    ],
    whenToUse: 'Distance calculations, vector magnitudes, navigation, computer graphics.',
    workedExample: {
      problem: 'A ladder 10 m long leans against a wall. The base of the ladder is 6 m from the wall. How high up the wall does it reach?',
      steps: [
        { stepNum: 1, instruction: 'Set up Pythagorean theorem: a^2 + b^2 = c^2', mathLatex: '6^2 + h^2 = 10^2' },
        { stepNum: 2, instruction: 'Isolate h^2', mathLatex: '36 + h^2 = 100 \\implies h^2 = 64' },
        { stepNum: 3, instruction: 'Take square root', mathLatex: 'h = \\sqrt{64} = 8\\text{ m}' }
      ],
      finalAnswer: '8 m',
      finalAnswerLatex: '8\\text{ m}'
    },
    commonMistakes: [
      'Adding sides instead of their squares (a + b = c is false).',
      'Plugging the hypotenuse into one of the legs.'
    ],
    relatedFormulaIds: ['geom_coordinate_distance', 'trig_pythagorean_identities', 'trig_law_of_cosines'],
    practiceQuestions: [
      {
        id: 'q_geom_19',
        question: 'Which of the following is a Pythagorean triple?',
        options: ['(5, 12, 13)', '(5, 10, 15)', '(4, 5, 6)', '(7, 14, 21)'],
        correctIndex: 0,
        explanation: '5^2 + 12^2 = 25 + 144 = 169 = 13^2.'
      }
    ],
    searchKeywords: ['Pythagorean theorem', 'right triangle', 'hypotenuse', 'a2+b2=c2', 'Pythagorean triple'],
    memoryCard: {
      clozeLatex: 'a^2 + b^2 = ???',
      missingPart: 'c^2',
      missingOptions: ['c^2', 'c', '2c', 'ab'],
      recallPrompt: 'What equals a^2 + b^2 in a right triangle?',
      identificationPrompt: 'Formula for: Pythagorean Theorem.'
    }
  },
  {
    id: 'geom_heron_formula',
    name: "Heron's Formula",
    subject: 'geometry',
    category: 'Advanced Geometry',
    topic: 'Triangles',
    difficulty: 'Intermediate',
    latex: 'A = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a + b + c}{2}',
    variables: [
      { symbol: 'a, b, c', name: 'Side lengths', meaning: 'The lengths of all 3 sides of the triangle' },
      { symbol: 's', name: 'Semi-perimeter', meaning: 'Half the triangle perimeter' }
    ],
    conditions: [
      'Sides must satisfy triangle inequalities: a + b > c, a + c > b, b + c > a (so each term s-a, s-b, s-c is positive)'
    ],
    whenToUse: 'Finding triangle area when all three sides (SSS) are known without needing angles or heights.',
    workedExample: {
      problem: 'Find the area of a triangle with sides 7 cm, 8 cm, and 9 cm.',
      steps: [
        { stepNum: 1, instruction: 'Calculate semi-perimeter s', mathLatex: 's = \\frac{7 + 8 + 9}{2} = \\frac{24}{2} = 12\\text{ cm}' },
        { stepNum: 2, instruction: 'Compute differences (s - a), (s - b), (s - c)', mathLatex: 's - a = 12 - 7 = 5, \\quad s - b = 12 - 8 = 4, \\quad s - c = 12 - 9 = 3' },
        { stepNum: 3, instruction: 'Multiply and take square root', mathLatex: 'A = \\sqrt{12 \\times 5 \\times 4 \\times 3} = \\sqrt{720} = \\sqrt{144 \\times 5} = 12\\sqrt{5}\\text{ cm}^2 \\approx 26.83\\text{ cm}^2' }
      ],
      finalAnswer: '12*sqrt(5) cm^2',
      finalAnswerLatex: '12\\sqrt{5}\\text{ cm}^2'
    },
    commonMistakes: [
      'Forgetting the leading s factor under the square root (just doing sqrt((s-a)(s-b)(s-c))).',
      'Dividing by 3 instead of 2 for the semi-perimeter.'
    ],
    relatedFormulaIds: ['geom_triangle_general', 'trig_law_of_cosines'],
    practiceQuestions: [
      {
        id: 'q_geom_20',
        question: 'What is the area of a triangle with sides 3, 4, 5 using Heron\'s formula?',
        options: ['6', '12', '5', '8'],
        correctIndex: 0,
        explanation: 's = (3+4+5)/2 = 6. A = sqrt(6 * 3 * 2 * 1) = sqrt(36) = 6.'
      }
    ],
    searchKeywords: ['Herons formula', 'SSS triangle area', 'semiperimeter', 'area from sides'],
    memoryCard: {
      clozeLatex: 'A = \\sqrt{s(s - a)(s - b)(???)}',
      missingPart: '(s - c)',
      missingOptions: ['(s - c)', 's', '(a+b+c)', 's^2'],
      recallPrompt: 'What is the fourth factor inside the radical of Heron\'s formula?',
      identificationPrompt: "Formula for: Heron's Formula."
    }
  },
  {
    id: 'geom_coordinate_geometry',
    name: 'Coordinate Geometry (Distance, Midpoint, Slope & Section Formula)',
    subject: 'geometry',
    category: 'Advanced Geometry',
    topic: 'Analytic Geometry',
    difficulty: 'Intermediate',
    latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\quad M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right), \\quad m = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad P_{\\text{section}} = \\left(\\frac{mx_2 + nx_1}{m + n}, \\frac{my_2 + ny_1}{m + n}\\right)',
    variables: [
      { symbol: '(x_1, y_1), (x_2, y_2)', name: 'Endpoints', meaning: 'Cartesian coordinates of two points' },
      { symbol: 'd', name: 'Distance', meaning: 'Euclidean distance between points' },
      { symbol: 'M', name: 'Midpoint', meaning: 'Point exactly halfway along segment' },
      { symbol: 'm', name: 'Slope', meaning: 'Steepness and direction: rise over run' },
      { symbol: 'm:n', name: 'Ratio', meaning: 'Ratio dividing the internal line segment' }
    ],
    conditions: [
      'For slope, x_2 \\neq x_1 (vertical lines have undefined / infinite slope)',
      'Parallel lines: m_1 = m_2; Perpendicular lines: m_1 \\cdot m_2 = -1 (negative reciprocals)'
    ],
    whenToUse: 'Linear regressions, graphics rendering, computer vision, trajectory mapping.',
    workedExample: {
      problem: 'Find the coordinates of the point dividing the segment between A(1, 2) and B(6, 7) internally in ratio 2:3.',
      steps: [
        { stepNum: 1, instruction: 'Identify parameters: m = 2, n = 3, (x1, y1) = (1, 2), (x2, y2) = (6, 7)', mathLatex: 'm = 2, \\; n = 3' },
        { stepNum: 2, instruction: 'Calculate x coordinate: (mx2 + nx1)/(m + n)', mathLatex: 'x = \\frac{2(6) + 3(1)}{2 + 3} = \\frac{12 + 3}{5} = \\frac{15}{5} = 3' },
        { stepNum: 3, instruction: 'Calculate y coordinate: (my2 + ny1)/(m + n)', mathLatex: 'y = \\frac{2(7) + 3(2)}{2 + 3} = \\frac{14 + 6}{5} = \\frac{20}{5} = 4' }
      ],
      finalAnswer: '(3, 4)',
      finalAnswerLatex: '(3, 4)'
    },
    commonMistakes: [
      'Inverting the slope formula as dx/dy instead of dy/dx (run over rise instead of rise over run).',
      'Swapping the ratio weights m and n in the section formula.'
    ],
    relatedFormulaIds: ['geom_pythagorean_theorem', 'diff_tangent_normal_lines'],
    practiceQuestions: [
      {
        id: 'q_geom_21',
        question: 'What is the distance between points (1, 2) and (4, 6)?',
        options: ['5', '7', 'sqrt(7)', '25'],
        correctIndex: 0,
        explanation: 'd = sqrt((4-1)^2 + (6-2)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5.'
      }
    ],
    searchKeywords: ['distance formula', 'midpoint formula', 'slope', 'section formula', 'analytic geometry'],
    memoryCard: {
      clozeLatex: 'd = \\sqrt{(x_2 - x_1)^2 + ???}',
      missingPart: '(y_2 - y_1)^2',
      missingOptions: ['(y_2 - y_1)^2', '(y_2 - y_1)', '(y_2 + y_1)^2', 'y^2'],
      recallPrompt: 'What is added to (x2 - x1)^2 inside the distance formula square root?',
      identificationPrompt: 'Formula for: Distance Formula in 2D Plane.'
    }
  },
  {
    id: 'geom_triangle_centers_euler_line',
    name: 'Triangle Centers & Euler Line',
    subject: 'geometry',
    category: 'Advanced Geometry',
    topic: 'Triangle Centers',
    difficulty: 'Advanced',
    latex: 'G = \\frac{A+B+C}{3}, \\quad I = \\frac{aA+bB+cC}{a+b+c}, \\quad H - G = 2(G - O), \\quad HG = 2GO',
    variables: [
      { symbol: 'G', name: 'Centroid', meaning: 'Intersection of the 3 medians (divides each median 2:1 from vertex)' },
      { symbol: 'O', name: 'Circumcenter', meaning: 'Intersection of perpendicular bisectors (center of circumcircle)' },
      { symbol: 'H', name: 'Orthocenter', meaning: 'Intersection of altitudes' },
      { symbol: 'I', name: 'Incenter', meaning: 'Intersection of angle bisectors (center of incircle)' }
    ],
    conditions: [
      'For ANY non-equilateral triangle, O, G, and H are strictly COLLINEAR (Euler Line)!',
      'In an equilateral triangle, all 4 centers O, G, H, I coincide at the exact same point'
    ],
    whenToUse: 'Advanced Olympiad geometry, center of mass of triangular plates, geometric proofs.',
    workedExample: {
      problem: 'If the circumcenter O is at (0, 0) and the centroid G is at (2, 4), find the coordinates of the orthocenter H.',
      steps: [
        { stepNum: 1, instruction: 'Use Euler line vector relation: H - G = 2(G - O) => H = 3G - 2O', mathLatex: 'H = 3G - 2O' },
        { stepNum: 2, instruction: 'Substitute O = (0,0) and G = (2,4)', mathLatex: 'H = 3(2, 4) - 2(0, 0) = (6, 12)' }
      ],
      finalAnswer: 'H = (6, 12)',
      finalAnswerLatex: 'H = (6, 12)'
    },
    commonMistakes: [
      'Confusing the orthocenter (altitudes) with the circumcenter (perpendicular bisectors).',
      'Thinking the incenter I lies on the Euler line (in general it does NOT, only in isosceles triangles).'
    ],
    relatedFormulaIds: ['geom_heron_formula', 'geom_circle_theorems'],
    practiceQuestions: [
      {
        id: 'q_geom_22',
        question: 'In what ratio does the centroid G divide each median from the vertex to the opposite side?',
        options: ['2 : 1', '1 : 1', '3 : 1', '1 : 2'],
        correctIndex: 0,
        explanation: 'The centroid is located 2/3 of the distance along each median from vertex to midpoint, so ratio is 2:1.'
      }
    ],
    searchKeywords: ['centroid', 'incenter', 'circumcenter', 'orthocenter', 'Euler line', 'triangle centers'],
    memoryCard: {
      clozeLatex: 'HG = ??? \\times GO \\quad (\\text{Euler Line})',
      missingPart: '2',
      missingOptions: ['2', '3', '1/2', '1'],
      recallPrompt: 'What is the ratio HG : GO on the Euler Line connecting Orthocenter H, Centroid G, and Circumcenter O?',
      identificationPrompt: 'Formula for: Euler Line Collinearity and Ratio.'
    }
  },
  {
    id: 'geom_circle_theorems',
    name: 'Circle Theorems (Inscribed Angle & Power of a Point)',
    subject: 'geometry',
    category: 'Advanced Geometry',
    topic: 'Circle Theorems',
    difficulty: 'Advanced',
    latex: '\\angle BOC = 2\\angle BAC, \\quad PA \\cdot PB = PC \\cdot PD = PT^2, \\quad \\angle A + \\angle C = 180^\\circ \\; (\\text{Cyclic})',
    variables: [
      { symbol: '\\angle BOC', name: 'Central Angle', meaning: 'Angle subtended at center by arc' },
      { symbol: '\\angle BAC', name: 'Inscribed Angle', meaning: 'Angle subtended on circumference by same arc' },
      { symbol: 'PA, PB', name: 'Secant segments from P', meaning: 'Distances to intersection points on circle' },
      { symbol: 'PT', name: 'Tangent segment from P', meaning: 'Length of tangent from external point P to point of tangency T' }
    ],
    conditions: [
      'Thales theorem: An angle inscribed in a semicircle is ALWAYS a right angle (90 degrees)',
      'Cyclic quadrilateral: Opposite angles sum to 180 degrees (supplementary)',
      'Ptolemy\'s Theorem for cyclic quadrilaterals: ac + bd = d_1 * d_2'
    ],
    whenToUse: 'Olympiad circle geometry, calculating unknown chords/tangents, proving collinearity and concyclic points.',
    workedExample: {
      problem: 'From an external point P, a tangent PT of length 12 cm is drawn to a circle. A secant through P intersects the circle at A and B. If PA = 8 cm, find PB.',
      steps: [
        { stepNum: 1, instruction: 'Apply Power of a Point Theorem: PT^2 = PA * PB', mathLatex: '12^2 = 8 \\times PB' },
        { stepNum: 2, instruction: 'Solve for PB', mathLatex: '144 = 8 \\cdot PB \\implies PB = \\frac{144}{8} = 18\\text{ cm}' }
      ],
      finalAnswer: 'PB = 18 cm',
      finalAnswerLatex: 'PB = 18\\text{ cm}'
    },
    commonMistakes: [
      'Using the chord segment AB instead of the whole secant PB in PA * PB.',
      'Assuming inscribed angles on different arcs are equal.'
    ],
    relatedFormulaIds: ['olympiad_power_of_point', 'geom_circle'],
    practiceQuestions: [
      {
        id: 'q_geom_23',
        question: 'If an inscribed angle subtends an arc of 80 degrees, what is the measure of the inscribed angle?',
        options: ['40 degrees', '80 degrees', '160 degrees', '20 degrees'],
        correctIndex: 0,
        explanation: 'Inscribed angle is half the measure of the central angle/intercepted arc: 80 / 2 = 40 degrees.'
      }
    ],
    searchKeywords: ['inscribed angle theorem', 'central angle', 'power of a point', 'cyclic quadrilateral', 'Thales theorem'],
    memoryCard: {
      clozeLatex: 'PT^2 = PA \\times ???',
      missingPart: 'PB',
      missingOptions: ['PB', 'AB', 'PC', 'r^2'],
      recallPrompt: 'In the Tangent-Secant Theorem, what multiplies PA on the right-hand side?',
      identificationPrompt: 'Formula for: Power of a Point (Tangent-Secant Theorem).'
    }
  }
];
