import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";


export default function CollegeRecent(props) {
  const navigation = useNavigation();

  return <CollegeRecentClass {...props} navigation={navigation} />;
}


class CollegeRecentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.usrInfo,
      isHistory: false,
      recentArr: [],
    };
  }


  getRecentViewed = () => {
    // /api/v1.2/users/id/<email>/<token>/<id>/recent/<type>/<doc_num>
    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/recent/college/5"
    try {

      let recentArr = [];
      let isHistory = false;

      fetch(URL, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {

          if (json.length > 0) {

            json.forEach((res) => {
              recentArr.push({
                title: res.title,
              });
            });

            isHistory = true;

          }

          this.setState({
            recentArr,
            isHistory,
          });

        })


    } catch (err) {
      console.log(err);
    }
  }


  componentDidMount() {
    this.getRecentViewed();
  }

  render() {
    const { navigation } = this.props;

    if (this.props.isFocused) {
      this.getRecentViewed();
    }

    if (this.state.isHistory) {
      return (
        <View style={styles.recent_container}>
          <View style={styles.recentGrp}>
            <Text style={styles.recentTxt}>Recent Viewed</Text>
            <View style={styles.scrollArea2}>
              <View style={styles.rvBtn1Row}></View>
              <FlatList
                data={this.state.recentArr}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.rvBtn1}
                    onPress={() => this.props.navigation.navigate("ViewCollegeDetail",
                      {
                        title: item.title,
                        itemKey: item.title,
                        usrInfo: this.props.usrInfo,
                      })
                    }
                  >
                    <MaterialCommunityIcons
                      name="table-of-contents"
                      style={styles.rvIcon1}></MaterialCommunityIcons>
                    <View style={styles.gridItemIconFiller}></View>
                    <Text style={styles.gridItemTxt_2lines}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      );
    }
    else {
      return (<View></View>);
    }
  }
}

const styles = StyleSheet.create({
  gridItemIcon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 35,
    marginTop: 14,
    marginLeft: 10,
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
    backgroundColor: 'white',
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
  gridItemIconFiller: {
    flex: 1,
  },
  gridItemTxt_1line: {
    color: '#121212',
    fontSize: 14,
    width: 90,
    height: 20,
    marginBottom: 8,
    alignSelf: 'center',
  },
  recent_container: {
    top: 172,
    left: 0,
    // height: "auto",
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    width: '100%',
  },
  recentGrp: {
    width: '90%',
    // height: 167,
    alignSelf: 'center',
    marginTop: 5,
  },
  recentTxt: {
    color: '#007FF9',
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
    flexDirection: 'row',
  },
  rvBtn1: {
    width: 110,
    height: 110,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: '#000000',
    borderLeftWidth: 0,
    backgroundColor: 'white',
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    marginLeft: 10,
  },
  rvIcon1: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    width: 35,
    height: 38,
    marginTop: 10,
    marginLeft: 10,
  },
  rvGridItemIcon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10,
  },
  rvBtn1Row: {
    height: 110,
    flexDirection: 'row',
    flex: 1,
    marginRight: -388,
    marginTop: 7,
  },
})