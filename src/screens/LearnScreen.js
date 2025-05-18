import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';

const LearnScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Learn About E-Waste</Text>
        </View>
        
        <View style={styles.articleCard}>
          <View style={styles.articleImageContainer}>
            <Text style={styles.articleImagePlaceholder}>🔋</Text>
          </View>
          
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Why Recycle Electronics?</Text>
            <Text style={styles.articleText}>
              Electronic waste contains toxic substances that can harm the environment and health if not properly disposed of. Recycling helps recover valuable materials and reduces the need for mining new resources.
            </Text>
            <ActionButton
              title="Learn More"
              onPress={() => {}}
              style={styles.learnMoreButton}
            />
          </View>
        </View>
        
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Recycling Tips</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>🔋</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Backup Your Data</Text>
              <Text style={styles.tipText}>
                Before recycling devices, make sure to backup and wipe all personal data.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>⚠️</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Handle Batteries Separately</Text>
              <Text style={styles.tipText}>
                Batteries should be removed and recycled separately as they contain hazardous materials.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>📝</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Label Your E-Waste</Text>
              <Text style={styles.tipText}>
                Clearly label the type of electronic waste to help with sorting and proper recycling.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.videosSection}>
          <Text style={styles.sectionTitle}>Informative Videos</Text>
          
          <View style={styles.videoItem}>
            <View style={styles.videoThumbnail}>
              <Text style={styles.playIcon}>▶️</Text>
            </View>
            <Text style={styles.videoTitle}>How Circuit Boards Are Recycled</Text>
          </View>
          
          <View style={styles.videoItem}>
            <View style={styles.videoThumbnail}>
              <Text style={styles.playIcon}>▶️</Text>
            </View>
            <Text style={styles.videoTitle}>The Journey of E-Waste</Text>
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
    paddingBottom: 16,
  },
  headerSection: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  articleCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  articleImageContainer: {
    height: 180,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleImagePlaceholder: {
    fontSize: 64,
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  articleText: {
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  learnMoreButton: {
    alignSelf: 'stretch',
  },
  tipsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  tipText: {
    color: COLORS.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  videosSection: {
    paddingHorizontal: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  videoThumbnail: {
    height: 160,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  playIcon: {
    fontSize: 48,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});

export default LearnScreen;