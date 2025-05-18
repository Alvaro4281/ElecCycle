import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import MenuItem from '../components/MenuItem';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/database';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userProfile = await getUserProfile(currentUser.uid);
          setProfile(userProfile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Profile"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>
            Please log in to view your profile
          </Text>
          <ActionButton
            title="Log In"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : '👤'}
            </Text>
          </View>
          
          <Text style={styles.profileName}>
            {profile?.name || currentUser.email || 'ElecCycle User'}
          </Text>
          
          <View style={styles.verificationContainer}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.verificationText}>Verified Recycler</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.recycledDevices || 0}</Text>
            <Text style={styles.statLabel}>Devices</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.totalPoints || 0}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.co2Saved ? profile.co2Saved.toFixed(1) : '0'}</Text>
            <Text style={styles.statLabel}>kg CO₂ Saved</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <MenuItem
            icon="👤"
            label="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          
          <MenuItem
            icon="🏆"
            label="Achievements"
            onPress={() => navigation.navigate('Achievements')}
          />
          
          <MenuItem
            icon="📜"
            label="Recycling History"
            onPress={() => navigation.navigate('RecyclingHistory')}
          />
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>App</Text>
          
          <MenuItem
            icon="⚙️"
            label="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          
          <MenuItem
            icon="❓"
            label="Help & Support"
            onPress={() => navigation.navigate('Support')}
          />
          
          <MenuItem
            icon="📝"
            label="Terms & Privacy"
            onPress={() => navigation.navigate('Terms')}
          />
        </View>
        
        <ActionButton
          title="Log Out"
          onPress={handleLogout}
          primary={false}
          style={styles.logoutButton}
        />
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
  notLoggedInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  notLoggedInText: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    width: 200,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 14,
    marginRight: 4,
  },
  verificationText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    margin: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  menuSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    marginLeft: 8,
  },
  logoutButton: {
    margin: 16,
    marginBottom: 32,
  },
});

export default ProfileScreen;