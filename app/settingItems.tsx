import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemeText } from '@/components/ThemeText';

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingItemProps {
  icon: IconName;
  title: string;
  value?: boolean;
  onPress: () => void;
  isSwitch?: boolean;
}

export default function ContactSettings() {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams<{ name: string; avatar: string }>();
  
  const [notifications, setNotifications] = useState(true);
  const [blockContact, setBlockContact] = useState(false);
  const [favoriteContact, setFavoriteContact] = useState(false);
  const [muteChat, setMuteChat] = useState(false);

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

  const handleDeleteConversation = () => {
    // Afficher une confirmation avant de supprimer
    alert("Êtes-vous sûr de vouloir supprimer cette conversation ?");
    // Logique pour supprimer la conversation
    router.push('/home');
  };

  const handleBlockContact = () => {
    setBlockContact(!blockContact);
    if (!blockContact) {
      alert(`${name} a été bloqué`);
    } else {
      alert(`${name} a été débloqué`);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#7B52AB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres du contact</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.contactName}>{name}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/ChatItems")}>
            <Ionicons name="chatbubble" size={24} color="#7B52AB" />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          icon="notifications-outline"
          title="Notifications personnalisées"
          value={notifications}
          onPress={() => setNotifications(!notifications)}
          isSwitch
        />
        <SettingItem
          icon="volume-mute-outline"
          title="Mettre en sourdine"
          value={muteChat}
          onPress={() => setMuteChat(!muteChat)}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres de la discussion</Text>
        <SettingItem
          icon="star-outline"
          title="Ajouter aux favoris"
          value={favoriteContact}
          onPress={() => setFavoriteContact(!favoriteContact)}
          isSwitch
        />
        <SettingItem
          icon="image-outline"
          title="Médias partagés"
          onPress={() => router.push(`/shared-media/${name}` as any)}
        />
        <SettingItem
          icon="link-outline"
          title="Liens partagés"
          onPress={() => router.push(`/shared-links/${name}` as any)}
        />
        <SettingItem
          icon="search-outline"
          title="Rechercher dans la conversation"
          onPress={() => router.push("/newchat")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Confidentialité</Text>
        <SettingItem
          icon="lock-closed-outline"
          title="Chiffrement"
          onPress={() => alert("Les messages sont chiffrés de bout en bout")}
        />
        <SettingItem
          icon="time-outline"
          title="Messages éphémères"
          onPress={() => router.push(`/ephemeral-messages/${name}` as any)}
        />
      </View>

      <View style={styles.dangerSection}>
        <SettingItem
          icon="ban-outline"
          title={blockContact ? "Débloquer le contact" : "Bloquer le contact"}
          value={blockContact}
          onPress={handleBlockContact}
          isSwitch
        />
        <SettingItem
          icon="alert-circle-outline"
          title="Signaler le contact"
          onPress={() => alert("Signaler un problème")}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteConversation}>
          <Text style={styles.deleteText}>Supprimer la conversation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  contactName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    width: '80%',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    color: '#7B52AB',
    fontSize: 12,
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
  dangerSection: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});