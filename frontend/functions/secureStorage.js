import * as SecureStore from 'expo-secure-store';

export async function saveSecureStorage(key, value) {
    // save the key and val pair data in secure storage
    // INPUT:
    // :key (str)
    // :val (str) data that you want to store
    // OUTOUT: return true if store successfully
    await SecureStore.setItemAsync(key, value);
    return true;
}

export async function getSecureStorage(key) {
    // retrieve val based on key from secure storage
    // INPUT: key (str) that corresponding to the val
    // OUTPUT
    // :val corresponding to the key
    // :return "null" if the val does not exist
    let result = await SecureStore.getItemAsync(key);
    if (result){
        return result;
    } else {
        return "null";
    }
}