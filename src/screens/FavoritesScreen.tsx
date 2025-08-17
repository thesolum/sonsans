import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../types/navigation';
import { useFavoriteRecipes, useToggleFavorite } from '../services/hooks/useFavorites';

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
`;

const RecipeCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin: ${({ theme }) => theme.spacing[2]}px ${({ theme }) => theme.spacing[6]}px;
  ${({ theme }) => theme.shadows.sm};
  flex-direction: row;
  overflow: hidden;
`;

const RecipeImage = styled.View`
  width: 120px;
  height: 120px;
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
  padding: ${({ theme }) => theme.spacing[4]}px;
  justify-content: space-between;
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
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const RecipeMeta = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MetaText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const FavoriteButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[1]}px;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]}px;
`;

const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const EmptyTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
  text-align: center;
`;

const EmptyDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.body.fontSize * 1.5}px;
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

// Favorite Recipe Card Component
function FavoriteRecipeCard({ item }: { item: Recipe }) {
  const toggleFavorite = useToggleFavorite();

  const handleRemoveFavorite = () => {
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
        <RecipeMeta>
          <MetaText>{item.cookingTime} min • {item.difficulty}</MetaText>
          <FavoriteButton onPress={handleRemoveFavorite} disabled={toggleFavorite.isPending}>
            <Ionicons name="heart" size={20} color="#F97316" />
          </FavoriteButton>
        </RecipeMeta>
      </RecipeContent>
    </RecipeCard>
  );
}

export default function FavoritesScreen() {
  const { data: favoriteRecipes = [], isLoading, error, refetch } = useFavoriteRecipes();

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <FavoriteRecipeCard item={item} />
  );

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Favorites</Title>
        </Header>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#F97316" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Favorites</Title>
        </Header>
        <ErrorContainer>
          <ErrorText>
            Failed to load your favorites. Please try again.
          </ErrorText>
          <RefreshButton onPress={() => refetch()}>
            <RefreshButtonText>Try Again</RefreshButtonText>
          </RefreshButton>
        </ErrorContainer>
      </Container>
    );
  }

  if (favoriteRecipes.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Favorites</Title>
        </Header>
        <EmptyState>
          <EmptyIcon>
            <Ionicons name="heart-outline" size={40} color="#F97316" />
          </EmptyIcon>
          <EmptyTitle>No Favorites Yet</EmptyTitle>
          <EmptyDescription>
            Start exploring recipes and tap the heart icon to save your favorites here
          </EmptyDescription>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Favorites</Title>
      </Header>
      
      <FlatList
        data={favoriteRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </Container>
  );
}

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