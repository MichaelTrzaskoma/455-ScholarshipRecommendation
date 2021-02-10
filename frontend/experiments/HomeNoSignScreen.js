// this use did not sign in
// therefore, just display the option to
// play around the scholarships that in category

import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { StackNavigator } from "react-native"; // for component navigate

export default class HomeNoSignScreen extends React.Component {
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
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={this.GetItem.bind(this, item.key)}
            >
              {" "}
              {item.key}{" "}
            </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 45,
  },
});
