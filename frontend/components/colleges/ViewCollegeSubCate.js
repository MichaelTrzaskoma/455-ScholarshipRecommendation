import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, LogBox } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// import ViewScholarTbl from "./ViewScholarTbl";

// disable the yellow warning message box
// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);

export default class ViewSubCate extends React.Component {
  // navigation.setOptions({ headerTitle: 'Search Screen' })
  constructor(props) {
    super(props);
    // this.props.route.params.itemKey
    this.state = {
      isLoading: true,
      scholarArr: [],
      subCate: this.props.route.params.itemKey,
    };
  }

  componentDidMount() {
    this.getDoc();
  }


  getDoc = () => {
    let URL = "http://e074c51f8e8f.ngrok.io/api/v1.2/resources/scholarships/view/categories/" + this.state.subCate;

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          scholarArr: json,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log("Ann error occured: " + e);
      });

    console.log("The subcategory is: " + this.state.subCate);
    console.log("The list is: " + this.state.scholarArr);
    // console.log(this.state.scholarArr);
  }

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
