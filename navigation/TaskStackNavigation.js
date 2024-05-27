import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen'
import AddGoalScreen from '../screens/AddGoalScreen';
import AddCurrentTaskScreen from '../screens/AddCurrentTaskScreen'
import CurrentTaskScreen from '../screens/CurrentTaskScreen';
import AddPeriodicalTaskScreen from '../screens/AddPeriodicalTaskScreen';
import PeriodicalTaskScreen from '../screens/PeriodicalTaskScreen'
import { 
  AddGoalScreenName,
  TaskListScreenName,
  CurrentTaskScreenName,
  AddCurrentTaskScreenName,
  UpdateCurrentTaskScreenName,
  AddPeriodicalTaskScreenName,
  UpdatePeriodicalTaskScreenName,
  PeriodicalTaskScreenName,
  GoalScreenName,
  UpdateGoalScreenName
} from '../constants';
import GoalScreen from '../screens/GoalScreen';

const TaskNavigation = createNativeStackNavigator()

export default TaskStackNavigation = () => {
  return (
    <TaskNavigation.Navigator>
      <TaskNavigation.Screen name={TaskListScreenName} component={MainScreen} />

      <TaskNavigation.Screen name={GoalScreenName} component={GoalScreen} />
      <TaskNavigation.Screen name={AddGoalScreenName} component={AddGoalScreen} />
      <TaskNavigation.Screen name={UpdateGoalScreenName} component={AddGoalScreen} />

      <TaskNavigation.Screen name={AddCurrentTaskScreenName} component={AddCurrentTaskScreen} />
      <TaskNavigation.Screen name={UpdateCurrentTaskScreenName} component={AddCurrentTaskScreen} />
      <TaskNavigation.Screen name={CurrentTaskScreenName} component={CurrentTaskScreen} />
      <TaskNavigation.Screen name={AddPeriodicalTaskScreenName} component={AddPeriodicalTaskScreen} />
      <TaskNavigation.Screen name={UpdatePeriodicalTaskScreenName} component={AddPeriodicalTaskScreen} />
      <TaskNavigation.Screen name={PeriodicalTaskScreenName} component={PeriodicalTaskScreen} />
    </TaskNavigation.Navigator>
  )
}