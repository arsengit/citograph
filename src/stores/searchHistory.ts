import { create } from 'zustand';

import { setItem } from '@/utils/storage';
import { IHotkeySearchItemProps } from '@/components/SearchWithHotkey/SearchWithHotKey.d';

interface ISearchHistoryStore {
  searchHistory: {
    recentSearches: IHotkeySearchItemProps[];
    favorites: IHotkeySearchItemProps[];
  };
  addRecentSearch: (item: IHotkeySearchItemProps) => void;
  removeRecentSearch: (item: IHotkeySearchItemProps) => void;
  addFavorite: (item: IHotkeySearchItemProps) => void;
  removeFavorite: (item: IHotkeySearchItemProps) => void;
  setSearchHistory: (searchHistory: {
    recentSearches: IHotkeySearchItemProps[];
    favorites: IHotkeySearchItemProps[];
  }) => void;
}

const useSearchHistory = create<ISearchHistoryStore>((set, get) => ({
  searchHistory: {
    recentSearches: [],
    favorites: [],
  },
  setSearchHistory: (searchHistory) => {
    set({ searchHistory });
    setItem('searchHistory', JSON.stringify(searchHistory));
  },
  addRecentSearch: (searchItem: IHotkeySearchItemProps) => {
    const recentSearches = get().searchHistory.recentSearches || [];
    // if the search is already in the list of the favorites return
    const isFavorite = recentSearches.find(
      (item) => item.url === searchItem.url && item.favorite,
    );
    if (isFavorite) {
      return;
    }
    // if the search is already in the list move it to the top
    const isExist = recentSearches.find((item) => item.url === searchItem.url);
    if (isExist) {
      const newRecentSearches = recentSearches.filter(
        (item) => item.url !== searchItem.url,
      );
      const searchHistory = {
        ...get().searchHistory,
        recentSearches: [searchItem, ...newRecentSearches],
      };
      set({ searchHistory });
      setItem('searchHistory', JSON.stringify(searchHistory));
      return;
    }
    // The recent searches list should not be more then 4 items
    if (recentSearches.length >= 4) {
      recentSearches.pop();
    }
    const newRecentSearches = [searchItem, ...recentSearches];
    const searchHistory = {
      ...get().searchHistory,
      recentSearches: newRecentSearches,
    };
    set({ searchHistory });
    setItem('searchHistory', JSON.stringify(searchHistory));
  },
  removeRecentSearch: (searchItem: IHotkeySearchItemProps) => {
    const recentSearches = get().searchHistory.recentSearches || [];
    const newRecentSearches = recentSearches.filter(
      (item) => item.url !== searchItem.url,
    );
    const searchHistory = {
      ...get().searchHistory,
      recentSearches: newRecentSearches,
    };
    set({ searchHistory });
    setItem('searchHistory', JSON.stringify(searchHistory));
  },
  addFavorite: (searchItem: IHotkeySearchItemProps) => {
    const favorites = get().searchHistory.favorites || [];
    const newFavorites = [searchItem, ...favorites];
    let recentSearches = get().searchHistory.recentSearches;
    // if the search is already in the list of the recent searches remove it
    const isExist = recentSearches.find((item) => item.url === searchItem.url);
    if (isExist) {
      recentSearches = recentSearches.filter(
        (item) => item.url !== searchItem.url,
      );
    }
    const searchHistory = {
      recentSearches,
      favorites: newFavorites,
    };
    set({ searchHistory });
    setItem('searchHistory', JSON.stringify(searchHistory));
  },
  removeFavorite: (searchItem: IHotkeySearchItemProps) => {
    const favorites = get().searchHistory.favorites || [];
    const newFavorites = favorites.filter(
      (item) => item.url !== searchItem.url,
    );
    const searchHistory = {
      ...get().searchHistory,
      favorites: newFavorites,
    };
    set({ searchHistory });
    setItem('searchHistory', JSON.stringify(searchHistory));
  },
}));

export default useSearchHistory;
