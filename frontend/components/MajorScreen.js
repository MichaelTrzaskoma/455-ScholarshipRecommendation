import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
//import MaterialBasicFooter5 from "../components/MaterialBasicFooter5";
import EntypoIcon from "react-native-vector-icons/Entypo";

function MajorScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.category}>Category</Text>
      <Text style={styles.recommend}>Recommend</Text>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rect}>
                <Text style={styles.artsAndHumanities}>
                  Arts{"\n"}and{"\n"}Humanities
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <View style={styles.rect1}>
                <Text style={styles.artsAndHumanities1}>
                  Science,{"\n"}Math, and{"\n"}Technology
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3}>
              <View style={styles.rect2}>
                <Text style={styles.buiness}>Buiness</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button6}>
              <TouchableOpacity style={styles.button6}>
                <View style={styles.rect5}>
                  <EntypoIcon
                    name="arrow-with-circle-right"
                    style={styles.icon2}
                  ></EntypoIcon>
                  <Text style={styles.viewAll1}>View All</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.button5Row}>
        <TouchableOpacity style={styles.button5}>
          <View style={styles.rect3}>
            <EntypoIcon
              name="arrow-with-circle-right"
              style={styles.icon}
            ></EntypoIcon>
            <Text style={styles.viewAll}>View All</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4}>
          <View style={styles.rect4}>
            <View style={styles.recentViewStack}>
              <Text style={styles.recentView}>Recent{"\n"}View</Text>
              <EntypoIcon name="back-in-time" style={styles.icon1}></EntypoIcon>
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
  materialBasicFooter5: {
    height: 56,
    width: 360,
    marginTop: 684
  },
  category: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    height: 51,
    width: 229,
    fontSize: 30,
    marginTop: -655,
    marginLeft: 22
  },
  recommend: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    height: 51,
    width: 229,
    fontSize: 30,
    marginTop: 173,
    marginLeft: 22
  },
  scrollArea: {
    width: 360,
    height: 165,
    backgroundColor: "#ffffff",
    marginTop: -224
  },
  scrollArea_contentContainerStyle: {
    width: 540,
    height: 165,
    flexDirection: "row"
  },
  button: {
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
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 16
  },
  button2: {
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
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 12
  },
  button3: {
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
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 57,
    width: 93,
    fontSize: 16,
    marginTop: 23,
    marginLeft: 12
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
    shadowRadius: 0
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
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 68,
    fontSize: 16,
    marginTop: 3,
    marginLeft: 8
  },
  buttonRow: {
    height: 104,
    flexDirection: "row",
    flex: 1,
    marginRight: -180,
    marginLeft: 15,
    marginTop: 31
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
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 68,
    fontSize: 16,
    marginLeft: 8
  },
  button4: {
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
    fontFamily: "roboto-regular",
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
  button5Row: {
    height: 104,
    flexDirection: "row",
    marginTop: 90,
    marginLeft: 38,
    marginRight: 42
  }
});

export default MajorScreen;
