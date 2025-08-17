import React, { useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRecipe } from '../hooks/useRecipes';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeProvider';

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;
type RecipeDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecipeDetail'>;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background.primary};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.View`
  position: relative;
`;

const RecipeImage = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholderText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.primary[600]};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const HeaderActions = styled.View`
  position: absolute;
  top: ${(props) => props.theme.spacing['4xl']}px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.spacing.lg}px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  background-color: ${(props) => props.theme.colors.background.primary};
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.elevation.md};
`;

const ActionIcon = styled.Text`
  font-size: 20px;
`;

const Content = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h1.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h1.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const Description = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing['2xl']}px;
`;

const InfoIcon = styled.Text`
  font-size: 18px;
  margin-right: ${(props) => props.theme.spacing.sm}px;
`;

const InfoText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

const TabContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.border.primary};
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg}px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => 
    props.active ? props.theme.colors.primary[500] : 'transparent'
  };
`;

const TabText = styled.Text<{ active: boolean }>`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => 
    props.active 
      ? props.theme.typography.fontWeight.semiBold 
      : props.theme.typography.fontWeight.regular
  };
  color: ${(props) => 
    props.active 
      ? props.theme.colors.primary[600] 
      : props.theme.colors.text.tertiary
  };
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const IngredientItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const IngredientText = styled.Text`
  flex: 1;
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: ${(props) => props.theme.spacing.md}px;
`;

const IngredientAmount = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.primary[600]};
`;

const InstructionItem = styled.View`
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const StepNumber = styled.View`
  width: 32px;
  height: 32px;
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  background-color: ${(props) => props.theme.colors.primary[500]};
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing.lg}px;
  margin-top: 4px;
`;

const StepNumberText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.inverse};
`;

const InstructionText = styled.Text`
  flex: 1;
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.primary};
`;

const NutritionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

const NutritionItem = styled.View`
  width: 48%;
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-right: 4%;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  align-items: center;
`;

const NutritionValue = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.xl.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary[600]};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

const NutritionLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.tertiary};
  text-align: center;
`;

type Tab = 'ingredients' | 'instructions' | 'nutrition';

export const RecipeDetailScreen: React.FC = () => {
  const route = useRoute<RecipeDetailRouteProp>();
  const navigation = useNavigation<RecipeDetailNavigationProp>();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('ingredients');
  
  const { data: recipe, isLoading, error } = useRecipe(route.params?.recipeId || '');

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </LoadingContainer>
    );
  }

  if (!recipe) {
    return (
      <LoadingContainer>
        <InfoText>Recipe not found</InfoText>
      </LoadingContainer>
    );
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <>
            <SectionTitle>Ingredients</SectionTitle>
            {recipe.ingredients.map((ingredient) => (
              <IngredientItem key={ingredient.id}>
                <IngredientAmount>
                  {ingredient.amount} {ingredient.unit}
                </IngredientAmount>
                <IngredientText>
                  {ingredient.name}
                  {ingredient.notes && ` (${ingredient.notes})`}
                </IngredientText>
              </IngredientItem>
            ))}
          </>
        );
      
      case 'instructions':
        return (
          <>
            <SectionTitle>Instructions</SectionTitle>
            {recipe.instructions.map((instruction) => (
              <InstructionItem key={instruction.id}>
                <StepNumber>
                  <StepNumberText>{instruction.step}</StepNumberText>
                </StepNumber>
                <InstructionText>{instruction.description}</InstructionText>
              </InstructionItem>
            ))}
          </>
        );
      
      case 'nutrition':
        return (
          <>
            <SectionTitle>Nutrition Facts</SectionTitle>
            {recipe.nutrition && (
              <NutritionGrid>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.calories}</NutritionValue>
                  <NutritionLabel>Calories</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.protein}g</NutritionValue>
                  <NutritionLabel>Protein</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.carbs}g</NutritionValue>
                  <NutritionLabel>Carbs</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.fat}g</NutritionValue>
                  <NutritionLabel>Fat</NutritionLabel>
                </NutritionItem>
                {recipe.nutrition.fiber && (
                  <NutritionItem>
                    <NutritionValue>{recipe.nutrition.fiber}g</NutritionValue>
                    <NutritionLabel>Fiber</NutritionLabel>
                  </NutritionItem>
                )}
                {recipe.nutrition.sugar && (
                  <NutritionItem>
                    <NutritionValue>{recipe.nutrition.sugar}g</NutritionValue>
                    <NutritionLabel>Sugar</NutritionLabel>
                  </NutritionItem>
                )}
              </NutritionGrid>
            )}
          </>
        );
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageContainer>
          <RecipeImage>
            <ImagePlaceholderText>Recipe Image</ImagePlaceholderText>
          </RecipeImage>
          
          <HeaderActions>
            <ActionButton onPress={() => navigation.goBack()}>
              <ActionIcon>←</ActionIcon>
            </ActionButton>
            <ActionButton>
              <ActionIcon>❤️</ActionIcon>
            </ActionButton>
          </HeaderActions>
        </ImageContainer>
        
        <Content>
          <Title>{recipe.title}</Title>
          <Description>{recipe.description}</Description>
          
          <InfoRow>
            <InfoItem>
              <InfoIcon>⏱️</InfoIcon>
              <InfoText>{formatTime(recipe.cookTime + recipe.prepTime)}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>👥</InfoIcon>
              <InfoText>{recipe.servings} servings</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📊</InfoIcon>
              <InfoText>{recipe.difficulty}</InfoText>
            </InfoItem>
          </InfoRow>
          
          <TabContainer>
            <TabButton 
              active={activeTab === 'ingredients'} 
              onPress={() => setActiveTab('ingredients')}
            >
              <TabText active={activeTab === 'ingredients'}>Ingredients</TabText>
            </TabButton>
            <TabButton 
              active={activeTab === 'instructions'} 
              onPress={() => setActiveTab('instructions')}
            >
              <TabText active={activeTab === 'instructions'}>Instructions</TabText>
            </TabButton>
            <TabButton 
              active={activeTab === 'nutrition'} 
              onPress={() => setActiveTab('nutrition')}
            >
              <TabText active={activeTab === 'nutrition'}>Nutrition</TabText>
            </TabButton>
          </TabContainer>
          
          {renderTabContent()}
        </Content>
      </ScrollView>
    </Container>
  );
};