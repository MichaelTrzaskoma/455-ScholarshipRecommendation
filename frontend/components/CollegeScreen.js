import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function CollegeScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.container_grp}>

        {/* Cateogry ScrollView */}
        <View style={styles.category_container}>
          <View style={styles.categoryGrp}>
            <Text style={styles.categoryTxt}>Category</Text>
            <View style={styles.scrollArea1}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollArea1_contentContainerStyle}
              >
                <View style={styles.nYBtnRow}>
                  <TouchableOpacity style={styles.nYBtn}>
                    <View style={styles.nYTxtFiller}></View>
                    <Text style={styles.nYTxt}>New York</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nJBtn}>
                    <View style={styles.nJTxtFiller}></View>
                    <Text style={styles.nJTxt}>New Jersey</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nCBtn}>
                    <View style={styles.nCTxtFiller}></View>
                    <Text style={styles.nCTxt}>North Carolina</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nDBtn}>
                    <View style={styles.nDTxtFiller}></View>
                    <Text style={styles.nDTxt}>North Dakota</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.oHBtn}>
                    <View style={styles.oHTxtFiller}></View>
                    <Text style={styles.oHTxt}>Ohio</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewAllBtn1}>
                    <FontAwesomeIcon
                      name="arrow-circle-right"
                      style={styles.viewAllIcon1}>
                    </FontAwesomeIcon>
                    <View style={styles.viewAllIcon1Filler}></View>
                    <Text style={styles.viewAllTxt1}>View All</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.recommend_containerStack}>

          {/* Recommend ScrollView */}
          <View style={styles.recommend_container}>
            <View style={styles.recommendGrp}>
              <Text style={styles.recommendTxt}>Recommend</Text>
              <View style={styles.customContainer}>
                <TouchableOpacity style={styles.customBtn}>
                  <FontAwesomeIcon
                    name="arrow-circle-right"
                    style={styles.customIcon}>
                  </FontAwesomeIcon>
                  <View style={styles.customIconFiller}></View>
                  <Text style={styles.customTxt}>Custom View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Recent View ScrollView */}
          <View style={styles.recent_container}>
            <View style={styles.recentGrp}>
              <Text style={styles.recentTxt}>Recent Viewed</Text>
              <View style={styles.scrollArea2}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea2_contentContainerStyle
                  }
                >
                  <View style={styles.rvBtn1Row}>
                    <TouchableOpacity style={styles.rvBtn1}>
                      <MaterialCommunityIconsIcon
                        name="table-of-contents"
                        style={styles.rvIcon1}
                      ></MaterialCommunityIconsIcon>
                      <View style={styles.rvIcon1Filler}></View>
                      <Text style={styles.rvTxt1}>Place{"\n"}Holder 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rvBtn2}>
                      <MaterialCommunityIconsIcon
                        name="table-of-contents"
                        style={styles.rvIcon2}
                      ></MaterialCommunityIconsIcon>
                      <View style={styles.rvIcon2Filler}></View>
                      <Text style={styles.rvTxt2}>Place{"\n"}Holder 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rvBtn3}>
                      <MaterialCommunityIconsIcon
                        name="table-of-contents"
                        style={styles.rvIcon3}
                      ></MaterialCommunityIconsIcon>
                      <View style={styles.rvIcon3Filler}></View>
                      <Text style={styles.rvTxt3}>Place{"\n"}Holder 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rvBtn4}>
                      <MaterialCommunityIconsIcon
                        name="table-of-contents"
                        style={styles.rvIcon4}
                      ></MaterialCommunityIconsIcon>
                      <View style={styles.rvIcon4Filler}></View>
                      <Text style={styles.rvTxt4}>Place{"\n"}Holder 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rvBtn5}>
                      <MaterialCommunityIconsIcon
                        name="table-of-contents"
                        style={styles.rvIcon5}
                      ></MaterialCommunityIconsIcon>
                      <View style={styles.rvIcon5Filler}></View>
                      <Text style={styles.rvTxt5}>Place{"\n"}Holder 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewAlllBtn2}>

                      <FontAwesomeIcon
                        name="arrow-circle-right"
                        style={styles.viewAllIcon2}>
                      </FontAwesomeIcon>

                      <View style={styles.viewAllIcon2Filler}></View>
                      <Text style={styles.viewAllTxt2}>View All</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
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
  container_grp: {
    width: 360,
    flex: 1,
    alignSelf: "center"
  },
  category_container: {
    height: 173,
    justifyContent: "center"
  },
  categoryGrp: {
    width: 332,
    height: 167,
    alignSelf: "center"
  },
  categoryTxt: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 177,
    height: 35
  },
  scrollArea1: {
    width: 332,
    height: 123,
    marginTop: 4
  },
  scrollArea1_contentContainerStyle: {
    width: 720,
    height: 123,
    flexDirection: "row"
  },
  nYBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  nYTxtFiller: {
    flex: 1
  },
  nYTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  nJBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  nJTxtFiller: {
    flex: 1
  },
  nJTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 36,
    marginBottom: 6,
    marginLeft: 10
  },
  nCBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  nCTxtFiller: {
    flex: 1
  },
  nCTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 100,
    height: 36,
    marginBottom: 7,
    marginLeft: 10
  },
  nDBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  nDTxtFiller: {
    flex: 1
  },
  nDTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 36,
    marginBottom: 7,
    marginLeft: 10
  },
  oHBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  oHTxtFiller: {
    flex: 1
  },
  oHTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 34,
    marginBottom: 9,
    marginLeft: 10
  },
  viewAllBtn1: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  viewAllIcon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  viewAllIcon1Filler: {
    flex: 1
  },
  viewAllTxt1: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  nYBtnRow: {
    height: 110,
    flexDirection: "row",
    flex: 1,
    marginRight: -388,
    marginTop: 7
  },
  recommend_container: {
    top: 0,
    left: 0,
    height: 173,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  recommendGrp: {
    width: 332,
    height: 167,
    alignSelf: "center"
  },
  recommendTxt: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 177,
    height: 35
  },
  customContainer: {
    width: 332,
    height: 123,
    justifyContent: "center",
    marginTop: 4
  },
  customBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  customIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  customIconFiller: {
    flex: 1
  },
  customTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  recent_container: {
    top: 172,
    left: 0,
    height: 173,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  recentGrp: {
    width: 332,
    height: 167,
    alignSelf: "center"
  },
  recentTxt: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 205,
    height: 35
  },
  scrollArea2: {
    width: 332,
    height: 123,
    marginTop: 4
  },
  scrollArea2_contentContainerStyle: {
    width: 720,
    height: 123,
    flexDirection: "row"
  },
  rvBtn1: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  rvIcon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    width: 35,
    height: 38,
    marginTop: 10,
    marginLeft: 10
  },
  rvIcon1Filler: {
    flex: 1
  },
  rvTxt1: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  rvBtn2: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  rvIcon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10
  },
  rvIcon2Filler: {
    flex: 1
  },
  rvTxt2: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  rvBtn3: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  rvIcon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10
  },
  rvIcon3Filler: {
    flex: 1
  },
  rvTxt3: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  rvBtn4: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  rvIcon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10
  },
  rvIcon4Filler: {
    flex: 1
  },
  rvTxt4: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  rvBtn5: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  rvIcon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10
  },
  rvIcon5Filler: {
    flex: 1
  },
  rvTxt5: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  viewAlllBtn2: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 12
  },
  viewAllIcon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  viewAllIcon2Filler: {
    flex: 1
  },
  viewAllTxt2: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  rvBtn1Row: {
    height: 110,
    flexDirection: "row",
    flex: 1,
    marginRight: -388,
    marginTop: 7
  },
  recommend_containerStack: {
    height: 345
  }
});

export default CollegeScreen;
