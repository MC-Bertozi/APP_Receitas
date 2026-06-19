import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { Refrigerator, Settings } from 'lucide-react-native';
import { ChevronLeft } from 'lucide-react-native';


// Dados de exemplo — substitua pelos dados reais do usuário
const USUARIO = {
  nome: 'Nome',
  foto: null, // substitua por require('../assets/foto_perfil.png') ou uma URL
  receitas: 59,
  seguidores: 112,
  seguindo: 211,
};

// Lista de receitas
const RECEITAS = [
  { id: '1', imagem: null },
  { id: '2', imagem: null },
  { id: '3', imagem: null },
  { id: '4', imagem: null },
];

export default function Tela_Perfil({ navigation }) {
  const [seguindo, setSeguindo] = useState(false);

  const toggleSeguir = () => setSeguindo((prev) => !prev);

  const renderReceita = ({ item }) => (
    <TouchableOpacity style={styles.receitaCard} activeOpacity={0.8}>
      {item.imagem ? (
        <Image source={item.imagem} style={styles.receitaImagem} resizeMode="cover" />
      ) : (
        <View style={styles.receitaImagemPlaceholder} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#FDB350" />
        </TouchableOpacity>
      </View>

        {/* Cabeçalho: foto, nome e ícones */}
        <View style={styles.header}>
          <View style={styles.fotoPerfil}>
            {USUARIO.foto ? (
              <Image source={USUARIO.foto} style={styles.fotoImagem} resizeMode="cover" />
            ) : (
              <View style={styles.fotoPlaceholder} />
            )}
          </View>

          <Text style={styles.nomeUsuario}>{USUARIO.nome}</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Refrigerator size={24} color="#FDB350" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation?.navigate('Tela_Config')}>
            <Settings size={24} color="#E62B36" />
          </TouchableOpacity>
        </View>
        </View>

        {/* Botão Seguir / Seguindo */}
        <TouchableOpacity
          style={[styles.botaoSeguir, seguindo && styles.botaoSeguindo]}
          onPress={toggleSeguir}
          activeOpacity={0.85}
        >
          <Text style={[styles.botaoSeguirTexto, seguindo && styles.botaoSeguindoTexto]}>
            {seguindo ? 'Seguindo' : 'Seguir'}
          </Text>
        </TouchableOpacity>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumero}>{USUARIO.receitas}</Text>
            <Text style={styles.statLabel}>Receitas</Text>
          </View>
          <View style={styles.statDivisor} />
          <View style={styles.statItem}>
            <Text style={styles.statNumero}>{USUARIO.seguidores}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statDivisor} />
          <View style={styles.statItem}>
            <Text style={styles.statNumero}>{USUARIO.seguindo}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>

        {/* Grade de Receitas */}
        <View style={styles.receitasSection}>
          <Text style={styles.receitasTitulo}>Receitas</Text>
          <FlatList
            data={RECEITAS}
            renderItem={renderReceita}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.receitasLinha}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#206491',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // --- Cabeçalho ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  fotoPerfil: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FDB350',
    marginRight: 12,
  },
  fotoImagem: {
    width: '100%',
    height: '100%',
  },
  fotoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#A0A0B0',
  },
  nomeUsuario: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#FDB350',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  iconText: {
    fontSize: 22,
    color: '#1A1A2E',
  },

  // --- Botão Seguir ---
  botaoSeguir: {
    width: '100%',
    backgroundColor: '#FDB350',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoSeguindo: {
    backgroundColor: '#12486b',
  },
  botaoSeguirTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  botaoSeguindoTexto: {
    color: '#FFFFFF',
  },

  // --- Estatísticas ---
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumero: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#777788',
  },
  statDivisor: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E8',
  },

  // --- Grade de Receitas ---
  receitasSection: {
    flex: 1,
  },
  receitasTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDB350',
    marginBottom: 12,
  },
  receitasLinha: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  receitaCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E62B36',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  receitaImagem: {
    width: '100%',
    height: '100%',
  },
  receitaImagemPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E62B36',
  },
});
