import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    Alert.alert(
      'Reset Password',
      'Are you sure you want to reset your password?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          onPress: async () => {
            try {
              await resetPassword(email);
              Alert.alert(
                'Password Reset',
                'Check your email for instructions to reset your password'
              );
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to reset password');
            }
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
            autoCapitalize="none"
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
          
          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
          
          <ActionButton
            title={loading ? "Logging in..." : "Log In"}
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={loading}
          />
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialButtons}>
            <ActionButton
              title="Facebook"
              onPress={() => Alert.alert('Coming Soon', 'Facebook login will be available in a future update.')}
              primary={false}
              style={styles.socialButton}
            />
            <ActionButton
              title="Google"
              onPress={() => Alert.alert('Coming Soon', 'Google login will be available in a future update.')}
              primary={false}
              style={styles.socialButton}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.createAccountContainer}
            onPress={() => navigation.navigate('Register')}
          >
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