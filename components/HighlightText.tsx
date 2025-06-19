import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface HighlightTextProps {
  text: string;
  searchQuery: string;
  style?: TextStyle;
  highlightStyle?: TextStyle;
  caseSensitive?: boolean;
  numberOfLines?: number;
}

/**
 * Composant pour surligner les termes de recherche dans un texte
 */
export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  searchQuery,
  style,
  highlightStyle,
  caseSensitive = false,
  numberOfLines,
}) => {
  if (!searchQuery.trim()) {
    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {text}
      </Text>
    );
  }

  try {
    // Échapper les caractères spéciaux pour la regex
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, caseSensitive ? 'g' : 'gi');
    const parts = text.split(regex);

    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {parts.map((part, index) => {
          const isMatch = caseSensitive
            ? regex.test(part)
            : regex.test(part.toLowerCase());

          if (isMatch && part.trim()) {
            return (
              <Text
                key={index}
                style={[styles.highlight, highlightStyle]}
              >
                {part}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  } catch (error) {
    console.warn('Erreur lors du surlignage du texte:', error);
    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {text}
      </Text>
    );
  }
};

/**
 * Hook pour obtenir les parties surlignées d'un texte
 * Utile quand vous voulez plus de contrôle sur le rendu
 */
export const useHighlightParts = (
  text: string,
  searchQuery: string,
  caseSensitive: boolean = false
) => {
  if (!searchQuery.trim()) {
    return [{ text, highlighted: false }];
  }

  try {
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, caseSensitive ? 'g' : 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => ({
      text: part,
      highlighted: regex.test(part) && part.trim().length > 0,
      key: index,
    }));
  } catch (error) {
    console.warn('Erreur lors du traitement du texte:', error);
    return [{ text, highlighted: false }];
  }
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: '#FFE066',
    fontWeight: 'bold',
    borderRadius: 2,
    paddingHorizontal: 1,
  },
});