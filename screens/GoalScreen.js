import { View } from "react-native"
import { BSON } from "realm";
import { useObject, useRealm } from "@realm/react"

import { Goal } from '../models/Tasks'
import { Avatar, Button, Card, IconButton, List, Text } from "react-native-paper"
import { ScrollView, StyleSheet } from "react-native"

import { AddCurrentTaskScreenName, AddPeriodicalTaskScreenName, TaskListScreenName, UpdateGoalScreenName } from '../constants'
import ListWithCurrentTasks from '../components/ListWithCurrentTasks'
import ListWithPeriodicalTasks from '../components/ListWithPeriodicalTasks'

export default GoalScreen = ({ route, navigation }) => {
  const realm = useRealm()

  const {goalId} = route.params
  const goalUUID = new BSON.UUID(goalId);
  const goal = useObject(Goal, goalUUID)

  const handleDeleteGoal = () => {
    realm.write(() => {
      realm.delete(goal.current_tasks)
      realm.delete(goal)
    });
    navigation.navigate(TaskListScreenName)
  }

  const addCurrentTask = () => {
    navigation.navigate(AddCurrentTaskScreenName, params={taskId: null, goalId: goalId})
  }
  
  const addPeriodicalTask = () => {
    navigation.navigate(AddPeriodicalTaskScreenName, params={taskId: null, goalId: goalId})
  }
  
  return (
    <ScrollView>
      <Card style={[styles.card]}>
        <Card.Title 
          title={goal.name} 
          left={(props) => <Avatar.Icon {...props} icon="target"/>} 
        />
        <Card.Content>
          <Text variant="bodyMedium">{goal.description}</Text>
        </Card.Content>  
        <Card.Actions>
          <Button icon="delete" onPress={() => handleDeleteGoal()}>Удалить</Button>
          <Button icon="pencil" onPress={() => navigation.replace(UpdateGoalScreenName, params={goalId: goalId})} >Изменить</Button>
        </Card.Actions>   
      </Card>
      <Card style={[styles.card]}>
        <Card.Title 
          title='Текущие задачи'
          right={(props) => <IconButton {...props} icon="plus" onPress={() => addCurrentTask()} />}
        />
        <Card.Content>
          <List.Section>
            <ListWithCurrentTasks goalId={goalId} />
          </List.Section>
        </Card.Content>
      </Card>
      <Card style={[styles.card]}>
        <Card.Title 
          title='Периодические задачи'
          right={(props) => <IconButton {...props} icon="plus" onPress={() => addPeriodicalTask()} />}
        />
        <Card.Content>
          <List.Section>
            <ListWithPeriodicalTasks goalId={goalId} />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  spacerStyle: {
    marginBottom: 15,
  },
});