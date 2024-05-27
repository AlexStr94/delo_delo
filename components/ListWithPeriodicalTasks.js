import { useState } from "react";
import { BSON } from "realm";
import { useRealm, useObject } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

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