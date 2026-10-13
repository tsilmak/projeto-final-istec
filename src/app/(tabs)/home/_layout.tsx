import { Text } from '@/components/ui/text';
import { HomeFeed, HomeFeedProvider } from '@/context/home/feed-context';

import { useThemeColors } from '@/lib/theme';
import { MenuView } from '@expo/ui/community/menu';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function RouteLayout() {
  const { foreground } = useThemeColors();

  const [activeFeed, setActiveFeed] = useState<HomeFeed>('Amigos');
  const [menuKey, setMenuKey] = useState(0);

  return (
    <HomeFeedProvider value={{ activeFeed, setActiveFeed }}>
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerShadowVisible: false,

            headerTitle: () => (
              <MenuView
                key={menuKey}
                title="Escolhe o feed"
                actions={(['Amigos', 'Ginásio'] as const).map((feed) => ({
                  id: feed,
                  title: feed,
                  state: feed === activeFeed ? 'on' : 'off',
                }))}
                onPressAction={({ nativeEvent }) => {
                  setActiveFeed(nativeEvent.event as HomeFeed);
                  setMenuKey((key) => key + 1);
                }}>
                <View className="flex-row items-center justify-center gap-1 px-2">
                  <Text className="text-lg font-semibold">Feed ({activeFeed})</Text>

                  <Ionicons name="chevron-down" size={17} color={foreground} />
                </View>
              </MenuView>
            ),

            headerRight: () => (
              <Ionicons
                name="notifications-outline"
                size={23}
                color={foreground}
                accessibilityLabel="Notificações"
              />
            ),
          }}
        />
      </Stack>
    </HomeFeedProvider>
  );
}
