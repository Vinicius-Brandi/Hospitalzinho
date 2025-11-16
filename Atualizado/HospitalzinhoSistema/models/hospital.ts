export interface ProfissionalResponsavel {
    nome: string;
    registroProfissional: string;
    especialidade: string;
    hospitalId: number;
}

export interface Especialidade {
    nome: string
}

export interface Sala {
    numero: string;
    alaId: number;
    tipo: SalaTipoType;
}

export interface Ala {
    nome: string;
    hospitalId: number;
}

export const SalaTipo = {
    Consultorio: 1,
    Exame: 2,
    Procedimento: 3,
    Cirurgia: 4,
    Internacao: 5,
    Emergencia: 6
} as const;

export type SalaTipoType = typeof SalaTipo[keyof typeof SalaTipo];

export const AlaTipo = {
    Enfermaria: 1,
    UTI: 2,
    Isolamento: 3,
    SemiIntensivo: 4
} as const;

export type AlaTipoType = typeof AlaTipo[keyof typeof AlaTipo];

export interface Quarto {
    numero: string;
    alaId: number;
    tipo: QuartoTipoType;
    capacidade: number;
}

export const QuartoTipo = {
    Enfermaria: 1,
    UTI: 2,
    Isolamento: 3,
    SemiIntensivo: 4
} as const;

export type QuartoTipoType = typeof QuartoTipo[keyof typeof QuartoTipo];

export interface Leito {
    numero: string;
    ocupado: boolean;
    quartoId: number;
    hospitalId: number;
}

export const HOSPITALID = 1;