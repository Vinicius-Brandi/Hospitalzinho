// Minimal models for patient form

export type ID = string;

export enum SexoPaciente {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
  Outro = 'Outro',
}

export enum RacaPaciente {
  Branca = 'Branca',
  Preta = 'Preta',
  Parda = 'Parda',
  Amarela = 'Amarela',
  Indigena = 'Indigena',
}

export enum EscolaridadePaciente {
  Analfabeto = 'Analfabeto',
  FundamentalIncompleto = 'FundamentalIncompleto',
  FundamentalCompleto = 'FundamentalCompleto',
  MedioIncompleto = 'MedioIncompleto',
  MedioCompleto = 'MedioCompleto',
  SuperiorIncompleto = 'SuperiorIncompleto',
  SuperiorCompleto = 'SuperiorCompleto',
  PosGraduacao = 'PosGraduacao',
  NaoSeAplica = 'NaoSeAplica',
}

export enum TipoSanguineo {
  A_Pos = 0,
  A_Neg = 1,
  B_Pos = 2,
  B_Neg = 3,
  AB_Pos = 4,
  AB_Neg = 5,
  O_Pos = 6,
  O_Neg = 7,
  NaoSabe = 8,
}

export interface PacienteEndereco {
  cep?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  estado?: string;
}

export interface PacientePostDto {
  nome: string;
  cns: string;
  cpf: string;
  dataNascimento?: string; // ISO date string or simple input
  nomePai?: string;
  nomeMae?: string;
  cpfPai?: string;
  cpfMae?: string;
  ativo?: boolean;
  sexo?: SexoPaciente | string;
  nacionalidade?: string;
  raca?: RacaPaciente | string;
  naturalidade?: string;
  escolaridade?: EscolaridadePaciente | string;

  telefoneResidencial?: string;
  telefoneCelular?: string;
  email?: string;

  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  estado: string;
  cep?: string;

  tipoSanguineo: TipoSanguineo | number;
}
