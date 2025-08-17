import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Card } from '../components';

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

const CancelButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[2]}px;
`;

const CancelText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]}px;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const PhotoUploadArea = styled.TouchableOpacity`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 2px dashed ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const PhotoUploadIcon = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const PhotoUploadText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

const IngredientContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const IngredientInput = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
`;

const AddButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  justify-content: center;
  align-items: center;
`;

const RemoveButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.error};
  justify-content: center;
  align-items: center;
`;

const StepContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const StepNumber = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
  margin-top: ${({ theme }) => theme.spacing[2]}px;
`;

const StepNumberText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const StepInputContainer = styled.View`
  flex: 1;
`;

const MetadataRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[4]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const MetadataInput = styled.View`
  flex: 1;
`;

export default function RecipeUploadScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handlePhotoUpload = () => {
    Alert.alert('Photo Upload', 'Photo upload functionality will be available soon!');
  };

  const handlePublish = () => {
    if (!title.trim() || ingredients.some(i => !i.trim()) || steps.some(s => !s.trim())) {
      Alert.alert('Incomplete Recipe', 'Please fill in all required fields.');
      return;
    }

    Alert.alert('Success', 'Recipe uploaded successfully!', [
      { text: 'OK', onPress: () => {/* Navigate back or clear form */} }
    ]);
  };

  const handleCancel = () => {
    Alert.alert('Cancel Upload', 'Are you sure you want to cancel? Your changes will be lost.', [
      { text: 'Keep Editing', style: 'cancel' },
      { text: 'Cancel', style: 'destructive', onPress: () => {/* Navigate back */} }
    ]);
  };

  return (
    <Container>
      <Header>
        <CancelButton onPress={handleCancel}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
        <HeaderTitle>Share Recipe</HeaderTitle>
        <Button size="sm" onPress={handlePublish}>
          Publish
        </Button>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <Section>
          <PhotoUploadArea onPress={handlePhotoUpload}>
            <PhotoUploadIcon>
              <Ionicons name="camera" size={24} color="#F97316" />
            </PhotoUploadIcon>
            <PhotoUploadText>Tap to add recipe photo</PhotoUploadText>
          </PhotoUploadArea>
        </Section>

        <Section>
          <Input
            label="Recipe Title *"
            placeholder="Give your recipe a name"
            value={title}
            onChangeText={setTitle}
          />
          
          <Input
            label="Description"
            placeholder="Tell us about your recipe..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </Section>

        <Section>
          <MetadataRow>
            <MetadataInput>
              <Input
                label="Cooking Time (min)"
                placeholder="30"
                value={cookingTime}
                onChangeText={setCookingTime}
                keyboardType="numeric"
              />
            </MetadataInput>
            <MetadataInput>
              <Input
                label="Servings"
                placeholder="4"
                value={servings}
                onChangeText={setServings}
                keyboardType="numeric"
              />
            </MetadataInput>
          </MetadataRow>
          
          <MetadataRow>
            <MetadataInput>
              <Input
                label="Difficulty"
                placeholder="Easy"
                value={difficulty}
                onChangeText={setDifficulty}
              />
            </MetadataInput>
            <MetadataInput>
              <Input
                label="Category"
                placeholder="Italian"
                value={category}
                onChangeText={setCategory}
              />
            </MetadataInput>
          </MetadataRow>
        </Section>

        <Section>
          <SectionTitle>Ingredients *</SectionTitle>
          {ingredients.map((ingredient, index) => (
            <IngredientContainer key={index}>
              <IngredientInput>
                <Input
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChangeText={(value) => updateIngredient(index, value)}
                />
              </IngredientInput>
              {ingredients.length > 1 && (
                <RemoveButton onPress={() => removeIngredient(index)}>
                  <Ionicons name="remove" size={20} color="white" />
                </RemoveButton>
              )}
            </IngredientContainer>
          ))}
          <AddButton onPress={addIngredient}>
            <Ionicons name="add" size={20} color="white" />
          </AddButton>
        </Section>

        <Section>
          <SectionTitle>Instructions *</SectionTitle>
          {steps.map((step, index) => (
            <StepContainer key={index}>
              <StepNumber>
                <StepNumberText>{index + 1}</StepNumberText>
              </StepNumber>
              <StepInputContainer>
                <Input
                  placeholder={`Step ${index + 1} instructions`}
                  value={step}
                  onChangeText={(value) => updateStep(index, value)}
                  multiline
                  numberOfLines={2}
                />
                {steps.length > 1 && (
                  <RemoveButton 
                    onPress={() => removeStep(index)}
                    style={{ alignSelf: 'flex-end', marginTop: 8 }}
                  >
                    <Ionicons name="remove" size={20} color="white" />
                  </RemoveButton>
                )}
              </StepInputContainer>
            </StepContainer>
          ))}
          <AddButton onPress={addStep} style={{ marginTop: 16 }}>
            <Ionicons name="add" size={20} color="white" />
          </AddButton>
        </Section>

        <Section>
          <Button onPress={handlePublish} style={{ marginBottom: 32 }}>
            Publish Recipe
          </Button>
        </Section>
      </Content>
    </Container>
  );
}