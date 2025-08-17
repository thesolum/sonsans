import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Recipe, RootStackParamList } from '../types/navigation';
import { useSearchRecipes, useRecipesByCategory } from '../services/hooks/useRecipes';
import { useToggleFavorite, useIsFavorite } from '../services/hooks/useFavorites';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[4]}px;
`;

const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing[3]}px ${({ theme }) => theme.spacing[4]}px;
  border: 2px solid transparent;
`;

const SearchIcon = styled(Ionicons)`
  margin-right: ${({ theme }) => theme.spacing[2]}px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing[3]}px;
  padding: ${({ theme }) => theme.spacing[3]}px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  padding: 0 ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[4]}px;
  flex-wrap: wrap;
`;

const FilterChip = styled.TouchableOpacity<{ active?: boolean }>`
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary[500] : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing[2]}px ${({ theme }) => theme.spacing[4]}px;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const FilterChipText = styled.Text<{ active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme, active }) => 
    active ? theme.colors.text.inverse : theme.colors.text.secondary};
`;

const ResultsContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing[6]}px;
`;

const ResultsHeader = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const RecipeCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  ${({ theme }) => theme.shadows.sm};
  flex-direction: row;
  overflow: hidden;
`;

const RecipeImage = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;

const RecipeContent = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]}px;
  justify-content: center;
`;

const RecipeTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.base}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const RecipeDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const MetaText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]}px;
`;

const categories = ['All', 'Italian', 'Mexican', 'Asian', 'Vegetarian', 'Dessert', 'Healthy'];

// Recipe card component with favorite functionality
function SearchRecipeCard({ item }: { item: Recipe }) {
  const { data: isFavorite = false } = useIsFavorite(item.id);
  const toggleFavorite = useToggleFavorite();

  const handleFavoritePress = () => {
    toggleFavorite.mutate(item);
  };

  return (
    <RecipeCard>
      <RecipeImage>
        <ImagePlaceholder>Recipe{'\n'}Image</ImagePlaceholder>
      </RecipeImage>
      <RecipeContent>
        <RecipeTitle>{item.title}</RecipeTitle>
        <RecipeDescription>{item.description}</RecipeDescription>
        <MetaText>{item.cookingTime} min • {item.difficulty}</MetaText>
      </RecipeContent>
      <SaveButton onPress={handleFavoritePress} disabled={toggleFavorite.isPending}>
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={20} 
          color={isFavorite ? "#F97316" : "#A1A1AA"} 
        />
      </SaveButton>
    </RecipeCard>
  );
}

const SaveButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]}px;
  right: ${({ theme }) => theme.spacing[3]}px;
  padding: ${({ theme }) => theme.spacing[1]}px;
`;

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Use search hook when there's a search query
  const { 
    data: searchResults = [], 
    isLoading: isSearching,
    error: searchError 
  } = useSearchRecipes(searchQuery, { 
    category: activeFilter !== 'All' ? activeFilter : undefined 
  });

  // Use category hook when there's no search query but a filter is active
  const { 
    data: categoryResults = [], 
    isLoading: isLoadingCategory,
    error: categoryError 
  } = useRecipesByCategory(activeFilter);

  // Determine what data to show
  const displayedRecipes = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    } else if (activeFilter !== 'All') {
      return categoryResults;
    }
    return [];
  }, [searchQuery, searchResults, activeFilter, categoryResults]);

  const isLoading = isSearching || isLoadingCategory;
  const hasError = searchError || categoryError;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterPress = (category: string) => {
    setActiveFilter(category);
    // Clear search when switching categories
    if (category !== 'All' && searchQuery) {
      setSearchQuery('');
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <SearchRecipeCard item={item} />
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInputContainer>
          <SearchIcon
            name="search"
            size={20}
            color="#71717A"
          />
          <SearchInput
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FilterButton onPress={() => navigation.navigate('Filter')}>
            <Ionicons name="options" size={20} color="white" />
          </FilterButton>
        </SearchInputContainer>
      </SearchContainer>

      <FilterContainer>
        {categories.map((category) => (
          <FilterChip
            key={category}
            active={activeFilter === category}
            onPress={() => handleFilterPress(category)}
          >
            <FilterChipText active={activeFilter === category}>
              {category}
            </FilterChipText>
          </FilterChip>
        ))}
      </FilterContainer>

      <ResultsContainer>
        {(searchQuery.trim() || activeFilter !== 'All') && (
          <ResultsHeader>
            {isLoading 
              ? 'Searching...' 
              : searchQuery.trim() 
                ? `${displayedRecipes.length} results for "${searchQuery}"`
                : `${displayedRecipes.length} ${activeFilter} recipes`
            }
          </ResultsHeader>
        )}
        
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#F97316" />
          </LoadingContainer>
        ) : hasError ? (
          <EmptyState>
            <EmptyStateText>Something went wrong. Please try again.</EmptyStateText>
          </EmptyState>
        ) : displayedRecipes.length > 0 ? (
          <FlatList
            data={displayedRecipes}
            renderItem={renderRecipeCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (searchQuery.trim() || activeFilter !== 'All') ? (
          <EmptyState>
            <EmptyStateText>
              {searchQuery.trim() 
                ? `No recipes found for "${searchQuery}"`
                : `No ${activeFilter} recipes found`
              }
            </EmptyStateText>
          </EmptyState>
        ) : (
          <EmptyState>
            <EmptyStateText>Search for your favorite recipes above</EmptyStateText>
          </EmptyState>
        )}
      </ResultsContainer>
    </Container>
  );
}