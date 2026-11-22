import { FormulaItem, FormulaSubject, FormulaDifficulty } from '../../types/formulas';
import { arithmeticFormulas } from './arithmeticFormulas';
import { algebraFormulas } from './algebraFormulas';
import { geometryFormulas } from './geometryFormulas';
import { trigonometryFormulas } from './trigonometryFormulas';
import { differentialCalculusFormulas } from './differentialCalculusFormulas';
import { integralCalculusFormulas } from './integralCalculusFormulas';
import { advancedMathFormulas } from './advancedMathFormulas';
import { olympiadFormulas } from './olympiadFormulas';

export const allFormulas: FormulaItem[] = [
  ...arithmeticFormulas,
  ...algebraFormulas,
  ...geometryFormulas,
  ...trigonometryFormulas,
  ...differentialCalculusFormulas,
  ...integralCalculusFormulas,
  ...advancedMathFormulas,
  ...olympiadFormulas
];

export const formulaSubjects: { id: FormulaSubject | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Subjects', icon: 'Sparkles' },
  { id: 'arithmetic', label: 'Arithmetic', icon: 'Hash' },
  { id: 'algebra', label: 'Algebra', icon: 'Variable' },
  { id: 'geometry', label: 'Geometry (2D & 3D)', icon: 'Triangle' },
  { id: 'trigonometry', label: 'Trigonometry', icon: 'Compass' },
  { id: 'differential_calculus', label: 'Differential Calculus', icon: 'Zap' },
  { id: 'integral_calculus', label: 'Integral Calculus', icon: 'Sigma' },
  { id: 'advanced_math', label: 'Advanced Mathematics', icon: 'Grid' },
  { id: 'olympiad', label: 'Olympiad Theorems', icon: 'Trophy' }
];

export const formulaDifficulties: FormulaDifficulty[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

/**
 * Smart Natural Search across:
 * - Formula Name
 * - Topic & Category
 * - Search Keywords (e.g. "derivative of sin x", "area of trapezoid")
 * - Mathematical symbols in LaTeX
 * - Variables & conditions
 */
export function searchFormulas(
  query: string,
  options?: {
    subject?: FormulaSubject | 'all';
    difficulty?: FormulaDifficulty | 'all';
    favorites?: string[];
    onlyFavorites?: boolean;
    recentlyViewed?: string[];
    onlyRecent?: boolean;
    category?: string;
  }
): FormulaItem[] {
  const cleanQ = query.trim().toLowerCase();
  
  return allFormulas.filter(item => {
    // Subject filter
    if (options?.subject && options.subject !== 'all' && item.subject !== options.subject) {
      return false;
    }

    // Difficulty filter
    if (options?.difficulty && options.difficulty !== 'all' && item.difficulty !== options.difficulty) {
      return false;
    }

    // Category filter
    if (options?.category && options.category !== 'all' && item.category !== options.category) {
      return false;
    }

    // Favorites filter
    if (options?.onlyFavorites) {
      if (!options.favorites?.includes(item.id)) return false;
    }

    // Recent filter
    if (options?.onlyRecent) {
      if (!options.recentlyViewed?.includes(item.id)) return false;
    }

    // If no query, pass
    if (!cleanQ) return true;

    // Search query matching
    const matchName = item.name.toLowerCase().includes(cleanQ);
    const matchTopic = item.topic.toLowerCase().includes(cleanQ);
    const matchCategory = item.category.toLowerCase().includes(cleanQ);
    const matchKeywords = item.searchKeywords.some(k => k.toLowerCase().includes(cleanQ));
    const matchLatex = item.latex.toLowerCase().includes(cleanQ);
    const matchWhenToUse = item.whenToUse.toLowerCase().includes(cleanQ);
    const matchVariables = item.variables.some(v => 
      v.symbol.toLowerCase().includes(cleanQ) || 
      v.name.toLowerCase().includes(cleanQ) ||
      v.meaning.toLowerCase().includes(cleanQ)
    );

    // Natural synonyms/queries mapping
    const naturalSynonyms: Record<string, string[]> = {
      'derivative of sin': ['diff_trigonometric'],
      'derivative of cos': ['diff_trigonometric'],
      'derivative of tan': ['diff_trigonometric'],
      'integration by parts': ['integ_by_parts'],
      'area of a trapezoid': ['geom_trapezoid'],
      'area of trapezoid': ['geom_trapezoid'],
      'quadratic formula': ['alg_quadratic_formula'],
      'cauchy schwarz': ['olympiad_cauchy_schwarz'],
      'cauchy-schwarz': ['olympiad_cauchy_schwarz'],
      'volume of a sphere': ['geom_sphere_hemisphere'],
      'volume of sphere': ['geom_sphere_hemisphere'],
      'pythagoras': ['geom_pythagorean_theorem'],
      'pythagorean': ['geom_pythagorean_theorem'],
      'am gm': ['olympiad_am_gm'],
      'am-gm': ['olympiad_am_gm'],
      'fermat': ['olympiad_flt_euler_totient'],
      'bayes': ['adv_probability_bayes'],
      'heron': ['geom_heron_formula'],
      'euler line': ['geom_triangle_centers_euler_line'],
      'euler polyhedra': ['olympiad_stewart_power_point'],
      'fundamental theorem of calculus': ['integ_ftc_theorems'],
      'ftc': ['integ_ftc_theorems'],
      'product rule': ['diff_product_quotient'],
      'quotient rule': ['diff_product_quotient'],
      'chain rule': ['diff_chain_rule'],
      'sine rule': ['trig_law_of_sines'],
      'cosine rule': ['trig_law_of_cosines'],
      'soh cah toa': ['trig_soh_cah_toa']
    };

    for (const [key, ids] of Object.entries(naturalSynonyms)) {
      if (cleanQ.includes(key) && ids.includes(item.id)) {
        return true;
      }
    }

    return (
      matchName ||
      matchTopic ||
      matchCategory ||
      matchKeywords ||
      matchLatex ||
      matchWhenToUse ||
      matchVariables
    );
  });
}
