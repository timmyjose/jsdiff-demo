import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../App'
import { useState } from 'react'
import { getData, storeData } from '../backup/backupAgent'
import { Backup } from '../backup/format'

export default function DiffDemo() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [nonce, setNonce] = useState<number>(0)
  const [backupData, setBackupData] = useState<string>('')

  const handleStoreData = async () => {
    const backup: Backup = {
      name,
      address: {
        country
      },
      nonce,
      timestamp: Date.now(),
    }

    await storeData(backup)
  }

  const handleGetData = async () => {
    const data = await getData(3)

    if (data === null) {
      Alert.alert('No valid backup data found')
      return
    } else {
      setBackupData(JSON.stringify(data, null, 2))
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <TextInput
        style={styles.input}
        placeholder='Enter name'
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter country'
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter country'
        value={nonce.toString()}
        onChangeText={text => {
          const parsedVal = parseInt(text)
          setNonce(isNaN(parsedVal) ? 0 : parsedVal)
        }}
      />
      <Button title='Store Data' onPress={handleStoreData} />
      <Button title='Get Data' onPress={handleGetData} />
      <ScrollView>
        <Text>{backupData}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 20,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1
  }
})
