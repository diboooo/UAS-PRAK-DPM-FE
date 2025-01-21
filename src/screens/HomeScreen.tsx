import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface BarangBekasRecord {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  dateAdded: string;
}

const HomeScreen = () => {
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

  const renderNode = ({ item }: { item: BarangBekasRecord }) => (
    <View style={styles.nodeCard}>
      <Text style={styles.nodeTitle}>{item.name}</Text>
      <Text style={styles.nodeText}>
        <Text style={styles.nodeLabel}>Description:</Text> {item.description}
      </Text>
      <Text style={styles.nodeText}>
        <Text style={styles.nodeLabel}>Quantity:</Text> {item.quantity}
      </Text>
      <Text style={styles.nodeText}>
        <Text style={styles.nodeLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Barang Bekas Overview</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1E5128" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderNode}
          contentContainerStyle={styles.listContainer}
        />
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
  nodeCard: {
    backgroundColor: '#F5FFF4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A7C957',
    shadowColor: '#1E5128',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  nodeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 10,
  },
  nodeText: {
    fontSize: 16,
    color: '#1E5128',
    marginBottom: 5,
  },
  nodeLabel: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
