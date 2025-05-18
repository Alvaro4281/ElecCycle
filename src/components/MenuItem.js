import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const MenuItem = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
    color: COLORS.text,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default MenuItem;