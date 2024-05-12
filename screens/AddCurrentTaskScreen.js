import { useState } from "react";
import { ScrollView } from "react-native"
import { BSON } from "realm";
import { useRealm, useObject } from '@realm/react'
import { useNavigation } from "@react-navigation/native";
import { Button, Card, TextInput } from 'react-native-paper'

import { CurrentTask } from '../models/Tasks'
import { CurrentTaskScreenName } from '../constants'


const CurrentTaskForm = ({ task }) => {
  const [name, setName] = useState(task ? task.name : '');
  const [desc, setDesc] = useState(task ? task.description : '');

  const realm = useRealm();

  const navigation = useNavigation();

  const handleAddCurrentTask = () => {
    const uuid = new BSON.UUID()
    realm.write(() => {
      task = realm.create('CurrentTask', {_id: uuid, name: name, description: desc});
    });
    navigation.replace(CurrentTaskScreenName , params={taskId: task._id})
  };

  const handleUpdateCurrentTask = (task) => {
    realm.write(() => {
      task.name = name;
      task.description = desc
    });
    navigation.replace(CurrentTaskScreenName , params={taskId: task._id})
  }

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <TextInput
            label="Название задачи"
            mode='outlined'
            value={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            label="Описание задачи"
            mode='outlined'
            multiline={true}
            value={desc}
            onChangeText={desc => setDesc(desc)}
          />
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



export default AddCurrentTaskScreen = ({ route, navigation }) => {
  let task
  if (route.params){
    const {taskId} = route.params;
    task = useObject(CurrentTask, taskId)
  }

  return (
    <CurrentTaskForm task={task}></CurrentTaskForm>
    
  )
}