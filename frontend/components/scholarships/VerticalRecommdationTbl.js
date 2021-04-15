import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function VertialRecommendationTbl(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <TouchableOpacity style={styles.itemN1}>
           <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.ratingIcon}
                      ></FontAwesomeIcon>
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
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon2}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
              <View style={styles.txtUpGrp}>
                <Text style={styles.text}>
                  ABC Humane Wildlife Control &amp; {"\n"}Prevention, Inc.
                  Academic Scholarship
                </Text>
              </View>
              <View style={styles.txtDownGrp}>
                <View style={styles.rect5Stack}>
                  <View style={styles.rect5}>
                    <View style={styles.text2Row}>
                      <Text style={styles.text2}>3.5</Text>
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon3}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN3}>          
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon4}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon5}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN4}>          
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon6}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon7}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN5}>
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon8}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon9}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN6}>
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon10}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon11}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN7}>
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon12}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon13}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN8}>
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon14}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon15}
                      ></FontAwesomeIcon>
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
          
          <TouchableOpacity style={styles.itemN9}>
            <View style={styles.iconGrp}>
              <FontAwesomeIcon
                name="graduation-cap"
                style={styles.icon16}
              ></FontAwesomeIcon>
            </View>
            <View style={styles.txtUpGrpStack}>
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
                      <FontAwesomeIcon
                        name="star"
                        style={styles.icon17}
                      ></FontAwesomeIcon>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    flex: 1,
    marginTop: 25,
    width: "100%",
    height: "100%",
    // marginBottom: -5,
    alignSelf: "center"
  },
  scrollArea_contentContainerStyle: {
    height: "auto",
    width: "100%"
  },
  itemN1: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  txtUpGrp: {
    top: -1,
    // left: 0,
    right: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  titleTxt: {
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  txtDownGrp: {
    // left: 0,
    right: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
  txtUpGrpStack: {
    width: 266,
    height: 85,
    // marginLeft: 94,
    right: 0,
    marginTop: 2
  },
  iconGrp: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: "center"
  },
  icon: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN2: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect3: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect4: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect2: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon2: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN3: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect9: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text5: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect10: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect8: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon4: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN4: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect15: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text9: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect16: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect14: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon6: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN5: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect21: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text13: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect22: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect20: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon8: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN6: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect27: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text17: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect28: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect26: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon10: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN7: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect33: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text21: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect34: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect32: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon12: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN8: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect39: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text25: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect40: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect38: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon14: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  },
  itemN9: {
    height: 90,
    borderWidth: 0,
    borderColor: "rgba(203,199,199,1)",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  rect45: {
    top: -1,
    left: 0,
    width: 266,
    height: 60,
    position: "absolute",
    justifyContent: "center"
  },
  text29: {
    
    color: "#121212",
    fontSize: 14,
    textAlign: "left",
    height: 35
  },
  rect46: {
    left: 0,
    width: 266,
    height: 30,
    position: "absolute",
    bottom: 0,
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
    marginLeft: 94,
    marginTop: 2
  },
  rect44: {
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
    height: 70,
    justifyContent: "center",
    flex: 1,
    marginRight: 279,
    marginLeft: -350,
    alignSelf: "center"
  },
  icon16: {
    color: "rgba(143,143,143,1)",
    fontSize: 40,
    alignSelf: "center"
  }
});

export default VertialRecommendationTbl;