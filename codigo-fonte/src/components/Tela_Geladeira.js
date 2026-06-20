import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  ChevronLeft,
  ShoppingCart,
  Refrigerator,
  AlertTriangle,
  Plus,
  Trash2,
  Check,
} from 'lucide-react-native';
import firebase from '../firebase';

const ALIMENTOS_PREDEFINIDOS = [
  'Frango', 'Carne vermelha', 'Peixe', 'Ovos', 'Leite',
  'Queijo', 'Arroz', 'Feijão', 'Macarrão', 'Pão',
  'Tomate', 'Cebola', 'Alho', 'Batata', 'Cenoura',
  'Alface', 'Frutas', 'Iogurte', 'Manteiga', 'Suco',
];

export default function Tela_Geladeira({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('geladeira');
  const uid = firebase.auth().currentUser?.uid;

  // --- Estados Geladeira ---
  const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
  const [novoAlimento, setNovoAlimento] = useState('');

  // --- Estados Compras ---
  const [listaCompras, setListaCompras] = useState([]);
  const [novoItem, setNovoItem] = useState('');

  // --- READ ---
  useEffect(() => {
    const carregar = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection('geladeira')
          .doc(uid)
          .get();
        if (doc.exists) {
          const data = doc.data();
          setAlimentosSelecionados(data.alimentos || []);
          setListaCompras(data.compras || []);
        }
      } catch (e) {
        window.alert('Erro ao carregar dados: ' + e.message);
      }
    };
    carregar();
  }, []);

  // --- CREATE/UPDATE ---
  const salvar = async (alimentos, compras) => {
    try {
      await firebase.firestore().collection('geladeira').doc(uid).set({
        alimentos: alimentos,
        compras: compras,
      });
    } catch (e) {
      window.alert('Erro ao salvar: ' + e.message);
    }
  };

  // --- GELADEIRA ---
  const toggleAlimento = (alimento) => {
    const novos = alimentosSelecionados.includes(alimento)
      ? alimentosSelecionados.filter((a) => a !== alimento)
      : [...alimentosSelecionados, alimento];
    setAlimentosSelecionados(novos);
    salvar(novos, listaCompras);
  };

  const adicionarAlimentoCustom = () => {
    if (!novoAlimento.trim()) return;
    if (alimentosSelecionados.includes(novoAlimento.trim())) {
      window.alert('Alimento já adicionado!');
      return;
    }
    const novos = [...alimentosSelecionados, novoAlimento.trim()];
    setAlimentosSelecionados(novos);
    setNovoAlimento('');
    salvar(novos, listaCompras);
  };

  const removerAlimento = (alimento) => {
    const novos = alimentosSelecionados.filter((a) => a !== alimento);
    setAlimentosSelecionados(novos);
    salvar(novos, listaCompras);
  };

  // --- COMPRAS ---
  const adicionarItemCompra = () => {
    if (!novoItem.trim()) return;
    const novo = {
      id: Date.now().toString(),
      nome: novoItem.trim(),
      comprado: false,
    };
    const novos = [...listaCompras, novo];
    setListaCompras(novos);
    setNovoItem('');
    salvar(alimentosSelecionados, novos);
  };

  const toggleComprado = (id) => {
    const novos = listaCompras.map((item) =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    );
    setListaCompras(novos);
    salvar(alimentosSelecionados, novos);
  };

  const removerItemCompra = (id) => {
    const novos = listaCompras.filter((item) => item.id !== id);
    setListaCompras(novos);
    salvar(alimentosSelecionados, novos);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#FDB350" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Minha Geladeira</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Tela_Alergia')}>
          <AlertTriangle size={26} color="#FDB350" />
        </TouchableOpacity>
      </View>

      {/* Abas */}
      <View style={styles.abas}>
        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'geladeira' && styles.abaAtiva]}
          onPress={() => setAbaAtiva('geladeira')}>
          <Refrigerator
            size={18}
            color={abaAtiva === 'geladeira' ? '#E62B36' : '#FDB350'}
          />
          <Text
            style={[
              styles.abaTexto,
              abaAtiva === 'geladeira' && styles.abaTextoAtivo,
            ]}>
            Geladeira
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'compras' && styles.abaAtiva]}
          onPress={() => setAbaAtiva('compras')}>
          <ShoppingCart
            size={18}
            color={abaAtiva === 'compras' ? '#E62B36' : '#FDB350'}
          />
          <Text
            style={[
              styles.abaTexto,
              abaAtiva === 'compras' && styles.abaTextoAtivo,
            ]}>
            Compras
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ===== ABA GELADEIRA ===== */}
        {abaAtiva === 'geladeira' && (
          <View>
            <Text style={styles.secaoTitulo}>O que você tem em casa?</Text>
            <Text style={styles.secaoSubtitulo}>
              Selecione ou adicione alimentos
            </Text>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Adicionar alimento..."
                placeholderTextColor="#9ca3af"
                value={novoAlimento}
                onChangeText={setNovoAlimento}
              />
              <TouchableOpacity
                style={styles.botaoAdd}
                onPress={adicionarAlimentoCustom}>
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.labelSecao}>Sugestões</Text>
            <View style={styles.chipsContainer}>
              {ALIMENTOS_PREDEFINIDOS.map((alimento) => (
                <TouchableOpacity
                  key={alimento}
                  style={[
                    styles.chip,
                    alimentosSelecionados.includes(alimento) &&
                      styles.chipSelecionado,
                  ]}
                  onPress={() => toggleAlimento(alimento)}>
                  <Text
                    style={[
                      styles.chipTexto,
                      alimentosSelecionados.includes(alimento) &&
                        styles.chipTextoSelecionado,
                    ]}>
                    {alimento}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {alimentosSelecionados.length > 0 && (
              <View>
                <Text style={styles.labelSecao}>
                  Na sua geladeira ({alimentosSelecionados.length})
                </Text>
                {alimentosSelecionados.map((alimento) => (
                  <View key={alimento} style={styles.itemLista}>
                    <Text style={styles.itemListaTexto}>🧊 {alimento}</Text>
                    <TouchableOpacity onPress={() => removerAlimento(alimento)}>
                      <Trash2 size={18} color="#E62B36" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ===== ABA COMPRAS ===== */}
        {abaAtiva === 'compras' && (
          <View>
            <Text style={styles.secaoTitulo}>Lista de Compras</Text>
            <Text style={styles.secaoSubtitulo}>
              Adicione o que precisa comprar
            </Text>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Adicionar item..."
                placeholderTextColor="#9ca3af"
                value={novoItem}
                onChangeText={setNovoItem}
              />
              <TouchableOpacity
                style={styles.botaoAdd}
                onPress={adicionarItemCompra}>
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {listaCompras.length === 0 ? (
              <Text style={styles.textoVazio}>Nenhum item na lista ainda!</Text>
            ) : (
              listaCompras.map((item) => (
                <View key={item.id} style={styles.itemLista}>
                  <TouchableOpacity
                    onPress={() => toggleComprado(item.id)}
                    style={styles.checkboxCompra}>
                    <View
                      style={[
                        styles.checkbox,
                        item.comprado && styles.checkboxMarcado,
                      ]}>
                      {item.comprado && <Check size={12} color="#fff" />}
                    </View>
                    <Text
                      style={[
                        styles.itemListaTexto,
                        item.comprado && styles.itemRiscado,
                      ]}>
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removerItemCompra(item.id)}>
                    <Trash2 size={18} color="#E62B36" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#206491' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitulo: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#FDB350' 
  },
  abas: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#12486b',
    borderRadius: 12,
    padding: 4,
  },
  aba: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  abaAtiva: { 
    backgroundColor: '#FDB350' 
  },
  abaTexto: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#FDB350' 
  },
  abaTextoAtivo: { 
    color: '#E62B36' 
  },
  scroll: { 
    paddingHorizontal: 16, 
    paddingBottom: 40 
  },
  secaoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FDB350',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  secaoSubtitulo: {
    fontSize: 13,
    color: '#ffffff99',
    textAlign: 'center',
    marginBottom: 20,
  },
  labelSecao: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FDB350',
    marginBottom: 10,
    marginTop: 16,
  },
  inputRow: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 8 
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: '#1a1a2e',
  },
  botaoAdd: {
    backgroundColor: '#FDB350',
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  chip: {
    backgroundColor: '#12486b',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FDB35050',
  },
  chipSelecionado: { 
    backgroundColor: '#FDB350' 
  },
  chipTexto: { 
    fontSize: 13, 
    color: '#FDB350', 
    fontWeight: '500' 
  },
  chipTextoSelecionado: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#12486b',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  itemListaTexto: { 
    fontSize: 14, 
    color: '#fff', 
    flex: 1 
  },
  itemRiscado: { 
    textDecorationLine: 'line-through', 
    color: '#ffffff66' 
  },
  textoVazio: {
    color: '#ffffff66',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  checkboxCompra: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FDB350',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxMarcado: { backgroundColor: '#FDB350', borderColor: '#FDB350' },
});
