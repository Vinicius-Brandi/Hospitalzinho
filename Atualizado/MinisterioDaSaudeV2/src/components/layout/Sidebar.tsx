import React from 'react';
import { LayoutDashboard, Building2, Activity, X, Pill, PlusCircle, PieChart, ClipboardList } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: 'dashboard' | 'lista' | 'medicamentos' | 'cadastro' | 'relatorios' | 'pacientes') => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-64 bg-white border-r border-slate-200 flex-col fixed h-full z-30 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:flex
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-800">Saúde+</h1>
              <p className="text-xs text-slate-400">Região de Marília</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-500 hover:text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => { onNavigate('dashboard'); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard Geral
          </button>

          <button
            onClick={() => { onNavigate('lista'); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'lista' || currentView === 'detalhe' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Building2 className="w-5 h-5" />
            Unidades de Saúde
          </button>

          <button
            onClick={() => { onNavigate('medicamentos'); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'medicamentos' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Pill className="w-5 h-5" />
            Medicamentos
          </button>

          <button
            onClick={() => { onNavigate('pacientes'); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'pacientes' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <ClipboardList className="w-5 h-5" />
            Prontuários
          </button>

          <button
            onClick={() => { onNavigate('relatorios'); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'relatorios' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <PieChart className="w-5 h-5" />
            Relatórios & Indicadores
          </button>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Administrativo
            </p>
            <button
              onClick={() => { onNavigate('cadastro'); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'cadastro' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <PlusCircle className="w-5 h-5" />
              Novo Cadastro
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              AS
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Admin. Saúde</p>
              <p className="text-xs text-slate-400">Secretaria Municipal</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};