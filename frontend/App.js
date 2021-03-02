import React, { useState, useEffect, Component } from "react";
import { StyleSheet, StatusBar, TextInput, View, Button, Image } from "react-native";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeContainer from "./components/HomeContainer";
import SearchScreen from "./components/SearchScreen";
import AccScreen from "./components/AccScreen";
import InputScreen1 from "./components/InputInfoScreen1";
import InputScreen2 from "./components/InputInfoScreen2";
import ViewAllScholar from "./components/ViewAllScholar";
import ViewSubCate from "./components/ViewSubCate";
import ViewScholarTbl from "./components/ViewScholarTbl";
import ViewScholarDetail from "./components/ViewScholarDetail";
import ViewRecommendTbl from "./components/ViewRecommendTbl";
import AddProfile from "./ui/AddProfile";
import RequiredInfoNextButton from "./components/RequiredInfoNextButton";
import SignUpScreen from "./components/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoginPage( {props, navigation}) {
  // init landing page for the Google Signin
  return (
    <View>
      {/* <Text style={styles.header}>Sign In With Your Credentials</Text>
      <Button title="Sign in" onPress={() => props.signIn()} /> */}
      <StatusBar hidden/>
      <TextInput
        placeholder="Email"
        keyboardAppearance="light"
        textBreakStrategy="simple"
        keyboardType="email-address"
        selectTextOnFocus={true}
        style={styles.loginEmailTextBox}
      ></TextInput>
      <TextInput
        placeholder="Password"
        keyboardAppearance="light"
        secureTextEntry={true}
        selectTextOnFocus={true}
        style={styles.loginPasswordTextBox}
      ></TextInput>
      <RequiredInfoNextButton
        next="Sign-In"
        style={styles.LoginSignInButton}
      ></RequiredInfoNextButton>
      <RequiredInfoNextButton
        next="Sign-Up"
        style={styles.LoginSignUpButton}
      ></RequiredInfoNextButton>
      <Image
        source={require("./images/AppLogo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    </View>
  );
}

function TabScreens({ usr, navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            return <FeatherIcon name="home" size={size} color={color} />;
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
            iconName = focused ? "ios-search" : "ios-search";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: "Home" }}>
        {() => <HomeContainer email={usr.email} />}
      </Tab.Screen>

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />

      <Tab.Screen name="Account">
        {() => <AccScreen usr_info={usr} />}
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
        photoUrl: "",
      },
    };
  }

  signIn = async () => {
    try {
      //const result = await Google.logInAsync({
        //androidClientId:
        //"117030962609-9mblopptuccmm9fqhi2uv7eeea9bk1vh.apps.googleusercontent.com",
        // iosClientId: "<YOUR_CLIENT_ID_HERE>",
        // scopes: ["profile", "email"],
      

      //if (result.type === "success") {
        this.setState({
          usrProfile: {
            signedIn: true,
            full_name: "dummyFUllName",
            last_name: "dummyLastName",
            first_name: "dummyFirstName",
            photoUrl: "https://i.pinimg.com/originals/e9/73/46/e9734614f73b4766546ceee1d7778827.jpg",
            email: "zkhan15@nyit.edu",
          },
        });
      //} else {
        console.log("\nLog failed due to: \n", result);
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
            
            <Stack.Screen name={"Home"}>
              {() => <TabScreens usr={this.state.usrProfile} navigation={this.props.navigation}/>}
            </Stack.Screen>

            <Stack.Screen
              name={"SignUpScreen"}
              Component={SignUpScreen}
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
    } else {
      return (
        <View style={styles.container}>
          <LoginPage signIn={this.signIn} />
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
    fontFamily: "roboto-regular",
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
    fontFamily: "roboto-regular",
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
  }
});
