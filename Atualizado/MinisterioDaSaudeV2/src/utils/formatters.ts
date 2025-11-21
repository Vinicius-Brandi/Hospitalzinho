export const getNomeTipoUnidade = (tipo: number): string => {
  const mapa: Record<number, string> = {
    0: "UBS - Unidade Básica de Saúde",
    1: "Centro de Saúde",
    2: "Ambulatório de Especialidade",
    3: "Clínica Especializada",
    4: "Hospital Especializado",
    5: "CAPS - Atenção Psicossocial",
    6: "Hospital Geral",
    7: "Hospital Dia",
    8: "UPA - Unidade de Pronto Atendimento",
    9: "Pronto-Socorro",
    10: "SADT - Apoio Diag. e Terapêutico",
    11: "Farmácia",
    12: "Vigilância Sanitária",
    13: "Centro de Reabilitação"
  };
  return mapa[tipo] || "Desconhecido";
};