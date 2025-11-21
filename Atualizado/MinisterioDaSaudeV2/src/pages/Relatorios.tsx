import React, { useEffect, useState, useMemo } from 'react';
import { Users, Activity, AlertOctagon, FileBarChart, Map as MapIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { hospitalService } from '../services/api';
import { type ApiPaciente, type ApiPacienteAlergia, type ApiAlergia, type ApiPacienteDoenca, type DadoRelatorio } from '../types';

export const Relatorios: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  const [pacientes, setPacientes] = useState<ApiPaciente[]>([]);
  const [alergiasReg, setAlergiasReg] = useState<ApiPacienteAlergia[]>([]);
  const [catalogoAlergias, setCatalogoAlergias] = useState<ApiAlergia[]>([]);
  const [doencas, setDoencas] = useState<ApiPacienteDoenca[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const dados = await hospitalService.buscarDadosRelatorios();
        setPacientes(dados.pacientes);
        setAlergiasReg(dados.alergiasRegistradas);
        setCatalogoAlergias(dados.catalogoAlergias);
        setDoencas(dados.doencasCronicas);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rankingAlergias = useMemo(() => {
    const contagem: Record<string, number> = {};
    alergiasReg.forEach(reg => {
      const nomeAlergia = catalogoAlergias.find(c => c.id === reg.alergiaId)?.nome || 'Desconhecida';
      contagem[nomeAlergia] = (contagem[nomeAlergia] || 0) + 1;
    });
    const total = alergiasReg.length || 1;
    return Object.entries(contagem).sort(([,a], [,b]) => b - a).slice(0, 5).map(([label, valor]) => ({ label, valor, percentual: (valor / total) * 100 }));
  }, [alergiasReg, catalogoAlergias]);

  const rankingDoencas = useMemo(() => {
    const contagem: Record<string, number> = {};
    doencas.forEach(d => {
      const nome = d.modelo.nome;
      contagem[nome] = (contagem[nome] || 0) + 1;
    });
    const total = doencas.length || 1;
    return Object.entries(contagem).sort(([,a], [,b]) => b - a).slice(0, 5).map(([label, valor]) => ({ label, valor, percentual: (valor / total) * 100 }));
  }, [doencas]);

  const statsSexo = useMemo(() => {
    let masc = 0, fem = 0;
    pacientes.forEach(p => { if (p.sexo === 1) masc++; else fem++; });
    return { masc, fem, total: pacientes.length };
  }, [pacientes]);

  const insights = useMemo(() => {
    if (pacientes.length === 0 || doencas.length === 0) return null;

    const mapaCnsBairro = new Map<string, string>();
    
    pacientes.forEach(p => {
        if (p.cns && p.endereco?.bairro) {
            mapaCnsBairro.set(p.cns, p.endereco.bairro);
        }
    });

    const contagemBairros: Record<string, number> = {};
    doencas.forEach(d => {
        const cns = (d as any).pacienteCNS;
        const bairro = mapaCnsBairro.get(cns);
        
        if (bairro) {
            contagemBairros[bairro] = (contagemBairros[bairro] || 0) + 1;
        }
    });

    const topBairro = Object.entries(contagemBairros).sort((a, b) => b[1] - a[1])[0];

    const hoje = new Date();
    const trintaDiasAtras = new Date(); trintaDiasAtras.setDate(hoje.getDate() - 30);
    const sessentaDiasAtras = new Date(); sessentaDiasAtras.setDate(hoje.getDate() - 60);

    let casosMesAtual = 0;
    let casosMesAnterior = 0;

    doencas.forEach(d => {
        const dataDiag = new Date((d as any).dataDiagnostico || new Date());
        if (dataDiag >= trintaDiasAtras) casosMesAtual++;
        else if (dataDiag >= sessentaDiasAtras) casosMesAnterior++;
    });

    let variacao = 0;
    if (casosMesAnterior > 0) {
        variacao = ((casosMesAtual - casosMesAnterior) / casosMesAnterior) * 100;
    }

    return {
        bairroFoco: topBairro ? { nome: topBairro[0], casos: topBairro[1] } : null,
        tendencia: { atual: casosMesAtual, anterior: casosMesAnterior, variacao }
    };
  }, [pacientes, doencas]);


  const RankingBar = ({ item, color }: { item: DadoRelatorio, color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{item.label}</span>
        <span className="text-slate-500">{item.valor} casos ({item.percentual.toFixed(1)}%)</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${item.percentual}%` }}></div>
      </div>
    </div>
  );

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center text-slate-500 animate-pulse">Gerando inteligência epidemiológica...</div>
        </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-10">
      
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Relatórios Epidemiológicos</h2>
            <p className="text-slate-500">Inteligência baseada nos prontuários unificados.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">
            {pacientes.length} Pacientes Monitorados
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-amber-100 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Doenças Crônicas</h3>
                    <p className="text-xs text-slate-500">Principais comorbidades na região</p>
                </div>
            </div>
            {rankingDoencas.length > 0 ? (
                rankingDoencas.map(item => <RankingBar key={item.label} item={item} color="bg-amber-500" />)
            ) : <p className="text-slate-400 text-sm text-center">Sem dados.</p>}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-red-100 p-2 rounded-lg">
                    <AlertOctagon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Alergias Populares</h3>
                    <p className="text-xs text-slate-500">Alertas para farmácia</p>
                </div>
            </div>
            {rankingAlergias.length > 0 ? (
                rankingAlergias.map(item => <RankingBar key={item.label} item={item} color="bg-red-500" />)
            ) : <p className="text-slate-400 text-sm text-center">Sem dados.</p>}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Perfil Demográfico</h3>
                    <p className="text-xs text-slate-500">Distribuição da base</p>
                </div>
            </div>
            <div className="flex items-center justify-around py-4">
                <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{statsSexo.masc}</div>
                    <div className="text-sm text-slate-500">Homens</div>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-pink-500">{statsSexo.fem}</div>
                    <div className="text-sm text-slate-500">Mulheres</div>
                </div>
            </div>
            <div className="mt-4 bg-slate-100 rounded-full h-4 w-full flex overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${(statsSexo.masc / (pacientes.length || 1)) * 100}%` }}></div>
                <div className="bg-pink-500 h-full" style={{ width: `${(statsSexo.fem / (pacientes.length || 1)) * 100}%` }}></div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-sm text-white flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <FileBarChart className="w-6 h-6 text-blue-200" />
                <div>
                    <h3 className="font-bold">Insights Automáticos</h3>
                </div>
            </div>
            
            <ul className="space-y-4 text-sm flex-1">
                {insights?.bairroFoco ? (
                    <li className="flex items-start gap-2 bg-white/10 p-3 rounded-lg border border-white/10">
                        <MapIcon className="w-5 h-5 shrink-0 text-yellow-300" />
                        <span>
                            O bairro <strong>{insights.bairroFoco.nome}</strong> apresenta a maior concentração de casos crônicos ({insights.bairroFoco.casos} registros).
                        </span>
                    </li>
                ) : (
                    <li className="text-blue-200 italic text-xs">Dados insuficientes para análise geográfica.</li>
                )}

                {insights?.tendencia && (
                    <li className="flex items-start gap-2 bg-white/10 p-3 rounded-lg border border-white/10">
                        {insights.tendencia.variacao > 0 ? (
                            <TrendingUp className="w-5 h-5 shrink-0 text-red-300" />
                        ) : (
                            <TrendingDown className="w-5 h-5 shrink-0 text-green-300" />
                        )}
                        <span>
                            Houve {insights.tendencia.variacao > 0 ? 'um aumento' : 'uma queda'} de <strong>{Math.abs(insights.tendencia.variacao).toFixed(1)}%</strong> nos diagnósticos nos últimos 30 dias ({insights.tendencia.atual} novos casos).
                        </span>
                    </li>
                )}
            </ul>
            
            <button className="w-full mt-6 bg-white text-blue-700 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Exportar Dados para PDF
            </button>
        </div>

      </div>
    </div>
  );
};