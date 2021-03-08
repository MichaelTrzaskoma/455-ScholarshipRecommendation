import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";

function CollegeScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Catagory Text & ScrollView belont to categoryGroup */}
      <View style={styles.categoryGroup}>
        <Text style={styles.category}>Category</Text>
        <View style={styles.scrollArea}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <View style={styles.nYGroupRow}>
              <TouchableOpacity style={styles.nYGroup}>
                <View style={styles.rect}>
                  <Text style={styles.newYork}>New York</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nJGroup}>
                <View style={styles.rect1}>
                  <Text style={styles.newJersey}>New Jersey</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iAGroup}>
                <View style={styles.rect2}>
                  <Text style={styles.lowa}>Lowa</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.viewAllCataGroup}>
                <View style={styles.rect5}>
                  <EntypoIcon
                    name="arrow-with-circle-right"
                    style={styles.icon2}
                  ></EntypoIcon>
                  <Text style={styles.viewAll1}>View All</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Recommend Text & ViewAll and Recent View button belong to recommendGroup */}
      <View style={styles.recommendGroup}>
        <Text style={styles.recommend}>Recommend</Text>
        <View style={styles.viewAllGroupRow}>
          <TouchableOpacity style={styles.viewAllGroup}>
            <View style={styles.rect3}>
              <EntypoIcon
                name="arrow-with-circle-right"
                style={styles.icon}
              ></EntypoIcon>
              <Text style={styles.viewAll}>View All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentViewGroup}>
            <View style={styles.rect4}>
              <EntypoIcon name="back-in-time" style={styles.icon1}></EntypoIcon>
              <Text style={styles.recentView}>Recent{"\n"}View</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  materialBasicFooter4: {
    height: 56,
    width: 360,
    marginTop: 684
  },
  categoryGroup: {
    width: 360,
    height: 224,
    marginTop: 20
  },
  category: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 158,
    height: 60,
    marginLeft: 22
  },
  scrollArea: {
    width: 360,
    height: 164,
    backgroundColor: "rgba(255,255,255,1)"
  },
  scrollArea_contentContainerStyle: {
    width: 526,
    height: 164,
    flexDirection: "row"
  },
  nYGroup: {
    width: 117,
    height: 104,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0
  },
  rect: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  newYork: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 63,
    width: 93,
    fontSize: 16,
    marginTop: 21,
    marginLeft: 12
  },
  nJGroup: {
    width: 117,
    height: 104,
    marginLeft: 15
  },
  rect1: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  newJersey: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 63,
    width: 93,
    fontSize: 16,
    marginTop: 21,
    marginLeft: 12
  },
  iAGroup: {
    width: 117,
    height: 104,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    marginLeft: 14
  },
  rect2: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  lowa: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 63,
    width: 93,
    fontSize: 16,
    marginTop: 21,
    marginLeft: 12
  },
  viewAllCataGroup: {
    width: 117,
    height: 104,
    marginLeft: 17
  },
  rect5: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52,
    marginTop: 13,
    marginLeft: 46
  },
  viewAll1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 7,
    marginLeft: 8
  },
  nYGroupRow: {
    height: 104,
    flexDirection: "row",
    flex: 1,
    marginRight: -166,
    marginLeft: 12,
    marginTop: 30
  },
  recommendGroup: {
    width: 299,
    height: 188,
    marginLeft: 22
  },
  recommend: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 216,
    height: 60
  },
  viewAllGroup: {
    width: 117,
    height: 104,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0
  },
  rect3: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52,
    marginTop: 12,
    marginLeft: 39
  },
  viewAll: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 6,
    marginLeft: 7
  },
  recentViewGroup: {
    width: 117,
    height: 104,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 0,
    marginLeft: 53
  },
  rect4: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52,
    marginTop: 8,
    marginLeft: 33
  },
  recentView: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginLeft: 10
  },
  viewAllGroupRow: {
    height: 104,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 11,
    marginRight: 1
  }
});

export default CollegeScreen;
