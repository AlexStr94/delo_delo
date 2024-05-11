import { ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { useRealm } from '@realm/react';
import { List, Portal } from 'react-native-paper';

import AddTaskFAB from '../components/AddTaskFAB'
import GetTaskFAB from '../components/GetTaskFAB'
import { CurrentTaskScreenName } from '../constants'


const ListWithNames = ({query}) => {
  const navigation = useNavigation();
  return (
    query.map((item, index) => {
      return (
        <List.Item title={item.name} onLongPress={() => navigation.push(CurrentTaskScreenName , params={taskId: item._id})}/>
      );
    })
  )
}

export default MainScreen = () => {
  const realm = useRealm();
  const currentTasks = realm.objects("CurrentTask");
  
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
          <ListWithNames query={currentTasks}/>
        </List.Accordion>
        <List.Accordion 
          left={props => <List.Icon {...props} icon="calendar-sync" />}
          title="Периодические дела" 
          id="3"
        >
          <List.Item title="Item 3" />
        </List.Accordion>
      </List.AccordionGroup>
      <GetTaskFAB></GetTaskFAB>
      <AddTaskFAB />
    </ScrollView>
    </Portal.Host>
  )
}
