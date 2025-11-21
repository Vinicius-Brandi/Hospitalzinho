import { type AlaEstruturada, type ApiAla, type ApiAlergia, type ApiHospitalUnidade, type ApiLeito, type ApiMedicamentoEstoque, type ApiPaciente, type ApiPacienteAlergia, type ApiPacienteDoenca, type ApiQuarto, type CadastroInstituicaoPayload, type CadastroUnidadePayload, type Hospital, type InstituicaoResumo, type Medicamento, TipoUnidade } from "../types";

const API_URL = 'http://localhost:5102/api';

export const hospitalService = {
  buscarDadosCompletos: async (): Promise<Hospital[]> => {
    try {
      const resUnidades = await fetch(`${API_URL}/HospitalUnidade`);
      if (!resUnidades.ok) throw new Error('Falha ao buscar unidades. Status: ' + resUnidades.status);
      const apiUnidades: ApiHospitalUnidade[] = await resUnidades.json();

      let apiLeitos: ApiLeito[] = [];
      try {
        const resLeitos = await fetch(`${API_URL}/leito`);
        if (resLeitos.ok) apiLeitos = await resLeitos.json();
      } catch (e) {
        console.warn("Endpoint de leitos inacessível ou vazio.");
      }

      let apiMedicamentos: ApiMedicamentoEstoque[] = [];
      try {
        const resMed = await fetch(`${API_URL}/Medicamento`);
        if (resMed.ok) apiMedicamentos = await resMed.json();
      } catch (e) {
        console.warn("Endpoint de medicamentos inacessível.");
      }

      const hospitaisFormatados: Hospital[] = apiUnidades.map(unidade => {
        const leitosDaUnidade = apiLeitos.filter(l => l.hospitalId === unidade.id);
        const totalLeitos = leitosDaUnidade.length;
        const ocupados = leitosDaUnidade.filter(l => l.ocupado).length;

        const remediosDoHospital = apiMedicamentos.filter(m =>
          m.hospital.toLowerCase().trim() === unidade.nome.toLowerCase().trim()
        );

        const mapaEstoque = new Map<string, Medicamento>();

        remediosDoHospital.forEach(item => {
          const chave = item.modelo.nome;

          if (!mapaEstoque.has(chave)) {
            mapaEstoque.set(chave, {
              id: item.modelo.id.toString(),
              nome: `${item.modelo.nome} ${item.modelo.dosagem}`,
              estoqueAtual: 0,
              estoqueMinimo: 50,
              unidade: item.modelo.formaFarmaceutica,
              lotes: []
            });
          }

          const med = mapaEstoque.get(chave)!;
          med.estoqueAtual += 1;
          if (!med.lotes.includes(item.lote)) {
            med.lotes.push(item.lote);
          }
        });

        const estoqueProcessado = Array.from(mapaEstoque.values());

        return {
          id: unidade.id.toString(),
          cnes: unidade.cnes,
          nome: unidade.nome,
          tipo: parseInt(unidade.tipoUnidade) as TipoUnidade,
          cidade: unidade.endereco?.cidade || 'Desconhecida',
          bairro: unidade.endereco?.bairro || '',
          leitosTotais: totalLeitos,
          leitosOcupados: ocupados,
          estoque: estoqueProcessado
        };
      });

      return hospitaisFormatados;

    } catch (error) {
      console.error("Erro no serviço de hospitais:", error);
      throw error;
    }
  },

  buscarInstituicoes: async (): Promise<InstituicaoResumo[]> => {
    const res = await fetch(`${API_URL}/Hospital`);
    if (!res.ok) throw new Error('Erro ao buscar instituições');
    return await res.json();
  },

  cadastrarInstituicao: async (payload: CadastroInstituicaoPayload) => {
    const res = await fetch(`${API_URL}/Hospital`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Erro ao cadastrar instituição');
    return await res.json();
  },

  cadastrarUnidade: async (payload: CadastroUnidadePayload) => {
    const res = await fetch(`${API_URL}/HospitalUnidade/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Erro ao cadastrar unidade');
    return await res.json();
  },

  deletarInstituicao: async (id: number) => {
    const res = await fetch(`${API_URL}/Hospital/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erro ao deletar instituição');
    return true;
  },

  deletarUnidade: async (id: number | string) => {
    const res = await fetch(`${API_URL}/HospitalUnidade/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erro ao deletar unidade');
    return true;
  },

  buscarCep: async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }

    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      complemento: data.complemento
    };
  },

  buscarMapaDeLeitos: async (hospitalId: string): Promise<AlaEstruturada[]> => {
    try {
      const [resAlas, resQuartos, resLeitos] = await Promise.all([
        fetch(`${API_URL}/Ala`),
        fetch(`${API_URL}/Quarto`),
        fetch(`${API_URL}/leito`)
      ]);

      if (!resAlas.ok || !resQuartos.ok || !resLeitos.ok) throw new Error('Erro ao buscar dados de leitos');

      const alas: ApiAla[] = await resAlas.json();
      const quartos: ApiQuarto[] = await resQuartos.json();
      const leitos: ApiLeito[] = await resLeitos.json();

      const alasDoHospital = alas.filter(a => a.hospital?.id === Number(hospitalId) || (a as any).hospitalId === Number(hospitalId));

      const mapa: AlaEstruturada[] = alasDoHospital.map(ala => {
        const quartosDaAla = quartos.filter(q => q.alaId === ala.id);

        const quartosEstruturados = quartosDaAla.map(quarto => {
          const leitosDoQuarto = leitos.filter(l => l.quartoId === quarto.id);
          return {
            id: quarto.id,
            numero: quarto.numero,
            leitos: leitosDoQuarto.map(l => ({
              id: l.id,
              numero: l.numero,
              ocupado: l.ocupado
            }))
          };
        });

        const totalLeitosAla = quartosEstruturados.reduce((acc, q) => acc + q.leitos.length, 0);
        const ocupadosAla = quartosEstruturados.reduce((acc, q) => acc + q.leitos.filter(l => l.ocupado).length, 0);

        return {
          id: ala.id,
          nome: ala.nome,
          quartos: quartosEstruturados,
          totalLeitos: totalLeitosAla,
          leitosOcupados: ocupadosAla,
          ocupacao: totalLeitosAla > 0 ? (ocupadosAla / totalLeitosAla) * 100 : 0
        };
      });

      return mapa;

    } catch (error) {
      console.error("Erro ao montar mapa de leitos:", error);
      return [];
    }
  },

    buscarDadosRelatorios: async () => {
    try {
      const [pacientes, alergiasPac, listaAlergias, doencasPac] = await Promise.all([
        fetch(`${API_URL}/Paciente`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/PacienteAlergia`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/Alergia`).then(res => res.ok ? res.json() : []),
        fetch(`${API_URL}/PacienteDoencaCronica`).then(res => res.ok ? res.json() : [])
      ]);

      return {
        pacientes: pacientes as ApiPaciente[],
        alergiasRegistradas: alergiasPac as ApiPacienteAlergia[],
        catalogoAlergias: listaAlergias as ApiAlergia[],
        doencasCronicas: doencasPac as ApiPacienteDoenca[]
      };
    } catch (error) {
      console.error("Erro ao buscar dados de relatórios", error);
      throw error;
    }
  }
};