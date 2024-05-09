import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import BottomTabNavigation from './navigation/BottomTabNavigation'


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  )
}



export default App;
