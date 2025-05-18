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
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile detail"
        leftIcon="←"
        rightIcon="🔍"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          
          <Text style={styles.profileName}>ElecCycle App</Text>
          
          <View style={styles.verificationContainer}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.verificationText}>Find Collection</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Component</Text>
            <View style={styles.upgradeBadge}>
              <Text style={styles.upgradeText}>UPGRADE PLAN</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Track</Text>
            <Text style={styles.detailValue}>Circular economy progress</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Support contact</Text>
            <Text style={styles.detailValue}>info@eleccycle.com</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current time</Text>
            <Text style={styles.detailValue}>12:05 PM</Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <ActionButton
            title="Locate"
            onPress={() => {}}
            primary={false}
            style={styles.actionButton}
          />
          
          <ActionButton
            title="Scan"
            onPress={() => {}}
            primary={false}
            style={styles.actionButton}
          />
          
          <ActionButton
            title="Track"
            onPress={() => {}}
            primary={false}
            style={styles.actionButton}
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.card,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 40,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 16,
    marginRight: 4,
  },
  verificationText: {
    color: COLORS.text,
    fontSize: 14,
  },
  detailsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 14,
    maxWidth: '60%',
    textAlign: 'right',
  },
  upgradeBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  upgradeText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionsContainer: {
    paddingHorizontal: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default ProfileScreen;