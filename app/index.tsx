import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { TProduct } from '@/constants/Models';
import useCartStore from '@/store/cartStore';

const datas: TProduct[] = [
  {
    id: 1,
    name: 'Sabun',
    image:
      'https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/product/image/19012024/631a59378755a8a9895f1f2b/65aa42df854d3ae0b3f7399b/9ba2de39d8592641314e5a2938d013.jpg?x-oss-process=image/resize,m_pad,w_432,h_432/quality,Q_70',
    price: 3000,
    category: 'Alat Mandi',
  },
  {
    id: 2,
    name: 'Shampo',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxITPNmSKR-HREuNRIF0inmEBQNWJfs50T_w&s',
    price: 2000,
    category: 'Alat Mandi',
  },
  {
    id: 3,
    name: 'Odol',
    image:
      'https://images.tokopedia.net/img/cache/500-square/product-1/2020/8/24/28642369/28642369_2c99ac51-080b-4e34-8190-66e68aa91b4d_636_636',
    price: 5000,
    category: 'Alat Mandi',
  },
  {
    id: 4,
    name: 'Face Wash',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSmk_MrnFCgg6SMJVywhqLmmpKg7U1UGjDA&s',
    price: 30000,
    category: 'Alat Mandi',
  },
];

const HomeScreen = () => {
  const {
    cartItems,
    addItemToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
  } = useCartStore();

  const onAddToCart = (product: TProduct) => {
    addItemToCart(product);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Daftar Produk</Text>
      {datas.map((item) => (
        <View key={item.id} style={styles.product}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Text>{item.name} - Rp{item.price}</Text>
          <Button title="Add to Cart" onPress={() => onAddToCart(item)} />
        </View>
      ))}

      <Text style={styles.heading}>Keranjang</Text>
      {cartItems.length === 0 ? (
        <Text>Keranjang kosong</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text>
              {item.name} x{item.quantity} - Rp{item.price * item.quantity}
            </Text>
            <Button title="+" onPress={() => increaseQuantity(item.id)} />
            <Button title="-" onPress={() => decreaseQuantity(item.id)} />
            <Button title="Hapus" onPress={() => removeItemFromCart(item.id)} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  product: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cartItem: {
    marginBottom: 15,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: '#ccc',
  },
});