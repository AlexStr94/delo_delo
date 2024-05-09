import { Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';
import AddTaskFAB from '../components/AddTaskFAB'
import GetTaskFAB from '../components/GetTaskFAB'


export default MainScreen = () => {
  return (
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
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
          <List.Item title="Item 2" />
        </List.Accordion>
        <List.Accordion 
          left={props => <List.Icon {...props} icon="calendar-sync" />}
          title="Периодические дела" 
          id="3"
        >
          <List.Item title="Item 3" />
        </List.Accordion>
      </List.AccordionGroup>
      <AddTaskFAB></AddTaskFAB>
      <GetTaskFAB></GetTaskFAB>
    </ScrollView>
  )
}
