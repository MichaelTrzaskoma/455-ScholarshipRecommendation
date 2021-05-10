import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const items = [
  // this is the parent or 'item'
  {
    name: 'United States',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
				name: 'No Preference',
				id: 1193,
			},
			{
				name: 'Alabama',
				id: 1194,
			},
			{
				name: 'Alaska',
				id: 1195,
			},
			{
				name: 'Arizona',
				id: 1196,
			},
			{
				name: 'Arkansas',
				id: 1197,
			},
			{
				name: 'California',
				id: 1198,
			},
			{
				name: 'Colorado',
				id: 1199,
			},
			{
				name: 'Connecticut',
				id: 1200,
			},
			{
				name: 'Delaware',
				id: 1201,
			},
			{
				name: 'Florida',
				id: 1202,
			},
			{
				name: 'Georgia',
				id: 1203,
			},
			{
				name: 'Hawaii',
				id: 1204,
			},
			{
				name: 'Idaho',
				id: 1205,
			},
			{
				name: 'Illinois',
				id: 1206,
			},
			{
				name: 'Indiana',
				id: 1207,
			},
			{
				name: 'Iowa',
				id: 1208,
			},
			{
				name: 'Kansas',
				id: 1209,
			},
			{
				name: 'Kentucky',
				id: 1210,
			},
			{
				name: 'Louisiana',
				id: 1211,
			},
			{
				name: 'Maine',
				id: 1212,
			},
			{
				name: 'Maryland',
				id: 1213,
			},
			{
				name: 'Massachusetts',
				id: 1214,
			},
			{
				name: 'Michigan',
				id: 1215,
			},
			{
				name: 'Minnesota',
				id: 1216,
			},
			{
				name: 'Mississippi',
				id: 1217,
			},
			{
				name: 'Missouri',
				id: 1218,
			},
			{
				name: 'Montana',
				id: 1219,
			},
			{
				name: 'Nebraska',
				id: 1220,
			},
			{
				name: 'Nevada',
				id: 1221,
			},
			{
				name: 'New Hampshire',
				id: 1222,
			},
			{
				name: 'New Jersey',
				id: 1223,
			},
			{
				name: 'New Mexico',
				id: 1224,
			},
			{
				name: 'New York',
				id: 1225,
			},
			{
				name: 'North Carolina',
				id: 1226,
			},
			{
				name: 'North Dakota',
				id: 1227,
			},
			{
				name: 'Ohio',
				id: 1228,
			},
			{
				name: 'Oklahoma',
				id: 1229,
			},
			{
				name: 'Oregon',
				id: 1230,
			},
			{
				name: 'Pennsylvania',
				id: 1231,
			},
			{
				name: 'Rhode Island',
				id: 1232,
			},
			{
				name: 'South Carolina',
				id: 1233,
			},
			{
				name: 'South Dakota',
				id: 1234,
			},
			{
				name: 'Tennessee',
				id: 1235,
			},
			{
				name: 'Texas',
				id: 1236,
			},
			{
				name: 'Utah',
				id: 1237,
			},
			{
				name: 'Vermont',
				id: 1238,
			},
			{
				name: 'Virginia',
				id: 1239,
			},
			{
				name: 'Washington',
				id: 1240,
			},
			{
				name: 'West Virginia',
				id: 1241,
			},
			{
				name: 'Wisconsin',
				id: 1242,
			},
			{
				name: 'Wyoming',
				id: 1243,
			},
    ],
  },
  {
    name: 'Canada',
    id: 1244,
    children: [
      {
        name: 'Alberta',
        id: 1245,
      },
      {
        name: 'British Columbia',
        id: 1246,
      },
      {
        name: 'Manitoba',
        id: 1247,
      },
      {
        name: 'New Brunswick',
        id: 1248,
      },
      {
        name: 'Newfoundland and Labrador',
        id: 1249,
      },
      {
        name: 'Nova Scotia',
        id: 1250,
      },
      {
        name: 'Ontario',
        id: 1251,
      },
      {
        name: 'Prince Edward Island',
        id: 1252,
      },
      {
        name: 'Quebec',
        id: 1253,
      },
      {
        name: 'Saskatchewan',
        id: 1254,
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
        name: 'Business',
        id: 60,
      },
      {
        name: 'Finance',
        id: 61,
      },
      {
				name: 'Accounting',
				id: 610,
			},
      {
        name: 'Sport Management',
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
				name: 'Physical Therapy/Rehabilitation',
				id: 70,
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
				id: 51,
			},
			{
				name: 'Communications',
				id: 52,
			},
			{
				name: 'Economics',
				id: 53,
			},
			{
				name: 'English',
				id: 54,
			},
			{
				name: 'Foreign Language',
				id: 55,
			},
			{
				name: 'History',
				id: 56,
			},
			{
				name: 'International Relations',
				id: 57,
			},
			{
				name: 'Legal Studies',
				id: 58,
			},
			{
				name: 'Philosophy',
				id: 59,
			},
			{
				name: 'Political Science',
				id: 591,
			},
			{
				name: 'Psychology',
				id: 592,
			},
			{
				name: "Public Policy",
				id: 594,
			},
			{
				name: "Social Services",
				id: 595,
			},
			{
				name: 'Religious Studies',
				id: 596,
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
				id: 81,
			},
			{
				name: 'Culinary Arts',
				id: 82,
			},
		],
  },
];

