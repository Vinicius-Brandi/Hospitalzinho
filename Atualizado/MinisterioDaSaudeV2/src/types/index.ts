// ============================================================================
// ENUMS E CONSTANTES
// ============================================================================

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

// ============================================================================
// TIPOS DO FRONTEND (ESTADO VISUAL)
// ============================================================================

export interface Medicamento {
  id: string;
  nome: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  unidade: string;
  lotes: string[];
  proximaValidade?: string;
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

// ============================================================================
// TIPOS DA API (.NET CORE) - INFRAESTRUTURA
// ============================================================================

export interface ApiEndereco {
  id: number;
  cep: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
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
  quartoId: number;
  hospitalId: number;
  ocupado?: boolean;
}

export interface ApiQuarto {
  id: number;
  numero: string;
  alaId: number;
  hospitalId: number;
  capacidade: number;
  tipo: number;
  leitos: ApiLeito[];
}

export interface ApiAla {
  id: number;
  nome: string;
  hospitalId: number;
  quartos: ApiQuarto[];
}

// ============================================================================
// Tipos de Estrutura Visual (Mapa de Leitos)
// ============================================================================

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

// ============================================================================
// TIPOS DA API - MEDICAMENTOS E ESTOQUE
// ============================================================================

export interface ApiMedicamentoModelo {
  id: number;
  nome: string;
  principioAtivo: string;
  dosagem: string;
  formaFarmaceutica: string;
  fabricante: string;
  indicacoes?: string;
  contraIndicacoes?: string;
}

export interface ApiMedicamentoEstoque {
  id: number;
  modelo: ApiMedicamentoModelo;
  lote: string;
  dataFabricacao?: string;
  dataValidade: string;
  quantidadeDisponivel: number;
  hospital: string;
}

// ============================================================================
// TIPOS DA API - PACIENTE E PRONTUÁRIO
// ============================================================================

export interface ApiPaciente {
  id: number;
  nome: string;
  cns: string;
  cpf: string;
  dataNascimento: string;
  nomePai: string;
  nomeMae: string;
  sexo: number;
  nacionalidade: string;
  raca?: number;
  naturalidade?: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  contato: {
    telefoneCelular: string;
    email: string;
  };
}

export interface ApiAlergia {
  id: number;
  nome: string;
}

export interface ApiPacienteAlergia {
  id: number;
  prontuarioId: number;
  alergiaId: number;
  nomeAlergia?: string;
}

export interface ApiPacienteDoenca {
  id: number;
  dataDiagnostico: string;
  estagio: string;
  emTratamento?: boolean;
  modelo: {
    nome: string;
    cid: string;
    descricao: string;
  };
}

export interface ApiPacienteConsulta {
  id: number;
  dataConsulta: string;
  profResponsavel: string;
  hospital: string;
  observacoes: string;
  sala: string;
  paciente: string;
}

export interface ApiPacienteExame {
  id: number;
  dataExame: string;
  tipoExame: {
    nome: string;
    descricao: string;
  };
  laboratorio: string;
  resultados: string;
  observacoes: string;
  hospital: string;
  paciente: string;
}

export interface ApiPacienteInternacao {
  id: number;
  dataInternacao: string;
  dataAlta?: string;
  motivo: string;
  hospital: string;
  profResponsavel: string;
  quarto: string;
  leito: string;
  paciente: string;
}

export interface ApiPacienteCirurgia {
  id: number;
  nome: string;
  dataCirurgia: string;
  hospital: string;
  profResponsavel: string;
  paciente: string;
}

export interface ApiPacienteMedicacao {
  id: number;
  dataInicio?: string;
  dosagemPrescrita: string;
  viaAdministracao: string;
  paciente: string;
  modelo: {
    nome: string;
    principioAtivo: string;
    dosagem?: string;
  };
}

export interface ProntuarioCompleto {
  dadosPessoais: ApiPaciente;
  alergias: ApiPacienteAlergia[];
  doencas: ApiPacienteDoenca[];
  consultas: ApiPacienteConsulta[];
  exames: ApiPacienteExame[];
  internacoes: ApiPacienteInternacao[];
  cirurgias: ApiPacienteCirurgia[];
  medicacoes: ApiPacienteMedicacao[];
}

// ============================================================================
// TIPOS PARA CADASTRO ADMINISTRATIVO
// ============================================================================

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