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

export const PacienteTipoSanguineo = {
    A_Pos: 0,
    A_Neg: 1,
    B_Pos: 2,
    B_Neg: 3,
    AB_Pos: 4,
    AB_Neg: 5,
    O_Pos: 6,
    O_Neg: 7,
    NaoSabe: 8
} as const;

export type PacienteTipoSanguineoType = typeof PacienteTipoSanguineo[keyof typeof PacienteTipoSanguineo];

export interface Paciente {
    id?: number;
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
    contatos?: PacienteContato[];

    telefoneResidencial?: string;
    telefoneCelular?: string;
    email?: string;

    cep?: string;
    logradouro: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade: string;
    estado: string;

    tipoSanguineo: PacienteTipoSanguineoType;
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