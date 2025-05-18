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

const achievements = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Recycle your first electronic device',
    icon: '🥉',
    completed: true,
  },
  {
    id: '2',
    title: 'Novice Recycler',
    description: 'Recycle 5 devices',
    icon: '🥈',
    completed: true,
  },
  {
    id: '3',
    title: 'Recycling Enthusiast',
    description: 'Recycle 10 devices',
    icon: '🥇',
    completed: true,
  },
  {
    id: '4',
    title: 'E-Waste Warrior',
    description: 'Recycle 25 devices',
    icon: '🏆',
    completed: false,
    progress: 48, // Percent
  },
  {
    id: '5',
    title: 'Gold Digger',
    description: 'Recover a total of 1g of gold',
    icon: '⭐',
    completed: false,
    progress: 20,
  },
  {
    id: '6',
    title: 'Copper King',
    description: 'Recover a total of 500g of copper',
    icon: '👑',
    completed: false,
    progress: 25,
  },
  {
    id: '7',
    title: 'Carbon Saver',
    description: 'Save 10kg of CO2 emissions',
    icon: '🌱',
    completed: false,
    progress: 58,
  },
  {
    id: '8',
    title: 'Collection Explorer',
    description: 'Visit 5 different collection points',
    icon: '🔍',
    completed: false,
    progress: 40,
  },
];

const AchievementsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Achievements"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              achievement.completed ? styles.completedCard : {}
            ]}
          >
            <View style={styles.achievementIcon}>
              <Text style={styles.iconText}>{achievement.icon}</Text>
            </View>
            
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              
              {achievement.completed ? (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              ) : (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${achievement.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{achievement.progress}%</Text>
                </View>
              )}
            </View>
          </View>
        ))}
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
  scrollContent: {
    padding: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
  },
  completedCard: {
    borderLeftColor: COLORS.primary,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
    marginBottom: 8,
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    color: COLORS.text,
    fontSize: 12,
    opacity: 0.7,
  },
});

export default AchievementsScreen;