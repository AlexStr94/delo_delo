import { useState } from "react";
import { View, Text } from "react-native"
import { TextInput } from 'react-native-paper'


const TaskName = () => {
  const [text, setText] = useState("");

  return (
    <TextInput
      label="Название задачи"
      mode='outlined'
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

const TaskDesc = () => {
  const [text, setText] = useState("");

  return (
    <TextInput
      label="Описание задачи"
      mode='outlined'
      multiline={true}
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default AddCurrentTaskScreen = () => {
  return (
    <View style={{ flex: 1, }}>
      <TaskName></TaskName>
      <TaskDesc></TaskDesc>
    </View>
  )
}