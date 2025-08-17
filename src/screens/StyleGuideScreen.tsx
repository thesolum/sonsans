import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import {
  Button,
  Card,
  Input,
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Body,
  Caption,
  Overline,
} from '../components';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Section = styled.View`
  padding: ${({ theme }) => theme.spacing[6]}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ColorPalette = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ColorSwatch = styled.View<{ color: string }>`
  width: 60px;
  height: 60px;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ColorLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing[1]}px;
  width: 60px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const CardContainer = styled.View`
  gap: ${({ theme }) => theme.spacing[4]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ShadowDemo = styled.View<{ shadowType: string }>`
  width: 100px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-right: ${({ theme }) => theme.spacing[4]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  justify-content: center;
  align-items: center;
  ${({ theme, shadowType }) => {
    const shadows = {
      none: theme.shadows.none,
      xs: theme.shadows.xs,
      sm: theme.shadows.sm,
      base: theme.shadows.base,
      md: theme.shadows.md,
      lg: theme.shadows.lg,
      xl: theme.shadows.xl,
    };
    const shadow = shadows[shadowType as keyof typeof shadows];
    return `
      shadow-offset: ${shadow.shadowOffset.width}px ${shadow.shadowOffset.height}px;
      shadow-opacity: ${shadow.shadowOpacity};
      shadow-radius: ${shadow.shadowRadius}px;
      shadow-color: ${shadow.shadowColor || '#000'};
      elevation: ${shadow.elevation};
    `;
  }}
`;

const ShadowContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function StyleGuideScreen() {
  const theme = useTheme();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Typography Section */}
        <Section>
          <SectionTitle>Typography</SectionTitle>
          <Heading1>Heading 1 - Poppins Bold</Heading1>
          <Heading2>Heading 2 - Poppins SemiBold</Heading2>
          <Heading3>Heading 3 - Poppins SemiBold</Heading3>
          <Body>Body text - Poppins Regular for readable content</Body>
          <Caption>Caption text - Smaller size for secondary information</Caption>
          <Overline>Overline - All caps for labels</Overline>
          
          <Typography variant="body" color="accent" style={{ marginTop: 16 }}>
            Accent color text using primary orange
          </Typography>
        </Section>

        {/* Color Palette Section */}
        <Section>
          <SectionTitle>Color Palette</SectionTitle>
          
          <Body style={{ marginBottom: 16 }}>Primary Colors (Pastel Orange)</Body>
          <ColorPalette>
            {Object.entries(theme.colors.primary).map(([key, value]) => (
              <View key={key}>
                <ColorSwatch color={value} />
                <ColorLabel>{key}</ColorLabel>
              </View>
            ))}
          </ColorPalette>

          <Body style={{ marginBottom: 16 }}>Neutral Colors</Body>
          <ColorPalette>
            {Object.entries(theme.colors.neutral).map(([key, value]) => (
              <View key={key}>
                <ColorSwatch color={value} />
                <ColorLabel>{key}</ColorLabel>
              </View>
            ))}
          </ColorPalette>
        </Section>

        {/* Buttons Section */}
        <Section>
          <SectionTitle>Buttons</SectionTitle>
          
          <Body style={{ marginBottom: 16 }}>Button Variants</Body>
          <ButtonContainer>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </ButtonContainer>
          
          <Body style={{ marginBottom: 16 }}>Button Sizes</Body>
          <ButtonContainer>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ButtonContainer>
          
          <Body style={{ marginBottom: 16 }}>Disabled State</Body>
          <ButtonContainer>
            <Button disabled>Disabled</Button>
          </ButtonContainer>
        </Section>

        {/* Cards Section */}
        <Section>
          <SectionTitle>Cards</SectionTitle>
          
          <CardContainer>
            <Card variant="default" padding="md">
              <Body>Default Card with shadow</Body>
            </Card>
            
            <Card variant="elevated" padding="md">
              <Body>Elevated Card with more shadow</Body>
            </Card>
            
            <Card variant="outlined" padding="md">
              <Body>Outlined Card with border</Body>
            </Card>
          </CardContainer>
        </Section>

        {/* Inputs Section */}
        <Section>
          <SectionTitle>Input Fields</SectionTitle>
          
          <Input
            label="Default Input"
            placeholder="Enter text here..."
            helperText="This is helper text"
          />
          
          <Input
            label="Input with Left Icon"
            placeholder="Search..."
            leftIcon="search"
            variant="filled"
          />
          
          <Input
            label="Input with Right Icon"
            placeholder="Password"
            rightIcon="eye-outline"
            secureTextEntry
            variant="outlined"
          />
          
          <Input
            label="Error State"
            placeholder="Invalid input"
            error="This field is required"
          />
        </Section>

        {/* Shadows Section */}
        <Section>
          <SectionTitle>Elevation / Shadows</SectionTitle>
          
          <ShadowContainer>
            {Object.keys(theme.shadows).map((shadowType) => (
              <View key={shadowType}>
                <ShadowDemo shadowType={shadowType} />
                <Caption style={{ textAlign: 'center', width: 100 }}>
                  {shadowType}
                </Caption>
              </View>
            ))}
          </ShadowContainer>
        </Section>

        {/* Border Radius Section */}
        <Section>
          <SectionTitle>Border Radius</SectionTitle>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {Object.entries(theme.borderRadius).map(([key, value]) => (
              <View key={key} style={{ marginRight: 16, marginBottom: 16, alignItems: 'center' }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: theme.colors.primary[200],
                    borderRadius: value,
                    marginBottom: 8,
                  }}
                />
                <Caption>{key}</Caption>
                <Caption color="secondary">{value}px</Caption>
              </View>
            ))}
          </View>
        </Section>

        {/* Icons Section */}
        <Section>
          <SectionTitle>Icons</SectionTitle>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {['home', 'search', 'heart', 'person', 'settings', 'star', 'bookmark', 'share'].map((iconName) => (
              <View key={iconName} style={{ alignItems: 'center' }}>
                <Ionicons 
                  name={iconName as keyof typeof Ionicons.glyphMap} 
                  size={32} 
                  color={theme.colors.primary[500]} 
                />
                <Caption style={{ marginTop: 4 }}>{iconName}</Caption>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </Container>
  );
}