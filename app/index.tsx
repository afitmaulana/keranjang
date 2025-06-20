import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { TProduct, TCart } from '@/constants/Models';
import useCartStore from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { UserContext } from './_layout';

// DATA PRODUK (sama seperti sebelumnya)
const stores: { name: string, products: TProduct[] }[] = [
    {
      name: 'Elektronik Mantap',
      products: [
        { id: 101, name: 'Smartphone AI Terbaru', image: 'https://images.samsung.com/id/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg', price: 19500000, category: 'Elektronik', store: 'Elektronik Mantap' },
        { id: 102, name: 'Laptop Tipis Ultrabook', image: 'https://p2-ofp.static.pub/fes/cms/2023/04/28/vga8z5j55o3x6s4l4m19g1zwn820so953600.png', price: 12500000, category: 'Elektronik', store: 'Elektronik Mantap' },
        { id: 103, name: 'Smartwatch Generasi 5', image: 'https://www.garmin.co.id/m/id/g/products/venu-3-s-ivory-soft-gold-010-02785-83-5.png', price: 4500000, category: 'Elektronik', store: 'Elektronik Mantap' },
      ]
    },
    {
      name: 'Fashion Pria Keren',
      products: [
        { id: 201, name: 'Kemeja Flanel Kotak', image: 'https://www.uniqlo.com/id/en/products/E460682-000/images/08_E460682-000.jpg', price: 250000, category: 'Fashion', store: 'Fashion Pria Keren' },
        { id: 202, name: 'Celana Chino Slimfit', image: 'https://www.uniqlo.com/id/en/products/E463859-000/images/09_E463859-000.jpg', price: 350000, category: 'Fashion', store: 'Fashion Pria Keren' },
        { id: 203, name: 'Sepatu Lari Nyaman', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/28c189b8-bb1a-45c1-93c4-978185ad3343/invincible-3-road-running-shoes-0h8j3v.png', price: 750000, category: 'Fashion', store: 'Fashion Pria Keren' },
      ]
    },
    {
      name: 'Perlengkapan Rumah Tangga',
      products: [
        { id: 301, name: 'Air Fryer Digital', image: 'https://www.philips.co.id/c-dam/b2c/kitchen/airfryer/combi-7000-series/xxl-connected/connected-airfryer-combi-7000-series-xxl-connected-hd9880-90-v1.png', price: 1200000, category: 'Rumah Tangga', store: 'Perlengkapan Rumah Tangga' },
        { id: 302, name: 'Blender Multifungsi', image: 'https://www.philips.co.id/c-dam/b2c/master/experience/product-hero-and-launch/blenders/3000-series/id/id-blender-3000-series-core-hr222-large-v2.png', price: 600000, category: 'Rumah Tangga', store: 'Perlengkapan Rumah Tangga' },
      ]
    }
];

const THEME_COLOR = '#3498db';

const HomeScreen = () => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("UserContext is undefined");
  const { currentUser, logout } = userContext;

  const {
    cartItems,
    addItemToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
  } = useCartStore();

  const [coupon, setCoupon] = useState('');

  const onAddToCart = (product: TProduct) => {
    addItemToCart(product);
    Alert.alert('Sukses', `${product.name} ditambahkan ke keranjang.`);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Gagal', 'Keranjang Anda kosong.');
      return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (currentUser) {
      router.push({
        pathname: '/payment',
        params: { items: JSON.stringify(cartItems), total: total.toString() },
      });
    } else {
      Alert.alert("Login Diperlukan", "Anda harus login untuk melanjutkan.");
      router.push({
        pathname: '/login',
        params: { redirect: '/', },
      });
    }
  };
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toko Kita</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={28} color={THEME_COLOR} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeMessage}>Halo, {currentUser?.username}!</Text>
        
        {/* Bagian Daftar Produk */}
        <Text style={styles.heading}>Produk Terbaru</Text>
        {stores.map(store => (
          <View key={store.name} style={styles.storeSection}>
            <Text style={styles.storeName}>{store.name}</Text>
            {store.products.map((item) => (
              <View key={item.id} style={styles.product}>
                <Image source={{ uri: item.image }} style={styles.productImage}/>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>Rp{item.price.toLocaleString('id-ID')}</Text>
                </View>
                 <TouchableOpacity
                    style={[styles.addButton, {backgroundColor: THEME_COLOR}]}
                    onPress={() => onAddToCart(item)} >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {/* Bagian Keranjang Belanja */}
        <Text style={styles.heading}>Keranjang Belanja</Text>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={50} color="#ccc" />
            <Text style={styles.emptyCartText}>Keranjang Anda kosong</Text>
          </View>
        ) : (
          <View style={styles.cartContainer}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{uri: item.image}} style={styles.cartItemImage}/>
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>Rp{(item.price).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
                    <Ionicons name="close-circle" size={24} color="#ccc" />
                </TouchableOpacity>
              </View>
            ))}
            
            {/* Bagian Kupon */}
            <View style={styles.couponContainer}>
              <TextInput 
                placeholder="Tambahkan kode kupon"
                style={styles.couponInput}
                value={coupon}
                onChangeText={setCoupon}
              />
              <TouchableOpacity style={styles.couponButton}>
                <Text style={styles.couponButtonText}>Gunakan</Text>
              </TouchableOpacity>
            </View>

            {/* Bagian Total */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>Rp{totalPrice.toLocaleString('id-ID')}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Tombol Checkout hanya muncul jika ada barang di keranjang */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutFooter}>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Lanjut ke Checkout</Text>
            </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

// --- STYLESHEET BARU YANG LEBIH MODERN ---
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f7f8fa' },
  container: { paddingHorizontal: 15, paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  logoutButton: {},
  welcomeMessage: { fontSize: 18, color: '#666', paddingVertical: 10 },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 15, color: '#333' },
  storeSection: { marginBottom: 10 },
  storeName: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#555' },
  product: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, backgroundColor: '#fff', borderRadius: 12 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  productName: { fontSize: 15, fontWeight: '600', marginBottom: 5 },
  productPrice: { fontSize: 14, color: THEME_COLOR, fontWeight: 'bold' },
  addButton: { padding: 8, borderRadius: 20 },
  emptyCartContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, backgroundColor: '#fff', borderRadius: 12 },
  emptyCartText: { marginTop: 10, fontSize: 16, color: '#aaa' },
  cartContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 15 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  cartItemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  cartItemDetails: { flex: 1 },
  cartItemName: { fontSize: 16, fontWeight: '500' },
  cartItemPrice: { fontSize: 14, color: '#888', marginTop: 4 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  quantityButton: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold', color: '#555' },
  quantityText: { marginHorizontal: 15, fontSize: 16, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  couponContainer: { flexDirection: 'row', marginTop: 20 },
  couponInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 15, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#fafafa' },
  couponButton: { backgroundColor: THEME_COLOR, paddingHorizontal: 20, justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  couponButtonText: { color: '#fff', fontWeight: 'bold' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  totalText: { fontSize: 16, color: '#888' },
  totalPrice: { fontSize: 20, fontWeight: 'bold' },
  checkoutFooter: { padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  checkoutButton: { backgroundColor: THEME_COLOR, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});