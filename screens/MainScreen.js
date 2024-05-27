import { ScrollView } from 'react-native'
import { List, Portal } from 'react-native-paper';

import AddTaskFAB from '../components/AddTaskFAB'
import GetTaskFAB from '../components/GetTaskFAB'
import ListWithGoals from '../components/ListWithGoals'
import ListWithCurrentTasks from '../components/ListWithCurrentTasks'
import ListWithPeriodicalTasks from '../components/ListWithPeriodicalTasks'


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
            <ListWithGoals />
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
