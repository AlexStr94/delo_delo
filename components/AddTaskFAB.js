import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal} from 'react-native-paper';

import {AddGoalScreenName, AddCurrentTaskScreenName, AddPeriodicalTaskScreenName } from '../constants'

const AddTaskFAB = () => {
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
				style={{bottom: 80}}
        		backdropColor='transparent'
				theme={{ colors: { backdrop: 'transparent' } }}
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

export default AddTaskFAB;