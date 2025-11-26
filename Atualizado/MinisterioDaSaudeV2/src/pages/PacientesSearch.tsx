import React, { useState } from 'react';
import { 
  Search, User, Calendar, Phone, MapPin, FileText, 
  Activity, AlertOctagon, Stethoscope, Bed, FlaskConical, 
  Scissors, Pill
} from 'lucide-react';
import { hospitalService } from '../services/api';
import type { ProntuarioCompleto } from '../types';

export const PacientesSearch: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [loading, setLoading] = useState(false);
  const [prontuario, setProntuario] = useState<ProntuarioCompleto | null>(null);
  const [erro, setErro] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (termo.length < 3) return;

    setLoading(true);
    setErro('');
    setProntuario(null);

    try {
      const dados = await hospitalService.buscarProntuario(termo);
      if (dados) {
        setProntuario(dados);
      } else {
        setErro('Paciente não encontrado na base de dados unificada.');
      }
    } catch (error) {
      setErro('Erro ao conectar com a base de dados.');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataISO: string) => {
    if (!dataISO) return '-';
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const calcularIdade = (nascimento: string) => {
    const hoje = new Date();
    const nasc = new Date(nascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }
    return idade;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-10">
      
      {/* Cabeçalho e Busca */}
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Prontuário Unificado</h2>
            <p className="text-slate-500">Busque pelo CPF, CNS ou Nome completo do paciente.</p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Digite o CPF, CNS ou Nome..." 
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                value={termo}
                onChange={e => setTermo(e.target.value)}
            />
            <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {loading ? 'Buscando...' : 'Consultar'}
            </button>
        </form>
        {erro && <p className="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg">{erro}</p>}
      </div>

      {/* PRONTUÁRIO - VISIBILIDADE CONDICIONAL */}
      {prontuario && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            
            {/* 1. CARTÃO DE IDENTIFICAÇÃO */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                        {prontuario.dadosPessoais.nome.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold">{prontuario.dadosPessoais.nome}</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-blue-100 text-sm">
                            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {prontuario.dadosPessoais.sexo === 1 ? 'Masculino' : 'Feminino'}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {calcularIdade(prontuario.dadosPessoais.dataNascimento)} anos ({formatarData(prontuario.dadosPessoais.dataNascimento)})</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-white font-mono">CPF: {prontuario.dadosPessoais.cpf}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-white font-mono">CNS: {prontuario.dadosPessoais.cns}</span>
                        </div>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-slate-700">Endereço</p>
                            <p className="text-sm text-slate-500">{prontuario.dadosPessoais.endereco.logradouro}, {prontuario.dadosPessoais.endereco.numero}</p>
                            <p className="text-sm text-slate-500">{prontuario.dadosPessoais.endereco.bairro} - {prontuario.dadosPessoais.endereco.cidade}/{prontuario.dadosPessoais.endereco.estado}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-slate-700">Contato</p>
                            <p className="text-sm text-slate-500">{prontuario.dadosPessoais.contato.telefoneCelular}</p>
                            <p className="text-sm text-slate-500">{prontuario.dadosPessoais.contato.email}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-slate-700">Nacionalidade</p>
                            <p className="text-sm text-slate-500">{prontuario.dadosPessoais.nacionalidade}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. ALERTAS CLÍNICOS (Alergias e Doenças) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                        <AlertOctagon className="w-5 h-5" /> Alergias e Restrições
                    </h3>
                    {prontuario.alergias.length > 0 ? (
                        <div className="space-y-2">
                            {prontuario.alergias.map(a => (
                                <div key={a.id} className="bg-white p-3 rounded border border-red-100 text-red-700 text-sm font-medium shadow-sm">
                                    {a.nomeAlergia}
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-red-400">Nenhuma alergia registrada.</p>}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5" /> Condições Crônicas
                    </h3>
                    {prontuario.doencas.length > 0 ? (
                        <div className="space-y-2">
                            {prontuario.doencas.map(d => (
                                <div key={d.id} className="bg-white p-3 rounded border border-amber-100 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold text-amber-800">{d.modelo.nome}</span>
                                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">CID: {d.modelo.cid}</span>
                                    </div>
                                    <p className="text-xs text-amber-600 mt-1 line-clamp-2">{d.modelo.descricao}</p>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-amber-400">Nenhuma doença crônica registrada.</p>}
                </div>
            </div>

            {/* 3. HISTÓRICO CLÍNICO EM ABAS/CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Consultas */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                        <Stethoscope className="w-5 h-5 text-blue-600" /> Últimas Consultas
                    </h3>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                        {prontuario.consultas.map(c => (
                            <div key={c.id} className="flex gap-3">
                                <div className="w-12 text-xs text-slate-400 text-center pt-1">
                                    <div className="font-bold text-slate-600">{formatarData(c.dataConsulta).split('/')[0]}/{formatarData(c.dataConsulta).split('/')[1]}</div>
                                    <div>{formatarData(c.dataConsulta).split('/')[2]}</div>
                                </div>
                                <div className="flex-1 bg-slate-50 p-3 rounded-lg">
                                    <p className="font-bold text-slate-700">{c.hospital}</p>
                                    <p className="text-sm text-slate-600">Dr(a). {c.profResponsavel}</p>
                                    {c.observacoes && <p className="text-xs text-slate-500 mt-1 italic">"{c.observacoes}"</p>}
                                </div>
                            </div>
                        ))}
                        {prontuario.consultas.length === 0 && <p className="text-sm text-slate-400">Nenhum registro.</p>}
                    </div>
                </div>

                {/* Internações e Cirurgias */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Bed className="w-5 h-5 text-indigo-600" /> Internações
                        </h3>
                        <div className="space-y-3">
                            {prontuario.internacoes.map(i => (
                                <div key={i.id} className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                    <div>
                                        <p className="font-bold text-indigo-900 text-sm">{i.hospital}</p>
                                        <p className="text-xs text-indigo-700">Motivo: {i.motivo}</p>
                                    </div>
                                    <div className="text-right text-xs text-indigo-600">
                                        <p>Entrada: {formatarData(i.dataInternacao)}</p>
                                        <p>{i.quarto ? `Quarto ${i.quarto}` : '-'}</p>
                                    </div>
                                </div>
                            ))}
                            {prontuario.internacoes.length === 0 && <p className="text-sm text-slate-400">Nenhum registro.</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Scissors className="w-5 h-5 text-rose-600" /> Cirurgias
                        </h3>
                        <div className="space-y-3">
                            {prontuario.cirurgias.map(c => (
                                <div key={c.id} className="bg-rose-50 p-3 rounded-lg border border-rose-100 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-rose-900 text-sm">{c.nome}</p>
                                        <p className="text-xs text-rose-700">{c.hospital}</p>
                                    </div>
                                    <span className="text-xs bg-white px-2 py-1 rounded text-rose-600 border border-rose-200">
                                        {formatarData(c.dataCirurgia)}
                                    </span>
                                </div>
                            ))}
                            {prontuario.cirurgias.length === 0 && <p className="text-sm text-slate-400">Nenhum registro.</p>}
                        </div>
                    </div>
                </div>

                {/* Exames */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                        <FlaskConical className="w-5 h-5 text-teal-600" /> Histórico de Exames
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    <th className="p-2 rounded-l-lg">Data</th>
                                    <th className="p-2">Exame</th>
                                    <th className="p-2">Resultado</th>
                                    <th className="p-2 rounded-r-lg">Laboratório</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prontuario.exames.map(e => (
                                    <tr key={e.id} className="border-b border-slate-50">
                                        <td className="p-2 text-slate-500">{formatarData(e.dataExame)}</td>
                                        <td className="p-2 font-medium text-slate-700">{e.tipoExame.nome}</td>
                                        <td className="p-2 text-slate-600 truncate max-w-[150px]" title={e.resultados}>{e.resultados}</td>
                                        <td className="p-2 text-slate-500">{e.laboratorio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {prontuario.exames.length === 0 && <p className="text-sm text-slate-400 mt-4">Nenhum registro.</p>}
                    </div>
                </div>

                {/* Medicamentos Prescritos */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                        <Pill className="w-5 h-5 text-purple-600" /> Medicamentos Recentes
                    </h3>
                    <div className="space-y-3">
                        {prontuario.medicacoes.map(m => (
                            <div key={m.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                <div className="bg-white p-2 rounded-full text-purple-600">
                                    <Pill className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-purple-900 text-sm">{m.modelo.nome}</p>
                                    <p className="text-xs text-purple-700">{m.modelo.principioAtivo} • {m.viaAdministracao}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold bg-purple-200 text-purple-800 px-2 py-1 rounded">
                                        {m.dosagemPrescrita}
                                    </span>
                                    <p className="text-[10px] text-purple-500 mt-1">{formatarData(m.dataInicio)} - {formatarData(m.dataFim)}</p>
                                </div>
                            </div>
                        ))}
                        {prontuario.medicacoes.length === 0 && <p className="text-sm text-slate-400">Nenhum registro.</p>}
                    </div>
                </div>

            </div>
        </div>
      )}
    </div>
  );
};