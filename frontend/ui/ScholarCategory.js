import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

export default function ScholarCategory() {
    const navigation = useNavigation();

    return (
        <View style={styles.category_container}>
            <View style={styles.categoryGrp}>
                <Text style={styles.category_txt}>Category</Text>
                <View style={styles.scrollArea}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        Å contentContainerStyle={styles.scrollArea_contentContaiclearnerStyle}>
                        <View style={styles.amGrpRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewSubCate", {
                                        title: "Academic Major List",
                                        itemKey: "Academic Major",
                                    });
                                }}
                                style={styles.amGrp}>
                                <FontAwesomeIcon
                                    name="university"
                                    style={styles.gridItemIcon}></FontAwesomeIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_2lines}>
                                    Academic{'\n'}Major
                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewSubCate", {
                                        title: "GPA List",
                                        itemKey: "Grade Point Average",
                                    });
                                }}
                                style={styles.gridItemBtn}>
                                <MaterialCommunityIconsIcon
                                    name="google-spreadsheet"
                                    style={styles.gpa_icon}></MaterialCommunityIconsIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_1line}>GPA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewSubCate", {
                                        title: "Age List",
                                        itemKey: "Age",
                                    });
                                }}
                                style={styles.gridItemBtn}>
                                <FeatherIcon
                                    name="target"
                                    style={styles.gridItemIcon}></FeatherIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_1line}>Age</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewSubCate", {
                                        title: "Residence State List",
                                        itemKey: "Residence State",
                                    });
                                }}
                                style={styles.gridItemBtn}>
                                <MaterialCommunityIconsIcon
                                    name="city-variant-outline"
                                    style={styles.gridItemIcon}></MaterialCommunityIconsIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_1line}>State</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewSubCate", {
                                        title: "Deadline List",
                                        itemKey: "Deadline",
                                    });
                                }}
                                style={styles.gridItemBtn}>
                                <FontAwesomeIcon
                                    name="calendar"
                                    style={styles.gridItemIcon}></FontAwesomeIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_1line}>Deadline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ViewAllScholar", {
                                        title: "All Category List",
                                    });
                                }}
                                style={styles.gridItemBtn}>
                                <FontAwesomeIcon
                                    name="arrow-circle-right"
                                    style={styles.gridItemIcon}></FontAwesomeIcon>
                                <View style={styles.gridItemIconFiller}></View>
                                <Text style={styles.gridItemTxt_1line}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

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
    category_txt: {
        color: '#4a76ff',
        fontSize: 30,
        width: 177,
        height: 40,
    },
    scrollArea: {
        width: '100%',
        height: 123,
        marginTop: 4,
    },
    scrollArea_contentContainerStyle: {
        width: 720,
        height: 123,
        flexDirection: 'row',
    },
    amGrpRow: {
        height: 110,
        flexDirection: 'row',
        flex: 1,
        marginRight: -388,
        marginTop: 7,
    },
    amGrp: {
        width: 110,
        height: 110,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 0,
        borderColor: '#000000',
        borderLeftWidth: 0,
        backgroundColor: 'rgba(230, 230, 230,1)',
    },
    gridItemIcon: {
        color: 'rgba(128,128,128,1)',
        fontSize: 35,
        marginTop: 14,
        marginLeft: 10,
    },
    gridItemIconFiller: {
        flex: 1,
    },
    gridItemTxt_2lines: {
        color: '#121212',
        fontSize: 14,
        width: 90,
        height: 35,
        marginBottom: 8,
        alignSelf: 'center',
    },
    gridItemBtn: {
        width: 110,
        height: 110,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 0,
        borderColor: '#000000',
        borderLeftWidth: 0,
        backgroundColor: 'rgba(230, 230, 230,1)',
        marginLeft: 12,
    },
    gpa_icon: {
        color: 'rgba(128,128,128,1)',
        fontSize: 40,
        width: 40,
        height: 44,
        marginTop: 10,
        marginLeft: 7,
    },
    gridItemTxt_1line: {
        color: '#121212',
        fontSize: 14,
        width: 90,
        height: 20,
        marginBottom: 8,
        alignSelf: 'center',
    },



})