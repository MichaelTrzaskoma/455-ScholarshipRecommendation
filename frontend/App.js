import React, { Component } from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { saveSecureStorage, getSecureStorage } from "./functions/secureStorage";
import { getDeviceID } from "./functions/deviceUniqueID";

import LoginScreen from "./components/LoginScreen";
import AccScreen from "./components/AccScreen";
import TabViewSurvey from "./components/TabViewSurvey";

import ScholarSurvey from "./components/scholarships/ScholarSurvey";
import ScholarshipScreen from "./components/scholarships/ScholarshipScreen";
import ViewAllScholar from "./components/scholarships/ViewAllScholar";
import ViewScholarSubCate from "./components/scholarships/ViewScholarSubCate";
import ViewScholarTbl from "./components/scholarships/ViewScholarTbl";
import ViewScholarDetail from "./components/scholarships/ViewScholarDetail";
import ViewRecommendTbl from "./components/scholarships/ViewRecommendTbl";
import ScholarRecommend from "./ui/scholarships/ScholarRecommend";

import CollegeSurvey from "./components/colleges/CollegeSurvey";
import CollegeScreen from "./components/colleges/CollegeScreen";
import CollegeDetail from "./components/colleges/ViewCollegeDetail";
import ViewCollegeSubCate from "./components/colleges/ViewCollegeSubCate";
import ViewAllCollege from "./components/colleges/ViewAllCollege";

import MajorScreen from "./components/majors/MajorScreen";
import MajorDetail from "./components/majors/MajorDetail";


import ViewRecommendTbl_3 from "./components/scholarships/ViewRecommendTbl_3";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Scholarship';

  switch (routeName) {
    case 'Scholarship':
      return 'Scholarship';
    case 'College':
      return 'College';
    case 'Major':
      return 'Major';
    case 'Account':
      return 'My Account';
  }
}

function TabScreens({ navigation, route }) {

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  // in the functional component, we access the initialParams from Stack.Screen
  // we must have route obj as one of parameters within the func
  // then access the initialParams via "route.params.<var names>"
  // in class component, we access the initialParams via "this.props.route.params.<var name>"
  let usr = route.params.usr;

  // console.log(route.params.usr);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Scholarship") {
            // console.log(route);
            iconName = focused ? "school" : "school";
            return <MaterialCommunityIcons name="school" size={size} color={color} />;
          } else if (route.name === "Account") {
            iconName = focused ? "account-outline" : "account-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "College") {
            iconName = focused ? "bank" : "bank";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          else if (route.name == "Major") {
            iconName = focused ? "book-open-page-variant" : "book-open-page-variant";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Scholarship">
        {/* ScholarshipScreen component belong to first Tap navi */}
        {() => <ScholarshipScreen usrInfo={usr} />}
      </Tab.Screen>

      <Tab.Screen name="College">
        {/* CollegeScreen component belong to second Tap navi */}
        {() => <CollegeScreen />}
      </Tab.Screen>

      <Tab.Screen name="Major">
        {/* MajorScreen component belong to third Tap navi */}
        {() => <MajorScreen />}
      </Tab.Screen>

      <Tab.Screen name="Account">
        {/* AccountScreen component belong to fourth Tap navi */}
        {() => <AccScreen usrInfo={usr} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrProfile: {
        signedIn: false,
        full_name: "",
        last_name: "",
        first_name: "",
        email: "",
        password: "",
        photoUrl: "",
        jwt: "",
      },
    };

  }

  signIn = async (inputEmail, inputPassword) => {
    try {
      if (!inputEmail == "" && !inputPassword == "") {

        // let uniqueID = 
        // console.log(getDeviceID());

        // store the sign and jwt first
        if (saveSecureStorage("signIn", JSON.stringify(true))) {
          saveSecureStorage("sassy", "afafa")

          this.setState({
            usrProfile: {
              full_name: "dummyFUllName",
              last_name: "dummyLastName",
              first_name: "dummyFirstName",
              photoUrl: "https://i.pinimg.com/originals/e9/73/46/e9734614f73b4766546ceee1d7778827.jpg",
              email: inputEmail,
              password: inputPassword,
              signedIn: getSecureStorage("signIn"),
              jwt: "",
            },
          });
        }

      } else {
        alert("Please input your email or password!");
      }

    }
    catch (e) {
      console.log("\nError due to: \n", e);
      // console.log(type(value));
    }
  };

  render() {
    // print the device unique ID
    // console.log(getDeviceID())
    // console.log("Auth val: " + JSON.stringify(this.state.usrProfile.signedIn));

    if (this.state.usrProfile.signedIn) {
      // console.log("Email from App.js: " + this.state.usrProfile.email);
      return (
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen
              name={"Home"}
              options={({ route }) => ({
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
              component={TabScreens}
              initialParams={{
                usr: this.state.usrProfile
              }}
            >
            </Stack.Screen>

            <Stack.Screen
              name={"ScholarSurvey"}
              component={ScholarSurvey}
              options={{ title: "Required Info" }}
            // nitialParams={{ email: this.state.usrProfile.email }}
            />

            {/* Multiple Survey component stacked  */}
            <Stack.Screen
              name={"TabViewSurvey"}
              component={TabViewSurvey}
              options={{
                title: "Survey",
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              }}
            />

            {/* CollegeSurvey component stacked */}
            <Stack.Screen
              name={"CollegeSurvey"}
              component={CollegeSurvey}
              options={{
                title: "College Info",
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              }}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            {/* ViewSubCate from scholarships has been renamed as ViewScholarSubCate */}
            <Stack.Screen
              name={"ViewScholarSubCate"}
              component={ViewScholarSubCate}
              // pass down the screen header bar title
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"ViewCollegeSubCate"}
              component={ViewCollegeSubCate}
              // pass down the screen header bar title
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"ScholarshipScreen"}
              component={ScholarshipScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ScholarRecommend"}
              component={ScholarRecommend}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"ViewAllScholar"}
              component={ViewAllScholar}
              options={{
                title: "Scholarship Categories",
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              }}
            />

            <Stack.Screen
              name={"ViewAllCollege"}
              component={ViewAllCollege}
              options={{
                title: "Scholarship Categories",
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              }}
            />

            <Stack.Screen
              name={"ViewScholarTbl"}
              component={ViewScholarTbl}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ViewScholarDetail"}
              component={ViewScholarDetail}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
              initialParams={{
                email: this.state.usrProfile.email
              }}
            />

            <Stack.Screen
              name={"ViewRecommendTbl"}
              component={ViewRecommendTbl}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ViewRecommendTbl_3"}
              component={ViewRecommendTbl_3}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"CollegeDetail"}
              component={CollegeDetail}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"MajorDetail"}
              component={MajorDetail}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#007FF9',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else {
      return (
        <View style={styles.container}>
          {/* <ViewRecommendTbl_3 signIn={this.signIn} /> */}
          <LoginScreen signIn={this.signIn} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent("App", () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
});
