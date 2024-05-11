import { ScrollView} from "react-native"
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useObject } from "@realm/react";
import { CurrentTask } from "../models/Tasks";

import { UpdateCurrentTaskScreenName } from '../constants'

export default TaskScreen = ({ route, navigation }) => {
  const {taskId} = route.params;
  const task = useObject(CurrentTask, taskId)
  
  const LeftContent = props => <Avatar.Icon {...props} icon="bee" />
  return (
    <ScrollView>
      <Card>
        <Card.Title title={task.name} left={LeftContent} />
        <Card.Content>
          <Text variant="bodyMedium">{task.description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace(UpdateCurrentTaskScreenName , params={taskId: taskId})} >Изменить</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
}