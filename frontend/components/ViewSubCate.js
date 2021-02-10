import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import firebase from "../db/firebaseDB";
// import firebase from "../db/firebaseDB_test";
// import ViewScholarTbl from "./ViewScholarTbl";

// disable the yellow warning message box
console.disableYellowBox = true;

export default class ViewSubCate extends React.Component {
  // navigation.setOptions({ headerTitle: 'Search Screen' })
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("scholar_dir")
      .doc(this.props.route.params.itemKey);

    this.state = {
      isLoading: true,
      scholarArr: [],
      subCate: this.props.route.params.itemKey,
    };
  }

  componentDidMount(){
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getDoc)
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getDoc = (querySnapshot) => {
    const temp = querySnapshot.data();
    // now the temp is key val pair
    // temp => ("sub category title", ["i", "j", "k", ..., "n"])
    const valArr = temp[this.state.subCate];
    this.setState({
      scholarArr: valArr,
      isLoading: false,
    });
    console.log("The subcategory is: " + this.state.subCate);
    // console.log(this.state.scholarArr);
  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
    if(this.state.isLoading){
      return(
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
            <Text
              style={styles.item}
              onPress={() => {
                // we are able to navigate to "ViewSubCate"
                // since it is one of the stack screens in App.js
                // therefore, no need to import in this screen
                this.props.navigation.navigate('ViewScholarTbl', {
                  title: (item + " List"),
                  itemKey: item,
                });
              }}
            > {item} </Text>
          )}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    height: 45,
  },
});
