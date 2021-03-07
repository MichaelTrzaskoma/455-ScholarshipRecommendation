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
import HomeCategory from "../ui/HomeCategory"

function ScholarshipScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.category}>Category</Text>
      {/* <ScholarShipBottomNavi
        style={styles.materialBasicFooter1}
      ></ScholarShipBottomNavi> */}
      <View style={styles.scrollArea}>
       
       {/* This is scroll-view component */}
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.button13Row}>
            <TouchableOpacity style={styles.button13}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.academicMajor}>Academic{"\n"}Major</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button5}>
              <TouchableOpacity style={styles.button1}>
                <Text style={styles.gpa}>GPA</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button6}>
              <TouchableOpacity style={styles.button2}>
                <Text style={styles.age}>Age</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button7}>
              <TouchableOpacity style={styles.button3}>
                <Text style={styles.artisticAbility}>
                  Artistic{"\n"}Ability
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button15}>
              <View style={styles.rect2}>
                <EntypoIcon
                  name="arrow-with-circle-right"
                  style={styles.icon2}
                ></EntypoIcon>
                <Text style={styles.viewAll1}>View All</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
      <Text style={styles.recommend}>Recommend</Text>
      <View style={styles.button14Row}>
        <TouchableOpacity style={styles.button14}>
          <View style={styles.group3}>
            <View style={styles.group2}>
              <View style={styles.group}>
                <TouchableOpacity style={styles.button14}>
                  <TouchableOpacity style={styles.button12}>
                    <View style={styles.rect}>
                      <EntypoIcon
                        name="arrow-with-circle-right"
                        style={styles.icon}
                      ></EntypoIcon>
                      <Text style={styles.viewAll}>View All</Text>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button11}>
          <View style={styles.rect1}>
            <View style={styles.icon1Stack}>
              <EntypoIcon name="back-in-time" style={styles.icon1}></EntypoIcon>
              <Text style={styles.recentView}>Recent View</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  category: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 177,
    height: 35,
    marginTop: 79,
    marginLeft: 18
  },
  materialBasicFooter1: {
    width: 360,
    height: 56,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    backgroundColor: "#3f51b5",
    marginTop: 570
  },
  scrollArea: {
    width: 360,
    height: 168,
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  scrollArea_contentContainerStyle: {
    width: 657,
    height: 168,
    flexDirection: "row"
  },
  button13: {
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
  button: {
    width: 117,
    height: 104,
    backgroundColor: "#e9ebe9"
  },
  academicMajor: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 37,
    width: 99,
    fontSize: 16,
    marginTop: 15,
    marginLeft: 9
  },
  button5: {
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
    marginLeft: 17
  },
  button1: {
    width: 117,
    height: 104,
    backgroundColor: "#e9ebe9"
  },
  gpa: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 18,
    width: 49,
    fontSize: 16,
    marginTop: 17,
    marginLeft: 17
  },
  button6: {
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
    marginLeft: 12
  },
  button2: {
    width: 117,
    height: 104,
    backgroundColor: "#e9ebe9"
  },
  age: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 49,
    fontSize: 16,
    marginTop: 14,
    marginLeft: 9
  },
  button7: {
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
    marginLeft: 12
  },
  button3: {
    width: 117,
    height: 104,
    backgroundColor: "#e9ebe9"
  },
  artisticAbility: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 34,
    width: 76,
    fontSize: 16,
    marginTop: 12,
    marginLeft: 12
  },
  button15: {
    width: 117,
    height: 104,
    marginLeft: 15
  },
  rect2: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.17,
    shadowRadius: 0
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52,
    marginTop: 12,
    marginLeft: 49
  },
  viewAll1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 79,
    fontSize: 16,
    marginTop: 8,
    marginLeft: 10
  },
  button13Row: {
    height: 104,
    flexDirection: "row",
    flex: 1,
    marginRight: -297,
    marginLeft: 16,
    marginTop: 32
  },
  recommend: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    height: 48,
    width: 309,
    fontSize: 30,
    marginLeft: 18
  },
  button14: {
    width: 117,
    height: 104
  },
  group3: {
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
  group2: {
    width: 117,
    height: 104
  },
  group: {
    width: 117,
    height: 104
  },
  button12: {
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
    justifyContent: "center"
  },
  rect: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6",
    alignSelf: "center"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52,
    marginTop: 11,
    marginLeft: 35
  },
  viewAll: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 79,
    fontSize: 16,
    marginTop: 3,
    marginLeft: 7
  },
  button11: {
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
    marginLeft: 57
  },
  rect1: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  icon1: {
    top: 0,
    left: 27,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52
  },
  recentView: {
    top: 55,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 79,
    fontSize: 16
  },
  icon1Stack: {
    width: 79,
    height: 76,
    marginTop: 11,
    marginLeft: 8
  },
  button14Row: {
    height: 104,
    flexDirection: "row",
    marginTop: 36,
    marginLeft: 30,
    marginRight: 39
  }
});

export default ScholarshipScreen;
