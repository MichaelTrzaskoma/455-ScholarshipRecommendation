import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  TextInput
} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CollegeSurveyBtn from "../ui/CollegeSurveyBtn";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

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
        name: 'Alabama',
        id: 2,
      },
      {
        name: 'Alaska',
        id: 3,
      },
      {
        name: 'Arizona',
        id: 4,
      },
      {
        name: 'Arkansas',
        id: 5,
      },
      {
        name: 'California',
        id: 6,
      },
      {
        name: 'Colorado',
        id: 7,
      },
      {
        name: 'Connecticut',
        id: 8,
      },
      {
        name: 'Delaware',
        id: 9,
      },
      {
        name: 'Flordia',
        id: 10,
      },
      {
        name: 'Georgia',
        id: 11,
      },
      {
        name: 'Hawaii',
        id: 12,
      },
      {
        name: 'Idaho',
        id: 13,
      },
      {
        name: 'Illinois',
        id: 14,
      },
      {
        name: 'Indiana',
        id: 15,
      },
      {
        name: 'Iowa',
        id: 16,
      },
      {
        name: 'Kansas',
        id: 17,
      },
      {
        name: 'Kentucky',
        id: 18,
      },
      {
        name: 'Louisiana',
        id: 19,
      },
      {
        name: 'Maine',
        id: 20,
      },
      {
        name: 'Maryland',
        id: 21,
      },
      {
        name: 'Massachusetts',
        id: 22,
      },
      {
        name: 'Michigan',
        id: 23,
      },
      {
        name: 'Minnesota',
        id: 24,
      },
      {
        name: 'Mississippi',
        id: 25,
      },
      {
        name: 'Missouri',
        id: 26,
      },
      {
        name: 'Montana',
        id: 27,
      },
      {
        name: 'Nebraska',
        id: 28,
      },
      {
        name: 'Nevada',
        id: 29,
      },
      {
        name: 'New Hampshire',
        id: 30,
      },
      {
        name: 'New Jersey',
        id: 31,
      },
      {
        name: 'New Mexico',
        id: 32,
      },
      {
        name: 'New York',
        id: 33,
      },
      {
        name: 'North Carolina',
        id: 34,
      },
      {
        name: 'North Dakota',
        id: 35,
      },
      {
        name: 'Ohio',
        id: 36,
      },
      {
        name: 'Oklahoma',
        id: 37,
      },
      {
        name: 'Oregon',
        id: 38,
      },
      {
        name: 'Pennsylvania',
        id: 39,
      },
      {
        name: 'Rhode Island',
        id: 40,
      },
      {
        name: 'South Carolina',
        id: 41,
      },
      {
        name: 'South Dakota',
        id: 42,
      },
      {
        name: 'Tennessee',
        id: 43,
      },
      {
        name: 'Texas',
        id: 44,
      },
      {
        name: 'Utah',
        id: 45,
      },
      {
        name: 'Vermont',
        id: 46,
      },
      {
        name: 'Virginia',
        id: 47,
      },
      {
        name: 'Washington',
        id: 48,
      },
      {
        name: 'West Virgina',
        id: 49,
      },
      {
        name: 'Wisconsin',
        id: 50,
      },
      {
        name: 'Wyoming',
        id: 51,
      },
    ],
  },
];

