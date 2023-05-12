import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProductsContext} from '../context/ProductsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetails = ({route, navigation}: any) => {
  const {id} = route.params;
  const {products, addToCart, addToWishlist, wishlist} =
    useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  useEffect(() => {
    const product = products.find(item => item.id === id);
    setSelectedProduct(product);
  }, [id, products]);

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    navigation.navigate('Cart');
  };

  const handleAddToWishlist = () => {
    addToWishlist(selectedProduct);
  };
  const isWishlist = wishlist.some(
    (item: any) => item.id === selectedProduct.id,
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={handleAddToWishlist}>
            <Ionicons
              name={isWishlist ? 'heart' : 'heart-outline'}
              size={25}
              color={isWishlist ? 'red' : '#000'}
            />
          </TouchableOpacity>
          <Image
            source={{uri: selectedProduct.image}}
            style={styles.prodImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>{selectedProduct.title}</Text>
        <Text style={styles.price}>${selectedProduct.price}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{selectedProduct.description}</Text>
        <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
          <Ionicons name="cart-outline" size={25} color={'#fff'} />
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#e3e3e3',
    padding: 30,
    margin: 20,
    marginTop: 40,
  },
  prodImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProductDetails;
