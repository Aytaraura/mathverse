import React, { useState, useEffect } from 'react';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { 
  BookMarked, Plus, Trash2, Edit3, Save, Copy, Check, Search, 
  Tag, Download, Upload, Pin, FileText, Sparkles, Code, Eye, 
  ExternalLink, Folder, ChevronRight, Layers, HelpCircle
} from 'lucide-react';

export interface MathNote {
  id: string;
  title: string;
  category: 'Calculus & Analysis' | 'Abstract Algebra' | 'Number Theory' | 'Geometry & Topology' | 'Olympiad Lemmas' | 'Research Notes';
  tags: string[];
  content: string;
  isPinned: boolean;
  updatedAt: string;
}

const DEFAULT_NOTES: MathNote[] = [
  {
    id: 'note_spectral_theorem',
    title: 'Spectral Theorem for Self-Adjoint Operators',
    category: 'Calculus & Analysis',
    tags: ['Linear Algebra', 'Functional Analysis', 'Hermitian', 'Eigenvalues'],
    isPinned: true,
    updatedAt: new Date().toISOString(),
    content: `### Spectral Theorem (Finite-Dimensional Formulation)

Let $V$ be a finite-dimensional inner product space over $\\mathbb{C}$, and let $T: V \\to V$ be a **self-adjoint (Hermitian)** linear operator such that:
$$T = T^*$$

#### Fundamental Properties:
1. Every eigenvalue of $T$ is **real**: $\\lambda_i \\in \\mathbb{R}$.
2. Eigenvectors corresponding to distinct eigenvalues are **mutually orthogonal**:
   $$\\langle v_i, v_j \\rangle = 0 \\quad \\text{for } \\lambda_i \\ne \\lambda_j$$
3. There exists an orthonormal basis of $V$ consisting entirely of eigenvectors of $T$.

#### Spectral Decomposition:
$$T = \\sum_{k=1}^n \\lambda_k P_k$$
where $P_k$ are orthogonal projection operators onto the eigenspaces $E(\\lambda_k)$, satisfying:
$$P_i P_j = \\delta_{ij} P_i, \\quad \\sum_{k=1}^n P_k = I$$`
  },
  {
    id: 'note_bolzano_weierstrass',
    title: 'Bolzano-Weierstrass Theorem & Compactness',
    category: 'Calculus & Analysis',
    tags: ['Real Analysis', 'Sequences', 'Compactness', 'Topology'],
    isPinned: false,
    updatedAt: new Date().toISOString(),
    content: `### Bolzano-Weierstrass Theorem

> **Theorem:** Every bounded sequence $(x_n)_{n=1}^\\infty$ in $\\mathbb{R}^k$ has a **convergent subsequence**.

#### Core Proof Outline:
1. Enclose the bounded sequence in a compact hypercube $I_0 = [a_1, b_1] \\times \\dots \\times [a_k, b_k]$.
2. Bisect each interval to partition $I_0$ into $2^k$ sub-hypercubes.
3. By the **Infinite Pigeonhole Principle**, at least one sub-hypercube contains infinitely many terms of $(x_n)$.
4. Construct a nested sequence of compact intervals:
   $$I_0 \\supset I_1 \\supset I_2 \\supset \\dots \\supset I_m$$
   with $\\text{diam}(I_m) = 2^{-m} \\text{diam}(I_0) \\to 0$.
5. By Cantor's Intersection Theorem, $\\bigcap_{m=0}^\\infty I_m = \\{x^*\\}$.
6. Select terms $x_{n_m} \\in I_m$ with $n_1 < n_2 < \\dots$, yielding $\\lim_{m \\to \\infty} x_{n_m} = x^*$.`
  },
  {
    id: 'note_sylow_theorems',
    title: "Sylow's Theorems & Finite Group Structure",
    category: 'Abstract Algebra',
    tags: ['Group Theory', 'p-Groups', 'Normal Subgroups', 'Harvard Math 122'],
    isPinned: true,
    updatedAt: new Date().toISOString(),
    content: `### The Three Sylow Theorems

Let $G$ be a finite group of order $|G| = p^k m$, where $p$ is prime and $\\gcd(p, m) = 1$. A subgroup $P \\le G$ of order $p^k$ is called a **Sylow $p$-subgroup**.

#### First Sylow Theorem (Existence):
$G$ contains at least one Sylow $p$-subgroup of order $p^k$.

#### Second Sylow Theorem (Conjugacy):
All Sylow $p$-subgroups of $G$ are **conjugate** to each other:
$$\\forall P_1, P_2 \\in \\text{Syl}_p(G), \\quad \\exists g \\in G : P_2 = g P_1 g^{-1}$$

#### Third Sylow Theorem (Counting):
Let $n_p = |\\text{Syl}_p(G)|$ denote the number of distinct Sylow $p$-subgroups. Then:
1. $n_p \\equiv 1 \\pmod p$
2. $n_p \\mid m$ (divides the prime-free cofactor)`
  },
  {
    id: 'note_cauchy_residue',
    title: 'Cauchy Residue Theorem & Contour Integrals',
    category: 'Calculus & Analysis',
    tags: ['Complex Analysis', 'Holomorphic', 'Poles', 'Residues'],
    isPinned: false,
    updatedAt: new Date().toISOString(),
    content: `### Cauchy's Residue Theorem

Let $U \\subset \\mathbb{C}$ be a simply connected open subset, and let $f$ be holomorphic on $U \\setminus \\{z_1, \\dots, z_n\\}$. Let $\\gamma$ be a positively oriented, simple closed curve in $U$ avoiding all poles.

$$\\oint_\\gamma f(z) \\, dz = 2\\pi i \\sum_{k=1}^n \\text{Res}(f, z_k)$$

#### Calculating Residues:
For a simple pole at $z = z_0$:
$$\\text{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z)$$

For a pole of order $m$:
$$\\text{Res}(f, z_0) = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}} \\left[ (z - z_0)^m f(z) \\right]$$`
  },
  {
    id: 'note_radical_axis',
    title: 'IMO Geometry: Radical Axis & Coaxial Systems',
    category: 'Olympiad Lemmas',
    tags: ['Olympiad', 'Power of a Point', 'Cyclic Quadrilateral', 'Synthetic Geometry'],
    isPinned: false,
    updatedAt: new Date().toISOString(),
    content: `### Radical Axis & Radical Center Theorem

#### Power of a Point:
For a circle $\\omega$ centered at $O$ with radius $R$, the power of point $P$ is:
$$\\mathcal{P}_\\omega(P) = PO^2 - R^2$$

#### The Radical Axis:
The locus of all points $P$ having equal power with respect to two non-concentric circles $\\omega_1, \\omega_2$ is a straight line perpendicular to the line of centers $O_1 O_2$:
$$\\mathcal{P}_{\\omega_1}(P) = \\mathcal{P}_{\\omega_2}(P)$$

#### Radical Center Theorem:
For any three circles $\\omega_1, \\omega_2, \\omega_3$ with non-collinear centers, their three pairwise radical axes are **concurrent** at a single point $K$, called the **Radical Center**.`
  }
];

