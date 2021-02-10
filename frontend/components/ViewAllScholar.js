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
      FlatListItems: [
        { key: "Academic Major" },
        { key: "ACT Score" },
        { key: "Age" },
        { key: "Artistic Ability" },
        { key: "Athletic Ability" },
        { key: "Deadline" },
        { key: "Employer" },
        { key: "Ethnicity" },
        { key: "Financial Need" },
        { key: "Gender" },
        { key: "Grade Point Average" },
        { key: "Honors Organization" },
        { key: "Military Affiliation" },
        { key: "Number of Scholarships Available" },
        { key: "Physical Disabilities" },
        { key: "Race" },
        { key: "Religion" },
        { key: "Residence State" },
        { key: "SAT Score" },
        { key: "Scholarship Amount" },
        { key: "School Attendance State" },
        { key: "School Year" },
        { key: "Speical Attributes" },
        { key: "Student Organization" },
      ],
    };
  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
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
                this.props.navigation.navigate('ViewSubCate', {
                  title: (item.key + " List"),
                  itemKey: item.key,
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
    backgroundColor: "black",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    height: 45,
  },
});
