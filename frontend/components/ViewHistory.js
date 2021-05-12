import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  Modal, 
  Pressable,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { parse_UTCTimeStamp, dynamicSort, mergeSort_a2z, mergeSort_z2a } from "../functions/utilities";
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

export default function ViewHistory(props) {
  const navigation = useNavigation();

  return <ViewHistoryClass {...props} navigation={navigation} />;
}
class ViewHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      isLoading: true,
      historyArr: [],
      gender: '',
      opt_title_visible: false,
      opt_deadline_visible: false,
      opt_score_visible: false,
      opt_amount_visible: false,
      currentBookmarkKey: "",
      modalVisible: false,
      currentType: "",
    };
  }

  _openTitleMenu = () => { this.setState({ opt_title_visible: true }) };
  _closeTitleMenu = () => { this.setState({ opt_title_visible: false }) };

  _openDeadlineMenu = () => { this.setState({ opt_deadline_visible: true }) };
  _closeDeadlineMenu = () => { this.setState({ opt_deadline_visible: false }) };

  _openScoreMenu = () => { this.setState({ opt_score_visible: true }) };
  _closeScoreMenu = () => { this.setState({ opt_score_visible: false }) };


  sortTitleHandler_a2z() {
    this.state.historyArr.sort(dynamicSort("key"));
    // console.log(this.state.scholarArr);
    this._closeTitleMenu();
  }

  sortTitleHandler_z2a() {
    this.state.historyArr.sort(dynamicSort("-key"));
    // console.log(this.state.scholarArr);
    this._closeTitleMenu();
  }

  sortDeadlineHandler_a2z() {
    this.state.historyArr.sort(dynamicSort("timer"));
    // console.log(this.state.scholarArr);
    this._closeDeadlineMenu();
  }

  sortDeadlineHandler_z2a() {
    this.state.historyArr.sort(dynamicSort("-timer"));
    // console.log(this.state.scholarArr);
    this._closeDeadlineMenu();
  }

  sortScoreHandler_a2z() {
    this.state.historyArr.sort(dynamicSort("type"));
    // console.log(this.state.scholarArr);
    this._closeScoreMenu();
  }

  sortScoreHandler_z2a() {
    this.state.historyArr.sort(dynamicSort("-type"));
    // console.log(this.state.scholarArr);
    this._closeScoreMenu();
  }


  typeNavigator(itemKey, itemType) {
    // navigate the user to respective detail page
    // INPUT
    // : itemKey (str) the title of the respective unique identifier
    // : itemType (str) the item types - it can only be scholarship, major, or college
    // NOTE: when navigate the client, we also pass down the userProfile obj

    const t = String(itemType);

    switch (t) {
      case "scholarship":
        this.props.navigation.navigate('ViewScholarDetail', {
          title: itemKey,
          itemKey: itemKey,
          usrInfo: this.props.route.params.usrInfo
        });
        break;

      case "major":
        this.props.navigation.navigate('ViewMajorDetail', {
          title: itemKey,
          itemKey: itemKey,
          usrInfo: this.props.route.params.usrInfo
        });
        break;

      default:
        this.props.navigation.navigate('ViewCollegeDetail', {
          title: itemKey,
          itemKey: itemKey,
          usrInfo: this.props.route.params.usrInfo
        });
        break;
    }
  }


  componentDidMount() {
    // console.log("User profile from ViewHistory: " + JSON.stringify(this.props));
    this.getHistory();
  }


  parseICON(types) {
    // parse ICONS for the bookmarks and recent view listing components
    // INPUT: types (str) of scholar - either by scholarship, major, or college
    // OUTPUT: return the component with its associate icon

    const r = String(types);
    switch (r) {
      case "scholarship":
        return (
          <FontAwesome
            name="graduation-cap"
            style={styles.icon2}></FontAwesome>
        );
        break;
      case "major":
        return (
          <MaterialCommunityIcons
            name="bank"
            style={styles.icon2}></MaterialCommunityIcons>
        );
        break;
      default:
        return (
          <MaterialCommunityIcons
            name="book-open-page-variant"
            style={styles.icon2}></MaterialCommunityIcons>
        );
        break;
    }
  }


  parseSortICON(types) {
    const r = String(types);
    if (r === "A - Z") {
      return (
        <FontAwesome name="sort-alpha-asc" size={16} color="black">  A - Z</FontAwesome>
      );
    } else {
      return (<FontAwesome name="sort-alpha-desc" size={16} color="black">  Z - A</FontAwesome>);
    }
  }

  handleBookmarkOpen(key, type) {
    this.setModalVisible(true)
    this.setState({ currentBookmarkKey: key });
    this.setState({ currentType: type });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setCurrentBookmarkkey = (itemKey) => {
    this.setState({ currentBookmarkKey: itemKey });
  }

  handleBookmark() {

    this.setState({ modalVisible: false });
    // console.log(this.state.currentBookmarkKey)

    // let URL = "http://3efdd482435b.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/college/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;
    let URL = "http://2d071003be2e.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/" +this.state.currentType+ "/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;

    fetch(URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": this.state.currentBookmarkKey,
        "unique_id": this.state.usrInfo.uuid, 
        "type": "college",
        "jwt": this.state.usrInfo.jwt,
      }),
    })
      .then((response) => {
        if (response.status == 202) {

          alert("Bookmarked!");

        } else if (response.status == 208) {

          alert("Already bookmarked!");

        } else {
          
          alert("Bookmark failed!");
          
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("Bookmark Key: " + this.state.currentBookmarkKey);
    //alert("This College has been bookmarked!");

  }


  getHistory() {
    try {
      // console.log("Email from scholarshipRecommendTBL.js: " + this.state.usrInfo.email);
      let URL = "http://820293c0661c.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/recent/all/15";
      // http://localhost:5000/api/v1.2/users/id/hchen60@nyit.edu/recommends/scholarship

      const historyArr = [];

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

            historyArr.push({
              key: res.title,
              type: res.type,
              timer: parse_UTCTimeStamp(res.timeAdded),
            });
          });

          // set the local var to state var
          this.setState({
            historyArr,
            isLoading: false,
          });

        })

    } catch (error) {
      // error handler
      alert("An error occurred: " + error);
    }

  };


  FlatListItemSeparator = () => {
    return <View style={styles.itemSeparater} />;
  }


  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.currentBookmarkKey}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.handleBookmark()}
              >
                <Text style={styles.textStyle}>Bookmark</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose2]}
                onPress={() => this.setModalVisible(false)}
              >
                <Text style={styles.textStyle}> Close   </Text>
              </Pressable>
            </View>
            <View>

            </View>
          </View>
        </Modal>

          <View style={styles.scrollArea2Stack}>

            {/* sorting options here */}
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
                    title={this.parseSortICON("A - Z")}
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortTitleHandler_z2a();
                    }}
                    title={this.parseSortICON("Z - A")}
                  />
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
                        <Text style={styles.deadline}>Type</Text>
                        <FontAwesome
                          name="sort-down"
                          style={styles.icon19}></FontAwesome>
                      </View>
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortScoreHandler_a2z();
                    }}
                    title={this.parseSortICON("A - Z")}
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortScoreHandler_z2a();
                    }}
                    title={this.parseSortICON("Z - A")}
                  />
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
                        <Text style={styles.score}>Date</Text>
                        <FontAwesome
                          name="sort-down"
                          style={styles.icon21}></FontAwesome>
                      </View>
                    </TouchableOpacity>}>
                  <Menu.Item
                    style={{ marginTop: 0, width: 15 }}
                    onPress={() => {
                      this.sortDeadlineHandler_a2z();
                    }}
                    title={this.parseSortICON("A - Z")}
                  />
                  <Menu.Item
                    style={{ marginTop: 0, width: 15, }}
                    onPress={() => {
                      this.sortDeadlineHandler_z2a();
                    }}
                    title={this.parseSortICON("Z - A")}
                  />
                </Menu>


              </ScrollView>
            </View>

            {/* Main content area here */}
            <View style={styles.scrollArea}>

              <FlatList
                data={this.state.historyArr}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) => (

                  <TouchableOpacity
                    style={styles.itemN2}
                    onLongPress={() => { this.handleBookmarkOpen(item.key, item.type) }}
                    onPress={() => {
                      this.typeNavigator(item.key, item.type)
                    }}
                  >
                    <View style={styles.iconGrp}>
                      {this.parseICON(item.type)}

                    </View>

                    <View style={styles.txtGrp}>

                      <View style={styles.txtUpGrp}>
                        <Text style={styles.text}>{item.key}</Text>
                      </View>

                      <View style={styles.txtDownGrp}>

                        <View style={styles.rect5Stack}>
                          <View style={styles.rect5}>
                            <View style={styles.text2Row}>
                              <Text style={styles.text2}>{item.type}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.rect7}>
                          <Text style={styles.text4}>{item.timer}</Text>
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
    width: 85,
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
    // backgroundColor: 'white',
  },
  group2: {
    width: 85,
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
    // backgroundColor: 'white',
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
    marginRight: 0,
  },
  text2: {
    color: '#121212',
    width: 100,
  },
  text2Row: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 7,
    marginTop: 5,
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
    marginLeft: -12,
    marginTop: 13,
  },
  scrollArea2Stack: {
    flex: 1,
    // marginBottom: -1
  },
  itemSeparater: {
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2: {
    backgroundColor: "#c42e23",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});