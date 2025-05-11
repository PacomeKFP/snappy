import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingItemProps {
  icon: IconName;
  title: string;
  value?: boolean;
  onPress: () => void;
  isSwitch?: boolean;
}

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const SettingItem = ({ icon, title, value, onPress, isSwitch = false }: SettingItemProps) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#7B52AB" />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch 
          value={value} 
          onValueChange={onPress}
          trackColor={{ false: '#E0E0E0', true: '#B39DDB' }}
          thumbColor={value ? '#7B52AB' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#B39DDB" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color="#7B52AB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          value={notifications}
          onPress={() => setNotifications(!notifications)}
          isSwitch
        />
        <SettingItem
          icon="moon-outline"
          title="Mode sombre"
          value={darkMode}
          onPress={() => setDarkMode(!darkMode)}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Confidentialité</Text>
        <SettingItem
          icon="checkmark-done-outline"
          title="Confirmation de lecture"
          value={readReceipts}
          onPress={() => setReadReceipts(!readReceipts)}
          isSwitch
        />
        <SettingItem
          icon="radio-outline"
          title="Statut en ligne"
          value={onlineStatus}
          onPress={() => setOnlineStatus(!onlineStatus)}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <SettingItem
          icon="person-outline"
          title="Profil"
          value={false}
          onPress={() => router.push('/profile' as any)}
        />
        <SettingItem
          icon="lock-closed-outline"
          title="Sécurité"
          value={false}
          onPress={() => router.push('/security' as any)}
        />
        <SettingItem
          icon="help-circle-outline"
          title="Aide"
          value={false}
          onPress={() => router.push('/help' as any)}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={()=> router.push("/login")}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 17,
    marginLeft: 12,
    color: '#000',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
