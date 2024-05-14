import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import TaskStackNavigation from './TaskStackNavigation'
import ShakerScreen from '../screens/ShakerScreen'
import TodayWorkScreen from '../screens/TodayWorkScreen';

import { TasksScreenName, TodayWorkScreenName } from '../constants'

const BottomTab = createMaterialBottomTabNavigator()


export default BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator >
      <BottomTab.Screen name={TasksScreenName} component={TaskStackNavigation} options={{tabBarIcon: "format-list-checks"}} />
      <BottomTab.Screen name="Шейкер" component={ShakerScreen} options={{tabBarIcon: "chart-bar"}} />
      <BottomTab.Screen name={TodayWorkScreenName} component={TodayWorkScreen} options={{tabBarIcon: "briefcase-eye"}} />
		</BottomTab.Navigator>
	)
}
