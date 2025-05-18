import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upgradeTag}>
        <Text style={styles.upgradeText}>UPGRADE PLAN</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>♻️</Text>
        </View>
        
        <Text style={styles.title}>ElecCycle</Text>
        <Text style={styles.subtitle}>
          Recycle electronics sustainably with ease!
        </Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
          
          <ActionButton
            title="Log In"
            onPress={() => navigation.navigate('Main')}
            style={styles.loginButton}
          />
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialButtons}>
            <ActionButton
              title="Facebook"
              onPress={() => {}}
              primary={false}
              style={styles.socialButton}
            />
            <ActionButton
              title="Google"
              onPress={() => {}}
              primary={false}
              style={styles.socialButton}
            />
          </View>
          
          <TouchableOpacity style={styles.createAccountContainer}>
            <Text style={styles.createAccount}>Create an account</Text>
          </TouchableOpacity>
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
  upgradeTag: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: COLORS.card,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  upgradeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.card,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: COLORS.text,
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.text,
    paddingHorizontal: 16,
    opacity: 0.7,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flex: 0.48,
  },
  createAccountContainer: {
    alignItems: 'center',
  },
  createAccount: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;