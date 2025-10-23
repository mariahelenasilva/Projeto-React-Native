import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { produto } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{produto.title}</Text>
      <Text style={styles.brand}>Marca: {produto.brand}</Text>
      <Text style={styles.desc}>{produto.description}</Text>
      <Text style={styles.price}>💸 R$ {produto.price}</Text>
      <Button title="Comprar Agora" color="#d63384" onPress={() => navigation.navigate('Compra', { produto })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  brand: { fontSize: 16, color: '#555', marginBottom: 10 },
  desc: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
  price: { fontSize: 18, color: '#d63384', marginBottom: 20 },
});
