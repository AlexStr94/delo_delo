import { View, Text, ScrollView } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import TaskStackNavigation from './TaskStackNavigation'
import { TasksScreenName } from '../constants'

const BottomTab = createMaterialBottomTabNavigator()


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

export default BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator >
      <BottomTab.Screen name={TasksScreenName} component={TaskStackNavigation} options={{tabBarIcon: "format-list-checks"}} />
      <BottomTab.Screen name="Статистика" component={DetailsScreen} options={{tabBarIcon: "chart-bar"}} />
		</BottomTab.Navigator>
	)
}
