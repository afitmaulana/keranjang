import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { TCart } from '@/constants/Models';
import useCartStore from '@/store/cartStore';

const THEME_COLOR = '#3498db';

const PaymentScreen = () => {
  const params = useLocalSearchParams();
  // Ambil fungsi clearCart dari store
  const { clearCart } = useCartStore();

  const items: TCart[] = params.items ? JSON.parse(params.items as string) : [];
  const total: number = params.total ? parseFloat(params.total as string) : 0;

  const handlePay = () => {
    // Kosongkan keranjang setelah pembayaran berhasil
    clearCart();

    Alert.alert(
      "Pembayaran Berhasil",
      "Terima kasih telah berbelanja!",
      [{ text: "OK", onPress: () => router.replace('/') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
        {items.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Jumlah: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Belanja</Text>
          <Text style={styles.totalAmount}>Rp{total.toLocaleString('id-ID')}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text>Virtual Account (Contoh)</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.paymentMethod}>
          <Text>E-Wallet (Contoh)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Bayar Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;

// Styles (sama seperti sebelumnya)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 15 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemImage: { width: 50, height: 50, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16 },
  itemQuantity: { fontSize: 14, color: '#666' },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15, marginTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: THEME_COLOR },
  paymentMethod: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  payButton: { backgroundColor: THEME_COLOR, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});