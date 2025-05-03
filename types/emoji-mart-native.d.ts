// src/types/emoji-mart-native.d.ts
declare module 'emoji-mart-native' {
    export interface EmojiData {
      native: string;
      short_names: string[];
    }
  
    export class Picker extends React.Component<{ onEmojiSelect: (emoji: EmojiData) => void; theme: string }> {}
  
    export default {
      Picker,
      EmojiData,
    };
  }
  