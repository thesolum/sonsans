import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const NotificationItem = styled.TouchableOpacity<{ unread?: boolean }>`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing[4]}px ${({ theme }) => theme.spacing[6]}px;
  background-color: ${({ theme, unread }) => 
    unread ? theme.colors.primary[50] : theme.colors.background.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const AvatarContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const AvatarPlaceholder = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const NotificationContent = styled.View`
  flex: 1;
  justify-content: center;
`;

const NotificationText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.body.fontSize * 1.4}px;
`;

const NotificationTime = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`;

const NotificationIcon = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]}px;
`;

const UnreadDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
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
  background-color: ${({ theme }) => theme.colors.neutral[100]};
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

type NotificationType = 'like' | 'follow' | 'comment' | 'recipe';

interface Notification {
  id: string;
  type: NotificationType;
  text: string;
  time: string;
  unread: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    text: 'Sarah liked your Chocolate Chip Cookies recipe',
    time: '5 minutes ago',
    unread: true,
    user: { name: 'Sarah Johnson' },
  },
  {
    id: '2',
    type: 'follow',
    text: 'Mike started following you',
    time: '1 hour ago',
    unread: true,
    user: { name: 'Mike Chen' },
  },
  {
    id: '3',
    type: 'comment',
    text: 'Emma commented: "This looks amazing! Can\'t wait to try it"',
    time: '2 hours ago',
    unread: false,
    user: { name: 'Emma Wilson' },
  },
  {
    id: '4',
    type: 'recipe',
    text: 'New recipe matching your interests: Mediterranean Quinoa Bowl',
    time: '1 day ago',
    unread: false,
  },
  {
    id: '5',
    type: 'like',
    text: 'Alex and 3 others liked your Spaghetti Carbonara recipe',
    time: '2 days ago',
    unread: false,
    user: { name: 'Alex Rodriguez' },
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return <Ionicons name="heart" size={20} color="#F97316" />;
    case 'follow':
      return <Ionicons name="person-add" size={20} color="#3B82F6" />;
    case 'comment':
      return <Ionicons name="chatbubble" size={20} color="#10B981" />;
    case 'recipe':
      return <Ionicons name="restaurant" size={20} color="#8B5CF6" />;
    default:
      return <Ionicons name="notifications" size={20} color="#71717A" />;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default function NotificationsScreen() {
  const handleNotificationPress = (notification: Notification) => {
    // TODO: Navigate to relevant screen based on notification type
    console.log('Notification pressed:', notification);
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <NotificationItem 
      unread={item.unread}
      onPress={() => handleNotificationPress(item)}
    >
      <AvatarContainer>
        {item.user ? (
          <AvatarPlaceholder>
            {getInitials(item.user.name)}
          </AvatarPlaceholder>
        ) : (
          getNotificationIcon(item.type)
        )}
      </AvatarContainer>
      
      <NotificationContent>
        <NotificationText>{item.text}</NotificationText>
        <NotificationTime>{item.time}</NotificationTime>
      </NotificationContent>
      
      <NotificationIcon>
        {item.user && getNotificationIcon(item.type)}
        {item.unread && <UnreadDot style={{ marginTop: 4 }} />}
      </NotificationIcon>
    </NotificationItem>
  );

  if (mockNotifications.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Notifications</Title>
        </Header>
        <EmptyState>
          <EmptyIcon>
            <Ionicons name="notifications-outline" size={40} color="#A1A1AA" />
          </EmptyIcon>
          <EmptyTitle>No Notifications</EmptyTitle>
          <EmptyDescription>
            When you receive likes, follows, and comments, they'll appear here
          </EmptyDescription>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Notifications</Title>
      </Header>
      
      <FlatList
        data={mockNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}