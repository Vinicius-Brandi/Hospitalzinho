import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../styles';
import Endereco from './Endereco';

export default function CadastroUnidade() {
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const [nome, setNome] = useState('');
	const [tipoUnidade, setTipoUnidade] = useState('');
	const [instituicaoPaiId, setInstituicaoPaiId] = useState('');

	const [cep, setCep] = useState('');
	const [cidade, setCidade] = useState('');
	const [bairro, setBairro] = useState('');
	const [rua, setRua] = useState('');
	const [numero, setNumero] = useState('');
	const [complemento, setComplemento] = useState('');

	function handleSubmit() {
		if (!nome.trim()) {
			Alert.alert('Validação', 'O nome da unidade é obrigatório.');
			return;
		}
		if (!instituicaoPaiId.trim()) {
			Alert.alert('Validação', 'Informe o CNPJ da instituição pai.');
			return;
		}

		const payload = { nome, tipoUnidade, instituicaoPaiId, endereco: { cep, cidade, bairro, rua, numero, complemento } };
		Alert.alert('Cadastro', 'Dados prontos para envio (veja console).');
		console.log('Unidade payload:', payload);
	}

	return (
		<KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content} enableOnAndroid>
			<Text style={styles.title}>Cadastro de Unidade</Text>

			<View style={styles.section}>
				<View style={styles.fieldset}>
					<Text style={styles.legend}>Dados Gerais</Text>

					<View style={styles.formGrid}>
						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Nome da Unidade</Text>
							<TextInput style={[styles.input, focusedField === 'nome' && styles.inputFocused]} value={nome} onChangeText={setNome} onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)} />
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Vincular à Instituição Principal (CNPJ)</Text>
							<TextInput style={[styles.input, focusedField === 'instituicaoPaiId' && styles.inputFocused]} value={instituicaoPaiId} onChangeText={setInstituicaoPaiId} onFocus={() => setFocusedField('instituicaoPaiId')} onBlur={() => setFocusedField(null)} />
						</View>

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

				{/* componente de endereço */}
				<Endereco cep={cep} cidade={cidade} bairro={bairro} rua={rua} numero={numero} complemento={complemento} focusedField={focusedField} setCep={setCep} setCidade={setCidade} setBairro={setBairro} setRua={setRua} setNumero={setNumero} setComplemento={setComplemento} />

				<View style={styles.buttonsRow}>
					<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Salvar Unidade</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {
						setNome(''); setTipoUnidade(''); setInstituicaoPaiId(''); setCep(''); setCidade(''); setBairro(''); setRua(''); setNumero(''); setComplemento('');
					}}>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
