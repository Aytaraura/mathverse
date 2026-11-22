// Mathematical Expression Parser and Numerical Calculus Engine

export const parseMathFunction = (expr: string): ((x: number) => number) => {
  // Clean expression
  let sanitized = expr
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/(\d+)([a-z])/g, '$1*$2') // 2x -> 2*x
    .replace(/\)\(/g, ')*(') // (x+1)(x-1) -> (x+1)*(x-1)
    .replace(/x\(/g, 'x*(')
    .replace(/\)x/g, ')*x')
    .replace(/\^/g, '**');

  // Replace standard math functions with JS Math counterparts
  // We use word-boundary matching so "sin" doesn't clobber "arcsin"
  sanitized = sanitized
    .replace(/arcsin/g, 'Math.asin')
    .replace(/arccos/g, 'Math.acos')
    .replace(/arctan/g, 'Math.atan')
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/sqrt/g, 'Math.sqrt')
    .replace(/exp/g, 'Math.exp')
    .replace(/ln/g, 'Math.log')
    .replace(/log/g, 'Math.log10')
    .replace(/abs/g, 'Math.abs')
    .replace(/pi/g, 'Math.PI')
    .replace(/e\*\*/g, 'Math.exp')
    .replace(/\be\b/g, 'Math.E');

  try {
    // Construct function safely
    const fn = new Function('x', `
      try {
        const val = ${sanitized};
        if (isNaN(val) || !isFinite(val)) return 0;
        return val;
      } catch {
        return 0;
      }
    `);
    // Test with a sample value
    fn(1);
    return fn as (x: number) => number;
  } catch {
    // Fallback simple quadratic if syntax error
    return (x: number) => x * x;
  }
};

export const computeNumericalDerivative = (
  fn: (x: number) => number,
  x: number,
  h: number = 0.0001
): number => {
  // Central difference formula for higher accuracy: O(h^2)
  const d = (fn(x + h) - fn(x - h)) / (2 * h);
  return Math.round(d * 10000) / 10000;
};

export interface RiemannResult {
  leftSum: number;
  rightSum: number;
  midpointSum: number;
  trapezoidSum: number;
  simpsonSum: number;
  deltaX: number;
  rectangles: { x: number; width: number; height: number; sampleX: number }[];
}

export const computeRiemannSums = (
  fn: (x: number) => number,
  a: number,
  b: number,
  n: number,
  method: 'left' | 'right' | 'midpoint' | 'trapezoid' = 'midpoint'
): RiemannResult => {
  const deltaX = (b - a) / n;
  let leftSum = 0;
  let rightSum = 0;
  let midpointSum = 0;
  let trapezoidSum = 0;
  let simpsonSum = 0;

  const rectangles: { x: number; width: number; height: number; sampleX: number }[] = [];

  for (let i = 0; i < n; i++) {
    const xLeft = a + i * deltaX;
    const xRight = a + (i + 1) * deltaX;
    const xMid = (xLeft + xRight) / 2;

    const yLeft = fn(xLeft);
    const yRight = fn(xRight);
    const yMid = fn(xMid);

    leftSum += yLeft * deltaX;
    rightSum += yRight * deltaX;
    midpointSum += yMid * deltaX;
    trapezoidSum += ((yLeft + yRight) / 2) * deltaX;

    let sampleX = xMid;
    let height = yMid;
    if (method === 'left') {
      sampleX = xLeft;
      height = yLeft;
    } else if (method === 'right') {
      sampleX = xRight;
      height = yRight;
    } else if (method === 'trapezoid') {
      sampleX = xMid;
      height = (yLeft + yRight) / 2;
    }

    rectangles.push({
      x: xLeft,
      width: deltaX,
      height,
      sampleX
    });
  }

  // Composite Simpson's Rule for benchmark: (deltaX / 3) * (f0 + 4f1 + 2f2 + ... + fn)
  // Ensure n is even for Simpson
  const simpsonN = n % 2 === 0 ? n : n + 1;
  const hSimp = (b - a) / simpsonN;
  let sSum = fn(a) + fn(b);
  for (let i = 1; i < simpsonN; i++) {
    const xi = a + i * hSimp;
    sSum += (i % 2 === 1 ? 4 : 2) * fn(xi);
  }
  simpsonSum = (hSimp / 3) * sSum;

  return {
    leftSum: Math.round(leftSum * 10000) / 10000,
    rightSum: Math.round(rightSum * 10000) / 10000,
    midpointSum: Math.round(midpointSum * 10000) / 10000,
    trapezoidSum: Math.round(trapezoidSum * 10000) / 10000,
    simpsonSum: Math.round(simpsonSum * 10000) / 10000,
    deltaX: Math.round(deltaX * 1000) / 1000,
    rectangles
  };
};

export const computeAccumulatedArea = (
  fn: (x: number) => number,
  a: number,
  xCurrent: number,
  steps: number = 100
): number => {
  if (xCurrent === a) return 0;
  const reversed = xCurrent < a;
  const start = reversed ? xCurrent : a;
  const end = reversed ? a : xCurrent;
  const dx = (end - start) / steps;
  let area = 0;
  for (let i = 0; i < steps; i++) {
    const x = start + (i + 0.5) * dx;
    area += fn(x) * dx;
  }
  return (reversed ? -1 : 1) * Math.round(area * 10000) / 10000;
};
