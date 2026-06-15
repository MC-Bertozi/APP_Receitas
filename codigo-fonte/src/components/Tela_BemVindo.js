import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

export default function Tela_BemVindo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://imgur.com/a/GsUvvIl' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>
          Bem-vindo ao aplicativo{'\n'}e vamos começar
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Tela_Login')}
        >
          <Text style={styles.primaryButtonText}>Entrar agora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Tela_Login')}
        >
          <Text style={styles.secondaryButtonText}>Faça login</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao me inscrever, concordo com os Termos e Condições e a Política de Privacidade.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  imageContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 40,
    backgroundColor: '#e8e8f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: 60,
    lineHeight: 32,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#9ca3af',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#e0e0e8',
  },
  secondaryButtonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 24,
  },
});