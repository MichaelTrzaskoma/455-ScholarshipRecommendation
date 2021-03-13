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

function MajorScreen(props) {
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
            <View style={styles.aHGroupRow}>
              <TouchableOpacity style={styles.aHGroup}>
                <View style={styles.rect}>
                  <Text style={styles.artsAndHumanities}>
                    Arts{"\n"}and{"\n"}Humanities
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sMTGroup}>
                <View style={styles.rect1}>
                  <Text style={styles.artsAndHumanities1}>
                    Science,{"\n"}Math, and{"\n"}Technology
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buineGroup}>
                <View style={styles.rect2}>
                  <Text style={styles.buiness}>Buiness</Text>
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
              <View style={styles.recentViewStack}>
                <Text style={styles.recentView}>Recent{"\n"}View</Text>
                <EntypoIcon
                  name="back-in-time"
                  style={styles.icon1}
                ></EntypoIcon>
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
  materialBasicFooter5: {
    height: 56,
    width: 360,
    marginTop: 684
  },
  categoryGroup: {
    width: 360,
    height: 216,
    marginTop: 20
  },
  category: {
    
    color: "#4a76ff",
    height: 51,
    width: 229,
    fontSize: 30,
    marginLeft: 22
  },
  scrollArea: {
    width: 360,
    height: 165,
    backgroundColor: "#ffffff"
  },
  scrollArea_contentContainerStyle: {
    width: 540,
    height: 165,
    flexDirection: "row"
  },
  aHGroup: {
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
  artsAndHumanities: {
    
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 16
  },
  sMTGroup: {
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
    marginLeft: 18
  },
  rect1: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  artsAndHumanities1: {
    
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 12
  },
  buineGroup: {
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
    marginLeft: 21
  },
  rect2: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  buiness: {
    
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 12
  },
  viewAllCataGroup: {
    width: 117,
    height: 104,
    marginLeft: 18
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
    marginTop: 15,
    marginLeft: 49
  },
  viewAll1: {
    
    color: "#121212",
    height: 23,
    width: 68,
    fontSize: 16,
    marginTop: 3,
    marginLeft: 8
  },
  aHGroupRow: {
    height: 104,
    flexDirection: "row",
    flex: 1,
    marginRight: -180,
    marginLeft: 15,
    marginTop: 31
  },
  recommendGroup: {
    width: 295,
    height: 186,
    marginTop: 8,
    marginLeft: 22
  },
  recommend: {
    
    color: "#4a76ff",
    height: 51,
    width: 229,
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
    marginTop: 17,
    marginLeft: 47
  },
  viewAll: {
    
    color: "#121212",
    height: 23,
    width: 68,
    fontSize: 16,
    marginLeft: 8
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
    marginLeft: 46
  },
  rect4: {
    width: 117,
    height: 104,
    backgroundColor: "#E6E6E6"
  },
  recentView: {
    top: 52,
    left: 0,
    position: "absolute",
    
    color: "#121212",
    height: 40,
    width: 68,
    fontSize: 16
  },
  icon1: {
    top: 0,
    left: 34,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 52,
    height: 58,
    width: 52
  },
  recentViewStack: {
    width: 86,
    height: 92,
    marginTop: 12,
    marginLeft: 9
  },
  viewAllGroupRow: {
    height: 104,
    flexDirection: "row",
    marginTop: 31,
    marginLeft: 15
  }
});

export default MajorScreen;
