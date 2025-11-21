import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Building2, Pill, Trash2, Bed, User, Layout } from 'lucide-react';
import { type Hospital, type AlaEstruturada } from '../types';
import { getNomeTipoUnidade } from '../utils/formatters';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { hospitalService } from '../services/api';

interface HospitalDetailsProps {
  hospital: Hospital;
  onBack: () => void;
}

export const HospitalDetails: React.FC<HospitalDetailsProps> = ({ hospital, onBack }) => {
  const [mapaLeitos, setMapaLeitos] = useState<AlaEstruturada[]>([]);
  const [loadingMapa, setLoadingMapa] = useState(false);

  useEffect(() => {
    setLoadingMapa(true);
    hospitalService.buscarMapaDeLeitos(hospital.id)
      .then(data => setMapaLeitos(data))
      .finally(() => setLoadingMapa(false));
  }, [hospital.id]);

  const handleDelete = async () => {
    const confirmacao = window.confirm(
      `ATENÇÃO: Tem certeza que deseja EXCLUIR a unidade "${hospital.nome}"?`
    );
    if (confirmacao) {
      try {
        await hospitalService.deletarUnidade(hospital.id);
        alert('Unidade removida com sucesso.');
        onBack();
      } catch (error) {
        alert('Erro ao excluir unidade.');
      }
    }
  };

  const mapQuery = encodeURIComponent(`${hospital.nome}, ${hospital.bairro}, ${hospital.cidade}, Brasil`);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-10">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar
        </button>
        <button onClick={handleDelete} className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-100">
            <Trash2 className="w-4 h-4 mr-2" /> Excluir Unidade
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{hospital.nome}</h2>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{hospital.bairro}, {hospital.cidade}</span>
              <span className="mx-2 hidden md:inline text-slate-300">|</span>
              <span className="font-mono text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">CNES: {hospital.cnes}</span>
            </div>
          </div>
          <div className="self-start md:self-center">
             <Badge tipo="info">{getNomeTipoUnidade(hospital.tipo)}</Badge>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-slate-700">
                    <Building2 className="w-5 h-5 text-blue-600" /> Ocupação Geral
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-slate-800">
                    {hospital.leitosTotais > 0 ? ((hospital.leitosOcupados / hospital.leitosTotais) * 100).toFixed(0) : 0}%
                    </span>
                    <span className="text-sm text-slate-500">ocupado</span>
                </div>
                <ProgressBar valor={hospital.leitosOcupados} max={hospital.leitosTotais} />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="aspect-video w-full bg-slate-100 relative">
                    <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}></iframe>
                </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2 text-slate-700">
                        <Layout className="w-5 h-5 text-indigo-600" /> Mapa de Leitos
                    </h3>
                    {loadingMapa && <span className="text-xs text-slate-400 animate-pulse">Atualizando mapa...</span>}
                </div>
                
                <div className="p-5 space-y-6 max-h-[500px] overflow-y-auto">
                    {mapaLeitos.length === 0 && !loadingMapa && (
                        <div className="text-center py-8 text-slate-400">
                            <Bed className="w-10 h-10 mx-auto mb-2 opacity-20" />
                            Nenhuma ala cadastrada para esta unidade.
                        </div>
                    )}

                    {mapaLeitos.map(ala => (
                        <div key={ala.id} className="border border-slate-100 rounded-lg overflow-hidden">
                            <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-100">
                                <span className="font-bold text-slate-700 text-sm">{ala.nome}</span>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-slate-500">{ala.leitosOcupados}/{ala.totalLeitos} ocupados</span>
                                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div className={`h-full ${ala.ocupacao > 90 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${ala.ocupacao}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {ala.quartos.map(quarto => (
                                    <div key={quarto.id} className="bg-slate-50/50 border border-slate-100 p-3 rounded-lg">
                                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Quarto {quarto.numero}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {quarto.leitos.map(leito => (
                                                <div 
                                                    key={leito.id} 
                                                    className={`
                                                        w-8 h-8 rounded flex items-center justify-center transition-all
                                                        ${leito.ocupado 
                                                            ? 'bg-red-100 text-red-600 border border-red-200 shadow-sm' 
                                                            : 'bg-green-100 text-green-600 border border-green-200 hover:bg-green-200 cursor-pointer'}
                                                    `}
                                                    title={`Leito ${leito.numero}: ${leito.ocupado ? 'OCUPADO' : 'LIVRE'}`}
                                                >
                                                    {leito.ocupado ? <User className="w-4 h-4" /> : <Bed className="w-4 h-4" />}
                                                </div>
                                            ))}
                                            {quarto.leitos.length === 0 && <span className="text-xs text-slate-300 italic">Sem leitos</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2 text-slate-700">
                        <Pill className="w-5 h-5 text-teal-600" /> Estoque de Medicamentos
                    </h3>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                        {hospital.estoque.length} itens
                    </span>
                </div>
                
                <div className="overflow-auto flex-1 max-h-[400px]">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-5 py-3 text-left font-semibold bg-slate-50">Medicamento</th>
                                <th className="px-5 py-3 text-right font-semibold bg-slate-50">Qtd.</th>
                                <th className="px-5 py-3 text-center font-semibold bg-slate-50">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {hospital.estoque.map((med, idx) => (
                            <tr key={`${med.id}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-3">
                                    <p className="font-medium text-slate-700">{med.nome}</p>
                                </td>
                                <td className="px-5 py-3 text-right text-slate-600 font-mono">{med.estoqueAtual}</td>
                                <td className="px-5 py-3 text-center">
                                <Badge tipo={med.estoqueAtual < med.estoqueMinimo ? 'danger' : 'success'}>
                                    {med.estoqueAtual < med.estoqueMinimo ? 'Crítico' : 'Normal'}
                                </Badge>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};