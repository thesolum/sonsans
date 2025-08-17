import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList, Recipe } from '../types/navigation';
import { useRecipe } from '../services/hooks/useRecipes';
import { useToggleFavorite, useIsFavorite } from '../services/hooks/useFavorites';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]}px ${({ theme }) => theme.spacing[6]}px;
  z-index: 1;
`;

const HeaderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.shadows.md};
`;

const RecipeImage = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography['3xl']}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const MetaItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[6]}px;
`;

const MetaText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing[1]}px;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.body.fontSize * 1.5}px;
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const IngredientItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const CheckBox = styled.TouchableOpacity<{ checked?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${({ theme, checked }) => 
    checked ? theme.colors.primary[500] : theme.colors.border.medium};
  background-color: ${({ theme, checked }) => 
    checked ? theme.colors.primary[500] : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const IngredientText = styled.Text<{ checked?: boolean }>`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme, checked }) => 
    checked ? theme.colors.text.tertiary : theme.colors.text.primary};
  text-decoration-line: ${({ checked }) => checked ? 'line-through' : 'none'};
`;

const InstructionItem = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const StepNumber = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const StepNumberText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const InstructionText = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.body.fontSize * 1.5}px;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[6]}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border.light};
`;

const ActionButton = styled.TouchableOpacity<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin: 0 ${({ theme }) => theme.spacing[2]}px;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary[500] : theme.colors.background.secondary};
`;

const ActionButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.text.inverse : theme.colors.text.primary};
  margin-left: ${({ theme }) => theme.spacing[2]}px;
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

const RetryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  padding: ${({ theme }) => theme.spacing[3]}px ${({ theme }) => theme.spacing[6]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
`;

const RetryButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

type RecipeDetailRouteProp = RouteProp<HomeStackParamList, 'RecipeDetail'>;

export default function RecipeDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RecipeDetailRouteProp>();
  const { recipeId } = route.params;
  
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  
  // Fetch recipe data
  const { data: recipe, isLoading, error, refetch } = useRecipe(recipeId);
  
  // Favorite status
  const { data: isFavorite = false } = useIsFavorite(recipeId);
  const toggleFavorite = useToggleFavorite();

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const handleSave = () => {
    if (recipe) {
      toggleFavorite.mutate(recipe);
    }
  };

  const handleShare = () => {
    Alert.alert('Share Recipe', 'Share functionality will be available soon!');
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <HeaderButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#18181B" />
          </HeaderButton>
          <HeaderButton disabled>
            <Ionicons name="heart-outline" size={20} color="#A1A1AA" />
          </HeaderButton>
        </Header>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#F97316" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !recipe) {
    return (
      <Container>
        <Header>
          <HeaderButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#18181B" />
          </HeaderButton>
          <HeaderButton disabled>
            <Ionicons name="heart-outline" size={20} color="#A1A1AA" />
          </HeaderButton>
        </Header>
        <ErrorContainer>
          <ErrorText>
            Failed to load recipe details. Please try again.
          </ErrorText>
          <RetryButton onPress={() => refetch()}>
            <RetryButtonText>Retry</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RecipeImage>
          <ImagePlaceholder>Recipe Image</ImagePlaceholder>
        </RecipeImage>
        
        <Header>
          <HeaderButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#18181B" />
          </HeaderButton>
          <HeaderButton onPress={handleSave} disabled={toggleFavorite.isPending}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#F97316" : "#18181B"} 
            />
          </HeaderButton>
        </Header>

        <ContentContainer>
          <Title>{recipe.title}</Title>
          
          <MetaContainer>
            <MetaItem>
              <Ionicons name="time-outline" size={16} color="#71717A" />
              <MetaText>{recipe.cookingTime} min</MetaText>
            </MetaItem>
            <MetaItem>
              <Ionicons name="bar-chart-outline" size={16} color="#71717A" />
              <MetaText>{recipe.difficulty}</MetaText>
            </MetaItem>
            {recipe.nutrition && (
              <MetaItem>
                <Ionicons name="fitness-outline" size={16} color="#71717A" />
                <MetaText>{recipe.nutrition.calories} cal</MetaText>
              </MetaItem>
            )}
          </MetaContainer>

          <Description>{recipe.description}</Description>

          <SectionTitle>Ingredients</SectionTitle>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientItem key={index}>
              <CheckBox 
                checked={checkedIngredients.has(index)}
                onPress={() => toggleIngredient(index)}
              >
                {checkedIngredients.has(index) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </CheckBox>
              <IngredientText checked={checkedIngredients.has(index)}>
                {ingredient}
              </IngredientText>
            </IngredientItem>
          ))}

          <SectionTitle style={{ marginTop: 32 }}>Instructions</SectionTitle>
          {recipe.instructions.map((instruction, index) => (
            <InstructionItem key={index}>
              <StepNumber>
                <StepNumberText>{index + 1}</StepNumberText>
              </StepNumber>
              <InstructionText>{instruction}</InstructionText>
            </InstructionItem>
          ))}
        </ContentContainer>
      </ScrollView>

      <ActionButtons>
        <ActionButton variant="secondary" onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#18181B" />
          <ActionButtonText variant="secondary">Share</ActionButtonText>
        </ActionButton>
        <ActionButton 
          variant="primary" 
          onPress={handleSave}
          disabled={toggleFavorite.isPending}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color="white" 
          />
          <ActionButtonText variant="primary">
            {isFavorite ? 'Saved' : 'Save Recipe'}
          </ActionButtonText>
        </ActionButton>
      </ActionButtons>
    </Container>
  );
}