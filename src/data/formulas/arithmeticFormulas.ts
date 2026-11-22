import { FormulaItem } from '../../types/formulas';

export const arithmeticFormulas: FormulaItem[] = [
  {
    id: 'arith_fraction_add_sub',
    name: 'Fraction Addition & Subtraction',
    subject: 'arithmetic',
    category: 'Fractions',
    topic: 'Fraction Operations',
    difficulty: 'Beginner',
    latex: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
    altLatex: '\\frac{a}{b} + \\frac{c}{b} = \\frac{a+c}{b}',
    variables: [
      { symbol: 'a, c', name: 'Numerators', meaning: 'Number of equal parts represented' },
      { symbol: 'b, d', name: 'Denominators', meaning: 'Total number of equal parts that make up a whole' }
    ],
    conditions: [
      'b \\neq 0 \\text{ and } d \\neq 0',
      'If denominators are equal, simply add or subtract the numerators: \\frac{a}{b} \\pm \\frac{c}{b} = \\frac{a \\pm c}{b}'
    ],
    whenToUse: 'Use when combining or taking the difference between parts of wholes that have unlike denominators.',
    derivation: 'Multiply the first fraction by d/d and the second fraction by b/b to obtain a common denominator bd: \\frac{a \\cdot d}{b \\cdot d} \\pm \\frac{c \\cdot b}{d \\cdot b} = \\frac{ad \\pm bc}{bd}.',
    workedExample: {
      problem: 'Compute \\frac{2}{3} + \\frac{4}{5}.',
      problemLatex: '\\frac{2}{3} + \\frac{4}{5}',
      steps: [
        { stepNum: 1, instruction: 'Cross-multiply numerators with denominators', mathLatex: 'ad = 2 \\times 5 = 10, \\quad bc = 4 \\times 3 = 12' },
        { stepNum: 2, instruction: 'Multiply the denominators', mathLatex: 'bd = 3 \\times 5 = 15' },
        { stepNum: 3, instruction: 'Combine numerators over the common denominator', mathLatex: '\\frac{10 + 12}{15} = \\frac{22}{15} = 1\\frac{7}{15}' }
      ],
      finalAnswer: '22/15 (or 1 7/15)',
      finalAnswerLatex: '\\frac{22}{15}'
    },
    commonMistakes: [
      'Adding numerators and denominators directly: (a+c)/(b+d) is completely FALSE.',
      'Forgetting to simplify the resulting fraction to lowest terms.'
    ],
    relatedFormulaIds: ['arith_fraction_mult_div', 'arith_ratio_proportion'],
    practiceQuestions: [
      {
        id: 'q_arith_1',
        question: 'What is the sum of 3/4 and 1/6 in simplest form?',
        questionLatex: '\\frac{3}{4} + \\frac{1}{6}',
        options: ['4/10', '11/12', '9/24', '7/12'],
        correctIndex: 1,
        explanation: 'LCD of 4 and 6 is 12. 3/4 = 9/12, 1/6 = 2/12. 9/12 + 2/12 = 11/12.'
      }
    ],
    searchKeywords: ['fraction addition', 'fraction subtraction', 'adding fractions', 'common denominator', 'LCD'],
    memoryCard: {
      clozeLatex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{???}{bd}',
      missingPart: 'ad + bc',
      missingOptions: ['ad + bc', 'a + c', 'ac + bd', 'ad - bc'],
      recallPrompt: 'State the rule for adding two fractions a/b + c/d with unlike denominators.',
      identificationPrompt: 'Formula for: Addition of fractions with unlike denominators.'
    }
  },
  {
    id: 'arith_fraction_mult_div',
    name: 'Fraction Multiplication & Division',
    subject: 'arithmetic',
    category: 'Fractions',
    topic: 'Fraction Operations',
    difficulty: 'Beginner',
    latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}, \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}',
    variables: [
      { symbol: 'a, b', name: 'First fraction parts', meaning: 'Numerator and denominator of the dividend' },
      { symbol: 'c, d', name: 'Second fraction parts', meaning: 'Numerator and denominator of the divisor' }
    ],
    conditions: [
      'b \\neq 0, d \\neq 0',
      'For division: c \\neq 0 as dividing by zero is undefined'
    ],
    whenToUse: 'Use multiplication when finding a fractional part of another fraction; use division when dividing by a fraction (multiply by reciprocal).',
    workedExample: {
      problem: 'Evaluate \\frac{3}{7} \\div \\frac{9}{14}.',
      problemLatex: '\\frac{3}{7} \\div \\frac{9}{14}',
      steps: [
        { stepNum: 1, instruction: 'Invert the second fraction to find the reciprocal', mathLatex: '\\text{Reciprocal of } \\frac{9}{14} = \\frac{14}{9}' },
        { stepNum: 2, instruction: 'Multiply the numerators and denominators', mathLatex: '\\frac{3 \\times 14}{7 \\times 9} = \\frac{42}{63}' },
        { stepNum: 3, instruction: 'Simplify by canceling common factor 21', mathLatex: '\\frac{42 \\div 21}{63 \\div 21} = \\frac{2}{3}' }
      ],
      finalAnswer: '2/3',
      finalAnswerLatex: '\\frac{2}{3}'
    },
    commonMistakes: [
      'Inverting the first fraction instead of the divisor (second fraction).',
      'Cross multiplying when multiplying fractions instead of directly across.'
    ],
    relatedFormulaIds: ['arith_fraction_add_sub'],
    practiceQuestions: [
      {
        id: 'q_arith_2',
        question: 'What is (5/8) * (4/15) in lowest terms?',
        options: ['1/6', '20/120', '1/3', '5/24'],
        correctIndex: 0,
        explanation: '(5 * 4) / (8 * 15) = 20 / 120 = 1/6.'
      }
    ],
    searchKeywords: ['fraction multiplication', 'fraction division', 'multiplying fractions', 'reciprocal'],
    memoryCard: {
      clozeLatex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times ???',
      missingPart: '\\frac{d}{c}',
      missingOptions: ['\\frac{d}{c}', '\\frac{c}{d}', '\\frac{b}{a}', '\\frac{bd}{ac}'],
      recallPrompt: 'How do you divide two fractions?',
      identificationPrompt: 'Formula for: Division of fractions via reciprocal multiplication.'
    }
  },
  {
    id: 'arith_percentage_change',
    name: 'Percentage Formulas & Percent Change',
    subject: 'arithmetic',
    category: 'Percentages',
    topic: 'Percentages',
    difficulty: 'Beginner',
    latex: '\\% = \\frac{\\text{Part}}{\\text{Whole}} \\times 100\\%, \\quad \\%\\Delta = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%',
    variables: [
      { symbol: '\\text{Part}', name: 'Component value', meaning: 'The portion being measured' },
      { symbol: '\\text{Whole}', name: 'Base value', meaning: 'The total reference quantity' },
      { symbol: '\\%\\Delta', name: 'Percentage change', meaning: 'Positive indicates increase, negative indicates decrease' }
    ],
    conditions: [
      '\\text{Whole} \\neq 0 \\text{ and } \\text{Old} \\neq 0',
      'Relative error = |\\text{Measured} - \\text{True}| / \\text{True} \\times 100\\%'
    ],
    whenToUse: 'Use to calculate relative proportions, price markups, discounts, growth rates, and measurement errors.',
    workedExample: {
      problem: 'An item priced at $80 increases to $100. Find the percentage increase.',
      steps: [
        { stepNum: 1, instruction: 'Calculate the absolute change', mathLatex: '\\Delta = 100 - 80 = 20' },
        { stepNum: 2, instruction: 'Divide by the original value (not the new value)', mathLatex: '\\frac{20}{80} = 0.25' },
        { stepNum: 3, instruction: 'Convert to percentage', mathLatex: '0.25 \\times 100\\% = 25\\%' }
      ],
      finalAnswer: '25% increase',
      finalAnswerLatex: '25\\%'
    },
    commonMistakes: [
      'Dividing by the new value instead of the original (old) value.',
      'Confusing percentage points with percentage change.'
    ],
    relatedFormulaIds: ['arith_profit_loss', 'arith_simple_compound_interest'],
    practiceQuestions: [
      {
        id: 'q_arith_3',
        question: 'If stock falls from $50 to $40, what is the percent decrease?',
        options: ['20%', '25%', '10%', '15%'],
        correctIndex: 0,
        explanation: 'Decrease = (50 - 40) / 50 * 100% = 10 / 50 * 100% = 20%.'
      }
    ],
    searchKeywords: ['percentage', 'percent increase', 'percent decrease', 'percent change', 'percentage error'],
    memoryCard: {
      clozeLatex: '\\%\\text{ Change} = \\frac{\\text{New} - \\text{Old}}{???} \\times 100\\%',
      missingPart: '\\text{Old}',
      missingOptions: ['\\text{Old}', '\\text{New}', '\\text{New} + \\text{Old}', '100'],
      recallPrompt: 'What is the denominator when calculating percent increase or decrease?',
      identificationPrompt: 'Formula for: Percentage Change.'
    }
  },
  {
    id: 'arith_ratio_proportion',
    name: 'Ratio and Proportion',
    subject: 'arithmetic',
    category: 'Ratios',
    topic: 'Ratio and Proportion',
    difficulty: 'Beginner',
    latex: '\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc, \\quad \\text{Direct: } y = kx, \\quad \\text{Inverse: } y = \\frac{k}{x}',
    variables: [
      { symbol: 'a, b, c, d', name: 'Terms of proportion', meaning: 'a and d are extremes, b and c are means' },
      { symbol: 'k', name: 'Constant of proportionality', meaning: 'The constant ratio between variables' }
    ],
    conditions: [
      'b \\neq 0, d \\neq 0, x \\neq 0',
      'For continued ratio a:b:c, each part represents a/(a+b+c) of the total.'
    ],
    whenToUse: 'Use when scaling recipes, models, maps, gear ratios, or solving inverse worker-time problems.',
    workedExample: {
      problem: 'Solve for x: \\frac{3}{8} = \\frac{x}{24}.',
      steps: [
        { stepNum: 1, instruction: 'Cross-multiply extremes and means', mathLatex: '3 \\times 24 = 8 \\times x' },
        { stepNum: 2, instruction: 'Simplify the left side', mathLatex: '72 = 8x' },
        { stepNum: 3, instruction: 'Solve for x', mathLatex: 'x = \\frac{72}{8} = 9' }
      ],
      finalAnswer: 'x = 9',
      finalAnswerLatex: 'x = 9'
    },
    commonMistakes: [
      'Applying direct proportionality when a situation is inversely proportional (e.g. more workers take less time).',
      'Inverting terms when cross-multiplying.'
    ],
    relatedFormulaIds: ['arith_speed_distance_time'],
    practiceQuestions: [
      {
        id: 'q_arith_4',
        question: 'If 4 machines produce 120 widgets, how many widgets do 7 machines produce at the same rate?',
        options: ['210', '190', '240', '280'],
        correctIndex: 0,
        explanation: 'Rate per machine = 120 / 4 = 30 widgets. 7 * 30 = 210 widgets.'
      }
    ],
    searchKeywords: ['ratio', 'proportion', 'direct proportion', 'inverse proportion', 'cross multiplication'],
    memoryCard: {
      clozeLatex: '\\frac{a}{b} = \\frac{c}{d} \\iff ??? = bc',
      missingPart: 'ad',
      missingOptions: ['ad', 'ab', 'cd', 'a+d'],
      recallPrompt: 'What is the cross-product equality for a/b = c/d?',
      identificationPrompt: 'Formula for: Means and Extremes Property of Proportion.'
    }
  },
  {
    id: 'arith_average_weighted',
    name: 'Arithmetic Mean & Weighted Average',
    subject: 'arithmetic',
    category: 'Statistics & Averages',
    topic: 'Averages',
    difficulty: 'Beginner',
    latex: '\\bar{x} = \\frac{\\sum_{i=1}^n x_i}{n}, \\quad \\bar{x}_w = \\frac{\\sum_{i=1}^n w_i x_i}{\\sum_{i=1}^n w_i}',
    variables: [
      { symbol: '\\bar{x}', name: 'Arithmetic mean', meaning: 'Sum of all values divided by count' },
      { symbol: 'x_i', name: 'Individual values', meaning: 'The data points' },
      { symbol: 'w_i', name: 'Weights', meaning: 'Relative importance or frequency of each data point' },
      { symbol: 'n', name: 'Sample size', meaning: 'Total count of observations' }
    ],
    conditions: [
      'n > 0',
      '\\sum w_i > 0'
    ],
    whenToUse: 'Use arithmetic mean when all entries count equally; use weighted average for course grades, portfolio returns, or center of mass.',
    workedExample: {
      problem: 'A student scores 80 on homework (weight 20%), 70 on midterm (weight 30%), and 90 on final exam (weight 50%). Find the weighted average.',
      steps: [
        { stepNum: 1, instruction: 'Multiply each score by its corresponding weight', mathLatex: '80(0.20) + 70(0.30) + 90(0.50)' },
        { stepNum: 2, instruction: 'Sum the weighted terms', mathLatex: '16 + 21 + 45 = 82' },
        { stepNum: 3, instruction: 'Divide by sum of weights (0.20 + 0.30 + 0.50 = 1.00)', mathLatex: '\\frac{82}{1.00} = 82' }
      ],
      finalAnswer: '82',
      finalAnswerLatex: '82'
    },
    commonMistakes: [
      'Taking a simple average of percentages when the underlying sample sizes or weights differ.',
      'Forgetting to divide by the total sum of the weights.'
    ],
    relatedFormulaIds: ['adv_expected_value_variance'],
    practiceQuestions: [
      {
        id: 'q_arith_5',
        question: 'What is the weighted average of test 1 (score 60, weight 1) and test 2 (score 90, weight 2)?',
        options: ['75', '80', '85', '70'],
        correctIndex: 1,
        explanation: '(60*1 + 90*2) / (1 + 2) = (60 + 180) / 3 = 240 / 3 = 80.'
      }
    ],
    searchKeywords: ['average', 'mean', 'weighted average', 'arithmetic mean', 'grade calculation'],
    memoryCard: {
      clozeLatex: '\\bar{x}_w = \\frac{\\sum w_i x_i}{???}',
      missingPart: '\\sum w_i',
      missingOptions: ['\\sum w_i', 'n', '\\bar{x}', '\\sum x_i'],
      recallPrompt: 'What goes in the denominator of the weighted average formula?',
      identificationPrompt: 'Formula for: Weighted Arithmetic Average.'
    }
  },
  {
    id: 'arith_speed_distance_time',
    name: 'Speed, Distance, Time & Harmonic Average Speed',
    subject: 'arithmetic',
    category: 'Kinematics',
    topic: 'Speed & Motion',
    difficulty: 'Beginner',
    latex: 's = \\frac{d}{t}, \\quad d = s \\cdot t, \\quad t = \\frac{d}{s}, \\quad v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2}',
    variables: [
      { symbol: 's, v', name: 'Speed / Velocity', meaning: 'Rate of travel (e.g. km/h, m/s)' },
      { symbol: 'd', name: 'Distance', meaning: 'Total length traversed' },
      { symbol: 't', name: 'Time', meaning: 'Duration of journey' },
      { symbol: 'v_{\\text{avg}}', name: 'Average speed for equal distance legs', meaning: 'Harmonic mean of the two speeds' }
    ],
    conditions: [
      't > 0, s > 0',
      'The harmonic formula v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2} applies ONLY when distances of both legs are EQUAL (e.g., round trip).'
    ],
    whenToUse: 'Use for uniform motion problems, round trips, pursuit problems, and unit conversions.',
    workedExample: {
      problem: 'A car drives to a town at 60 mph and returns along the same route at 40 mph. What is the average speed for the round trip?',
      steps: [
        { stepNum: 1, instruction: 'Notice distance is equal in both directions; use harmonic average speed', mathLatex: 'v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2}' },
        { stepNum: 2, instruction: 'Substitute v_1 = 60 and v_2 = 40', mathLatex: 'v_{\\text{avg}} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100}' },
        { stepNum: 3, instruction: 'Compute the result', mathLatex: '48 \\text{ mph}' }
      ],
      finalAnswer: '48 mph',
      finalAnswerLatex: '48 \\text{ mph}'
    },
    commonMistakes: [
      'Averaging (60 + 40)/2 = 50 mph! This is a classic trap because more time is spent driving at the slower speed.',
      'Mismatched units (e.g., combining miles per hour with seconds without converting).'
    ],
    relatedFormulaIds: ['arith_ratio_proportion'],
    practiceQuestions: [
      {
        id: 'q_arith_6',
        question: 'If you travel 150 km in 2.5 hours, what is your constant speed?',
        options: ['50 km/h', '60 km/h', '65 km/h', '75 km/h'],
        correctIndex: 1,
        explanation: 's = d / t = 150 / 2.5 = 60 km/h.'
      }
    ],
    searchKeywords: ['speed distance time', 'average speed', 'harmonic mean', 'rate time distance', 'round trip speed'],
    memoryCard: {
      clozeLatex: 'v_{\\text{round trip}} = \\frac{2 v_1 v_2}{???}',
      missingPart: 'v_1 + v_2',
      missingOptions: ['v_1 + v_2', '2', 'v_1 - v_2', 'v_1 \\cdot v_2'],
      recallPrompt: 'What is the average speed formula for equal distance outbound and return at speeds v1 and v2?',
      identificationPrompt: 'Formula for: Round-Trip Average Speed (Harmonic Mean).'
    }
  },
  {
    id: 'arith_profit_loss',
    name: 'Profit and Loss Formulas',
    subject: 'arithmetic',
    category: 'Commercial Math',
    topic: 'Financial Arithmetic',
    difficulty: 'Beginner',
    latex: 'P = SP - CP, \\quad L = CP - SP, \\quad \\%P = \\frac{P}{CP} \\times 100\\%, \\quad \\%L = \\frac{L}{CP} \\times 100\\%',
    variables: [
      { symbol: 'CP', name: 'Cost Price', meaning: 'The purchase or manufacturing price of the good' },
      { symbol: 'SP', name: 'Selling Price', meaning: 'The price at which the good is sold' },
      { symbol: 'P, L', name: 'Profit / Loss', meaning: 'Absolute monetary gain or deficit' },
      { symbol: '\\%P, \\%L', name: 'Profit / Loss Percentage', meaning: 'Percentage gain or loss calculated always relative to Cost Price' }
    ],
    conditions: [
      'CP > 0',
      'SP = CP \\times (1 + \\frac{\\%P}{100}) \\quad \\text{or} \\quad CP \\times (1 - \\frac{\\%L}{100})'
    ],
    whenToUse: 'Commercial transactions, retail pricing, markups, discounts, and inventory valuation.',
    workedExample: {
      problem: 'A merchant buys an antique chair for $150 and sells it for $195. Find the profit percentage.',
      steps: [
        { stepNum: 1, instruction: 'Calculate the absolute profit', mathLatex: 'P = SP - CP = 195 - 150 = 45' },
        { stepNum: 2, instruction: 'Compute percentage relative to Cost Price CP', mathLatex: '\\%P = \\frac{45}{150} \\times 100\\%' },
        { stepNum: 3, instruction: 'Simplify the fraction', mathLatex: '\\frac{3}{10} \\times 100\\% = 30\\%' }
      ],
      finalAnswer: '30%',
      finalAnswerLatex: '30\\%'
    },
    commonMistakes: [
      'Calculating profit percentage based on the Selling Price (SP) instead of Cost Price (CP).',
      'Confusing profit margin (P/SP) with markup percentage (P/CP).'
    ],
    relatedFormulaIds: ['arith_percentage_change', 'arith_simple_compound_interest'],
    practiceQuestions: [
      {
        id: 'q_arith_7',
        question: 'An item with cost price $80 is sold at a 15% loss. What is the selling price?',
        options: ['$68', '$72', '$65', '$70'],
        correctIndex: 0,
        explanation: 'Loss = 80 * 0.15 = $12. Selling price = 80 - 12 = $68.'
      }
    ],
    searchKeywords: ['profit and loss', 'cost price', 'selling price', 'markup', 'margin'],
    memoryCard: {
      clozeLatex: '\\%\\text{Profit} = \\frac{SP - CP}{???} \\times 100\\%',
      missingPart: 'CP',
      missingOptions: ['CP', 'SP', 'SP + CP', '100'],
      recallPrompt: 'What value is in the denominator when calculating profit percentage?',
      identificationPrompt: 'Formula for: Profit Percentage.'
    }
  },
  {
    id: 'arith_simple_compound_interest',
    name: 'Simple and Compound Interest',
    subject: 'arithmetic',
    category: 'Commercial Math',
    topic: 'Interest & Compounding',
    difficulty: 'Intermediate',
    latex: 'SI = \\frac{P \\cdot r \\cdot t}{100}, \\quad A = P\\left(1 + \\frac{r}{n}\\right)^{nt}, \\quad A_{\\text{continuous}} = P e^{rt}',
    variables: [
      { symbol: 'P', name: 'Principal', meaning: 'Initial amount invested or borrowed' },
      { symbol: 'r', name: 'Annual interest rate', meaning: 'Decimal rate (or percent if divided by 100)' },
      { symbol: 't', name: 'Time', meaning: 'Period in years' },
      { symbol: 'n', name: 'Compounding frequency', meaning: 'Times compounded per year (e.g. 12 for monthly, 365 for daily)' },
      { symbol: 'A', name: 'Total accrued amount', meaning: 'Principal plus accumulated interest' }
    ],
    conditions: [
      'P > 0, r > 0, t \\ge 0, n \\ge 1',
      'For continuous compounding, take limit as n \\to \\infty: \\lim_{n\\to\\infty} (1 + r/n)^{nt} = e^{rt}'
    ],
    whenToUse: 'Banking, mortgage loans, bonds, savings accounts, and investment returns over time.',
    workedExample: {
      problem: '$1,000 is invested at 5% annual interest compounded quarterly for 2 years. Find total amount A.',
      steps: [
        { stepNum: 1, instruction: 'Identify parameters', mathLatex: 'P = 1000, \\quad r = 0.05, \\quad n = 4, \\quad t = 2' },
        { stepNum: 2, instruction: 'Set up formula', mathLatex: 'A = 1000\\left(1 + \\frac{0.05}{4}\\right)^{4 \\times 2} = 1000(1 + 0.0125)^8' },
        { stepNum: 3, instruction: 'Evaluate', mathLatex: 'A = 1000(1.0125)^8 \\approx 1000(1.104486) = \\$1,104.49' }
      ],
      finalAnswer: '$1,104.49',
      finalAnswerLatex: '\\$1,104.49'
    },
    commonMistakes: [
      'Using the annual rate without dividing by compounding frequency n.',
      'Confusing the total accumulated amount A with just the compound interest CI = A - P.'
    ],
    relatedFormulaIds: ['alg_geometric_series', 'diff_exponential'],
    practiceQuestions: [
      {
        id: 'q_arith_8',
        question: 'What is the simple interest on $500 at 6% per annum for 3 years?',
        options: ['$90', '$60', '$120', '$80'],
        correctIndex: 0,
        explanation: 'SI = (500 * 6 * 3) / 100 = 9000 / 100 = $90.'
      }
    ],
    searchKeywords: ['compound interest', 'simple interest', 'continuous compounding', 'principal', 'annual percentage rate'],
    memoryCard: {
      clozeLatex: 'A = P\\left(1 + \\frac{r}{n}\\right)^{???}',
      missingPart: 'nt',
      missingOptions: ['nt', 'n+t', 't/n', 'n'],
      recallPrompt: 'What is the exponent in the periodic compound interest formula?',
      identificationPrompt: 'Formula for: Periodic Compound Interest.'
    }
  },
  {
    id: 'arith_exponents_radicals',
    name: 'Exponents and Radicals',
    subject: 'arithmetic',
    category: 'Exponents',
    topic: 'Powers and Roots',
    difficulty: 'Beginner',
    latex: 'a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}, \\quad a^{m/n} = \\sqrt[n]{a^m}',
    variables: [
      { symbol: 'a', name: 'Base', meaning: 'The number being repeatedly multiplied' },
      { symbol: 'm, n', name: 'Exponents / Indices', meaning: 'The power or root order' }
    ],
    conditions: [
      'a \\neq 0 \\text{ for negative exponents and } a^0 = 1',
      'For even n, a must be \\ge 0 in real arithmetic'
    ],
    whenToUse: 'Simplifying algebraic expressions, scientific equations, and polynomial terms.',
    workedExample: {
      problem: 'Simplify \\frac{(2^3)^4 \\cdot 2^{-5}}{2^2}.',
      steps: [
        { stepNum: 1, instruction: 'Apply power of a power', mathLatex: '(2^3)^4 = 2^{3 \\times 4} = 2^{12}' },
        { stepNum: 2, instruction: 'Combine numerator powers', mathLatex: '2^{12} \\cdot 2^{-5} = 2^{12 + (-5)} = 2^7' },
        { stepNum: 3, instruction: 'Divide by denominator', mathLatex: '\\frac{2^7}{2^2} = 2^{7-2} = 2^5 = 32' }
      ],
      finalAnswer: '32',
      finalAnswerLatex: '32'
    },
    commonMistakes: [
      'Multiplying bases when exponents match instead of adding exponents when bases match.',
      'Assuming -x^2 is (-x)^2; note that -3^2 = -9 while (-3)^2 = 9.'
    ],
    relatedFormulaIds: ['alg_laws_of_exponents', 'arith_scientific_notation'],
    practiceQuestions: [
      {
        id: 'q_arith_9',
        question: 'What is 8^(2/3)?',
        options: ['4', '16', '2', '6'],
        correctIndex: 0,
        explanation: '8^(2/3) = (cbrt(8))^2 = 2^2 = 4.'
      }
    ],
    searchKeywords: ['exponents', 'radicals', 'fractional exponents', 'laws of powers', 'roots'],
    memoryCard: {
      clozeLatex: 'a^{m/n} = ???',
      missingPart: '\\sqrt[n]{a^m}',
      missingOptions: ['\\sqrt[n]{a^m}', '\\sqrt[m]{a^n}', '\\frac{a^m}{n}', 'm\\sqrt{a}'],
      recallPrompt: 'Express fractional exponent a^(m/n) in radical form.',
      identificationPrompt: 'Formula for: Rational Exponent to Radical Conversion.'
    }
  },
  {
    id: 'arith_gcd_lcm',
    name: 'GCD and LCM Fundamental Relation',
    subject: 'arithmetic',
    category: 'Number Theory',
    topic: 'GCD & LCM',
    difficulty: 'Intermediate',
    latex: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b)',
    variables: [
      { symbol: 'a, b', name: 'Positive integers', meaning: 'The numbers whose divisors/multiples are studied' },
      { symbol: '\\gcd(a, b)', name: 'Greatest Common Divisor', meaning: 'Largest integer dividing both a and b' },
      { symbol: '\\operatorname{lcm}(a, b)', name: 'Least Common Multiple', meaning: 'Smallest positive integer divisible by both a and b' }
    ],
    conditions: [
      'a, b \\in \\mathbb{Z}^+',
      'Calculated via Euclidean Algorithm: \\gcd(a, b) = \\gcd(b, a \\pmod b)'
    ],
    whenToUse: 'Fraction addition (LCD), modular arithmetic, periodicity synchronization, and solving Diophantine equations.',
    workedExample: {
      problem: 'Find the LCM of 24 and 36 if their GCD is 12.',
      steps: [
        { stepNum: 1, instruction: 'Use the product theorem', mathLatex: 'a \\cdot b = \\gcd(a,b) \\cdot \\operatorname{lcm}(a,b)' },
        { stepNum: 2, instruction: 'Substitute values', mathLatex: '24 \\times 36 = 12 \\times \\operatorname{lcm}(24, 36)' },
        { stepNum: 3, instruction: 'Solve for LCM', mathLatex: '\\operatorname{lcm}(24, 36) = \\frac{24 \\times 36}{12} = 2 \\times 36 = 72' }
      ],
      finalAnswer: '72',
      finalAnswerLatex: '72'
    },
    commonMistakes: [
      'Extending this two-number formula directly to three numbers (a*b*c != gcd*lcm for 3 numbers).',
      'Confusing the divisor with the multiple.'
    ],
    relatedFormulaIds: ['olympiad_bezout_identity', 'olympiad_crt'],
    practiceQuestions: [
      {
        id: 'q_arith_10',
        question: 'If gcd(x, 15) = 3 and lcm(x, 15) = 60, what is x?',
        options: ['12', '20', '18', '24'],
        correctIndex: 0,
        explanation: 'x * 15 = 3 * 60 = 180 => x = 180 / 15 = 12.'
      }
    ],
    searchKeywords: ['GCD', 'LCM', 'Euclidean algorithm', 'greatest common divisor', 'least common multiple'],
    memoryCard: {
      clozeLatex: 'a \\times b = \\gcd(a, b) \\times ???',
      missingPart: '\\operatorname{lcm}(a, b)',
      missingOptions: ['\\operatorname{lcm}(a, b)', '(a+b)', '\\frac{a}{b}', '1'],
      recallPrompt: 'What is the product of gcd(a,b) and lcm(a,b)?',
      identificationPrompt: 'Formula for: Product Identity of GCD and LCM.'
    }
  },
  {
    id: 'arith_scientific_notation',
    name: 'Scientific Notation',
    subject: 'arithmetic',
    category: 'Exponents',
    topic: 'Scientific Notation',
    difficulty: 'Beginner',
    latex: 'N = a \\times 10^b, \\quad 1 \\le |a| < 10, \\quad b \\in \\mathbb{Z}',
    variables: [
      { symbol: 'a', name: 'Significand (Mantissa)', meaning: 'A real number with magnitude between 1 and 10' },
      { symbol: 'b', name: 'Order of magnitude', meaning: 'Integer exponent representing decimal shift' }
    ],
    conditions: [
      '1 \\le |a| < 10',
      'Multiplication: (a \\times 10^b)(c \\times 10^d) = (ac) \\times 10^{b+d}'
    ],
    whenToUse: 'Expressing astronomical distances, atomic dimensions, physics constants, and reducing rounding errors.',
    workedExample: {
      problem: 'Multiply (3.0 \\times 10^4) \\times (4.0 \\times 10^5) and write in standard scientific notation.',
      steps: [
        { stepNum: 1, instruction: 'Multiply significands', mathLatex: '3.0 \\times 4.0 = 12.0' },
        { stepNum: 2, instruction: 'Add the powers of ten', mathLatex: '10^4 \\times 10^5 = 10^{4+5} = 10^9' },
        { stepNum: 3, instruction: 'Normalize so 1 <= a < 10', mathLatex: '12.0 \\times 10^9 = (1.2 \\times 10^1) \\times 10^9 = 1.2 \\times 10^{10}' }
      ],
      finalAnswer: '1.2 * 10^10',
      finalAnswerLatex: '1.2 \\times 10^{10}'
    },
    commonMistakes: [
      'Leaving the coefficient greater than or equal to 10 (e.g. 15 * 10^3 instead of 1.5 * 10^4).',
      'Miscounting negative signs for numbers smaller than 1.'
    ],
    relatedFormulaIds: ['arith_exponents_radicals'],
    practiceQuestions: [
      {
        id: 'q_arith_11',
        question: 'Express 0.00045 in scientific notation.',
        options: ['4.5 * 10^-4', '45 * 10^-5', '4.5 * 10^-3', '0.45 * 10^-3'],
        correctIndex: 0,
        explanation: 'Move decimal 4 places right gives 4.5 * 10^-4.'
      }
    ],
    searchKeywords: ['scientific notation', 'standard form', 'powers of 10', 'orders of magnitude'],
    memoryCard: {
      clozeLatex: 'N = a \\times 10^b \\quad \\text{where } ??? \\le |a| < 10',
      missingPart: '1',
      missingOptions: ['1', '0', '0.1', '10'],
      recallPrompt: 'What is the lower bound for the absolute value of the mantissa a in scientific notation?',
      identificationPrompt: 'Formula for: Standard Scientific Notation Constraint.'
    }
  }
];
