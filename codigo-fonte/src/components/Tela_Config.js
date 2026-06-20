import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import firebase from '../firebase';

export default function Tela_Config({ navigation }) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);

  const uid = firebase.auth().currentUser?.uid;

  // READ
  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const doc = await firebase.firestore().collection('usuarios').doc(uid).get();
      if (doc.exists) {
        setNome(doc.data().nome);
        setUsuario(doc.data().usuario);
      }
    } catch (error) {
      window.alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  // UPDATE
  const salvarPerfil = async () => {
    if (!nome.trim() || !usuario.trim()) {
      window.alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      await firebase.firestore().collection('usuarios').doc(uid).update({
        nome: nome,
        usuario: usuario,
      });
      window.alert('Perfil atualizado!');
      setEditando(false);
    } catch (error) {
      window.alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deletarConta = async () => {
    const confirmado = window.confirm('Tem certeza? Essa ação não pode ser desfeita!');
    if (!confirmado) return;

    setLoading(true);
    try {
      await firebase.firestore().collection('usuarios').doc(uid).delete();
      await firebase.auth().currentUser.delete();
      navigation.navigate('Tela_BemVindo');
    } catch (error) {
      window.alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const sair = async () => {
    await firebase.auth().signOut();
    navigation.navigate('Tela_BemVindo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.label}>Nome completo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            editable={editando}
            placeholder="Seu nome"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text style={styles.label}>Nome de usuário</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            editable={editando}
            placeholder="@usuario"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
          />
        </View>

        {editando ? (
          <TouchableOpacity style={styles.botaoPrimario} onPress={salvarPerfil}>
            <Text style={styles.botaoPrimarioTexto}>
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.botaoPrimario} onPress={() => setEditando(true)}>
            <Text style={styles.botaoPrimarioTexto}>Editar perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.botaoSecundario} onPress={sair}>
          <Text style={styles.botaoSecundarioTexto}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoDeletar} onPress={deletarConta}>
          <Text style={styles.botaoDeletarTexto}>Deletar conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  titulo: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  inputContainer: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 16, height: 50, justifyContent: 'center', marginBottom: 16, elevation: 2 },
  input: { fontSize: 14, color: '#1A1A2E' },
  botaoPrimario: { backgroundColor: '#FDB350', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  botaoPrimarioTexto: { color: '#E62B36', fontSize: 15, fontWeight: '600' },
  botaoSecundario: { backgroundColor: '#B0B0C0', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  botaoSecundarioTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  botaoDeletar: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E62B36' },
  botaoDeletarTexto: { color: '#E62B36', fontSize: 15, fontWeight: '600' },
});
