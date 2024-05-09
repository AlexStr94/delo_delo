import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen'
import AddCurrentTaskScreen from '../screens/AddCurrentTaskScreen'

const TaskNavigation = createNativeStackNavigator()

export default TaskStackNavigation = () => {
  return (
    <TaskNavigation.Navigator>
      <TaskNavigation.Screen name="Список дел" component={MainScreen} />
      <TaskNavigation.Screen name='Добавить текущую задачу' component={AddCurrentTaskScreen} />
    </TaskNavigation.Navigator>
  )
}