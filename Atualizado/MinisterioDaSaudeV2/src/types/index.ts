// Salvar em: src/types/index.ts

// --- Tipos do Frontend (Estado da Aplicação) ---

export const TipoUnidade = {
  UnidadeBasicaDeSaude: 0,
  CentroDeSaude: 1,
  AmbulatorioDeEspecialidade: 2,
  ClinicaEspecializada: 3,
  HospitalEspecializado: 4,
  CentroDeAtencaoPsicossocial: 5,
  HospitalGeral: 6,
  HospitalDia: 7,
  UnidadeDeProntoAtendimento: 8,
  ProntoSocorro: 9,
  ServicosDeApoioDiagnosticoETerapia: 10,
  Farmacia: 11,
  VigilanciaSanitariaEpidemiologica: 12,
  CentroDeReabilitacao: 13
} as const;

export type TipoUnidade = typeof TipoUnidade[keyof typeof TipoUnidade];

export interface Medicamento {
  id: string;
  nome: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  unidade: string;
  lotes: string[];
  proximaValidade?: string; // Data de validade mais crítica
}

export interface Hospital {
  id: string;
  cnes: string;
  nome: string;
  tipo: TipoUnidade;
  cidade: string;
  bairro: string;
  leitosTotais: number;
  leitosOcupados: number;
  estoque: Medicamento[];
}

export interface EstatisticasGerais {
  totalLeitos: number;
  leitosOcupados: number;
  ocupacaoMedia: number;
  alertasEstoque: number;
  totalUnidades: number;
}

export interface DadoRelatorio {
  label: string;
  valor: number;
  percentual: number;
}

// --- Tipos da API (.NET Core) ---

export interface ApiEndereco {
  cep: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  id: number;
}

export interface ApiHospitalUnidade {
  id: number;
  nome: string;
  cnes: string;
  tipoUnidade: string;
  endereco: ApiEndereco;
}

export interface ApiLeito {
  id: number;
  numero: string;
  ocupado: boolean;
  quartoId: number;
  hospitalId: number;
}

export interface ApiAla {
  id: number;
  nome: string;
  hospitalId: number; 
  hospital?: { id: number };
}

export interface ApiQuarto {
  id: number;
  numero: string;
  alaId: number;
  capacidade: number;
}

export interface AlaEstruturada {
  id: number;
  nome: string;
  quartos: QuartoEstruturado[];
  ocupacao: number;
  totalLeitos: number;
  leitosOcupados: number;
}

export interface QuartoEstruturado {
  id: number;
  numero: string;
  leitos: {
    id: number;
    numero: string;
    ocupado: boolean;
  }[];
}

// Tipos para Medicamentos
export interface ApiMedicamentoModelo {
  id: number;
  nome: string;
  principioAtivo: string;
  dosagem: string;
  formaFarmaceutica: string;
}

export interface ApiMedicamentoEstoque {
  id: number;
  modelo: ApiMedicamentoModelo;
  lote: string;
  dataValidade: string;
  quantidadeDisponivel: number; // <--- CAMPO NOVO IMPORTANTE
  hospital: string;
}

// Tipos para Relatórios
export interface ApiPaciente {
  id: number;
  cns: string;
  sexo: number;
  dataNascimento: string;
  endereco: {
    bairro: string;
    cidade: string;
  }
}

export interface ApiPacienteAlergia {
  id: number;
  alergiaId: number;
}

export interface ApiAlergia {
  id: number;
  nome: string;
}

export interface ApiPacienteDoenca {
  id: number;
  modelo: {
    nome: string;
  };
}

// Tipos para Cadastro
export interface CadastroInstituicaoPayload {
  nome: string;
  cnpj: string;
  tokenAcesso: string;
}

export interface CadastroUnidadePayload {
  nome: string;
  cnes: string;
  tipoUnidade: number;
  instituicaoPaiId: number;
  endereco: {
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  }
}

export interface InstituicaoResumo {
  id: number;
  nome: string;
  cnpj: string;
}