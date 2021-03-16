import React, { Component } from "react";
import {
  StyleSheet,
  View,
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
      <View style={styles.container_grp}>
        <View style={styles.category_container}>
          <View style={styles.categoryGrp}>
            <Text style={styles.category_txt}>Category</Text>
            <View style={styles.scrollArea}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
              >
                <View style={styles.amGrpRow}>
                  <TouchableOpacity style={styles.amGrp}>
                    <FontAwesomeIcon
                      name="university"
                      style={styles.agIcon}
                    ></FontAwesomeIcon>
                    <View style={styles.agIconFiller}></View>
                    <Text style={styles.academicMajor_text}>
                      Academic{"\n"}Major
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gpaGrp}>
                    <MaterialCommunityIconsIcon
                      name="google-spreadsheet"
                      style={styles.gpa_icon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.gpa_iconFiller}></View>
                    <Text style={styles.gpa_txt}>GPA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ageGrp}>
                    <FeatherIcon
                      name="target"
                      style={styles.ageIcon}
                    ></FeatherIcon>
                    <View style={styles.ageIconFiller}></View>
                    <Text style={styles.age_txt}>Age</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.stateGrp}>
                    <MaterialCommunityIconsIcon
                      name="city-variant-outline"
                      style={styles.stateIcon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.stateIconFiller}></View>
                    <Text style={styles.stateTxt}>State</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deadlineGrp}>
                    <FontAwesomeIcon
                      name="calendar"
                      style={styles.deadlineIcon}
                    ></FontAwesomeIcon>
                    <View style={styles.deadlineIconFiller}></View>
                    <Text style={styles.deadlineTxt}>Deadline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewAllGrp}>
                    <IoniconsIcon
                      name="ios-arrow-dropright-circle"
                      style={styles.viewAllIcon}
                    ></IoniconsIcon>
                    <View style={styles.viewAllIconFiller}></View>
                    <Text style={styles.viewAllTxt}>View All</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.recommendGrpStack}>
          <View style={styles.recommendGrp}>
            <View style={styles.rect2}>
              <Text style={styles.recommendTxt}>Recommend</Text>
              <View style={styles.recommendContainer}>
                <TouchableOpacity style={styles.recommendBtn}>
                  <IoniconsIcon
                    name="ios-arrow-dropright-circle"
                    style={styles.recommendIcon}
                  ></IoniconsIcon>
                  <View style={styles.recommendIconFiller}></View>
                  <Text style={styles.recommendBtnTxt}>Custom View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
                    <TouchableOpacity style={styles.button6}>
                      <IoniconsIcon
                        name="ios-arrow-dropright-circle"
                        style={styles.icon7}
                      ></IoniconsIcon>
                      <View style={styles.icon7Filler}></View>
                      <Text style={styles.viewAll2}>View All</Text>
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
  container_grp: {
    flex: 1
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
  category_txt: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    fontSize: 30,
    width: 177,
    height: 35
  },
  scrollArea: {
    width: 332,
    height: 123,
    marginTop: 4
  },
  scrollArea_contentContainerStyle: {
    width: 720,
    height: 123,
    flexDirection: "row"
  },
  amGrp: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  agIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  agIconFiller: {
    flex: 1
  },
  academicMajor_text: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  gpaGrp: {
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
  gpa_icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    width: 40,
    height: 44,
    marginTop: 10,
    marginLeft: 10
  },
  gpa_iconFiller: {
    flex: 1
  },
  gpa_txt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  ageGrp: {
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
  age_txt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  stateGrp: {
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
  deadlineGrp: {
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
  viewAllGrp: {
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
  viewAllIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  viewAllIconFiller: {
    flex: 1
  },
  viewAllTxt: {
    fontFamily: "arial-regular",
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 8,
    alignSelf: "center"
  },
  amGrpRow: {
    height: 110,
    flexDirection: "row",
    flex: 1,
    marginRight: -388,
    marginTop: 7
  },
  recommendGrp: {
    top: 0,
    left: 0,
    height: 173,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  rect2: {
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
  recommendContainer: {
    width: 332,
    height: 123,
    justifyContent: "center",
    marginTop: 4
  },
  recommendBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  recommendIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  recommendIconFiller: {
    flex: 1
  },
  recommendBtnTxt: {
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
  button6: {
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
  icon7: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10
  },
  icon7Filler: {
    flex: 1
  },
  viewAll2: {
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
  recommendGrpStack: {
    height: 345
  }
});

export default ScholarshipScreen;
