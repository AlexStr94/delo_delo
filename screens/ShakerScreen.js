import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BSON } from "realm";
import { useRealm } from "@realm/react";
import { Avatar, Button, Card, Text } from "react-native-paper";

import { getTodayDateRange } from '../services/date'
import { getWorkTask } from '../services/tasks'


function getContext(realm) {
  let work = null
  let task = null
  const [today, tomorrow] = getTodayDateRange();
  let works = realm.objects('TaskWork')
    .filtered('done == $0 && date >= $1 && date < $2', false, today, tomorrow);
  if (works.length > 0) {
    work = works[0]
    task = work.current_task.length > 0 ? work.current_task[0] : work.periodical_task[0]
  } else {
    const currentTasksQuery = realm.objects("CurrentTask")
      .filtered('archive == $0', false); 
    const periodicalTasksQuery = realm.objects("PeriodicalTask")
      .filtered('archive == $0', false);

    const maxLength = Math.max(currentTasksQuery.length, periodicalTasksQuery.length);

    let tasks = []
    if (maxLength > 0) {
      for (let i = 0; i < maxLength; i++) {
        if (currentTasksQuery.length > i){
          tasks.push(currentTasksQuery[i])
        }
        if (periodicalTasksQuery.length > i){
          tasks.push(periodicalTasksQuery[i])
        }
      }
      let index = Math.floor(Math.random() * tasks.length)
      task = tasks[index]
    }
  }

  return {
    'task': task,
    'work': work
  }
}

export default ShakerScreen = ({navigation}) => {
  const realm = useRealm();
  useEffect(() => {
    navigation.addListener('focus', () => {
      setContext(getContext(realm))
      console.log(context)
    });
  }, [navigation]);
  
  const [context, setContext] = useState(getContext(realm))

  const handleNextTask = () => {
    setContext(getContext(realm))
  }

  const handleCheckTask = () => {
    const uuid = new BSON.UUID()
    realm.write(() => {
      work = realm.create('TaskWork', {_id: uuid, date: new Date(), done: false});
      let task = context['task']
      task.works.push(work)
    });
    setContext(getContext(realm))
    console.log(context)
  }

  const handleTaskDone = () => {
    let [task, type] = getWorkTask(context['work'])
    realm.write(() => {
      context['work'].done = true
      if (type == 'current_task') {
        task.archive = true
      }
      handleNextTask()
    });
  }

  const handleTaskCheckCancel = () => {
    realm.write(() => {
      realm.delete(notDoneWork)
    });
    handleNextTask()
  }

  return (
    <View 
      style={[context['task'] ? styles.taskCard : styles.noTask]}
    >
      { context['task'] && 
      <Card>
        <Card.Title title={context['task'].name} left={props => <Avatar.Icon {...props} icon={context['task'].type ? 'calendar-sync' : 'bee'} />} />
        <Card.Content>
          <Text variant="bodyMedium">{context['task'].description}</Text>
        </Card.Content>
        <Card.Actions>
          <View >
            { !context['work'] &&
            <View style={[styles.actions]}>
              <Button mode="contained" theme={{ colors: { primary: '#805158' } }} icon="close-circle" onPress={() => handleNextTask()}>Следующая</Button>
              <Button mode="contained" icon="check-circle" onPress={() => handleCheckTask()}>Взять</Button>
            </View>
            }
            {
              context['work'] &&
              <View style={[styles.actions]}>
                <Button mode="contained" theme={{ colors: { primary: '#805158' } }} icon="close-circle" onPress={() => handleTaskCheckCancel()}>Отменить</Button>
                <Button mode="contained" icon="check-circle" onPress={() => handleTaskDone()}>Сделано</Button>
              </View>
            }
          </View>
        </Card.Actions>
      </Card>
      }
      {
        !context['task'] &&
        <Text style={[styles.noTaskText]}>Вы пока не завели ни одной задачи</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  taskCard: {
    margin: 10
  },
  noTask: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTaskText: {
    fontSize: 20
  },
  actions: {
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});