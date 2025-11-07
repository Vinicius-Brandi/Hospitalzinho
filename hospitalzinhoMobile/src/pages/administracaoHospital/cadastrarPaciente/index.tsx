import { TipoSanguineo } from '@/src/Models/Paciente/pacienteModels';
import pacienteService from '@/src/servicos/paciente_servicos/servicoPaciente';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../../cadastroHospital/styles';

export default function CadastroPaciente() {
	const [focusedField, setFocusedField] = useState<string | null>(null);

	// basic fields
	const [nome, setNome] = useState('');
	const [cns, setCns] = useState('');
	const [cpf, setCpf] = useState('');
	const [dataNascimento, setDataNascimento] = useState('');

	// contato
	const [telefoneResidencial, setTelefoneResidencial] = useState('');
	const [telefoneCelular, setTelefoneCelular] = useState('');
	const [email, setEmail] = useState('');

	// endereco
	const [logradouro, setLogradouro] = useState('');
	const [numero, setNumero] = useState('');
	const [complemento, setComplemento] = useState('');
	const [bairro, setBairro] = useState('');
	const [cidade, setCidade] = useState('');
	const [estado, setEstado] = useState('');
	const [cep, setCep] = useState('');

	const [tipoSanguineo, setTipoSanguineo] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);

	function validate(): boolean {
		if (!nome.trim()) {
			Alert.alert('Validação', 'O nome é obrigatório.');
			return false;
		}
		if (!cns.trim()) {
			Alert.alert('Validação', 'O CNS é obrigatório.');
			return false;
		}
		if (!cpf.trim()) {
			Alert.alert('Validação', 'O CPF é obrigatório.');
			return false;
		}
		if (!logradouro.trim() || !cidade.trim() || !estado.trim()) {
			Alert.alert('Validação', 'Logradouro, cidade e estado são obrigatórios.');
			return false;
		}
		if (tipoSanguineo === null) {
			Alert.alert('Validação', 'Selecione o tipo sanguíneo.');
			return false;
		}
		return true;
	}

	async function handleSubmit() {
		if (!validate()) return;
		setLoading(true);
		const payload: any = {
			Nome: nome,
			CNS: cns,
			Cpf: cpf,
			DataNascimento: dataNascimento || null,
			TelefoneResidencial: telefoneResidencial || null,
			TelefoneCelular: telefoneCelular || null,
			Email: email || null,
			Logradouro: logradouro,
			Numero: numero || null,
			Complemento: complemento || null,
			Bairro: bairro || null,
			Cidade: cidade,
			Estado: estado,
			Cep: cep || null,
			TipoSanguineo: tipoSanguineo,
			Ativo: true
		};

		try {
			const saved = await pacienteService.cadastro(payload);
			Alert.alert('Sucesso', 'Paciente cadastrado com sucesso.');
			// reset
			setNome(''); setCns(''); setCpf(''); setDataNascimento(''); setTelefoneResidencial(''); setTelefoneCelular(''); setEmail(''); setLogradouro(''); setNumero(''); setComplemento(''); setBairro(''); setCidade(''); setEstado(''); setCep(''); setTipoSanguineo(null);
			console.log('Paciente criado', saved);
		} catch (err: any) {
			console.error('Erro ao cadastrar paciente', err);
			if (err?.response?.data) {
				Alert.alert('Erro', JSON.stringify(err.response.data));
			} else {
				Alert.alert('Erro', 'Não foi possível cadastrar o paciente.');
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content} enableOnAndroid>
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<View style={styles.logoWrap}>
						<MaterialIcons name="person" size={28} color="#fff" />
					</View>
					<View>
						<Text style={styles.headerTitle}>Cadastro de Paciente</Text>
						<Text style={styles.headerSubtitle}>Registre os dados básicos do paciente</Text>
					</View>
				</View>
			</View>

			<View style={styles.card}>
				<View style={styles.fieldset}>
					<Text style={styles.legend}>Dados Pessoais</Text>
					<View style={styles.formGrid}>
						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Nome</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="badge" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'nome' && styles.inputFocused]} value={nome} onChangeText={setNome} onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>CNS</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="assignment-ind" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'cns' && styles.inputFocused]} value={cns} onChangeText={setCns} onFocus={() => setFocusedField('cns')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

									<View style={styles.formGroup}>
										<Text style={styles.label}>CPF</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="credit-card" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'cpf' && styles.inputFocused]} value={cpf} onChangeText={setCpf} onFocus={() => setFocusedField('cpf')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Data de Nascimento (YYYY-MM-DD)</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="event" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'dataNascimento' && styles.inputFocused]} value={dataNascimento} onChangeText={setDataNascimento} onFocus={() => setFocusedField('dataNascimento')} onBlur={() => setFocusedField(null)} placeholder="1980-01-31" />
							</View>
						</View>

						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Tipo Sanguíneo</Text>
											<View style={styles.pickerWrapper}>
												<Text style={styles.label}>{tipoSanguineo !== null ? String(tipoSanguineo) : 'Selecione'}</Text>
												<View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
									{Object.keys(TipoSanguineo).filter(k => Number.isFinite(Number(TipoSanguineo[k as any]))).map((k) => {
										const key = k as keyof typeof TipoSanguineo;
										const value = (TipoSanguineo as any)[key] as number;
										return (
											<TouchableOpacity key={k} style={[styles.smallButton, tipoSanguineo === value ? styles.saveButton : styles.cancelButton, {marginRight: 8, marginBottom: 8}]} onPress={() => setTipoSanguineo(value)}>
												<Text style={styles.smallButtonText}>{key.replace('_', ' ')}</Text>
											</TouchableOpacity>
										);
									})}
								</View>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.fieldset}>
					<Text style={styles.legend}>Contato</Text>
					<View style={styles.formGrid}>
						<View style={styles.formGroup}>
							<Text style={styles.label}>Telefone Residencial</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="phone" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'telefoneResidencial' && styles.inputFocused]} value={telefoneResidencial} onChangeText={setTelefoneResidencial} onFocus={() => setFocusedField('telefoneResidencial')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Telefone Celular</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="smartphone" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'telefoneCelular' && styles.inputFocused]} value={telefoneCelular} onChangeText={setTelefoneCelular} onFocus={() => setFocusedField('telefoneCelular')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Email</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="email" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'email' && styles.inputFocused]} value={email} onChangeText={setEmail} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>
					</View>
				</View>

				<View style={styles.fieldset}>
					<Text style={styles.legend}>Endereço</Text>
					<View style={styles.formGrid}>
						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Logradouro</Text>
							<View style={styles.inputRow}>
								<MaterialIcons name="location-on" size={18} color="#2563eb" style={styles.inputIcon} />
								<TextInput style={[styles.input, focusedField === 'logradouro' && styles.inputFocused]} value={logradouro} onChangeText={setLogradouro} onFocus={() => setFocusedField('logradouro')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Número</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'numero' && styles.inputFocused]} value={numero} onChangeText={setNumero} onFocus={() => setFocusedField('numero')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Complemento</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'complemento' && styles.inputFocused]} value={complemento} onChangeText={setComplemento} onFocus={() => setFocusedField('complemento')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Bairro</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'bairro' && styles.inputFocused]} value={bairro} onChangeText={setBairro} onFocus={() => setFocusedField('bairro')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Cidade</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'cidade' && styles.inputFocused]} value={cidade} onChangeText={setCidade} onFocus={() => setFocusedField('cidade')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>Estado</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'estado' && styles.inputFocused]} value={estado} onChangeText={setEstado} onFocus={() => setFocusedField('estado')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.label}>CEP</Text>
							<View style={styles.inputRow}>
								<TextInput style={[styles.input, focusedField === 'cep' && styles.inputFocused]} value={cep} onChangeText={setCep} onFocus={() => setFocusedField('cep')} onBlur={() => setFocusedField(null)} />
							</View>
						</View>
					</View>
				</View>

				<View style={styles.buttonsRow}>
					<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit} disabled={loading}>
						{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar Paciente</Text>}
					</TouchableOpacity>

					<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {
						setNome(''); setCns(''); setCpf(''); setDataNascimento(''); setTelefoneResidencial(''); setTelefoneCelular(''); setEmail(''); setLogradouro(''); setNumero(''); setComplemento(''); setBairro(''); setCidade(''); setEstado(''); setCep(''); setTipoSanguineo(null);
					}}>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
