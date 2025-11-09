export const TipoUnidade = {
    "UnidadeBasicaDeSaude": 0,  // Unidade Básica de Saúde (UBS) / Posto de Saúde
    "CentroDeSaude": 1,         // Centro de Saúde
    "AmbulatorioDeEspecialidade": 2, // Ambulatório de Especialidade / Policlínica
    "ClinicaEspecializada": 3,  // Clínica Especializada
    "HospitalEspecializado": 4, // Hospital Especializado
    "CentroDeAtencaoPsicossocial": 5, // Centro de Atenção Psicossocial (CAPS)
    "HospitalGeral": 6,         // Hospital Geral
    "HospitalDia": 7,          // Hospital-Dia
    "UnidadeDeProntoAtendimento": 8, // Unidade de Pronto Atendimento (UPA)
    "ProntoSocorro": 9,        // Pronto-Socorro
    "ServicosDeApoioDiagnosticoETerapia": 10, // Serviços de Apoio Diagnóstico e Terapêutico (SADT)
    "Farmacia": 11,             // Farmácia
    "VigilanciaSanitariaEpidemiologica": 12, // Vigilância Sanitária e Epidemiológica
    "CentroDeReabilitacao": 13  // Centro de Reabilitação
} as const;

export type TipoUnidadeType = typeof TipoUnidade[keyof typeof TipoUnidade];

export interface Hospital {
    nome: string;
    cnpj: string;
    tokenAcesso: string;
}

export interface HospitalUnidadeEndereco {
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
}

export interface HospitalUnidade {
    nome: string;
    CNES: string;
    tipoUnidade: TipoUnidadeType;
    endereco: HospitalUnidadeEndereco;
    instituicaoPaiId: string;
}