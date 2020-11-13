import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import FavoritePlayScreen from './screens/favoritePlayer/FavoritePlayerScreen';
import HomeScreen from './screens/home/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* React Navigation */}
      {/* Routing to screens in the app */}
      {/* Stack: it is like a box */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="FavoritePlayScreen"
            component={FavoritePlayScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
