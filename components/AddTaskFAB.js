import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';

import { AddGoalScreenName, AddCurrentTaskScreenName, AddPeriodicalTaskScreenName } from '../constants'

export default AddTaskFAB = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const navigation = useNavigation();

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon='plus'
        actions={[
          {
            icon: 'bullseye-arrow',
            label: 'Цели',
            onPress: () => navigation.navigate(AddGoalScreenName),
          },
          {
            icon: 'bee',
            label: 'Текущие дела',
            onPress: () => navigation.navigate(AddCurrentTaskScreenName),
          },
          {
            icon: 'calendar-sync',
            label: 'Периодические дела',
            onPress: () => navigation.navigate(AddPeriodicalTaskScreenName),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

