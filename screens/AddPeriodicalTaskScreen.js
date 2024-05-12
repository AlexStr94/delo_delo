import { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native"
import { BSON } from "realm";
import { useRealm, useObject } from '@realm/react'
import { Button, Card, SegmentedButtons, Text, TextInput } from 'react-native-paper'
import DropDown from "react-native-paper-dropdown";

import { PeriodicalTask } from '../models/Tasks'
import { PeriodicalTaskScreenName, periodicalTaskTypes, weekDays, monthDays } from "../constants";

export default AddPeriodicalTaskScreen = ({ route, navigation }) => {
  const realm = useRealm();

  let task
  if (route.params){
    const {taskId} = route.params;
    task = useObject(PeriodicalTask, taskId)
  }

  const [name, setName] = useState(task ? task.name : '');
  const [type, setType] = useState(task ? task.type : '');
  const [desc, setDesc] = useState(task ? task.description : '');
  const [numberInputLabel, setNumberInputLabel] = useState('Количество повторений в период');
  const [number, setNumber] = useState(task ? task.number.toString() : '');
  const [showDaysSelect, setShowDaysSelect] = useState(task ? true : false)
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [daysVariants, setDaysVariants] = useState(task ? task.type === 'week' ? weekDays : monthDays : [])
  const [days, setDays] =  useState(task ? task.days.toString() : '')
  const [disabledButton, setDisabledButton] = useState(task ? false : true)

  const updateButton = () => {
    console.log(type)
    if (name && type && number) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }

  const handlerNameChange = (name) => {
    setName(name)
  }

  const handlerTypeChange = (type) => {
    setType(type)
    if (type === 'week') {
      setNumberInputLabel('Количество повторений в неделю')
      setDaysVariants(weekDays)
    } else if (type === 'month') {
      setNumberInputLabel('Количество повторений в месяц')
      setDaysVariants(monthDays)
    } 
    setShowDaysSelect(true)
    setDays('')
  }

  const handlerNumberChange = (number) => {
    setNumber(parseInt(number))
  }

  const handleAddPeriodicalTask = () => {
    // добавить проверку, что нужные данные введены
    const uuid = new BSON.UUID()
    let daysNum = []
    if (days.startsWith(',')) {
      days = days.slice(1)
    }
    if (days) {
      daysNum = Array.from(
        days.slice(1).split(/\s*,\s*/), (value, index) => parseInt(value)
      )
    }
    realm.write(() => {
      task = realm.create(
        'PeriodicalTask', 
        {
          _id: uuid,
          name: name,
          description: desc,
          type: type,
          number: number,
          days: daysNum
        }
      );
    });
    console.log(task)
    navigation.replace(PeriodicalTaskScreenName , params={taskId: task._id})
  };

  const handleUpdatePeriodicalTask = () => {
    let daysNum = []
    if (days) {
      if (days.startsWith(',')) {
        days = days.slice(1)
      }
      daysNum = Array.from(
        days.split(/\s*,\s*/), (value, index) => parseInt(value)
      )
    }
    console.log(desc)
    realm.write(() => {
      task.name = name;
      task.description = desc;
      task.type = type
      task.number = parseInt(number)
      task.days = daysNum
    });
    navigation.replace(PeriodicalTaskScreenName , params={taskId: task._id})
  }

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          {/* <Text>Название задачи:</Text> */}
          <View style={styles.spacerStyle} />
          <TextInput
            label="Название задачи"
            mode='outlined'
            value={name}
            onChangeText={name => handlerNameChange(name)}
            onEndEditing={updateButton}
          />
          <View style={styles.spacerStyle} />
          <TextInput
            label="Описание задачи"
            mode='outlined'
            multiline={true}
            value={desc}
            onChangeText={desc => setDesc(desc)}
          />
          <View style={styles.spacerStyle} />
          <Text>Период повторения: </Text>
          <View style={styles.spacerStyle} />
          <SegmentedButtons
            value={type}
            onValueChange={type => handlerTypeChange(type)}
            onEndEditing={updateButton}
            buttons={periodicalTaskTypes}
          />
          <View style={styles.spacerStyle} />
          {/* <Text>Количество повторений в период</Text> */}
          <View style={styles.spacerStyle} />
          <TextInput
            label={numberInputLabel}
            mode='outlined'
            keyboardType="numeric"
            value={number}
            onChangeText={number => handlerNumberChange(number)}
            onEndEditing={updateButton}
          />
          { 
            showDaysSelect &&
            <View>
              <View style={styles.spacerStyle} />
              <Text>Предпочитаемые дни</Text>
              <View style={styles.spacerStyle} />
              <DropDown
                label="Предпочитаемые дни"
                mode="outlined"
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={days}
                setValue={setDays}
                list={daysVariants}
                multiSelect
              />
            </View>
          } 
        </Card.Content>
        <Card.Actions>

        {  
          task ? 
          <Button 
            icon="pencil"
            mode="contained"
            disabled={disabledButton}
            onPress={() => handleUpdatePeriodicalTask(task)}
          >
            Изменить
          </Button> : 
          <Button 
            icon="plus"
            mode="contained"
            disabled={disabledButton}
            onPress={() => handleAddPeriodicalTask()}
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
  spacerStyle: {
    marginBottom: 15,
  },

});