import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';
import { auth, db } from '../firebase'; 

const ALIMENTOS = [
  'Leite (e derivados)',
  'Carne vermelha',
  'Peixes',
  'Glúten',
  'Amendoim',
  'Ovos',
  'Soja',
  'Frutos do mar',
  'Nozes e castanhas',
  'Milho',
  'Grãos',
  'Mel',
];

const COLECAO = 'usuarios';
const CAMPO = 'alergias';

async function fetchAlergias(uid) {
  const snapshot = await db.collection(COLECAO).doc(uid).get();
  if (!snapshot.exists) return [];
  const data = snapshot.data();
  return Array.isArray(data[CAMPO]) ? data[CAMPO] : [];
}

async function salvarAlergias(uid, alergias) {
  await db
    .collection(COLECAO)
    .doc(uid)
    .set({ [CAMPO]: alergias }, { merge: true });
}

async function limparAlergias(uid) {
  await db
    .collection(COLECAO)
    .doc(uid)
    .update({
      [CAMPO]: firebase.firestore.FieldValue.delete(), 
    });
}

export default function Tela_Alergia({ navigation }) {
  const [selecionados, setSelecionados] = useState([]);
  const [salvoNoBanco, setSalvoNoBanco] = useState([]);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return unsubscribe;
  }, []);

  const carregarAlergias = useCallback(async (uid) => {
    setLoadingInicial(true);
    try {
      const dados = await fetchAlergias(uid);
      setSelecionados(dados);
      setSalvoNoBanco(dados);
    } catch (err) {
      console.error('[Alergia] Erro ao carregar:', err);
      Alert.alert('Erro', 'Não foi possível carregar suas alergias.');
    } finally {
      setLoadingInicial(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      carregarAlergias(user.uid);
    } else if (user === null) {
      setLoadingInicial(false);
    }
  }, [user, carregarAlergias]);

  const toggleAlimento = (alimento) => {
    setSelecionados((prev) =>
      prev.includes(alimento)
        ? prev.filter((a) => a !== alimento)
        : [...prev, alimento]
    );
  };

  const temAlteracoes = () => {
    if (selecionados.length !== salvoNoBanco.length) return true;
    const a = [...selecionados].sort();
    const b = [...salvoNoBanco].sort();
    return a.some((item, i) => item !== b[i]);
  };

  const handleSalvar = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }
    if (!temAlteracoes()) {
      Alert.alert('Sem alterações', 'Nenhuma mudança foi detectada.');
      return;
    }

    setLoading(true);
    try {
      if (selecionados.length === 0) {
        await limparAlergias(user.uid);
      } else {
        await salvarAlergias(user.uid, selecionados);
      }
      setSalvoNoBanco([...selecionados]);

      const msg =
        selecionados.length === 0
          ? 'Suas alergias foram removidas com sucesso.'
          : `${selecionados.length} alergia(s) salva(s) com sucesso.`;

      Alert.alert('Sucesso', msg, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error('[Alergia] Erro ao salvar:', err);
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLimparTudo = () => {
    if (selecionados.length === 0 && salvoNoBanco.length === 0) return;

    Alert.alert(
      'Remover todas as alergias?',
      'Isso vai apagar todas as suas restrições alimentares salvas.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover tudo',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            setLoading(true);
            try {
              if (salvoNoBanco.length > 0) await limparAlergias(user.uid);
              setSelecionados([]);
              setSalvoNoBanco([]);
              Alert.alert('Pronto', 'Todas as alergias foram removidas.');
            } catch (err) {
              console.error('[Alergia] Erro ao limpar:', err);
              Alert.alert('Erro', 'Não foi possível remover. Tente novamente.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const totalSelecionados = selecionados.length;
  const hayAlteracoes = temAlteracoes();

  if (user === undefined || loadingInicial) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#FDB350" />
          <Text style={styles.loadingText}>Carregando suas alergias…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingWrapper}>
          <Text style={styles.loadingText}>Usuário não autenticado.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#FDB350', marginTop: 12 }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.goBack()}
            disabled={loading}>
            <ChevronLeft size={28} color="#FDB350" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => carregarAlergias(user.uid)}
            disabled={loading}>
            <RefreshCw size={22} color="#FDB350" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Seleção de Alimentos</Text>
        <Text style={styles.subtitle}>
          Selecione os alimentos que você não pode ingerir
        </Text>

        {totalSelecionados > 0 && (
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalSelecionados} selecionado
                {totalSelecionados > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.grid}>
          {ALIMENTOS.map((alimento) => {
            const ativo = selecionados.includes(alimento);
            const estavaSalvo = salvoNoBanco.includes(alimento);
            const pendenteDeletar = estavaSalvo && !ativo;
            const pendenteCriar = !estavaSalvo && ativo;

            return (
              <TouchableOpacity
                key={alimento}
                style={[
                  styles.chip,
                  ativo && styles.chipAtivo,
                  pendenteDeletar && styles.chipPendenteDeletar,
                  pendenteCriar && styles.chipPendenteCriar,
                ]}
                onPress={() => toggleAlimento(alimento)}
                activeOpacity={0.7}
                disabled={loading}>
                <Text
                  style={[
                    styles.chipText,
                    ativo && styles.chipTextAtivo,
                    pendenteDeletar && styles.chipTextPendenteDeletar,
                  ]}>
                  {alimento}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {hayAlteracoes && (
          <View style={styles.legendaWrapper}>
            <View style={styles.legendaItem}>
              <View
                style={[styles.legendaDot, { backgroundColor: '#FDB350' }]}
              />
              <Text style={styles.legendaText}>A ser adicionado</Text>
            </View>
            <View style={styles.legendaItem}>
              <View
                style={[styles.legendaDot, { backgroundColor: '#E62B36' }]}
              />
              <Text style={styles.legendaText}>A ser removido</Text>
            </View>
          </View>
        )}

        {salvoNoBanco.length > 0 && (
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              loading && styles.primaryButtonDisabled,
            ]}
            onPress={handleLimparTudo}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#E62B36" />
            ) : (
              <Text style={styles.secondaryButtonText}>
                Remover todas as alergias
              </Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            (!hayAlteracoes || loading) && styles.primaryButtonDisabled,
          ]}
          onPress={handleSalvar}
          disabled={loading || !hayAlteracoes}>
          {loading ? (
            <ActivityIndicator color="#E62B36" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {hayAlteracoes ? 'Salvar alterações' : 'Salvo'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#206491' 
  },
  content: { 
    paddingHorizontal: 24, 
    paddingTop: 30, 
    paddingBottom: 40 
  },
  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: { 
    color: '#FDB350', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  botao: { padding: 4 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: 8,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  badgeWrapper: { 
    alignItems: 'center', 
    marginBottom: 16 
  },
  badge: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  badgeText: { 
    color: '#FDB350', 
    fontSize: 12, 
    fontWeight: '700' 
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  chip: {
    width: '30%',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipAtivo: { 
    backgroundColor: '#1a1a2e', 
    borderColor: 'transparent' 
  },
  chipPendenteDeletar: { 
    backgroundColor: '#f3f4f6', 
    borderColor: '#E62B36' 
  },
  chipPendenteCriar: { 
    backgroundColor: '#1a1a2e', 
    borderColor: '#FDB350' 
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  chipTextAtivo: { 
    color: '#FDB350' 
  },
  chipTextPendenteDeletar: { 
    color: '#E62B36' 
  },
  legendaWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  legendaItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  legendaDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5 
  },
  legendaText: { 
    color: '#9ca3af', 
    fontSize: 11 
  },
  primaryButton: {
    backgroundColor: '#FDB350',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonDisabled: { 
    opacity: 0.5 
  },
  primaryButtonText: { 
    color: '#E62B36', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E62B36',
  },
  secondaryButtonText: { 
    color: '#E62B36', 
    fontSize: 14, 
    fontWeight: '600' 
  },
});
