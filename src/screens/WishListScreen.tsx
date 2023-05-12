import {
  Image,
  SafeAreaView,
  ScrollView,
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
    <SafeAreaView style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyWishContainer}>
          <Text style={styles.emptyWishText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.title}>Wishlist</Text>
          {wishlist.map(product => (
            <View style={styles.productContainer} key={product.id}>
              <Image
                source={{uri: product.image}}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWishlist(product.id)}>
                  <Text style={styles.removeButtonText}>Remove </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#e3e3e3',
    padding: 25,
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyWishContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWishText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
});
