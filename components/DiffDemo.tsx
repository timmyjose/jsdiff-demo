import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../App'

export default function DiffDemo() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styes.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  )
}

const styes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
