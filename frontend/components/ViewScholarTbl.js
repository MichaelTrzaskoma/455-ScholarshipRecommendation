import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import firebase from "../db/firebaseDB";

export default class ViewScholarTbl extends React.Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("ScholarshipHub")
      .where("Terms", "array-contains", this.props.route.params.itemKey);

    this.state = {
      isLoading: true,
      scholarArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getDoc);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  parseMonth(month) {
    switch (month) {
      case "January":
        return "01";
        break;
      case "February":
        return "02";
        break;
      case "March":
        return "03";
        break;
      case "April":
        return "04";
        break;
      case "May":
        return "05";
        break;
      case "June":
        return "06";
        break;
      case "July":
        return "07";
        break;
      case "August":
        return "08";
        break;
      case "September":
        return "09";
        break;
      case "October":
        return "10";
        break;
      case "November":
        return "11";
        break;
      default:
        return "12";
        break;
    }
  }

  getDoc = (querySnapshot) => {
    const scholarArr = [];

    querySnapshot.forEach((res) => {
      let deadline = "";

      if (res.data().Deadline == "Deadline Varies") {
        deadline = "Varies";
      } else {
        const fields = res.data().Deadline.split(" ");
        const sub_field = fields[1].split(",");
        deadline =
          this.parseMonth(fields[0]) + "/" + sub_field[0] + "/" + fields[2];
      }

      scholarArr.push({
        key: res.id,
        amount: res.data().Amount,
        deadline: deadline,
        name: res.id,
      });
    });

    this.setState({
      scholarArr,
      isLoading: false,
    });
  };

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.scholarArr}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // we are able to navigate to "ViewSubCate"
                // since it is one of the stack screens in App.js
                // therefore, no need to import in this screen
                this.props.navigation.navigate('ViewScholarDetail', {
                  title: item.key,
                  itemKey: item.key,
                });
              }}
            >
              <Text style={styles.item_title}>{item.key}</Text>
              <Text style={styles.item_subTitle}>Amount: {item.amount}</Text>
              <Text style={styles.item_deadline}>
                Deadline: {item.deadline}
              </Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: 740,
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
  rect3: {
    backgroundColor: "#E6E6E6",
    flex: 1,
  },
  button: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 100,
  },
  item_title: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 16,
    height: 37,
    width: "80%",
    marginTop: 16,
    marginLeft: 13,
  },
  item_subTitle: {
    color: "#121212",
    fontSize: 12,
    width: 120,
    height: 15,
    marginTop: 10,
    marginLeft: 13,
  },
  item_deadline: {
    color: "#121212",
    fontSize: 12,
    width: "100%",
    height: 15,
    marginBottom: 13,
    marginLeft: "68%",
  },
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
});
