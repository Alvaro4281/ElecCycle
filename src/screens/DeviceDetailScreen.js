import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../context/AuthContext';
import { recordRecyclingActivity } from '../services/database';

const deviceTypes = [
  { id: 'smartphone', name: 'Smartphone' },
  { id: 'laptop', name: 'Laptop' },
  { id: 'tablet', name: 'Tablet' },
  { id: 'desktop', name: 'Desktop Computer' },
  { id: 'monitor', name: 'Monitor' },
  { id: 'printer', name: 'Printer' },
  { id: 'tv', name: 'Television' },
  { id: 'console', name: 'Gaming Console' },
  { id: 'other', name: 'Other Device' },
];

const DeviceDetailScreen = ({ route, navigation }) => {
  const { deviceData } = route.params;
  const { currentUser } = useAuth();
  
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
  
  const handleRecycleConfirm = async () => {
    try {
      if (!currentUser) {
        Alert.alert(
          'Authentication Required',
          'Please log in to record your recycling activity.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log In', onPress: () => navigation.navigate('Login') }
          ]
        );
        return;
      }
      
      // Record the recycling activity in database
      const success = await recordRecyclingActivity(currentUser.uid, deviceData);
      
      if (success) {
        Alert.alert(
          'Successfully Recorded!',
          'Your recycling activity has been recorded. You earned ' + deviceData.points + ' points!',
          [
            { text: 'View My Impact', onPress: () => navigation.navigate('Stats') },
            { text: 'Continue', onPress: () => navigation.navigate('Home') }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to record your recycling activity. Please try again.');
      }
    } catch (error) {
      console.error('Error recording recycling activity:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Device Details"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.deviceIconContainer}>
          <Text style={styles.deviceIcon}>
            {getDeviceTypeIcon(deviceData.type)}
          </Text>
        </View>
        
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceType}>
            {deviceTypes.find(t => t.id === deviceData.type)?.name || 'Unknown Device'}
          </Text>
          {deviceData.brand && (
            <Text style={styles.deviceBrand}>
              {deviceData.brand} {deviceData.model ? `• ${deviceData.model}` : ''}
            </Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Materials</Text>
          
          <View style={styles.materialsContainer}>
            <View style={styles.materialItem}>
              <View style={styles.materialIconContainer}>
                <Text style={styles.materialIcon}>🧡</Text>
              </View>
              <Text style={styles.materialValue}>{deviceData.materials.copper}g</Text>
              <Text style={styles.materialName}>Copper</Text>
            </View>
            
            <View style={styles.materialItem}>
              <View style={styles.materialIconContainer}>
                <Text style={styles.materialIcon}>💛</Text>
              </View>
              <Text style={styles.materialValue}>{deviceData.materials.gold}g</Text>
              <Text style={styles.materialName}>Gold</Text>
            </View>
            
            <View style={styles.materialItem}>
              <View style={styles.materialIconContainer}>
                <Text style={styles.materialIcon}>⚪</Text>
              </View>
              <Text style={styles.materialValue}>{deviceData.materials.plastic}g</Text>
              <Text style={styles.materialName}>Plastic</Text>
            </View>
            
            <View style={styles.materialItem}>
              <View style={styles.materialIconContainer}>
                <Text style={styles.materialIcon}>⚪</Text>
              </View>
              <Text style={styles.materialValue}>{deviceData.materials.aluminum}g</Text>
              <Text style={styles.materialName}>Aluminum</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          
          <View style={styles.impactContainer}>
            <View style={styles.impactItem}>
              <Text style={styles.impactIcon}>🌱</Text>
              <View>
                <Text style={styles.impactValue}>{deviceData.co2Saved.toFixed(1)} kg</Text>
                <Text style={styles.impactLabel}>CO₂ Saved</Text>
              </View>
            </View>
            
            <View style={styles.impactItem}>
              <Text style={styles.impactIcon}>✨</Text>
              <View>
                <Text style={styles.impactValue}>{deviceData.points}</Text>
                <Text style={styles.impactLabel}>Points Earned</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.ctaContainer}>
          <ActionButton
            title="Confirm Recycling"
            onPress={handleRecycleConfirm}
            style={styles.confirmButton}
          />
          
          <ActionButton
            title="Disassembly Instructions"
            onPress={() => navigation.navigate('Disassembly')}
            primary={false}
            style={styles.instructionsButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  deviceIconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  deviceIcon: {
    fontSize: 64,
  },
  deviceInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  deviceType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  deviceBrand: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  materialIconContainer: {
    marginBottom: 8,
  },
  materialIcon: {
    fontSize: 24,
  },
  materialValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  materialName: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
  },
  impactContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  impactIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  impactLabel: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
  },
  ctaContainer: {
    padding: 16,
    marginBottom: 24,
  },
  confirmButton: {
    marginBottom: 12,
  },
  instructionsButton: {},
});

export default DeviceDetailScreen;