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

interface TipoUnidadeOption {
  id: string;
  label: string;
  value: TipoUnidadeType;
}

export const tipoUnidadeOptions: TipoUnidadeOption[] = [
  { id: "tipo-ubs", label: "Unidade Básica de Saúde (UBS) / Posto de Saúde", value: TipoUnidade.UnidadeBasicaDeSaude },
  { id: "tipo-centro-saude", label: "Centro de Saúde", value: TipoUnidade.CentroDeSaude },
  { id: "tipo-ambulatorio", label: "Ambulatório de Especialidade / Policlínica", value: TipoUnidade.AmbulatorioDeEspecialidade },
  { id: "tipo-clinica", label: "Clínica Especializada", value: TipoUnidade.ClinicaEspecializada },
  { id: "tipo-hospital-esp", label: "Hospital Especializado", value: TipoUnidade.HospitalEspecializado },
  { id: "tipo-caps", label: "Centro de Atenção Psicossocial (CAPS)", value: TipoUnidade.CentroDeAtencaoPsicossocial },
  { id: "tipo-hospital-geral", label: "Hospital Geral", value: TipoUnidade.HospitalGeral },
  { id: "tipo-hospital-dia", label: "Hospital-Dia", value: TipoUnidade.HospitalDia },
  { id: "tipo-upa", label: "Unidade de Pronto Atendimento (UPA)", value: TipoUnidade.UnidadeDeProntoAtendimento },
  { id: "tipo-pronto-socorro", label: "Pronto-Socorro", value: TipoUnidade.ProntoSocorro },
  { id: "tipo-sadt", label: "Serviços de Apoio Diagnóstico e Terapêutico (SADT)", value: TipoUnidade.ServicosDeApoioDiagnosticoETerapia },
  { id: "tipo-farmacia", label: "Farmácia", value: TipoUnidade.Farmacia },
  { id: "tipo-vigilancia", label: "Vigilância Sanitária e Epidemiológica", value: TipoUnidade.VigilanciaSanitariaEpidemiologica },
  { id: "tipo-reabilitacao", label: "Centro de Reabilitação", value: TipoUnidade.CentroDeReabilitacao },
];

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