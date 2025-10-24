import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';

const defaultCities = [
	{ label: 'Selecione a cidade/distrito', value: '' },
	{ label: 'Marília', value: 'marilia' },
	{ label: 'Amadeu Amaral', value: 'amadeu-amaral' },
	{ label: 'Avencas', value: 'avencas' },
	{ label: 'Dirceu', value: 'dirceu' },
	{ label: 'Lácio', value: 'lacio' },
	{ label: 'Padre Nóbrega', value: 'padre-nobrega' },
	{ label: 'Rosália', value: 'rosalia' },
];

export default function CadastroHospital() {
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const [tipoCadastro, setTipoCadastro] = useState<'instituicao' | 'unidade'>('instituicao');
	const [nomeHospital, setNomeHospital] = useState('');
	const [cnes, setCnes] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [instituicaoPaiId, setInstituicaoPaiId] = useState('');
	const [tipoUnidade, setTipoUnidade] = useState('');

	const [cep, setCep] = useState('');
	const [cidade, setCidade] = useState('');
	const [bairro, setBairro] = useState('');
	const [rua, setRua] = useState('');
	const [numero, setNumero] = useState('');
	const [complemento, setComplemento] = useState('');

	function handleSubmit() {
		if (!nomeHospital.trim()) {
			Alert.alert('Validação', 'O nome do hospital/unidade é obrigatório.');
			return;
		}
		if (!tipoUnidade) {
			Alert.alert('Validação', 'Selecione o tipo de unidade.');
			return;
		}
		if (!cidade) {
			Alert.alert('Validação', 'Selecione a cidade/distrito.');
			return;
		}

		const payload = {
			tipoCadastro,
			nomeHospital,
			cnes,
			cnpj,
			instituicaoPaiId: tipoCadastro === 'unidade' ? instituicaoPaiId : null,
			tipoUnidade,
			endereco: { cep, cidade, bairro, rua, numero, complemento },
		};

		Alert.alert('Cadastro', 'Dados prontos para envio (veja console).');
		console.log('Cadastro payload:', payload);
	}

	return (
		<KeyboardAwareScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="handled"
			extraScrollHeight={Platform.OS === 'ios' ? 100 : 80}
			enableOnAndroid
		>
			<Text style={styles.title}>Cadastro de Novo Hospital</Text>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Informações da Unidade</Text>

				<View style={styles.formGroupSelector}>
					<Text style={styles.label}>Tipo de Cadastro</Text>
					<View style={styles.pickerWrapper}>
						<Picker
							selectedValue={tipoCadastro}
							onValueChange={(v: string) => setTipoCadastro(v as 'instituicao' | 'unidade')}
							mode="dropdown"
						>
							<Picker.Item label="Instituição Principal" value="instituicao" />
							<Picker.Item label="Unidade Vinculada" value="unidade" />
						</Picker>
					</View>
				</View>

				<View style={styles.fieldset}>
					<Text style={styles.legend}>Dados Gerais</Text>

					<View style={styles.formGrid}>
						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Nome do Hospital / Unidade</Text>
							<TextInput
								style={[styles.input, focusedField === 'nomeHospital' && styles.inputFocused]}
								value={nomeHospital}
								onChangeText={setNomeHospital}
								placeholder="Nome do Hospital / Unidade"
								maxLength={255}
								onFocus={() => setFocusedField('nomeHospital')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>CNES</Text>
							<TextInput
								style={[styles.input, focusedField === 'cnes' && styles.inputFocused]}
								value={cnes}
								onChangeText={setCnes}
								maxLength={7}
								onFocus={() => setFocusedField('cnes')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>CNPJ</Text>
							<TextInput
								style={[styles.input, focusedField === 'cnpj' && styles.inputFocused]}
								value={cnpj}
								onChangeText={setCnpj}
								placeholder="XX.XXX.XXX/XXXX-XX"
								onFocus={() => setFocusedField('cnpj')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						{tipoCadastro === 'unidade' && (
							<View style={[styles.formGroup, styles.fullWidth]}>
								<Text style={styles.label}>Vincular à Instituição Principal</Text>
								<TextInput
									style={[styles.input, focusedField === 'instituicaoPaiId' && styles.inputFocused]}
									value={instituicaoPaiId}
									onChangeText={setInstituicaoPaiId}
									placeholder="Digite o CNPJ da instituição principal"
									onFocus={() => setFocusedField('instituicaoPaiId')}
									onBlur={() => setFocusedField(null)}
								/>
							</View>
						)}

						<View style={styles.formGroup}>
							<Text style={styles.label}>Tipo de Unidade</Text>
							<View style={styles.pickerWrapper}>
								<Picker selectedValue={tipoUnidade} onValueChange={(v: string) => setTipoUnidade(v)}>
									<Picker.Item label="Selecione o tipo" value="" />
									<Picker.Item label="Unidade Básica de Saúde (UBS) / Posto de Saúde" value="ubs" />
									<Picker.Item label="Centro de Saúde" value="centro-saude" />
									<Picker.Item label="Ambulatório de Especialidade / Policlínica" value="ambulatorio" />
									<Picker.Item label="Clínica Especializada" value="clinica" />
									<Picker.Item label="Hospital Especializado" value="hospital-esp" />
									<Picker.Item label="Centro de Atenção Psicossocial (CAPS)" value="caps" />
									<Picker.Item label="Hospital Geral" value="hospital-geral" />
									<Picker.Item label="Hospital-Dia" value="hospital-dia" />
									<Picker.Item label="Unidade de Pronto Atendimento (UPA)" value="upa" />
									<Picker.Item label="Pronto-Socorro" value="pronto-socorro" />
									<Picker.Item label="Serviços de Apoio Diagnóstico e Terapêutico (SADT)" value="sadt" />
									<Picker.Item label="Farmácia" value="farmacia" />
									<Picker.Item label="Vigilância Sanitária e Epidemiológica" value="vigilancia" />
									<Picker.Item label="Centro de Reabilitação" value="reabilitacao" />
								</Picker>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.fieldset}>
					<Text style={styles.legend}>Endereço</Text>
					<View style={styles.addressGrid}>
						<View style={styles.formGroup}>
							<Text style={styles.label}>CEP</Text>
							<TextInput
								style={[styles.input, focusedField === 'cep' && styles.inputFocused]}
								value={cep}
								onChangeText={setCep}
								placeholder="XXXXX-XXX"
								onFocus={() => setFocusedField('cep')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Cidade</Text>
							<View style={styles.pickerWrapper}>
								<Picker selectedValue={cidade} onValueChange={(v: string) => setCidade(v)}>
									{defaultCities.map((c) => (
										<Picker.Item key={c.value} label={c.label} value={c.value} />
									))}
								</Picker>
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Bairro</Text>
							<TextInput
								style={[styles.input, focusedField === 'bairro' && styles.inputFocused]}
								value={bairro}
								onChangeText={setBairro}
								onFocus={() => setFocusedField('bairro')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Rua</Text>
							<TextInput
								style={[styles.input, focusedField === 'rua' && styles.inputFocused]}
								value={rua}
								onChangeText={setRua}
								onFocus={() => setFocusedField('rua')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Número</Text>
							<TextInput
								style={[styles.input, focusedField === 'numero' && styles.inputFocused]}
								value={numero}
								onChangeText={setNumero}
								onFocus={() => setFocusedField('numero')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Complemento</Text>
							<TextInput
								style={[styles.input, focusedField === 'complemento' && styles.inputFocused]}
								value={complemento}
								onChangeText={setComplemento}
								onFocus={() => setFocusedField('complemento')}
								onBlur={() => setFocusedField(null)}
							/>
						</View>
					</View>
				</View>

				<View style={styles.buttonsRow}>
					<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Salvar Cadastro</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.cancelButton]}
						onPress={() => {
							setNomeHospital('');
							setCnes('');
							setCnpj('');
							setInstituicaoPaiId('');
							setTipoUnidade('');
							setCep('');
							setCidade('');
							setBairro('');
							setRua('');
							setNumero('');
							setComplemento('');
						}}
					>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
