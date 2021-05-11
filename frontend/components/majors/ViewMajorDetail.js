import { TabRouter } from "@react-navigation/routers";
import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class ViewMajorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      majorObj1: {
        majorTitle: "",
        aveSalary: "",
        unemployRate: "",
        flexIndustries: "",
        socialInteract: "",
      },
      majorObj2: {
        workEnvir: "",
        auto: "",
        descri: "",
        classes: "",
        subjects: ""
      }
    }
  }

  handleBookmark() {

    // console.log("College Detail page: " + JSON.stringify(this.props));
    //Insert API Call here
    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/college/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;
    // let URL = "http://3efdd482435b.ngrok.io/api/v1.2/users/id/hchen98x@gmail.com/bookmarks/major/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid + "/recent/all/5"; 

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": this.state.usrInfo.email,
        "title": this.state.majorObj1.majorTitle,
        "type": "Major",
        "unique_id": this.state.usrInfo.uuid,
        "jwt": this.state.usrInfo.jwt,
      }),
    })
      .then((response) => {
        if (response.status == 202) {

          alert(
            "Bookmarked!"
          );

        } else {
          json_mesg = response.json();
          alert("Error: " + json_mesg.mesg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("College bookmark title: "+this.state.collegeObj1_1.uniName);  
    //alert("This scholarship has been bookmarked!");
  }

  getDetail = () => {
    // console.log("The Key: " + this.props.route.params.itemKey);
    // /api/v1.2/resources/majors/view/titles/<major_name>/<email>/<token>/<id>
    let URL = "http://6bff156668d9.ngrok.io/api/v1.2/resources/majors/view/titles/" + this.props.route.params.itemKey + "/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid;

    // console.log("URL: " + URL);
    // let URL = "http://3efdd482435b.ngrok.io/api/v1.2/resources/majors/view/titles/" + this.props.route.params.itemKey + "/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid;

    fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // format the API response into json
      .then((response) => response.json())
      .then((json) => {
        // console.log("API returns College detail: " + JSON.stringify(json));
        // set the val to state
        this.setState({
          majorObj1: {
            majorTitle: json.title,
            aveSalary: json.avg_salary,
            unemployRate: json.unemp_rate,
            flexIndustries: json.var_jobs,
            socialInteract: json.social,
          },
          majorObj2: {
            workEnvir: json.env,
            auto: json.autom,
            descri: json.desc,
            classes: json.classes,
            subjects: json.subjects
          }
        });
      });
  }

  componentDidMount() {
    console.log("User profile from ViewMajorDetail: " + JSON.stringify(this.props.route.params.usrInfo));
    this.getDetail();
  }

  render() {
    // console.log("Checking MajorDetail " + JSON.stringify(this.props.route.params.usrInfo));
    // console.log("Checking MajorDetail props " + JSON.stringify(this.props));
    return (
      <View style={styles.container}>
        <ScrollView style={styles.rect}>
          {/* <View style={styles.bookmarkBtn}></View> */}
          <View style={styles.card_grp0}>
            <TouchableOpacity onPress={() => this.handleBookmark()}>
              <MaterialCommunityIcons
                name="bookmark-plus"
                style={styles.bookmarksIcon}></MaterialCommunityIcons>
              <Text style={styles.bookmarksTxt}>Bookmark This Scholarship</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.generalInfoGrp}>

            <View style={styles.majorTitleGrp}>
              <Text style={styles.titleTxt}>{this.state.majorObj1.majorTitle}</Text>
            </View>

            <View style={styles.statisticsGrp}>
              {/* <View style={styles.keyGrpRow}> */}

              <View style={styles.keyGrp}>
                <Text style={styles.averageSalary}>Average Salary</Text>
                <Text style={styles.unemploymentRate}>Unemployment Rate</Text>
                <Text style={styles.flexibility}>
                  Flexibility in different industries
                </Text>
                <Text style={styles.socialInteraction}>
                  Social interaction in {"\n"}the job
                </Text>
                <Text style={styles.workEnv}>
                  Possible work {"\n"}environment
                </Text>
                <Text style={styles.autonomous}>Autonomous</Text>
              </View>

              <View style={styles.valGrp}>
                <Text style={styles.avg_salaryTxt}>{this.state.majorObj1.aveSalary}</Text>
                <Text style={styles.unemployRateTxt}>{this.state.majorObj1.unemployRate}</Text>
                <Text style={styles.flexibilityTxt}>{this.state.majorObj1.flexIndustries}</Text>
                <Text style={styles.socailInteractionTxt}>{this.state.majorObj1.socialInteract}</Text>
                <Text style={styles.jobDependent}>{this.state.majorObj2.workEnvir}</Text>
                <Text style={styles.autonomousTxt}>{this.state.majorObj2.auto}</Text>
              </View>

              {/* </View> */}
            </View>
          </View>

          <View style={styles.detailGrp}>
            <View style={styles.descriptionGrp}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descriptionTxt}>
                {this.state.majorObj2.descri}
              </Text>
            </View>
            <View style={styles.classGrp}>
              <Text style={styles.classes}>Classes</Text>
              <Text style={styles.classesTxt}>
                {this.state.majorObj2.classes}
              </Text>
            </View>
            <View style={styles.subjectGrp}>
              <Text style={styles.subjects}>Subjects</Text>
              <Text style={styles.text}>
                {this.state.majorObj2.subjects}
              </Text>
            </View>
            {/* <View style={styles.jobGrp}>
              <Text style={styles.jobs}>Jobs</Text>
              <Text style={styles.jobTxt}>
                Cost Accounting, Income Tax Accounting, Computerized
                Accounting/Accounting Information Systems, Concepts of Auditing,
                Statistics
            </Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)",
    justifyContent: "center"
  },
  rect: {
    backgroundColor: "#E6E6E6",
    width: "100%",
    height: "100%",
  },
  card_grp0:{
    width: '93%',
    marginTop: 25,
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bookmarksIcon:
  {
    color: 'rgba(48,132,188,1)',
		fontSize: 35,
    marginTop: 5,
    marginLeft: 20,
  },
  bookmarksTxt: {
    marginLeft: 87,
    marginTop: -22,
    color: 'rgba(48,132,188,1)',
  },
  bookmarkBtn: {
    width: "92%",
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 20,
    alignSelf: "center",
  },
  generalInfoGrp: {
    width: "92%",
    height: 286,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center"
  },
  majorTitleGrp: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  titleTxt: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    alignSelf: "center"
  },
  statisticsGrp: {
    height: 236,
    flexDirection: "row"
  },
  keyGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    flex: 1,
    marginRight: 1
  },
  averageSalary: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 15
  },
  unemploymentRate: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 15
  },
  flexibility: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 15
  },
  socialInteraction: {
    fontWeight: 'bold',
    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 11,
    marginLeft: 15
  },
  workEnv: {
    fontWeight: 'bold',
    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 10,
    marginLeft: 15
  },
  autonomous: {
    fontWeight: 'bold',
    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 10,
    marginLeft: 15
  },
  valGrp: {
    borderRadius: 5,
    flex: 1,
    marginLeft: 1,
    marginLeft: 50,
  },
  avg_salaryTxt: {

    color: "#121212",
    fontSize: 14,
    marginTop: 10
  },
  unemployRateTxt: {

    color: "#121212",
    marginTop: 10
  },
  flexibilityTxt: {

    color: "#121212",
    marginTop: 10
  },
  socailInteractionTxt: {

    color: "#121212",
    marginTop: 25
  },
  jobDependent: {

    color: "#121212",
    marginTop: 25
  },
  autonomousTxt: {

    color: "#121212",
    marginTop: 25
  },
  keyGrpRow: {
    height: 236,
    flexDirection: "row",
    flex: 1
  },
  detailGrp: {
    width: "92%",
    height: "auto",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  descriptionGrp: {
    height: 117,
    borderRadius: 5
  },
  description: {
    fontWeight: 'bold',
    color: "#121212",
    width: 83,
    height: 20,
    marginTop: 15,
    marginLeft: 15
  },
  descriptionTxt: {

    color: "#121212",
    width: 287,
    height: 68,
    marginTop: 10,
    marginLeft: 15
  },
  classGrp: {
    height: 114,
    backgroundColor: "rgba(255,255,255,1)"
  },
  classes: {
    fontWeight: 'bold',
    color: "#121212",
    width: 50,
    height: 16,
    marginTop: 15,
    marginLeft: 15
  },
  classesTxt: {

    color: "#121212",
    marginTop: 9,
    marginLeft: 15,
    marginRight: 14
  },
  subjectGrp: {
    height: 114,
    backgroundColor: "rgba(255,255,255,1)"
  },
  subjects: {
    fontWeight: 'bold',
    color: "#121212",
    width: 59,
    height: 16,
    marginTop: 15,
    marginLeft: 15
  },
  text: {

    color: "#121212",
    marginTop: 9,
    marginLeft: 15,
    marginRight: 14
  },
  jobGrp: {
    height: 123,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
  },
  jobs: {

    color: "#121212",
    width: 31,
    height: 16,
    marginTop: 15,
    marginLeft: 15
  },
  jobTxt: {

    color: "#121212",
    textAlign: "left",
    marginTop: 11,
    marginLeft: 15,
    marginRight: 19
  }
});