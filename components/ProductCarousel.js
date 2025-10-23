// components/ProductCarousel.js
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductCarousel({ produtos, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Destaques</Text>
      <FlatList
        data={produtos.slice(0, 10)} // mostra só os 10 primeiros produtos
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.imagem} />
            <Text style={styles.nome} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.preco}>R$ {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 8,
    width: width * 0.4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  imagem: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    color: '#444',
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E91E63',
    marginTop: 2,
  },
});
