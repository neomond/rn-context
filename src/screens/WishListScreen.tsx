import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {ProductsContext} from '../context/ProductsContext';

const WishListScreen = () => {
  const {wishlist, deleteFromWishlist} = useContext(ProductsContext);

  const handleRemoveFromWishlist = (id: number) => {
    deleteFromWishlist(id);
  };
  return (
    <SafeAreaView>
      {wishlist.map(product => (
        <View key={product.id}>
          <Text>{product.title}</Text>
          <Text>{product.price}</Text>
          <Text>{product.description}</Text>
          <Image
            source={{uri: product.image}}
            style={styles.prodImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => handleRemoveFromWishlist(product.id)}>
            <Text>Remove From Wishlist</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  prodImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
