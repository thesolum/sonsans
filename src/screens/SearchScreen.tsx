import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';
import { useSearchRecipes, useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, RecipeFilters } from '../types/recipe';
import { RootStackParamList } from '../types/navigation';
import { useFavorites } from '../contexts/FavoritesContext';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background.primary};
`;

const Header = styled.View`
  padding: ${(props) => props.theme.spacing['2xl']}px ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing['4xl']}px;
  background-color: ${(props) => props.theme.colors.background.secondary};
`;

const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h1.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h1.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 48px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.md}px ${(props) => props.theme.spacing.lg}px;
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-right: ${(props) => props.theme.spacing.md}px;
`;

const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  height: 48px;
  width: 48px;
  background-color: ${(props) => 
    props.active 
      ? props.theme.colors.primary[500] 
      : props.theme.colors.background.primary
  };
  border: 1px solid ${(props) => 
    props.active 
      ? props.theme.colors.primary[500] 
      : props.theme.colors.border.primary
  };
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.elevation.sm};
`;

const FilterButtonText = styled.Text<{ active: boolean }>`
  color: ${(props) => 
    props.active 
      ? props.theme.colors.text.inverse 
      : props.theme.colors.text.secondary
  };
  font-size: 18px;
`;

const Content = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const FilterChipsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.spacing['2xl']}px;
`;

const FilterChip = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) => 
    props.selected 
      ? props.theme.colors.primary[500] 
      : props.theme.colors.background.tertiary
  };
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  padding: ${(props) => props.theme.spacing.sm}px ${(props) => props.theme.spacing.lg}px;
  margin-right: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const FilterChipText = styled.Text<{ selected: boolean }>`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => 
    props.selected 
      ? props.theme.colors.text.inverse 
      : props.theme.colors.text.secondary
  };
`;

const ResultsContainer = styled.View`
  flex: 1;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing['4xl']}px;
`;

const EmptyStateIcon = styled.Text`
  font-size: 64px;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const EmptyStateTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.text.tertiary};
  text-align: center;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing['4xl']}px;
`;

const FooterLoadingContainer = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  align-items: center;
`;

const filterCategories = [
  'Italian',
  'Asian', 
  'Mexican',
  'Healthy',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Quick & Easy',
  'Dessert'
];

export const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { toggleFavorite } = useFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create filters object
  const filters: RecipeFilters = useMemo(() => ({
    category: selectedFilters.length > 0 ? selectedFilters : undefined,
  }), [selectedFilters]);

  // Use search query if available, otherwise use filtered recipes
  const searchResults = useSearchRecipes(debouncedQuery, 10);
  const filteredResults = useRecipes(filters, 10);

  // Determine which results to use
  const activeResults = debouncedQuery.length > 0 ? searchResults : filteredResults;
  const recipes = activeResults.data?.pages.flatMap(page => page.recipes) ?? [];

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.id });
  };

  const handleFavoritePress = async (recipe: Recipe) => {
    try {
      await toggleFavorite(recipe.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleLoadMore = () => {
    if (activeResults.hasNextPage && !activeResults.isFetchingNextPage) {
      activeResults.fetchNextPage();
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <RecipeCard
      recipe={item}
      onPress={handleRecipePress}
      onFavoritePress={handleFavoritePress}
    />
  );

  const renderFooter = () => {
    if (activeResults.isFetchingNextPage) {
      return (
        <FooterLoadingContainer>
          <ActivityIndicator size="small" color={theme.colors.primary[500]} />
        </FooterLoadingContainer>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (activeResults.isLoading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        </LoadingContainer>
      );
    }

    if (debouncedQuery.length > 0) {
      return (
        <EmptyStateContainer>
          <EmptyStateIcon>🔍</EmptyStateIcon>
          <EmptyStateTitle>No Results Found</EmptyStateTitle>
          <EmptyStateText>
            We couldn't find any recipes matching "{debouncedQuery}". Try adjusting your search terms.
          </EmptyStateText>
        </EmptyStateContainer>
      );
    }

    if (selectedFilters.length > 0) {
      return (
        <EmptyStateContainer>
          <EmptyStateIcon>📋</EmptyStateIcon>
          <EmptyStateTitle>No Matching Recipes</EmptyStateTitle>
          <EmptyStateText>
            No recipes found with the selected filters. Try removing some filters.
          </EmptyStateText>
        </EmptyStateContainer>
      );
    }

    return (
      <EmptyStateContainer>
        <EmptyStateIcon>🍳</EmptyStateIcon>
        <EmptyStateTitle>Discover Recipes</EmptyStateTitle>
        <EmptyStateText>
          Search for your favorite dishes or use filters to find recipes by category.
        </EmptyStateText>
      </EmptyStateContainer>
    );
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Search Recipes</HeaderTitle>
        
        <SearchContainer>
          <SearchInput
            placeholder="Search for recipes..."
            placeholderTextColor={theme.colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          <FilterButton 
            active={showFilters || selectedFilters.length > 0}
            onPress={() => setShowFilters(!showFilters)}
          >
            <FilterButtonText active={showFilters || selectedFilters.length > 0}>
              ⚙️
            </FilterButtonText>
          </FilterButton>
        </SearchContainer>
        
        {showFilters && (
          <>
            <SectionTitle>Filter by Category</SectionTitle>
            <FilterChipsContainer>
              {filterCategories.map((category) => (
                <FilterChip
                  key={category}
                  selected={selectedFilters.includes(category)}
                  onPress={() => handleFilterToggle(category)}
                >
                  <FilterChipText selected={selectedFilters.includes(category)}>
                    {category}
                  </FilterChipText>
                </FilterChip>
              ))}
            </FilterChipsContainer>
          </>
        )}
      </Header>
      
      <Content>
        <ResultsContainer>
          {recipes.length > 0 ? (
            <FlatList
              data={recipes}
              renderItem={renderRecipeCard}
              keyExtractor={(item) => item.id}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
            />
          ) : (
            renderEmptyState()
          )}
        </ResultsContainer>
      </Content>
    </Container>
  );
};