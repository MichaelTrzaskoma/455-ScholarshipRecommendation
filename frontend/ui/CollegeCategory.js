import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function CollegeCategory() {
    return (
        // Cateogry ScrollView 
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
      height: 34,
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
  