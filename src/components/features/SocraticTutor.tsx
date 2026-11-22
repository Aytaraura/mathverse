import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../services/audio';
import { MathView } from '../common/MathView';
import {
  Bot, Send, Sparkles, BookOpen, Calculator, Sigma, Triangle,
  RefreshCw, Lightbulb, ChevronRight, Star, Zap, Hash
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  latex?: string;
  steps?: { label: string; latex: string }[];
  tip?: string;
  timestamp: Date;
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
interface KBEntry {
  keywords: string[];
  respond: (q: string) => { text: string; latex?: string; steps?: { label: string; latex: string }[]; tip?: string };
}

const KB: KBEntry[] = [
  // ── LIMITS ──
  {
    keywords: ['limit', 'lim', 'approach', 'tends'],
    respond: () => ({
      text: 'A **limit** describes the value a function approaches as its input approaches a certain point. We write lim(x→a) f(x) = L if f(x) gets arbitrarily close to L when x is near a.',
      latex: '\\lim_{x \\to a} f(x) = L',
      steps: [
        { label: 'Direct substitution (try first)', latex: '\\lim_{x \\to 2}(x^2+1) = 2^2+1 = 5' },
        { label: 'Factor & cancel if 0/0', latex: '\\lim_{x \\to 1}\\frac{x^2-1}{x-1} = \\lim_{x \\to 1}(x+1) = 2' },
        { label: "L'Hôpital's Rule for 0/0 or ∞/∞", latex: '\\lim_{x\\to 0}\\frac{\\sin x}{x} = \\lim_{x\\to 0}\\frac{\\cos x}{1} = 1' }
      ],
      tip: 'Always try direct substitution first. If you get 0/0 or ∞/∞, that\'s an indeterminate form — factor, rationalize, or use L\'Hôpital\'s Rule.'
    })
  },
  {
    keywords: ["l'hopital", "l'hôpital", 'hopital', 'hopitals', 'indeterminate'],
    respond: () => ({
      text: "**L'Hôpital's Rule** says: if lim f(x)/g(x) gives 0/0 or ∞/∞, differentiate numerator and denominator separately, then take the limit again.",
      latex: "\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}",
      steps: [
        { label: 'Confirm indeterminate form', latex: '\\lim_{x\\to 0}\\frac{\\sin x}{x} \\Rightarrow \\frac{0}{0}' },
        { label: 'Differentiate top and bottom', latex: '\\frac{d}{dx}\\sin x = \\cos x,\\quad \\frac{d}{dx}x = 1' },
        { label: 'Take the new limit', latex: '\\lim_{x\\to 0}\\frac{\\cos x}{1} = 1' }
      ],
      tip: "Only apply L'Hôpital's when you have 0/0 or ∞/∞. Other forms need to be rewritten first."
    })
  },
  // ── CONTINUITY ──
  {
    keywords: ['continuity', 'continuous', 'discontinuity', 'discontinuous'],
    respond: () => ({
      text: 'A function f is **continuous at x = a** if three conditions hold: f(a) is defined, the limit exists, and the limit equals f(a).',
      latex: '\\lim_{x\\to a}f(x) = f(a)',
      steps: [
        { label: '1. f(a) must be defined', latex: 'f(a) \\in \\mathbb{R}' },
        { label: '2. The limit must exist', latex: '\\lim_{x\\to a^-}f(x) = \\lim_{x\\to a^+}f(x)' },
        { label: '3. Limit must equal f(a)', latex: '\\lim_{x\\to a}f(x) = f(a)' }
      ],
      tip: 'Types of discontinuities: removable (hole), jump, and infinite (vertical asymptote).'
    })
  },
  // ── DERIVATIVES ──
  {
    keywords: ['derivative', 'differentiate', 'differentiation', 'diff', 'rate of change', 'slope'],
    respond: () => ({
      text: 'The **derivative** f\'(x) gives the instantaneous rate of change of f at x. It is defined as the limit of the difference quotient.',
      latex: "f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}",
      steps: [
        { label: 'Power Rule', latex: '\\frac{d}{dx}[x^n] = nx^{n-1}' },
        { label: 'Product Rule', latex: '\\frac{d}{dx}[uv] = u\'v + uv\'' },
        { label: 'Quotient Rule', latex: '\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u\'v - uv\'}{v^2}' },
        { label: 'Chain Rule', latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)' }
      ],
      tip: 'Memorize the power rule first — it applies to polynomials, which are the most common functions you\'ll differentiate.'
    })
  },
  {
    keywords: ['power rule'],
    respond: () => ({
      text: 'The **Power Rule** is the most fundamental differentiation rule: bring the exponent down as a coefficient, then reduce the exponent by 1.',
      latex: '\\frac{d}{dx}[x^n] = nx^{n-1}',
      steps: [
        { label: 'Example: x³', latex: '\\frac{d}{dx}[x^3] = 3x^2' },
        { label: 'Example: x⁵', latex: '\\frac{d}{dx}[x^5] = 5x^4' },
        { label: 'Works for fractions too', latex: '\\frac{d}{dx}[x^{1/2}] = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}' }
      ],
      tip: 'The power rule works for any real exponent n, including negative numbers and fractions.'
    })
  },
  {
    keywords: ['chain rule'],
    respond: () => ({
      text: 'The **Chain Rule** is used for composite functions (a function inside another function). Differentiate the outer function, leave the inner alone, then multiply by the derivative of the inner.',
      latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      steps: [
        { label: 'Identify outer f and inner g', latex: 'h(x) = \\sin(x^2) \\Rightarrow f=\\sin,\\, g=x^2' },
        { label: 'Differentiate outer (keep inner)', latex: "f'(g(x)) = \\cos(x^2)" },
        { label: "Multiply by g'(x)", latex: "h'(x) = \\cos(x^2) \\cdot 2x" }
      ],
      tip: 'Think: "derivative of outside × derivative of inside". For nested functions, apply the chain rule multiple times.'
    })
  },
  {
    keywords: ['product rule'],
    respond: () => ({
      text: 'The **Product Rule** is used when two functions are multiplied together. It\'s often remembered as "first times derivative of second, plus second times derivative of first".',
      latex: '\\frac{d}{dx}[u \\cdot v] = u\'v + uv\'',
      steps: [
        { label: 'Identify u and v', latex: 'h(x) = x^2 \\sin x \\Rightarrow u=x^2,\\, v=\\sin x' },
        { label: "Find u' and v'", latex: "u'=2x,\\quad v'=\\cos x" },
        { label: 'Apply the formula', latex: "h'(x) = 2x\\sin x + x^2\\cos x" }
      ],
      tip: 'Don\'t confuse with the quotient rule! Product rule is for multiplication, quotient rule is for division.'
    })
  },
  {
    keywords: ['quotient rule'],
    respond: () => ({
      text: 'The **Quotient Rule** handles differentiation of a fraction u/v. Remember: "low d-high minus high d-low, over low squared".',
      latex: "\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u'v - uv'}{v^2}",
      steps: [
        { label: 'Identify u (top) and v (bottom)', latex: 'h(x) = \\frac{x^2}{\\cos x}' },
        { label: "Derivatives: u'=2x, v'=-sin x", latex: "u'=2x, \\quad v'=-\\sin x" },
        { label: 'Apply the formula', latex: "h'(x) = \\frac{2x\\cos x - x^2(-\\sin x)}{\\cos^2 x} = \\frac{2x\\cos x + x^2\\sin x}{\\cos^2 x}" }
      ],
      tip: 'The order matters! It\'s u\'v − uv\', NOT uv\' − u\'v.'
    })
  },
  {
    keywords: ['implicit differentiation', 'implicit'],
    respond: () => ({
      text: '**Implicit differentiation** is used when y is defined implicitly (not solved for explicitly). Differentiate both sides with respect to x, treating y as a function of x and using the chain rule on y terms.',
      latex: '\\frac{d}{dx}[y^n] = ny^{n-1}\\frac{dy}{dx}',
      steps: [
        { label: 'Example: x² + y² = 25', latex: 'x^2 + y^2 = 25' },
        { label: 'Differentiate both sides', latex: '2x + 2y\\frac{dy}{dx} = 0' },
        { label: 'Solve for dy/dx', latex: '\\frac{dy}{dx} = -\\frac{x}{y}' }
      ],
      tip: 'Every time you differentiate a y term, multiply by dy/dx (chain rule). Then isolate dy/dx algebraically.'
    })
  },
  // ── INTEGRATION ──
  {
    keywords: ['integral', 'integrate', 'integration', 'antiderivative'],
    respond: () => ({
      text: '**Integration** is the reverse of differentiation. The indefinite integral finds the antiderivative F(x) + C. The definite integral computes the net signed area between a curve and the x-axis.',
      latex: '\\int f(x)\\,dx = F(x) + C \\quad\\text{where}\\quad F\'(x) = f(x)',
      steps: [
        { label: 'Power Rule for Integration', latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C,\\quad n\\neq -1' },
        { label: 'Definite Integral', latex: '\\int_a^b f(x)\\,dx = F(b) - F(a)' },
        { label: 'Common: ∫sin(x)dx', latex: '\\int \\sin x\\,dx = -\\cos x + C' }
      ],
      tip: 'Always add "+ C" to indefinite integrals. The constant represents any family of antiderivatives.'
    })
  },
  {
    keywords: ['u substitution', 'u-substitution', 'substitution'],
    respond: () => ({
      text: '**U-Substitution** is the integration counterpart of the chain rule. Let u = inner function, compute du, substitute, integrate in terms of u, then back-substitute.',
      latex: '\\int f(g(x))g\'(x)\\,dx = \\int f(u)\\,du',
      steps: [
        { label: 'Example: ∫2x·sin(x²)dx', latex: '\\int 2x\\sin(x^2)\\,dx' },
        { label: 'Let u = x², so du = 2x dx', latex: 'u = x^2,\\quad du = 2x\\,dx' },
        { label: 'Substitute and integrate', latex: '\\int \\sin(u)\\,du = -\\cos(u) + C = -\\cos(x^2)+C' }
      ],
      tip: 'Choose u to be the "inside" function whose derivative also appears in the integral (or is off by a constant factor).'
    })
  },
  {
    keywords: ['integration by parts', 'by parts', 'ibp'],
    respond: () => ({
      text: '**Integration by Parts** is the integration counterpart of the product rule. Use LIATE to choose u: Logarithm, Inverse trig, Algebraic, Trig, Exponential.',
      latex: '\\int u\\,dv = uv - \\int v\\,du',
      steps: [
        { label: 'Example: ∫x·eˣ dx', latex: '\\int x e^x\\,dx' },
        { label: 'Choose: u=x, dv=eˣdx', latex: 'u=x,\\; dv=e^x dx \\Rightarrow du=dx,\\; v=e^x' },
        { label: 'Apply formula', latex: '\\int x e^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C' }
      ],
      tip: 'LIATE helps pick u. Sometimes you need to apply integration by parts twice for cyclic integrals.'
    })
  },
  {
    keywords: ['fundamental theorem', 'ftc'],
    respond: () => ({
      text: 'The **Fundamental Theorem of Calculus** (FTC) connects differentiation and integration — they are inverse operations. Part 1 says the derivative of an accumulation function equals the integrand. Part 2 says definite integrals are evaluated by antiderivatives.',
      latex: '\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)',
      steps: [
        { label: 'FTC Part 1', latex: 'F(x) = \\int_a^x f(t)\\,dt \\Rightarrow F\'(x) = f(x)' },
        { label: 'FTC Part 2', latex: '\\int_a^b f(x)\\,dx = F(b) - F(a)' },
        { label: 'Example', latex: '\\int_0^3 2x\\,dx = [x^2]_0^3 = 9 - 0 = 9' }
      ],
      tip: 'FTC Part 2 is what allows us to evaluate definite integrals without computing Riemann sums!'
    })
  },
  // ── TRIGONOMETRIC DERIVATIVES ──
  {
    keywords: ['sin', 'cos', 'tan', 'trig derivative', 'trigonometric derivative'],
    respond: () => ({
      text: 'Here are the **trigonometric derivatives** you must memorize:',
      latex: '\\frac{d}{dx}\\sin x = \\cos x',
      steps: [
        { label: 'd/dx[sin x]', latex: '\\frac{d}{dx}\\sin x = \\cos x' },
        { label: 'd/dx[cos x]', latex: '\\frac{d}{dx}\\cos x = -\\sin x' },
        { label: 'd/dx[tan x]', latex: '\\frac{d}{dx}\\tan x = \\sec^2 x' },
        { label: 'd/dx[csc x]', latex: '\\frac{d}{dx}\\csc x = -\\csc x\\cot x' },
        { label: 'd/dx[sec x]', latex: '\\frac{d}{dx}\\sec x = \\sec x\\tan x' },
        { label: 'd/dx[cot x]', latex: '\\frac{d}{dx}\\cot x = -\\csc^2 x' }
      ],
      tip: 'Note the pattern: the "co-" functions (cos, csc, cot) all have a negative sign in their derivatives.'
    })
  },
  // ── EXPONENTIAL & LOGARITHMIC ──
  {
    keywords: ['exponential', 'e^x', 'ln', 'logarithm', 'log'],
    respond: () => ({
      text: '**Exponential and logarithmic** derivatives and integrals are fundamental in calculus:',
      latex: '\\frac{d}{dx}[e^x] = e^x',
      steps: [
        { label: 'd/dx[eˣ]', latex: '\\frac{d}{dx}[e^x] = e^x' },
        { label: 'd/dx[ln x]', latex: '\\frac{d}{dx}[\\ln x] = \\frac{1}{x}' },
        { label: 'd/dx[aˣ]', latex: '\\frac{d}{dx}[a^x] = a^x \\ln a' },
        { label: '∫eˣ dx', latex: '\\int e^x\\,dx = e^x + C' },
        { label: '∫1/x dx', latex: '\\int \\frac{1}{x}\\,dx = \\ln|x| + C' }
      ],
      tip: 'eˣ is the only function that is its own derivative! That\'s what makes it so special in mathematics.'
    })
  },
  // ── OPTIMIZATION ──
  {
    keywords: ['optimization', 'maximum', 'minimum', 'maxima', 'minima', 'critical point'],
    respond: () => ({
      text: '**Optimization** finds maximum or minimum values of a function. Critical points occur where f\'(x) = 0 or f\'(x) is undefined.',
      latex: "f'(c) = 0 \\Rightarrow x=c \\text{ is a critical point}",
      steps: [
        { label: '1. Find the derivative', latex: "f'(x)" },
        { label: '2. Set derivative = 0 and solve', latex: "f'(x) = 0 \\Rightarrow x = c" },
        { label: '3. Use Second Derivative Test', latex: "f''(c) > 0 \\Rightarrow \\text{min},\\quad f''(c) < 0 \\Rightarrow \\text{max}" }
      ],
      tip: 'Always check endpoints of a closed interval [a,b] — the global max/min might be at an endpoint, not a critical point!'
    })
  },
  // ── RIEMANN SUMS ──
  {
    keywords: ['riemann', 'riemann sum', 'approximation', 'rectangle'],
    respond: () => ({
      text: '**Riemann sums** approximate the area under a curve by summing the areas of rectangles. As n → ∞, the sum converges to the exact definite integral.',
      latex: '\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(x_i^*)\\Delta x',
      steps: [
        { label: 'Width of each rectangle', latex: '\\Delta x = \\frac{b-a}{n}' },
        { label: 'Left Riemann Sum', latex: 'L_n = \\sum_{i=0}^{n-1}f(a+i\\Delta x)\\Delta x' },
        { label: 'Right Riemann Sum', latex: 'R_n = \\sum_{i=1}^{n}f(a+i\\Delta x)\\Delta x' }
      ],
      tip: 'More rectangles (larger n) = more accurate approximation. The midpoint rule is usually more accurate than left or right sums.'
    })
  },
  // ── NUMBER THEORY ──
  {
    keywords: ['prime', 'prime number', 'divisibility', 'number theory', 'gcd', 'lcm', 'factor'],
    respond: () => ({
      text: '**Number Theory** studies the properties of integers. Key concepts include primes, divisibility, GCD, LCM, and modular arithmetic.',
      latex: 'a \\mid b \\iff b = ka \\text{ for some } k \\in \\mathbb{Z}',
      steps: [
        { label: 'GCD via Euclidean Algorithm', latex: '\\gcd(48, 18) = \\gcd(18, 12) = \\gcd(12, 6) = 6' },
        { label: 'LCM formula', latex: '\\text{lcm}(a,b) = \\frac{|a \\cdot b|}{\\gcd(a,b)}' },
        { label: "Euler's Totient", latex: '\\phi(n) = n\\prod_{p|n}\\left(1-\\frac{1}{p}\\right)' }
      ],
      tip: 'Every integer > 1 is either prime or can be uniquely factored into primes (Fundamental Theorem of Arithmetic).'
    })
  },
  // ── ALGEBRA ──
  {
    keywords: ['quadratic', 'quadratic formula', 'factoring', 'algebra'],
    respond: () => ({
      text: 'The **Quadratic Formula** solves any quadratic equation ax² + bx + c = 0. The discriminant b² − 4ac tells you how many real solutions exist.',
      latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      steps: [
        { label: 'Discriminant > 0 → 2 real roots', latex: 'b^2 - 4ac > 0' },
        { label: 'Discriminant = 0 → 1 real root', latex: 'b^2 - 4ac = 0 \\Rightarrow x = -\\frac{b}{2a}' },
        { label: 'Discriminant < 0 → no real roots', latex: 'b^2 - 4ac < 0 \\Rightarrow \\text{complex roots}' }
      ],
      tip: 'Try factoring first — it\'s faster! Use the quadratic formula when factoring isn\'t obvious.'
    })
  },
  // ── GEOMETRY ──
  {
    keywords: ['geometry', 'circle', 'area', 'perimeter', 'triangle', 'pythagorean'],
    respond: () => ({
      text: 'Key **Geometry** formulas every student must know:',
      latex: 'a^2 + b^2 = c^2',
      steps: [
        { label: 'Circle area and circumference', latex: 'A = \\pi r^2,\\quad C = 2\\pi r' },
        { label: 'Triangle area', latex: 'A = \\frac{1}{2}bh' },
        { label: "Pythagorean Theorem", latex: 'a^2 + b^2 = c^2' },
        { label: 'Sphere volume', latex: 'V = \\frac{4}{3}\\pi r^3' }
      ],
      tip: 'For non-right triangles, use the Law of Sines (a/sin A = b/sin B) or Law of Cosines (c² = a² + b² − 2ab·cos C).'
    })
  },
  // ── COMBINATORICS ──
  {
    keywords: ['combinatorics', 'combination', 'permutation', 'choose', 'counting', 'binomial'],
    respond: () => ({
      text: '**Combinatorics** counts arrangements and selections. Permutations care about order; combinations do not.',
      latex: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
      steps: [
        { label: 'Permutations (order matters)', latex: 'P(n,k) = \\frac{n!}{(n-k)!}' },
        { label: 'Combinations (order doesn\'t matter)', latex: 'C(n,k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}' },
        { label: 'Binomial Theorem', latex: '(a+b)^n = \\sum_{k=0}^n \\binom{n}{k}a^{n-k}b^k' }
      ],
      tip: 'Ask yourself: "Does changing the order give a different outcome?" Yes → Permutation. No → Combination.'
    })
  },
  // ── PROBABILITY ──
  {
    keywords: ['probability', 'chance', 'random', 'bayes', 'conditional'],
    respond: () => ({
      text: '**Probability** measures how likely events are. P(A) = (favorable outcomes)/(total outcomes) for equally likely events.',
      latex: 'P(A) = \\frac{|A|}{|S|}',
      steps: [
        { label: 'Complement rule', latex: "P(A') = 1 - P(A)" },
        { label: 'Addition rule', latex: 'P(A\\cup B) = P(A)+P(B)-P(A\\cap B)' },
        { label: 'Conditional probability', latex: 'P(A|B) = \\frac{P(A\\cap B)}{P(B)}' },
        { label: "Bayes' Theorem", latex: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}" }
      ],
      tip: 'Always define your sample space S first. Make sure all probabilities sum to 1.'
    })
  },
  // ── MEAN VALUE THEOREM ──
  {
    keywords: ['mean value theorem', 'mvt', "rolle's"],
    respond: () => ({
      text: 'The **Mean Value Theorem** (MVT) states that for a continuous and differentiable function on [a,b], there exists at least one point c where the instantaneous rate equals the average rate.',
      latex: "f'(c) = \\frac{f(b)-f(a)}{b-a}",
      steps: [
        { label: 'Conditions required', latex: 'f \\text{ continuous on } [a,b],\\; f \\text{ differentiable on } (a,b)' },
        { label: 'Conclusion', latex: "\\exists c \\in (a,b): f'(c) = \\frac{f(b)-f(a)}{b-a}" },
        { label: "Rolle's Theorem (special case: f(a)=f(b))", latex: "f(a)=f(b) \\Rightarrow \\exists c: f'(c)=0" }
      ],
      tip: 'MVT is the theoretical backbone behind many optimization results. It guarantees the existence of c but doesn\'t tell you exactly where it is.'
    })
  },
];

const QUICK_TOPICS = [
  { label: 'Limits', icon: '→', query: 'explain limits to me' },
  { label: 'Derivatives', icon: "f'", query: 'how do derivatives work?' },
  { label: 'Chain Rule', icon: '⛓', query: 'explain the chain rule' },
  { label: 'Integrals', icon: '∫', query: 'explain integration' },
  { label: 'U-Substitution', icon: 'u', query: 'how does u-substitution work?' },
  { label: 'FTC', icon: '≡', query: 'explain the fundamental theorem of calculus' },
  { label: 'Quadratic', icon: 'x²', query: 'quadratic formula' },
  { label: 'Probability', icon: '%', query: 'explain probability basics' },
];

function getTutorResponse(input: string) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return entry.respond(input);
    }
  }
  // Generic fallback
  return {
    text: `That's a great question! To help you best, could you be more specific? For example, you could ask about:\n• A specific topic (limits, derivatives, integrals, quadratics)\n• A specific rule (chain rule, product rule, L'Hôpital's)\n• A technique (u-substitution, integration by parts)\n• Any concept from algebra, geometry, combinatorics, or probability\n\nTry typing something like: **"explain the chain rule"** or **"how does u-substitution work?"**`,
    tip: 'You can also click one of the Quick Topic buttons above the chat!'
  };
}

