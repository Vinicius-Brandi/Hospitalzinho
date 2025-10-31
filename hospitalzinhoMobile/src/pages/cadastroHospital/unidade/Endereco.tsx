import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles';

interface EnderecoProps {
	cep: string;
	cidade: string;
	bairro: string;
	rua: string;
	numero: string;
	complemento: string;
	focusedField: string | null;
	setCep: (v: string) => void;
	setCidade: (v: string) => void;
	setBairro: (v: string) => void;
	setRua: (v: string) => void;
	setNumero: (v: string) => void;
	setComplemento: (v: string) => void;
}

export default function Endereco({ cep, cidade, bairro, rua, numero, complemento, focusedField, setCep, setCidade, setBairro, setRua, setNumero, setComplemento }: EnderecoProps) {
	return (
		<>
			<View style={styles.fieldset}>
				<Text style={styles.legend}>Endereço</Text>
				<View style={styles.addressGrid}>
					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>CEP</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="location-on" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'cep' && styles.inputFocused]} value={cep} onChangeText={setCep} placeholder="XXXXX-XXX" />
						</View>
					</View>

					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>Cidade</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="location-city" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'cidade' && styles.inputFocused]} value={cidade} onChangeText={setCidade} />
						</View>
					</View>

					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>Bairro</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="home" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'bairro' && styles.inputFocused]} value={bairro} onChangeText={setBairro} />
						</View>
					</View>

					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>Rua</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="streetview" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'rua' && styles.inputFocused]} value={rua} onChangeText={setRua} />
						</View>
					</View>

					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>Número</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="confirmation-number" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'numero' && styles.inputFocused]} value={numero} onChangeText={setNumero} />
						</View>
					</View>

					<View style={[styles.formGroup, styles.fullWidth]}>
						<Text style={styles.label}>Complemento</Text>
						<View style={styles.inputRow}>
							<MaterialIcons name="note" size={18} color="#2563eb" style={styles.inputIcon} />
							<TextInput style={[styles.input, focusedField === 'complemento' && styles.inputFocused]} value={complemento} onChangeText={setComplemento} />
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
