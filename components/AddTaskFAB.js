import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal} from 'react-native-paper';

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
				style={{bottom: 170, right: 10}}
				actions={[
					{
						icon: 'bullseye-arrow',
						label: 'Цели',
						onPress: () => console.log('Pressed star'),
					},
					{
						icon: 'bee',
						label: 'Текущие дела',
						onPress: () => navigation.navigate('Добавить текущую задачу'),
					},
					{
						icon: 'calendar-sync',
						label: 'Периодические дела',
						onPress: () => navigation.navigate('Добавить текущую задачу'),
					},
				]}
				onStateChange={onStateChange}
				onPress={() => {
					if (open) {
						// do something if the speed dial is open
					}
				}}
			/>
			

		</Portal>
  );
};

export default AddTaskFAB;