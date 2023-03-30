import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Fuse from 'fuse.js';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IconRotate2, IconSearch, IconStar, IconX } from '@tabler/icons-react';

import { getItem } from '@/utils/storage';
import useSearchHistory from '@/stores/searchHistory';

import { DialogContent, DialogOverlay } from '../kit/Dialog/Dialog.style';
import { Box, Icon, Text } from '../kit';
import IconButton from '../kit/IconButton';

import {
  ResultItem,
  SearchInput,
  SearchInputContainer,
} from './SearchWithHotKey.style';
import { IHotkeySearchItemProps } from './SearchWithHotKey.d';

const searchData: IHotkeySearchItemProps[] = [
  {
    title: 'Home page',
    content: 'get started with the documentation',
    url: '/',
  },
  {
    title: 'Projects page',
    content: 'Projects page information',
    url: '/projects',
  },
];

const options = {
  keys: ['title', 'content'],
  includeMatches: true,
  includeScore: true,
  shouldSort: true,
  threshold: 0.5,
};
const fuse = new Fuse(searchData, options);

function SearchWithHotkey() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const addRecentSearch = useSearchHistory((state) => state.addRecentSearch);
  const removeRecentSearch = useSearchHistory(
    (state) => state.removeRecentSearch,
  );
  const addFavorite = useSearchHistory((state) => state.addFavorite);
  const removeFavorite = useSearchHistory((state) => state.removeFavorite);
  const searchHistory = useSearchHistory((state) => state.searchHistory);
  const setSearchHistory = useSearchHistory((state) => state.setSearchHistory);

  function onSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  React.useEffect(() => {
    const searchHistory = JSON.parse(getItem('searchHistory') || '[]');
    if (searchHistory) {
      setSearchHistory(searchHistory);
    }
  }, []);

  function highlightText(text: string, indices: any) {
    let lastIndex = 0;
    const highlightSpans = [];
    if (!indices?.length) return text;
    for (const [startIndex, endIndex] of indices) {
      // Add non-matching text between the last match and this match
      if (startIndex > lastIndex) {
        const nonMatchText = text.substring(lastIndex, startIndex);
        highlightSpans.push(<span key={lastIndex}>{nonMatchText}</span>);
      }
      // Add matching text with highlighting
      const matchText = text.substring(startIndex, endIndex + 1);
      highlightSpans.push(
        <Text as='span' size='inherit' key={startIndex} color='$primary100'>
          {matchText}
        </Text>,
      );
      lastIndex = endIndex + 1;
    }
    // Add any remaining non-matching text
    if (lastIndex < text.length) {
      const nonMatchText = text.substring(lastIndex);
      highlightSpans.push(<span key={lastIndex}>{nonMatchText}</span>);
    }
    return highlightSpans;
  }

  const results = fuse.search(searchTerm);

  function onSearchItemClick(item: IHotkeySearchItemProps) {
    setIsOpen(false);
    setSearchTerm('');
    addRecentSearch(item);
  }
  useHotkeys('ctrl+k', () => setIsOpen(true));
  return (
    <DialogPrimitive.Root
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
    >
      <DialogPrimitive.Trigger asChild>
        <Box
          css={{
            bc: '$secondary20',
            width: 'fit-content',
            br: '$3',
            p: '$2 $5',
            cursor: 'pointer',
            display: 'flex',
            ai: 'center',
          }}
        >
          <IconSearch size={16} />
          <Box ml='$5' display='flex'>
            <Text>Search ctrl + k</Text>
          </Box>
        </Box>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogContent css={{ maxWidth: '920px', p: '$15' }}>
          <SearchInputContainer>
            <IconSearch />
            <SearchInput
              placeholder='Search...'
              value={searchTerm}
              onChange={onSearchTermChange}
            />
          </SearchInputContainer>
          <Box mt='$10'>
            {results.map((result: any) => {
              const { matches } = result;
              const indices: any = {
                title: [],
                content: [],
              };
              matches.forEach((match: any) => {
                indices[match.key] = match.indices;
              });
              return (
                <ResultItem
                  onClick={() => {
                    onSearchItemClick(result.item);
                  }}
                  key={result.item.title}
                  href={result.item.url}
                >
                  <Text as='p' size='$4' css={{ mb: '$5' }}>
                    {highlightText(result.item.title, indices.title)}
                  </Text>
                  <Text size='$3' as='p'>
                    {highlightText(result.item.content, indices.content)}
                  </Text>
                </ResultItem>
              );
            })}
          </Box>
          {searchHistory.recentSearches.length ? (
            <Box mt='$10'>
              <Text
                as='h3'
                size='$4'
                color='$textPrimary80'
                css={{ mb: '$10' }}
              >
                Recent
              </Text>
              <Box>
                {searchHistory.recentSearches?.map((item) => {
                  return (
                    <ResultItem href={item.url} key={item.url}>
                      <Box display='flex' ai='center'>
                        <Icon
                          size='lg'
                          css={{ mr: '$5' }}
                          color='inherit'
                          icon={<IconRotate2 />}
                        />
                        <Text
                          color='inherit'
                          as='p'
                          size='$4'
                          css={{ flex: '1 100%' }}
                        >
                          {item.title}
                        </Text>
                        <Box display='flex'>
                          <IconButton
                            variant='text'
                            color='secondary'
                            css={{ mr: '$5' }}
                            icon={<IconStar />}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addFavorite(item);
                            }}
                          />
                          <IconButton
                            variant='text'
                            color='secondary'
                            icon={<IconX />}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeRecentSearch(item);
                            }}
                          />
                        </Box>
                      </Box>
                    </ResultItem>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          {searchHistory.favorites.length ? (
            <Box mt='$10'>
              <Text
                as='h3'
                size='$4'
                color='$textPrimary80'
                css={{ mb: '$10' }}
              >
                Favorites
              </Text>
              <Box>
                {searchHistory.favorites?.map((item) => {
                  return (
                    <ResultItem href={item.url} key={item.url}>
                      <Box display='flex' ai='center'>
                        <Icon
                          size='lg'
                          css={{ mr: '$5' }}
                          color='inherit'
                          icon={<IconStar />}
                        />
                        <Text
                          color='inherit'
                          as='p'
                          size='$4'
                          css={{ flex: '1 100%' }}
                        >
                          {item.title}
                        </Text>
                        <IconButton
                          variant='text'
                          color='secondary'
                          icon={<IconX />}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFavorite(item);
                          }}
                        />
                      </Box>
                    </ResultItem>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          <DialogPrimitive.Close asChild>
            <IconButton
              size='xs'
              variant='text'
              color='secondary'
              css={{ position: 'absolute', top: 8, right: 8 }}
              icon={<Icon color='secondary' icon={<IconX />} />}
            />
          </DialogPrimitive.Close>
        </DialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default SearchWithHotkey;
