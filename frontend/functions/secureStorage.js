import * as SecureStore from 'expo-secure-store';

export async function saveSecureStorage(key, value) {
    // save the key and val pair data in secure storage
    // INPUT:
    // :key (str)
    // :val (str) data that you want to store
    await SecureStore.setItemAsync(key, value);
}

export async function getSecureStorage(key) {
    // retrieve val based on key from secure storage
    // INPUT: key (str) that corresponding to the val
    // OUTPUT
    // :val corresponding to the key
    // :return "null" if the val does not exist
    return await SecureStore.getItemAsync(key);
}