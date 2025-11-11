export interface Consulta {
    pacienteId: string;
    data: string;
    profissionalResponsavel: string;
    hospital: string;
    observacoes: string;
    sala: string;
}

export interface Vacina {
    pacienteId: string;
    vacina: string;
    profissionalResponsavel: string;
    profRegistro : string;
    dataAplicacao: string;
    dose: string;
    observacoes: string;
    hospital : string;
}

export interface Internacao {
    pacienteId: string;
    quarto: string;
    hospital: string;
    profissionalResponsavel: string;
    profRegistro: string;
    dataEntrada: string;
    dataSaida: string;
}

export interface Alergia {
    pacienteId: string;
    alergia: string;
    descricao: string;
}

export interface TipoExame {
    nome: string;
    descricao: string;
}

export interface PacienteExame {
    pacienteId: string;
    data: string;
    tipoExame: string;
    laboratorio: string;
    resultados: string;
    observacoes: string;
    profissionalResponsavel: string;
    profissionalRegistro: string;
    hospital: string;
}

export interface DoencaCronica {
    pacienteId: string;
    doenca: string;
    dataDiagnostico: string;
    estagio: string;
    observacoes: string;
    emTratamento: string;
}

export interface Medicacao {
    pacienteId: string;
    medicamento: string;
    dosagemPrescrita: string;
    frequenciaMedicacao: string;
    viaAdministracao: string;
    dataInicioMedicacao: string;
    dataFinalMedicacao: string;
    obsMedicacao: string;
}

export interface Cirurgia {
    pacienteId: string;
    nome : string;
    data : string;
    profissionalResponsavel : string;
    profRegistro : string;
    sala : string;
    hospital : string;
    observacoes : string;
}