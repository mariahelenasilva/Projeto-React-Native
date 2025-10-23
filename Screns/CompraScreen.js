import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CompraScreen({ route }) {
  const { produto } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <Text style={styles.title}>Compra Confirmada!</Text>
      <Text style={styles.subtitle}>
        Seu pedido do produto <Text style={{ fontWeight: 'bold' }}>{produto.title}</Text> está sendo preparado para entrega. 💌
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: 150, height: 150, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#d63384', marginBottom: 10 },
  subtitle: { fontSinze: 16, textAlign: 'center', color: '#333' },
});
