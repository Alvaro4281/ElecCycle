import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';
import ActionButton from '../components/ActionButton';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>♻️</Text>
          <Text style={styles.headerTitle}>ElecCycle</Text>
        </View>
        
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.progressSection}>
          <ProgressBar 
            progress={30} 
            label="Phase 1 of 3: Electronic Waste Collection" 
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule a Pickup</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              placeholderTextColor="#999"
            />
            <ActionButton
              title="Submit"
              onPress={() => {}}
              style={styles.submitButton}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locate Collection Points</Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapPin}>📍</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Packaging Guidelines</Text>
          <View style={styles.guidelinesContainer}>
            <Text style={styles.guidelineText}>• Remove batteries from devices before disposal.</Text>
            <Text style={styles.guidelineText}>• Use protective packaging to prevent damage.</Text>
            <Text style={styles.guidelineText}>• Label packages with the type of electronic waste.</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  profileButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  progressSection: {
    padding: 16,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: COLORS.text,
    marginRight: 8,
  },
  submitButton: {
    width: 100,
    height: 50,
    paddingHorizontal: 16,
  },
  mapContainer: {
    backgroundColor: COLORS.card,
    height: 200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mapPin: {
    fontSize: 48,
  },
  guidelinesContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
  },
  guidelineText: {
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default HomeScreen;