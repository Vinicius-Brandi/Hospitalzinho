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
  estoqueMinimo: 25;
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

// ATUALIZADO: Leito agora reflete o objeto dentro de Quarto
export interface ApiLeito {
  id: number;
  numero: string;
  quartoId: number;
  hospitalId: number;
  ocupado?: boolean; // Opcional pois no endpoint plano /api/Leito pode não vir, mas no aninhado vem
}

// ATUALIZADO: Quarto agora contem a lista de leitos
export interface ApiQuarto {
  id: number;
  numero: string;
  alaId: number;
  hospitalId: number;
  capacidade: number;
  tipo: number;
  leitos: ApiLeito[]; // Lista aninhada vinda da API
}

// ATUALIZADO: Ala agora contem a lista de quartos e o hospitalId direto
export interface ApiAla {
  id: number;
  nome: string;
  hospitalId: number; 
  quartos: ApiQuarto[]; // Lista aninhada vinda da API
}

// --- Tipos de Estrutura Visual (Mantidos) ---
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
  quantidadeDisponivel: number;
  hospital: string;
}

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

export interface ApiPacienteAlergia {
  id: number;
  prontuarioId: number;
  alergiaId: number;
  // Como a API não retornou o nome da alergia no objeto, assumimos que o Frontend cruzará com uma lista ou que virá num update futuro. 
  // Para este exemplo, vou simular o nome baseado no ID ou adicionar um campo opcional caso a API mude.
  nomeAlergia?: string; 
}

export interface ApiPacienteDoenca {
  id: number;
  dataDiagnostico: string;
  estagio: string;
  emTratamento: boolean;
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
}

export interface ApiPacienteCirurgia {
  id: number;
  nome: string; // Nome da cirurgia
  dataCirurgia: string;
  hospital: string;
  profResponsavel: string;
}

export interface ApiPacienteMedicacao {
  id: number;
  dataInicio: string;
  dataFim: string;
  dosagemPrescrita: string;
  viaAdministracao: string;
  modelo: {
    nome: string;
    principioAtivo: string;
  };
}

// Tipo Agregado para facilitar o uso na tela
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