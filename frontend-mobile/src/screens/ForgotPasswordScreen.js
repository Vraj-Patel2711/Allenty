import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    Alert.alert('Sent', `Reset instructions sent to ${email}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="arrow-left" size={20} color="#6B7280" />
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>No worries! Enter your email and we'll send you reset instructions.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <Feather name="mail" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="your.email@company.com" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Reset Instructions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, justifyContent: 'center' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  backText: { marginLeft: 10, color: '#6B7280', fontWeight: '600' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6B7280', lineHeight: 24, marginBottom: 40 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10 },
  icon: { marginLeft: 10 },
  input: { flex: 1, padding: 12, color: '#111' },
  button: { backgroundColor: '#2563EB', padding: 15, borderRadius: 10, alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 4 } },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});