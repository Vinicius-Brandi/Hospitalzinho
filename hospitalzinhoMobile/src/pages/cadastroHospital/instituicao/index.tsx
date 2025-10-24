import { Hospital } from '@/src/Models/Hospital/hospitalmodels';
import hospitalService from '@/src/servicos/hospital_servicos/servicoHospital';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../styles';

type Props = {
	onCreated?: (created: Hospital) => void;
}

export default function CadastroInstituicao({ onCreated }: Props) {
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [nome, setNome] = useState('');
	const [cnes, setCnes] = useState('');
	const [cnpj, setCnpj] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit() {
		if (!nome.trim()) {
			Alert.alert('Validação', 'O nome da instituição é obrigatório.');
			return;
		}

			const payload: Hospital = { nome, cnes, cnpj };
			setIsSubmitting(true);
			try {
				const created = await hospitalService.create(payload as any);
				Alert.alert('Sucesso', 'Instituição criada com sucesso.');
				console.log('Instituição criada:', created);
				if (onCreated) onCreated(created as Hospital);
				// reset
				setNome('');
				setCnes('');
				setCnpj('');
			} catch (error: any) {
				console.error('Erro ao criar instituição', error);
				// Se for um erro do axios, tente extrair mais informações
				if (error?.isAxiosError) {
					console.error('Axios error toJSON():', error.toJSON ? error.toJSON() : error);
					const resp = error.response;
					Alert.alert('Erro', `Network/HTTP error - status: ${resp?.status ?? 'n/a'} - ${resp?.data ? JSON.stringify(resp.data) : error.message}`);
				} else {
					Alert.alert('Erro', error?.message || 'Erro ao criar instituição.');
				}
			} finally {
				setIsSubmitting(false);
			}
	}

	return (
		<KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content} enableOnAndroid>
			<Text style={styles.title}>Cadastro de Instituição</Text>

			<View style={styles.section}>
				<View style={styles.fieldset}>
					<Text style={styles.legend}>Dados da Instituição</Text>

					<View style={styles.formGrid}>
						<View style={[styles.formGroup, styles.fullWidth]}>
							<Text style={styles.label}>Nome da Instituição</Text>
							<TextInput
								style={[styles.input, focusedField === 'nome' && styles.inputFocused]}
								value={nome}
								onChangeText={setNome}
								placeholder="Nome da Instituição"
								maxLength={255}
								onFocus={() => setFocusedField('nome')}
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
					</View>
				</View>

				<View style={styles.buttonsRow}>
					<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Salvar Instituição</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.cancelButton]}
						onPress={() => {
							setNome('');
							setCnes('');
							setCnpj('');
						}}
					>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
