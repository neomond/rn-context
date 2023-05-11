import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProductsContext} from '../context/ProductsContext';

const ProductDetails = ({route, navigation}: any) => {
  const {id} = route.params;
  const {products, addToCart, addToWishlist} = useContext(ProductsContext);
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

  return (
    <SafeAreaView>
      <Text>{selectedProduct.title}</Text>
      <Text>{selectedProduct.price}</Text>
      <Text>{selectedProduct.description}</Text>

      <Image
        source={{uri: selectedProduct.image}}
        style={styles.prodImage}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={handleAddToCart}>
        <Text>Add To My Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToWishlist}>
        <Text>Add To Wishlist</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  prodImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default ProductDetails;
