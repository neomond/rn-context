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
        <TouchableOpacity onPress={() => goToDetail(item.id)}>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
          <Image
            source={{uri: item.image}}
            style={styles.prodImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
    flexDirection: 'row',
    marginLeft: 30,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#e3e3e3',
    padding: 20,
    marginRight: 20,
    width: 220,
  },
  prodImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
