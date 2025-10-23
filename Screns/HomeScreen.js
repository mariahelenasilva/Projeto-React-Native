import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCarousel from '../components/ProductCarousel'; // ✅ Carrossel

export default function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  // 🔹 Carrega apenas a categoria de perfumes (fragrances)
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/fragrances');
        const data = await response.json();
        setProdutos(data.products);
        setFilteredProdutos(data.products);
      } catch (error) {
        console.error('Erro ao buscar perfumes:', error);
      }
    };
    fetchPerfumes();
  }, []);

  // 🔹 Função de busca manual (clicando na lupa)
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredProdutos(produtos);
    } else {
      const filtrados = produtos.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProdutos(filtrados);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔸 Carrossel de perfumes */}
      <ProductCarousel
        produtos={produtos}
        onPress={(item) => navigation.navigate('Detalhes', { produto: item })}
      />

      {/* 🔹 Barra de pesquisa com botão de lupa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar perfume..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Lista de perfumes */}
      <FlatList
        data={filteredProdutos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.nome}>{item.title}</Text>
            <Text style={styles.preco}>R$ {item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#E91E63',
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
    color: '#444',
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E91E63',
    marginTop: 3,
  },
});
