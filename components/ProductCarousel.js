import React from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ProductCarousel({ produtos, onCategorySelect }) {
  // 🔹 Categorias do carrossel
  const categorias = [
    {
      id: 1,
      nome: 'Roupas Femininas',
      image: 'https://static.zara.net/assets/public/4e6a/176c/f0ba4ef9ad79/ae6693eece7b/03085796800-p/03085796800-p.jpg?ts=1761739446795&w=840',
      categories: ['womens-dresses', 'womens-shoes', 'womens-bags']
    },
    {
      id: 2,
      nome: 'Roupas Masculinas',
      image: 'https://img.lojasrenner.com.br/item/930346315/original/3.jpg',
      categories: ['mens-shirts', 'mens-shoes', 'mens-watches']
    },
    {
      id: 3,
      nome: 'Artigos de Beleza',
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
            style={styles.card}
            onPress={() => onCategorySelect(item.categories)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
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
    height: 150,
  },
  card: { 
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { 
    width: 200, 
    height: 150, 
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});