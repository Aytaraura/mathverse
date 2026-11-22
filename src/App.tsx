import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';

// Major Core Modules
import { FormulaLibrary } from './components/formulas/FormulaLibrary';
import { GeometryUniverse } from './components/geometry/GeometryUniverse';
import { TopicQuizCenter } from './components/quizzes/TopicQuizCenter';
import { MathverseAI } from './components/ai/MathverseAI';
import { GraphingStudio } from './components/tools/GraphingStudio';
import { DiscoveryLab } from './components/features/DiscoveryLab';
import { PersonalNotebook } from './components/features/PersonalNotebook';

// Classical Mathverse Sections
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
  const [activeTab, setActiveTab] = useState<string>('formula_library');
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
      // ─── UPGRADE CORE SECTIONS ───
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
      case 'graphing_studio':
        return <GraphingStudio />;
      case 'discovery_lab':
        return <DiscoveryLab />;
      case 'personal_notebook':
        return <PersonalNotebook />;

      // ─── CLASSICAL & ADVANCED MATHVERSE SECTIONS ───
      case 'universe':
        return (
          <div className="space-y-6">
            <MathUniverse3D onSelectRealm={(name) => {
              if (name.includes('Calculus')) setActiveTab('calculus_academy');
              else if (name.includes('Algebra') || name.includes('Number') || name.includes('Geometric')) setActiveTab('all_subjects');
            }} />
          </div>
        );
      case 'visual_3d':
        return <VisualMath3D />;
      case 'all_subjects':
        return (
          <AllSubjectsAtlas
            onAskAI={handleLaunchAI}
            onLaunchQuiz={handleLaunchQuiz}
          />
        );
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
      case 'bosses':
        return <BossBattle />;
      case 'duels':
        return <MathDuel />;
      case 'olympiad':
        return <OlympiadCenter />;
      case 'formula_battle':
        return <FormulaBattle />;
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
          <FormulaLibrary
            onNavigateAI={handleLaunchAI}
            onNavigateQuiz={handleLaunchQuiz}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
      
      <div className="flex flex-1 overflow-hidden">
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
