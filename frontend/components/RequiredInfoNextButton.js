import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
// import * as RootNavigation from './path/to/RootNavigation.js';
// import * as RootNavigation from './path/to/RootNavigation.js';

function RequiredInfoNextButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => alert("hello")}>
      <Text style={styles.next}>{props.next || "Next"}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
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
    fontFamily: "roboto-regular",
    alignSelf: "center"
  }
});

export default RequiredInfoNextButton;
