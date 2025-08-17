import React from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/recipe';
import { RootStackParamList } from '../types/navigation';
import { useFavorites } from '../contexts/FavoritesContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background.primary};
`;

const Header = styled.View`
  padding: ${(props) => props.theme.spacing['2xl']}px ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing['4xl']}px;
  background-color: ${(props) => props.theme.colors.primary[50]};
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing['4xl']}px;
`;

const LoadingText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.text.tertiary};
  margin-top: ${(props) => props.theme.spacing.lg}px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing['4xl']}px;
`;

const ErrorText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.error[600]};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary[500]};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.md}px ${(props) => props.theme.spacing.xl}px;
`;

const RetryButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.inverse};
`;

const FooterLoadingContainer = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  align-items: center;
`;

const ListContainer = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useRecipes();

  // Flatten all pages of recipes
  const recipes = data?.pages.flatMap(page => page.recipes) ?? [];

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <RecipeCard
      recipe={{ ...item, isFavorite: favorites.includes(item.id) }}
      onPress={handleRecipePress}
      onFavoritePress={handleFavoritePress}
    />
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <FooterLoadingContainer>
          <ActivityIndicator size="small" color={theme.colors.primary[500]} />
        </FooterLoadingContainer>
      );
    }
    return null;
  };

  const renderHeader = () => (
    <Header>
      <HeaderTitle>Discover Recipes</HeaderTitle>
      <HeaderSubtitle>Find your next favorite dish</HeaderSubtitle>
    </Header>
  );

  if (isLoading) {
    return (
      <Container>
        {renderHeader()}
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          <LoadingText>Loading delicious recipes...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        {renderHeader()}
        <ErrorContainer>
          <ErrorText>
            Oops! We couldn't load the recipes right now. Please check your connection and try again.
          </ErrorText>
          <RetryButton onPress={() => refetch()}>
            <RetryButtonText>Try Again</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[theme.colors.primary[500]]}
            tintColor={theme.colors.primary[500]}
          />
        }
      />
    </Container>
  );
};