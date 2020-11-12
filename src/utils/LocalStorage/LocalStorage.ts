import AsyncStorage from '@react-native-community/async-storage';

export async function saveObject(key: string, data: Array<any>) {
  const jsonValue = JSON.stringify(data);
  saveData(key, jsonValue);
}

export async function saveArray(key: string, data: Array<any>) {
  const jsonValue = JSON.stringify(data);
  saveData(key, jsonValue);
}

export async function saveData(key: string, data: string) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getArrayData(key: string) {
  const value = await getData(key);
  return value ? JSON.parse(value) : null;
}