export default class CollegeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };
  render() {
    const { selectedItems } = this.state;
    return (
      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
      >
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.scrollArea}>
            <View style={styles.collegeSurveyGrp1}>
              <View style={styles.collegeSurveyRect1}>
                <Text style={styles.findCollege}>To Find your college:</Text>
                <Text style={styles.surveyDescription}>
                  Please Answer the Following Questions to the best of your
                  ability. You can select more than one of the criteria, using the
                  results we will recommend a best fit college. Remember to do
                  your own followup research!
              </Text>
              </View>
              <View style={styles.collegeSurveyGrp2}>
                <View style={styles.collegeSurveyRect2}>
                  <Text style={styles.collegeSurveyQA1}>
                    What is you regional preference {"\n"}for college location?
                  </Text>

                  <SectionedMultiSelect
                    items={items}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Choose all that apply"
                    style={{ margin: 20 }}
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                  />

                  <View style={styles.satTextField}>
                    <Text style={styles.collegeSurveyQA2}>
                      What is your SAT score?
                    </Text>
                    <View style={styles.iconRow}>
                      <MaterialCommunityIconsIcon
                        name="book-open-variant"
                        style={styles.icon}
                      ></MaterialCommunityIconsIcon>
                      <TextInput
                        placeholder="If Not Applicable Leave Blank"
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                        style={styles.textInput}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.actTextField}>
                    <Text style={styles.collegeSurveyQA3}>
                      What is your ACT score?
                    </Text>
                    <View style={styles.icon1Row}>
                      <MaterialCommunityIconsIcon
                        name="book-open-variant"
                        style={styles.icon1}
                      ></MaterialCommunityIconsIcon>
                      <TextInput
                        placeholder="If Not Applicable Leave Blank"
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                        style={styles.textInput1}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={styles.majorTextField}>
                    <Text style={styles.collegeSurveyQA4}>
                      What major are you interested in?
                    </Text>
                    <View style={styles.icon2Row}>
                      <MaterialCommunityIconsIcon
                        name="book-open-variant"
                        style={styles.icon2}
                      ></MaterialCommunityIconsIcon>
                      <TextInput
                        placeholder="If Not Applicable Leave Blank"
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                        style={styles.textInput2}
                      ></TextInput>
                    </View>
                  </View>
                  <CollegeSurveyBtn
                    style={styles.submitBtn}
                  ></CollegeSurveyBtn>

                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e9e7",

  },
  scrollArea: {
    width: 321,
    height: 709,
    marginTop: 18,

  },
  scrollArea_contentContainerStyle: {
    height: 900,
    width: 321,
    alignSelf: "center"
  },
  collegeSurveyGrp1: {
    width: 321,
    flex: 1,
    alignSelf: "center"
  },
  collegeSurveyRect1: {
    width: 318,
    height: 180,
    backgroundColor: "#fefffd",
    alignSelf: "center"
  },
  findCollege: {
    fontFamily: "roboto-700",
    color: "#4a76ff",
    height: 37,
    width: 298,
    fontSize: 20,
    marginTop: 13,
    alignSelf: "center"
  },
  surveyDescription: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    height: 120,
    width: 298,
    fontSize: 15,
    marginTop: 10,
    alignSelf: "center"
  },
  collegeSurveyGrp2: {
    width: 321,
    height: 600,
    marginTop: 21,
    alignSelf: "center"
  },
  collegeSurveyRect2: {
    width: 321,
    height: 'auto',
    backgroundColor: "#fefffd",
    flex: 1,
    alignSelf: "center"
  },
  collegeSurveyRect2_contentContainerStyle: {
    height: 508,
    width: 321
  },
  collegeSurveyQA1: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    width: 250,
    height: 36,
    marginTop: 15,
    marginLeft: 8
  },
  satTextField: {
    width: 247,
    height: 32,
    marginTop: 30,
    marginLeft: 15
  },
  collegeSurveyQA2: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: -27,
    marginLeft: -4
  },
  icon: {
    color: "#4a76ff",
    fontSize: 25,
    marginTop: 2
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 32,
    width: 212,
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginLeft: 10
  },
  iconRow: {
    height: 32,
    flexDirection: "row",
    marginTop: 9
  },
  actTextField: {
    width: 247,
    height: 32,
    marginTop: 47,
    marginLeft: 15
  },
  collegeSurveyQA3: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: -29,
    marginLeft: -5
  },
  icon1: {
    color: "#4a76ff",
    fontSize: 25
  },
  textInput1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 32,
    width: 212,
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginLeft: 10
  },
  icon1Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 11
  },
  majorTextField: {
    width: 247,
    height: 32,
    marginTop: 45,
    marginLeft: 15
  },
  collegeSurveyQA4: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    marginTop: -28,
    marginLeft: -7
  },
  icon2: {
    color: "#4a76ff",
    fontSize: 25
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 32,
    width: 212,
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginLeft: 10
  },
  icon2Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 10
  },
  submitBtn: {
    width: 300,
    height: 36,
    backgroundColor: "#4a76ff",
    marginTop: 29,
    alignSelf: "center"
  }
});


