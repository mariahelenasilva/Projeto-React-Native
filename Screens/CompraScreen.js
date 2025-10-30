import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../Context/CartContext';

export default function CompraScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleFinalizarCompra = () => {
    Alert.alert(
      'Compra Finalizada',
      'Obrigado pela sua compra! 🛍️',
      [
        { text: 'OK', onPress: () => clearCart() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Ícone e mensagem de pedido */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/679/679922.png' }}
        style={styles.icone}
      />
      <Text style={styles.titulo}>🛍️ Pedido Confirmado!</Text>
      <Text style={styles.texto}>Seu pedido está sendo preparado com carinho 💕</Text>
      <Text style={styles.texto}>Obrigado por comprar conosco!</Text>

      {/* Lista de produtos do carrinho */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartItemId.toString()}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.title}</Text>
            <Text style={styles.preco}>R$ {item.price}</Text>
            <TouchableOpacity
              onPress={() => removeFromCart(item.cartItemId)}
              style={styles.botaoRemover}
            >
              <Text style={styles.textoBotaoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botão final de compra */}
      {cart.length > 0 && (
        <TouchableOpacity style={styles.botaoComprar} onPress={handleFinalizarCompra}>
          <Text style={styles.textoBotaoComprar}>Finalizar Compra</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff0f6', 
    padding: 20 
  },
  icone: {
    width: 130,
    height: 130,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  texto: { 
    fontSize: 17, 
    marginTop: 8, 
    color: '#555',
    textAlign: 'center',
    lineHeight: 22
  },
  lista: {
    width: '100%',
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    marginTop: 5,
  },
  botaoRemover: {
    marginTop: 10,
    backgroundColor: '#ff69b4',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoComprar: {
    marginTop: 20,
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
