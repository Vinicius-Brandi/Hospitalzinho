export const PacienteGenero = {
  Masculino: 1,
  Feminino: 2,
  Outro: 3
} as const;

export type PacienteGeneroType = typeof PacienteGenero[keyof typeof PacienteGenero];

export const PacienteEscolaridade = {
  Analfabeto: 1,
  FundamentalIncompleto: 2,
  FundamentalCompleto: 3,
  MedioIncompleto: 4,
  MedioCompleto: 5,
  SuperiorIncompleto: 6,
  SuperiorCompleto: 7,
  PosGraduacao: 8,
  NaoSeAplica: 9
} as const;

export type PacienteEscolaridadeType = typeof PacienteEscolaridade[keyof typeof PacienteEscolaridade];

export const PacienteEtinia = {
  Branca: 1,
  Preta: 2,
  Parda: 3,
  Amarela: 4,
  Indigena: 5
} as const;

export type PacienteEtiniaType = typeof PacienteEtinia[keyof typeof PacienteEtinia];

export interface Paciente {
    nome: string;
    cns: string;
    cpf: string;
    dataNascimento?: string;
    sexo?: PacienteGeneroType;
    raca?: PacienteEtiniaType;
    nacionalidade?: string;
    naturalidade?: string;
    escolaridade?: PacienteEscolaridadeType;
    nomeMae?: string;
    cpfMae?: string;
    nomePai?: string;
    cpfPai?: string;
    contatos?: PacienteContato;
}

export interface PacienteEndereco {
    pacienteId?: number;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

export interface PacienteContato {
    pacienteId?: number;
    telefoneResidencial?: string;
    telefoneCelular?: string;
    email?: string;
}