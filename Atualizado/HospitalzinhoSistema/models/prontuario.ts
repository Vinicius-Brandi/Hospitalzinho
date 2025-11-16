export type MapTiposCadastro = {
    Consulta: Consulta;
    Vacinacao: Vacinacao;
    Exame: PacienteExame;
    Internacao: Internacao;
    Alergia: Alergia;
    DoencaCronica: DoencaCronica;
    Medicacao: Medicacao;
    Cirurgia: Cirurgia;
};


export interface Consulta {
    prontuarioId: string;
    data: string;
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
    quarto: string;
    hospitalId: number;
    ProfResponsavelId: string;
    profRegistro: string;
    dataEntrada: string;
    dataSaida: string;
}

export interface Alergia {
    prontuarioId: string;
    alergia: string;
    descricao: string;
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
    medicamento: string;
    dosagemPrescrita: string;
    frequenciaMedicacao: string;
    viaAdministracao: string;
    dataInicioMedicacao: string;
    dataFinalMedicacao: string;
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
    data: string;
    ProfResponsavelId: string;
    profRegistro: string;
    salaId: string;
    hospitalId: number;
    observacoes: string;
}