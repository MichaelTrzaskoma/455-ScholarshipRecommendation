import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { parseMonth, parseAmount, parseSimilarScore, dynamicSort, mergeSort_a2z, mergeSort_z2a } from "../../functions/utilities";
import { FlatList } from 'react-native-gesture-handler';

export default class CollegeRecommendTbl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrProfile,
      isLoading: true,
      collegeArr: [],
      gender: '',
      opt_title_visible: false,
      opt_deadline_visible: false,
      opt_score_visible: false,
      opt_amount_visible: false,
    };
  }

  _openTitleMenu = () => { this.setState({ opt_title_visible: true }) };
  _closeTitleMenu = () => { this.setState({ opt_title_visible: false }) };

  _openDeadlineMenu = () => { this.setState({ opt_deadline_visible: true }) };
  _closeDeadlineMenu = () => { this.setState({ opt_deadline_visible: false }) };

  _openScoreMenu = () => { this.setState({ opt_score_visible: true }) };
  _closeScoreMenu = () => { this.setState({ opt_score_visible: false }) };

  _openAmountMenu = () => { this.setState({ opt_amount_visible: true }) };
  _closeAmountMenu = () => { this.setState({ opt_amount_visible: false }) };

  sortTitleHandler_a2z() {
    this.state.collegeArr.sort(dynamicSort("key"));
    // console.log(this.state.collegeArr);
    this._closeTitleMenu();
  }

  sortTitleHandler_z2a() {
    this.state.collegeArr.sort(dynamicSort("-key"));
    // console.log(this.state.collegeArr);
    this._closeTitleMenu();
  }

  sortDeadlineHandler_a2z() {
    this.state.collegeArr.sort(dynamicSort("deadline"));
    // console.log(this.state.collegeArr);
    this._closeDeadlineMenu();
  }

  sortDeadlineHandler_z2a() {
    this.state.collegeArr.sort(dynamicSort("-deadline"));
    // console.log(this.state.collegeArr);
    this._closeDeadlineMenu();
  }

  sortScoreHandler_a2z() {
    this.state.collegeArr.sort(dynamicSort("score"));
    // console.log(this.state.collegeArr);
    this._closeScoreMenu();
  }

  sortScoreHandler_z2a() {
    this.state.collegeArr.sort(dynamicSort("-score"));
    // console.log(this.state.collegeArr);
    this._closeScoreMenu();
  }

  sortAmountHandler_a2z() {
    this.setState({
      collegeArr: mergeSort_a2z(this.state.collegeArr),
    });
    // this.state.collegeArr.sort(sortAmount("amount"));
    // console.log(this.state.collegeArr);
    this._closeAmountMenu();
  }

  sortAmountHandler_z2a() {
    // mergeSort_z2a
    this.setState({
      collegeArr: mergeSort_z2a(this.state.collegeArr),
    });
    // this.state.collegeArr.sort(sortAmount("-amount"));
    // console.log(this.state.collegeArr);
    this._closeAmountMenu();
  }

  componentDidMount() {
    this.getRecommend_college();
  }

  getRecommend_college() {
    try {
      // console.log("Email from scholarshipRecommendTBL.js: " + this.state.usrInfo.email);
      let URL = "http://b9d79f8fdd3c.ngrok.io//api/v1.2/users/id/"+ this.state.usrInfo.email + "/"+this.state.usrInfo.jwt + "/"+this.state.usrInfo.uuid+ "/recommends/college";   
      // http://localhost:5000/api/v1.2/users/id/hchen60@nyit.edu/recommends/scholarship
      const collegeArr = [];

      fetch(URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          json.forEach((res) => {

            // append the API data to local var
            collegeArr.push({
              key: res.Name,
              // amount: parseInt(parseAmount(res.Amount)),
              amount: parseInt(res.Amount),
              deadline: deadline,
              score: parseSimilarScore(res.Val),
            });
          });

          // set the local var to state var
          this.setState({
            collegeArr,
            isLoading: false,
          });

        })

    } catch (error) {
      // error handler
      alert("An error occurred: " + error);
    }

  };

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  }

  render() {
    // console.log("Checking ViewRecommendTbl " + JSON.stringify(this.props.route.params.usrProfile ));
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <Provider>
        <StatusBar backgroundColor="#007FF9" barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.scrollArea2Stack}>

            <View style={styles.scrollArea2}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                  styles.scrollArea2_contentContainerStyle
                }>


                <Menu
                  visible={this.state.opt_title_visible}
                  onDismiss={this._closeTitleMenu}
                  anchor={
                    <TouchableOpacity
                      onPress={this._openTitleMenu}
                      style={styles.group0}>
                      <View style={styles.sort_a2zGrp}>
                        <View style={styles.a2zIconRow}>
                          <FontAwesome
                            name="sort-alpha-asc"
                            style={styles.a2zIcon}></FontAwesome>
                          <Text style={styles.title2}>Title</Text>
                          <FontAwesome
                            name="sort-down"
                            style={styles.dropdownIcon1}></FontAwesome>
                        </View>
                      </View>
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortTitleHandler_a2z();
                    }}
                    title="A - Z"
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortTitleHandler_z2a();
                    }} title="Z - A" />
                </Menu>


                <Menu
                  visible={this.state.opt_deadline_visible}
                  onDismiss={this._closeDeadlineMenu}
                  anchor={
                    <TouchableOpacity
                      onPress={this._openDeadlineMenu}
                      style={styles.group}>
                      <View style={styles.icon18Row}>
                        <FontAwesome
                          name="sort-alpha-asc"
                          style={styles.icon18}></FontAwesome>
                        <Text style={styles.deadline}>Deadline</Text>
                        <FontAwesome
                          name="sort-down"
                          style={styles.icon19}></FontAwesome>
                      </View>
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortDeadlineHandler_a2z();
                    }}
                    title="A - Z"
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortDeadlineHandler_z2a();
                    }} title="Z - A" />
                </Menu>


                <Menu
                  visible={this.state.opt_score_visible}
                  onDismiss={this._closeScoreMenu}
                  anchor={
                    <TouchableOpacity
                      onPress={this._openScoreMenu}
                      style={styles.group2}>
                      <View style={styles.icon20Row}>
                        <FontAwesome
                          name="sort-alpha-asc"
                          style={styles.icon20}></FontAwesome>
                        <Text style={styles.score}>Score</Text>
                        <FontAwesome
                          name="sort-down"
                          style={styles.icon21}></FontAwesome>
                      </View>
                    </TouchableOpacity>}>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortScoreHandler_a2z();
                    }}
                    title="A - Z"
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortScoreHandler_z2a();
                    }} title="Z - A" />
                </Menu>


                <Menu
                  visible={this.state.opt_amount_visible}
                  onDismiss={this._closeAmountMenu}
                  anchor={
                    <TouchableOpacity
                      onPress={this._openAmountMenu}
                      style={styles.group3}>
                      <View style={styles.icon22Row}>
                        <FontAwesome
                          name="sort-alpha-asc"
                          style={styles.icon22}></FontAwesome>
                        <Text style={styles.amount2}>Amount</Text>
                        <FontAwesome
                          name="sort-down"
                          style={styles.icon23}></FontAwesome>
                      </View>
                    </TouchableOpacity>}>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortAmountHandler_a2z();
                    }}
                    title="A - Z"
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortAmountHandler_z2a();
                    }} title="Z - A" />
                </Menu>


              </ScrollView>
            </View>

            <View style={styles.scrollArea}>

              <FlatList
                data={this.state.collegeArr}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) => (

                  <TouchableOpacity
                    style={styles.itemN2}
                    onPress={() => {
                      this.props.navigation.navigate("ViewScholarDetail", {
                        title: item.key,
                        itemKey: item.key,
                      });
                    }}
                  >
                    <View style={styles.iconGrp}>
                      <FontAwesome
                        name="graduation-cap"
                        style={styles.icon2}></FontAwesome>
                    </View>
                    <View style={styles.txtGrp}>
                      <View style={styles.txtUpGrp}>
                        <Text style={styles.text}>{item.key}</Text>
                      </View>
                      <View style={styles.txtDownGrp}>
                        <View style={styles.rect5Stack}>
                          <View style={styles.rect5}>
                            <View style={styles.text2Row}>
                              <Text style={styles.text2}>{item.score}</Text>
                              <FontAwesome
                                name="star"
                                style={styles.icon3}></FontAwesome>
                            </View>
                          </View>
                          <View style={styles.rect6}>
                            <Text style={styles.text3}>{parseAmount(item.amount)}</Text>
                          </View>
                        </View>
                        <View style={styles.rect7}>
                          <Text style={styles.text4}>{item.deadline}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                )}
              >
              </FlatList>
            </View>

          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  scrollArea2: {
    height: 40,
    position: 'absolute',
    backgroundColor: '#007FF9',
    width: '100%',
  },
  scrollArea2_contentContainerStyle: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  sort_a2zGrp: {
    width: 80,
    height: 27,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  a2zIcon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 15,
    marginTop: 4,
  },
  title2: {
    color: '#121212',
    marginLeft: 7,
    marginTop: 2,
  },
  dropdownIcon1: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    marginLeft: 6,
    marginTop: -2,
  },
  a2zIconRow: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 8,
    marginTop: 2,
  },
  group: {
    width: 105,
    height: 27,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft: 9,
    marginTop: 6,
  },
  icon18: {
    color: 'rgba(128,128,128,1)',
    fontSize: 15,
    marginTop: 4,
  },
  deadline: {
    color: '#121212',
    marginLeft: 7,
    marginTop: 2,
  },
  icon19: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    marginLeft: 5,
    marginTop: -2,
  },
  icon18Row: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 2,
    backgroundColor: 'white',
  },
  group2: {
    width: 90,
    height: 27,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft: 9,
    marginTop: 6,
  },
  icon20: {
    color: 'rgba(128,128,128,1)',
    fontSize: 15,
    marginTop: 4,
  },
  score: {
    color: '#121212',
    marginLeft: 7,
    marginTop: 2,
  },
  icon21: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    marginLeft: 6,
    marginTop: -2,
  },
  icon20Row: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    marginLeft: 8,
    marginTop: 2,
    backgroundColor: 'white',
  },
  group3: {
    width: 100,
    height: 27,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft: 9,
    marginTop: 6,
  },
  icon22: {
    color: 'rgba(128,128,128,1)',
    fontSize: 15,
    marginTop: 4,
  },
  amount2: {
    color: '#121212',
    marginLeft: 7,
    marginTop: 2,
  },
  icon23: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    marginLeft: 5,
    marginTop: -2,
  },
  icon22Row: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 2,
    backgroundColor: 'white',
  },
  group0: {
    width: 80,
    height: 27,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 9,
    marginTop: 6,
  },
  scrollArea: {
    top: 38,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  scrollArea_contentContainerStyle: {
    height: 810,
  },
  itemN1: {
    height: 90,
    borderWidth: 0,
    // borderColor: "rgba(203,199,199,1)",
    // borderTopWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  iconGrp: {
    borderRadius: 5,
    backgroundColor: 'rgba(230, 230, 230,1)',
    height: 70,
    justifyContent: 'center',
    flex: 1,
    marginRight: 14,
    marginLeft: 10,
    alignSelf: 'center',
  },
  icon: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  txtUpGrp: {
    // top: -5,
    marginTop: 8,
    width: 266,
    height: 60,
    position: 'absolute',
    right: 0,
    justifyContent: 'space-between',
  },
  txtDownGrp: {
    width: 266,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
  },
  ratingGrp: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  ratingTxt: {
    color: '#121212',
  },
  ratingIcon: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  ratingTxtRow: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  amountGrp: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  amountTxt: {
    color: '#121212',
    alignSelf: 'center',
  },
  ratingGrpStack: {
    flex: 1,
    marginRight: 54,
  },
  dateGrp: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  dateTxt: {
    color: '#121212',
    alignSelf: 'center',
  },
  txtGrp: {
    width: 266,
    height: 85,
    marginTop: 2,
  },
  itemN2: {
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  icon2: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text: {
    color: '#121212',
    fontSize: 15,
    textAlign: 'left',
    height: 40,
  },
  rect5: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text2: {
    color: '#121212',
  },
  icon3: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text2Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 5,
  },
  rect6: {
    marginLeft: 60,
    width: 120,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    textAlign: "left"
  },
  text3: {
    color: '#121212',
    // alignSelf: 'center',
    // width: 100,
    // marginLeft: 50,
  },
  rect5Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect7: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text4: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon4: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text5: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect11: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text6: {
    color: '#121212',
  },
  icon5: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text6Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect12: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text7: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect11Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect13: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text8: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon6: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text9: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect17: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text10: {
    color: '#121212',
  },
  icon7: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text10Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect18: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text11: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect17Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect19: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text12: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon8: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text13: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect23: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text14: {
    color: '#121212',
  },
  icon9: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text14Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect24: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text15: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect23Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect25: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text16: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon10: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text17: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect29: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text18: {
    color: '#121212',
  },
  icon11: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text18Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect30: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text19: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect29Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect31: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text20: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon12: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text21: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect35: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text22: {
    color: '#121212',
  },
  icon13: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text22Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect36: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text23: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect35Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect37: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text24: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon14: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text25: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect41: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text26: {
    color: '#121212',
  },
  icon15: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text26Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect42: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text27: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect41Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect43: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text28: {
    color: '#121212',
    alignSelf: 'center',
  },
  icon16: {
    color: 'rgba(143,143,143,1)',
    fontSize: 40,
    alignSelf: 'center',
  },
  text29: {
    color: '#121212',
    fontSize: 14,
    textAlign: 'left',
    height: 35,
  },
  rect47: {
    left: 0,
    position: 'absolute',
    top: 0,
    right: 61,
    bottom: 2,
    flexDirection: 'row',
  },
  text30: {
    color: '#121212',
  },
  icon17: {
    color: 'rgba(248,194,28,1)',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 1,
  },
  text30Row: {
    height: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 6,
  },
  rect48: {
    left: 45,
    width: 63,
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text31: {
    color: '#121212',
    alignSelf: 'center',
  },
  rect47Stack: {
    flex: 1,
    marginRight: 54,
  },
  rect49: {
    width: 110,
    justifyContent: 'center',
    marginRight: -6,
  },
  text32: {
    color: '#121212',
    alignSelf: 'center',
  },
  scrollArea2Stack: {
    flex: 1,
    // marginBottom: -1
  },
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(203,199,199,1)",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});