const CATEGORIES = [
  'Calculus & Analysis',
  'Abstract Algebra',
  'Number Theory',
  'Geometry & Topology',
  'Olympiad Lemmas',
  'Research Notes'
] as const;

export const PersonalNotebook: React.FC = () => {
  const [notes, setNotes] = useState<MathNote[]>(() => {
    try {
      const stored = localStorage.getItem('mathverse_personal_notes');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(DEFAULT_NOTES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editorMode, setEditorMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mathverse_personal_notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  // Quick insertion snippets for math toolbar
  const insertSnippet = (snippet: string) => {
    if (!activeNote) return;
    const updated = notes.map(n => {
      if (n.id === activeNote.id) {
        return {
          ...n,
          content: n.content + '\n' + snippet,
          updatedAt: new Date().toISOString()
        };
      }
      return n;
    });
    setNotes(updated);
    sound.playClick();
  };

  const updateActiveContent = (newContent: string) => {
    setNotes(notes.map(n => n.id === activeNote.id ? { ...n, content: newContent, updatedAt: new Date().toISOString() } : n));
  };

  const updateActiveTitle = (newTitle: string) => {
    setNotes(notes.map(n => n.id === activeNote.id ? { ...n, title: newTitle, updatedAt: new Date().toISOString() } : n));
  };

  const updateActiveCategory = (cat: any) => {
    setNotes(notes.map(n => n.id === activeNote.id ? { ...n, category: cat, updatedAt: new Date().toISOString() } : n));
  };

  const handleCreateNote = () => {
    sound.playSuccess();
    const newNote: MathNote = {
      id: 'note_' + Date.now(),
      title: 'Untitled Mathematical Note',
      category: 'Calculus & Analysis',
      tags: ['New'],
      content: `### New Mathematical Note\n\nWrite your rigorous notes here with LaTeX:\n$$\\int_{-\\infty}^\\infty e^{-x^2} \\, dx = \\sqrt{\\pi}$$\n\n- Define axioms\n- Formulate propositions\n- State step-by-step proofs`,
      isPinned: false,
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    if (notes.length <= 1) return;
    sound.playClick();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id) {
      setActiveNoteId(filtered[0].id);
    }
  };

  const togglePin = (id: string) => {
    sound.playClick();
    setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const handleExportJSON = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'mathverse_research_notebook.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter notes
  const filteredNotes = notes.filter(n => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  }).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <BookMarked size={16} /> Research-Grade LaTeX Notebook
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-cinzel">
            Personal Mathematical Notebook
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Record theorem proofs, lemma collections, research notes, and olympiad problem diaries with real-time KaTeX rendering, full persistence, and categorized indexing.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <button
            onClick={handleCreateNote}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/25"
          >
            <Plus size={16} />
            <span>New Note</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-2xl text-xs font-bold border border-slate-800 transition-all flex items-center gap-2"
          >
            <Download size={14} />
            <span>Export Notes (.json)</span>
          </button>

          <span className="text-xs text-slate-500 ml-auto">
            {notes.length} research entries saved locally
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Note Browser (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Filter */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-3">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
              <Search size={14} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search notes, formulas, theorems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-xs w-full outline-none placeholder:text-slate-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1">
              {['All', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredNotes.map(note => {
              const isActive = note.id === activeNote?.id;
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveNoteId(note.id);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    isActive
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">
                      {note.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(note.id);
                      }}
                      className={`text-slate-500 hover:text-amber-400 transition-colors ${note.isPinned ? 'text-amber-400' : ''}`}
                    >
                      <Pin size={13} className={note.isPinned ? 'fill-amber-400' : ''} />
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-white line-clamp-1">{note.title}</h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {note.content.replace(/[#*`$\\]/g, '')}
                  </p>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[9px] text-slate-500">
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="truncate">{note.tags.join(', ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Note Editor & Live Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeNote ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
              {/* Note Header & Settings */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <input
                  type="text"
                  value={activeNote.title}
                  onChange={(e) => updateActiveTitle(e.target.value)}
                  className="bg-transparent text-xl md:text-2xl font-black text-white outline-none w-full border-b border-transparent focus:border-indigo-500 transition-colors"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={activeNote.category}
                    onChange={(e) => updateActiveCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-indigo-300 font-medium outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setEditorMode('edit')}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                        editorMode === 'edit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Raw
                    </button>
                    <button
                      onClick={() => setEditorMode('split')}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                        editorMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Split
                    </button>
                    <button
                      onClick={() => setEditorMode('preview')}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                        editorMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(activeNote.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* LaTeX Snippet Insertion Bar */}
              <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-800/60 overflow-x-auto">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">Insert:</span>
                {[
                  { label: '∫ Integral', code: '$$\\int_{a}^{b} f(x) \\, dx$$' },
                  { label: '∑ Sum', code: '$$\\sum_{k=1}^{\\infty} a_k$$' },
                  { label: 'lim Limit', code: '$$\\lim_{x \\to x_0} \\frac{f(x)}{g(x)}$$' },
                  { label: 'Matrix', code: '$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$' },
                  { label: '∀ ∀x', code: '$\\forall x \\in \\mathbb{R}, \\exists \\epsilon > 0$' },
                  { label: '⇒ Implies', code: '$$A \\implies B$$' },
                  { label: 'R Numbers', code: '$\\mathbb{R}, \\mathbb{C}, \\mathbb{Z}, \\mathbb{N}$' },
                  { label: 'Fraction', code: '$$\\frac{a}{b}$$' }
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => insertSnippet(item.code)}
                    className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-indigo-300 hover:border-indigo-500 text-[10px] font-mono transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Editor / Preview Area */}
              <div className={`grid gap-4 ${editorMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Textarea (Visible in edit or split) */}
                {(editorMode === 'edit' || editorMode === 'split') && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Markdown & LaTeX Source
                    </span>
                    <textarea
                      value={activeNote.content}
                      onChange={(e) => updateActiveContent(e.target.value)}
                      className="w-full h-[460px] p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 font-mono text-xs leading-relaxed outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar"
                      placeholder="Type formulas like $\int f(x)dx$ and markdown..."
                    />
                  </div>
                )}

                {/* Rendered Preview (Visible in preview or split) */}
                {(editorMode === 'preview' || editorMode === 'split') && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                      Live KaTeX & Markdown Rendering
                    </span>
                    <div className="w-full h-[460px] p-5 bg-slate-950/60 border border-slate-800 rounded-2xl overflow-y-auto text-xs text-slate-200 leading-relaxed custom-scrollbar prose prose-invert max-w-none">
                      <NoteRenderer content={activeNote.content} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 border border-slate-800 rounded-3xl">
              Select or create a note to begin researching.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Markdown & KaTeX Parser & Renderer Component
const NoteRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Split into blocks by double newlines or headers
  const lines = content.split('\n');

  return (
    <div className="space-y-3">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base font-bold text-indigo-300 mt-3 pb-1 border-b border-slate-800">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }
        // Header 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-xs font-bold text-amber-300 uppercase tracking-wider mt-2">
              {trimmed.replace('#### ', '')}
            </h4>
          );
        }
        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-2 border-indigo-500 pl-3 italic text-slate-300 my-2 bg-indigo-950/20 py-1.5 rounded-r-lg">
              <ParseMathLine text={trimmed.replace('> ', '')} />
            </blockquote>
          );
        }
        // Display Math $$...$$
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
          const math = trimmed.substring(2, trimmed.length - 2);
          return (
            <div key={idx} className="my-2.5 p-2 bg-slate-900 rounded-xl text-center border border-slate-800">
              <MathView math={math} block />
            </div>
          );
        }
        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 text-slate-300 pl-2">
              <span className="text-indigo-400 mt-1">•</span>
              <div>
                <ParseMathLine text={trimmed.substring(2)} />
              </div>
            </div>
          );
        }
        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 text-slate-300 pl-2">
              <span className="text-amber-400 font-mono text-[11px] font-bold mt-0.5">{numMatch[1]}.</span>
              <div>
                <ParseMathLine text={numMatch[2]} />
              </div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-300 leading-relaxed">
            <ParseMathLine text={line} />
          </p>
        );
      })}
    </div>
  );
};

// Parse inline math ($...$) and bolding (**...**)
const ParseMathLine: React.FC<{ text: string }> = ({ text }) => {
  // Split on $...$
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const math = part.substring(1, part.length - 1);
          return <MathView key={i} math={math} inline />;
        }
        // Parse bold
        if (part.includes('**')) {
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return (
            <span key={i}>
              {boldParts.map((bp, j) => {
                if (bp.startsWith('**') && bp.endsWith('**')) {
                  return <strong key={j} className="text-white font-bold">{bp.slice(2, -2)}</strong>;
                }
                return bp;
              })}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};
