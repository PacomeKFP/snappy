declare module 'react-native-emoji-board' {
  import { Component } from 'react';

  interface EmojiBoardProps {
    onEmojiSelected: (emoji: string) => void;
    showSearchBar?: boolean;
    showHistory?: boolean;
    showTabs?: boolean;
    showSectionTitles?: boolean;
    category?: string[];
  }

  export default class EmojiBoard extends Component<EmojiBoardProps> {}
} 