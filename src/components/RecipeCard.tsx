import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Recipe } from '../types/recipe';
import { useTheme } from '../theme/ThemeProvider';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
  onFavoritePress?: (recipe: Recipe) => void;
}

const CardContainer = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
  overflow: hidden;
  ${(props) => props.theme.elevation.md};
`;

const RecipeImage = styled.Image`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.colors.primary[100]};
`;

const ImagePlaceholder = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholderText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  color: ${(props) => props.theme.colors.primary[600]};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${(props) => props.theme.spacing.md}px;
  right: ${(props) => props.theme.spacing.md}px;
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  background-color: ${(props) => props.theme.colors.background.primary};
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.elevation.sm};
`;

const FavoriteIcon = styled.Text<{ isFavorite: boolean }>`
  font-size: 18px;
  color: ${(props) => 
    props.isFavorite 
      ? props.theme.colors.error[500] 
      : props.theme.colors.text.muted
  };
`;

const CardContent = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`;

const RecipeTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.xl.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.xl.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const RecipeDescription = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const RecipeInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing.lg}px;
`;

const InfoIcon = styled.Text`
  font-size: 16px;
  margin-right: ${(props) => props.theme.spacing.xs}px;
`;

const InfoText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.tertiary};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.primary[600]};
  margin-left: ${(props) => props.theme.spacing.xs}px;
`;

const CategoryChip = styled.View`
  background-color: ${(props) => props.theme.colors.primary[100]};
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  padding: ${(props) => props.theme.spacing.xs}px ${(props) => props.theme.spacing.sm}px;
  margin-right: ${(props) => props.theme.spacing.xs}px;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

const CategoryText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.sm.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.primary[700]};
`;

const CategoriesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onPress, 
  onFavoritePress 
}) => {
  const theme = useTheme();
  
  const handleFavoritePress = () => {
    if (onFavoritePress) {
      onFavoritePress(recipe);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <CardContainer onPress={() => onPress(recipe)}>
      <ImagePlaceholder>
        <ImagePlaceholderText>Recipe Image</ImagePlaceholderText>
        <FavoriteButton onPress={handleFavoritePress}>
          <FavoriteIcon isFavorite={recipe.isFavorite || false}>
            {recipe.isFavorite ? '❤️' : '🤍'}
          </FavoriteIcon>
        </FavoriteButton>
      </ImagePlaceholder>
      
      <CardContent>
        <RecipeTitle numberOfLines={2}>{recipe.title}</RecipeTitle>
        <RecipeDescription numberOfLines={2}>{recipe.description}</RecipeDescription>
        
        <RecipeInfo>
          <InfoRow>
            <InfoItem>
              <InfoIcon>⏱️</InfoIcon>
              <InfoText>{formatTime(recipe.cookTime + recipe.prepTime)}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>👥</InfoIcon>
              <InfoText>{recipe.servings}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📊</InfoIcon>
              <InfoText>{recipe.difficulty}</InfoText>
            </InfoItem>
          </InfoRow>
          
          {recipe.rating && (
            <RatingContainer>
              <InfoIcon>⭐</InfoIcon>
              <RatingText>{recipe.rating.toFixed(1)}</RatingText>
            </RatingContainer>
          )}
        </RecipeInfo>
        
        <CategoriesRow>
          {recipe.category.slice(0, 3).map((cat, index) => (
            <CategoryChip key={index}>
              <CategoryText>{cat}</CategoryText>
            </CategoryChip>
          ))}
        </CategoriesRow>
      </CardContent>
    </CardContainer>
  );
};