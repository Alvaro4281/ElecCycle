import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';

const SupportScreen = ({ navigation }) => {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@eleccycle.com');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://eleccycle.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Help & Support"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I schedule a pickup?</Text>
            <Text style={styles.answer}>
              Go to the Home tab and enter your address in the "Schedule a Pickup" section. Select a date and time that works for you, and our team will come to collect your e-waste.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.question}>How are points calculated?</Text>
            <Text style={styles.answer}>
              Points are calculated based on the type and quantity of electronics you recycle. Larger items like computers earn more points than smaller items like cables.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.question}>Can I recycle damaged devices?</Text>
            <Text style={styles.answer}>
              Yes! Even damaged or non-functional electronics can be recycled. We'll extract the valuable materials and dispose of hazardous components safely.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <ActionButton
            title="Email Support"
            onPress={handleContactSupport}
            style={styles.contactButton}
          />
          
          <ActionButton
            title="Visit Our Website"
            onPress={handleVisitWebsite}
            primary={false}
            style={styles.contactButton}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
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
  faqItem: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  question: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  answer: {
    color: COLORS.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  contactButton: {
    marginBottom: 12,
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

export default SupportScreen;