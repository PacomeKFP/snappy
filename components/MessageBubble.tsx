import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  text: string;
  sender: 'me' | 'other';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  return (
    <View style={[styles.bubble, sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: '#4B0082',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  text: {
    color: 'white',
  },
});

export default MessageBubble;
