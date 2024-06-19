import { Alert } from 'react-native'
import { Backup } from './format'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export const storeData = async (data: Backup) => {
  const key = uuidv4()
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
    console.log('Saved backup with key ', key)
  } catch (err: any) {
    console.error(err)
    Alert.alert(`Error while storing data with key: ${key}: ${err}`)
  }
}

// Return the last `numBackups` values as diffs
export const getData = async (numBackups: number): Promise<Backup[]> => {
  const allBackups = await getAllBackups()

  if (allBackups.length <= 1) {
    return allBackups
  }

  const diffs = calculateDiffs(allBackups, numBackups)
  diffs.reverse()

  return diffs
}

const getAllBackups = async (): Promise<Backup[]> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys()

    const allBackups: Backup[] = []
    await Promise.all(allKeys.map(async key => {
      const backup = await AsyncStorage.getItem(key)
      const backupJSON = JSON.parse(backup ?? '')
      allBackups.push(backupJSON)
    }))

    allBackups.sort((b1, b2) => {
      return b1.timestamp - b2.timestamp
    })
    console.log('allBackups = ', allBackups)
    return allBackups
  } catch (err: any) {
    console.error('Error while retrieving all keys: ', err)
    Alert.alert(`Error while retrieving all keys: ${err}`)
    return []
  }
}

const calculateDiffs = (backups: Backup[], numBackups: number): any[] => {
  const backupDiffs = [];
  const startIndex = Math.max(0, backups.length - numBackups - 1)

  for (let i = startIndex; i < backups.length - 1; i++) {
    const oldBackup = backups[i];
    const newBackup = backups[i + 1]
    const diff = {}

    if (oldBackup.name !== newBackup.name) {
      diff['name'] = { old: oldBackup.name, new: newBackup.name }
    }

    if (oldBackup.address.country !== newBackup.address.country) {
      diff['address'] = { old: oldBackup.address.country, new: newBackup.address.country }
    }

    if (oldBackup.nonce !== newBackup.nonce) {
      diff['nonce'] = { old: oldBackup.nonce, new: newBackup.nonce }
    }

    if (oldBackup.timestamp !== newBackup.timestamp) {
      diff['timestamp'] = { old: oldBackup.timestamp, new: newBackup.timestamp }
    }

    backupDiffs.push(diff)
  }

  return backupDiffs
}