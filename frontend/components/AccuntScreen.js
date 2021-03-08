import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function AccuntScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* UserInfo Containter Component */}
      <View style={styles.userInfoContainer}>
        <View style={styles.icon1Row}>
          <MaterialCommunityIconsIcon
            name="account-outline"
            style={styles.icon1}
          ></MaterialCommunityIconsIcon>
          <View style={styles.name3Column}>
            <Text style={styles.name3}>Name</Text>
            <Text style={styles.email3}>Email :</Text>
          </View>
        </View>
      </View>

      {/* Group all the buttons in account, which are called buttonGroup group */}
      <View style={styles.allButtonsGroup}>
        <View style={styles.addProfileDetailGroup}>
          <TouchableOpacity style={styles.addProfileDetailButton}>
            <View style={styles.icon2Row}>
              <MaterialIconsIcon
                name="playlist-add"
                style={styles.icon2}
              ></MaterialIconsIcon>
              <Text style={styles.addProfileDetail1}>Add Profile Detail</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.addCollegePreferencesGroup}>
          <TouchableOpacity style={styles.addCollegePreferencesButton}>
            <View style={styles.icon6Row}>
              <MaterialIconsIcon
                name="playlist-add"
                style={styles.icon6}
              ></MaterialIconsIcon>
              <Text style={styles.collegePreferences}>
                Add College Preferences
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bookmarksGroup}>
          <TouchableOpacity style={styles.bookmarksButton}>
            <View style={styles.icon3Row}>
              <MaterialIconsIcon
                name="vpn-key"
                style={styles.icon3}
              ></MaterialIconsIcon>
              <Text style={styles.bookmarks}>Bookmarks</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.signoutGroup}>
          <TouchableOpacity style={styles.signoutButton}>
            <View style={styles.icon5Row}>
              <FontAwesomeIcon
                name="sign-out"
                style={styles.icon5}
              ></FontAwesomeIcon>
              <Text style={styles.signOut}>Sign-Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialBasicFooter1: {
    height: 56,
    width: 360,
    marginTop: 684
  },
  userInfoContainer: {
    width: 375,
    height: 179,
    backgroundColor: "#e6e6e6",
    marginTop: 20,
    marginLeft: -1
  },
  icon1: {
    color: "rgba(155,155,155,1)",
    fontSize: 140
  },
  name3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20
  },
  email3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 21
  },
  name3Column: {
    width: 53,
    marginTop: 44,
    marginBottom: 46
  },
  icon1Row: {
    height: 154,
    flexDirection: "row",
    marginLeft: -12,
    marginRight: 179
  },
  allButtonsGroup: {
    width: 361,
    height: 282,
    marginTop: 40,
    marginLeft: -2
  },
  addProfileDetailGroup: {
    width: 360,
    height: 60
  },
  addProfileDetailButton: {
    width: 375,
    height: 60,
    backgroundColor: "#e6e6e6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(107,164,39,1)",
    fontSize: 40
  },
  addProfileDetail1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 22,
    marginTop: 10
  },
  icon2Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 140,
    marginLeft: 20,
    marginTop: 10
  },
  addCollegePreferencesGroup: {
    width: 360,
    height: 60,
    marginTop: 14
  },
  addCollegePreferencesButton: {
    width: 375,
    height: 60,
    backgroundColor: "#e6e6e6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    flexDirection: "row"
  },
  icon6: {
    color: "rgba(107,164,39,1)",
    fontSize: 40
  },
  collegePreferences: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 22,
    marginTop: 10
  },
  icon6Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 81,
    marginLeft: 20,
    marginTop: 10
  },
  bookmarksGroup: {
    width: 360,
    height: 60,
    marginTop: 14,
    marginLeft: 1
  },
  bookmarksButton: {
    width: 375,
    height: 60,
    backgroundColor: "#e6e6e6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    flexDirection: "row"
  },
  icon3: {
    color: "rgba(234,159,19,1)",
    fontSize: 40
  },
  bookmarks: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 22,
    marginTop: 10
  },
  icon3Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 187,
    marginLeft: 20,
    marginTop: 10
  },
  signoutGroup: {
    width: 360,
    height: 60,
    marginTop: 14
  },
  signoutButton: {
    width: 375,
    height: 60,
    backgroundColor: "#e6e6e6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(236,78,96,1)",
    fontSize: 40,
    height: 40,
    width: 37
  },
  signOut: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 25,
    marginTop: 11
  },
  icon5Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 210,
    marginLeft: 20,
    marginTop: 11
  }
});

export default AccuntScreen;