export const SocraticTutor: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm0',
      sender: 'tutor',
      text: "Hello! I'm **MATHVERSE AI** — your personal math tutor. 🎓\n\nI can explain concepts step by step, show worked examples with formulas, and answer questions on:\n• Calculus (Limits, Derivatives, Integrals)\n• Algebra & Number Theory\n• Geometry & Trigonometry\n• Combinatorics & Probability\n\nWhat would you like to learn today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    sound.playClick();

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getTutorResponse(text);
      const tutorMsg: ChatMessage = {
        id: `t_${Date.now()}`,
        sender: 'tutor',
        ...response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, tutorMsg]);
      setIsTyping(false);
      sound.playSuccess();
    }, 800 + Math.random() * 600);
  };

  const clearChat = () => {
    setMessages([{
      id: 'm0_new',
      sender: 'tutor',
      text: "Chat cleared! I'm ready for your next question. What would you like to explore?",
      timestamp: new Date()
    }]);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/•/g, '•');
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className="flex flex-col h-full max-h-screen" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30"
        style={{ background: 'rgba(139,92,246,0.1)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MATHVERSE AI Tutor</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400">Online • Ready to help</span>
            </div>
          </div>
        </div>
        <button onClick={clearChat}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all">
          <RefreshCw size={14} />
          Clear
        </button>
      </div>

      {/* Quick Topics */}
      <div className="p-3 border-b border-purple-500/20 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {QUICK_TOPICS.map(t => (
            <button key={t.label} onClick={() => sendMessage(t.query)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-purple-200 border border-purple-500/40 hover:bg-purple-500/30 hover:border-purple-400 transition-all whitespace-nowrap">
              <span className="text-purple-400">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'} gap-3`}>
            {msg.sender === 'tutor' && (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-1"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                🤖
              </div>
            )}

            <div className={`max-w-2xl ${msg.sender === 'student' ? 'ml-10' : 'mr-4'}`}>
              <div className={`rounded-2xl p-4 ${
                msg.sender === 'student'
                  ? 'rounded-tr-sm text-white'
                  : 'rounded-tl-sm text-gray-100'
              }`}
                style={msg.sender === 'student'
                  ? { background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }
                  : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(139,92,246,0.3)' }}>

                <div className="text-sm leading-relaxed">
                  {formatText(msg.text)}
                </div>

                {/* LaTeX formula */}
                {msg.latex && (
                  <div className="mt-3 p-3 rounded-xl text-center"
                    style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)' }}>
                    <MathView latex={msg.latex} display />
                  </div>
                )}

                {/* Step-by-step */}
                {msg.steps && msg.steps.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Step by Step</p>
                    {msg.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg"
                        style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-xs text-purple-300 mb-1">{step.label}</p>
                          <MathView latex={step.latex} display />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tip */}
                {msg.tip && (
                  <div className="mt-3 flex gap-2 p-2 rounded-lg"
                    style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <Lightbulb size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-200">{msg.tip}</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {msg.sender === 'student' && (
              <div className="w-9 h-9 rounded-xl bg-purple-700 flex items-center justify-center text-lg flex-shrink-0 mt-1">
                🎓
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
              🤖
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-purple-300 ml-1">thinking…</span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-500/30"
        style={{ background: 'rgba(139,92,246,0.05)', backdropFilter: 'blur(10px)' }}>
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              placeholder="Ask about any math topic… (e.g. 'explain the chain rule')"
              rows={2}
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none outline-none"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(139,92,246,0.4)',
              }}
            />
          </div>
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
            <Send size={18} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
