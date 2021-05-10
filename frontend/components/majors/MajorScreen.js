import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import MajorCategory from "../../ui/majors/MajorCategory";
import MajorRecommend from "../../ui/majors/MajorRecommend";

class MajorScreen extends React.Component {
  // console.log("Major props check " + JSON.stringify(props.usrInfo));

  constructor(props) {
		super(props);
		this.state = {
			userProfile: this.props.usrInfo,
		};
	}

  render() {
    // console.log("user obj from major screen: " + JSON.stringify(this.props.usrInfo));
    return (
      <View style={styles.container}>
        <View style={styles.container_grp}>

          {/* Major Category */}
          <MajorCategory usrProf={this.props.usrInfo} />

          <View style={styles.recommend_containerStack}>

            {/* Major Recommend */}
            <MajorRecommend usrProf={this.props.usrInfo} />

            {/* Recent View ScrollView */}
            <View style={styles.recent_container}>
              <View style={styles.recentGrp}>
                <Text style={styles.recentTxt}>Recent Viewed</Text>
                <View style={styles.scrollArea2}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={
                      styles.scrollArea2_contentContainerStyle
                    }
                  >
                    <View style={styles.rvBtn1Row}>
                      <TouchableOpacity style={styles.rvBtn1}>
                        <MaterialCommunityIcons
                          name="table-of-contents"
                          style={styles.rvIcon1}
                        ></MaterialCommunityIcons>
                        <View style={styles.rvIcon1Filler}></View>
                        <Text style={styles.rvTxt1}>Place{"\n"}Holder 1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rvBtn2}>
                        <MaterialCommunityIcons
                          name="table-of-contents"
                          style={styles.rvIcon2}
                        ></MaterialCommunityIcons>
                        <View style={styles.rvIcon2Filler}></View>
                        <Text style={styles.rvTxt2}>Place{"\n"}Holder 2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rvBtn2}>
                        <MaterialCommunityIcons
                          name="table-of-contents"
                          style={styles.rvIcon3}
                        ></MaterialCommunityIcons>
                        <View style={styles.rvIcon3Filler}></View>
                        <Text style={styles.rvTxt3}>Place{"\n"}Holder 3</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rvBtn2}>
                        <MaterialCommunityIcons
                          name="table-of-contents"
                          style={styles.rvIcon4}
                        ></MaterialCommunityIcons>
                        <View style={styles.rvIcon4Filler}></View>
                        <Text style={styles.rvTxt4}>Place{"\n"}Holder 4</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rvBtn2}>
                        <MaterialCommunityIcons
                          name="table-of-contents"
                          style={styles.rvIcon5}
                        ></MaterialCommunityIcons>
                        <View style={styles.rvIcon5Filler}></View>
                        <Text style={styles.rvTxt5}>Place{"\n"}Holder 5</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rvBtn2}>
                        <FontAwesome
                          name="arrow-circle-right"
                          style={styles.customIcon}>
                        </FontAwesome>
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_grp: {
    flex: 1,
    width: '100%',
    // backgroundColor: "#FFFFFF",
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
    color: "#007FF9",
    fontSize: 30,
    width: 215,
    height: 40,
    fontWeight: "bold",
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
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    marginLeft: 10,
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
    backgroundColor: "white",
    marginLeft: 12,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
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
