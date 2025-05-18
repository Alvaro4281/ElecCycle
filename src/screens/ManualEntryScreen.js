import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

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

const ManualEntryScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = () => {
    // Validate form data
    if (!selectedType) {
      alert('Please select a device type');
      return;
    }

    // Create device object
    const deviceData = {
      type: selectedType,
      brand,
      model,
      year: year ? parseInt(year) : null,
      condition,
      // Estimated materials based on device type (for demo)
      materials: getEstimatedMaterials(selectedType),
      // Estimated points and CO2 saved (for demo)
      points: getEstimatedPoints(selectedType),
      co2Saved: getEstimatedCO2Saved(selectedType),
    };

    // Navigate to device detail screen
    navigation.navigate('DeviceDetail', { deviceData });
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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Enter Device Details"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Type</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.typeContainer}
          >
            {deviceTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.selectedTypeButton
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text 
                  style={[
                    styles.typeButtonText,
                    selectedType === type.id && styles.selectedTypeButtonText
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Brand</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Apple, Samsung, HP"
              placeholderTextColor="#999"
              value={brand}
              onChangeText={setBrand}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Model</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. iPhone 12, Galaxy S21"
              placeholderTextColor="#999"
              value={model}
              onChangeText={setModel}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Year</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2019"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={year}
              onChangeText={setYear}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Condition</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Working, Broken Screen"
              placeholderTextColor="#999"
              value={condition}
              onChangeText={setCondition}
            />
          </View>
        </View>
        
        <ActionButton
          title="Continue"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeButton: {
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedTypeButton: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  selectedTypeButtonText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: COLORS.text,
  },
  submitButton: {
    margin: 16,
  },
});

export default ManualEntryScreen;