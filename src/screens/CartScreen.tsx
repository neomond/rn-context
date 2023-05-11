import {useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';

const BasketScreen = () => {
  const {cart, deleteFromCart, changeQuantity, calcTotal, total} =
    useContext(ProductsContext);

  useEffect(() => {
    calcTotal();
  }, [cart]);

  return (
    <SafeAreaView>
      <SafeAreaView>
        <Text>Products Items:</Text>
        {cart.map((item: any) => (
          <View key={item.id}>
            <Image
              source={{uri: item.image}}
              style={styles.prodImage}
              resizeMode="cover"
            />
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => deleteFromCart(item.id)}>
                <Text style={{color: 'red'}}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeQuantity(item, 'INC')}>
                <Text style={{color: 'green'}}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeQuantity(item, 'DEC')}
                disabled={item.quantity === 0}>
                <Text style={{color: 'red'}}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text>Total: {total}</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default BasketScreen;

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
