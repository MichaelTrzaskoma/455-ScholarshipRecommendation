import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { saveSecureStorage, getSecureStorage } from "./functions/secureStorage";
import { getDeviceID } from "./functions/deviceUniqueID";

import LoginScreen from "./components/LoginScreen";
import AccScreen from "./components/AccScreen";
import InputScreen1 from "./components/InputInfoScreen1";
import InputScreen2 from "./components/InputInfoScreen2";
import ScholarshipScreen from "./components/scholarships/ScholarshipScreen";
import ViewAllScholar from "./components/scholarships/ViewAllScholar";
import ViewSubCate from "./components/scholarships/ViewSubCate";
import ViewScholarTbl from "./components/scholarships/ViewScholarTbl";
import ViewScholarDetail from "./components/scholarships/ViewScholarDetail";
import ViewRecommendTbl from "./components/scholarships/ViewRecommendTbl";
import ScholarRecommend from "./ui/scholarships/ScholarRecommend";
// import AddProfile from "./ui/MultiSurvey";
import CollegeSurvey from "./components/colleges/CollegeSurvey";
import CollegeScreen from "./components/colleges/CollegeScreen";
import MajorScreen from "./components/majors/MajorScreen";
import TabViewSurvey from "./components/TabViewSurvey";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabScreens({ usr, navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            // console.log(route);
            iconName = focused ? "school" : "school";
            return <Icon name="school" size={size} color={color} />;
          } else if (route.name === "Account") {
            iconName = focused ? "account-outline" : "account-outline";
            return (
              <MaterialCommunityIconsIcon
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search") {
            iconName = focused ? "bank" : "bank";
            return <Icon name={iconName} size={size} color={color} />;
          }
          else if (route.name == "Major") {
            iconName = focused ? "book-open-page-variant" : "book-open-page-variant";
            return <Icon name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: "Scholarship" }}>
        {/* ScholarshipScreen component belong to first Tap navi */}
        {() => <ScholarshipScreen usrInfo={usr} />}
      </Tab.Screen>

      <Tab.Screen name="Search" options={{ title: "College" }}>
        {/* CollegeScreen component belong to second Tap navi */}
        {() => <CollegeScreen />}
      </Tab.Screen>

      <Tab.Screen name="Major" options={{ title: "Major" }}>
        {/* MajorScreen component belong to third Tap navi */}
        {() => <MajorScreen />}
      </Tab.Screen>

      <Tab.Screen name="Account" options={{ title: "Account" }}>
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

            <Stack.Screen name={"Home"}>
              {() => <TabScreens usr={this.state.usrProfile} navigation={this.props.navigation} />}
            </Stack.Screen>

            <Stack.Screen
              name={"InputScreen1"}
              component={InputScreen1}
              options={{ title: "Required Info" }}
            // nitialParams={{ email: this.state.usrProfile.email }}
            />

            {/* Multiple Survey component stacked  */}
            <Stack.Screen
              name={"TabViewSurvey"}
              component={TabViewSurvey}
              options={{ title: "Survey" }}
            />

            <Stack.Screen
              name={"InputScreen2"}
              component={InputScreen2}
              options={{ title: "Optional Info", email: this.state.usrProfile.email }}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            {/* CollegeSurvey component stacked */}
            <Stack.Screen
              name={"CollegeSurvey"}
              component={CollegeSurvey}
              options={{ title: "College Info" }}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ViewSubCate"}
              component={ViewSubCate}
              // pass down the screen header bar title
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name={"ScholarshipScreen"}
              component={ScholarshipScreen}
              options={({ route }) => ({ title: route.params.title })}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ScholarRecommend"}
              component={ScholarRecommend}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name={"ViewAllScholar"}
              component={ViewAllScholar}
              options={{ title: "Scholarship Categories" }}
            />

            <Stack.Screen
              name={"ViewScholarTbl"}
              component={ViewScholarTbl}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name={"ViewScholarDetail"}
              component={ViewScholarDetail}
              options={({ route }) => ({ title: route.params.title })}
            />

            {/* <Stack.Screen
              name={"AddProfile"}
              component={AddProfile}
              options={({ route }) => ({ title: route.params.title })}
            /> */}

            <Stack.Screen
              name={"ViewRecommendTbl"}
              component={ViewRecommendTbl}
              options={({ route }) => ({ title: route.params.title })}
              initialParams={{ email: this.state.usrProfile.email }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else {
      return (
        <View style={styles.container}>
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
