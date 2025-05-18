import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';

const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Recycling Impact</Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Contribution</Text>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Devices</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5.8</Text>
              <Text style={styles.statLabel}>kg CO₂ Saved</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>320</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Materials Recovered</Text>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Copper</Text>
              <Text style={styles.materialValue}>125g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '75%', backgroundColor: '#CD7F32' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Gold</Text>
              <Text style={styles.materialValue}>0.2g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '15%', backgroundColor: '#FFD700' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Plastic</Text>
              <Text style={styles.materialValue}>450g</Text>
            </View>
            <View style={styles.materialBar}>
              <View style={[styles.materialProgress, { width: '60%', backgroundColor: '#A9A9A9' }]} />
            </View>
          </View>
          
          <View style={styles.materialItem}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialName}>Aluminum</Text>
              <Text style={styles.materialValue}>280g</Text>
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
              <Text style={styles.impactValue}>240L</Text>
              <Text style={styles.impactLabel}>Water Saved</Text>
            </View>
            
            <View style={styles.impactItem}>
              <View style={styles.impactIconContainer}>
                <Text style={styles.impactIcon}>🌱</Text>
              </View>
              <Text style={styles.impactValue}>0.8m²</Text>
              <Text style={styles.impactLabel}>Land Preserved</Text>
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
  content: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
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
});

export default StatsScreen;