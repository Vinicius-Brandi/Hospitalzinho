import React, { useState, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { type Hospital, TipoUnidade } from '../types';
import { getNomeTipoUnidade } from '../utils/formatters';
import { Badge } from '../components/ui/Badge';

interface HospitaisListProps {
  hospitais: Hospital[];
  onSelectHospital: (id: string) => void;
  cidades: string[];
}

export const HospitaisList: React.FC<HospitaisListProps> = ({ hospitais, onSelectHospital, cidades }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  const hospitaisFiltrados = useMemo(() => {
    return hospitais.filter(h => {
      const matchTexto = h.nome.toLowerCase().includes(filtroTexto.toLowerCase()) || h.cnes.includes(filtroTexto);
      const matchCidade = filtroCidade ? h.cidade === filtroCidade : true;
      const matchTipo = filtroTipo !== '' ? h.tipo === parseInt(filtroTipo) : true;
      return matchTexto && matchCidade && matchTipo;
    });
  }, [filtroTexto, filtroCidade, filtroTipo, hospitais]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por Nome ou CNES..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-slate-200 rounded-lg bg-white"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          {Object.values(TipoUnidade).map(v => (
            <option key={v} value={v}>{getNomeTipoUnidade(v)}</option>
          ))}
        </select>
        <select 
          className="px-4 py-2 border border-slate-200 rounded-lg bg-white"
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
        >
          <option value="">Todas Cidades</option>
          {cidades.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hospitaisFiltrados.map(hospital => (
          <div key={hospital.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col">
            <div className="flex justify-between mb-2">
              <Badge tipo="info">{hospital.cidade}</Badge>
              <span className="text-xs text-slate-400 font-mono">CNES: {hospital.cnes}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{hospital.nome}</h3>
            <p className="text-sm text-slate-500 mb-4">{getNomeTipoUnidade(hospital.tipo)}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
              <button 
                onClick={() => onSelectHospital(hospital.id)}
                className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                Ver Detalhes <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {hospitaisFiltrados.length === 0 && (
           <div className="col-span-full text-center py-8 text-slate-500">
             Nenhum hospital encontrado.
           </div>
        )}
      </div>
    </div>
  );
};