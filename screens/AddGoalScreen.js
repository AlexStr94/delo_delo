import { useObject, useRealm } from "@realm/react"

import { Goal } from '../models/Tasks'
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { useState } from "react";
import { BSON } from "realm";
import { GoalScreenName } from "../constants";

export default AddGoalScreen = ({ route, navigation }) => {
  const realm = useRealm();
  
  let goal
  if (route.params) {
    const { goalId } = route.params;
    const goalUUID = new BSON.UUID(goalId);
    goal = useObject(Goal, goalUUID);
  }

  const [name, setName] = useState(goal ? goal.name : '');
  const [description, setDescription] = useState(goal ? goal.description : '');
  const [disabledButton, setDisabledButton] = useState(goal ? false : true);

  const updateButton = () => {
    if (name) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }

  const handleAddGoal = () => {
    realm.write(() => {
      goal = realm.create(
        'Goal',
        {
          _id: new BSON.UUID(),
          name: name,
          description: description
        }
      );
    });
    navigation.replace(GoalScreenName , params={goalId: goal._id.toHexString()})
  }

  const handleUpdateGoal = () => {
    realm.write(() => {
      goal.name = name
      goal.description = description
    });
    navigation.replace(GoalScreenName , params={goalId: goal._id.toHexString()})
  }

  return (
    <ScrollView>
      <Card style={[styles.card]}>
        <Card.Content>
          <TextInput
            label="Название цели"
            mode='outlined'
            value={name}
            onChangeText={name => setName(name)}
            onEndEditing={updateButton}
          />
          <View style={styles.spacerStyle} />
          <TextInput
            label="Описание цели"
            mode='outlined'
            multiline={true}
            value={description}
            onChangeText={
              description => setDescription(description)
            }
          />
        </Card.Content>
        <Card.Actions>
        {  
          goal ? 
          <Button 
            icon="pencil"
            mode="contained"
            disabled={disabledButton}
            onPress={() => handleUpdateGoal(goal)}
          >
            Изменить
          </Button> : 
          <Button 
            icon="plus"
            mode="contained"
            disabled={disabledButton}
            onPress={() => handleAddGoal()}
          >
            Добавить
          </Button>
        }
        </Card.Actions>
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