import React from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCarousel({ produtos, onCategorySelect }) {
  const categorias = [
    {
      id: 1,
      nome: 'Roupas Femininas',
      image: 'https://img.freepik.com/fotos-premium/moda-mulher-maquiagem-suave-marrom-modelo-maquiagem-ondulada-penteado-glamour-beleza-rosto-salao-de-cabelo-longo-estilo-encaracolado-brilhante-feminino_163305-244523.jpg',
      categories: ['womens-dresses', 'womens-shoes', 'womens-bags']
    },
    {
      id: 2,
      nome: 'Roupas Masculinas',
      image: 'https://plus.unsplash.com/premium_photo-1727942419945-1908baae3c8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWxvJTIwbWFzY3VsaW5vfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000',
      categories: ['mens-shirts', 'mens-shoes', 'mens-watches']
    },
    {
      id: 3,
      nome: 'Beleza & Cuidados',
      image: 'https://img.lojasrenner.com.br/item/930595362/original/6.jpg',
      categories: ['fragrances', 'skincare', 'beauty']
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => onCategorySelect(item.categories)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Ionicons name="pricetag-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
              <Text style={styles.categoryName}>{item.nome}</Text>
            </View>
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
  card: {
    width: 200,
    height: 150,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingVertical: 8,
  },
  categoryName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
