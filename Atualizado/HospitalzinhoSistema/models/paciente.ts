export enum PacienteGenero {
  Masculino = 1,
  Feminino = 2,
  Outro = 3
}

export enum PacienteEscolaridade {
  Analfabeto = 1,
  FundamentalIncompleto = 2,
  FundamentalCompleto = 3,
  MedioIncompleto = 4,
  MedioCompleto = 5,
  SuperiorIncompleto = 6,
  SuperiorCompleto = 7,
  PosGraduacao = 8,
  NaoSeAplica = 9
}

export enum PacienteEtinia
{
    Branca = 1,
    Preta = 2,
    Parda = 3,
    Amarela = 4,
    Indigena = 5
}

export interface Paciente {
    nome: string;
    cns: string;
    cpf: string;
    dataNascimento?: string;
    sexo?: PacienteGenero;
    raca?: PacienteEtinia;
    nacionalidade?: string;
    naturalidade?: string;
    escolaridade?: PacienteEscolaridade;
    nomeMae?: string;
    cpfMae?: string;
    nomePai?: string;
    cpfPai?: string;
}