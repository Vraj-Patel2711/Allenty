import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

export default function UserProfileScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (

    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <Text style={styles.pageTitle}>Profile & Settings</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Information</Text>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <View>
            <Text style={styles.name}>Akshay Kumar</Text>
            <Text style={styles.role}>Warehouse Manager</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>akshay.kumar@warehouse.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Employee ID</Text>
          <Text style={styles.value}>AK001</Text>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Feather name="bell" size={20} color="#9CA3AF" />
            <View style={{marginLeft: 10}}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingSub}>Receive alerts</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#767577", true: "#2563EB" }}
          />
        </View>

        <View style={styles.settingRow}>
           <View style={styles.settingInfo}>
            <Feather name="moon" size={20} color="#9CA3AF" />
            <View style={{marginLeft: 10}}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingSub}>Toggle theme</Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: "#2563EB" }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="#EF4444" style={{marginRight: 10}} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginTop: 40, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 15, marginBottom: 15 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  role: { color: '#2563EB', fontWeight: '600' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  label: { color: '#6B7280', fontWeight: '500' },
  value: { color: '#111827', fontWeight: '600' },
  editBtn: { backgroundColor: '#F3F4F6', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  editBtnText: { color: '#111827', fontWeight: 'bold' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  settingSub: { fontSize: 12, color: '#9CA3AF' },
  
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 15, 
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    marginTop: 10
  },
  logoutText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 }
});