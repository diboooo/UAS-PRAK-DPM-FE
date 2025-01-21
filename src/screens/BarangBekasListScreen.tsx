import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface BarangBekasRecord {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  dateAdded: string;
}

const BarangBekasListScreen = () => {
  const [records, setRecords] = useState<BarangBekasRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/manajemen-barang-bekas');
        setRecords(response.data);
      } catch (error: any) {
        console.error('Error fetching records:', error.response?.data?.error || 'Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const renderRecord = ({ item }: { item: BarangBekasRecord }) => (
    <View style={styles.recordCard}>
      <Text style={styles.recordTitle}>{item.name}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.recordText}>
          <Text style={styles.recordLabel}>Description:</Text> {item.description}
        </Text>
        <Text style={styles.recordText}>
          <Text style={styles.recordLabel}>Quantity:</Text> {item.quantity}
        </Text>
        <Text style={styles.recordText}>
          <Text style={styles.recordLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Barang Bekas List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1E5128" />
      ) : records.length > 0 ? (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No records available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6E0',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E5128',
    textAlign: 'center',
    paddingTop: 50,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordCard: {
    backgroundColor: '#F5FFF4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#1E5128',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#A7C957',
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 10,
  },
  cardContent: {
    borderTopWidth: 1,
    borderColor: '#A7C957',
    paddingTop: 10,
  },
  recordText: {
    fontSize: 16,
    color: '#1E5128',
    marginBottom: 5,
  },
  recordLabel: {
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    color: '#1E5128',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BarangBekasListScreen;
