import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import WeeklySummaryScreen from './src/screens/WeeklySummaryScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EntriesProvider } from './src/context/EntriesContext';

const Stack = createStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
  },
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <EntriesProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'AI Günlük Asistanım' }}
              />
              <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{ title: 'Geçmiş' }}
              />
              <Stack.Screen
                name="WeeklySummary"
                component={WeeklySummaryScreen}
                options={{ title: 'Haftalık Özet' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </EntriesProvider>
    </SafeAreaProvider>
  );
}

export default App;
