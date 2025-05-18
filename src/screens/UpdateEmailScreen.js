import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/database';

const UpdateEmailScreen = ({ navigation }) => {
  const { currentUser, updateEmail, reauthenticate } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async () => {
    // Validation
    if (!currentPassword || !newEmail) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newEmail === currentUser.email) {
      Alert.alert('Error', 'New email is the same as current email');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // First reauthenticate the user
      await reauthenticate(currentPassword);
      
      // Then update the email
      await updateEmail(newEmail);
      
      // Also update the email in the user's profile in Firestore
      await updateUserProfile(currentUser.uid, { email: newEmail });
      
      Alert.alert(
        'Success',
        'Email updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Update email error:', error);
      Alert.alert('Error', error.message || 'Failed to update email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Update Email"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Email</Text>
            <View style={[styles.input, styles.disabledInput]}>
              <Text style={styles.disabledText}>{currentUser.email}</Text>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={newEmail}
              onChangeText={setNewEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <Text style={styles.helperText}>
              We need your password to verify your identity
            </Text>
          </View>
          
          <ActionButton
            title={loading ? "Updating Email..." : "Update Email"}
            onPress={handleUpdateEmail}
            style={styles.updateButton}
            disabled={loading}
          />
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
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: COLORS.text,
  },
  disabledInput: {
    opacity: 0.7,
  },
  disabledText: {
    color: COLORS.text,
  },
  helperText: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 12,
    marginTop: 4,
  },
  updateButton: {
    marginTop: 16,
  },
});

export default UpdateEmailScreen;