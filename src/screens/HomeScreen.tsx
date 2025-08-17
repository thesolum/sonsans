import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList, Recipe } from '../types/navigation';
import { useInfiniteRecipes, usePrefetchRecipe } from '../services/hooks/useRecipes';
import { useToggleFavorite, useIsFavorite } from '../services/hooks/useFavorites';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[4]}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-family: ${({ theme }) => theme.typography.h2.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RecipeCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin: ${({ theme }) => theme.spacing[2]}px ${({ theme }) => theme.spacing[6]}px;
  ${({ theme }) => theme.shadows.md};
`;

const RecipeImage = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.lg}px;
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const RecipeContent = styled.View`
  padding: ${({ theme }) => theme.spacing[4]}px;
`;

const RecipeTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const RecipeDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.caption.fontSize * 1.4}px;
`;

const RecipeMeta = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[2]}px;
`;

const MetaText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const SaveButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[1]}px;
`;

const SaveIcon = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]}px;
`;

const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const RefreshButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  padding: ${({ theme }) => theme.spacing[3]}px ${({ theme }) => theme.spacing[6]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
`;

const RefreshButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const LoadMoreContainer = styled.View`
  padding: ${({ theme }) => theme.spacing[4]}px;
  align-items: center;
`;

type NavigationProp = StackNavigationProp<HomeStackParamList, 'HomeMain'>;

// Recipe card component with favorite functionality
function RecipeCardWithFavorite({ item, onPress }: { item: Recipe; onPress: (id: string) => void }) {
  const { data: isFavorite = false } = useIsFavorite(item.id);
  const toggleFavorite = useToggleFavorite();

  const handleFavoritePress = () => {
    toggleFavorite.mutate(item);
  };

  return (
    <RecipeCard onPress={() => onPress(item.id)}>
      <RecipeImage>
        <ImagePlaceholder>Recipe Image</ImagePlaceholder>
      </RecipeImage>
      <RecipeContent>
        <RecipeTitle>{item.title}</RecipeTitle>
        <RecipeDescription>{item.description}</RecipeDescription>
        <RecipeMeta>
          <MetaText>{item.cookingTime} min • {item.difficulty}</MetaText>
          <SaveButton onPress={handleFavoritePress} disabled={toggleFavorite.isPending}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#F97316" : "#A1A1AA"} 
            />
          </SaveButton>
        </RecipeMeta>
      </RecipeContent>
    </RecipeCard>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const prefetchRecipe = usePrefetchRecipe();
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteRecipes(10);

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleRecipeCardPress = (recipe: Recipe) => {
    // Prefetch recipe details for better UX
    prefetchRecipe(recipe.id);
    handleRecipePress(recipe.id);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <RecipeCardWithFavorite item={item} onPress={() => handleRecipeCardPress(item)} />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <LoadMoreContainer>
        <ActivityIndicator size="large" color="#F97316" />
      </LoadMoreContainer>
    );
  };

  if (status === 'pending') {
    return (
      <Container>
        <Header>
          <Title>Good Morning!</Title>
          <Subtitle>What would you like to cook today?</Subtitle>
        </Header>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#F97316" />
        </LoadingContainer>
      </Container>
    );
  }

  if (status === 'error') {
    return (
      <Container>
        <Header>
          <Title>Good Morning!</Title>
          <Subtitle>What would you like to cook today?</Subtitle>
        </Header>
        <ErrorContainer>
          <ErrorText>
            Oops! Something went wrong while loading recipes. Please try again.
          </ErrorText>
          <RefreshButton onPress={() => refetch()}>
            <RefreshButtonText>Retry</RefreshButtonText>
          </RefreshButton>
        </ErrorContainer>
      </Container>
    );
  }

  const allRecipes = data?.pages.flatMap(page => page.recipes) ?? [];

  return (
    <Container>
      <Header>
        <Title>Good Morning!</Title>
        <Subtitle>What would you like to cook today?</Subtitle>
      </Header>
      
      <FlatList
        data={allRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </Container>
  );
}