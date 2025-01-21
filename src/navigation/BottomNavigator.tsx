import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import ManajemenBarangBekasScreen from '../screens/ManagementBarangBekasScreen';
import BarangBekasListScreen from '../screens/BarangBekasListScreen';
import { Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.tabLabel, { color }]}>{label}</Text>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#DFF6E0',
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor: '#A7C957',
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: '#1E5128',
        tabBarInactiveTintColor: '#2D6A4F',
        tabBarLabel: ({ focused, color }) => {
          const label =
            route.name === 'Home'
              ? 'Home'
              : route.name === 'Barang Bekas'
              ? 'Barang Bekas'
              : route.name === 'List Barang Bekas'
              ? 'List Barang'
              : '';
          return <CustomTabBarLabel label={label} color={color} />;
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Barang Bekas') {
            iconName = 'inbox';
          } else if (route.name === 'List Barang Bekas') {
            iconName = 'bars';
          } else {
            iconName = 'question';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Barang Bekas" component={ManajemenBarangBekasScreen} />
      <Tab.Screen name="List Barang Bekas" component={BarangBekasListScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BottomNavigator;
