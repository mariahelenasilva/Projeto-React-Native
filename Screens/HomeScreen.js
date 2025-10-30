import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCarousel from '../components/ProductCarousel';

export default function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const urls = [
          'https://dummyjson.com/products/category/mens-shirts',
          'https://dummyjson.com/products/category/womens-dresses',
          'https://dummyjson.com/products/category/mens-shoes',
          'https://dummyjson.com/products/category/womens-shoes',
          'https://dummyjson.com/products/category/fragrances',
          'https://dummyjson.com/products/category/skincare',
          'https://dummyjson.com/products/category/beauty',
          'https://dummyjson.com/products/category/womens-bags',
          'https://dummyjson.com/products/category/mens-watches'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        const todosProdutos = data.flatMap(item => item.products);
        setProdutos(todosProdutos);
        setFilteredProdutos(todosProdutos);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProdutos();
  }, []);

  const handleCategorySelect = (categories) => {
    if (categories === 'todas') {
      setFilteredProdutos(produtos);
      setCategoriaAtiva('todas');
    } else {
      const filtrados = produtos.filter((item) =>
        categories.includes(item.category)
      );
      setFilteredProdutos(filtrados);
      setCategoriaAtiva(categories[0]);
    }
  };

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
      {/* 🔸 Carrossel de categorias */}
      <ProductCarousel onCategorySelect={handleCategorySelect} />

      {/* 🔹 Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar produto..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Indicador de categoria ativa */}
      <View style={styles.categoriaInfo}>
        <Text style={styles.categoriaText}>
          {categoriaAtiva === 'todas' ? '🛍️ Todos os produtos' : `Categoria: ${categoriaAtiva}`}
        </Text>
        <Text style={styles.contadorText}>
          {filteredProdutos.length} produtos encontrados
        </Text>
      </View>

      {/* 🔹 Lista de produtos */}
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
            <Text style={styles.categoria}>{item.category}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8fb',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    height: 45,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchButton: {
    backgroundColor: '#e91e63',
    borderRadius: 10,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 45,
    shadowColor: '#e91e63',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  categoriaText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  contadorText: {
    fontSize: 14,
    color: '#777',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f4d7e2',
  },
  image: {
    width: 120,
    height: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  preco: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e91e63',
    marginTop: 4,
  },
  categoria: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
    textTransform: 'capitalize',
  },
});
