import { usePathname } from 'expo-router';
import { Tabs, TabList, TabSlot, TabTrigger } from 'expo-router/ui';
import { Pressable, Text, View } from 'react-native';

const tabs = [
  { name: 'home', href: '/home', label: 'Feed' },
  { name: 'treino', href: '/treino', label: 'Treino' },
  { name: 'perfil', href: '/perfil', label: 'Perfil' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const activeTab = pathname.split('/')[1] || 'home';

  return (
    <Tabs>
      <View className="flex-1 bg-background">
        <TabSlot />
      </View>
      <TabList asChild>
        <View className="flex-row justify-around gap-2 border-t border-border bg-background px-3 py-2">
          {tabs.map(({ name, href, label }) => {
            const isActive = activeTab === name;

            return (
              <TabTrigger key={name} name={name} href={href} asChild>
                <Pressable
                  className={`flex-1 items-center justify-center rounded-xl py-2.5 ${isActive ? 'bg-accent' : ''}`}>
                  <Text
                    className={`text-sm font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {label}
                  </Text>
                </Pressable>
              </TabTrigger>
            );
          })}
        </View>
      </TabList>
    </Tabs>
  );
}
