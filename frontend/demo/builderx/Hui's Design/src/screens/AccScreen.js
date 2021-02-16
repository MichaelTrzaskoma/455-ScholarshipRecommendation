import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

function AccScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.rect}>
        <View style={styles.grp1}>
          <View style={styles.iconRow}>
            <FontAwesomeIcon
              name="user-o"
              style={styles.icon}
            ></FontAwesomeIcon>
            <View style={styles.fullNameHereColumn}>
              <Text style={styles.fullNameHere}>Full Name Here</Text>
              <Text style={styles.email}>Email: helloWorld@world.com</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Untitled")}
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Untitled")}
          style={styles.grp3}
        >
          <View style={styles.icon3Row}>
            <FontAwesomeIcon
              name="sign-out"
              style={styles.icon3}
            ></FontAwesomeIcon>
            <Text style={styles.signOut}>Sign Out</Text>
          </View>
          <View style={styles.icon3RowFiller}></View>
          <MaterialIconsIcon
            name="chevron-right"
            style={styles.icon4}
          ></MaterialIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    backgroundColor: "#E6E6E6",
    flex: 1
  },
  grp1: {
    height: 125,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 57
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 60
  },
  fullNameHere: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16
  },
  email: {
    fontFamily: "roboto-regular",
    color: "rgba(78,78,78,1)",
    fontSize: 12,
    marginTop: 13
  },
  fullNameHereColumn: {
    width: 159,
    marginLeft: 29,
    marginTop: 8,
    marginBottom: 6
  },
  iconRow: {
    height: 60,
    flexDirection: "row",
    marginTop: 32,
    marginLeft: 21,
    marginRight: 99
  },
  grp2: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 33
  },
  icon2: {
    color: "rgba(65,117,5,1)",
    fontSize: 25
  },
  addProfileDetail: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    marginLeft: 22,
    marginTop: 4
  },
  icon2Row: {
    height: 27,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 12
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13
  },
  grp3: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 27
  },
  icon3: {
    color: "rgba(208,2,27,1)",
    fontSize: 25
  },
  signOut: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    marginLeft: 24,
    marginTop: 3
  },
  icon3Row: {
    height: 25,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 13
  },
  icon3RowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon4: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13
  }
});

export default AccScreen;
