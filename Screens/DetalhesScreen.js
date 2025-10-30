import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext';

export default function DetalhesScreen({ route, navigation }) {
  const { produto } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(produto);
    Alert.alert('Produto Adicionado', `${produto.title} foi adicionado ao carrinho!`, [
      { text: 'Continuar Comprando', style: 'cancel' },
      { text: 'Ver Carrinho', onPress: () => navigation.navigate('Compra') },
    ]);
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

        <TouchableOpacity style={styles.botaoCarrinho} onPress={handleAddToCart} activeOpacity={0.8}>
          <Ionicons name="bag-handle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.textoBotaoCarrinho}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imagem: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  precoContainer: {
    backgroundColor: '#F8D7E0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 25,
  },
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C4516B',
  },
  botaoCarrinho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E48CA1',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 28,
    shadowColor: '#E48CA1',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  textoBotaoCarrinho: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
