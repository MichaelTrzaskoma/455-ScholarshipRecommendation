import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
  // save the key and val pair data in secure storage
  // INPUT:
  // :key (str)
  // :val (str) data that you want to store
  // OUTOUT: return true if store successfully

  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("An error occured!" + e);
  }

  // await SecureStore.setItemAsync(String(key), String(value));
  // return true;
}

export async function getData(key) {
  // retrieve val based on key from secure storage
  // INPUT: key (str) that corresponding to the val
  // OUTPUT
  // :val corresponding to the key
  // :return "null" if the val does not exist

  try {
    AsyncStorage.getItem(key).then((value) => {
      if (value !== null) {
        console.log("Read value: " + value);
        return value;
      }
    })

  } catch (e) {
    console.log("An error occured!" + e);
    return "null";
  }

}

export async function deleteSecureStorage(key) {

  let r = getSecureStorage(key);
  console.log(key + " value is: " + JSON.stringify(r));

  if (await SecureStore.deleteItemAsync(String(key))) {
    console.log("Deleted the key: " + key);
    alert("You are logged out!");
  }
  else {
    alert("Delete fail!");
  }
}