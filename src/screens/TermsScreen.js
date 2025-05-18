import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

const TermsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Terms & Privacy"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.paragraph}>
            Welcome to ElecCycle, the platform that helps you recycle electronic waste responsibly. By using our services, you agree to these Terms of Service.
          </Text>
          
          <Text style={styles.heading}>1. User Accounts</Text>
          <Text style={styles.paragraph}>
            You must create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
          </Text>
          
          <Text style={styles.heading}>2. Acceptable Use</Text>
          <Text style={styles.paragraph}>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You will not use our services to submit false information about recycled electronics or to abuse our points system.
          </Text>
          
          <Text style={styles.heading}>3. Recycling Guidelines</Text>
          <Text style={styles.paragraph}>
            You agree to follow our recycling guidelines when disposing of electronic waste. This includes proper packaging, accurate labeling, and ensuring no hazardous materials are improperly handled.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
          </Text>
          
          <Text style={styles.heading}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information you provide when creating an account, such as your name, email address, and location. We also collect data about your recycling activities, including types of devices recycled and materials recovered.
          </Text>
          
          <Text style={styles.heading}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use your information to provide and improve our services, track your recycling impact, award points, and communicate with you about recycling opportunities and program updates.
          </Text>
          
          <Text style={styles.heading}>3. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate security measures to protect your personal information from unauthorized access or disclosure. We use industry-standard encryption and secure data storage practices.
          </Text>
          
          <Text style={styles.heading}>4. Location Data</Text>
          <Text style={styles.paragraph}>
            With your permission, we collect location data to help you find nearby collection points and to optimize pickup routes. You can disable location services in your device settings at any time.
          </Text>
          
          <Text style={styles.heading}>5. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, correct, or delete your personal data. You can manage your data in the app settings or contact our support team for assistance.
          </Text>
        </View>
        
        <Text style={styles.lastUpdated}>Last updated: May 1, 2025</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: COLORS.text,
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 12,
  },
  lastUpdated: {
    color: COLORS.text,
    opacity: 0.6,
    textAlign: 'center',
    padding: 16,
    marginBottom: 24,
  },
});

export default TermsScreen;