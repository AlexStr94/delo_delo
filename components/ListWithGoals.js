import { useState } from "react";
import { useRealm } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

import { GoalScreenName } from '../constants'

export default ListWithGoals = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const goalsQuery = realm.objects('Goal')
    .filtered('archive == $0', false); 
  const [goals, setGoals] = useState(goalsQuery);

  const onGoalsQueryChange = (goals, changes) => {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const goalsQuery = realm.objects('Goal')
        .filtered('archive == $0', false); 
      setGoals(goalsQuery)
    }
  }

  goalsQuery.addListener(onGoalsQueryChange)
  return (
    goals.map((item, index) => {
      return (
        <List.Item 
          key={item._id.toHexString()}
          title={item.name}
          onLongPress={() => navigation.navigate(name=GoalScreenName , params={goalId: item._id.toHexString()})}
        />
      );
    })
  )
}