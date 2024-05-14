import { ScrollView} from "react-native"
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useRealm, useObject } from "@realm/react";
import { CurrentTask } from "../models/Tasks";

import { UpdateCurrentTaskScreenName, TaskListScreenName } from '../constants'

export default CurrentTaskScreen = ({ route, navigation }) => {
  const realm = useRealm();
  
  const {taskId} = route.params;
  const task = useObject(CurrentTask, taskId)
  
  const handleDeletePeriodicalTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
    navigation.navigate(TaskListScreenName)
  }

  const LeftContent = props => <Avatar.Icon {...props} icon="bee" />
  return (
    <ScrollView style={{margin: 10}}>
      <Card>
        <Card.Title title={task.name} left={LeftContent} />
        <Card.Content>
          <Text variant="bodyMedium">{task.description}</Text>
        </Card.Content>
        <Card.Actions>
        <Button icon="delete" onPress={() => handleDeletePeriodicalTask()}>Удалить</Button>
          <Button icon="pencil" onPress={() => navigation.replace(UpdateCurrentTaskScreenName , params={taskId: taskId})} >Изменить</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
}