import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleLocation = () => setLocationEnabled(prev => !prev);
  const toggleDarkMode = () => {
    // In a real app, this would update the app's theme
    setDarkModeEnabled(prev => !prev);
    Alert.alert('Theme Setting', 'Theme changes will apply after restart.');
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear App Data',
      'Are you sure you want to clear all app data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Data', 
          style: 'destructive',
          onPress: () => Alert.alert('Data Cleared', 'All app data has been cleared.') 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Settings"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive updates about recycling opportunities
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Location Services</Text>
              <Text style={styles.settingDescription}>
                Find collection points near you
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={toggleLocation}
              trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Use dark theme throughout the app
              </Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <ActionButton
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
            primary={false}
            style={styles.settingButton}
          />
          
          <ActionButton
            title="Update Email"
            onPress={() => navigation.navigate('UpdateEmail')}
            primary={false}
            style={styles.settingButton}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>
          
          <ActionButton
            title="Clear App Data"
            onPress={handleClearData}
            primary={false}
            style={[styles.settingButton, styles.dangerButton]}
            textStyle={styles.dangerButtonText}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2025.05.01</Text>
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
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
  },
  settingButton: {
    marginBottom: 12,
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderColor: 'rgba(255, 59, 48, 0.5)',
  },
  dangerButtonText: {
    color: '#FF3B30',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    color: COLORS.text,
    opacity: 0.7,
  },
  infoValue: {
    color: COLORS.text,
  },
});

export default SettingsScreen;