import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

const AddTaskFAB = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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
						onPress: () => console.log('Pressed email'),
					},
					{
						icon: 'calendar-sync',
						label: 'Периодические дела',
						onPress: () => console.log('Pressed notifications'),
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