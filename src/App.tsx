import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { CosmicBackgroundCanvas } from './components/universe/CosmicBackgroundCanvas';

// Major Core Modules
import { FormulaLibrary } from './components/formulas/FormulaLibrary';
import { GeometryUniverse } from './components/geometry/GeometryUniverse';
import { TopicQuizCenter } from './components/quizzes/TopicQuizCenter';
import { MathverseAI } from './components/ai/MathverseAI';
import { GraphingStudio } from './components/tools/GraphingStudio';
import { DiscoveryLab } from './components/features/DiscoveryLab';
import { PersonalNotebook } from './components/features/PersonalNotebook';

// Classical & 3D Mathverse Sections
import { MathUniverse3D } from './components/universe/MathUniverse3D';
import { VisualMath3D } from './components/universe/VisualMath3D';
import { AllSubjectsAtlas } from './components/features/AllSubjectsAtlas';

import { CalculusAcademy } from './components/calculus/CalculusAcademy';
import { CalculusExamCenter } from './components/calculus/CalculusExamCenter';
import { DerivativeVisualizer } from './components/calculus/DerivativeVisualizer';
import { IntegralVisualizer } from './components/calculus/IntegralVisualizer';
import { FtcExplorer } from './components/calculus/FtcExplorer';
import { CalculusActiveRecall } from './components/calculus/CalculusActiveRecall';

import { BossBattle } from './components/battles/BossBattle';
import { MathDuel } from './components/battles/MathDuel';
import { OlympiadCenter } from './components/olympiad/OlympiadCenter';
import { FormulaBattle } from './components/features/FormulaBattle';

import { SocraticTutor } from './components/features/SocraticTutor';
import { MathDetective } from './components/features/MathDetective';
import { ProofArena } from './components/features/ProofArena';
import { DailyMystery } from './components/features/DailyMystery';

import { Sandbox } from './components/tools/Sandbox';
import { MathToolbox } from './components/tools/MathToolbox';
import { VisualMathLibrary } from './components/features/VisualMathLibrary';

import { StudentDashboard } from './components/features/StudentDashboard';
import { ErrorAnalysisCenter } from './components/features/ErrorAnalysisCenter';
import { ExamPredictor } from './components/features/ExamPredictor';
import { LearningPathGenerator } from './components/features/LearningPathGenerator';
import { MathEncyclopedia } from './components/features/MathEncyclopedia';
import { ResearchExplorer } from './components/features/ResearchExplorer';

export const App: React.FC = () => {
  // Start on 3D Cosmic Continuum by default
  const [activeTab, setActiveTab] = useState<string>('universe');
  const [cosmicBgEnabled, setCosmicBgEnabled] = useState<boolean>(true);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [quizTopic, setQuizTopic] = useState<string>('all');

  const handleLaunchAI = (prompt: string) => {
    setAiPrompt(prompt);
    setActiveTab('mathverse_ai');
  };

  const handleLaunchQuiz = (subject: string) => {
    setQuizTopic(subject);
    setActiveTab('topic_quizzes');
  };

  const renderContent = () => {
    switch (activeTab) {
      // ─── COSMIC 3D & CORE UPGRADE ───
      case 'universe':
        return (
          <div className="space-y-6">
            <MathUniverse3D onSelectRealm={(name) => {
              if (name.includes('Calculus')) setActiveTab('calculus_academy');
              else if (name.includes('Calabi') || name.includes('Manifold')) setActiveTab('visual_3d');
              else if (name.includes('Torus') || name.includes('Knot')) setActiveTab('formula_library');
              else if (name.includes('Hypercube') || name.includes('Tesseract')) setActiveTab('geometry_universe');
              else if (name.includes('Stellated')) setActiveTab('discovery_lab');
              else if (name.includes('Riemann')) setActiveTab('graphing_studio');
              else setActiveTab('all_subjects');
            }} />
          </div>
        );
      case 'visual_3d':
        return <VisualMath3D />;
      case 'graphing_studio':
        return <GraphingStudio />;
      case 'discovery_lab':
        return <DiscoveryLab />;
      case 'personal_notebook':
        return <PersonalNotebook />;
      case 'formula_library':
        return (
          <FormulaLibrary
            onNavigateAI={handleLaunchAI}
            onNavigateQuiz={handleLaunchQuiz}
          />
        );
      case 'mathverse_ai':
        return (
          <MathverseAI
            initialPrompt={aiPrompt}
            onNavigateTopic={(tab) => setActiveTab(tab)}
          />
        );
      case 'geometry_universe':
        return <GeometryUniverse />;
      case 'topic_quizzes':
        return (
          <TopicQuizCenter
            initialTopicId={quizTopic}
            onAskAI={handleLaunchAI}
            onNavigateTopic={(tab) => setActiveTab(tab)}
          />
        );
      case 'all_subjects':
        return (
          <AllSubjectsAtlas
            onAskAI={handleLaunchAI}
            onLaunchQuiz={handleLaunchQuiz}
          />
        );

      // ─── CALCULUS ACADEMY ───
      case 'calculus_academy':
        return <CalculusAcademy onLaunchExam={() => setActiveTab('calculus_exams')} />;
      case 'calculus_exams':
        return <CalculusExamCenter />;
      case 'derivative_lab':
        return <DerivativeVisualizer />;
      case 'integral_lab':
        return <IntegralVisualizer />;
      case 'ftc_lab':
        return <FtcExplorer />;
      case 'active_recall':
        return <CalculusActiveRecall />;

      // ─── COMPETITIONS & BATTLES ───
      case 'bosses':
        return <BossBattle />;
      case 'duels':
        return <MathDuel />;
      case 'olympiad':
        return <OlympiadCenter />;
      case 'formula_battle':
        return <FormulaBattle />;

      // ─── DEDUCTION & TOOLS ───
      case 'tutor':
        return <SocraticTutor />;
      case 'detective':
        return <MathDetective />;
      case 'proof_arena':
        return <ProofArena />;
      case 'daily_mystery':
        return <DailyMystery />;
      case 'sandbox':
        return <Sandbox />;
      case 'toolbox':
        return <MathToolbox />;
      case 'visual_library':
        return <VisualMathLibrary />;

      // ─── ANALYTICS & DOSSIER ───
      case 'dashboard':
        return <StudentDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'error_analysis':
        return <ErrorAnalysisCenter />;
      case 'predictor':
        return <ExamPredictor />;
      case 'pathway':
        return <LearningPathGenerator />;
      case 'encyclopedia':
        return <MathEncyclopedia />;
      case 'research':
        return <ResearchExplorer />;
      default:
        return (
          <MathUniverse3D onSelectRealm={(name) => {
            if (name.includes('Calculus')) setActiveTab('calculus_academy');
            else setActiveTab('all_subjects');
          }} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030208] text-slate-100 flex flex-col font-sans relative selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      {/* Real-Time Ambient 3D Cosmic WebGL Background */}
      <CosmicBackgroundCanvas enabled={cosmicBgEnabled} />

      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        cosmicBgEnabled={cosmicBgEnabled}
        onToggleCosmicBg={() => setCosmicBgEnabled(!cosmicBgEnabled)}
      />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
