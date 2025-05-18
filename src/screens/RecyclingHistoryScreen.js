import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getUserRecyclingHistory } from '../services/database';

const RecyclingHistoryScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUser) {
        try {
          const recyclingHistory = await getUserRecyclingHistory(currentUser.uid);
          setHistory(recyclingHistory);
        } catch (error) {
          console.error('Error fetching recycling history:', error);
        }
      }
      
      setLoading(false);
    };

    fetchHistory();
  }, [currentUser]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Recycling History"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Recycling History"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please log in to view your recycling history</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (history.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Recycling History"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't recycled any devices yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  // For demo purposes, create mock data if history is empty
  const displayHistory = history.length > 0 ? history : [
    {
      id: '1',
      deviceType: 'smartphone',
      timestamp: { toDate: () => new Date(2025, 4, 15) },
      points: 50,
      co2Saved: 0.8,
      materials: { copper: 15, gold: 0.034, plastic: 35, aluminum: 25 }
    },
    {
      id: '2',
      deviceType: 'laptop',
      timestamp: { toDate: () => new Date(2025, 4, 10) },
      points: 120,
      co2Saved: 2.1,
      materials: { copper: 90, gold: 0.15, plastic: 450, aluminum: 220 }
    },
    {
      id: '3',
      deviceType: 'monitor',
      timestamp: { toDate: () => new Date(2025, 4, 5) },
      points: 90,
      co2Saved: 1.5,
      materials: { copper: 110, gold: 0.05, plastic: 650, aluminum: 320 }
    }
  ];

  const renderItem = ({ item }) => {
    const dateString = item.timestamp.toDate ? 
      new Date(item.timestamp.toDate()).toLocaleDateString() : 
      new Date(item.timestamp).toLocaleDateString();
    
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceIcon}>{getDeviceTypeIcon(item.deviceType)}</Text>
            <Text style={styles.deviceType}>{getDeviceTypeName(item.deviceType)}</Text>
          </View>
          <Text style={styles.historyDate}>{dateString}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.materialsList}>
          {Object.entries(item.materials || {}).map(([material, amount]) => (
            <View key={material} style={styles.materialItem}>
              <Text style={styles.materialName}>{capitalizeFirstLetter(material)}</Text>
              <Text style={styles.materialAmount}>{amount}g</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.impactRow}>
          <View style={styles.impactItem}>
            <Text style={styles.impactLabel}>Points Earned</Text>
            <Text style={styles.impactValue}>{item.points}</Text>
          </View>
          
          <View style={styles.impactItem}>
            <Text style={styles.impactLabel}>CO₂ Saved</Text>
            <Text style={styles.impactValue}>{item.co2Saved.toFixed(1)} kg</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Recycling History"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <FlatList
        data={displayHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

// Helper functions
const getDeviceTypeIcon = (type) => {
  const iconMap = {
    smartphone: '📱',
    laptop: '💻',
    tablet: '📱',
    desktop: '🖥️',
    monitor: '🖥️',
    printer: '🖨️',
    tv: '📺',
    console: '🎮',
    other: '📟',
  };
  
  return iconMap[type] || iconMap.other;
};

const getDeviceTypeName = (type) => {
  const nameMap = {
    smartphone: 'Smartphone',
    laptop: 'Laptop',
    tablet: 'Tablet',
    desktop: 'Desktop Computer',
    monitor: 'Monitor',
    printer: 'Printer',
    tv: 'Television',
    console: 'Gaming Console',
    other: 'Electronic Device',
  };
  
  return nameMap[type] || nameMap.other;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  deviceType: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDate: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  materialsList: {
    marginBottom: 12,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  materialName: {
    color: COLORS.text,
    opacity: 0.7,
  },
  materialAmount: {
    color: COLORS.text,
  },
  impactRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
  },
  impactLabel: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 12,
    marginBottom: 4,
  },
  impactValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecyclingHistoryScreen;