import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ViewRecommendTbl_3(props) {
    return (
        <View style={styles.container}>
            <View style={styles.scrollArea2Stack}>
                <View style={styles.scrollArea2}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollArea2_contentContainerStyle}
                    >
                        <View style={styles.sort_a2zGrpRow}>
                            <View style={styles.sort_a2zGrp}>
                                <View style={styles.a2zIconRow}>
                                    <FontAwesome
                                        name="sort-alpha-asc"
                                        style={styles.a2zIcon}
                                    ></FontAwesome>
                                    <Text style={styles.title2}>Title</Text>
                                    <FontAwesome
                                        name="sort-down"
                                        style={styles.dropdownIcon1}
                                    ></FontAwesome>
                                </View>
                            </View>
                        </View>
                        <View style={styles.group}>
                            <View style={styles.icon18Row}>
                                <FontAwesome
                                    name="sort-alpha-asc"
                                    style={styles.icon18}
                                ></FontAwesome>
                                <Text style={styles.deadline}>Deadline</Text>
                                <FontAwesome
                                    name="sort-down"
                                    style={styles.icon19}
                                ></FontAwesome>
                            </View>
                        </View>
                        <View style={styles.group2}>
                            <View style={styles.icon20Row}>
                                <FontAwesome
                                    name="sort-alpha-asc"
                                    style={styles.icon20}
                                ></FontAwesome>
                                <Text style={styles.score}>Score</Text>
                                <FontAwesome
                                    name="sort-down"
                                    style={styles.icon21}
                                ></FontAwesome>
                            </View>
                        </View>
                        <View style={styles.group3}>
                            <View style={styles.icon22Row}>
                                <FontAwesome
                                    name="sort-alpha-asc"
                                    style={styles.icon22}
                                ></FontAwesome>
                                <Text style={styles.amount2}>Amount</Text>
                                <FontAwesome
                                    name="sort-down"
                                    style={styles.icon23}
                                ></FontAwesome>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.scrollArea}>
                    <ScrollView
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollArea_contentContainerStyle}
                    >
                        <TouchableOpacity style={styles.itemN1}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.titleTxt}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.ratingGrpStack}>
                                        <View style={styles.ratingGrp}>
                                            <View style={styles.ratingTxtRow}>
                                                <Text style={styles.ratingTxt}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.ratingIcon}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.amountGrp}>
                                            <Text style={styles.amountTxt}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dateGrp}>
                                        <Text style={styles.dateTxt}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon2}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc. Academic Scholarship
                                    </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect5Stack}>
                                        <View style={styles.rect5}>
                                            <View style={styles.text2Row}>
                                                <Text style={styles.text2}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon3}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect6}>
                                            <Text style={styles.text3}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect7}>
                                        <Text style={styles.text4}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon4}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text5}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect11Stack}>
                                        <View style={styles.rect11}>
                                            <View style={styles.text6Row}>
                                                <Text style={styles.text6}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon5}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect12}>
                                            <Text style={styles.text7}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect13}>
                                        <Text style={styles.text8}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon6}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text9}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect17Stack}>
                                        <View style={styles.rect17}>
                                            <View style={styles.text10Row}>
                                                <Text style={styles.text10}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon7}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect18}>
                                            <Text style={styles.text11}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect19}>
                                        <Text style={styles.text12}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon8}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text13}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect23Stack}>
                                        <View style={styles.rect23}>
                                            <View style={styles.text14Row}>
                                                <Text style={styles.text14}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon9}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect24}>
                                            <Text style={styles.text15}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect25}>
                                        <Text style={styles.text16}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon10}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text17}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect29Stack}>
                                        <View style={styles.rect29}>
                                            <View style={styles.text18Row}>
                                                <Text style={styles.text18}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon11}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect30}>
                                            <Text style={styles.text19}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect31}>
                                        <Text style={styles.text20}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon12}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text21}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect35Stack}>
                                        <View style={styles.rect35}>
                                            <View style={styles.text22Row}>
                                                <Text style={styles.text22}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon13}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect36}>
                                            <Text style={styles.text23}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect37}>
                                        <Text style={styles.text24}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon14}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text25}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect41Stack}>
                                        <View style={styles.rect41}>
                                            <View style={styles.text26Row}>
                                                <Text style={styles.text26}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon15}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect42}>
                                            <Text style={styles.text27}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect43}>
                                        <Text style={styles.text28}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemN2}>
                            <View style={styles.iconGrp}>
                                <FontAwesome
                                    name="graduation-cap"
                                    style={styles.icon16}
                                ></FontAwesome>
                            </View>
                            <View style={styles.txtGrp}>
                                <View style={styles.txtUpGrp}>
                                    <Text style={styles.text29}>
                                        ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                    Academic Scholarship
                  </Text>
                                </View>
                                <View style={styles.txtDownGrp}>
                                    <View style={styles.rect47Stack}>
                                        <View style={styles.rect47}>
                                            <View style={styles.text30Row}>
                                                <Text style={styles.text30}>3.5</Text>
                                                <FontAwesome
                                                    name="star"
                                                    style={styles.icon17}
                                                ></FontAwesome>
                                            </View>
                                        </View>
                                        <View style={styles.rect48}>
                                            <Text style={styles.text31}>$ 1,000</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rect49}>
                                        <Text style={styles.text32}>04/01/2021</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    scrollArea2: {
        height: 40,
        position: "absolute",
        backgroundColor: "#007FF9",
        width: "100%",
    },
    scrollArea2_contentContainerStyle: {
        width: "100%",
        height: 40,
        flexDirection: "row"
    },
    sort_a2zGrp: {
        width: 80,
        height: 27,
        borderRadius: 10,
        backgroundColor: "white",
        overflow: "hidden",
        flexDirection: "row"
    },
    a2zIcon: {
        color: "rgba(128,128,128,1)",
        fontSize: 15,
        marginTop: 4
    },
    title2: {
        color: "#121212",
        marginLeft: 7,
        marginTop: 2,
    },
    dropdownIcon1: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginLeft: 6,
        marginTop: -2,
    },
    a2zIconRow: {
        height: 23,
        flexDirection: "row",
        flex: 1,
        marginRight: 9,
        marginLeft: 8,
        marginTop: 2
    },
    group: {
        width: 105,
        height: 27,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        overflow: "hidden",
        flexDirection: "row",
        marginLeft: 9,
        marginTop: 6,
    },
    icon18: {
        color: "rgba(128,128,128,1)",
        fontSize: 15,
        marginTop: 4
    },
    deadline: {
        color: "#121212",
        marginLeft: 7,
        marginTop: 2,
    },
    icon19: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginLeft: 5,
        marginTop: -2,
    },
    icon18Row: {
        height: 23,
        flexDirection: "row",
        flex: 1,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 2,
        backgroundColor: "white",
    },
    group2: {
        width: 90,
        height: 27,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        overflow: "hidden",
        flexDirection: "row",
        marginLeft: 9,
        marginTop: 6,
    },
    icon20: {
        color: "rgba(128,128,128,1)",
        fontSize: 15,
        marginTop: 4
    },
    score: {
        color: "#121212",
        marginLeft: 7,
        marginTop: 2,
    },
    icon21: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginLeft: 6,
        marginTop: -2,
    },
    icon20Row: {
        height: 23,
        flexDirection: "row",
        flex: 1,
        marginRight: 10,
        marginLeft: 8,
        marginTop: 2,
        backgroundColor: "white",
    },
    group3: {
        width: 100,
        height: 27,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        overflow: "hidden",
        flexDirection: "row",
        marginLeft: 9,
        marginTop: 6,
    },
    icon22: {
        color: "rgba(128,128,128,1)",
        fontSize: 15,
        marginTop: 4
    },
    amount2: {
        color: "#121212",
        marginLeft: 7,
        marginTop: 2,
    },
    icon23: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        marginLeft: 5,
        marginTop: -2,
    },
    icon22Row: {
        height: 23,
        flexDirection: "row",
        flex: 1,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 2,
        backgroundColor: "white",
    },
    sort_a2zGrpRow: {
        height: 27,
        flexDirection: "row",
        flex: 1,
        marginLeft: 9,
        marginTop: 6,
    },
    scrollArea: {
        top: 38,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
    },
    scrollArea_contentContainerStyle: {
        height: 810
    },
    itemN1: {
        height: 90,
        borderWidth: 0,
        // borderColor: "rgba(203,199,199,1)",
        // borderTopWidth: 1,
        flexDirection: "row",
        backgroundColor: "white",
    },
    iconGrp: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    txtUpGrp: {
        top: -5,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    titleTxt: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    txtDownGrp: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    ratingGrp: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    ratingTxt: {

        color: "#121212"
    },
    ratingIcon: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    ratingTxtRow: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    amountGrp: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    amountTxt: {

        color: "#121212",
        alignSelf: "center"
    },
    ratingGrpStack: {
        flex: 1,
        marginRight: 54
    },
    dateGrp: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    dateTxt: {

        color: "#121212",
        alignSelf: "center"
    },
    txtGrp: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN2: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row",
        backgroundColor: "white",
    },
    rect2: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon2: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect3: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect4: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect5: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text2: {

        color: "#121212"
    },
    icon3: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text2Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect6: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text3: {

        color: "#121212",
        alignSelf: "center"
    },
    rect5Stack: {
        flex: 1,
        marginRight: 54
    },
    rect7: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text4: {

        color: "#121212",
        alignSelf: "center"
    },
    rect3Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN3: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect8: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon4: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect9: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text5: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect10: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect11: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text6: {

        color: "#121212"
    },
    icon5: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text6Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect12: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text7: {

        color: "#121212",
        alignSelf: "center"
    },
    rect11Stack: {
        flex: 1,
        marginRight: 54
    },
    rect13: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text8: {

        color: "#121212",
        alignSelf: "center"
    },
    rect9Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN4: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect14: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon6: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect15: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text9: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect16: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect17: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text10: {

        color: "#121212"
    },
    icon7: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text10Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect18: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text11: {

        color: "#121212",
        alignSelf: "center"
    },
    rect17Stack: {
        flex: 1,
        marginRight: 54
    },
    rect19: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text12: {

        color: "#121212",
        alignSelf: "center"
    },
    rect15Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN5: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect20: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon8: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect21: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text13: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect22: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect23: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text14: {

        color: "#121212"
    },
    icon9: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text14Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect24: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text15: {

        color: "#121212",
        alignSelf: "center"
    },
    rect23Stack: {
        flex: 1,
        marginRight: 54
    },
    rect25: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text16: {

        color: "#121212",
        alignSelf: "center"
    },
    rect21Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN6: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect26: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon10: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect27: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text17: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect28: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect29: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text18: {

        color: "#121212"
    },
    icon11: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text18Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect30: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text19: {

        color: "#121212",
        alignSelf: "center"
    },
    rect29Stack: {
        flex: 1,
        marginRight: 54
    },
    rect31: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text20: {

        color: "#121212",
        alignSelf: "center"
    },
    rect27Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN7: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect32: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon12: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect33: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text21: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect34: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect35: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text22: {

        color: "#121212"
    },
    icon13: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text22Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect36: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text23: {

        color: "#121212",
        alignSelf: "center"
    },
    rect35Stack: {
        flex: 1,
        marginRight: 54
    },
    rect37: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text24: {

        color: "#121212",
        alignSelf: "center"
    },
    rect33Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN8: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect38: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon14: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect39: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text25: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect40: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect41: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text26: {

        color: "#121212"
    },
    icon15: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text26Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect42: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text27: {

        color: "#121212",
        alignSelf: "center"
    },
    rect41Stack: {
        flex: 1,
        marginRight: 54
    },
    rect43: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text28: {

        color: "#121212",
        alignSelf: "center"
    },
    rect39Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    itemN9: {
        height: 90,
        borderWidth: 0,
        borderColor: "rgba(203,199,199,1)",
        borderTopWidth: 1,
        flexDirection: "row"
    },
    rect44: {
        borderRadius: 5,
        backgroundColor: "rgba(230, 230, 230,1)",
        height: 70,
        justifyContent: "center",
        flex: 1,
        marginRight: 14,
        marginLeft: 10,
        alignSelf: "center"
    },
    icon16: {
        color: "rgba(143,143,143,1)",
        fontSize: 40,
        alignSelf: "center"
    },
    rect45: {
        top: -1,
        width: 266,
        height: 60,
        position: "absolute",
        right: 0,
        justifyContent: "center"
    },
    text29: {

        color: "#121212",
        fontSize: 14,
        textAlign: "left",
        height: 35
    },
    rect46: {
        width: 266,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    rect47: {
        left: 0,
        position: "absolute",
        top: 0,
        right: 61,
        bottom: 2,
        flexDirection: "row"
    },
    text30: {

        color: "#121212"
    },
    icon17: {
        color: "rgba(248,194,28,1)",
        fontSize: 15,
        marginLeft: 7,
        marginTop: 1
    },
    text30Row: {
        height: 16,
        flexDirection: "row",
        flex: 1,
        marginRight: 7,
        marginTop: 6
    },
    rect48: {
        left: 45,
        width: 63,
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center"
    },
    text31: {

        color: "#121212",
        alignSelf: "center"
    },
    rect47Stack: {
        flex: 1,
        marginRight: 54
    },
    rect49: {
        width: 110,
        justifyContent: "center",
        marginRight: -6
    },
    text32: {

        color: "#121212",
        alignSelf: "center"
    },
    rect45Stack: {
        width: 266,
        height: 85,
        marginTop: 2
    },
    scrollArea2Stack: {
        flex: 1,
        // marginBottom: -1
    }
});