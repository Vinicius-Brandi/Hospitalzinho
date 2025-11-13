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

export interface Vacina {
    prontuarioId: string;
    vacina: string;
    ProfResponsavelId: string;
    profRegistro: string;
    dataAplicacao: string;
    dose: string;
    observacoes: string;
    hospitalId: number;
}

export interface Internacao {
    prontuarioId: string;
    quarto: string;
    hospitalId: string;
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
    tipoExame: string;
    laboratorio: string;
    resultados: string;
    observacoes: string;
    ProfResponsavelIdId: string;
    hospitalId: number;
}

export interface DoencaCronica {
    prontuarioId: string;
    doenca: string;
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