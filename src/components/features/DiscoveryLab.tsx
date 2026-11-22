import React, { useState, useEffect, useRef } from 'react';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { 
  Sparkles, Play, RotateCcw, ZoomIn, ZoomOut, Layers, Eye, 
  HelpCircle, ChevronRight, Award, Compass, Cpu, Palette, Info
} from 'lucide-react';

type LabTab = 'collatz' | 'ulam' | 'mandelbrot' | 'pascal' | 'fibonacci';

export const DiscoveryLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('collatz');

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
            Interactive Computational Mathematics
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-cinzel">
            Mathematical Discovery Lab
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2.5 leading-relaxed">
            Witness the infinite beauty of pure mathematics through real-time computational experiments, 
            fractal dynamic systems, number theory spirals, and deep unsolved mysteries of our universe.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {[
            { id: 'collatz' as LabTab, label: 'Collatz Conjecture 3n+1', badge: 'Unsolved' },
            { id: 'ulam' as LabTab, label: 'Ulam Prime Spiral', badge: 'Number Theory' },
            { id: 'mandelbrot' as LabTab, label: 'Mandelbrot & Julia Fractals', badge: 'Chaos' },
            { id: 'pascal' as LabTab, label: 'Pascal Modulo Fractals', badge: 'Sierpinski' },
            { id: 'fibonacci' as LabTab, label: 'Golden Ratio & Phyllotaxis', badge: 'Geometry' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                activeTab === tab.id ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Experiment Container */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        {activeTab === 'collatz' && <CollatzExplorer />}
        {activeTab === 'ulam' && <UlamSpiralExplorer />}
        {activeTab === 'mandelbrot' && <MandelbrotExplorer />}
        {activeTab === 'pascal' && <PascalExplorer />}
        {activeTab === 'fibonacci' && <FibonacciExplorer />}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   1. COLLATZ CONJECTURE (3n + 1) EXPLORER
   ───────────────────────────────────────────────────────────── */
const CollatzExplorer: React.FC = () => {
  const [startNum, setStartNum] = useState<number>(27);
  const [inputVal, setInputVal] = useState<string>('27');
  const [sequence, setSequence] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute Collatz sequence
  useEffect(() => {
    let n = startNum;
    if (n < 1 || isNaN(n)) return;
    const seq: number[] = [n];
    let count = 0;
    while (n !== 1 && count < 2000) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      seq.push(n);
      count++;
    }
    setSequence(seq);
  }, [startNum]);

  // Draw Sequence Trajectory Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || sequence.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Dark grid background
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 20; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const padding = 50;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;
    const maxVal = Math.max(...sequence);
    const minVal = 1;

    // Gradient Line
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(0.5, '#ec4899');
    gradient.addColorStop(1, '#eab308');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    sequence.forEach((val, i) => {
      const x = padding + (i / (sequence.length - 1)) * plotWidth;
      // Logarithmic scaling for better visualization of giant peaks
      const logMax = Math.log10(maxVal + 1);
      const logVal = Math.log10(val);
      const y = height - padding - (logVal / (logMax || 1)) * plotHeight;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill underneath
    ctx.lineTo(padding + plotWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.fill();

    // Highlight peak
    const peakIdx = sequence.indexOf(maxVal);
    const peakX = padding + (peakIdx / (sequence.length - 1)) * plotWidth;
    const peakY = height - padding - (Math.log10(maxVal) / Math.log10(maxVal + 1)) * plotHeight;

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(peakX, peakY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fcd34d';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`Peak: ${maxVal.toLocaleString()} (Step ${peakIdx})`, peakX - 40, Math.max(peakY - 12, 25));

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.fillText('Step 0', padding - 15, height - 20);
    ctx.fillText(`Step ${sequence.length - 1} (Reached 1)`, width - padding - 60, height - 20);
  }, [sequence]);

  const maxVal = sequence.length > 0 ? Math.max(...sequence) : 0;
  const oddCount = sequence.filter(n => n % 2 !== 0).length;
  const evenCount = sequence.length - oddCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            The Collatz Conjecture (The 3n + 1 Problem)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            "Mathematics may not be ready for such problems." — Paul Erdős
          </p>
        </div>

        {/* Input & Presets */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5">
            <span className="text-xs font-mono text-indigo-400 mr-2">n =</span>
            <input
              type="number"
              min="1"
              max="10000000"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="bg-transparent text-white font-mono text-sm w-24 outline-none"
            />
            <button
              onClick={() => {
                const val = parseInt(inputVal, 10);
                if (val > 0) setStartNum(val);
              }}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl ml-2"
            >
              Compute
            </button>
          </div>

          <div className="flex gap-1.5">
            {[27, 97, 837, 6171, 77031].map(seed => (
              <button
                key={seed}
                onClick={() => {
                  setInputVal(seed.toString());
                  setStartNum(seed);
                }}
                className={`text-[11px] font-mono px-2 py-1 rounded-lg border transition-all ${
                  startNum === seed 
                    ? 'bg-indigo-600 text-white border-indigo-400' 
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {seed}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trajectory Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <canvas ref={canvasRef} width={900} height={380} className="w-full h-auto block" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Steps to 1</span>
          <span className="text-2xl font-black text-indigo-400 font-mono mt-1 block">
            {sequence.length - 1}
          </span>
          <span className="text-[10px] text-slate-500">Stopping time</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Peak Value Reached</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block truncate">
            {maxVal.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500">{((maxVal / startNum)).toFixed(1)}x initial</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Odd vs Even Steps</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            {oddCount} / {evenCount}
          </span>
          <span className="text-[10px] text-slate-500">{((oddCount / sequence.length) * 100).toFixed(0)}% upward leaps</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
          <span className="text-2xl font-black text-purple-400 font-mono mt-1 block">
            1 reached
          </span>
          <span className="text-[10px] text-slate-500">Cycle: 4 → 2 → 1</span>
        </div>
      </div>

      {/* Mathematical Formulation */}
      <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-slate-300 space-y-2">
        <div className="font-bold text-indigo-300 flex items-center gap-2">
          <Info size={14} /> Rule of Transformation
        </div>
        <MathView math="T(n) = \begin{cases} \frac{n}{2} & \text{if } n \equiv 0 \pmod{2} \\ 3n + 1 & \text{if } n \equiv 1 \pmod{2} \end{cases}" block />
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Lothar Collatz conjectured in 1937 that this recursive map always reaches the trivial cycle 4 → 2 → 1 for every positive integer. 
          Tested computationally up to <MathView math="2^{68} \approx 2.95 \times 10^{20}" /> with zero counterexamples, yet an analytic proof remains one of mathematics' greatest unsolved open problems.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. ULAM PRIME SPIRAL & SACKS SPIRAL EXPLORER
   ───────────────────────────────────────────────────────────── */
const UlamSpiralExplorer: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(71);
  const [spiralMode, setSpiralMode] = useState<'ulam' | 'sacks'>('ulam');
  const [highlightEuler, setHighlightEuler] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check primality
  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  // Check if n is generated by Euler's polynomial: n^2 + n + 41
  const isEulerPrime = (num: number): boolean => {
    // k^2 + k + 41 = num => solve for positive integer k
    // k^2 + k + (41 - num) = 0
    const disc = 1 - 4 * (41 - num);
    if (disc < 0) return false;
    const s = Math.round(Math.sqrt(disc));
    if (s * s !== disc) return false;
    const k = (-1 + s) / 2;
    return k >= 0 && Number.isInteger(k) && isPrime(num);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);

    if (spiralMode === 'ulam') {
      const N = gridSize;
      const cellSize = width / N;
      const mid = Math.floor(N / 2);

      // Fill grid with Ulam spiral numbers
      const grid = Array.from({ length: N }, () => Array(N).fill(0));
      let x = mid;
      let y = mid;
      let num = 1;
      grid[y][x] = num;

      let step = 1;
      let dir = 0; // 0: Right, 1: Up, 2: Left, 3: Down
      const dx = [1, 0, -1, 0];
      const dy = [0, -1, 0, 1];

      while (num < N * N) {
        for (let d = 0; d < 2; d++) {
          for (let s = 0; s < step; s++) {
            x += dx[dir];
            y += dy[dir];
            num++;
            if (x >= 0 && x < N && y >= 0 && y < N) {
              grid[y][x] = num;
            }
          }
          dir = (dir + 1) % 4;
        }
        step++;
      }

      // Draw pixels
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          const val = grid[r][c];
          if (isPrime(val)) {
            const isEuler = highlightEuler && isEulerPrime(val);
            if (isEuler) {
              ctx.fillStyle = '#eab308'; // Glowing gold for Euler polynomial
            } else {
              ctx.fillStyle = '#6366f1'; // Cosmic indigo for primes
            }
            const px = c * cellSize;
            const py = r * cellSize;
            const dotSize = Math.max(cellSize * 0.85, 2);
            ctx.fillRect(px, py, dotSize, dotSize);
          }
        }
      }
    } else {
      // Sacks Spiral (Archimedean)
      const maxN = gridSize * gridSize;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = (width / 2 - 20) / Math.sqrt(maxN);

      for (let n = 1; n <= maxN; n++) {
        if (isPrime(n)) {
          const r = Math.sqrt(n) * scale;
          const theta = Math.sqrt(n) * 2 * Math.PI;
          const px = centerX + r * Math.cos(theta);
          const py = centerY + r * Math.sin(theta);

          const isEuler = highlightEuler && isEulerPrime(n);
          ctx.fillStyle = isEuler ? '#f59e0b' : '#818cf8';
          ctx.beginPath();
          ctx.arc(px, py, isEuler ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [gridSize, spiralMode, highlightEuler]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            Ulam & Sacks Prime Spirals
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing the hidden geometric alignments and quadratic symmetries of prime numbers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setSpiralMode('ulam')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                spiralMode === 'ulam' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ulam Grid
            </button>
            <button
              onClick={() => setSpiralMode('sacks')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                spiralMode === 'sacks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sacks Spiral
            </button>
          </div>

          {/* Grid Size Slider */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5">
            <span className="text-[11px] text-slate-400">Resolution:</span>
            <input
              type="range"
              min="31"
              max="131"
              step="10"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value, 10))}
              className="accent-indigo-500 w-24"
            />
            <span className="text-xs font-mono text-indigo-400">{gridSize}×{gridSize}</span>
          </div>

          {/* Euler Highlight Toggle */}
          <button
            onClick={() => setHighlightEuler(!highlightEuler)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              highlightEuler
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <Sparkles size={12} />
            <span>Euler's n²+n+41</span>
          </button>
        </div>
      </div>

      {/* Spiral Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center p-4">
        <canvas ref={canvasRef} width={560} height={560} className="rounded-xl block max-w-full h-auto" />
      </div>

      {/* Deep Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-bold text-indigo-400 flex items-center gap-1.5">
            <Compass size={14} /> Stanislaw Ulam's 1963 Discovery
          </div>
          <p className="leading-relaxed text-slate-400">
            During a boring presentation at a scientific conference, mathematician Stanislaw Ulam began doodling numbers 
            in a spiral grid. To his astonishment, when he circled prime numbers, they formed unbroken diagonal and horizontal lines.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles size={14} /> Euler's Prime-Generating Polynomial
          </div>
          <p className="leading-relaxed text-slate-400">
            The highlighted golden dots correspond to <MathView math="f(n) = n^2 + n + 41" />. For <MathView math="0 \le n \le 39" />, 
            this single quadratic expression yields 40 consecutive prime numbers, aligning perfectly along an unbroken diagonal line!
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. MANDELBROT & JULIA SET FRACTAL EXPLORER
   ───────────────────────────────────────────────────────────── */
const MandelbrotExplorer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [centerX, setCenterX] = useState<number>(-0.7);
  const [centerY, setCenterY] = useState<number>(0.0);
  const [zoom, setZoom] = useState<number>(1.0);
  const [maxIter, setMaxIter] = useState<number>(120);
  const [fractalType, setFractalType] = useState<'mandelbrot' | 'julia'>('mandelbrot');
  const [juliaC, setJuliaC] = useState<{ r: number; i: number }>({ r: -0.7, i: 0.27015 });
  const [colorPalette, setColorPalette] = useState<'cosmic' | 'fire' | 'emerald'>('cosmic');
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Preset hotspots
  const presets = [
    { name: 'Standard View', x: -0.7, y: 0.0, z: 1.0, type: 'mandelbrot' as const },
    { name: 'Seahorse Valley', x: -0.743643887037158704752191506114774, y: 0.131825904205311970493132056385139, z: 80.0, type: 'mandelbrot' as const },
    { name: 'Elephant Valley', x: 0.27, y: 0.005, z: 40.0, type: 'mandelbrot' as const },
    { name: 'Golden Julia', x: 0, y: 0, z: 1.2, type: 'julia' as const, c: { r: -0.4, i: 0.6 } },
    { name: 'Dendrite Julia', x: 0, y: 0, z: 1.2, type: 'julia' as const, c: { r: -0.8, i: 0.156 } }
  ];

  // Render Fractal on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const spanX = 3.2 / zoom;
    const spanY = (3.2 * (height / width)) / zoom;
    const minX = centerX - spanX / 2;
    const minY = centerY - spanY / 2;

    for (let py = 0; py < height; py++) {
      const y0 = minY + (py / height) * spanY;
      for (let px = 0; px < width; px++) {
        const x0 = minX + (px / width) * spanX;
        let iter = 0;

        let zx = fractalType === 'mandelbrot' ? 0 : x0;
        let zy = fractalType === 'mandelbrot' ? 0 : y0;
        const cx = fractalType === 'mandelbrot' ? x0 : juliaC.r;
        const cy = fractalType === 'mandelbrot' ? y0 : juliaC.i;

        while (zx * zx + zy * zy <= 4 && iter < maxIter) {
          const xtemp = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = xtemp;
          iter++;
        }

        const pixelIndex = (py * width + px) * 4;
        if (iter === maxIter) {
          // Inside set (pure void black)
          data[pixelIndex] = 9;
          data[pixelIndex + 1] = 11;
          data[pixelIndex + 2] = 16;
          data[pixelIndex + 3] = 255;
        } else {
          // Color palettes
          const t = iter / maxIter;
          if (colorPalette === 'cosmic') {
            data[pixelIndex] = Math.floor(Math.sin(t * 10) * 127 + 128); // R
            data[pixelIndex + 1] = Math.floor(Math.sin(t * 15 + 2) * 80 + 90); // G
            data[pixelIndex + 2] = Math.floor(Math.sin(t * 5 + 4) * 127 + 128); // B
          } else if (colorPalette === 'fire') {
            data[pixelIndex] = Math.min(255, Math.floor(t * 400));
            data[pixelIndex + 1] = Math.min(255, Math.floor(t * t * 300));
            data[pixelIndex + 2] = Math.floor(Math.sin(t * 8) * 30);
          } else {
            // Emerald Aurora
            data[pixelIndex] = Math.floor(Math.sin(t * 8) * 40);
            data[pixelIndex + 1] = Math.floor(Math.sin(t * 12 + 1) * 120 + 130);
            data[pixelIndex + 2] = Math.floor(Math.sin(t * 10 + 3) * 100 + 100);
          }
          data[pixelIndex + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    setIsRendering(false);
  }, [centerX, centerY, zoom, maxIter, fractalType, juliaC, colorPalette]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            Mandelbrot & Julia Set Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Infinite boundary complexity arising from the simple nonlinear equation <MathView math="z_{n+1} = z_n^2 + c" />
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setFractalType('mandelbrot')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                fractalType === 'mandelbrot' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mandelbrot
            </button>
            <button
              onClick={() => setFractalType('julia')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                fractalType === 'julia' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Julia Set
            </button>
          </div>

          {/* Palette Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-2xl px-2.5 py-1">
            <Palette size={13} className="text-indigo-400" />
            {(['cosmic', 'fire', 'emerald'] as const).map(pal => (
              <button
                key={pal}
                onClick={() => setColorPalette(pal)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                  colorPalette === pal ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {pal}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-2xl p-1">
            <button
              onClick={() => setZoom(z => Math.max(0.5, z / 1.6))}
              className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="text-[11px] font-mono px-2 text-indigo-400">{zoom.toFixed(1)}x</span>
            <button
              onClick={() => setZoom(z => z * 1.6)}
              className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-300"
              title="Zoom In"
            >
              <ZoomIn size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Preset Hotspots */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Presets:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCenterX(preset.x);
              setCenterY(preset.y);
              setZoom(preset.z);
              setFractalType(preset.type);
              if (preset.c) setJuliaC(preset.c);
            }}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white transition-all"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center p-2 shadow-2xl">
        <canvas ref={canvasRef} width={640} height={420} className="rounded-xl block max-w-full h-auto cursor-crosshair" />
        {isRendering && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-600/80 text-white text-[10px] font-bold backdrop-blur-md animate-pulse">
            Rendering...
          </div>
        )}
      </div>

      {/* Parameters Footer */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-slate-400 font-mono">
          <span>Center X: <strong className="text-white">{centerX.toFixed(5)}</strong></span>
          <span>Center Y: <strong className="text-white">{centerY.toFixed(5)}</strong></span>
          <span>Iterations: <strong className="text-white">{maxIter}</strong></span>
        </div>
        <div className="text-slate-400">
          Tip: Each pixel coordinates the initial value of complex seed <MathView math="c \in \mathbb{C}" />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. PASCAL'S TRIANGLE MODULO P (SIERPINSKI)
   ───────────────────────────────────────────────────────────── */
const PascalExplorer: React.FC = () => {
  const [modVal, setModVal] = useState<number>(2);
  const [rows, setRows] = useState<number>(48);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);

    // Compute Pascal rows mod p using dynamic programming
    const tri: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row = new Array(r + 1);
      row[0] = 1 % modVal;
      row[r] = 1 % modVal;
      for (let c = 1; c < r; c++) {
        row[c] = (tri[r - 1][c - 1] + tri[r - 1][c]) % modVal;
      }
      tri.push(row);
    }

    const cellWidth = width / rows;
    const cellHeight = height / rows;

    // Palette for residues
    const colors = ['#0a0d14', '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#38bdf8', '#a855f7'];

    for (let r = 0; r < rows; r++) {
      const row = tri[r];
      const startX = (width - row.length * cellWidth) / 2;
      const y = r * cellHeight;

      for (let c = 0; c < row.length; c++) {
        const val = row[c];
        if (val !== 0) {
          ctx.fillStyle = colors[val % colors.length] || '#818cf8';
          ctx.fillRect(startX + c * cellWidth, y, cellWidth * 0.9, cellHeight * 0.9);
        }
      }
    }
  }, [modVal, rows]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            Pascal's Triangle Modulo p & Sierpinski Fractals
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Combinatorial coefficients <MathView math="\binom{n}{k} \pmod p" /> generating self-similar fractal patterns via Lucas' Theorem.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-2xl p-1">
            {[2, 3, 5, 7].map(p => (
              <button
                key={p}
                onClick={() => setModVal(p)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  modVal === p ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                mod {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5">
            <span className="text-[11px] text-slate-400">Rows:</span>
            <input
              type="range"
              min="24"
              max="96"
              step="8"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value, 10))}
              className="accent-indigo-500 w-24"
            />
            <span className="text-xs font-mono text-indigo-400">{rows}</span>
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center p-4">
        <canvas ref={canvasRef} width={640} height={420} className="rounded-xl block max-w-full h-auto" />
      </div>

      <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-slate-300 space-y-1.5">
        <div className="font-bold text-indigo-300">Lucas' Theorem & Sierpinski Gasket:</div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          When <MathView math="p = 2" />, the non-zero binomial coefficients <MathView math="\binom{n}{k} \equiv 1 \pmod 2" /> form the iconic 
          <strong> Sierpinski Triangle</strong> fractal. By Lucas' Theorem, <MathView math="\binom{n}{k} \pmod p" /> is determined by the 
          base-<MathView math="p" /> expansions of <MathView math="n" /> and <MathView math="k" />, producing self-replicating crystalline geometry at all scales.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. FIBONACCI & GOLDEN RATIO PHYLLOTAXIS
   ───────────────────────────────────────────────────────────── */
const FibonacciExplorer: React.FC = () => {
  const [numSeeds, setNumSeeds] = useState<number>(300);
  const [angleOffset, setAngleOffset] = useState<number>(137.5077); // Golden angle
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const c = (width / 2 - 20) / Math.sqrt(numSeeds);
    const angleRad = (angleOffset * Math.PI) / 180;

    for (let i = 0; i < numSeeds; i++) {
      const r = c * Math.sqrt(i);
      const theta = i * angleRad;
      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);

      // Color based on spiral position
      const hue = (i * 0.8) % 360;
      ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [numSeeds, angleOffset]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            Golden Ratio & Sunflower Phyllotaxis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Nature's optimal packing algorithm: Golden Angle <MathView math="\theta \approx 137.5077^\circ" />
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5">
            <span className="text-[11px] text-slate-400">Angle (°):</span>
            <input
              type="number"
              step="0.1"
              value={angleOffset}
              onChange={(e) => setAngleOffset(parseFloat(e.target.value) || 0)}
              className="bg-transparent text-white font-mono text-xs w-18 outline-none"
            />
            <button
              onClick={() => setAngleOffset(137.5077)}
              className="text-[10px] text-indigo-400 hover:text-white font-bold ml-1"
            >
              Reset φ
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5">
            <span className="text-[11px] text-slate-400">Seeds:</span>
            <input
              type="range"
              min="50"
              max="800"
              step="25"
              value={numSeeds}
              onChange={(e) => setNumSeeds(parseInt(e.target.value, 10))}
              className="accent-indigo-500 w-24"
            />
            <span className="text-xs font-mono text-indigo-400">{numSeeds}</span>
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center p-4">
        <canvas ref={canvasRef} width={500} height={500} className="rounded-xl block max-w-full h-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs text-slate-300">
          <div className="font-bold text-amber-400">The Most Irrational Number:</div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The golden ratio <MathView math="\phi = \frac{1+\sqrt{5}}{2} \approx 1.6180339887..." /> has the continued fraction expansion 
            <MathView math="[1; 1, 1, 1, \dots]" />. Because all partial quotients are 1, it is the slowest converging and hardest number to approximate with rationals, 
            preventing seeds from lining up into wasteful radial spokes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs text-slate-300">
          <div className="font-bold text-indigo-400">Phyllotaxis Equation:</div>
          <MathView math="r = c\sqrt{n}, \quad \theta = n \times 137.5077^\circ" block />
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Sunflower heads and pinecone scales naturally display clockwise and counter-clockwise spirals whose counts are consecutive Fibonacci numbers (e.g. 21, 34, 55, 89).
          </p>
        </div>
      </div>
    </div>
  );
};
