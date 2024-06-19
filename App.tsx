import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from './components/Main'
import DiffDemo from './components/DiffDemo'

export type RootStackParamList = {
  Home: undefined
  DiffDemo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Main} />
        <Stack.Screen name='DiffDemo' component={DiffDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}