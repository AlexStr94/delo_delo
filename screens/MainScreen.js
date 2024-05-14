import { ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { useRealm } from '@realm/react';
import { List, Portal } from 'react-native-paper';

import AddTaskFAB from '../components/AddTaskFAB'
import GetTaskFAB from '../components/GetTaskFAB'
import { CurrentTaskScreenName, PeriodicalTaskScreenName } from '../constants'
import { useState } from 'react';


const ListWithCurrentTasks = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const currentTasksQuery = realm.objects("CurrentTask")
    .filtered('archive == $0', false); 
  const [currentTasks, setCurrentTasks] = useState(currentTasksQuery);

  function onCurrentTasksChange(tasks, changes) {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const currentTasksQuery = realm.objects("CurrentTask")
        .filtered('archive == $0', false); 
      setCurrentTasks(currentTasksQuery)
    }
  }

  currentTasksQuery.addListener(onCurrentTasksChange)

  return (
    currentTasks.map((item, index) => {
      return (
        <List.Item key={item._id} title={item.name} onLongPress={() => navigation.push(CurrentTaskScreenName , params={taskId: item._id})}/>
      );
    })
  )
}

const ListWithPeriodicalTasks = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const periodicalTasksQuery = realm.objects("PeriodicalTask")
    .filtered('archive == $0', false); 
  const [ periodicalTasks, setPeriodicalTasks] = useState(periodicalTasksQuery)

  function onPeriodicalTasksChange(tasks, changes) {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const periodicalTasksQuery = realm.objects("PeriodicalTask")
        .filtered('archive == $0', false); 
      setPeriodicalTasks(periodicalTasksQuery)
    }
  }
  periodicalTasksQuery.addListener(onPeriodicalTasksChange)

  return (
    periodicalTasks.map((item, index) => {
      return (
        <List.Item key={item._id} title={item.name} onLongPress={() => navigation.push(PeriodicalTaskScreenName, params={taskId: item._id})}/>
      );
    })
  )
}

export default MainScreen = () => {
  return (
    <Portal.Host>
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion 
            left={props => <List.Icon {...props} icon="bullseye-arrow" />}
            title="Цели" 
            id="1"
          >
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion 
            left={props => <List.Icon {...props} icon="bee" />}
            title="Текущие дела" 
            id="2"
          >
            <ListWithCurrentTasks/>
          </List.Accordion>
          <List.Accordion 
            left={props => <List.Icon {...props} icon="calendar-sync" />}
            title="Периодические дела" 
            id="3"
          >
            <ListWithPeriodicalTasks />
          </List.Accordion>
        </List.AccordionGroup>
        <GetTaskFAB></GetTaskFAB>
        <AddTaskFAB />
      </ScrollView>
    </Portal.Host>
  )
}
