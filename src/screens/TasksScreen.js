import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';

const TasksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.recyclingIconContainer}>
            <Text style={styles.recyclingIcon}>♻️</Text>
          </View>
          <Text style={styles.headerTitle}>Recycling</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.todaySection}>
          <Text style={styles.todayTitle}>Today's</Text>
        </View>
        
        <View style={styles.taskSection}>
          <View style={styles.taskHeader}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.taskHeaderText}>Find Collection Points</Text>
          </View>
          
          <View style={styles.taskCard}>
            <View style={styles.taskCardHeader}>
              <Text style={styles.taskCardTitle}>Find Collection Points</Text>
              <Text style={styles.locationIcon}>📍</Text>
            </View>
            
            <Text style={styles.taskDescription}>
              Locate nearby e-waste collection points for recycling.
            </Text>
            
            <View style={styles.componentTypeSection}>
              <View style={styles.componentTypeLeft}>
                <Text style={styles.searchIcon}>🔍</Text>
                <Text style={styles.componentTypeText}>Component Type</Text>
              </View>
              <TouchableOpacity style={styles.viewReportButton}>
                <Text style={styles.viewReportText}>View Report</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.componentRow}>
              <Text style={styles.listIcon}>≡</Text>
              <Text style={styles.componentText}>Component</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>High Priority</Text>
              </View>
            </View>
            
            <View style={styles.componentRow}>
              <Text style={styles.circleIcon}>⭕</Text>
              <Text style={styles.componentText}>Component</Text>
              <TouchableOpacity style={styles.clearListButton}>
                <Text style={styles.clearListText}>Clear List</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.attachmentsTitle}>Component Attachments</Text>
            
            <View style={styles.attachmentRow}>
              <Text style={styles.fileIcon}>📄</Text>
              <Text style={styles.attachmentText}>Electronic Waste Inventory</Text>
            </View>
            
            <View style={styles.attachmentRow}>
              <Text style={styles.fileIcon}>📄</Text>
              <Text style={styles.attachmentText}>Component</Text>
            </View>
            
            <ActionButton
              title="Complete Disassembly Task"
              onPress={() => {}}
              style={styles.completeButton}
            />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recyclingIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recyclingIcon: {
    fontSize: 24,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    fontSize: 24,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  todaySection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  todayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  taskSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 18,
    marginRight: 8,
  },
  taskHeaderText: {
    color: COLORS.text,
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskCardTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationIcon: {
    fontSize: 20,
  },
  taskDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  componentTypeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  componentTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  componentTypeText: {
    color: '#333',
    fontSize: 14,
  },
  viewReportButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  viewReportText: {
    color: '#333',
    fontSize: 12,
  },
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#333',
  },
  circleIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#333',
  },
  componentText: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  priorityBadge: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  priorityText: {
    color: '#333',
    fontSize: 12,
  },
  clearListButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  clearListText: {
    color: '#333',
    fontSize: 12,
  },
  attachmentsTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  attachmentText: {
    color: '#333',
    fontSize: 14,
  },
  completeButton: {
    marginTop: 16,
  },
});

export default TasksScreen;