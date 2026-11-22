import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch {
      return `<span class="font-mono text-amber-300">${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`katex-block my-3 overflow-x-auto text-center py-2 text-indigo-100 ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <span 
      className={`katex-inline inline-block text-indigo-100 mx-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
