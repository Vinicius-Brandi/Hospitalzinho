import React, { useState, useEffect } from 'react';
import { Building, MapPin, CheckCircle, AlertCircle, Save, Briefcase, Trash2, Loader2 } from 'lucide-react';
import { hospitalService } from '../services/api';
import { type InstituicaoResumo, TipoUnidade } from '../types';
import { getNomeTipoUnidade } from '../utils/formatters';

export const Cadastro: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'instituicao' | 'unidade'>('instituicao');
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [instForm, setInstForm] = useState({ nome: '', cnpj: '', tokenAcesso: '' });
  const [instituicoes, setInstituicoes] = useState<InstituicaoResumo[]>([]); 
  
  const [unidadeForm, setUnidadeForm] = useState({
    nome: '',
    cnes: '',
    tipoUnidade: 0,
    instituicaoPaiId: '',
    cep: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: ''
  });

  const carregarInstituicoes = () => {
    hospitalService.buscarInstituicoes()
      .then(data => setInstituicoes(data))
      .catch(err => console.error("Erro ao carregar instituições", err));
  };

  useEffect(() => {
    carregarInstituicoes();
  }, [activeTab]);

  
  const buscarDadosCep = async (cepNumeros: string) => {
    if (loadingCep) return;
    
    setLoadingCep(true);
    try {
      const dados = await hospitalService.buscarCep(cepNumeros);
      setUnidadeForm(prev => ({
        ...prev,
        rua: dados.rua,
        bairro: dados.bairro,
        cidade: dados.cidade,
      }));
    } catch (error) {
      console.warn("CEP não encontrado");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 8) valor = valor.slice(0, 8);

    let valorFormatado = valor;
    if (valor.length > 5) {
      valorFormatado = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    setUnidadeForm({ ...unidadeForm, cep: valorFormatado });

    if (valor.length === 8) {
      buscarDadosCep(valor);
    }
  };

  const handleSubmitInstituicao = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await hospitalService.cadastrarInstituicao(instForm);
      setFeedback({ type: 'success', message: 'Instituição cadastrada com sucesso!' });
      setInstForm({ nome: '', cnpj: '', tokenAcesso: '' }); 
      carregarInstituicoes(); 
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erro ao cadastrar. Verifique os dados ou a conexão.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInstituicao = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta instituição? Isso pode apagar todas as unidades vinculadas a ela.")) return;
    
    try {
        await hospitalService.deletarInstituicao(id);
        setFeedback({ type: 'success', message: 'Instituição removida com sucesso.' });
        carregarInstituicoes();
    } catch (error) {
        setFeedback({ type: 'error', message: 'Erro ao deletar. Verifique se há unidades vinculadas.' });
    }
  };

  const handleSubmitUnidade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    
    if (!unidadeForm.instituicaoPaiId) {
        setFeedback({ type: 'error', message: 'Selecione uma Instituição Pai.' });
        setLoading(false);
        return;
    }

    const payload = {
        nome: unidadeForm.nome,
        cnes: unidadeForm.cnes,
        tipoUnidade: Number(unidadeForm.tipoUnidade),
        instituicaoPaiId: Number(unidadeForm.instituicaoPaiId),
        endereco: {
            cep: unidadeForm.cep,
            cidade: unidadeForm.cidade,
            bairro: unidadeForm.bairro,
            rua: unidadeForm.rua,
            numero: unidadeForm.numero,
            complemento: unidadeForm.complemento
        }
    };

    try {
      await hospitalService.cadastrarUnidade(payload);
      setFeedback({ type: 'success', message: 'Unidade cadastrada e vinculada com sucesso!' });
      setUnidadeForm({ ...unidadeForm, nome: '', cnes: '', cep: '', rua: '', bairro: '', cidade: '', numero: '', complemento: '' }); 
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erro ao cadastrar unidade.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Cadastro Administrativo</h2>
            <p className="text-slate-500">Gerenciamento de Entidades do Sistema de Saúde</p>
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
        <button onClick={() => { setActiveTab('instituicao'); setFeedback(null); }} className={`flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'instituicao' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          <Briefcase className="w-4 h-4" /> Instituição (Matriz)
        </button>
        <button onClick={() => { setActiveTab('unidade'); setFeedback(null); }} className={`flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'unidade' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          <Building className="w-4 h-4" /> Unidade de Saúde (Filial)
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {feedback.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {feedback.message}
        </div>
      )}

      {activeTab === 'instituicao' && (
        <div className="space-y-8">
            <form onSubmit={handleSubmitInstituicao} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
                <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Nova Instituição</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Instituição</label>
                        <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Associação Beneficente..." value={instForm.nome} onChange={e => setInstForm({...instForm, nome: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                        <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="00.000.000/0001-00" value={instForm.cnpj} onChange={e => setInstForm({...instForm, cnpj: e.target.value})} />
                    </div>
                    {/* API Token Field 
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Token de Acesso (API)</label>
                        <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Chave de segurança" value={instForm.tokenAcesso} onChange={e => setInstForm({...instForm, tokenAcesso: e.target.value})} />
                    </div>*/}
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-50">
                    {loading ? 'Salvando...' : <><Save className="w-4 h-4" /> Cadastrar Instituição</>}
                    </button>
                </div>
            </form>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-700 mb-4">Instituições Cadastradas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr><th className="p-3">Nome</th><th className="p-3">CNPJ</th><th className="p-3 text-right">Ações</th></tr>
                        </thead>
                        <tbody>
                            {instituicoes.map(inst => (
                                <tr key={inst.id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-800">{inst.nome}</td>
                                    <td className="p-3 text-slate-500 font-mono text-xs">{inst.cnpj}</td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => handleDeleteInstituicao(inst.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {instituicoes.length === 0 && (
                                <tr><td colSpan={3} className="p-8 text-center text-slate-400">Nenhuma instituição cadastrada ainda.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'unidade' && (
        <form onSubmit={handleSubmitUnidade} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
            
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Dados Gerais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instituição Pai (Matriz)</label>
                        <select required className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.instituicaoPaiId} onChange={e => setUnidadeForm({...unidadeForm, instituicaoPaiId: e.target.value})}>
                            <option value="">Selecione a instituição responsável...</option>
                            {instituicoes.map(inst => (<option key={inst.id} value={inst.id}>{inst.nome} ({inst.cnpj})</option>))}
                        </select>
                        <p className="text-xs text-slate-400 mt-1">A unidade será vinculada hierarquicamente a esta instituição.</p>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Unidade</label>
                         <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: UPA Zona Norte" value={unidadeForm.nome} onChange={e => setUnidadeForm({...unidadeForm, nome: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Unidade</label>
                        <select className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.tipoUnidade} onChange={e => setUnidadeForm({...unidadeForm, tipoUnidade: Number(e.target.value)})}>
                             {Object.values(TipoUnidade).filter(v => typeof v === 'number').map((v) => (
                                <option key={v} value={v}>{getNomeTipoUnidade(v as number)}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CNES</label>
                        <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Código CNES" value={unidadeForm.cnes} onChange={e => setUnidadeForm({...unidadeForm, cnes: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Endereço
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="00000-000"
                                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                value={unidadeForm.cep}
                                onChange={handleCepChange}
                                maxLength={9}
                            />
                            {loadingCep && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pt-6"> 
                                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
                        <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.cidade} onChange={e => setUnidadeForm({...unidadeForm, cidade: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                        <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.bairro} onChange={e => setUnidadeForm({...unidadeForm, bairro: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Rua/Logradouro</label>
                        <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.rua} onChange={e => setUnidadeForm({...unidadeForm, rua: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Número</label>
                        <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.numero} onChange={e => setUnidadeForm({...unidadeForm, numero: e.target.value})} />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Complemento</label>
                        <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={unidadeForm.complemento} onChange={e => setUnidadeForm({...unidadeForm, complemento: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-50">
                <button type="submit" disabled={loading} className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 font-medium flex items-center gap-2 disabled:opacity-50">
                {loading ? 'Salvando...' : <><Save className="w-4 h-4" /> Cadastrar Unidade</>}
                </button>
            </div>
        </form>
      )}
    </div>
  );
};