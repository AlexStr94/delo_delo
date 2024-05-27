import { useState } from "react";
import { BSON } from "realm";
import { useRealm, useObject} from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

import { CurrentTaskScreenName } from '../constants'
import { Goal } from '../models/Tasks'

export default ListWithCurrentTasks = ({goalId}) => {
  const realm = useRealm();
  const navigation = useNavigation();

  let goal
  let currentTasksQuery
  if (goalId) {
    const goalUUID = new BSON.UUID(goalId);
    goal = useObject(Goal, goalUUID)
    currentTasksQuery = goal.current_tasks
      .filtered('archive == $0', false); 
  } else {
    currentTasksQuery = realm.objects("CurrentTask")
      .filtered('archive == $0', false);

    function onCurrentTasksChange(tasks, changes) {
      if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
        const currentTasksQuery = realm.objects("CurrentTask")
          .filtered('archive == $0', false); 
        setCurrentTasks(currentTasksQuery)
      }
    }
    currentTasksQuery.addListener(onCurrentTasksChange)
  }

  const [currentTasks, setCurrentTasks] = useState(currentTasksQuery);

  return (
    currentTasks.map((item, index) => {
      return (
        <List.Item 
          key={item._id.toHexString()}
          title={item.name}
          onLongPress={() => navigation.navigate(name=CurrentTaskScreenName, params={taskId: item._id.toHexString()})}
        />
      );
    })
  )
}