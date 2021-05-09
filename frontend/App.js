import React, { Component } from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { storeData } from "./functions/secureStorage";
import { getDeviceID } from "./functions/deviceUniqueID";
// import { useNavigation } from "@react-navigation/native";
// import * as SecureStore from 'expo-secure-store';

import LoginScreen from "./components/LoginScreen";
import AccScreen from "./components/AccScreen";
import TabViewSurvey from "./components/TabViewSurvey";
import ViewBookTbl from "./components/ViewBookTbl";
import ViewHistory from "./components/ViewHistory";

// Scholarship
import ScholarSurvey from "./components/scholarships/ScholarSurvey";
import ScholarshipScreen from "./components/scholarships/ScholarshipScreen";
import ViewAllScholar from "./components/scholarships/ViewAllScholar";
import ViewScholarSubCate from "./components/scholarships/ViewScholarSubCate";
import ViewScholarTbl from "./components/scholarships/ViewScholarTbl";
import ViewScholarDetail from "./components/scholarships/ViewScholarDetail";
import ViewRecommendTbl_3 from "./components/scholarships/ViewRecommendTbl_3";
import ViewRecommendTbl from "./components/scholarships/ViewRecommendTbl";
import ScholarRecommend from "./ui/scholarships/ScholarRecommend";

// College
import CollegeScreen from "./components/colleges/CollegeScreen";
import CollegeSurvey from "./components/colleges/CollegeSurvey";
import ViewCollegeDetail from "./components/colleges/ViewCollegeDetail";
import ViewCollegeSubCate from "./components/colleges/ViewCollegeSubCate";
import ViewAllCollege from "./components/colleges/ViewAllCollege";

// Major
import MajorScreen from "./components/majors/MajorScreen";
import ViewMajorDetail from "./components/majors/ViewMajorDetail";
import ViewMajorSubCate from "./components/majors/ViewMajorSubCate";
import MajorSurvey from "./components/majors/MajorSurvey";
import ViewAllMajor from "./components/majors/ViewAllMajor";

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

  // console.log("Tap Test " + JSON.stringify(navigation));

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  // in the functional component, we access the initialParams from Stack.Screen
  // we must have route obj as one of parameters within the func
  // then access the initialParams via "route.params.<var names>"
  // in class component, we access the initialParams via "this.props.route.params.<var name>"
  let usr = route.params.usr;
  // console.log("User obj from TabScreens: " + JSON.stringify(route.params.usr));

  // console.log("Checking in TapScreen 123 " + JSON.stringify(route));

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
        {() => <ScholarshipScreen usrInfo={usr}/>}
      </Tab.Screen>

      <Tab.Screen name="College">
        {/* CollegeScreen component belong to second Tap navi */}
        {() => <CollegeScreen usrInfo={usr} />}
      </Tab.Screen>

      <Tab.Screen name="Major">
        {/* MajorScreen component belong to third Tap navi */}
        {() => <MajorScreen usrInfo={usr} />}
      </Tab.Screen>

      <Tab.Screen name="Account">
        {/* AccountScreen component belong to fourth Tap navi */}
        {() => <AccScreen usrInfo={usr}  />}
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
        email: "hchen98x@gmail.com",
        jwt: "",
        uuid: "",
      },
    };

  }


  signIn = async (inputEmail, inputPassword) => {
    try {
      if (!inputEmail == "" && !inputPassword == "") {
        //  &&  String(inputEmail).includes("@")
        const unique_id = getDeviceID();
        // console.log("UUID: " + unique_id);
        let URL = "http://f0c8565ebe8e.ngrok.io/api/v1.2/managements/users/" + inputEmail;
        fetch(URL, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            "paswrd": inputPassword,
            "unique_id": unique_id,
          }),

        })
          .then((response) => response.json())
          .then((json) => {

            if (json.mesg === "authorized") {

              // storeData("signIn", "Yes");
              // storeData("JWT", json.token);
              // storeData("uuid", unique_id);
              // storeData("email", inputEmail);

              console.log(JSON.stringify(json));
              this.setState({
                usrProfile: {
                  email: inputEmail,
                  signedIn: true,
                  jwt: json.token,
                  uuid: unique_id,
                },
              });

            } else {
              alert(json.mesg);
            }
          })

        // for test env only
        // this.setState({
        //   usrProfile: {
        //     email: inputEmail,
        //     signedIn: true,
        //     jwt: "sfwefgwgewg",
        //     uuid: unique_id,
        //   },
        // });

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

    // console.log(this.state.usrProfile);
    // print the device unique ID
    // console.log(getDeviceID())
    // console.log("Auth val: " + JSON.stringify(this.state.usrProfile.signedIn));
    // console.log("Auth val: " + this.state.usrProfile.signedIn);

    if (this.state.usrProfile.signedIn) {
      // console.log("signedIn: " + (getData("signIn")));
      // console.log("Email from App.js: " + this.state.usrProfile.email)q;

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
              options={{
                title: "Required Info",
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
              itialParams={{ usrObj: this.state.usrProfile }}
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

            <Stack.Screen
              name={"ViewBookTbl"}
              component={ViewBookTbl}
              options={{
                title: "Bookmark Lists",
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

            <Stack.Screen
              name={"ViewHistory"}
              component={ViewHistory}
              options={{
                title: "History View",
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
              itialParams={{ usrObj: this.state.usrProfile }}
            />

            <Stack.Screen
              name={"MajorSurvey"}
              component={MajorSurvey}
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
              itialParams={{ usrObj: this.state.usrProfile }}
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
                  fontSize: 20,
                  color: "white",
                },
              })}
            />

            <Stack.Screen
              name={"ViewMajorSubCate"}
              component={ViewMajorSubCate}
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
              initialParams={{ usrProfile: this.state.usrProfile }}
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
              initialParams={{ usrProfile: this.state.usrProfile }}
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
              name={"ViewAllMajor"}
              component={ViewAllMajor}
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
              initialParams={{ usrProfile: this.state.usrProfile }}
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
              initialParams={{ usrProfile: this.state.usrProfile }}
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
              initialParams={{ usrProfile: this.state.usrProfile }}
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
              name={"ViewCollegeDetail"}
              component={ViewCollegeDetail}
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
              name={"ViewMajorDetail"}
              component={ViewMajorDetail}
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
