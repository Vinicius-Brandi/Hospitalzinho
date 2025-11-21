// Salvar em: src/services/api.ts
import { 
  type ApiHospitalUnidade, 
  type ApiLeito, 
  type ApiMedicamentoEstoque, 
  type Hospital, 
  type Medicamento, 
  TipoUnidade,
  type ApiAla,
  type ApiQuarto,
  type AlaEstruturada,
  type ApiPaciente,
  type ApiPacienteAlergia,
  type ApiAlergia,
  type ApiPacienteDoenca,
  type InstituicaoResumo,
  type CadastroInstituicaoPayload,
  type CadastroUnidadePayload
} from "../types";

const API_URL = 'http://localhost:5102/api';

// Mock mantido apenas para caso a API de medicamentos falhe completamente (fallback)
const gerarEstoqueMock = (hospitalId: string): Medicamento[] => {
  return []; // Retornando vazio para priorizar dados reais
};

export const hospitalService = {
  
  // --- BUSCA DE DADOS PRINCIPAL (DASHBOARD/LISTA) ---
  buscarDadosCompletos: async (): Promise<Hospital[]> => {
    try {
      // 1. Busca Unidades
      const resUnidades = await fetch(`${API_URL}/HospitalUnidade`);
      if (!resUnidades.ok) throw new Error('Falha ao buscar unidades.');
      const apiUnidades: ApiHospitalUnidade[] = await resUnidades.json();

      // 2. Busca Leitos
      let apiLeitos: ApiLeito[] = [];
      try {
        const resLeitos = await fetch(`${API_URL}/leito`); 
        if (resLeitos.ok) apiLeitos = await resLeitos.json();
      } catch (e) { console.warn("Leitos off"); }

      // 3. Busca Medicamentos (Estoque Real)
      let apiMedicamentos: ApiMedicamentoEstoque[] = [];
      try {
        const resMed = await fetch(`${API_URL}/Medicamento`);
        if (resMed.ok) apiMedicamentos = await resMed.json();
      } catch (e) { console.warn("Medicamentos off"); }

      // 4. Processamento
      const hospitaisFormatados: Hospital[] = apiUnidades.map(unidade => {
        // A. Ocupação
        const leitosDaUnidade = apiLeitos.filter(l => l.hospitalId === unidade.id);
        const totalLeitos = leitosDaUnidade.length;
        const ocupados = leitosDaUnidade.filter(l => l.ocupado).length;

        // B. Estoque (CORRIGIDO)
        const remediosDoHospital = apiMedicamentos.filter(m => 
          m.hospital.toLowerCase().trim() === unidade.nome.toLowerCase().trim()
        );

        const mapaEstoque = new Map<string, Medicamento>();

        remediosDoHospital.forEach(item => {
            const chave = item.modelo.nome; // Agrupa pelo nome
            
            if (!mapaEstoque.has(chave)) {
                mapaEstoque.set(chave, {
                    id: item.modelo.id.toString(),
                    nome: `${item.modelo.nome} ${item.modelo.dosagem}`,
                    estoqueAtual: 0, // Começa com 0
                    estoqueMinimo: 50, 
                    unidade: item.modelo.formaFarmaceutica,
                    lotes: [],
                    proximaValidade: undefined
                });
            }

            const med = mapaEstoque.get(chave)!;
            
            // --- CORREÇÃO AQUI: Soma a quantidade disponível do lote ---
            med.estoqueAtual += item.quantidadeDisponivel; 
            
            // Adiciona número do lote se não existir na lista
            if (!med.lotes.includes(item.lote)) {
                med.lotes.push(item.lote);
            }

            // Verifica validade mais crítica
            if (item.dataValidade) {
                if (!med.proximaValidade || new Date(item.dataValidade) < new Date(med.proximaValidade)) {
                    med.proximaValidade = item.dataValidade;
                }
            }
        });

        const estoqueProcessado = Array.from(mapaEstoque.values());

        return {
          id: unidade.id.toString(),
          cnes: unidade.cnes,
          nome: unidade.nome,
          tipo: parseInt(unidade.tipoUnidade) as TipoUnidade,
          cidade: unidade.endereco?.cidade || 'Desconhecida',
          bairro: unidade.endereco?.bairro || '',
          leitosTotais: totalLeitos,
          leitosOcupados: ocupados,
          estoque: estoqueProcessado
        };
      });

      return hospitaisFormatados;

    } catch (error) {
      console.error("Erro no serviço:", error);
      throw error;
    }
  },

  // --- MAPA DE LEITOS ---
  buscarMapaDeLeitos: async (hospitalId: string): Promise<AlaEstruturada[]> => {
    try {
      const [resAlas, resQuartos, resLeitos] = await Promise.all([
        fetch(`${API_URL}/Ala`),
        fetch(`${API_URL}/Quarto`),
        fetch(`${API_URL}/leito`)
      ]);

      if (!resAlas.ok || !resQuartos.ok || !resLeitos.ok) throw new Error('Erro ao buscar dados detalhados');

      const alas: ApiAla[] = await resAlas.json();
      const quartos: ApiQuarto[] = await resQuartos.json();
      const leitos: ApiLeito[] = await resLeitos.json();

      // Filtra alas deste hospital (pelo ID da unidade ou nome, dependendo da API)
      // Ajuste aqui se sua API Ala retornar o objeto hospital completo
      const alasDoHospital = alas.filter(a => 
        a.hospitalId === Number(hospitalId) || 
        (a.hospital && a.hospital.id === Number(hospitalId))
      );

      const mapa: AlaEstruturada[] = alasDoHospital.map(ala => {
        const quartosDaAla = quartos.filter(q => q.alaId === ala.id);
        
        const quartosEstruturados = quartosDaAla.map(quarto => {
          const leitosDoQuarto = leitos.filter(l => l.quartoId === quarto.id);
          return {
            id: quarto.id,
            numero: quarto.numero,
            leitos: leitosDoQuarto.map(l => ({
              id: l.id,
              numero: l.numero,
              ocupado: l.ocupado
            }))
          };
        });

        const totalLeitosAla = quartosEstruturados.reduce((acc, q) => acc + q.leitos.length, 0);
        const ocupadosAla = quartosEstruturados.reduce((acc, q) => acc + q.leitos.filter(l => l.ocupado).length, 0);
        
        return {
          id: ala.id,
          nome: ala.nome,
          quartos: quartosEstruturados,
          totalLeitos: totalLeitosAla,
          leitosOcupados: ocupadosAla,
          ocupacao: totalLeitosAla > 0 ? (ocupadosAla / totalLeitosAla) * 100 : 0
        };
      });

      return mapa;
    } catch (error) {
      console.error("Erro mapa leitos:", error);
      return [];
    }
  },

  // --- CADASTROS ---
  buscarInstituicoes: async (): Promise<InstituicaoResumo[]> => {
    const res = await fetch(`${API_URL}/Hospital`);
    if (!res.ok) throw new Error('Erro ao buscar instituições');
    return await res.json();
  },

  cadastrarInstituicao: async (payload: CadastroInstituicaoPayload) => {
    const res = await fetch(`${API_URL}/Hospital`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Erro ao cadastrar instituição');
    return await res.json();
  },

  cadastrarUnidade: async (payload: CadastroUnidadePayload) => {
    const res = await fetch(`${API_URL}/HospitalUnidade/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Erro ao cadastrar unidade');
    return await res.json();
  },

  deletarInstituicao: async (id: number) => {
    const res = await fetch(`${API_URL}/Hospital/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao deletar instituição');
    return true;
  },

  deletarUnidade: async (id: number | string) => {
    const res = await fetch(`${API_URL}/HospitalUnidade/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao deletar unidade');
    return true;
  },

  buscarCep: async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) throw new Error('CEP inválido');
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) throw new Error('CEP não encontrado');
    return {
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      complemento: data.complemento
    };
  },

  // --- RELATÓRIOS ---
  buscarDadosRelatorios: async () => {
    try {
      const [pacientes, alergiasPac, listaAlergias, doencasPac] = await Promise.all([
        fetch(`${API_URL}/Paciente`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/PacienteAlergia`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/Alergia`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/PacienteDoencaCronica`).then(res => res.ok ? res.json() : [])
      ]);

      return {
        pacientes: pacientes as ApiPaciente[],
        alergiasRegistradas: alergiasPac as ApiPacienteAlergia[],
        catalogoAlergias: listaAlergias as ApiAlergia[],
        doencasCronicas: doencasPac as ApiPacienteDoenca[]
      };
    } catch (error) {
      console.error("Erro ao buscar dados de relatórios", error);
      throw error;
    }
  }
};