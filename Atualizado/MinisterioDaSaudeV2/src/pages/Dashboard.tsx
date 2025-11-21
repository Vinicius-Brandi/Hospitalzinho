import React from 'react';
import { Building2, Activity, Stethoscope, AlertTriangle } from 'lucide-react';
import { type EstatisticasGerais, type Hospital } from '../types';
import { ProgressBar } from '../components/ui/ProgressBar';

interface DashboardProps {
  estatisticas: EstatisticasGerais;
  hospitais: Hospital[];
}

export const Dashboard: React.FC<DashboardProps> = ({ estatisticas, hospitais }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Unidades</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{estatisticas.totalUnidades}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Ocupação Global</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{estatisticas.ocupacaoMedia.toFixed(1)}%</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <ProgressBar 
            valor={estatisticas.ocupacaoMedia} 
            max={100} 
            cor={estatisticas.ocupacaoMedia > 80 ? 'bg-red-500' : 'bg-green-500'} 
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Leitos Totais</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{estatisticas.totalLeitos}</h3>
              <p className="text-xs text-slate-400 mt-1">{estatisticas.leitosOcupados} ocupados</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Stethoscope className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Alertas Estoque</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{estatisticas.alertasEstoque}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold mb-4 text-slate-800">Ocupação por Hospital</h3>
          <div className="space-y-4">
            {hospitais.slice(0, 5).map(h => (
              <div key={h.id} className="flex items-center">
                <div className="w-1/3 truncate text-sm font-medium text-slate-600 pr-2">{h.nome}</div>
                <div className="w-2/3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{h.leitosOcupados} / {h.leitosTotais}</span>
                    <span>{h.leitosTotais > 0 ? ((h.leitosOcupados/h.leitosTotais)*100).toFixed(0) : 0}%</span>
                  </div>
                  <ProgressBar valor={h.leitosOcupados} max={h.leitosTotais || 1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold mb-4 text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Estoque Crítico
          </h3>
          <div className="space-y-3">
            {hospitais.flatMap(h => h.estoque.filter(m => m.estoqueAtual < m.estoqueMinimo).map(m => ({...m, hospital: h.nome}))).slice(0, 5).map((alerta, i) => (
              <div key={i} className="flex items-start space-x-3 p-2 bg-red-50 rounded-lg">
                 <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                 <div>
                    <p className="text-sm font-bold text-red-800">{alerta.nome}</p>
                    <p className="text-xs text-red-600">{alerta.hospital} • {alerta.estoqueAtual} un.</p>
                 </div>
              </div>
            ))}
            {estatisticas.alertasEstoque === 0 && (
              <p className="text-sm text-green-600 text-center py-2">Nenhum alerta.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};