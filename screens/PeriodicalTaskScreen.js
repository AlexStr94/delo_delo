import { ScrollView} from "react-native"
import { BSON } from "realm";
import { useRealm, useObject } from "@realm/react";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { PeriodicalTask } from "../models/Tasks";

import { UpdatePeriodicalTaskScreenName, TaskListScreenName, weekDays } from "../constants";

export default PeriodicalTaskScreen = ({ route, navigation }) => {
  const realm = useRealm();

  const {taskId} = route.params;
  const taskUUID = new BSON.UUID(taskId)
  const task = useObject(PeriodicalTask, taskUUID)
  let days
  if (task.days.length > 0){
    days = 'Предпочитаемые дни: '
  }
  if (task.type === 'week') {

    task.days.map((item, index) => {
      let day = weekDays.find(({ value }) => parseInt(value) === item); 
      days += `${index != 0 ? ', ' : ''}${day.label.toLowerCase()}${index === task.days.length - 1 ? '.' : ''}`
    });
  } else {
    task.days.map((item, index) => {
      days +=`${index != 0 ? ', ' : ''}${item}${index === task.days.length - 1 ? ' число.' : ''}`
    });
  }

  const handleDeletePeriodicalTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
    navigation.navigate(TaskListScreenName)
  }

  const LeftContent = props => <Avatar.Icon {...props} icon="calendar-sync" />
  return (
    <ScrollView>
      <Card>
        <Card.Title title={task.name} left={LeftContent} />
        <Card.Content>
          <Text variant="bodyMedium">{task.description}</Text>
          <Text>
            Периодичность: повторять 
            {task.type === 'week' ? ' каждую неделю' : ' каждый месяц'} {task.number} раз.
          </Text>
          <Text>{days}</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="delete" onPress={() => handleDeletePeriodicalTask()}>Удалить</Button>
          <Button 
            icon="pencil"
            onPress={() => navigation.replace(UpdatePeriodicalTaskScreenName , params={taskId: taskId, goalId: null})} 
          >
            Изменить
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
}