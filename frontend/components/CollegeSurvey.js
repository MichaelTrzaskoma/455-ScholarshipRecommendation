import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import MaterialIconTextbox from "../ui/MaterialIconTextbox";
import CupertinoButtonInfo1 from "../ui/CupertinoButtonInfo1";
import {MaterialIcons} from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';



const items = [
  // this is the parent or 'item'
  {
    name: 'United States',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'No Preference',
        id: 1,
      },
      {
        name: 'West',
        id: 10,
      },
      {
        name: 'Pacific Northwest',
        id: 17,
      },
      {
        name: 'Southwest',
        id: 13,
      },
      {
        name: 'Midwest',
        id: 14,
      },
      {
        name: 'Central',
        id: 15,
      },
      {
        name: 'Northeast',
        id: 16,
      },
      {
        name: 'South',
        id: 25,
      },
    ],
  },
];

export default class regionProfile extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      selectedItems: [],
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  render(){
    const { selectedItems } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.collegeSurveyGroup1}>
          <View style={styles.collegeSurveyRect1}>
            <Text style={styles.findCollege}>To Find your college:</Text>
            <Text style={styles.surveyDescription}>
              Please Answer the Following Questions to the best of your ability.
              You can select more than one of the criteria, using the results we
              will recommend a best fit college. Remember to do your own followup
              research!
            </Text>
          </View>
        </View>
        <View style={styles.collegeSurveyGroup2}>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              <Text style={styles.collegeSurveyQA1}>
                What is you regional preference {"\n"}for college location?
              </Text>
               <SectionedMultiSelect
                  items={items}
                  IconRenderer={MaterialIcons}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Choose all that apply"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                />
              <Text style={styles.collegeSurveyQA2}>What is your SAT score?</Text>
              <MaterialIconTextbox
                inputStyle="Label"
                inputStyle="If Not Applicable Leave Blank"
                style={styles.satTextField}
              ></MaterialIconTextbox>
              <Text style={styles.collegeSurveyQA3}>What is your ACT score?</Text>
              <MaterialIconTextbox
                inputStyle="Label"
                inputStyle="If Not Applicable Leave Blank"
                style={styles.actTextField}
              ></MaterialIconTextbox>
              <Text style={styles.collegeSurveyQA4}>
                What major are you interested in?
              </Text>
              <MaterialIconTextbox
                inputStyle="Label"
                iconStyleName="book-open-variant"
                inputStyle="If Not Applicable Leave Blank"
                style={styles.majorTextField}
              ></MaterialIconTextbox>
              <CupertinoButtonInfo1
                style={styles.submitButton}
              ></CupertinoButtonInfo1>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e9e7"
  },
  collegeSurveyGroup1: {
    width: 321,
    height: 180,
    marginTop: 18,
    alignSelf: "center"
  },
  collegeSurveyRect1: {
    width: 321,
    height: 180,
    backgroundColor: "#fefffd"
  },
  findCollege: {
    fontFamily: "lemonada-700",
    color: "#4a76ff",
    height: 37,
    width: 298,
    fontSize: 18,
    marginTop: 13,
    marginLeft: 11
  },
  surveyDescription: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    height: 120,
    width: 298,
    fontSize: 15,
    marginTop: 10,
    marginLeft: 9
  },
  collegeSurveyGroup2: {
    width: 321,
    height: 508,
    marginTop: 17,
    marginLeft: 26
  },
  scrollArea: {
    width: 321,
    height: 508,
    backgroundColor: "#fefffd"
  },
  scrollArea_contentContainerStyle: {
    height: 508,
    width: 321
  },
  collegeSurveyQA1: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 8
  },
  collegeSurveyQA2: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 11
  },
  satTextField: {
    height: 43,
    width: 292,
    marginTop: 3,
    marginLeft: 6
  },
  collegeSurveyQA3: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: 14,
    marginLeft: 10
  },
  actTextField: {
    height: 43,
    width: 292,
    marginLeft: 5
  },
  collegeSurveyQA4: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: 17,
    marginLeft: 8
  },
  majorTextField: {
    height: 43,
    width: 292,
    marginLeft: 4
  },
  submitButton: {
    width: 300,
    height: 36,
    backgroundColor: "#4a76ff",
    marginTop: 28,
    marginLeft: 10
  }
});


