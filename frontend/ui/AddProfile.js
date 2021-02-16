import React, { Component, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import InputScreen1 from "../components/InputInfoScreen1";

export default function AddProfile(emailer) {
  const navigation = useNavigation();
  let email = emailer;

  // console.log("Add Profile Scree: " + email);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(InputScreen1, {
          title: "Input Required Info",
          emailx: email,
        })
      }
      style={styles.grp2}
    >
      <View style={styles.icon2Row}>
        <EntypoIcon name="add-to-list" style={styles.icon2}></EntypoIcon>
        <Text style={styles.addProfileDetail}>Add Profile Detail</Text>
      </View>
      <View style={styles.icon2RowFiller}></View>
      <MaterialIconsIcon
        name="chevron-right"
        style={styles.icon5}
      ></MaterialIconsIcon>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  rect: {
    backgroundColor: "#E6E6E6",
    flex: 1,
  },
  grp1: {
    height: 125,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 57,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 60,
  },
  fullNameHere: {
    color: "#121212",
    fontSize: 16,
  },
  email: {
    color: "rgba(78,78,78,1)",
    fontSize: 12,
    marginTop: 13,
  },
  fullNameHereColumn: {
    width: 159,
    marginLeft: 29,
    marginTop: 8,
    marginBottom: 6,
  },
  iconRow: {
    height: 60,
    flexDirection: "row",
    marginTop: 32,
    marginLeft: 21,
    marginRight: 99,
  },
  grp2: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 33,
  },
  icon2: {
    color: "rgba(65,117,5,1)",
    fontSize: 25,
  },
  addProfileDetail: {
    color: "#121212",
    fontSize: 15,
    marginLeft: 22,
    marginTop: 4,
  },
  icon2Row: {
    height: 27,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 12,
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  icon5: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13,
  },
  grp3: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 27,
  },
  icon3: {
    color: "rgba(208,2,27,1)",
    fontSize: 25,
  },
  signOut: {
    color: "#121212",
    fontSize: 15,
    marginLeft: 24,
    marginTop: 3,
  },
  icon3Row: {
    height: 25,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 13,
  },
  icon3RowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  icon4: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13,
  },
});
