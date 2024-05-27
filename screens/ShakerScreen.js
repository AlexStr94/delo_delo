import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { BSON, index } from "realm";
import { useRealm } from "@realm/react";
import { useState } from "react";
import { getTodayDateRange } from '../services/date'
import { getWorkTask } from '../services/tasks'


const getNotDoneWork = (realm) => {
  const [today, tomorrow] = getTodayDateRange();
  objs = realm.objects('TaskWork')
    .filtered('done == $0 && date >= $1 && date < $2', false, today, tomorrow);
  if (objs.length > 0) {
    return objs[0]
  }
  return null
}

function getTask(currentTasksQuery, periodicalTasksQuery) {

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
  } else {
    return null
  }

  let index = Math.floor(Math.random() * tasks.length)
  return tasks[index]
}

export default ShakerScreen = () => {
  const realm = useRealm();
  const currentTasksQuery = realm.objects("CurrentTask")
    .filtered('archive == $0', false); 
  const periodicalTasksQuery = realm.objects("PeriodicalTask")
    .filtered('archive == $0', false);

  function updateTasks (tasks, changes) {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const currentTasksQuery = realm.objects("CurrentTask")
        .filtered('archive == $0', false); 
      const periodicalTasksQuery = realm.objects("PeriodicalTask")
        .filtered('archive == $0', false);
      
      setTask(getTask(currentTasksQuery, periodicalTasksQuery))
    }
  }
  currentTasksQuery.addListener(updateTasks)
  periodicalTasksQuery.addListener(updateTasks)

  const [notDoneWork, setNotDoneWork] = useState(getNotDoneWork(realm))
  const [task, setTask] = useState(getTask(currentTasksQuery, periodicalTasksQuery))

  const handleNextTask = () => {
    setTask(getTask(currentTasksQuery, periodicalTasksQuery))
  }

  const handleCheckTask = () => {
    const uuid = new BSON.UUID()
    realm.write(() => {
      work = realm.create('TaskWork', {_id: uuid, date: new Date(), done: false});
      task.works.push(work)
    });
    setNotDoneWork(work)
  }

  const handleTaskDone = () => {
    let [task, type] = getWorkTask(notDoneWork)
    realm.write(() => {
      notDoneWork.done = true
      if (type == 'current_task') {
        task.archive = true
      }
      setNotDoneWork(null)
      handleNextTask()
    });
  }

  const handleTaskCheckCancel = () => {
    realm.write(() => {
      realm.delete(notDoneWork)
      setNotDoneWork(null)
    });
  }

  return (
    <View 
      style={[task ? styles.taskCard : styles.noTask]}
    >
      { task && 
      <Card>
        <Card.Title title={task.name} left={props => <Avatar.Icon {...props} icon={task.type ? 'calendar-sync' : 'bee'} />} />
        <Card.Content>
          <Text variant="bodyMedium">{task.description}</Text>
        </Card.Content>
        <Card.Actions>
          <View >
            { !notDoneWork &&
            <View style={[styles.actions]}>
              <Button mode="contained" theme={{ colors: { primary: '#805158' } }} icon="close-circle" onPress={() => handleNextTask()}>Следующая</Button>
              <Button mode="contained" icon="check-circle" onPress={() => handleCheckTask()}>Взять</Button>
            </View>
            }
            {
              notDoneWork &&
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
        !task &&
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