import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/theme';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DisassemblyScreen from '../screens/DisassemblyScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';
import LearnScreen from '../screens/LearnScreen';
//import MapScreen from '../screens/MapScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
import DeviceDetailScreen from '../screens/DeviceDetailScreen';
import RecyclingHistoryScreen from '../screens/RecyclingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SupportScreen from '../screens/SupportScreen';
import TermsScreen from '../screens/TermsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import UpdateEmailScreen from '../screens/UpdateEmailScreen';
import CollectionPointsScreen from '../screens/CollectionPointsScreen';

// Auth Provider
import { AuthProvider } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab bar icons
const TabIcon = ({ name, focused }) => {
  let icon;
  
  switch (name) {
    case 'Home':
      icon = '🏠';
      break;
    case 'Disassembly':
      icon = '🔧';
      break;
    case 'Tasks':
      icon = '⏱️';
      break;
    case 'Stats':
      icon = '📊';
      break;
    case 'Learn':
      icon = '📚';
      break;
    default:
      icon = '🏠';
  }
  
  return (
    <Text style={{ 
      fontSize: 20,
      color: focused ? COLORS.primary : COLORS.text
    }}>
      {icon}
    </Text>
  );
};

// Tab Navigator for main app
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Disassembly" component={DisassemblyScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
    </Tab.Navigator>
  );
};

// Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background }
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={MainTabs} />
      
      {/* Profile and Settings */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="RecyclingHistory" component={RecyclingHistoryScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="UpdateEmail" component={UpdateEmailScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      
      {/* Recycling Process */}
      <Stack.Screen name="CollectionPoints" component={CollectionPointsScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="ManualEntry" component={ManualEntryScreen} />
      <Stack.Screen name="DeviceDetail" component={DeviceDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;