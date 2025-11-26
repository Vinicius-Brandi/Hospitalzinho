import {
  type ApiHospitalUnidade,
  type ApiMedicamentoEstoque,
  type Hospital,
  type Medicamento,
  type TipoUnidade,
  type ApiAla,
  type AlaEstruturada,
  type ApiPaciente,
  type ApiPacienteAlergia,
  type ApiAlergia,
  type ApiPacienteDoenca,
  type InstituicaoResumo,
  type CadastroInstituicaoPayload,
  type CadastroUnidadePayload,
  type ProntuarioCompleto
} from "../types";

const API_URL = 'http://localhost:5102/api';

export const hospitalService = {

  buscarDadosCompletos: async (): Promise<Hospital[]> => {
    try {
      // 1. Busca Unidades
      const resUnidades = await fetch(`${API_URL}/HospitalUnidade`);
      if (!resUnidades.ok) throw new Error('Falha ao buscar unidades.');
      const apiUnidades: ApiHospitalUnidade[] = await resUnidades.json();

      let todasAlas: ApiAla[] = [];
      try {
        const resAlas = await fetch(`${API_URL}/Ala`);
        if (resAlas.ok) todasAlas = await resAlas.json();
      } catch (e) { console.warn("Alas off"); }

      let apiMedicamentos: ApiMedicamentoEstoque[] = [];
      try {
        const resMed = await fetch(`${API_URL}/Medicamento`);
        if (resMed.ok) apiMedicamentos = await resMed.json();
      } catch (e) { console.warn("Medicamentos off"); }

      const hospitaisFormatados: Hospital[] = apiUnidades.map(unidade => {

        const alasDoHospital = todasAlas.filter(a => a.hospitalId === unidade.id);

        let totalLeitos = 0;
        let leitosOcupados = 0;

        alasDoHospital.forEach(ala => {
          if (ala.quartos) {
            ala.quartos.forEach(quarto => {
              if (quarto.leitos) {
                totalLeitos += quarto.leitos.length;
                leitosOcupados += quarto.leitos.filter(l => l.ocupado).length;
              }
            });
          }
        });

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
              estoqueMinimo: 25,
              unidade: item.modelo.formaFarmaceutica,
              lotes: [],
              proximaValidade: undefined
            });
          }
          const med = mapaEstoque.get(chave)!;
          med.estoqueAtual += item.quantidadeDisponivel;
          if (!med.lotes.includes(item.lote)) med.lotes.push(item.lote);

          if (item.dataValidade) {
            if (!med.proximaValidade || new Date(item.dataValidade) < new Date(med.proximaValidade)) {
              med.proximaValidade = item.dataValidade;
            }
          }
        });

        return {
          id: unidade.id.toString(),
          cnes: unidade.cnes,
          nome: unidade.nome,
          tipo: parseInt(unidade.tipoUnidade) as TipoUnidade,
          cidade: unidade.endereco?.cidade || 'Desconhecida',
          bairro: unidade.endereco?.bairro || '',
          leitosTotais: totalLeitos,
          leitosOcupados: leitosOcupados,
          estoque: Array.from(mapaEstoque.values())
        };
      });

      return hospitaisFormatados;

    } catch (error) {
      console.error("Erro no serviço:", error);
      throw error;
    }
  },

  buscarMapaDeLeitos: async (hospitalId: string): Promise<AlaEstruturada[]> => {
    try {
      const resAlas = await fetch(`${API_URL}/Ala`);

      if (!resAlas.ok) throw new Error('Erro ao buscar dados de alas');

      const todasAlas: ApiAla[] = await resAlas.json();

      const alasDoHospital = todasAlas.filter(a => a.hospitalId === Number(hospitalId));

      const mapa: AlaEstruturada[] = alasDoHospital.map(ala => {
        const quartosEstruturados = (ala.quartos || []).map(quarto => {
          return {
            id: quarto.id,
            numero: quarto.numero,
            leitos: (quarto.leitos || []).map(l => ({
              id: l.id,
              numero: l.numero,
              ocupado: !!l.ocupado
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
      console.error("Erro mapa leitos:", error);
      return [];
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
    const res = await fetch(`${API_URL}/Hospital/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao deletar instituição');
    return true;
  },

  deletarUnidade: async (id: number | string) => {
    const res = await fetch(`${API_URL}/HospitalUnidade/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao deletar unidade');
    return true;
  },

  buscarCep: async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) throw new Error('CEP inválido');
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) throw new Error('CEP não encontrado');
    return {
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      complemento: data.complemento
    };
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
  },

  buscarProntuario: async (termo: string): Promise<ProntuarioCompleto | null> => {
    try {
      const resPacientes = await fetch(`${API_URL}/Paciente`);
      if (!resPacientes.ok) throw new Error('Erro ao buscar base de pacientes');
      const listaPacientes: ApiPaciente[] = await resPacientes.json();

      const pacienteEncontrado = listaPacientes.find(p => 
        p.cpf.includes(termo) || 
        p.cns.includes(termo) || 
        p.nome.toLowerCase().includes(termo.toLowerCase())
      );

      if (!pacienteEncontrado) return null;

      const nomePaciente = pacienteEncontrado.nome;

      let listaAlergias: ApiAlergia[] = [];
      try {
        const resAl = await fetch(`${API_URL}/Alergia`);
        if (resAl.ok) listaAlergias = await resAl.json();
      } catch(e) {console.error(e)}

      const [
        resAlergiasPac,
        resDoencas,
        resConsultas,
        resExames,
        resInternacoes,
        resCirurgias,
        resMedicacoesA,
        resMedicacoesB
      ] = await Promise.all([
        fetch(`${API_URL}/PacienteAlergia`),
        fetch(`${API_URL}/PacienteDoencaCronica`),
        fetch(`${API_URL}/PacienteConsulta`),
        fetch(`${API_URL}/PacienteExame`),
        fetch(`${API_URL}/PacienteInternacao`),
        fetch(`${API_URL}/PacienteCirurgia`),
        fetch(`${API_URL}/PacienteMedicacao`),
        fetch(`${API_URL}/Medicamento`)
      ]);

      const alergiasRaw = resAlergiasPac.ok ? await resAlergiasPac.json() : [];
      const doencasRaw = resDoencas.ok ? await resDoencas.json() : [];
      const consultasRaw = resConsultas.ok ? await resConsultas.json() : [];
      const examesRaw = resExames.ok ? await resExames.json() : [];
      const internacoesRaw = resInternacoes.ok ? await resInternacoes.json() : [];
      const cirurgiasRaw = resCirurgias.ok ? await resCirurgias.json() : [];
      const medsARaw = resMedicacoesA.ok ? await resMedicacoesA.json() : [];
      const medsBRaw = resMedicacoesB.ok ? await resMedicacoesB.json() : [];

      const minhasAlergias = alergiasRaw
        .filter((a: any) => a.prontuarioId === pacienteEncontrado.id)
        .map((a: any) => ({
            ...a,
            nomeAlergia: listaAlergias.find(la => la.id === a.alergiaId)?.nome || "Alergia não especificada"
        }));

      const minhasDoencas = doencasRaw.filter((d: any) => 
        d.paciente === nomePaciente || d.pacienteCNS === pacienteEncontrado.cns
      );

      const todosMedicamentos = [...medsARaw, ...medsBRaw].filter((m: any) => m.paciente === nomePaciente);

      return {
        dadosPessoais: pacienteEncontrado,
        alergias: minhasAlergias,
        doencas: minhasDoencas,
        consultas: consultasRaw.filter((c: any) => c.paciente === nomePaciente),
        exames: examesRaw.filter((e: any) => e.paciente === nomePaciente),
        internacoes: internacoesRaw.filter((i: any) => i.paciente === nomePaciente),
        cirurgias: cirurgiasRaw.filter((c: any) => c.paciente === nomePaciente),
        medicacoes: todosMedicamentos
      };

    } catch (error) {
      console.error("Erro ao buscar prontuário:", error);
      throw error;
    }
  }
};