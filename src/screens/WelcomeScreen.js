import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upgradeTag}>
        <Text style={styles.upgradeText}>UPGRADE PLAN</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>ElecCycle</Text>
        <Text style={styles.subtitle}>
          Find collection points and track your contribution
        </Text>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>♻️</Text>
        </View>
        
        <ActionButton
          title="Explore"
          onPress={() => navigation.navigate('Main')}
          style={styles.exploreButton}
        />
        
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  upgradeTag: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: COLORS.card,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  upgradeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 160,
    height: 160,
    backgroundColor: COLORS.card,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  logoIcon: {
    fontSize: 80,
  },
  exploreButton: {
    width: 240,
    marginBottom: 24,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.text,
    opacity: 0.7,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;