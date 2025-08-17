import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]}px ${({ theme }) => theme.spacing[6]}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[2]}px;
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[2]}px;
`;

const ClearText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]}px;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ToggleContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]}px;
`;

const ToggleButton = styled.TouchableOpacity<{ active?: boolean; disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]}px ${({ theme }) => theme.spacing[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  border-width: 2px;
  border-color: ${({ theme, active, disabled }) => {
    if (disabled) return theme.colors.neutral[200];
    if (active) return theme.colors.primary[500];
    return theme.colors.border.medium;
  }};
  background-color: ${({ theme, active, disabled }) => {
    if (disabled) return theme.colors.neutral[50];
    if (active) return theme.colors.primary[500];
    return theme.colors.background.primary;
  }};
`;

const ToggleText = styled.Text<{ active?: boolean; disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme, active, disabled }) => {
    if (disabled) return theme.colors.text.tertiary;
    if (active) return theme.colors.text.inverse;
    return theme.colors.text.primary;
  }};
`;

const SliderContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const SliderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const SliderLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SliderValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const SliderTrack = styled.View`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 3px;
  position: relative;
`;

const SliderProgress = styled.View<{ progress: number }>`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 3px;
  width: ${({ progress }) => progress}%;
`;

const SliderThumb = styled.TouchableOpacity<{ position: number }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  position: absolute;
  top: -9px;
  left: ${({ position }) => position}%;
  margin-left: -12px;
  ${({ theme }) => theme.shadows.md};
`;

const ApplyContainer = styled.View`
  padding: ${({ theme }) => theme.spacing[6]}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border.light};
`;

const categories = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
  'Low-Carb', 'Keto', 'Paleo', 'Mediterranean',
  'Asian', 'Italian', 'Mexican', 'Indian',
  'Dessert', 'Breakfast', 'Lunch', 'Dinner'
];

const cuisines = [
  'American', 'Italian', 'Mexican', 'Asian', 'Indian',
  'Mediterranean', 'French', 'Thai', 'Chinese', 'Japanese'
];

export default function FilterScreen() {
  const navigation = useNavigation();
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set());
  const [difficultyLevel, setDifficultyLevel] = useState(50); // 0-100
  const [cookingTime, setCookingTime] = useState(30); // 0-120 minutes

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const toggleCuisine = (cuisine: string) => {
    const newSelected = new Set(selectedCuisines);
    if (newSelected.has(cuisine)) {
      newSelected.delete(cuisine);
    } else {
      newSelected.add(cuisine);
    }
    setSelectedCuisines(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedCuisines(new Set());
    setDifficultyLevel(50);
    setCookingTime(30);
  };

  const applyFilters = () => {
    // TODO: Apply filters to search results
    console.log('Applied filters:', {
      categories: Array.from(selectedCategories),
      cuisines: Array.from(selectedCuisines),
      difficultyLevel,
      cookingTime,
    });
    navigation.goBack();
  };

  const getDifficultyText = (value: number) => {
    if (value < 33) return 'Easy';
    if (value < 67) return 'Medium';
    return 'Hard';
  };

  return (
    <Container>
      <Header>
        <CloseButton onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#18181B" />
        </CloseButton>
        <HeaderTitle>Filters</HeaderTitle>
        <ClearButton onPress={clearAllFilters}>
          <ClearText>Clear All</ClearText>
        </ClearButton>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Diet & Lifestyle</SectionTitle>
          <ToggleContainer>
            {categories.map((category) => (
              <ToggleButton
                key={category}
                active={selectedCategories.has(category)}
                onPress={() => toggleCategory(category)}
              >
                <ToggleText active={selectedCategories.has(category)}>
                  {category}
                </ToggleText>
              </ToggleButton>
            ))}
          </ToggleContainer>
        </Section>

        <Section>
          <SectionTitle>Cuisine</SectionTitle>
          <ToggleContainer>
            {cuisines.map((cuisine) => (
              <ToggleButton
                key={cuisine}
                active={selectedCuisines.has(cuisine)}
                onPress={() => toggleCuisine(cuisine)}
              >
                <ToggleText active={selectedCuisines.has(cuisine)}>
                  {cuisine}
                </ToggleText>
              </ToggleButton>
            ))}
          </ToggleContainer>
        </Section>

        <Section>
          <SliderContainer>
            <SliderHeader>
              <SliderLabel>Difficulty Level</SliderLabel>
              <SliderValue>{getDifficultyText(difficultyLevel)}</SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderProgress progress={difficultyLevel} />
              <SliderThumb position={difficultyLevel} />
            </SliderTrack>
          </SliderContainer>
        </Section>

        <Section>
          <SliderContainer>
            <SliderHeader>
              <SliderLabel>Maximum Cooking Time</SliderLabel>
              <SliderValue>{cookingTime} min</SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderProgress progress={(cookingTime / 120) * 100} />
              <SliderThumb position={(cookingTime / 120) * 100} />
            </SliderTrack>
          </SliderContainer>
        </Section>
      </Content>

      <ApplyContainer>
        <Button onPress={applyFilters}>
          Apply Filters ({selectedCategories.size + selectedCuisines.size} selected)
        </Button>
      </ApplyContainer>
    </Container>
  );
}