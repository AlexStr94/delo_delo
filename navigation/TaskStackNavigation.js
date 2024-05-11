import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen'
import AddCurrentTaskScreen from '../screens/AddCurrentTaskScreen'
import CurrentTaskScreen from '../screens/CurrentTaskScreen';
import { 
  CurrentTaskScreenName,
  AddCurrentTaskScreenName,
  UpdateCurrentTaskScreenName 
} from '../constants';

const TaskNavigation = createNativeStackNavigator()

export default TaskStackNavigation = () => {
  return (
    <TaskNavigation.Navigator>
      <TaskNavigation.Screen name="Список дел" component={MainScreen} />
      <TaskNavigation.Screen name={AddCurrentTaskScreenName} component={AddCurrentTaskScreen} />
      <TaskNavigation.Screen name={UpdateCurrentTaskScreenName} component={AddCurrentTaskScreen} />
      <TaskNavigation.Screen name={CurrentTaskScreenName} component={CurrentTaskScreen} />
    </TaskNavigation.Navigator>
  )
}