import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type State = 'Off' | 'Listen' | 'On';

interface Props {
  onStateChange?: (state: State) => void;
}

const TripleStateButton: React.FC<Props> = ({ onStateChange }) => {
  const states: State[] = ['Off', 'Listen', 'On'];
  const [stateIndex, setStateIndex] = useState(0);

  const handlePress = () => {
    const nextIndex = (stateIndex + 1) % states.length;
    setStateIndex(nextIndex);
    if (onStateChange) {
      onStateChange(states[nextIndex]);
    }
  };

  const currentState = states[stateIndex];

  const getStyle = () => {
    switch (currentState) {
      case 'Off':
        return { backgroundColor: '#ccc', icon: 'power-outline' };
      case 'Listen':
        return { backgroundColor: '#ffcc00', icon: 'volume-medium-outline' };
      case 'On':
        return { backgroundColor: '#00cc66', icon: 'mic-outline' };
      default:
        return { backgroundColor: '#ccc', icon: 'help' };
    }
  };

  const { backgroundColor, icon } = getStyle();

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, { backgroundColor }]}
    >
      <Ionicons name={icon as any} size={20} color="#fff" style={{ marginRight: 8 }} />
      <Text style={styles.text}>{currentState}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TripleStateButton;
