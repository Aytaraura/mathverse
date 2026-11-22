import React, { useState, useRef, useEffect } from 'react';
import { MathAIMessage, solveMathOffline, analyzeStudentWork } from '../../services/aiMathService';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  Bot, Send, Sparkles, Brain, Lightbulb, RotateCcw,
  AlertTriangle, CheckCircle2, ShieldCheck, HelpCircle,
  Edit3, PenTool, Image as ImageIcon, Sliders, ChevronDown
} from 'lucide-react';

interface MathverseAIProps {
  initialPrompt?: string;
  onNavigateTopic?: (tab: string) => void;
}

export const MathverseAI: React.FC<MathverseAIProps> = ({ initialPrompt, onNavigateTopic }) => {
  const [messages, setMessages] = useState<MathAIMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: 'Greetings! I am **Hypatia AI**, your dedicated free mathematical assistant. I can solve arithmetic, algebra, geometry, trigonometry, calculus, and Olympiad problems with full step-by-step proofs, hints, and error detection.',
      latex: '\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{and} \\quad \\frac{d}{dx}[\\sin x] = \\cos x',
      hints: [
        'Type any math problem, or ask me to derive or explain any theorem.',
        'Use "Check My Work" to paste your calculations and let me pinpoint any errors.'
      ],
      timestamp: Date.now()
    }
  ]);

  const [inputText, setInputText] = useState(initialPrompt || '');
  const [explanationMode, setExplanationMode] = useState<'simple' | 'advanced'>('advanced');
  const [isErrorDetectorMode, setIsErrorDetectorMode] = useState(false);
  const [showSketchCanvas, setShowSketchCanvas] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const sketchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Sketch Canvas Drawing
  useEffect(() => {
    if (!showSketchCanvas) return;
    const canvas = sketchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const getPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startDraw = (e: MouseEvent) => {
      setIsDrawing(true);
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const doDraw = (e: MouseEvent) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', doDraw);
    window.addEventListener('mouseup', stopDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', doDraw);
      window.removeEventListener('mouseup', stopDraw);
    };
  }, [showSketchCanvas, isDrawing]);

  const clearSketch = () => {
    const canvas = sketchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    sound.playClick();
    const userMsgId = 'user_' + Date.now();
    const newMsg: MathAIMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Solve query using offline multi-tier mathematical engine
    setTimeout(() => {
      let botResponse: MathAIMessage;

      if (isErrorDetectorMode) {
        const analysis = analyzeStudentWork(text);
        botResponse = {
          id: 'bot_' + Date.now(),
          sender: 'assistant',
          text: analysis.hasError
            ? `**Error Detected in Your Work:**\n\n${analysis.explanation}`
            : `**Verified Work:**\n\n${analysis.explanation}`,
          latex: analysis.correction,
          errorAnalysis: analysis,
          hints: ['Always double-check signs when applying the product rule or expanding binomials.'],
          timestamp: Date.now()
        };
      } else {
        const result = solveMathOffline(text, explanationMode);
        botResponse = {
          id: 'bot_' + Date.now(),
          sender: 'assistant',
          text: result.text,
          latex: result.latex,
          steps: result.steps,
          hints: result.hints,
          alternativeSolution: result.alternativeSolution,
          timestamp: Date.now()
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      sound.playSuccess();
    }, 450);
  };

  const insertMathSymbol = (sym: string) => {
    sound.playClick();
    setInputText(prev => prev + ' ' + sym + ' ');
  };

  const handleRevealNextHint = (msgId: string, totalHints: number) => {
    sound.playClick();
    setRevealedHints(prev => ({
      ...prev,
      [msgId]: Math.min((prev[msgId] || 0) + 1, totalHints)
    }));
  };

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
              <Bot size={14} /> Hypatia AI Math Assistant
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              100% Free & Unlimited
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Conversational Mathematical Problem Solver
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Ask any question across arithmetic, algebra, geometry, trigonometry, calculus, and Olympiad mathematics. Includes step-by-step solutions, hint requests, and student work error detection.
          </p>
        </div>

        {/* Mode Toggles */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setExplanationMode(explanationMode === 'simple' ? 'advanced' : 'simple');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              explanationMode === 'simple'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
            }`}
          >
            Level: {explanationMode === 'simple' ? 'Simple (High School)' : 'Rigorous (College/Olympiad)'}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsErrorDetectorMode(!isErrorDetectorMode);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isErrorDetectorMode
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck size={13} />
            <span>Check My Work Mode</span>
          </button>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Messages Section */}
        <div className="lg:col-span-3 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col h-[650px] overflow-hidden">
          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-600/20 mt-1">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-2xl p-5 rounded-3xl space-y-3 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-sm shadow-lg'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* MathView KaTeX Display */}
                  {msg.latex && (
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center my-2 overflow-x-auto">
                      <MathView math={msg.latex} block />
                    </div>
                  )}

                  {/* Step-by-Step Breakdown */}
                  {msg.steps && msg.steps.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                        Step-by-Step Solution Breakdown
                      </span>
                      {msg.steps.map(step => (
                        <div key={step.stepNum} className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 flex items-start gap-2.5 text-xs">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {step.stepNum}
                          </span>
                          <div className="space-y-1 flex-1">
                            <div>{step.instruction}</div>
                            {step.mathLatex && (
                              <div className="p-2 rounded-lg bg-slate-950 text-indigo-300 font-mono">
                                <MathView math={step.mathLatex} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Alternative Method if Available */}
                  {msg.alternativeSolution && (
                    <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">
                        Alternative Method: {msg.alternativeSolution.methodName}
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                        {msg.alternativeSolution.steps.map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ul>
                      {msg.alternativeSolution.latex && (
                        <div className="text-center py-1">
                          <MathView math={msg.alternativeSolution.latex} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hint Mode Controls */}
                  {msg.hints && msg.hints.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Lightbulb size={12} /> Hints Available ({(revealedHints[msg.id] || 0)} / {msg.hints.length})
                        </span>
                        {(revealedHints[msg.id] || 0) < msg.hints.length && (
                          <button
                            onClick={() => handleRevealNextHint(msg.id, msg.hints!.length)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold transition-colors"
                          >
                            Give Me Hint {(revealedHints[msg.id] || 0) + 1}
                          </button>
                        )}
                      </div>

                      {/* Revealed hints list */}
                      {(revealedHints[msg.id] || 0) > 0 && (
                        <div className="space-y-1.5">
                          {msg.hints.slice(0, revealedHints[msg.id]).map((hint, hIdx) => (
                            <div key={hIdx} className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200">
                              <strong>Hint {hIdx + 1}:</strong> {hint}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold p-2">
                <Sparkles size={14} className="animate-spin" />
                <span>Hypatia is analyzing and generating step-by-step mathematical steps...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Virtual Math Toolbar */}
          <div className="px-6 py-2 bg-slate-950 border-t border-slate-850 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0 custom-scrollbar">
            <span className="text-[10px] font-bold uppercase text-slate-500 mr-1">Insert:</span>
            {[
              { label: 'x²', val: 'x^2' },
              { label: '√x', val: '\\sqrt{x}' },
              { label: '∫', val: '\\int' },
              { label: 'd/dx', val: '\\frac{d}{dx}' },
              { label: 'sin(x)', val: '\\sin(x)' },
              { label: 'cos(x)', val: '\\cos(x)' },
              { label: 'π', val: '\\pi' },
              { label: 'θ', val: '\\theta' },
              { label: '∑', val: '\\sum' },
              { label: 'lim', val: '\\lim_{x\\to 0}' }
            ].map((sym, idx) => (
              <button
                key={idx}
                onClick={() => insertMathSymbol(sym.val)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-800 transition-colors shrink-0"
              >
                {sym.label}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSketchCanvas(!showSketchCanvas)}
              className={`p-2.5 rounded-2xl border transition-colors ${
                showSketchCanvas
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle Geometry Drawing Canvas"
            >
              <PenTool size={16} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={
                isErrorDetectorMode
                  ? 'Paste your calculation steps to check for errors (e.g. "(a+b)^2 = a^2 + b^2")...'
                  : 'Type your math problem, formula inquiry, or derivative query...'
              }
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/30"
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* Sidebar Tools: Sketch Canvas & Quick Prompts */}
        <div className="space-y-6">
          {/* Sketch Canvas Modal / Panel */}
          {showSketchCanvas && (
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <PenTool size={14} className="text-purple-400" />
                  Geometric Sketchboard
                </span>
                <button
                  onClick={clearSketch}
                  className="text-slate-400 hover:text-rose-400 text-[11px]"
                >
                  Clear
                </button>
              </div>

              <canvas
                ref={sketchCanvasRef}
                width={260}
                height={200}
                className="w-full h-[200px] rounded-2xl bg-slate-950 border border-slate-850 cursor-crosshair shadow-inner"
              />

              <p className="text-[11px] text-slate-400">
                Draw triangle angles, right triangles, or circle diagrams to visualize problems alongside Hypatia.
              </p>
            </div>
          )}

          {/* Prompt Templates */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Quick Math Inquiries
            </span>
            <div className="space-y-2">
              {[
                'Derive the derivative of sin(x) using limits',
                'Show step-by-step integration of x * e^x',
                'Explain Cauchy-Schwarz in simple terms',
                'What is the formula for the volume of a sphere?',
                'Check my work: d/dx[cos x] = sin x'
              ].map((query, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => handleSendMessage(query)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-xs text-slate-300 transition-colors leading-relaxed"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
