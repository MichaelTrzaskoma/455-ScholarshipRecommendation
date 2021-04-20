import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
// import AddCollege from '../ui/AddCollege';

import ScholarSurvey from './scholarships/ScholarSurvey';
import CollegeSurvey from './colleges/CollegeSurvey';
// import InputScreen2 from "./InputInfoScreen2";

const Stack = createStackNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function TopTapView() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Scholarship" component={ScholarSurvey} />
      <Tab.Screen name="College" component={CollegeSurvey} />
      <Tab.Screen name="Major" component={SettingsScreen} />
    </Tab.Navigator>

  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabViewSurvey() {
  return (

    // Since NavigationContainer is used in App.js, this is independent NavigationContainer from the one in App.js 
    <NavigationContainer independent={true} >
      
      {/* TopMultiView (TopTapView) has been nested in StackNavigator */}
      <Stack.Navigator>
        <Stack.Screen
          name="TopTapView"
          component={TopTapView}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name={"InputScreen2"}
          component={InputScreen2}
          options={{ headerShown: false }}
        // options={{ title: "Optional Info", email: this.state.usrProfile.email }}
        // initialParams={{ email: this.state.usrProfile.email }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}