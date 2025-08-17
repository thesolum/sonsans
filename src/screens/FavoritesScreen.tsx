import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';
import { useFavorites } from '../contexts/FavoritesContext';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/recipe';
import { RootStackParamList } from '../types/navigation';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

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
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const HeaderSubtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Content = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg}px;
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
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const EmptyStateDescription = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.tertiary};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing['2xl']}px;
`;

const ExploreButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary[500]};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.lg}px ${(props) => props.theme.spacing['2xl']}px;
  ${(props) => props.theme.elevation.sm};
`;

const ExploreButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const FavoritesScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();
  
  // Get all recipes to filter favorites from
  const { data: recipesData } = useRecipes();
  
  // Filter recipes to show only favorites
  const favoriteRecipes = useMemo(() => {
    if (!recipesData || favorites.length === 0) return [];
    
    const allRecipes = recipesData.pages.flatMap(page => page.recipes);
    return allRecipes.filter(recipe => favorites.includes(recipe.id));
  }, [recipesData, favorites]);

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
  
  const handleExploreRecipes = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <RecipeCard
      recipe={{ ...item, isFavorite: true }}
      onPress={handleRecipePress}
      onFavoritePress={handleFavoritePress}
    />
  );

  const renderHeader = () => (
    <Header>
      <HeaderTitle>My Favorites</HeaderTitle>
      <HeaderSubtitle>
        {favoriteRecipes.length > 0 
          ? `${favoriteRecipes.length} saved recipe${favoriteRecipes.length !== 1 ? 's' : ''}`
          : 'Your saved recipes'
        }
      </HeaderSubtitle>
    </Header>
  );

  if (favoriteRecipes.length === 0) {
    return (
      <Container>
        {renderHeader()}
        <EmptyStateContainer>
          <EmptyStateIcon>❤️</EmptyStateIcon>
          <EmptyStateTitle>No Favorites Yet</EmptyStateTitle>
          <EmptyStateDescription>
            Start exploring recipes and save your favorites to see them here.
            Tap the heart icon on any recipe to add it to your collection.
          </EmptyStateDescription>
          <ExploreButton onPress={handleExploreRecipes}>
            <ExploreButtonText>Explore Recipes</ExploreButtonText>
          </ExploreButton>
        </EmptyStateContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={favoriteRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};