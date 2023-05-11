import {createContext, useEffect, useState} from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
}

interface ProductsProviderProps {
  products: Product[];
  setProducts(products: Product[]): void;
  addToCart(product: Product): void;
  deleteFromCart(id: number): void;
  changeQuantity(product: Product, actionType: 'INC' | 'DEC'): void;
  total: number;
  cart: Product[];
  wishlist: Product[];
  addToWishlist(product: Product): void;
  deleteFromWishlist(id: number): void;
}

export const ProductsContext = createContext<ProductsProviderProps>({
  products: [],
  setProducts: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  changeQuantity: () => {},
  total: 0,
  cart: [],
  wishlist: [],
  addToWishlist: () => {},
  deleteFromWishlist: () => {},
});

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const checkExisting = cart.find(item => item.id === product.id);

    if (checkExisting) {
      const getNonExistingProduct = cart.filter(
        item => item.id !== checkExisting.id,
      );
      setCart(() => [
        ...getNonExistingProduct,
        {...checkExisting, quantity: checkExisting.quantity + 1},
      ]);
    } else {
      setCart(prev => [...prev, {...product, quantity: 1}]);
    }
  };

  const deleteFromCart = (id: number) => {
    const updatedCart = cart.filter(product => product.id !== id);
    setCart(updatedCart);
  };

  const calcTotal = () => {
    const total = cart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    setTotal(total);
  };

  useEffect(() => {
    calcTotal();
  }, [cart]);

  const changeQuantity = (product: Product, actionType: 'INC' | 'DEC') => {
    const findProduct = products.find(item => item.id === product.id);

    const getNonExistingProduct = products.filter(
      item => item.id !== findProduct?.id,
    );
    if (actionType === 'INC') {
      setProducts(() => [
        ...getNonExistingProduct,
        {...findProduct!, quantity: findProduct!.quantity + 1},
      ]);
    } else {
      setProducts(() => [
        ...getNonExistingProduct,
        {...findProduct!, quantity: findProduct!.quantity - 1},
      ]);
    }
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => [...prev, product]);
  };

  const deleteFromWishlist = (id: number) => {
    const updatedWishlist = wishlist.filter(product => product.id !== id);
    setWishlist(updatedWishlist);
  };

  const values: ProductsProviderProps = {
    products,
    setProducts,
    addToCart,
    deleteFromCart,
    changeQuantity,
    total,
    cart,
    wishlist,
    addToWishlist,
    deleteFromWishlist,
  };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};
