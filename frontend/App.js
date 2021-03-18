import React, { useState, useEffect, Component } from "react";
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import { NavigationContainer } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginScreen from "./components/LoginScreen";
import HomeContainer from "./components/HomeContainer";
import AccuntScreen from "./components/AccuntScreen";

import InputScreen1 from "./components/InputInfoScreen1";
import InputScreen2 from "./components/InputInfoScreen2";
import ViewAllScholar from "./components/ViewAllScholar";
import ViewSubCate from "./components/ViewSubCate";
import ViewScholarTbl from "./components/ViewScholarTbl";
import ViewScholarDetail from "./components/ViewScholarDetail";
import ViewRecommendTbl from "./components/ViewRecommendTbl";
import AddProfile from "./ui/AddProfile";
import SignUpScreen from "./components/SignUpScreen";
import ScholarshipScreen from "./components/ScholarshipScreen";
import MajorScreen from "./components/MajorScreen";
import CollegeScreen from "./components/CollegeScreen";

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
        {() => <ScholarshipScreen />}
      </Tab.Screen>

      <Tab.Screen name="Search" options={{ title: "College" }}>
        {/* CollegeScreen component belong to second Tap navi */}
        {() => <CollegeScreen />}
      </Tab.Screen>

      <Tab.Screen name="Major" options={{ title: "Major" }}>
        {/* MajorScreen component belong to third Tap navi */}
        {() => <MajorScreen />}
      </Tab.Screen>

      <Tab.Screen name="Account">
        {/* AccountScreen component belong to fourth Tap navi */}
        {() => <AccuntScreen />}
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
      },
    };
    
  }


  signIn = async (inputEmail, inputPassword) => {
    try {
      //const result = await Google.logInAsync({
      //androidClientId:
      //"117030962609-9mblopptuccmm9fqhi2uv7eeea9bk1vh.apps.googleusercontent.com",
      // iosClientId: "<YOUR_CLIENT_ID_HERE>",
      // scopes: ["profile", "email"],

      //if (result.type === "success") {
      //alert(this.email)
      //alert(this.password)

      this.setState({
        usrProfile: {
          signedIn: true,
          full_name: "dummyFUllName",
          last_name: "dummyLastName",
          first_name: "dummyFirstName",
          photoUrl: "https://i.pinimg.com/originals/e9/73/46/e9734614f73b4766546ceee1d7778827.jpg",
          email: inputEmail,
          password: inputPassword,
        },
      });
      console.log(this.state.usrProfile.email);
      console.log(this.state.usrProfile.password);
      //} else {
      //console.log("\nLog failed due to: \n", result);
    }
    catch (e) {
      console.log("\nError due to: \n", e);
      // console.log(type(value));
    }
  };
  

  render() {
    if (this.state.usrProfile.signedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>

            {/* <Stack.Screen 
            name={"LoginPage"}
            component={LoginPage}
            /> */}

            <Stack.Screen name={"Home"}>
              {() => <TabScreens usr={this.state.usrProfile} navigation={this.props.navigation} />}
            </Stack.Screen>

            <Stack.Screen
              name={"SignUpScreen"}
              component={SignUpScreen}
            />

            <Stack.Screen
              name={"InputScreen1"}
              component={InputScreen1}
              options={{ title: "Required Info" }}
            />

            <Stack.Screen
              name={"InputScreen2"}
              component={InputScreen2}
              options={{ title: "Optional Info" }}
              initialParams={{ email: this.state.usrProfile.email }}
            />

            <Stack.Screen
              name={"ViewSubCate"}
              component={ViewSubCate}
              // pass down the screen header bar title
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

            <Stack.Screen
              name={"AddProfile"}
              component={AddProfile}
              options={({ route }) => ({ title: route.params.title })}
            />

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
  loginEmailTextBox: {
    
    color: "#121212",
    height: 37,
    width: 240,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    letterSpacing: 0,
    fontSize: 16,
    marginTop: 372,
    marginLeft: 65
  },
  loginPasswordTextBox: {
    
    color: "#121212",
    height: 37,
    width: 240,
    borderWidth: 1,
    borderColor: "#000000",
    fontSize: 16,
    marginTop: 38,
    marginLeft: 65
  },
  LoginSignInButton: {
    height: 36,
    width: 168,
    backgroundColor: "#4a76ff",
    borderRadius: 16,
    marginTop: 47,
    marginLeft: 98
  },
  LoginSignUpButton: {
    height: 36,
    width: 168,
    borderRadius: 16,
    backgroundColor: "#4a76ff",
    marginTop: 27,
    marginLeft: 98
  },
  image: {
    width: 221,
    height: 231,
    borderRadius: 36,
    marginTop: -555,
    marginLeft: 76
  },
  containerLoginButton: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  next: {
    color: "#fff",
    fontSize: 16,
    
    alignSelf: "center"
  },

  bottomNaviContainer: {
    backgroundColor: "#3f51b5",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    }
  }
});
