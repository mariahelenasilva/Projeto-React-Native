import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext';

export default function CompraScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleFinalizarCompra = () => {
    Alert.alert('Compra Finalizada', 'Obrigado pela sua compra! 🛍️', [
      { text: 'OK', onPress: () => clearCart() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-done-circle-outline" size={80} color="#E48CA1" style={styles.icone} />
      <Text style={styles.titulo}>Pedido Confirmado!</Text>
      <Text style={styles.texto}>Seu pedido está sendo preparado com carinho.</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartItemId.toString()}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.thumbnail || 'https://via.placeholder.com/60' }} style={styles.imagemProduto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.title}</Text>
              <Text style={styles.preco}>R$ {item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item.cartItemId)}
              style={styles.botaoRemover}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      {cart.length > 0 && (
        <TouchableOpacity style={styles.botaoComprar} onPress={handleFinalizarCompra} activeOpacity={0.8}>
          <Ionicons name="card-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.textoBotaoComprar}>Finalizar Compra</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
  },
  icone: {
    marginTop: 30,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  texto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  lista: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  preco: {
    fontSize: 15,
    color: '#E48CA1',
    marginTop: 4,
  },
  botaoRemover: {
    backgroundColor: '#E48CA1',
    padding: 8,
    borderRadius: 6,
  },
  botaoComprar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E48CA1',
    paddingVertical: 15,
    borderRadius: 30,
    width: '85%',
    marginTop: 15,
    shadowColor: '#E48CA1',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
