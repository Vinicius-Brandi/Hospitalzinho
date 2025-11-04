// Models mínimos usados pelos forms de cadastro

export type ID = string;

export enum TipoUnidade {
	UBS = 'ubs',
	CENTRO_SAUDE = 'centro-saude',
	AMBULATORIO = 'ambulatorio',
	CLINICA = 'clinica',
	HOSPITAL_ESPECIALIZADO = 'hospital-esp',
	CAPS = 'caps',
	HOSPITAL_GERAL = 'hospital-geral',
	HOSPITAL_DIA = 'hospital-dia',
	UPA = 'upa',
	PRONTO_SOCORRO = 'pronto-socorro',
	SADT = 'sadt',
	FARMACIA = 'farmacia',
	VIGILANCIA = 'vigilancia',
	REABILITACAO = 'reabilitacao',
}

export interface HospitalEndereco {
	cep?: string;
	cidade?: string;
	bairro?: string;
	rua?: string;
	numero?: string;
	complemento?: string;
}

export interface HospitalUnidade {
	nome: string;
	tipoUnidade?: TipoUnidade | string;
	instituicaoPaiId?: ID | string; // CNPJ or id depending on backend
	endereco?: HospitalEndereco;
}

export interface Hospital {
	nome: string;
	cnes?: string;
	cnpj?: string;
}