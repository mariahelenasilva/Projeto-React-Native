import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useCart } from '../Context/CartContext';

export default function DetalhesScreen({ route, navigation }) {
  const { produto } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(produto);
    Alert.alert(
      'Produto Adicionado',
      `${produto.title} foi adicionado ao carrinho!`,
      [
        { text: 'Continuar Comprando', style: 'cancel' },
        { text: 'Ver Carrinho', onPress: () => navigation.navigate('Compra') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: produto.thumbnail }} style={styles.imagem} />
        <Text style={styles.nome}>{produto.title}</Text>
        <Text style={styles.descricao}>{produto.description}</Text>

        <View style={styles.precoContainer}>
          <Text style={styles.preco}>R$ {produto.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={handleAddToCart}
        >
          <Text style={styles.textoBotaoCarrinho}>🛒 Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  descricao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  precoContainer: {
    backgroundColor: '#ffe4f1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  preco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  botaoCarrinho: {
    backgroundColor: '#e91e63',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  textoBotaoCarrinho: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
