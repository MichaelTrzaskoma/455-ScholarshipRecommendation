import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
// import AddCollege from '../ui/AddCollege';

import ScholarSurvey from './scholarships/ScholarSurvey';
import CollegeSurvey from './colleges/CollegeSurvey';
import MajorSurvey from "./majors/MajorSurvey";
// import InputScreen2 from "./InputInfoScreen2";

const Stack = createStackNavigator();


function TopTapView(props) {
  // console.log("TopTapView function 123" + JSON.stringify(props.route.params.usrInfo));
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scholarship" component={ScholarSurvey} initialParams={ {usrInfo : props.route.params.usrInfo}}/>
      <Tab.Screen name="College" component={CollegeSurvey} initialParams={ {usrInfo : props.route.params.usrInfo}}/>
      <Tab.Screen name="Major" component={MajorSurvey} initialParams={ {usrInfo : props.route.params.usrInfo}}/>
    </Tab.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabViewSurvey(props) {
  // console.log("TabViewSurvey " + JSON.stringify(props.route.params.usrInfo));
  return (
    // Since NavigationContainer is used in App.js, this is independent NavigationContainer from the one in App.js 
    <NavigationContainer independent={true} >
      
      {/* TopMultiView (TopTapView) has been nested in StackNavigator */}
      <Stack.Navigator>
        <Stack.Screen
          name="TopTapView"
          component={TopTapView}
          options={{ headerShown: false }}
          initialParams = { { usrInfo: props.route.params.usrInfo} }
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