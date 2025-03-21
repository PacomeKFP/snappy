import { View, Text, FlatList, Image } from 'react-native';

const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Salut, comment ça va ?', avatar: require('../assets/images/me.jpeg') },
  { id: '2', name: 'Bob', lastMessage: 'Tu es dispo ce soir ?', avatar: require('../assets/images/me.jpeg') },
];

export default function ChatScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#ddd' }}>
            {/* 🔥 Photo de profil locale */}
            <Image 
              source={item.avatar} 
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} 
            />
            {/* 🔥 Texte du chat */}
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
              <Text style={{ color: 'gray' }}>{item.lastMessage}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
