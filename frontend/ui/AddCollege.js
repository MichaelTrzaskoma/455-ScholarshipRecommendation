import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import CollegeSurvey from "../components/CollegeSurvey";

export default function AddCollege(emailer) {
    const navigation = useNavigation();
    let email = emailer;
    
    return (

        <TouchableOpacity style={styles.addCollegeQuizBtn}
            onPress={() => navigation.navigate(CollegeSurvey, { title: "Input Required Info", emailx: email })}
        >

            <View style={styles.addCollegeQuizIconRow}>
                <MaterialIconsIcon
                    name="playlist-add"
                    style={styles.addCollegeQuizIcon}></MaterialIconsIcon>
                <Text style={styles.addCollegeQuizTxt}>
                    Add College Preferences
              </Text>
            </View>
            <View style={styles.addCollegeQuizIconRowFiller}></View>
            <EntypoIcon
                name="chevron-small-right"
                style={styles.rightArrowIcon2}></EntypoIcon>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 0,
        justifyContent: 'center',
    },
    content_container: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    usrInfoContainer: {
        height: 113,
        backgroundColor: '#e6e6e6',
        marginTop: 50,
    },
    usrIcon: {
        color: 'rgba(155,155,155,1)',
        fontSize: 80,
    },
    nameTxt: {
        color: '#121212',
        fontSize: 16,
        fontWeight: "bold",
    },
    emailTxt: {
        color: '#121212',
        fontSize: 16,
        marginTop: 11,
        fontWeight: "bold",
    },
    nameTxtColumn: {
        width: "auto",
        marginLeft: 18,
        marginTop: 17,
        marginBottom: 19,
    },
    namePlaceHolder: {
        color: '#121212',
        height: 20,
        width: "auto",
        fontSize: 16,
        marginLeft: 2,
    },
    usrEmailTxt_display: {
        color: '#121212',
        height: 20,
        width: "auto",
        fontSize: 16,
        marginTop: 13,
    },
    namePlaceHolderColumn: {
        width: "auto",
        marginLeft: 7,
        marginTop: 17,
        marginBottom: 20,
    },
    usrIconRow: {
        height: 87,
        flexDirection: 'row',
        marginTop: 13,
        marginLeft: 15,
        marginRight: 38,
    },
    accBtnGrp: {
        height: 282,
        marginTop: 58,
    },
    addScholarshipQuizBtn: {
        height: 50,
        backgroundColor: 'rgba(230, 230, 230,1)',
        borderBottomWidth: 0,
        flexDirection: 'row',
    },
    addScholarshipQuizIcon: {
        color: 'rgba(107,164,39,1)',
        fontSize: 35,
    },
    addScholarshipQuizTxt: {
        color: '#121212',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 8,
    },
    addScholarshipQuizIconRow: {
        height: 35,
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 8,
    },
    addScholarshipQuizIconRowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    rightArrowIcon1: {
        color: 'rgba(155,155,155,1)',
        fontSize: 40,
        marginRight: 6,
        marginTop: 3,
    },
    addCollegeQuizBtn: {
        height: 50,
        backgroundColor: 'rgba(230, 230, 230,1)',
        borderWidth: 0,
        borderColor: '#ADADAD',
        borderTopWidth: 0.5,
        flexDirection: 'row',
    },
    addCollegeQuizIcon: {
        color: 'rgba(107,164,39,1)',
        fontSize: 35,
        marginTop: -1,
    },
    addCollegeQuizTxt: {
        color: '#121212',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 6,
    },
    addCollegeQuizIconRow: {
        height: 35,
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 9,
    },
    addCollegeQuizIconRowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    rightArrowIcon2: {
        color: 'rgba(155,155,155,1)',
        fontSize: 40,
        marginRight: 6,
        marginTop: 3,
    },
    addMajorQuizBtn: {
        height: 50,
        backgroundColor: 'rgba(230, 230, 230,1)',
        borderWidth: 0,
        borderColor: '#ADADAD',
        borderTopWidth: 0.25,
        flexDirection: 'row',
    },
    addMajorQuizIcon: {
        color: 'rgba(107,164,39,1)',
        fontSize: 35,
        marginTop: -1,
    },
    addMajorQuizTxt: {
        color: '#121212',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 7,
    },
    addMajorQuizIconRow: {
        height: 35,
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 9,
    },
    addMajorQuizIconRowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    rightArrowIcon3: {
        color: 'rgba(155,155,155,1)',
        fontSize: 40,
        marginRight: 6,
        marginTop: 3,
    },
    bookmarksBtn: {
        height: 50,
        backgroundColor: 'rgba(230, 230, 230,1)',
        flexDirection: 'row',
        marginTop: 16,
    },
    bookmarksIcon: {
        color: 'rgba(48,132,188,1)',
        fontSize: 35,
        width: 26,
        height: 38,
    },
    bookmarksTxt: {
        color: '#121212',
        fontSize: 16,
        marginLeft: 24,
        marginTop: 8,
    },
    bookmarksIconRow: {
        height: 38,
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 8,
    },
    bookmarksIconRowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    rightArrowIcon4: {
        color: 'rgba(155,155,155,1)',
        fontSize: 40,
        marginRight: 7,
        alignSelf: 'center',
    },
    signoutBtn: {
        height: 50,
        backgroundColor: 'rgba(230, 230, 230,1)',
        flexDirection: 'row',
        marginTop: 16,
    },
    signOutIcon: {
        color: 'rgba(236,78,96,1)',
        fontSize: 35,
    },
    signoutTxt: {
        color: '#121212',
        fontSize: 16,
        marginLeft: 18,
        marginTop: 8,
    },
    signOutIconRow: {
        height: 35,
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 8,
    },
    signOutIconRowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    rightArrowIcon5: {
        color: 'rgba(155,155,155,1)',
        fontSize: 40,
        marginRight: 7,
        alignSelf: 'center',
    },
});
