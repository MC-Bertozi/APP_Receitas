import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, SafeAreaView, ScrollView, Alert
} from 'react-native';
import { Mail, Eye, EyeOff, Check } from 'lucide-react-native';
import { ChevronLeft } from 'lucide-react-native';
import firebase from '../firebase';

export default function Tela_Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha e-mail e senha!');
      return;
    }

    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, senha);
      navigation.navigate('Tela_Inicio');
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#FDB350" />
        </TouchableOpacity>

        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Insira seus dados para continuar</Text>

        <Text style={styles.label}>Digite seu e-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="e-mail@e-mail.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Mail size={20} color="#1a1a2e" style={styles.icon} />
        </View>

        <Text style={styles.label}>Digite sua senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor="#9ca3af"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? (
              <Eye size={20} color="#1a1a2e" style={styles.icon} />
            ) : (
              <EyeOff size={20} color="#1a1a2e" style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setLembrar(!lembrar)}
          >
            <View style={[styles.checkbox, lembrar && styles.checkboxChecked]}>
              {lembrar && <Check size={12} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Lembre-se de mim</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={fazerLogin}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Entrando...' : 'Faça login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Tela_Registro')}
        >
          <Text style={styles.registerText}>
            Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#206491' },
  content: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 30 },
  botao: { padding: 4, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1a1a2e', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#9ca3af', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 13, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, height: 50 },
  input: { flex: 1, fontSize: 14, color: '#1a1a2e' },
  icon: { marginLeft: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#9ca3af', marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#1a1a2e', borderColor: '#1a1a2e' },
  checkboxLabel: { fontSize: 13, color: '#1a1a2e' },
  link: { fontSize: 13, color: '#E62B36', fontWeight: '600' },
  primaryButton: { backgroundColor: '#FDB350', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#E62B36', fontSize: 16, fontWeight: '600' },
  registerLink: { alignItems: 'center' },
  registerText: { fontSize: 13, color: '#FDB350' },
});
