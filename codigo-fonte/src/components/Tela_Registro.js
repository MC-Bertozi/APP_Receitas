import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, SafeAreaView, ScrollView, Alert
} from 'react-native';
import { CreditCard, Mail, User, KeyRound, Lock } from 'lucide-react-native';
import { ChevronLeft } from 'lucide-react-native';
import firebase from '../firebase';

export default function Tela_Registro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrar = async () => {
    if (!nome.trim() || !email.trim() || !usuario.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    if (senha !== repetirSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      // Cria o usuário no Firebase Auth
      const resultado = await firebase.auth().createUserWithEmailAndPassword(email, senha);
      
      // Salva os dados extras no Firestore
      await firebase.firestore().collection('usuarios').doc(resultado.user.uid).set({
        nome: nome,
        usuario: usuario,
        email: email,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Tela_Inicio');
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message);
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

        <Text style={styles.title}>Inscreva-se</Text>
        <Text style={styles.subtitle}>Crie uma conta</Text>

        <Text style={styles.label}>Nome completo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome Sobrenome"
            placeholderTextColor="#9ca3af"
            value={nome}
            onChangeText={setNome}
          />
          <CreditCard size={20} color="#1a1a2e" style={styles.icon} />
        </View>

        <Text style={styles.label}>Informe seu e-mail</Text>
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

        <Text style={styles.label}>Crie um nome de usuário</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="@usuario"
            placeholderTextColor="#9ca3af"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
          <User size={20} color="#1a1a2e" style={styles.icon} />
        </View>

        <Text style={styles.label}>Crie sua senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor="#9ca3af"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <KeyRound size={20} color="#1a1a2e" style={styles.icon} />
        </View>

        <Text style={styles.label}>Repita a senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor="#9ca3af"
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            secureTextEntry
          />
          <Lock size={20} color="#1a1a2e" style={styles.icon} />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={cadastrar}>
          <Text style={styles.primaryButtonText}>
            {loading ? 'Cadastrando...' : 'Inscreva-se'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Tela_Login')}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.link}>Entrar</Text>
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
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1a1a2e', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#9ca3af', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, marginBottom: 14, height: 50 },
  input: { flex: 1, fontSize: 14, color: '#1a1a2e' },
  icon: { marginLeft: 8 },
  primaryButton: { backgroundColor: '#FDB350', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  primaryButtonText: { color: '#E62B36', fontSize: 16, fontWeight: '600' },
  loginLink: { alignItems: 'center' },
  loginText: { fontSize: 13, color: '#FDB350' },
  link: { fontSize: 13, color: '#E62B36', fontWeight: '600' },
});
