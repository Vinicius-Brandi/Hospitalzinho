import React, { useState, useEffect, useMemo } from 'react';
import { Menu, Loader2, AlertTriangle } from 'lucide-react';

// Imports dos Componentes de Layout e Páginas
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { HospitaisList } from './pages/HospitaisList';
import { HospitalDetails } from './pages/HospitalDetails';
import { MedicamentosSearch } from './pages/MedicamentosSearch';
import { Cadastro } from './pages/Cadastro';
import { Relatorios } from './pages/Relatorios';
import { PacientesSearch } from './pages/PacientesSearch'; // Nova Importação

// Imports de Lógica e Tipos
import { type Hospital } from './types';
import { hospitalService } from './services/api';

export default function SaudeApp() {
  // Estado de navegação com todas as rotas do sistema
  const [view, setView] = useState<'dashboard' | 'lista' | 'detalhe' | 'medicamentos' | 'cadastro' | 'relatorios' | 'pacientes'>('dashboard');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Estados de Dados Globais
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca de dados ao iniciar (Dashboard e Listas)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        // Busca dados reais da API .NET
        const dados = await hospitalService.buscarDadosCompletos();
        setHospitais(dados);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Não foi possível conectar ao servidor da Secretaria (Porta 5102). Verifique se a API está rodando.');
      } finally {
        setLoading(false);
      }
    };

    // Carrega apenas se não estiver em telas que têm seu próprio loading (Cadastro, Relatórios, Pacientes)
    // Isso evita chamadas desnecessárias ao banco principal quando o foco é outro
    if (view !== 'cadastro' && view !== 'relatorios' && view !== 'pacientes') {
        carregarDados();
    } else {
        // Se mudar para uma dessas abas, podemos "liberar" o loading global
        setLoading(false);
    }
  }, [view]); 

  // Cálculos para o Dashboard (useMemo para performance)
  const estatisticasGerais = useMemo(() => {
    let totalLeitos = 0;
    let leitosOcupados = 0;
    let alertasEstoque = 0;
    
    hospitais.forEach(h => {
      totalLeitos += h.leitosTotais;
      leitosOcupados += h.leitosOcupados;
      h.estoque.forEach(m => {
        if (m.estoqueAtual < m.estoqueMinimo) alertasEstoque++;
      });
    });

    const ocupacaoMedia = totalLeitos > 0 ? (leitosOcupados / totalLeitos) * 100 : 0;

    return { totalLeitos, leitosOcupados, ocupacaoMedia, alertasEstoque, totalUnidades: hospitais.length };
  }, [hospitais]);

  const hospitalSelecionado = hospitais.find(h => h.id === selectedHospitalId);
  const cidadesDisponiveis = Array.from(new Set(hospitais.map(h => h.cidade)));

  // Função auxiliar para navegar da busca de remédios para o detalhe do hospital
  const handleNavigateToHospital = (id: string) => {
    setSelectedHospitalId(id);
    setView('detalhe');
  };

  // --- Renderização de Estados de Carregamento/Erro (Apenas para dashboard/listas) ---

  if (loading && ['dashboard', 'lista', 'detalhe', 'medicamentos'].includes(view)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Sincronizando dados com a Secretaria...</p>
        </div>
      </div>
    );
  }

  if (error && ['dashboard', 'lista', 'detalhe', 'medicamentos'].includes(view)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center border border-red-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Erro de Conexão</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Tentar Novamente
            </button>
            {/* Permite ir para o cadastro/prontuário mesmo sem dados do dashboard */}
            <button 
                onClick={() => { setError(null); setView('pacientes'); }} 
                className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
                Ir para Prontuários
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Renderização Principal ---

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentView={view}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(v) => {
          setView(v);
          setSidebarOpen(false);
        }}
      />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen bg-slate-50/50">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {view === 'dashboard' ? 'Visão Geral' : 
               view === 'lista' ? 'Consulta de Unidades' : 
               view === 'medicamentos' ? 'Estoque Global de Medicamentos' :
               view === 'cadastro' ? 'Cadastro Administrativo' :
               view === 'relatorios' ? 'Relatórios Estratégicos' :
               view === 'pacientes' ? 'Prontuário Eletrônico Unificado' :
               'Detalhes da Unidade'}
            </h2>
            <p className="text-slate-500 text-sm hidden md:block mt-1">
                Sistema Integrado de Gestão de Saúde - Marília/SP
            </p>
          </div>
          <button 
            className="md:hidden p-2 bg-white border border-slate-200 rounded-lg shadow-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </header>

        {/* Roteamento Manual */}
        
        {view === 'dashboard' && (
          <Dashboard estatisticas={estatisticasGerais} hospitais={hospitais} />
        )}

        {view === 'lista' && (
          <HospitaisList 
            hospitais={hospitais} 
            onSelectHospital={(id) => { setSelectedHospitalId(id); setView('detalhe'); }}
            cidades={cidadesDisponiveis}
          />
        )}

        {view === 'medicamentos' && (
          <MedicamentosSearch 
            hospitais={hospitais}
            onSelectHospital={handleNavigateToHospital}
          />
        )}

        {view === 'cadastro' && (
          <Cadastro />
        )}

        {view === 'relatorios' && (
          <Relatorios />
        )}

        {view === 'pacientes' && (
          <PacientesSearch />
        )}

        {view === 'detalhe' && hospitalSelecionado && (
          <HospitalDetails 
            hospital={hospitalSelecionado} 
            onBack={() => setView('lista')} 
          />
        )}
      </main>
    </div>
  );
}