import React, { useState, useMemo } from 'react';
import { Search, Pill, MapPin, AlertCircle } from 'lucide-react';
import { type Hospital, type Medicamento } from '../types';
import { Badge } from '../components/ui/Badge';

interface MedicamentosSearchProps {
  hospitais: Hospital[];
  onSelectHospital: (id: string) => void;
}

interface ResultadoBusca {
  hospitalId: string;
  hospitalNome: string;
  hospitalCidade: string;
  medicamento: Medicamento;
}

export const MedicamentosSearch: React.FC<MedicamentosSearchProps> = ({ hospitais, onSelectHospital }) => {
  const [termo, setTermo] = useState('');

  const resultados = useMemo(() => {
    if (!termo || termo.length < 2) return [];

    const lista: ResultadoBusca[] = [];

    hospitais.forEach(hospital => {
      const remediosEncontrados = hospital.estoque.filter(med => 
        med.nome.toLowerCase().includes(termo.toLowerCase())
      );

      remediosEncontrados.forEach(med => {
        lista.push({
          hospitalId: hospital.id,
          hospitalNome: hospital.nome,
          hospitalCidade: hospital.cidade,
          medicamento: med
        });
      });
    });

    return lista.sort((a, b) => b.medicamento.estoqueAtual - a.medicamento.estoqueAtual);
  }, [hospitais, termo]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-4">
          <Pill className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Busca Global de Medicamentos</h2>
        <p className="text-slate-500 mb-6">Pesquise em toda a rede municipal e regional para localizar estoques.</p>
        
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Digite o nome do medicamento (ex: Dipirona, Insulina)..." 
            className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-4">
        {termo.length > 0 && termo.length < 2 && (
           <p className="text-center text-slate-400 mt-8">Digite pelo menos 2 caracteres para buscar.</p>
        )}

        {resultados.map((item, index) => (
          <div 
            key={`${item.hospitalId}-${item.medicamento.id}-${index}`}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-slate-50 p-3 rounded-lg hidden md:block">
                <Pill className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{item.medicamento.nome}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <Badge tipo={item.medicamento.estoqueAtual > item.medicamento.estoqueMinimo ? 'success' : 'danger'}>
                        {item.medicamento.estoqueAtual > item.medicamento.estoqueMinimo ? 'Disponível' : 'Crítico'}
                    </Badge>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {item.medicamento.unidade}
                    </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-1 flex-1 border-l border-slate-100 pl-4 md:border-none md:pl-0">
              <div className="flex items-center gap-1 text-slate-800 font-medium">
                 {item.hospitalNome}
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                 <MapPin className="w-3 h-3" /> {item.hospitalCidade}
              </div>
            </div>

            <div className="flex items-center gap-6 pl-4 border-l border-slate-100">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase font-bold">Estoque</p>
                <p className={`text-2xl font-bold ${item.medicamento.estoqueAtual === 0 ? 'text-slate-300' : 'text-teal-600'}`}>
                    {item.medicamento.estoqueAtual}
                </p>
              </div>
              <button 
                onClick={() => onSelectHospital(item.hospitalId)}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                title="Ver detalhes do hospital"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {termo.length >= 2 && resultados.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-600">Nenhum medicamento encontrado</h3>
            <p className="text-slate-400">Tente buscar por outro nome ou verifique a ortografia.</p>
          </div>
        )}
      </div>
    </div>
  );
};