import {useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';

const BasketScreen = () => {
  const {cart, deleteFromCart, changeQuantity, calcTotal, total} =
    useContext(ProductsContext);

  useEffect(() => {
    calcTotal();
  }, [cart]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView>
          {cart.map((item: any) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.itemContainer}>
                <Image
                  source={{uri: item.image}}
                  style={styles.prodImage}
                  resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.prodTitle}>{item.title}</Text>
                  <Text style={styles.prodPrice}>{item.price}</Text>
                  <Text style={styles.prodQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={() => deleteFromCart(item.id)}
                  style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeQuantity(item, 'INC')}
                  style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeQuantity(item, 'DEC')}
                  disabled={item.quantity === 0}
                  style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPrice}>${total}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  prodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  prodPrice: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  prodQuantity: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  prodImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  totalContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
  },
  actionButtonText: {
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
});
