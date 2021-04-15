import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function HorizantalRecommendationTbl(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.itemN1Row}>
            
            <View style={styles.itemN1}>
              <View style={styles.gridOutlineStack}>
                <View style={styles.gridOutline}>
                  <View style={styles.titleGrpStack}>
                    <View style={styles.titleGrp}>
                      <Text style={styles.titleHere}>
                        AAUW Return to Learning...
                      </Text>
                    </View>
                    <View style={styles.amountGrp}>
                      <Text style={styles.amountTxt}>$ 2,500</Text>
                    </View>
                    <View style={styles.avaGrp}>
                      <View style={styles.availabilityStack}>
                        <Text style={styles.availability}>Availability:</Text>
                        <Text style={styles.varies}>10</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.deadlineGrpStack}>
                    <View style={styles.deadlineGrp}>
                      <Text style={styles.loremIpsum2}>
                        Apply before: April 01, 2021
                      </Text>
                    </View>
                    <View style={styles.descriptionGrp}>
                      <Text style={styles.description2}>Description:</Text>
                      <Text style={styles.loremIpsum4}>
                        The Lombard Area Branch of AAUW &quot;Return to
                        Learning&quot; scholarship is offered to assist females
                        in completing an undergraduate or master&#39;s degree,{" "}
                        {"\n"}or a certification program. Students must reside
                        in Lombard, Villa Park, Oakbrook Terrace, Wheaton,
                        Addison, Glendale Heights or Glen Ellyn in order to
                        apply and are continuing college after a significant
                        interruption. Special consideration...
                      </Text>
                    </View>
                  </View>
                  <View style={styles.gridActionGrp}>
                    <View style={styles.bookmarkGrpRow}>
                      <View style={styles.bookmarkGrp}>
                        <View style={styles.iconRow}>
                          <MaterialCommunityIconsIcon
                            name="bookmark-plus"
                            style={styles.icon}
                          ></MaterialCommunityIconsIcon>
                          <Text style={styles.bookmark}>Bookmark</Text>
                        </View>
                      </View>
                      <View style={styles.shareGrp}>
                        <View style={styles.icon2Row}>
                          <EntypoIcon
                            name="share"
                            style={styles.icon2}
                          ></EntypoIcon>
                          <Text style={styles.share2}>Share</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.ratingGrp}>
                  <View style={styles.loremIpsumRow}>
                    <Text style={styles.loremIpsum}>3.5</Text>
                    <FontAwesomeIcon
                      name="star"
                      style={styles.ratingIcon}
                    ></FontAwesomeIcon>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.itemN2}>
              <View style={styles.rectStack}>
                <View style={styles.rect}>
                  <View style={styles.rect2Stack}>
                    <View style={styles.rect2}>
                      <Text style={styles.text}>
                        AAUW Return to Learning...
                      </Text>
                    </View>
                    <View style={styles.rect3}>
                      <Text style={styles.text2}>$ 2,500</Text>
                    </View>
                    <View style={styles.rect4}>
                      <View style={styles.availability2Stack}>
                        <Text style={styles.availability2}>Availability:</Text>
                        <Text style={styles.text3}>10</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rect5Stack}>
                    <View style={styles.rect5}>
                      <Text style={styles.text4}>
                        Apply before: April 01, 2021
                      </Text>
                    </View>
                    <View style={styles.rect6}>
                      <Text style={styles.description3}>Description:</Text>
                      <Text style={styles.text5}>
                        The Lombard Area Branch of AAUW &quot;Return to
                        Learning&quot; scholarship is offered to assist females
                        in completing an undergraduate or master&#39;s degree,{" "}
                        {"\n"}or a certification program. Students must reside
                        in Lombard, Villa Park, Oakbrook Terrace, Wheaton,
                        Addison, Glendale Heights or Glen Ellyn in order to
                        apply and are continuing college after a significant
                        interruption. Special consideration...
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rect7}>
                    <View style={styles.rect8Row}>
                      <View style={styles.rect8}>
                        <View style={styles.icon3Row}>
                          <MaterialCommunityIconsIcon
                            name="bookmark-plus"
                            style={styles.icon3}
                          ></MaterialCommunityIconsIcon>
                          <Text style={styles.bookmark2}>Bookmark</Text>
                        </View>
                      </View>
                      <View style={styles.rect9}>
                        <View style={styles.icon4Row}>
                          <EntypoIcon
                            name="share"
                            style={styles.icon4}
                          ></EntypoIcon>
                          <Text style={styles.share3}>Share</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.rect10}>
                  <View style={styles.text6Row}>
                    <Text style={styles.text6}>3.5</Text>
                    <FontAwesomeIcon
                      name="star"
                      style={styles.icon5}
                    ></FontAwesomeIcon>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.itemN3}>
              <View style={styles.rect11Stack}>
                <View style={styles.rect11}>
                  <View style={styles.rect12Stack}>
                    <View style={styles.rect12}>
                      <Text style={styles.text7}>
                        AAUW Return to Learning...
                      </Text>
                    </View>
                    <View style={styles.rect13}>
                      <Text style={styles.text8}>$ 2,500</Text>
                    </View>
                    <View style={styles.rect14}>
                      <View style={styles.availability3Stack}>
                        <Text style={styles.availability3}>Availability:</Text>
                        <Text style={styles.text9}>10</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rect15Stack}>
                    <View style={styles.rect15}>
                      <Text style={styles.text10}>
                        Apply before: April 01, 2021
                      </Text>
                    </View>
                    <View style={styles.rect16}>
                      <Text style={styles.description4}>Description:</Text>
                      <Text style={styles.text11}>
                        The Lombard Area Branch of AAUW &quot;Return to
                        Learning&quot; scholarship is offered to assist females
                        in completing an undergraduate or master&#39;s degree,{" "}
                        {"\n"}or a certification program. Students must reside
                        in Lombard, Villa Park, Oakbrook Terrace, Wheaton,
                        Addison, Glendale Heights or Glen Ellyn in order to
                        apply and are continuing college after a significant
                        interruption. Special consideration...
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rect17}>
                    <View style={styles.rect18Row}>
                      <View style={styles.rect18}>
                        <View style={styles.icon6Row}>
                          <MaterialCommunityIconsIcon
                            name="bookmark-plus"
                            style={styles.icon6}
                          ></MaterialCommunityIconsIcon>
                          <Text style={styles.bookmark3}>Bookmark</Text>
                        </View>
                      </View>
                      <View style={styles.rect19}>
                        <View style={styles.icon7Row}>
                          <EntypoIcon
                            name="share"
                            style={styles.icon7}
                          ></EntypoIcon>
                          <Text style={styles.share4}>Share</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.rect20}>
                  <View style={styles.text12Row}>
                    <Text style={styles.text12}>3.5</Text>
                    <FontAwesomeIcon
                      name="star"
                      style={styles.icon8}
                    ></FontAwesomeIcon>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea: {
    width: "100%",
    height: "100%",
    marginTop: 32
  },
  scrollArea_contentContainerStyle: {
    width: "auto",
    height: 676,
    flexDirection: "row"
  },
  itemN1: {
    flex: 1,
    marginRight: 40,
    marginLeft: 20,
  },
  gridOutline: {
    width: 296,
    height: 575,
    position: "absolute",
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.5)",
    left: 0,
    top: 17
  },
  titleGrp: {
    top: 0,
    height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center"
  },
  titleHere: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 13
  },
  amountGrp: {
    top: 49,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  amountTxt: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 18,
    width: 251,
    marginLeft: 13
  },
  avaGrp: {
    top: 88,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0
  },
  availability: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  varies: {
    left: 91,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  availabilityStack: {
    width: 110,
    height: 19,
    marginTop: 11,
    marginLeft: 13
  },
  titleGrpStack: {
    height: 128,
    marginTop: 50
  },
  deadlineGrp: {
    top: 0,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  loremIpsum2: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    width: 209,
    marginLeft: 13
  },
  descriptionGrp: {
    top: 38,
    left: 0,
    height: 300,
    position: "absolute",
    right: 0
  },
  description2: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 13,
    marginLeft: 13
  },
  loremIpsum4: {

    color: "#121212",
    fontSize: 16,
    width: 250,
    height: 253,
    marginTop: 13,
    alignSelf: "center"
  },
  deadlineGrpStack: {
    height: 338
  },
  gridActionGrp: {
    height: 60,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    flexDirection: "row"
  },
  bookmarkGrp: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginTop: -1
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  bookmark: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  iconRow: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
    marginTop: -1
  },
  shareGrp: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginLeft: 32,
    marginTop: -1
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  share2: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  icon2Row: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: 31,
    marginTop: -1
  },
  bookmarkGrpRow: {
    height: 38,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 12
  },
  ratingGrp: {
    top: 0,
    left: 261,
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    flexDirection: "row"
  },
  loremIpsum: {

    color: "#121212",
    fontSize: 16
  },
  ratingIcon: {
    color: "rgba(213,201,45,1)",
    fontSize: 17,
    marginLeft: 3,
    marginTop: 1
  },
  loremIpsumRow: {
    height: 19,
    flexDirection: "row",
    flex: 1,
    marginRight: 4,
    marginLeft: 5,
    marginTop: 16
  },
  gridOutlineStack: {
    width: 311,
    height: 592,
    marginTop: 42,
    marginLeft: 30
  },
  itemN2: {
    flex: 1,
    marginRight: 40,
    // marginLeft: 28
  },
  rect: {
    width: 296,
    height: 575,
    position: "absolute",
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.5)",
    left: 0,
    top: 17
  },
  rect2: {
    top: 0,
    height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center"
  },
  text: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 13
  },
  rect3: {
    top: 49,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  text2: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 18,
    width: 251,
    marginLeft: 13
  },
  rect4: {
    top: 88,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0
  },
  availability2: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  text3: {
    left: 91,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  availability2Stack: {
    width: 110,
    height: 19,
    marginTop: 11,
    marginLeft: 13
  },
  rect2Stack: {
    height: 128,
    marginTop: 50
  },
  rect5: {
    top: 0,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  text4: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    width: 209,
    marginLeft: 13
  },
  rect6: {
    top: 38,
    left: 0,
    height: 300,
    position: "absolute",
    right: 0
  },
  description3: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 13,
    marginLeft: 13
  },
  text5: {

    color: "#121212",
    fontSize: 16,
    width: 250,
    height: 253,
    marginTop: 13,
    alignSelf: "center"
  },
  rect5Stack: {
    height: 338
  },
  rect7: {
    height: 60,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    flexDirection: "row"
  },
  rect8: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginTop: -1
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  bookmark2: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  icon3Row: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
    marginTop: -1
  },
  rect9: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginLeft: 32,
    marginTop: -1
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  share3: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  icon4Row: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: 31,
    marginTop: -1
  },
  rect8Row: {
    height: 38,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 12
  },
  rect10: {
    top: 0,
    left: 261,
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    flexDirection: "row"
  },
  text6: {

    color: "#121212",
    fontSize: 16
  },
  icon5: {
    color: "rgba(213,201,45,1)",
    fontSize: 17,
    marginLeft: 3,
    marginTop: 1
  },
  text6Row: {
    height: 19,
    flexDirection: "row",
    flex: 1,
    marginRight: 4,
    marginLeft: 5,
    marginTop: 16
  },
  rectStack: {
    width: 311,
    height: 592,
    marginTop: 42,
    // marginLeft: 30
  },
  itemN3: {
    flex: 1,
    marginRight: 40
  },
  rect11: {
    width: 296,
    height: 575,
    position: "absolute",
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.5)",
    left: 0,
    top: 17
  },
  rect12: {
    top: 0,
    height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center"
  },
  text7: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 13
  },
  rect13: {
    top: 49,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  text8: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 18,
    width: 251,
    marginLeft: 13
  },
  rect14: {
    top: 88,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0
  },
  availability3: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  text9: {
    left: 91,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    top: 0
  },
  availability3Stack: {
    width: 110,
    height: 19,
    marginTop: 11,
    marginLeft: 13
  },
  rect12Stack: {
    height: 128,
    marginTop: 50
  },
  rect15: {
    top: 0,
    left: 0,
    height: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  text10: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    width: 209,
    marginLeft: 13
  },
  rect16: {
    top: 38,
    left: 0,
    height: 300,
    position: "absolute",
    right: 0
  },
  description4: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 13,
    marginLeft: 13
  },
  text11: {

    color: "#121212",
    fontSize: 16,
    width: 250,
    height: 253,
    marginTop: 13,
    alignSelf: "center"
  },
  rect15Stack: {
    height: 338
  },
  rect17: {
    height: 60,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    flexDirection: "row"
  },
  rect18: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginTop: -1
  },
  icon6: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  bookmark3: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  icon6Row: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
    marginTop: -1
  },
  rect19: {
    width: 112,
    height: 38,
    flexDirection: "row",
    marginLeft: 32,
    marginTop: -1
  },
  icon7: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  share4: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7
  },
  icon7Row: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: 31,
    marginTop: -1
  },
  rect18Row: {
    height: 38,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 12
  },
  rect20: {
    top: 0,
    left: 261,
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000",
    overflow: "hidden",
    flexDirection: "row"
  },
  text12: {

    color: "#121212",
    fontSize: 16
  },
  icon8: {
    color: "rgba(213,201,45,1)",
    fontSize: 17,
    marginLeft: 3,
    marginTop: 1
  },
  text12Row: {
    height: 19,
    flexDirection: "row",
    flex: 1,
    marginRight: 4,
    marginLeft: 5,
    marginTop: 16
  },
  rect11Stack: {
    width: 311,
    height: 592,
    marginTop: 42,
    // marginLeft: 30
  },
  itemN1Row: {
    height: 676,
    flexDirection: "row",
    flex: 1,
    // marginRight: -788
  }
});

export default HorizantalRecommendationTbl;