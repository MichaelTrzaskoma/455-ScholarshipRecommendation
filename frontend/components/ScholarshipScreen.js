import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";

function ScholarshipScreen(props) {
  return (
    <View style={styles.container}>
      
      {/* Catagory Text & ScrollView belont to categoryGroup */}
      <View style={styles.categoryGroup}>
        <Text style={styles.category}>Category</Text>
        <View style={styles.scrollArea}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <View style={styles.aMGroupRow}>
              <TouchableOpacity style={styles.aMGroup}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.academicMajor}>Academic{"\n"}Major</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gPAGroup}>
                <TouchableOpacity style={styles.button1}>
                  <Text style={styles.gpa}>GPA</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ageGroup}>
                <TouchableOpacity style={styles.button2}>
                  <Text style={styles.age}>Age</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aAGroup}>
                <TouchableOpacity style={styles.button3}>
                  <Text style={styles.artisticAbility}>
                    Artistic{"\n"}Ability
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewAllCataGroup}>
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
      </View>

       {/* Recommend Text & ViewAll and Recent View button belong to recommendGroup */}
      <View style={styles.recommendGroup}>
        <Text style={styles.recommend}>Recommend</Text>
        <View style={styles.viewAllGroupRow}>
          <TouchableOpacity style={styles.viewAllGroup}>
            <View style={styles.rect}>
              <EntypoIcon
                name="arrow-with-circle-right"
                style={styles.icon}
              ></EntypoIcon>
              <Text style={styles.viewAll}>View All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentViewGroup}>
            <View style={styles.rect1}>
              <View style={styles.icon1Stack}>
                <EntypoIcon
                  name="back-in-time"
                  style={styles.icon1}
                ></EntypoIcon>
                <Text style={styles.recentView}>Recent View</Text>
              </View>
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
    marginTop: 684
  },
  categoryGroup: {
    width: 360,
    height: 223,
    marginTop: 20
  },
  category: {
    
    color: "#4a76ff",
    fontSize: 30,
    width: 177,
    height: 35,
    marginLeft: 18
  },
  scrollArea: {
    width: 360,
    height: 168,
    backgroundColor: "#ffffff",
    marginTop: 20
  },
  scrollArea_contentContainerStyle: {
    width: 657,
    height: 168,
    flexDirection: "row"
  },
  aMGroup: {
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
    
    color: "#121212",
    height: 37,
    width: 99,
    fontSize: 16,
    marginTop: 15,
    marginLeft: 9
  },
  gPAGroup: {
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
    
    color: "#121212",
    height: 18,
    width: 49,
    fontSize: 16,
    marginTop: 17,
    marginLeft: 17
  },
  ageGroup: {
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
    
    color: "#121212",
    height: 23,
    width: 49,
    fontSize: 16,
    marginTop: 14,
    marginLeft: 9
  },
  aAGroup: {
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
    
    color: "#121212",
    height: 34,
    width: 76,
    fontSize: 16,
    marginTop: 12,
    marginLeft: 12
  },
  viewAllCataGroup: {
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
    
    color: "#121212",
    height: 21,
    width: 79,
    fontSize: 16,
    marginTop: 8,
    marginLeft: 10
  },
  aMGroupRow: {
    height: 104,
    flexDirection: "row",
    flex: 1,
    marginRight: -297,
    marginLeft: 16,
    marginTop: 32
  },
  recommendGroup: {
    width: 309,
    height: 176,
    marginTop: 11,
    marginLeft: 18
  },
  recommend: {
    
    color: "#4a76ff",
    height: 48,
    width: 309,
    fontSize: 30
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
    
    color: "#121212",
    height: 21,
    width: 79,
    fontSize: 16,
    marginTop: 3,
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
    marginLeft: 47
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
  viewAllGroupRow: {
    height: 104,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 21,
    marginRight: 7
  }
});

export default ScholarshipScreen;
