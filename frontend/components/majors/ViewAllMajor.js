// this use did not sign in
// therefore, just display the option to
// play around the scholarships that in category

import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";

export default class ViewAllScholar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usrProf: this.props.route.params.usrInfo,
      FlatListItems: [
        { key: "Arts" },
        { key: "Business" },
        { key: "Education" },
        { key: "Health Professions" },
        { key: "Humanities" },
        { key: "Science, Technology, & Math" },
        { key: "Protective Services" },
      ],
    };
  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
    // console.log("ViewAllMajor props check " + JSON.stringify(this.props.route.params.usrInfo));
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() => {
                // we are able to navigate to "ViewSubCate"
                // since it is one of the stack screens in App.js
                // therefore, no need to import in this screen
                this.props.navigation.navigate('ViewMajorSubCate', {
                  title: item.key,
                  itemKey: item.key,
                  usrInfo: this.state.usrProf
                });
              }}
            > {item.key} </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
  },
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(203,199,199,1)",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    height: 45,
  },
});
