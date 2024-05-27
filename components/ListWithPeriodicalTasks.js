import { useState } from "react";
import { View } from "react-native";
import { BSON } from "realm";
import { useRealm, useObject } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { List, Text } from "react-native-paper";

import { PeriodicalTaskScreenName } from '../constants';
import { Goal } from "../models/Tasks";

export default ListWithPeriodicalTasks = ({goalId}) => {
  const realm = useRealm();
  const navigation = useNavigation();

  let goal
  let periodicalTasksQuery
  if (goalId){
    const goalUUID = new BSON.UUID(goalId);
    goal = useObject(Goal, goalUUID)
    periodicalTasksQuery = goal.periodical_tasks
      .filtered('archive == $0', false); 
  } else {
    periodicalTasksQuery = realm.objects("PeriodicalTask")
      .filtered('archive == $0', false); 
    function onPeriodicalTasksChange(tasks, changes) {
      if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
        const periodicalTasksQuery = realm.objects("PeriodicalTask")
          .filtered('archive == $0', false); 
        setPeriodicalTasks(periodicalTasksQuery)
      }
    }
    periodicalTasksQuery.addListener(onPeriodicalTasksChange)
  }
  const [ periodicalTasks, setPeriodicalTasks] = useState(periodicalTasksQuery)

  if (periodicalTasks.length == 0) {
    return (
      <View 
        style={{
          margin: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text variant="bodyMedium">Вы пока не завели ни одной периодической задачи</Text>
      </View>
    )
  }
  return (
    periodicalTasks.map((item, index) => {
      return (
        <List.Item 
          key={item._id.toHexString()}
          title={item.name}
          onLongPress={() => navigation.navigate(name=PeriodicalTaskScreenName, params={taskId: item._id.toHexString()})}
        />
      );
    })
  )
}