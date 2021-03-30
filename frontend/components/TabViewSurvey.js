import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import AddCollege from '../ui/AddCollege';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabViewSurvey() {
  return (
    <NavigationContainer
      independent={true}
    >
      <Tab.Navigator>
        <Tab.Screen name="Scholarship" component={HomeScreen} />
        <Tab.Screen name="College" component={SettingsScreen} />
        <Tab.Screen name="Major" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}