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

function MajorScreen(props) {
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
                <View style={styles.artBtnRow}>
                  <TouchableOpacity style={styles.artBtn}>
                    <IoniconsIcon
                      name="ios-brush"
                      style={styles.artIcon}
                    ></IoniconsIcon>
                    <View style={styles.artIconFiller}></View>
                    <Text style={styles.artTxt}>Arts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bnBtn}>
                    <IoniconsIcon
                      name="md-business"
                      style={styles.bnIcon}
                    ></IoniconsIcon>
                    <Text style={styles.bnTxt}>Business</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.edBtn}>
                    <IoniconsIcon
                      name="ios-school"
                      style={styles.edIcon}
                    ></IoniconsIcon>
                    <View style={styles.edIconFiller}></View>
                    <Text style={styles.edTxt}>Education</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hPBtn}>
                    <MaterialCommunityIconsIcon
                      name="hospital-building"
                      style={styles.hPIcon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.hPIconFiller}></View>
                    <Text style={styles.hPTxt}>North Dakota</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sTMBtn}>
                    <MaterialCommunityIconsIcon
                      name="lightbulb-on-outline"
                      style={styles.sTMIcon}
                    ></MaterialCommunityIconsIcon>
                    <View style={styles.sTMIconFiller}></View>
                    <Text style={styles.sTMTxt}>
                      Science,{"\n"}Technology {"\n"}&amp; Math
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewAllGrp1}>
                    <FontAwesomeIcon
                      name="arrow-circle-right"
                      style={styles.customIcon}>
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
                    <TouchableOpacity style={styles.viewAlllBtn}>
                      <FontAwesomeIcon
                        name="arrow-circle-right"
                        style={styles.customIcon}>
                      </FontAwesomeIcon>
                      <View style={styles.viewAllIconFiller}></View>
                      <Text style={styles.viewAllTxt}>View All</Text>
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
  },
  container_grp: {
    flex: 1,
    width: '100%',
    backgroundColor: "#FFFFFF",
  },
  category_container: {
    height: 173,
    justifyContent: 'center',
    // marginTop: 30,
    width: '100%',
  },
  categoryGrp: {
    width: '90%',
    height: 167,
    alignSelf: 'center',
    marginTop: 5,
  },
  categoryTxt: {
    color: '#4a76ff',
    fontSize: 30,
    width: 177,
    height: 40,
  },
  scrollArea1: {
    width: '100%',
    height: 123,
    marginTop: 4,
  },
  scrollArea1_contentContainerStyle: {
    width: 720,
    height: 123,
    flexDirection: "row"
  },
  artBtn: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000",
    borderLeftWidth: 0,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  artIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 10
  },
  artIconFiller: {
    flex: 1
  },
  artTxt: {
    color: "#121212",
    fontSize: 14,
    width: 77,
    height: 27,
    marginBottom: 2,
    marginLeft: 10
  },
  bnBtn: {
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
  bnIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 9
  },
  bnTxt: {
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 27,
    marginTop: 25,
    marginLeft: 10
  },
  edBtn: {
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
  edIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 10
  },
  edIconFiller: {
    flex: 1
  },
  edTxt: {
    color: "#121212",
    fontSize: 14,
    width: 100,
    height: 25,
    marginBottom: 6,
    marginLeft: 10
  },
  hPBtn: {
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
  hPIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 9
  },
  hPIconFiller: {
    flex: 1
  },
  hPTxt: {
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 24,
    marginBottom: 9,
    marginLeft: 10
  },
  sTMBtn: {
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
  sTMIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 10
  },
  sTMIconFiller: {
    flex: 1
  },
  sTMTxt: {
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 49,
    alignSelf: "center"
  },
  viewAllGrp1: {
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 16,
    marginBottom: 18,
    alignSelf: "center"
  },
  artBtnRow: {
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
    width: '90%',
    height: 167,
    alignSelf: 'center',
  },
  recommendTxt: {
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
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    width: '100%',
  },
  recentGrp: {
    width: '90%',
    height: 167,
    alignSelf: 'center',
    marginTop: 5,
  },
  recentTxt: {
    color: "#4a76ff",
    fontSize: 30,
    width: 205,
    height: 35
  },
  scrollArea2: {
    width: '100%',
    height: 123,
    marginTop: 4,
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 34,
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 34,
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 34,
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 34,
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
    color: "#121212",
    fontSize: 14,
    width: 90,
    height: 32,
    marginBottom: 8,
    alignSelf: "center"
  },
  viewAlllBtn: {
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
    height: 345,
    width: '100%',
  }
});

export default MajorScreen;
