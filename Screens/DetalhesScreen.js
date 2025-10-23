import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesScreen({ route, navigation }) {
  const { produto } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.title}</Text>
      <Text style={styles.descricao}>{produto.description}</Text>
      <Text style={styles.preco}>Preço: R$ {produto.price}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Compra')}
      >
        <Text style={styles.textoBotao}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  imagem: { width: 200, height: 200, borderRadius: 10 },
  nome: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  descricao: { textAlign: 'center', marginTop: 10 },
  preco: { fontSize: 18, color: '#ff1493', marginVertical: 10 },
  botao: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
});
