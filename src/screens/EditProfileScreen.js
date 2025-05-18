import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/database';

const EditProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const profile = await getUserProfile(currentUser.uid);
          if (profile) {
            setName(profile.name || '');
            setPhone(profile.phone || '');
            setAddress(profile.address || '');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(currentUser.uid, {
        name,
        phone,
        address,
      });
      
      Alert.alert(
        'Success',
        'Profile updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Edit Profile"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[styles.input, styles.disabledInput]}>
              <Text style={styles.disabledText}>{currentUser.email}</Text>
            </View>
            <Text style={styles.helperText}>Email cannot be changed here</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address (optional)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Your address for pickups"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>
          
          <ActionButton
            title={saving ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            style={styles.saveButton}
            disabled={saving}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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
  saveButton: {
    marginTop: 16,
  },
});

export default EditProfileScreen;