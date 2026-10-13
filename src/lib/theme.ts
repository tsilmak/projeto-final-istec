// lib/theme.ts
//
// Cores para componentes que NÃO aceitam classes do Tailwind
// (ex.: `style` do Button de @expo/ui).
//
// Em todos os outros componentes, usa Tailwind (ex.: `bg-destructive`, `bg-card`).
//
// Estes valores são uma cópia do global.css. Se mudares lá as cores,
// muda também aqui.
import { useColorScheme } from 'nativewind';

const light = {
  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(223.8136, 0%, 3.9388%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(223.8136, 0%, 3.9388%)',
  popover: 'hsl(0, 0%, 100%)',
  popoverForeground: 'hsl(223.8136, 0%, 3.9388%)',
  primary: 'hsl(223.8136, 0%, 9.0527%)',
  primaryForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  secondary: 'hsl(223.8136, 0.0002%, 96.0587%)',
  secondaryForeground: 'hsl(223.8136, 0%, 9.0527%)',
  muted: 'hsl(223.8136, 0.0002%, 96.0587%)',
  mutedForeground: 'hsl(223.8136, 0%, 45.1519%)',
  accent: 'hsl(223.8136, 0.0002%, 96.0587%)',
  accentForeground: 'hsl(223.8136, 0%, 9.0527%)',
  destructive: 'hsl(351.7303, 100%, 40.5257%)',
  destructiveForeground: 'hsl(0, 0%, 100%)',
  border: 'hsl(223.8136, 0.0001%, 89.8161%)',
  input: 'hsl(223.8136, 0.0001%, 89.8161%)',
  ring: 'hsl(223.8136, 0%, 63.0163%)',
  chart1: 'hsl(211.788, 101.9718%, 78.6759%)',
  chart2: 'hsl(217.4076, 91.3672%, 59.5787%)',
  chart3: 'hsl(221.4336, 86.3731%, 54.0624%)',
  chart4: 'hsl(223.6587, 78.718%, 47.8635%)',
  chart5: 'hsl(226.5426, 70.0108%, 39.9224%)',
  sidebar: 'hsl(223.8136, 0.0004%, 98.0256%)',
  sidebarForeground: 'hsl(223.8136, 0%, 3.9388%)',
  sidebarPrimary: 'hsl(223.8136, 0%, 9.0527%)',
  sidebarPrimaryForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  sidebarAccent: 'hsl(223.8136, 0.0002%, 96.0587%)',
  sidebarAccentForeground: 'hsl(223.8136, 0%, 9.0527%)',
  sidebarBorder: 'hsl(223.8136, 0.0001%, 89.8161%)',
  sidebarRing: 'hsl(223.8136, 0%, 63.0163%)',
  like: 'hsl(349.7, 89.2%, 60.2%)',
} as const;

const dark = {
  background: 'hsl(223.8136, 0%, 3.9388%)',
  foreground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  card: 'hsl(223.8136, 0%, 9.0527%)',
  cardForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  popover: 'hsl(223.8136, 0%, 14.9382%)',
  popoverForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  primary: 'hsl(223.8136, 0.0001%, 89.8161%)',
  primaryForeground: 'hsl(223.8136, 0%, 9.0527%)',
  secondary: 'hsl(223.8136, 0%, 14.9382%)',
  secondaryForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  muted: 'hsl(223.8136, 0%, 14.9382%)',
  mutedForeground: 'hsl(223.8136, 0%, 63.0163%)',
  accent: 'hsl(223.8136, 0%, 25.0471%)',
  accentForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  destructive: 'hsl(358.7594, 100%, 69.8357%)',
  destructiveForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  border: 'hsl(223.8136, 0%, 15.5096%)',
  input: 'hsl(223.8136, 0%, 20.3885%)',
  ring: 'hsl(223.8136, 0%, 45.1519%)',
  chart1: 'hsl(211.788, 101.9718%, 78.6759%)',
  chart2: 'hsl(217.4076, 91.3672%, 59.5787%)',
  chart3: 'hsl(221.4336, 86.3731%, 54.0624%)',
  chart4: 'hsl(223.6587, 78.718%, 47.8635%)',
  chart5: 'hsl(226.5426, 70.0108%, 39.9224%)',
  sidebar: 'hsl(223.8136, 0%, 9.0527%)',
  sidebarForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  sidebarPrimary: 'hsl(225.3451, 84.0953%, 48.9841%)',
  sidebarPrimaryForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  sidebarAccent: 'hsl(223.8136, 0%, 14.9382%)',
  sidebarAccentForeground: 'hsl(223.8136, 0.0004%, 98.0256%)',
  sidebarBorder: 'hsl(223.8136, 0%, 15.5096%)',
  sidebarRing: 'hsl(223.8136, 0%, 32.1993%)',
  like: 'hsl(351.3, 94.5%, 71.3%)',
} as const;

export type ThemeColors = { [K in keyof typeof light]: string };

const colors: { light: ThemeColors; dark: ThemeColors } = { light, dark };

export function useThemeColors(): ThemeColors {
  const { colorScheme: scheme } = useColorScheme();
  return colors[scheme === 'dark' ? 'dark' : 'light'];
}
