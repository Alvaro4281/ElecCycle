import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const Header = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  return (
    <View style={styles.header}>
      {leftIcon ? (
        <TouchableOpacity style={styles.iconButton} onPress={onLeftPress}>
          <Text style={styles.icon}>{leftIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      {rightIcon ? (
        <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
          <Text style={styles.icon}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlaceholder: {
    width: 40,
  },
  icon: {
    fontSize: 24,
    color: COLORS.text,
  },
});

export default Header;