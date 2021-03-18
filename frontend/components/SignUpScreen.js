import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import SignUpScreenButton from "./SignUpScreenButton";


function SignUpScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.signUpPage}>Sign-Up Page</Text>
      <TextInput
        placeholder="Email Address"
        keyboardAppearance="light"
        keyboardType="email-address"
        style={styles.emailTextbook}
      ></TextInput>
      <TextInput
        placeholder="Username"
        keyboardAppearance="light"
        style={styles.usernameTextbook}
      ></TextInput>
      <TextInput
        placeholder="New Password"
        keyboardAppearance="light"
        secureTextEntry={true}
        style={styles.newPasswordTextbook}
      ></TextInput>
      <TextInput
        placeholder="Verify Password"
        secureTextEntry={true}
        style={styles.verifyPasswordTextbook}
      ></TextInput>
      <SignUpScreenButton
        style={styles.SignUpScreenButton}
      ></SignUpScreenButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  signUpPage: {
    
    color: "#4a76ff",
    fontSize: 30,
    marginTop: 85,
    marginLeft: 36
  },
  emailTextbook: {
    
    color: "#121212",
    height: 39,
    width: 268,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 39,
    marginLeft: 36
  },
  usernameTextbook: {
    
    color: "#121212",
    height: 39,
    width: 268,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 54,
    marginLeft: 36
  },
  newPasswordTextbook: {
    
    color: "#121212",
    height: 39,
    width: 268,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 54,
    marginLeft: 36
  },
  verifyPasswordTextbook: {
    
    color: "#121212",
    height: 39,
    width: 268,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 58,
    marginLeft: 36
  },
  SignUpScreenButton: {
    height: 36,
    width: 168,
    backgroundColor: "#4a76ff",
    borderRadius: 16,
    marginTop: 91,
    marginLeft: 86
  }
});

export default SignUpScreen;
