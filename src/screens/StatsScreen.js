import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, getUserRecyclingHistory } from '../services/database';

const StatsScreen = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const [userProfile, recyclingHistory] = await Promise.all([
            getUserProfile(currentUser.uid),
            getUserRecyclingHistory(currentUser.uid)
          ]);
          
          setProfile(userProfile);
          setHistory(recyclingHistory);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate total recycled materials
  const calculateTotalMaterials = () => {
    if (!profile) {
      return { copper: 0, gold: 0, plastic: 0, aluminum: 0 };
    }
    
    return profile.materialsSaved || { copper: 0, gold: 0, plastic: 0, aluminum: 0 };
  };

  // Use real user data or fallback to mock data if user not logged in
  const userData = profile || {
    recycledDevices: 12,
    totalPoints: 320,
    co2Saved: 5.8,
    materialsSaved: {
      copper: 125,
      gold: 0.2,
      plastic: 450,
      aluminum: 280
    }
  };

  const materials = calculateTotalMaterials();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Recycling Impact</Text>
          {!currentUser && (
            <Text style={styles.loginPrompt}>
              Log in to track your personal recycling stats
            </Text>
          )}
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Contribution</Text>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.recycledDevices}</Text>
              <Text style={styles.statLabel}>Devices</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.co2Saved.toFixed(1)}</Text>
              <Text style={styles.statLabel}>kg CO₂ Saved</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Materials Recovered</Text>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Copper</Text>
              <Text style={styles.materialValue}>{materials.copper}g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '75%', backgroundColor: '#CD7F32' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Gold</Text>
              <Text style={styles.materialValue}>{materials.gold}g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '15%', backgroundColor: '#FFD700' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Plastic</Text>
              <Text style={styles.materialValue}>{materials.plastic}g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '60%', backgroundColor: '#A9A9A9' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Aluminum</Text>
              <Text style={styles.materialValue}>{materials.aluminum}g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '40%', backgroundColor: '#C0C0C0' }]} />
            </View>
          </View>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Environmental Impact</Text>
          
          <View style={styles.impactRow}>
            <View style={styles.impactItem}>
              <View style={styles.impactIconContainer}>
                <Text style={styles.impactIcon}>💧</Text>
              </View>
              <Text style={styles.impactValue}>{(userData.co2Saved * 40).toFixed(0)}L</Text>
              <Text style={styles.impactLabel}>Water Saved</Text>
            </View>
            
            <View style={styles.impactItem}>
              <View style={styles.impactIconContainer}>
                <Text style={styles.impactIcon}>🌱</Text>
              </View>
              <Text style={styles.impactValue}>{(userData.co2Saved * 0.15).toFixed(1)}m²</Text>
              <Text style={styles.impactLabel}>Land Preserved</Text>
            </View>
          </View>
        </View>
        
        {history.length > 0 && (
          <View style={styles.statsCard}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            
            {history.slice(0, 3).map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text>{getDeviceTypeIcon(activity.deviceType)}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{getDeviceTypeName(activity.deviceType)}</Text>
                  <Text style={styles.activityDate}>
                    {new Date(activity.timestamp.toDate()).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.activityPoints}>+{activity.points}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get device icon
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

// Helper function to get device type name
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.text,
    marginTop: 12,
  },
  headerSection: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  loginPrompt: {
    color: COLORS.text,
    opacity: 0.7,
    marginTop: 8,
  },
  statsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  materialItem: {
    marginBottom: 12,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  materialName: {
    color: COLORS.text,
    fontSize: 14,
  },
  materialValue: {
    color: COLORS.text,
    fontSize: 14,
  },
  materialBar: {
    height: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  materialProgress: {
    height: '100%',
    borderRadius: 4,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  impactIcon: {
    fontSize: 24,
  },
  impactValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityDate: {
    color: COLORS.text,
    fontSize: 12,
    opacity: 0.7,
  },
  activityPoints: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatsScreen;