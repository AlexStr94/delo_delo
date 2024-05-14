import { useState } from 'react';
import { ScrollView } from 'react-native'
import { useRealm } from '@realm/react';
import { List } from 'react-native-paper'

import { getTodayDateRange } from '../services/date'


const ListWithDoneWorks = () => {
  const realm = useRealm();
  const [today, tomorrow] = getTodayDateRange();
  const DoneWorksQuery = realm.objects('TaskWork')
    .filtered('done == $0 && date >= $1 && date < $2', true, today, tomorrow);
  const [doneWorks, setDoneWorks] = useState(DoneWorksQuery);

  function onDoneWorksQueryChange(works, changes) {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const DoneWorksQuery = realm.objects('TaskWork')
      .filtered('done == $0 && date >= $1 && date < $2', true, today, tomorrow);
      setDoneWorks(DoneWorksQuery)
    }
  }

  DoneWorksQuery.addListener(onDoneWorksQueryChange)

  return (
    doneWorks.map((work, index) => {
      let task
      if (work.current_task.length > 0) {
        task = work.current_task[0]
      } else if (work.periodical_task.length > 0) {
        task = work.periodical_task[0]
      }

      return (
        <List.Item key={work._id} title={task.name}/>
      );
    })
  )
}

const ListWithNotDoneWorks = () => {
  const realm = useRealm();
  const [today, tomorrow] = getTodayDateRange();
  const NotDoneWorksQuery = realm.objects('TaskWork')
    .filtered('done == $0 && date >= $1 && date < $2', false, today, tomorrow);
  const [notDoneWorks, setNotDoneWorks] = useState(NotDoneWorksQuery);

  function onNotDoneWorksQueryChange(works, changes) {
    if (changes.deletions.length > 0 || changes.insertions.length > 0 || changes.newModifications.length > 0) {
      const NotDoneWorksQuery = realm.objects('TaskWork')
    .filtered('done == $0 && date >= $1 && date < $2', false, today, tomorrow);
      setNotDoneWorks(NotDoneWorksQuery)
    }
  }

  NotDoneWorksQuery.addListener(onNotDoneWorksQueryChange)

  return (
    notDoneWorks.map((work, index) => {
      let task
      if (work.current_task.length > 0) {
        task = work.current_task[0]
      } else if (work.periodical_task.length > 0) {
        task = work.periodical_task[0]
      }

      return (
        <List.Item key={work._id} title={task.name}/>
      );
    })
  )
}

export default TodayWorkScreen = () => {
  return (
    <ScrollView>
      <List.AccordionGroup>
        <List.Accordion
          left={props => <List.Icon {...props} icon="briefcase-check" />}
          title='Выполненные дела' 
          id="4"
        >
          <ListWithDoneWorks />
        </List.Accordion>
        <List.Accordion
          left={props => <List.Icon {...props} icon="briefcase-upload" />}
          title='Взятые дела' 
          id="5"
        >
          <ListWithNotDoneWorks />
        </List.Accordion>
      </List.AccordionGroup>
    </ScrollView>
  )
}