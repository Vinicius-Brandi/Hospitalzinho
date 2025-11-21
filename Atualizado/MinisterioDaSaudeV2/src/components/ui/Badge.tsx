import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tipo: 'success' | 'warning' | 'danger' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, tipo }) => {
  const cores = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cores[tipo]}`}>
      {children}
    </span>
  );
};