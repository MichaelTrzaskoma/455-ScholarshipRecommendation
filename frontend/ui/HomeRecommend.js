import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import firebase from "../db/firebaseDB";

export default function HomeCategory(props) {
  const navigation = useNavigation();

  // {... props} is to pass down the previous props to Category class
  return <Category {...props} navigation={navigation} />;
}

class Category extends Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.props.email);
    this.state = {
      email: this.props.email,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getDoc);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getDoc = (querySnapshot) => {
    if (querySnapshot.empty) {
      // there's NO such user profile record
      this.setState({
        isExist: false,
      });
    } else {
      // there's such user profile record
      // a fetch() here where to retrive recommended info from the server.
      // the fetch should display first 5 items as the grid cards
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={styles.txtrecommended_grp}>
          <Text style={styles.recommended}>Recommended</Text>
        </View>
        <View style={styles.scrollArea2}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollArea2_contentContainerStyle}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewRecommendTbl', {
                  title: "Recommended List",
                  // itemKey: "Age",
                })
              }
              style={styles.button6}
            >
              <FontAwesomeIcon
                name="arrow-circle-right"
                style={styles.icon1}
              ></FontAwesomeIcon>
              <Text style={styles.viewAll1}>View All</Text>
            </TouchableOpacity>
            
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtCategory_grp: {
    height: 40,
    justifyContent: "center",
    marginTop: 30,
  },
  category2: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 16,
    fontWeight: "bold",
  },
  scrollArea: {
    height: 120,
  },
  scrollArea_contentContainerStyle: {
    width: 710,
    height: 120,
    flexDirection: "row",
  },
  btn: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 18,
    alignSelf: "center",
  },
  btn_txt: {
    color: "#121212",
    marginTop: 60,
    marginLeft: 9,
  },
  btn2: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 12,
    alignSelf: "center",
  },
  btn2_txt: {
    color: "#121212",
    height: 16,
    marginTop: 75,
    marginLeft: 9,
  },
  btn3: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 14,
    alignSelf: "center",
  },
  btn3_txt: {
    color: "#121212",
    height: 18.5,
    marginTop: 75,
    marginLeft: 9,
  },
  btn4: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 14,
    alignSelf: "center",
  },
  txtArtisticAbility: {
    color: "#121212",
    height: 35,
    marginTop: 61,
    marginLeft: 9,
  },
  btn5: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 17,
    alignSelf: "center",
  },
  txtAthleticAbility: {
    color: "#121212",
    height: 34,
    marginTop: 61,
    marginLeft: 9,
  },
  btn6: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 21,
    marginTop: 10,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 33,
    alignSelf: "center",
  },
  viewAll: {
    color: "#121212",
    marginTop: 4,
    alignSelf: "center",
  },
  txtrecommended_grp: {
    height: 40,
    justifyContent: "center",
    marginTop: 25,
  },
  recommended: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 16,
    fontWeight: "bold",
  },
  scrollArea2: {
    height: 120,
  },
  scrollArea2_contentContainerStyle: {
    width: 710,
    height: 120,
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 18,
    alignSelf: "center",
  },
  placeHolder1: {
    color: "#121212",
    marginTop: 60,
    marginLeft: 9,
  },
  button2: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 12,
    alignSelf: "center",
  },
  placeHolder2: {
    color: "#121212",
    marginTop: 59,
    marginLeft: 8,
  },
  button3: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 14,
    alignSelf: "center",
  },
  placeHolder3: {
    color: "#121212",
    marginTop: 59,
    marginLeft: 9,
  },
  button4: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 15,
    alignSelf: "center",
  },
  placeHolder4: {
    color: "#121212",
    marginTop: 59,
    marginLeft: 9,
  },
  button5: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 17,
    alignSelf: "center",
  },
  placeHolder5: {
    color: "#121212",
    marginTop: 59,
    marginLeft: 9,
  },
  button6: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginLeft: 18,
    marginTop: 10,
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 33,
    alignSelf: "center",
  },
  viewAll1: {
    color: "#121212",
    marginTop: 4,
    alignSelf: "center",
  },
});
