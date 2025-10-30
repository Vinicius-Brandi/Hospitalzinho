import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import loginService from '../../servicos/loginService';
import styles from './styles';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validar = () => {
    if (!email) {
      Alert.alert('Erro', 'Informe o e-mail');
      return false;
    }
    if (!senha) {
      Alert.alert('Erro', 'Informe a senha');
      return false;
    }
    // validação simples de e-mail
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      Alert.alert('Erro', 'Informe um e-mail válido');
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    if (!validar()) return;
    setLoading(true);
    try {
      const res = await loginService.login({email, senha});
      setLoading(false);
      if (res.success) {
        Alert.alert('Sucesso', `Bem-vindo ${res.user?.nome ?? ''}`);
        // TODO: navegar para a tela principal
      } else {
        Alert.alert('Erro', res.message || 'Falha no login');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar efetuar login');
    }
  };

  const onRegister = () => {
    Alert.alert('Registro', 'Navegar para tela de cadastro (não implementado)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <MaterialIcons name="local-hospital" size={36} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>Hospitalzinho</Text>
        <Text style={styles.headerSubtitle}>Acesso à sua conta</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputRow}>
          <MaterialIcons name="email" size={20} color="#3b82f6" style={styles.inputIcon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            editable={!loading}
          />
        </View>

        <View style={styles.inputRow}>
          <MaterialIcons name="lock" size={20} color="#3b82f6" style={styles.inputIcon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            editable={!loading}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={onRegister}>
          <Text style={styles.linkText}>Ainda não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
