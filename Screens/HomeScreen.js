import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCarousel from '../components/ProductCarousel';

export default function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  // 🔹 Busca todos os produtos das categorias desejadas
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

  // 🔹 Função para filtrar por categoria
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

  // 🔍 Função de busca manual
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
      <ProductCarousel
        onCategorySelect={handleCategorySelect}
      />

      {/* 🔹 Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar produto..."
          placeholderTextColor="#999"
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
          {categoriaAtiva === 'todas' ? 'Todos os produtos' : `Categoria: ${categoriaAtiva}`}
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
  categoriaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  categoriaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contadorText: {
    fontSize: 14,
    color: '#666',
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
  categoria: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textTransform: 'capitalize',
  },
});