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
      usrInfo: this.props.route.params.usrInfo,
      FlatListItems: [
        { key: "Alabama" },
        { key: "Alaska" },
        { key: "Arizona" },
        { key: "Arkansas" },
        { key: "California" },
        { key: "Colorado" },
        { key: "Connecticut" },
        { key: "Delaware" },
        { key: "Florida" },
        { key: "Georgia" },
        { key: "Hawaii" },
        { key: "Idaho" },
        { key: "Illinois" },
        { key: "Indiana" },
        { key: "Iowa" },
        { key: "Kentucky" },
        { key: "Louisiana" },
        { key: "Maine" },
        { key: "Maryland" },
        { key: "Massachusetts" },
        { key: "Michigan" },
        { key: "Minnesota" },
        { key: "Mississippi" },
        { key: "Missouri" },
        { key: "Montana" },
        { key: "Nebraska" },
        { key: "Nevada" },
        { key: "New Hampshire" },
        { key: "New Jersey" },
        { key: "New York" },
        { key: "North Carolina" },
        { key: "North Dakota" },
        { key: "Ohio" },
        { key: "Oklahoma" },
        { key: "Oregon" },
        { key: "Pennsylvania" },
        { key: "Rhode Island" },
        { key: "South Carolina" },
        { key: "South Dakota" },
        { key: "Texas" },
        { key: "Utah" },
        { key: "Vermont" },
        { key: "Virginia" },
        { key: "Washington" },
        { key: "Wisconsin" },
        { key: "Wyoming" },
      ],
    };
  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
    // console.log("Checking ViewAllCollege " + JSON.stringify(this.props.route.params.usrInfo));
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
                this.props.navigation.navigate('ViewCollegeSubCate', {
                  title: item.key,
                  itemKey: item.key,
                  usrInfo: this.state.usrInfo
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
