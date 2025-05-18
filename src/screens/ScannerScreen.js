// src/screens/ScannerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

const ScannerScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulate a successful scan with mock data
  const simulateScan = () => {
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Mock device data based on the entered ID or a random selection
      const deviceTypes = [
        'smartphone', 'laptop', 'tablet', 'desktop', 'monitor', 'printer', 'tv', 'console'
      ];
      
      const randomType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
      
      const deviceData = {
        type: deviceId ? deviceId.toLowerCase() : randomType,
        brand: 'Sample Brand',
        model: 'Model X' + Math.floor(Math.random() * 100),
        year: 2020 + Math.floor(Math.random() * 5),
        condition: 'Good',
        materials: getEstimatedMaterials(deviceId ? deviceId.toLowerCase() : randomType),
        points: getEstimatedPoints(deviceId ? deviceId.toLowerCase() : randomType),
        co2Saved: getEstimatedCO2Saved(deviceId ? deviceId.toLowerCase() : randomType),
      };
      
      setLoading(false);
      navigation.navigate('DeviceDetail', { deviceData });
    }, 1500);
  };
  
  // Helper functions to generate estimated values based on device type
  const getEstimatedMaterials = (type) => {
    // This would come from a database in a real app
    const materialsMap = {
      smartphone: { copper: 15, gold: 0.034, plastic: 35, aluminum: 25 },
      laptop: { copper: 90, gold: 0.15, plastic: 450, aluminum: 220 },
      tablet: { copper: 40, gold: 0.06, plastic: 120, aluminum: 80 },
      desktop: { copper: 320, gold: 0.2, plastic: 1200, aluminum: 580 },
      monitor: { copper: 110, gold: 0.05, plastic: 650, aluminum: 320 },
      printer: { copper: 180, gold: 0.03, plastic: 800, aluminum: 150 },
      tv: { copper: 220, gold: 0.04, plastic: 1100, aluminum: 380 },
      console: { copper: 140, gold: 0.12, plastic: 480, aluminum: 210 },
      other: { copper: 100, gold: 0.05, plastic: 400, aluminum: 200 },
    };
    
    return materialsMap[type] || materialsMap.other;
  };

  const getEstimatedPoints = (type) => {
    const pointsMap = {
      smartphone: 50,
      laptop: 120,
      tablet: 80,
      desktop: 150,
      monitor: 90,
      printer: 70,
      tv: 110,
      console: 85,
      other: 60,
    };
    
    return pointsMap[type] || pointsMap.other;
  };

  const getEstimatedCO2Saved = (type) => {
    const co2Map = {
      smartphone: 0.8,
      laptop: 2.1,
      tablet: 1.2,
      desktop: 2.8,
      monitor: 1.5,
      printer: 1.3,
      tv: 2.0,
      console: 1.6,
      other: 1.0,
    };
    
    return co2Map[type] || co2Map.other;
  };

  const manuallyEnterDetails = () => {
    navigation.navigate('ManualEntry');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Device Scanner"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Scan Device</Text>
          <Text style={styles.infoText}>
            In a full implementation, you would scan a barcode or QR code on the device. 
            For this demo, you can enter a device type or leave it empty for a random device.
          </Text>
        </View>
        
        <View style={styles.scanSimulator}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Device Type (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. smartphone, laptop, tv"
              placeholderTextColor="#999"
              value={deviceId}
              onChangeText={setDeviceId}
            />
          </View>
          
          <ActionButton
            title={loading ? "Scanning..." : "Simulate Scan"}
            onPress={simulateScan}
            style={styles.scanButton}
            disabled={loading}
          />
        </View>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <ActionButton
          title="Enter Device Details Manually"
          onPress={manuallyEnterDetails}
          primary={false}
          style={styles.manualButton}
        />
      </View>
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
    padding: 16,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  scanSimulator: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: COLORS.text,
  },
  scanButton: {
    marginBottom: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.text,
    paddingHorizontal: 16,
    opacity: 0.7,
  },
  manualButton: {
    marginBottom: 16,
  },
});

export default ScannerScreen;