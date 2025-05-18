import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/theme';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DisassemblyScreen from '../screens/DisassemblyScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';
import LearnScreen from '../screens/LearnScreen';

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

// Main Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;