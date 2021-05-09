import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

//Henry please create the following variables on the backend:
//haveSalary | boolean set to false as default
//haveAutonomy | boolean set to false by default
//haveVariety | boolean set to false by default
//haveSocial | boolean set to false by default
//havehaveEnvironment | boolean set to false by default


const items = [
  {
    name: "Subjects",
    id: 0,
    children: [
      {
        name: "Arts",
        id: 1,
      },
      {
        name: "English",
        id: 2,
      },
      {
        name: "History",
        id: 3,
      },
      {
        name: "Math",
        id: 4,
      },
      {
        name: "Science",
        id: 5,
      },

    ]
  }
]

export default class MajorSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      salaryValue: 20000,
      salaryDisplay: "",
      unemploymentValue: 10,
      unemploymentDisplay: 10,
      selectedSubjects: [],
      autonomy: 1,
      displayAutonomy: "",
      trueAutonomy: "",
      variety: 1,
      trueVariety: "",
      socialInteraction: 1,
      trueSocialInteraction: "",
      workEnvironment: 1,
      trueEnvironment: "",
      //Tripwires used to determine if user has edited slider (relevant for displayValues)
      autoTripwire: false,
      salaryTripWire: false,
      varietyTripwire: false,
      socialTripwire: false,
      environmentTripwire: false,
      defaultAutoDisplay: "Job Dependent",
      defaultSalaryDisplay: "20,000",
      defaultVarietyDisplay: "Medium",
      defaultSocialDisplay: "Job Dependent",
      defaultEnvironmentDisplay: "Job Dependent",
      firstTime: 0,
      currentMethod: "POST",
    }
  }

  handleSalaryValue(val) {
    this.setState({
      salaryTripWire: true,
      salaryValue: val,
    });
    //console.log(this.state.salaryValue);
  }

  handleUnemploymentRate(val) {
    this.setState({
      unemploymentValue: val,
    });
    //console.log(this.state.unemploymentValue);
  }

  handleAutonomy(val) {
    this.displayAutonomy(val);
    this.handleTrueAutonomy(val);
    this.setState({
      autonomy: val,
      autoTripwire: true,
    });
    //console.log("state autonomy: "+this.state.autonomy);
    //console.log("backendValue: "+this.state.trueAutonomy);
    //console.log("displayValue: "+this.state.displayAutonomy);
  }

  handleVariety(val) {
    this.setState({
      variety: val,
      varietyTripwire: true,
    });
    //console.log(this.state.variety)
  }

  handleSocial(val) {
    this.setState({
      social: val,
      socialTripwire: true,
    });
  }

  handleEnvironment(val) {
    this.setState({
      workEnvironment: val,
      environmentTripwire: true,
    })
  }

  onSelectedItemsChange = (selectedSubjects) => {
    this.setState({ selectedSubjects });
  };

  truncateSalary(salary) {
    //Trucating Salary
    var strSalary = String(salary);
    var decimalIndex;
    decimalIndex = strSalary.indexOf(".");
    //Obtaining Salary String before decimal (no cents or fractions of cents)
    strSalary = strSalary.substring(0, decimalIndex);
    //In the event there is no decimal and the number is whole
    if (String(salary).localeCompare("20000") == 0 || String(salary).localeCompare("130000") == 0) {
      strSalary = String(salary);
    }
    //Adding commas to salary
    var strBeforeComma = strSalary.substring(0, strSalary.length - 3)
    var strSalary = strBeforeComma + "," + strSalary.substring(strSalary.length - 3);
    this.setState({
      salaryDisplay: strSalary
    });
  }

  truncateUnemployment(rate) {
    var strRate = String(rate);
    var decimalIndex;
    decimalIndex = strRate.indexOf(".");
    strRate = strRate.substring(0, decimalIndex + 3);
    //In the event there are no decimals, the rate can display as-is
    if (String(rate).localeCompare("1") == 0 || String(rate).localeCompare("10") == 0) {
      strRate = String(rate);
    }
    this.setState({
      unemploymentDisplay: strRate
    });
  }

  displayAutonomy(val) {
    var strInput = String(val);
    var strDisplay = "";
    if (strInput.localeCompare("0") == 0) {
      strDisplay = "Autonomous";
    }
    else if (strInput.localeCompare("1") == 0) {
      strDisplay = "Job Dependent";
    }
    else {
      strDisplay = "Not Autonomous";
    }
    this.setState({
      displayAutonomy: strDisplay
    });
  }

  handleTrueAutonomy(val) {
    var strInput = String(val);
    var strTrueVal = "";
    if (strInput.localeCompare("0") == 0) {
      strTrueVal = "Yes";
    }
    else if (strInput.localeCompare("1") == 0) {
      strTrueVal = "Job Dependent";
    }
    else {
      strTrueVal = "No";
    }
    this.setState({
      trueAutonomy: strTrueVal
    });
  }

  handleTrueVariety(val) {
    var strInput = String(val);
    var strTrueVal = "";
    if (strInput.localeCompare("0") == 0) {
      strTrueVal = "Low";
    }
    else if (strInput.localeCompare("1") == 0) {
      strTrueVal = "Medium";
    }
    else {
      strTrueVal = "High";
    }
    this.setState({
      trueVariety: strTrueVal
    });
  }

  handleTrueSocial(val) {
    var strInput = String(val);
    var strTrueVal = "";
    if (strInput.localeCompare("0") == 0) {
      strTrueVal = "No";
    }
    else if (strInput.localeCompare("1") == 0) {
      strTrueVal = "Job Dependent";
    }
    else {
      strTrueVal = "Yes";
    }
    this.setState({
      trueSocialInteraction: strTrueVal
    });
  }

  handleTrueEnviron(val) {
    var strInput = String(val);
    var strTrueVal = "";
    if (strInput.localeCompare("0") == 0) {
      strTrueVal = "Indoor";
    }
    else if (strInput.localeCompare("1") == 0) {
      strTrueVal = "Job Dependent";
    }
    else {
      strTrueVal = "Outdoor";
    }
    this.setState({
      trueEnvironment: strTrueVal
    });
  }

  setFirstTime(val) {
    this.setState({
      firstTime: val
    });
  }

  editSalary(val) {
    this.handleSalaryValue(val);
    this.truncateSalary(val);
    //console.log("Val: " +val);
    //console.log("salary value: "+this.state.salaryValue);
    //console.log("display salary: "+this.state.salaryDisplay);
  }

  editUnemployment(val) {
    this.handleUnemploymentRate(val);
    this.truncateUnemployment(val);
    //console.log("unemployment value: "+this.state.unemploymentValue);
    //console.log("displayUnemployment: "+this.state.unemploymentValueDisplay);
  }

  editAutonomy(val) {
    this.handleAutonomy(val);
    this.displayAutonomy(val);
    this.handleTrueAutonomy(val);
    //console.log("Display Value: "+this.state.displayAutonomy)
    //console.log("Backend Value: "+this.state.trueAutonomy);
  }

  editVariety(val) {
    this.handleVariety(val);
    this.handleTrueVariety(val);
  }

  editSocial(val) {
    this.handleSocial(val);
    this.handleTrueSocial(val);
  }

  editEnvironment(val) {
    this.handleEnvironment(val);
    this.handleTrueEnviron(val);
  }

  debugPrinter() {
    console.log("Salary Value: " + this.state.salaryValue);
    console.log("Unemployment Value: " + this.state.unemploymentValue);
    console.log("Display Autonomy: " + this.state.unemploymentDisplay);
    console.log("True Autonomy Value: " + this.state.trueAutonomy);
    console.log("True Variety Value: " + this.state.trueVariety);
  }

  upload2server() {
    if (this.state.firstTime == 1) {
      this.setState({ currentMethod: "PATCH" });
    }
    this.setFirstTime(1);

    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/surveys/major";
    fetch(URL, {
      method: this.state.currentMethod,
      // method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        avg_salary: this.state.salaryValue,
        unemployment_rate: this.state.unemploymentValue,
        subjects: this.state.selectedSubjects,
        variety_of_jobs: this.state.trueVariety,
        high_social_interaction: this.state.trueSocialInteraction,
        work_environment: this.state.trueEnvironment,
        
        //Tripwires used to determine if user has edited slider (relevant for displayValues)
        haveSalary: this.state.salaryTripWire,
        haveVariety: this.state.varietyTripwire,
        haveSocial: this.state.socialTripwire,
        haveEnvironment: this.state.environmentTripwire,
      }),
      
    })
      .then((response) => {
        if (response.status == 202) {

          // console.log(response);
          alert(
            "Your data have been successfully \ninserted! " +
            "You will be navigated back!"
          );

        } else {
          let json_mesg = response.json();
          console.log("API response: " + JSON.stringify(response));
          alert("Error: " + json_mesg.mesg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit() {
    this.upload2server();
    this.debugPrinter();
  }

  translateTrues() {
    //trues to values for sliders
    if (this.state.socialTripwire) {
      var strTrueSocial = String(this.state.trueSocialinteraction)
      if (strTrueSocial.localeCompare("Yes") == 0) {
        this.setState({
          socialInteraction: 2
        });
      }
      else if (strTrueSocial.localeCompare("Job Dependent") == 0) {
        this.setState({
          socialInteraction: 1
        });
      }
      else {
        this.setState({
          socialInteraction: 0,
        });
      }
    }
    if (this.state.autoTripwire) {
      var strTrueAutonomy = String(this.state.trueAutonomy)
      if (strTrueAutonomy.localeCompare("Yes") == 0) {
        this.setState({
          autonomy: 0
        });
      }
      else if (strTrueAutonomy.localeCompare("Job Dependent") == 0) {
        this.setState({
          autonomy: 1
        });
      }
      else {
        this.setState({
          autonomy: 2,
        });
      }
    }
    if (this.state.varietyTripwire) {
      var strTrueVariety = String(this.state.trueVariety)
      if (strTrueVariety.localeCompare("Low") == 0) {
        this.setState({
          variety: 0
        });
      }
      else if (strTrueVariety.localeCompare("Medium") == 0) {
        this.setState({
          variety: 1
        });
      }
      else {
        this.setState({
          variety: 2,
        });
      }
    }
    if (this.state.environmentTripwire) {
      var strTrueEnviron = String(this.state.trueEnvironment)
      if (strTrueEnviron.localeCompare("Indoor") == 0) {
        this.setState({
          workEnvironment: 0
        });
      }
      else if (strTrueEnviron.localeCompare("Job Dependent") == 0) {
        this.setState({
          workEnvironment: 1
        });
      }
      else {
        this.setState({
          workEnvironment: 2,
        });
      }
    }
  }

  getExistingData = () => {
    //insert correct URL for user's profile
    // /api/v1.2/users/id/<email>/<token>/<id>/surveys/major
    // console.log("User profile obbj from Mjor survey: " + JSON.stringify(this.props.route.params.usrInfo));

    // let URL = http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/surveys/major
    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/surveys/major";

    fetch(URL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Exisiting Major Data: " + JSON.stringify(json));
        // console.log("Email from ScholarSurvey.js: " + this.state.email);
        // set the val to state
        if (json.mesg.existing === 1) {
          // there's an exisiting data on client's record
          // this.setState({
          //   salaryTripWire: json.mesg.haveSalary,
          //   socialTripwire: json.mesg.haveSocial,
          //   environmentTripwire: json.mesg.haveEnvironment,
          //   autoTripwire: json.mesg.haveAutonomy,
          //   varietyTripwire: json.mesg.haveVariety,
          //   salaryValue: json.mesg.avg_salary,
          //   unemploymentValue: json.mesg.unemployment_rate,
          //   trueAutonomy: json.mesg.autonomous,
          //   selectedSubjects: json.mesg.subjects,
          //   trueVariety: json.mesg.variety_of_jobs,
          //   trueSocialInteraction: json.mesg.high_social_interaction,
          //   trueEnvironment: json.mesg.work_environment,
          //   firstTime: json.mesg.existing,
          // });
          // this.translateTrues();
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getExistingData();
  }

  render() {
    // console.log("MajorSurvey props checking " + JSON.stringify(this.props.route.params.usrInfo));
    console.log("Hey there, this is Major Survey screen!");
    return (
      <KeyboardAwareScrollView
        style={styles.container}>

        {/* 1st TextBox */}
        <View style={styles.card_grp1}>
          <Text style={styles.findCollege}>To Find your Major:</Text>
          <Text style={styles.surveyDescription}>
            You may not have an answer for all of these questions but we encourage you
            to think about them and answer as best as possible. Multiple attempts are encouraged.
               		</Text>
        </View>

        {/* 2nd TextBox */}
        <View style={styles.card_grp2}>

          <View style={styles.collegeSurveyRect2}>

            <Text style={styles.re_text}>Major Survey Questions</Text>
            <Text style={styles.collegeSurveyQA1}>
              What is your desired annual salary? (Nationwide Average)
      					</Text>

            <View style={styles.multiSelectorWrapper}>
              <Slider
                style={{ width: 310, height: 40 }}
                minimumValue={20000}
                maximumValue={130000}
                minimumTrackTintColor="#21732e"
                maximumTrackTintColor="#808080"
                value={this.state.salaryValue}
                //value = {this.state.salaryValue}
                //onSlidingComplete = {(value) => this.handleSalaryValue(value)}
                onSlidingComplete={(value) => this.editSalary(value)}
              />
              {this.state.salaryTripWire ?
                <Text style={styles.salaryValueDisplay}>
                  ${this.state.salaryDisplay}
                </Text>
                :
                <Text style={styles.salaryValueDisplay}>
                  ${this.state.defaultSalaryDisplay}
                </Text>
              }

            </View>

            <View style={styles.satTextField}>
              <Text style={styles.collegeSurveyQA2}>
                What unemployment rate are you willing to contend with?
        						</Text>
              <Slider
                style={{ width: 310, height: 40 }}
                minimumValue={1}
                maximumValue={10}
                value={this.state.unemploymentValue}
                minimumTrackTintColor="#d91c37"
                maximumTrackTintColor="#808080"
                //value = {this.state.salaryValue}
                //onSlidingComplete = {(value) => this.handleSalaryValue(value)}
                onValueChange={(value) => this.editUnemployment(value)}
              />
              <Text style={styles.unemploymentValueDisplay}>
                {this.state.unemploymentDisplay}%
                                	</Text>
            </View>
            {/*}
							<View style={styles.actTextField}>
							
								<Text style={styles.collegeSurveyQA3}>
									Preferred Level of Autonomy?
        					</Text>
								<View style={styles.icon1Row}>
								<Slider
									style={{width: 200, height: 40}}
									step = {1}
									minimumValue={0}
									maximumValue={2}
									value = {this.state.autonomy}
									minimumTrackTintColor="#a112cc"
									maximumTrackTintColor="#a112cc"
									//value = {this.state.salaryValue}
									//onSlidingComplete = {(value) => this.handleSalaryValue(value)}
									onValueChange = {(value) => this.handleAutonomy(value)}
                        		/>
								</View>
								{ this.state.autoTripwire ?
								<Text style = {styles.autonomyValueDisplay}>
                                    {this.state.displayAutonomy}
                                </Text>
								:
								<Text style = {styles.autonomyValueDisplay}>
                                    {this.state.defaultAutoDisplay}
                                </Text>
								}
							</View>
							*/}
            <View style={styles.majorTextField}>
              <Text style={styles.collegeSurveyQA4}>
                What Subject(s) are you interested in?
        					</Text>
              <View style={styles.multiSelectorWrapper}>
                <SectionedMultiSelect
                  style={{ margin: 30 }}
                  items={items}
                  IconRenderer={MaterialIcons}
                  uniqueKey="name"
                  subKey="children"
                  selectText="Select Subject(s)"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedSubjects}
                />
              </View>

            </View>

            <View style={styles.icon2Row}>
              <Text style={styles.collegeSurveyQA4}>
                Prefered Level of Job Variety Per Major?
						</Text>
              <Slider
                style={{ width: 310, height: 40 }}
                step={1}
                minimumValue={0}
                maximumValue={2}
                value={this.state.variety}
                minimumTrackTintColor="#a112cc"
                maximumTrackTintColor="#808080"
                //value = {this.state.salaryValue}
                //onSlidingComplete = {(value) => this.handleSalaryValue(value)}
                onValueChange={(value) => this.editVariety(value)}
              />
            </View>
            {this.state.varietyTripwire ?
              <Text style={styles.varietyValueDisplay}>
                {this.state.trueVariety}
              </Text>
              :
              <Text style={styles.varietyValueDisplay}>
                {this.state.defaultVarietyDisplay}
              </Text>
            }
            <View style={styles.socialRow}>
              <Text style={styles.majorSurveyQA5}>
                Do You Prefer a High Level of Social Interaction at work?
							</Text>
              <Slider
                style={{ width: 310, height: 40 }}
                step={1}
                minimumValue={0}
                maximumValue={2}
                value={this.state.socialInteraction}
                minimumTrackTintColor="#f58eb4"
                maxiumumTrackTintColor="808080"
                onValueChange={(value) => this.editSocial(value)}
              />
              {this.state.socialTripwire ?
                <Text style={styles.socialValueDisplay}>
                  {this.state.trueSocialInteraction}
                </Text>
                :
                <Text style={styles.socialValueDisplay}>
                  {this.state.defaultSocialDisplay}
                </Text>
              }
            </View>
            <View style={styles.environRow}>
              <Text style={styles.majorSurveyQA6}>
                Preferred Work Environment?
							</Text>
              <Slider
                style={{ width: 310, height: 40 }}
                step={1}
                minimumValue={0}
                maximumValue={2}
                value={this.state.workEnvironment}
                minimumTrackTintColor="#31e03d"
                maxiumumTrackTintColor="#dbc84d"
                onValueChange={(value) => this.editEnvironment(value)}
              />
              {this.state.environmentTripwire ?
                <Text style={styles.environValueDisplay}>
                  {this.state.trueEnvironment}
                </Text>
                :
                <Text style={styles.environValueDisplay}>
                  {this.state.defaultEnvironmentDisplay}
                </Text>
              }
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
  salaryValueDisplay: {
    color: "#21732e",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: 10,
    marginLeft: 130,
  },
  unemploymentValueDisplay: {
    color: "#d91c37",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: 10,
    marginLeft: 130,
  },
  autonomyValueDisplay: {
    color: "#a112cc",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: 10,
    marginLeft: 80,
  },
  varietyValueDisplay: {
    color: "#a112cc",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: "auto",
    marginLeft: 130,
  },
  socialValueDisplay: {
    color: "#f58eb4",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: "auto",
    marginLeft: 130,
  },
  environValueDisplay: {
    color: "#31e03d",
    fontSize: 16,
    width: "100%",
    height: 39,
    marginTop: "auto",
    marginLeft: 130,
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
    marginTop: 60,
  },
  collegeSurveyQA3: {
    fontSize: 16,
    marginTop: 10,
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
    marginLeft: 10,
  },
  icon1Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 11,
  },
  icon2Row: {
    height: "auto",
    marginLeft: 0,
    marginTop: 11,
    marginBottom: 20,
  },
  socialRow: {
    height: "auto",
    marginLeft: 0,
    marginTop: 11,
    marginBottom: 20,
  },
  environRow: {
    height: "auto",
    marginLeft: 0,
    marginTop: 11,
    marginBottom: 20,
  },
  majorTextField: {
    width: "100%",
    height: 'auto',
    marginTop: 100,
  },
  collegeSurveyQA4: {
    fontSize: 16,
    marginTop: 10,
  },
  majorSurveyQA5: {
    fontSize: 16,
    marginTop: 10,
  },
  majorSurveyQA6: {
    fontSize: 16,
    marginTop: 10,
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


