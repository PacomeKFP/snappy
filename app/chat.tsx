import { View, Text, FlatList } from 'react-native';

const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Salut, comment ça va ?' },
  { id: '2', name: 'Bob', lastMessage: 'Tu es dispo ce soir ?' },
];

export default function ChatScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>{item.lastMessage}</Text>
          </View>
        )}
      />
    </View>
  );
}
