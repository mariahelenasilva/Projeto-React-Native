import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CompraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛍️ Pedido Confirmado!</Text>
      <Text style={styles.texto}>Seu pedido está sendo preparado para entrega.</Text>
      <Text style={styles.texto}>Obrigado por comprar conosco 💖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#ff1493' },
  texto: { fontSize: 16, marginTop: 10 },
});
