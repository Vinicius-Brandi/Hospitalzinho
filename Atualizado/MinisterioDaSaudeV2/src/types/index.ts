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

// NOVOS TIPOS ADICIONADOS
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
  hospital: string; // Vem o Nome do hospital
}

// ... (Mantenha todo o código anterior de TipoUnidade, Hospital, etc)

// --- NOVOS TIPOS PARA CADASTRO ---

// Payload para POST /api/Hospital
export interface CadastroInstituicaoPayload {
  nome: string;
  cnpj: string;
  tokenAcesso: string;
}

// Payload para POST /api/HospitalUnidade/cadastro
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

// Tipo simples para listar instituições no select
export interface InstituicaoResumo {
  id: number;
  nome: string;
  cnpj: string;
}

export interface ApiAla {
  id: number;
  nome: string;
  hospitalId: number; // Supondo que a API retorne o vínculo ou filtramos pelo objeto hospital
  hospital?: { id: number }; // Ajuste conforme o retorno real da sua API
}

export interface ApiQuarto {
  id: number;
  numero: string;
  alaId: number;
  capacidade: number;
}

// Estrutura hierárquica para o Frontend usar
export interface AlaEstruturada {
  id: number;
  nome: string;
  quartos: QuartoEstruturado[];
  ocupacao: number; // %
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

export interface DadoRelatorio {
  label: string;
  valor: number;
  percentual: number;
}