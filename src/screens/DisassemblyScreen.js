import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';

const DisassemblyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>♻️</Text>
        <Text style={styles.headerTitle}>ElecCycle</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.progressSection}>
          <ProgressBar 
            progress={50} 
            label="Progress: 50% Complete" 
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disassemble Components</Text>
          
          <View style={styles.circuitImageContainer}>
            <Text style={styles.circuitIcon}>🔌</Text>
          </View>
          
          <View style={styles.componentsContainer}>
            <View style={styles.componentItem}>
              <View style={styles.componentInfo}>
                <Text style={styles.componentName}>Circuit Board</Text>
                <Text style={styles.componentCategory}>Category: Electronics</Text>
              </View>
              <TouchableOpacity style={styles.assignButton}>
                <Text style={styles.assignButtonText}>Assign</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.componentItem}>
              <View style={styles.componentInfo}>
                <Text style={styles.componentName}>Plastic Housing</Text>
                <Text style={styles.componentCategory}>Category: Recyclable</Text>
              </View>
              <TouchableOpacity style={styles.assignButton}>
                <Text style={styles.assignButtonText}>Assign</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.componentItem}>
              <View style={styles.componentInfo}>
                <Text style={styles.componentName}>Metal Screws</Text>
                <Text style={styles.componentCategory}>Category: Reusable</Text>
              </View>
              <TouchableOpacity style={styles.assignButton}>
                <Text style={styles.assignButtonText}>Assign</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  content: {
    flex: 1,
  },
  progressSection: {
    padding: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
  },
  circuitImageContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  circuitIcon: {
    fontSize: 48,
  },
  componentsContainer: {
    gap: 16,
  },
  componentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  componentCategory: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 12,
  },
  assignButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  assignButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DisassemblyScreen;