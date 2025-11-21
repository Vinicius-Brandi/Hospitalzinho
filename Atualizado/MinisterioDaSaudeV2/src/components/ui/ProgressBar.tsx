import React from 'react';

interface ProgressBarProps {
  valor: number;
  max: number;
  cor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ valor, max, cor = "bg-blue-600" }) => {
  const porcentagem = max > 0 ? Math.min(100, Math.max(0, (valor / max) * 100)) : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
      <div className={`${cor} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${porcentagem}%` }}></div>
    </div>
  );
};