export default class CollegeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      selectedRegions: [],
      selectedMajors: [],
      satScore: "",
      actScore: "",
      firstTime: 0,
      //email: this.props.route.params.email,
    }
    this.handleSAT = this.handleSAT.bind(this);
    this.handleACT = this.handleACT.bind(this);
  }

  onSelectedRegionsChange = (selectedRegions) => {
    this.setState({ selectedRegions });
  };

  onSelectedMajorsChange = (selectedMajors) => {
    this.setState({ selectedMajors });
  };

  setFirstTime(num) {
    this.setState({
      firstTime: num
    });
  }

  handleSAT(text) {
    this.setState({
      satScore: text,
    });
  }

  handleACT(text) {
    this.setState({
      actScore: text,
    });
  }

  actErrorChecking() {
    var actValid = false;
    var intAct = parseInt(this.state.actScore, 10);
    if (intAct >= 1 && intAct <= 36) {
      actValid = true;
    }
    return actValid;
  }

  satErrorChecking() {
    var satValid = false;
    var intSat = parseInt(this.state.satScore, 10)
    if (intSat >= 400 && intSat <= 1600) {
      satValid = true;
    }

    return satValid;
  }

  errorChecking() {
    var pass = true;
    if (String(this.state.satScore).localeCompare("") != 0) {
      if (!this.satErrorChecking()) {
        alert("Please enter a valid SAT score");
        pass = false;
      }
    }
    if (String(this.state.actScore).localeCompare("") != 0) {
      if (!this.actErrorChecking()) {
        alert("Please enter a valid ACT score");
        pass = false;
      }
    }
    return pass;
  }

  checkExamField() {
    var haveExam = true;
    if (this.existingSAT() == false && this.existingACT() == false) {
      haveExam = false;
    }
    return haveExam
  }

  checkRegionField() {
    var haveRegion = true;
    if (this.state.selectedRegions.length == 0) {
      haveRegion = false;
    }
    return haveRegion;
  }

  checkMajorField() {
    var haveMajor = true;
    if (this.state.selectedMajors.length == 0) {
      haveMajor = false;
    }
    return haveMajor;
  }

  checkCompletion() {
    var complete = false;

    //Checking for completion
    if (this.checkMajorField() && this.checkRegionField()) {
      complete = true;
      console.log("we have majors and regions");
    }
    else if (this.checkExamField() && this.checkRegionField()) {
      complete = true;
      console.log("We have exam and regions");
    }
    else if (this.checkExamField() && this.checkMajorField()) {
      complete = true;
      console.log("we have exam and majors ");
    }

    return complete;

  }

  checkMissing() {
    if (!this.checkExamField() && !this.checkRegionField() && !this.checkMajorField()) {
      alert("Please complete at least two of three fields (location, exam, major)");
    }
    else if (!this.checkExamField() && !this.checkMajorField()) {
      alert("Please submit either an exam score, or select a major of interest to complete the minimum required information");
    }
    else if (!this.checkExamField() && !this.checkRegionField()) {
      alert("Please submit either an exam score or select a region of interest to complete the minimum required information");
    }
    else if (!this.checkMajorField() && !this.checkRegionField()) {
      alert("Please enter either a major of interest or a region of interest to complete the minimum required information ");
    }
  }

  onSubmit() {
    if (this.errorChecking()) {
      if (this.checkCompletion()) {
        this.upload2sever();
        alert("success");
      }
      else {
        console.log("location: " + this.state.selectedRegions);
        this.checkMissing();
      }
    }
  }

  checkExisting() {
    // console.log("checkExisting " + JSON.stringify(this.state.usrInfo));
    console.log("User profile obbj: " + JSON.stringify(this.props.route.params.usrInfo));

    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/" + "surveys/college";

    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // format the API response into json
      .then((response) => response.json())
      .then((json) => {
        if (json.mesg.existing === 1) {
          // set the val to state

          // console.log("Exiting College survey data: " + JSON.stringify(json));

          this.setState({
            actScore: json.mesg.act,
            satScore: json.mesg.sat,
            selectedMajors: json.mesg.majors,
            selectedRegions: json.mesg.regions,
            firstTime: json.mesg.existing,
          }).catch((error) => {
            console.log('An error happened: ' + error);
          });


        }
      });
  }

  existingSAT() {
    let existingScore = false;
    let strSat = String(this.state.satScore);
    //console.log("strSat: "+strSat);
    if (strSat.localeCompare("") != 0) {
      existingScore = true;
    }
    //console.log("ExistingSat: "+existingScore);
    return existingScore;
  }

  existingACT() {
    let existingScore = false;
    //this.checkExamScores()
    if (this.state.actScore.localeCompare("") != 0) {
      existingScore = true;
    }
    return existingScore;
  }

  upload2sever = () => {
    // console.log(this.props.route.params.email);
    // console.log("Email from InputScreen2: " + this.props);
    let apiMethod = "POST";
	let currentExising = this.state.firstTime;
	/*
    if (this.state.firstTime = 1) {
      apiMethod = "PATCH";
    }
	*/
	if(currentExising === 1)
	{
		apiMethod = "PATCH";
	}

    this.setFirstTime(1);

    console.log(
      JSON.stringify({
        regions: this.state.selectedRegions,
        majors: this.state.selectedMajors,
        sat_score: this.state.satScore,
        act_score: this.state.actScore,
        existing: this.state.firstTime,
      })
    );

    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/" + "surveys/college";
    fetch(URL, {
      method: apiMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        regions: this.state.selectedRegions,
        majors: this.state.selectedMajors,
        sat_score: this.state.satScore,
        act_score: this.state.actScore,
        existing: this.state.firstTime,
      }),

    })
      .then((response) => {
        if (response.status == 202) {

          // console.log(response);
          alert(
            "Your data have been successfully \ninserted! " +
            "You will be navigated back!"
          );

          // setTimeout(() => {
          // 	this.props.navigation.goBack();
          // }, 2500);

        } else {
          json_mesg = response.json();
          alert("Error: " + json_mesg.mesg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.props.navigation
    this.checkExisting();
  }

  render() {
    // console.log("CollegeSurvey test "+ this.props.navigation);
    // const { selectedRegions } = this.state;
    // this.checkMajor()
    // console.log("CollegeSurvey " + JSON.stringify(this.props.route.params.usrInfo));
    console.log("Hey there, this is College Survey screen!");
    return (
      <KeyboardAwareScrollView
        style={styles.container}>

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

            <Text style={styles.re_text}>Survey Questions (Please fill two out of three fields)</Text>
            <Text style={styles.collegeSurveyQA1}>
              What is you regional preference for college location?
      					</Text>

            <View style={styles.multiSelectorWrapper}>
              <SectionedMultiSelect
                items={items.slice(0, 2)}
                IconRenderer={MaterialIcons}
                uniqueKey="name"
                subKey="children"
                selectText="Choose all that apply"
                // style={{ margin: 20 }}
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedRegionsChange}
                selectedItems={this.state.selectedRegions}
              />
            </View>

            {this.existingSAT() ?
              <View style={styles.satTextField}>
                <Text style={styles.collegeSurveyQA2}>
                  What is your SAT score?
        						</Text>
                <View style={styles.iconRow}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    style={styles.icon}
                  ></MaterialCommunityIcons>

                  <TextInput
                    value={this.state.satScore}
                    keyboardAppearance="light"
                    blurOnSubmit={false}
                    onChangeText={this.handleSAT}
                    keyboardType="numeric"
                    style={styles.textInput}
                    maxLength={4}
                  ></TextInput>
                </View>
              </View>
              :
              <View style={styles.satTextField}>
                <Text style={styles.collegeSurveyQA2}>
                  What is your SAT score?
        					</Text>
                <View style={styles.iconRow}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    style={styles.icon}
                  ></MaterialCommunityIcons>

                  <TextInput
                    placeholder="If Not Applicable Leave Blank"
                    keyboardAppearance="light"
                    blurOnSubmit={false}
                    style={styles.textInput}
                    onChangeText={this.handleSAT}
                    keyboardType="numeric"
                    maxLength={4}
                  ></TextInput>
                </View>
              </View>
            }

            {this.existingACT() ?
              <View style={styles.actTextField}>
                <Text style={styles.collegeSurveyQA3}>
                  What is your ACT score?
        						</Text>
                <View style={styles.icon1Row}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    style={styles.icon1}
                  ></MaterialCommunityIcons>
                  <TextInput
                    value={this.state.actScore}
                    keyboardAppearance="light"
                    maxLength={2}
                    blurOnSubmit={false}
                    onChangeText={this.handleACT}
                    keyboardType="numeric"
                    style={styles.textInput1}
                  ></TextInput>
                </View>
              </View>
              :
              <View style={styles.actTextField}>
                <Text style={styles.collegeSurveyQA3}>
                  What is your ACT score?
        					</Text>
                <View style={styles.icon1Row}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    style={styles.icon1}
                  ></MaterialCommunityIcons>
                  <TextInput
                    placeholder="If Not Applicable Leave Blank"
                    keyboardAppearance="light"
                    maxLength={2}
                    blurOnSubmit={false}
                    onChangeText={this.handleACT}
                    keyboardType="numeric"
                    style={styles.textInput1}
                  ></TextInput>
                </View>
              </View>
            }

            <View style={styles.majorTextField}>
              <Text style={styles.collegeSurveyQA4}>
                What major(s) are you interested in?
        					</Text>
              <View style={styles.multiSelectorWrapper}>
                <SectionedMultiSelect
                  style={{ margin: 30 }}
                  items={items.slice(2, items.length + 1)}
                  IconRenderer={MaterialIcons}
                  uniqueKey="name"
                  subKey="children"
                  selectText="Select Major(s)"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedMajorsChange}
                  selectedItems={this.state.selectedMajors}
                />
              </View>
            </View>

          </View>
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => this.onSubmit()}
          >
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  card_grp1: {
    width: '93%',
    height: "auto",
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
    width: '93%',
    height: 'auto',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    marginTop: 19,
    alignSelf: 'center',
  },

  findCollege: {
    color: "#007FF9",
    height: 37,
    width: 298,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  surveyDescription: {
    color: "rgba(0,0,0,1)",
    height: 120,
    width: 298,
    fontSize: 16,
    // marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  collegeSurveyRect2: {
    width: "90%",
    height: 'auto',
    backgroundColor: "#fefffd",
    flex: 1,
    alignSelf: "center"
  },
  collegeSurveyQA1: {
    color: "#121212",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: 10,
    // marginLeft: 5
  },
  satTextField: {
    width: "100%",
    height: 32,
    marginTop: 20,
  },
  collegeSurveyQA2: {
    fontSize: 16,
    marginTop: -27,
  },
  icon: {
    color: "#4a76ff",
    fontSize: 25,
    marginTop: 2
  },
  textInput: {
    fontSize: 16,
    color: "#121212",
    height: 32,
    width: "84%",
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
    width: "100%",
    height: 32,
    marginTop: 47,
  },
  collegeSurveyQA3: {
    fontSize: 16,
    marginTop: -25,
  },
  icon1: {
    color: "#4a76ff",
    fontSize: 25
  },
  textInput1: {
    fontSize: 16,
    color: "#121212",
    height: 32,
    width: "84%",
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
    width: "100%",
    height: 'auto',
    marginTop: 50,
  },
  collegeSurveyQA4: {
    fontSize: 16,
    marginTop: -20,
  },
  submitBtn: {
    width: "93%",
    height: 45,
    backgroundColor: "#007AFF",
    // marginTop: 20,
    justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 5,
  },
  submitContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  submitTxt: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  re_text: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: '#007FF9',
  },
  multiSelectorWrapper: {
    width: "100%",
    height: "auto",
    marginLeft: -10,
    marginBottom: 20,
  },
});