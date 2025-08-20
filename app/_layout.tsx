import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lift!</Text>
      </View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </QueryClientProvider>
  );

}
  const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10, // optional (for status bar spacing on some devices)
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
});
