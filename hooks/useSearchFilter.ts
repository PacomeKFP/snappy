import { useMemo } from 'react';

interface SearchableItem {
  displayName?: string;
  email?: string;
  body?: string;
  user?: {
    displayName?: string;
    email?: string;
  };
  lastMessage?: {
    body?: string;
  };
}

interface UseSearchFilterOptions {
  searchFields?: string[]; // Champs spécifiques à rechercher
  caseSensitive?: boolean;
  highlightMatches?: boolean;
}

/**
 * Hook personnalisé pour filtrer et rechercher dans une liste d'éléments
 * @param items - Liste des éléments à filtrer
 * @param searchQuery - Terme de recherche
 * @param options - Options de configuration
 * @returns Liste filtrée et fonctions utilitaires
 */
export function useSearchFilter<T extends SearchableItem>(
  items: T[],
  searchQuery: string,
  options: UseSearchFilterOptions = {}
) {
  const {
    caseSensitive = false,
    highlightMatches = true
  } = options;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();

    return items.filter(item => {
      // Recherche dans le nom d'affichage
      const displayName = caseSensitive 
        ? (item.displayName || item.user?.displayName || '')
        : (item.displayName || item.user?.displayName || '').toLowerCase();

      // Recherche dans l'email
      const email = caseSensitive
        ? (item.email || item.user?.email || '')
        : (item.email || item.user?.email || '').toLowerCase();

      // Recherche dans le corps du message (pour les chats)
      const messageBody = caseSensitive
        ? (item.body || item.lastMessage?.body || '')
        : (item.body || item.lastMessage?.body || '').toLowerCase();

      return displayName.includes(query) || 
             email.includes(query) || 
             messageBody.includes(query);
    });
  }, [items, searchQuery, caseSensitive]);

  /**
   * Surligne les termes de recherche dans un texte
   * @param text - Texte à traiter
   * @param query - Terme de recherche
   * @returns Éléments React avec surlignage
   */
  const highlightText = (text: string, query: string = searchQuery) => {
    if (!query.trim() || !highlightMatches) {
      return text;
    }

    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, caseSensitive ? 'g' : 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, index) => {
        const isMatch = caseSensitive 
          ? part === query 
          : part.toLowerCase() === query.toLowerCase();
        
        return isMatch ? { text: part, highlighted: true, key: index } : { text: part, highlighted: false, key: index };
      });
    } catch (error) {
      console.warn('Erreur lors du surlignage:', error);
      return text;
    }
  };

  /**
   * Obtient des statistiques sur la recherche
   */
  const searchStats = useMemo(() => ({
    totalItems: items.length,
    filteredItems: filteredItems.length,
    hasResults: filteredItems.length > 0,
    isSearching: searchQuery.trim().length > 0,
  }), [items.length, filteredItems.length, searchQuery]);

  return {
    filteredItems,
    highlightText,
    searchStats,
    isSearching: searchStats.isSearching,
    hasResults: searchStats.hasResults,
  };
}

/**
 * Hook spécialisé pour la recherche de chats
 */
export function useChatSearch<T extends SearchableItem>(
  chats: T[],
  searchQuery: string
) {
  return useSearchFilter(chats, searchQuery, {
    caseSensitive: false,
    highlightMatches: true,
  });
}

/**
 * Hook spécialisé pour la recherche de contacts
 */
export function useContactSearch<T extends SearchableItem>(
  contacts: T[],
  searchQuery: string
) {
  return useSearchFilter(contacts, searchQuery, {
    caseSensitive: false,
    highlightMatches: true,
  });
}