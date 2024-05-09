import React from 'react';
import {View, Text, ScrollView} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import MainScreen from './screens/MainScreen'


const BottomTabNavigation = createMaterialBottomTabNavigator()


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <ScrollView>
        <View><Text>Hiii!!!</Text></View>
      </ScrollView>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigation.Navigator >
        <BottomTabNavigation.Screen name="Дела" component={MainScreen} options={{tabBarIcon: "format-list-checks"}} />
        <BottomTabNavigation.Screen name="Статистика" component={DetailsScreen} options={{tabBarIcon: "chart-bar"}} />
      </BottomTabNavigation.Navigator>
    </NavigationContainer>
  )
}



export default App;
