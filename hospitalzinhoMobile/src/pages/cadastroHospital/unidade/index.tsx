import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, Modal, FlatList, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../styles';
import Endereco from './Endereco';
import hospitalUnidadeService from '@/src/servicos/hospital_servicos/servicoHospitalUnidade';
import hospitalService from '@/src/servicos/hospital_servicos/servicoHospital';
import CadastroInstituicao from '../instituicao';

export default function CadastroUnidade() {
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const [nome, setNome] = useState('');
	const [tipoUnidade, setTipoUnidade] = useState('');
	const [instituicaoPaiId, setInstituicaoPaiId] = useState('');

	const [showSelector, setShowSelector] = useState(false);
	const [showCreateInstituicao, setShowCreateInstituicao] = useState(false);
	const [hospitais, setHospitais] = useState<Array<any>>([]);
	const [loadingHospitais, setLoadingHospitais] = useState(false);

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

		// enviar para API
		(async () => {
			try {
				const saved = await hospitalUnidadeService.create(payload as any);
				Alert.alert('Sucesso', 'Unidade cadastrada com sucesso.');
				console.log('Unidade criada:', saved);
				// reset form
				setNome(''); setTipoUnidade(''); setInstituicaoPaiId(''); setCep(''); setCidade(''); setBairro(''); setRua(''); setNumero(''); setComplemento('');
			} catch (err: any) {
				console.error('Erro ao criar unidade', err);
				if (err?.response?.data) {
					Alert.alert('Erro', JSON.stringify(err.response.data));
				} else {
					Alert.alert('Erro', 'Não foi possível cadastrar a unidade.');
				}
			}
		})();
	}

	async function openSelector() {
		setShowSelector(true);
		setLoadingHospitais(true);
		try {
			const list = await hospitalService.getAll();
			setHospitais(list as any);
		} catch (err) {
			console.error('Erro carregar hospitais', err);
			Alert.alert('Erro', 'Não foi possível carregar instituições.');
		} finally {
			setLoadingHospitais(false);
		}
	}

	function handleSelectHospital(item: any) {
		// depending on backend we might want id or cnpj; here we store id or cnpj if present
		setInstituicaoPaiId(item.cnpj ?? String(item.id ?? ''));
		setShowSelector(false);
	}

	function handleCreatedInstituicao(created: any) {
		// select created
		setInstituicaoPaiId(created.cnpj ?? String(created.id ?? ''));
		setShowCreateInstituicao(false);
		setShowSelector(false);
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
							<View>
								<TextInput style={[styles.input, focusedField === 'instituicaoPaiId' && styles.inputFocused]} value={instituicaoPaiId} onChangeText={setInstituicaoPaiId} onFocus={() => setFocusedField('instituicaoPaiId')} onBlur={() => setFocusedField(null)} />
								<TouchableOpacity style={[styles.smallButton]} onPress={openSelector}>
									<Text style={styles.smallButtonText}>Escolher Instituição</Text>
								</TouchableOpacity>
							</View>
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

			{/* Modal: selecionar instituição pai */}
			<Modal visible={showSelector} animationType="slide" onRequestClose={() => setShowSelector(false)}>
				<View style={[styles.container, { padding: 16 }]}> 
					<Text style={styles.title}>Selecionar Instituição</Text>
					{loadingHospitais ? <ActivityIndicator /> : (
						<FlatList data={hospitais} keyExtractor={(i) => String(i.id ?? i.cnpj ?? i.nome)} renderItem={({ item }) => (
							<TouchableOpacity style={[styles.listItem]} onPress={() => handleSelectHospital(item)}>
								<Text style={styles.label}>{item.nome} {item.cnpj ? `(${item.cnpj})` : ''}</Text>
							</TouchableOpacity>
						)} />
					)}
					<View style={styles.buttonsRow}>
						<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => setShowCreateInstituicao(true)}>
							<Text style={styles.buttonText}>Incluir Instituição</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowSelector(false)}>
							<Text style={styles.buttonText}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Modal: criar instituição (aninhado) */}
			<Modal visible={showCreateInstituicao} animationType="slide" onRequestClose={() => setShowCreateInstituicao(false)}>
				<View style={[styles.container]}>
					<CadastroInstituicao onCreated={handleCreatedInstituicao} />
					<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowCreateInstituicao(false)}>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</KeyboardAwareScrollView>
	);
}
