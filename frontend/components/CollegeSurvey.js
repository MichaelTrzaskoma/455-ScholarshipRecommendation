import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
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
  {
    name: 'Arts',
    id: 52,
    children: [
      {
        name: 'Art',
        id: 53,
      },
      {
        name: 'Design',
        id: 54,
      },
      {
        name: 'Film and Photography',
        id: 55,
      },
      {
        name: 'Film',
        id: 55,
      },
      {
        name: 'Photography',
        id: 56,
      },
      {
        name: 'Music',
        id: 57,
      },
    ],
  },
  {
    name: 'Business',
    id: 58,
    children: [
      {
        name: 'Business Management',
        id: 59,
      },
      {
        name: 'Business and Management',
        id: 60,
      },
      {
        name: 'Finance and Accounting',
        id: 61,
      },
      {
        name: 'Sports Management',
        id: 62,
      },
    ],
  },
  {
    name: 'Education',
    id: 63,
    children: [
      {
        name: 'Education',
        id: 64,
      },
    ],
  },
  {
    name: 'Health Professions',
    id: 65,
    children: [
      {
        name: 'Dental',
        id: 66,
      },
      {
        name: 'Food and Nutrition',
        id: 67,
      },
      {
        name: 'Health Care',
        id: 68,
      },
      {
        name: 'Health',
        id: 69,
      },
      {
        name: 'Kinesiology',
        id: 70,
      },
      {
        name: 'Physical Therapy',
        id: 71,
      },
      {
        name: "Kinesiology and Physical Therapy",
        id: 72,
      },
      {
        name: 'Medical',
        id: 73,
      },
      {
        name: 'Nursing',
        id: 74,
      },
      {
        name: 'Public Health',
        id: 75,
      },
      {
        name: 'Veterinary',
        id: 76,
      }
    ],
  },
  {
    name: 'Humanities',
    id: 77,
    children: [
      {
        name: 'Anthropology',
        id: 78,
      },
      {
        name: 'Communications',
        id: 79,
      },
      {
        name: 'Economics',
        id: 80,
      },
      {
        name: 'English',
        id: 81,
      },
      {
        name: 'Foreign Language',
        id: 82,
      },
      {
        name: 'History',
        id: 83,
      },
      {
        name: 'International Relations',
        id: 84,
      },
      {
        name: 'Legal Studies',
        id: 85,
      },
      {
        name: 'Philosophy',
        id: 86,
      },
      {
        name: 'Political Science',
        id: 87,
      },
      {
        name: 'Psychology',
        id: 88,
      },
      {
        name: 'Public Policy and Social Services',
        id: 89,
      },
      {
        name: 'Religious Studies',
        id: 90,
      }
    ],
  },
  {
    name: 'Protective Services',
    id: 91,
    children: [
      {
        name: 'Criminal Justice',
        id: 92,
      },
      {
        name: 'Protective Services',
        id: 93,
      },
    ],
  },
  {
    name: 'Science, Technology, & Math',
    id: 94,
    children: [
      {
        name: 'Agriculture',
        id: 95,
      },
      {
        name: 'Biology',
        id: 96,
      },
      {
        name: 'Chemistry',
        id: 97,
      },
      {
        name: 'Computer Science',
        id: 98,
      },
      {
        name: 'Environmental Science',
        id: 99,
      },
      {
        name: 'Engineering',
        id: 100,
      },
      {
        name: 'Information Technology',
        id: 101,
      },
      {
        name: 'Math',
        id: 102,
      },
      {
        name: 'Physics',
        id: 103,
      }
    ],
  },
  {
    name: 'Trades & Personal Services',
    id: 104,
    children: [
      {
        name: 'Cosmetology',
        id: 105,
      },
      {
        name: 'Culinary Arts',
        id: 106,
      },
      {
        name: 'Mechanics',
        id: 107,
      },
    ],
  },
];

export default class CollegeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      selectedItems2: [],
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  onSelectedItemsChange2 = (selectedItems2) => {
    this.setState({ selectedItems2 });
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <ScrollView horizontal={false} style={styles.container}>

        {/* 1st TextBox */}
        <View style={styles.card_grp1}>
          <Text style={styles.findCollege}>To Find your college:</Text>
          <Text style={styles.surveyDescription}>
            Please Answer the Following Questions to the best of your
            ability. You can select more than one of the criteria, using the
            results we will recommend a best fit college. Remember to do
            your own followup research!
               </Text>
        </View>

        {/* 2nd TextBox */}
        <View style={styles.card_grp2}>

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
                What major(s) are you interested in?
        </Text>
              <SectionedMultiSelect
                style={{ margin: 30 }}
                items={items.slice(1, items.length + 1)}
                IconRenderer={MaterialIcons}
                uniqueKey="name"
                subKey="children"
                selectText="Select Major(s)"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedItemsChange2}
                selectedItems={this.state.selectedItems2}
              />
            </View>
          </View>

          {/* Submit Button */}
          <CollegeSurveyBtn
            style={styles.submitBtn}
          ></CollegeSurveyBtn>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
    width: '100%',
    height: '100%',
  },
  card_grp1: {
    width: '90%',
    height: 229,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 30,
    alignSelf: 'center',
  },
  card_grp2: {
    flex: 1,
    width: '90%',
    height: 'auto',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    marginTop: 19,
    alignSelf: 'center',
  },

  findCollege: {
    fontFamily: "roboto-700",
    color: "#4a76ff",
    height: 37,
    width: 298,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    alignSelf: "center"
  },
  surveyDescription: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    height: 120,
    width: 298,
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center"
  },
  collegeSurveyRect2: {
    width: 321,
    height: 'auto',
    backgroundColor: "#fefffd",
    flex: 1,
    alignSelf: "center"
  },
  collegeSurveyQA1: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    width: 260,
    height: 39,
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
    marginTop: -29,
    marginLeft: -5
  },
  icon1: {
    color: "#4a76ff",
    fontSize: 25
  },
  textInput1: {
    fontFamily: "roboto-regular",
    fontSize: 16,
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
    height: 'auto',
    marginTop: 45,
    marginLeft: 15
  },
  collegeSurveyQA4: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: -28,
    marginLeft: -7
  },
  submitBtn: {
    width: 300,
    height: 36,
    backgroundColor: "#4a76ff",
    marginTop: 20,
    alignSelf: "center"
  },
});


