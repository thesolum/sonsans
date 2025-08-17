import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';

// Styled components demonstrating each design token

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background.primary};
  padding: ${(props) => props.theme.spacing.lg}px;
`;

const Section = styled.View`
  margin-bottom: ${(props) => props.theme.spacing['3xl']}px;
`;

const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

// Typography samples
const H1Sample = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h1.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h1.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const H2Sample = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const BodySample = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const CaptionSample = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.caption.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.tertiary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

// Color samples
const ColorRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

const ColorBox = styled.View<{ color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  margin-right: ${(props) => props.theme.spacing.sm}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.borderRadius.sm}px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
`;

// Shadow/elevation samples
const ElevationCard = styled.View<{ elevation: string }>`
  background-color: ${(props) => props.theme.colors.background.primary};
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  ${(props) => {
    const elevationStyle = props.theme.elevation[props.elevation as keyof typeof props.theme.elevation];
    return `
      shadow-color: ${elevationStyle.shadowColor};
      shadow-offset: ${elevationStyle.shadowOffset.width}px ${elevationStyle.shadowOffset.height}px;
      shadow-opacity: ${elevationStyle.shadowOpacity};
      shadow-radius: ${elevationStyle.shadowRadius}px;
      elevation: ${elevationStyle.elevation};
    `;
  }}
`;

// Border radius samples
const BorderRadiusBox = styled.View<{ radius: number }>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.colors.primary[500]};
  margin-right: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.radius}px;
`;

export const DesignSystemDemo: React.FC = () => {
  const theme = useTheme();
  
  return (
    <ScrollView>
      <Container>
        {/* Typography Section */}
        <Section>
          <SectionTitle>Typography Scale</SectionTitle>
          <H1Sample>H1 Heading - Large Title</H1Sample>
          <H2Sample>H2 Heading - Section Title</H2Sample>
          <BodySample>Body text - Main content with good readability</BodySample>
          <CaptionSample>Caption - Small descriptive text</CaptionSample>
        </Section>

        {/* Colors Section */}
        <Section>
          <SectionTitle>Color Palette</SectionTitle>
          <BodySample>Primary (Pastel Orange)</BodySample>
          <ColorRow>
            <ColorBox color={theme.colors.primary[100]} />
            <ColorBox color={theme.colors.primary[300]} />
            <ColorBox color={theme.colors.primary[500]} />
            <ColorBox color={theme.colors.primary[700]} />
            <ColorBox color={theme.colors.primary[900]} />
          </ColorRow>
          
          <BodySample>Neutral Tones</BodySample>
          <ColorRow>
            <ColorBox color={theme.colors.neutral[100]} />
            <ColorBox color={theme.colors.neutral[300]} />
            <ColorBox color={theme.colors.neutral[500]} />
            <ColorBox color={theme.colors.neutral[700]} />
            <ColorBox color={theme.colors.neutral[900]} />
          </ColorRow>
        </Section>

        {/* Elevation Section */}
        <Section>
          <SectionTitle>Elevation/Shadows</SectionTitle>
          <ElevationCard elevation="sm">
            <CaptionSample>Small Shadow</CaptionSample>
          </ElevationCard>
          <ElevationCard elevation="md">
            <CaptionSample>Medium Shadow</CaptionSample>
          </ElevationCard>
          <ElevationCard elevation="lg">
            <CaptionSample>Large Shadow</CaptionSample>
          </ElevationCard>
        </Section>

        {/* Border Radius Section */}
        <Section>
          <SectionTitle>Border Radius Scale</SectionTitle>
          <ColorRow>
            <BorderRadiusBox radius={theme.borderRadius.sm} />
            <BorderRadiusBox radius={theme.borderRadius.md} />
            <BorderRadiusBox radius={theme.borderRadius.lg} />
            <BorderRadiusBox radius={theme.borderRadius.xl} />
            <BorderRadiusBox radius={theme.borderRadius['2xl']} />
          </ColorRow>
        </Section>
      </Container>
    </ScrollView>
  );
};