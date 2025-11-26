export type MapTiposCadastro = {
    Consulta: Consulta;
    Vacinacao: Vacinacao;
    Exame: PacienteExame;
    Internacao: Internacao;
    Alergia: PacienteAlergia;
    DoencaCronica: DoencaCronica;
    Medicacao: Medicacao;
    Cirurgia: Cirurgia;
};


export interface Consulta {
    prontuarioId: string;
    dataConsulta: string;
    ProfResponsavelId: string;
    hospitalId: string;
    observacoes: string;
    salaId: string;
}

export interface VacinaModelo {
    nome: string;
    fabricante: string;
    tipo: string;
    indicacao: string;
    numeroDoses: number;
    intervaloEntreDoses: number;
}

export interface Vacina {
    lote: string;
    dataProducao: string;
    dataValidade: string;
    quantidadeDisponivel: number;
    vacinaModeloId: string;
    hospitalId: number;
}

export interface Vacinacao {
    prontuarioId: string;
    vacinaId: number;
    ProfResponsavelId: string;
    dataAplicacao: string;
    doseNumero: number;
    observacoes: string;
    hospitalId: number;
}

export interface Internacao {
    prontuarioId: string;
    dataInternacao: string;
    dataAlta: string;
    leitoId: string;
    motivo: string;
    ProfResponsavelId: string;
    observacoes: string;
    hospitalId: number;
}

export interface Alergia {
    nome: string;
    tipo: string;
}

export const TipoAlergia = {
    Alimentar: 0,
    Medicamentos: 1,
    Ambiental: 2,
    Outra: 3
}

export interface PacienteAlergia {
    prontuarioId: string;
    alergiaId: string;
    observacaoes: string;
}

export interface TipoExame {
    id?: string;
    nome: string;
    descricao: string;
}

export interface PacienteExame {
    prontuarioId: string;
    data: string;
    tipoExameId: string;
    laboratorio: string;
    resultados: string;
    observacoes: string;
    ProfResponsavelId: string;
    hospitalId: number;
}

export interface DoencaCronica {
    prontuarioId: string;
    ModeloId: string;
    dataDiagnostico: string;
    estagio: string;
    observacoes: string;
    emTratamento: string;
}

export interface TipoDoencaCronica {
    id?: string;
    nome: string;
    cid: string;
    descricao: string;
}

export interface Medicacao {
    prontuarioId: string;
    modeloId: string;
    dosagemPrescrita: string;
    frequenciaMedicacao: string;
    viaAdministracao: string;
    dataInicio: string;
    dataFim: string;
    obsMedicacao: string;
}

export interface MedicamentoModelo {
    nome: string;
    principioAtivo: string;
    fabricante: string;
    formaFarmaceutica: string;
    dosagem: string;
    indicacoes: string;
    contraIndicacoes: string;
}

export interface Cirurgia {
    prontuarioId: string;
    nome: string;
    dataCirurgia: string;
    profResponsavelId: string;
    salaId: string;
    hospitalId: number;
    observacoes: string;
}