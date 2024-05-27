import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native"
import { BSON } from "realm";
import { useRealm, useObject } from '@realm/react'
import { Button, Card, TextInput } from 'react-native-paper'

import { CurrentTask, Goal } from '../models/Tasks'
import { CurrentTaskScreenName } from '../constants'


export default AddCurrentTaskScreen = ({ route, navigation }) => {
  let task
  let goal
  if (route.params){
    const {taskId, goalId} = route.params;
    if (taskId) {
      const taskUUID = new BSON.UUID(taskId)
      task = useObject(CurrentTask, taskUUID)
    }
    if (goalId) {
      const goalUUID = new BSON.UUID(goalId)
      goal = useObject(Goal, goalUUID)
    }
  }

  const [name, setName] = useState(task ? task.name : '');
  const [desc, setDesc] = useState(task ? task.description : '');

  const realm = useRealm();

  const handleAddCurrentTask = () => {
    const uuid = new BSON.UUID()
    realm.write(() => {
      task = realm.create('CurrentTask', {_id: uuid, name: name, description: desc});
      if (goal) {
        goal.current_tasks.push(task)
      }
    });
    navigation.replace(CurrentTaskScreenName , params={taskId: task._id.toHexString()})
  };

  const handleUpdateCurrentTask = (task) => {
    realm.write(() => {
      task.name = name;
      task.description = desc
    });
    navigation.replace(CurrentTaskScreenName , params={taskId: task._id.toHexString()})
  }

  return (
    <ScrollView>
      <Card style={[styles.card]}>
        <Card.Content>
          <TextInput
            label="Название задачи"
            mode='outlined'
            value={name}
            onChangeText={name => setName(name)}
          />
          <View style={styles.spacerStyle} />
          <TextInput
            label="Описание задачи"
            mode='outlined'
            multiline={true}
            value={desc}
            onChangeText={desc => setDesc(desc)}
          />
          <View style={styles.spacerStyle} />
        </Card.Content>
        <Card.Actions>
        {
          task ? 
          <Button 
            icon="pencil"
            mode="contained"
            onPress={() => handleUpdateCurrentTask(task)}
          >
            Изменить
          </Button> : 
          <Button icon="plus" mode="contained" onPress={() => handleAddCurrentTask()}>
            Добавить
          </Button>
        }
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  spacerStyle: {
    marginBottom: 15,
  },
});