import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function ScholarshipScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* This is a group which embrace whole category, recommend, and recent view scroll view*/}
      <View style={styles.scholarContainerGrp}>

        {/* This is a group that contain the category scroll view */}
        <View style={styles.scholarCategoryContainer}>
          <View style={styles.categoryGrp}>
            <Text style={styles.categoryTxt}>Category</Text>
            <View style={styles.scrollArea2}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollArea2_contentContainerStyle}
              >
                <View style={styles.amBtnRow}>
                  <TouchableOpacity style={styles.amBtn}>
                    <FontAwesomeIcon
                      name="university"
                      style={styles.amIcon}
                    ></FontAwesomeIcon>
                    <View style={styles.amIconFiller}></View>
                    <Text style={styles.amTxt}>Academic{"\n"}Major</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gpaBtn}>
                    <MaterialCommunityIconsIcon
                      name="google-spreadsheet"
                      style={styles.gpaIcon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.gpaIconFiller}></View>
                    <Text style={styles.gpaTxt}>GPA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ageBtn}>
                    <FeatherIcon
                      name="target"
                      style={styles.ageIcon}
                    ></FeatherIcon>
                    <View style={styles.ageIconFiller}></View>
                    <Text style={styles.ageTxt}>Age</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.stateBtn}>
                    <MaterialCommunityIconsIcon
                      name="city-variant-outline"
                      style={styles.stateIcon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.stateIconFiller}></View>
                    <Text style={styles.stateTxt}>State</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deadlineBtn}>
                    <FontAwesomeIcon
                      name="calendar"
                      style={styles.deadlineIcon}
                    ></FontAwesomeIcon>
                    <View style={styles.deadlineIconFiller}></View>
                    <Text style={styles.deadlineTxt}>Deadline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewAllBtn1}>
                    <IoniconsIcon
                      name="ios-arrow-dropright-circle"
                      style={styles.viewAllIcon1}
                    ></IoniconsIcon>
                    <View style={styles.viewAllIcon1Filler}></View>
                    <Text style={styles.viewAllTxt1}>View All</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        {/* This is a group that contain the recommend scroll view */}
        <View style={styles.scholarRecommendContainerStack}>
          <View style={styles.scholarRecommendContainer}>
            <View style={styles.recommendGrp}>
              <Text style={styles.recommendTxt}>Recommend</Text>
              <View style={styles.customContainer}>
                <TouchableOpacity style={styles.customBtn}>
                  <IoniconsIcon
                    name="ios-arrow-dropright-circle"
                    style={styles.customIcon}
                  ></IoniconsIcon>
                  <View style={styles.customIconFiller}></View>
                  <Text style={styles.customTxt}>Custom View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

           {/* This is a group that contain the recent viewed scroll view */}
          <View style={styles.scholarRecentContainer}>
            <View style={styles.recentGrp}>
              <Text style={styles.recentTxt}>Recent Viewed</Text>
              <View style={styles.scrollArea1}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea1_contentContainerStyle
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
                    <TouchableOpacity style={styles.viewAllBtn2}>
                      <IoniconsIcon
                        name="ios-arrow-dropright-circle"
                        style={styles.viewAllIcon2}
                      ></IoniconsIcon>
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
    flex: 1
  },
  scholarContainerGrp: {
    flex: 1
  },
  scholarCategoryContainer: {
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
  amBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  amIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  amIconFiller: {
    flex: 1
  },
  amTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  gpaBtn: {
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
  gpaIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    width: 40,
    height: 44,
    marginTop: 10,
    marginLeft: 10
  },
  gpaIconFiller: {
    flex: 1
  },
  gpaTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  ageBtn: {
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
  ageIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  ageIconFiller: {
    flex: 1
  },
  ageTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  stateBtn: {
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
  stateIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  stateIconFiller: {
    flex: 1
  },
  stateTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  deadlineBtn: {
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
  deadlineIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  deadlineIconFiller: {
    flex: 1
  },
  deadlineTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
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
  amBtnRow: {
    height: 110,
    flexDirection: "row",
    flex: 1,
    marginRight: -388,
    marginTop: 7
  },
  scholarRecommendContainer: {
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
  scholarRecentContainer: {
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
  viewAllBtn2: {
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
  scholarRecommendContainerStack: {
    height: 345
  }
});

export default ScholarshipScreen;
