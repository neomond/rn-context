import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ProductsContext} from '../context/ProductsContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

const HomeScreen = ({navigation}: any) => {
  const {products, setProducts} = useContext(ProductsContext);

  const goToDetail = (id: number): any => {
    navigation.navigate('ProductDetails', {id: id});
  };

  const fetchedProducts = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  const renderProductItem = ({item}: any) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={{alignItems: 'center', rowGap: 15}}
          onPress={() => goToDetail(item.id)}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.image}}
              style={styles.prodImage}
              resizeMode="contain"
            />
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={styles.topTitle}>{item.title}</Text>
              <Text style={styles.priceStyle}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#e3e3e3',
    padding: 20,
    width: 220,
    height: 390,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  prodImage: {
    marginTop: 20,
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  topTitle: {
    marginTop: 20,
    fontSize: 18,
  },
  priceStyle: {
    fontSize: 22,
    marginTop: 20,
  },
});
