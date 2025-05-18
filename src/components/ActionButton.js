import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const ActionButton = ({ title, onPress, style, textStyle, primary = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary ? styles.primaryButton : styles.secondaryButton,
        style
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        primary ? styles.primaryText : styles.secondaryText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryText: {
    color: '#FFF',
  },
  secondaryText: {
    color: COLORS.text,
  },
});

export default ActionButton;