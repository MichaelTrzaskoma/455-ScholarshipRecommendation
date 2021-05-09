import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class ViewCollegeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrProf,
      collegeState: this.props.route.params.title,
      collegeKey: this.props.route.params.itemKey,
      collegeObj1_1: {
        uniName: '',
        address: '',
        tag1: '',
        tag2: '',
      },
      collegeObj1_2: {
        tuitionIn: '',
        tuitionOut: '',
        avgHousing: '',
        deadLine: ''
      },
      collegeObj2_1: {
        description: '',
        athDivi: '',
        athCon: '',
        accepRate: '',
      },
      collegeObj2_2: {
        gradRate: '',
        earningAfter: '',
        employAfteCollege: '',
        website: '',
        applyLink: ''
      },
      collegeObj3_1: {
        rankingTitle1: '',
        rankingRank1: '',
        rankingTitle2: '',
        rankingRank2: '',
        rankingTitle3: '',
        rankingRank3: '',
      },
      collegeObj3_2: {
        rankingTitle4: '',
        rankingRank4: '',
        rankingTitle5: '',
        rankingRank5: '',
        rankingTitle6: '',
        rankingRank6: ''
      },
      collegeObj4_1: {
        acceptSAT: '',
        readingSAT: '',
        mathSAT: '',
        acceptACT: '',
        englishACT: '',
        mathACT: '',
        writingACT: '',
        comAppli: '',
      },
      collegeObj4_2: {
        coalAppli: '',
        highSchGPA: '',
        highSchRank: '',
        highSchTrans: '',
        collegePrecour: '',
        sat_actScore: '',
        recommend: '',
        averMealPlan: '',
        bookCost: ''
      },
      collegeObj5_1: {
        femUnder: '',
        malUnder: '',
        inStateResi: '',
        outStateResi: '',
        interResi: '',
        under18: '',
        a18_19: '',
        a20_21: '',
        a22_24: ''
      },
      collegeObj5_2: {
        over25: '',
        AfricanAmerican: '',
        Asian: '',
        Hispanic: '',
        International: '',
        Multi: '',
        NativeAmerican: '',
        PacificIslander: '',
        White: ''
      },
      collegeObj6_1: {
        mSports: '',
        fSports: '',
        clubs: '',
        music: '',
        classRadio2_19: '',
        classRadio20_39: '',
      },
      collegeObj6_2: {
        classRadio40_99: '',
        classRadio100: '',
        FacultyRatio: '',
        FemFaculty: '',
        malFaculty: '',
        popMajor: ''
      },
      applyLinkVisible: false,
      email: this.props.route.params.email,
    };
    // this.handleApplyLinkVisible = this.handleApplyLinkVisible.bind(this);
    // this.handleBookmark = this.handleBookmark.bind(this);
  }

  handleBookmark () {

    console.log("College Detail page: " + this.props.route.params.usrProf);
    //Insert API Call here
    // let URL = "http://6bff156668d9.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/college/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid +"/bookmarks";
    let URL = "http://00bd1ae1b950.ngrok.io/api/v1.2/users/id/hchen98x@gmail.com/bookmarks/college/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": this.state.usrInfo.email, 
        "title": this.state.collegeObj1_1.uniName,
        "type" : "college",
        "unique_id": this.state.usrInfo.uuid,
        "jwt": this.state.usrInfo.jwt,
      }),
    })

      // =============================================
      // .then((response) => response.json())
      // .then((json) => {
      //   console.log("Email: " + this.state.email);
      //   console.log(json);
      // })
      // =============================================

      .then((response) => {
        if (response.status == 202) {

          alert(
            "Your data have been successfully \ninserted! " +
            "You will be navigated back!"
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
    // let URL = "http://341fad54d4fc.ngrok.io/api/v1.2/scholarship/view/title/" + this.props.route.params.itemKey;

    let URL =
      "http://00bd1ae1b950.ngrok.io/api/v1.2/resources/colleges/view/titles/" + this.props.route.params.itemKey + "/" + this.state.usrInfo.email + "/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid; 


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
        // console.log("API returns College detail: " + JSON.stringify(json));
        // set the val to state
        this.setState({
          collegeObj1_1: {
            uniName: json.mesg.uni_name,
            address: json.mesg.address,
            tag1: json.mesg.tag_1,
            tag2: json.mesg.tag_2,
          },
          collegeObj1_2: {
            tuitionIn: json.mesg.tuition_in_state,
            tuitionOut: json.mesg.tuition_out_state,
            avgHousing: json.mesg.avg_housing,
            deadLine: json.mesg.application_deadline
          },
          collegeObj2_1: {
            description: json.mesg.description,
            athDivi: json.mesg.athleticsD,
            athCon: json.mesg.athleticsC,
            accepRate: json.mesg.acceptance_rate,
          },
          collegeObj2_2: {
            gradRate: json.mesg.graduation_rate,
            earningAfter: json.mesg.earning_after_uni,
            employAfteCollege: json.mesg.employ_after_uni,
            website: json.mesg.offical_site,
            applyLink: json.mesg.application_website,
          },
          collegeObj3_1: {
            rankingTitle1: json.mesg.ranking[0].title,
            rankingRank1: json.mesg.ranking[0].rank,
            rankingTitle2: json.mesg.ranking[1].title,
            rankingRank2: json.mesg.ranking[1].rank,
            rankingTitle3: json.mesg.ranking[2].title,
            rankingRank3: json.mesg.ranking[2].rank,
          },
          collegeObj3_2: {
            rankingTitle4: json.mesg.ranking[3].title,
            rankingRank4: json.mesg.ranking[3].rank,
            rankingTitle5: json.mesg.ranking[4].title,
            rankingRank5: json.mesg.ranking[4].rank,
            rankingTitle6: json.mesg.ranking[5].title,
            rankingRank6: json.mesg.ranking[5].rank,
          },
          collegeObj4_1: {
            acceptSAT: json.mesg.sat_accept_score_range,
            readingSAT: json.mesg.sat_read_score_range,
            mathSAT: json.mesg.sat_math_score_range,
            acceptACT: json.mesg.act_accept_score_range,
            englishACT: json.mesg.act_eng_score_range,
            mathACT: json.mesg.act_write_score_range,
            writingACT: json.mesg.act_write_score_range,
            comAppli: json.mesg.comm_app,
          },
          collegeObj4_2: {
            coalAppli: json.mesg.coalition_app,
            highSchGPA: json.mesg.highSchool_gpa,
            highSchRank: json.mesg.highSchool_rank,
            highSchTrans: json.mesg.highSchool_transcripts,
            collegePrecour: json.mesg.uni_precourse,
            sat_actScore: json.mesg.sat_or_act,
            recommend: json.mesg.recommendationLetter,
            averMealPlan: json.mesg.avg_meal_plan,
            bookCost: json.mesg.book_cost,
          },
          collegeObj5_1: {
            femUnder: json.mesg.female_undergrads_ratio,
            malUnder: json.mesg.male_undergrads_ratio,
            inStateResi: json.mesg.residence_in_state,
            outStateResi: json.mesg.residence_out_state,
            interResi: json.mesg.residence_international,
            under18: json.mesg.student_age_Under_18,
            a18_19: json.mesg.student_age_18TO19,
            a20_21: json.mesg.student_age_20TO21,
            a22_24: json.mesg.student_age_22TO24,
          },
          collegeObj5_2: {
            over25: json.mesg.student_age_25UP,
            AfricanAmerican: json.mesg.racial_aa,
            Asian: json.mesg.racial_asian,
            Hispanic: json.mesg.racial_hispanic,
            International: json.mesg.racial_international,
            Multi: json.mesg.racial_international,
            NativeAmerican: json.mesg.racial_na,
            PacificIslander: json.mesg.racial_pi,
            White: json.mesg.racial_white
          },
          collegeObj6_1: {
            mSports: json.mesg.sport_male,
            fSports: json.mesg.sport_female,
            clubs: json.mesg.club,
            music: json.mesg.music,
            classRadio2_19: json.mesg.class_ratio_2TO19,
            classRadio20_39: json.mesg.class_ratio_20TO39,
          },
          collegeObj6_2: {
            classRadio40_99: json.mesg.class_ratio_40TO99,
            classRadio100: json.mesg.class_ratio_100UP,
            FacultyRatio: json.mesg.faculty_ratio,
            FemFaculty: json.mesg.faculty_female,
            malFaculty: json.mesg.faculty_male,
            popMajor: json.mesg.popular_majors
          },
          // applyLinkVisible: false,
          // email: this.props.route.params.email,
        });
      });
  }

  UNSAFE_componentWillMount() {
    // componentDidMount(){
    this.getDetail();
  }



  render() {
    // console.log("From ViewCollegeDetail props " + JSON.stringify(this.props.route.params.usrProf));
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
        <View style = {styles.card_grp0}>
          <TouchableOpacity onPress={() => this.handleBookmark()}>
          <MaterialCommunityIcons
								  name="bookmark-plus"
								  style={styles.bookmarksIcon}></MaterialCommunityIcons>
							  <Text style={styles.bookmarksTxt}>Bookmark This Scholarship</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.grp1}>
            <View style={styles.titleGrpStack}>
              <View style={styles.titleGrp}>
                <Text style={styles.titleTxt}>
                  {this.state.collegeObj1_1.uniName}
                </Text>
              </View>
              <View style={styles.locGrp}>
                <Text style={styles.address3}>Address</Text>
                <Text style={styles.addressTxt}>
                  {this.state.collegeObj1_1.address}
                </Text>
              </View>
              <View style={styles.aboutTagsGrp}>
                <View style={styles.tagsIcons_1Row}>
                  <FontAwesome
                    name="tags"
                    style={styles.tagsIcons_1}
                  ></FontAwesome>
                  <Text style={styles.massachusetts}>{this.state.collegeObj1_1.tag2}</Text>
                  <FontAwesome
                    name="tags"
                    style={styles.tagsIcons_2}
                  ></FontAwesome>
                  <Text style={styles.satActOptional}>{this.state.collegeObj1_1.tag1}</Text>
                </View>
              </View>
              <View style={styles.costGrp}>
                <View style={styles.costLeftGrpRow}>
                  <View style={styles.costLeftGrp}>
                    <View style={styles.dollarIcons_1Row}>
                      <Feather
                        name="dollar-sign"
                        style={styles.dollarIcons_1}
                      ></Feather>
                      <View style={styles.inStateStack}>
                        <Text style={styles.inState}>In State</Text>
                        <Text style={styles.instateCostTxt}>{this.state.collegeObj1_2.tuitionIn}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.costCenterGrp}>
                    <View style={styles.dollarIcons_2Row}>
                      <Feather
                        name="dollar-sign"
                        style={styles.dollarIcons_2}
                      ></Feather>
                      <View style={styles.outStateTxtStack}>
                        <Text style={styles.outStateTxt}>Out State</Text>
                        <Text style={styles.outStateCostTxt}>{this.state.collegeObj1_2.tuitionOut}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.costRightGrp}>
                    <View style={styles.dollarIcons_3Row}>
                      <Feather
                        name="dollar-sign"
                        style={styles.dollarIcons_3}
                      ></Feather>
                      <View style={styles.hoursingStack}>
                        <Text style={styles.hoursing}>Avg Housing</Text>
                        <Text style={styles.housingCostTxt}>{this.state.collegeObj1_2.avgHousing}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.appDeadlineGrp}>
                <View style={styles.deadlineRow}>
                  <Text style={styles.deadline}>Deadline:</Text>
                  <Text style={styles.deadlineTxt}>{this.state.collegeObj1_2.deadLine}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.grp2}>
            <View style={styles.descriptionGrp1}>
              <Text style={styles.description2}>Description</Text>
              <Text style={styles.descriptionTxt1}>
                {this.state.collegeObj2_1.description}
              </Text>
            </View>
            <View style={styles.moreInfoGrp1}>
              <View style={styles.moreInfoLeftGrp1}>
                <Text style={styles.moreInfoTxt1}>More Details</Text>
                <Text style={styles.athleticsDivision1}>Athletics Division</Text>
                <Text style={styles.athleticsConference1}>
                  Athletics Conference
              </Text>
                <Text style={styles.acceptanceRate1}>Acceptance Rate</Text>
                <Text style={styles.graduateRate1}>Graduation Rate</Text>
                <Text style={styles.earningAfterCollege1}>
                  Earning after college
              </Text>
                <Text style={styles.employAfterCollege1}>
                  Employment after college
              </Text>
                <Text style={styles.officalSite1}>Offical Site</Text>
                <Text style={styles.admissionSite1}>Admission Site</Text>
              </View>
              <View style={styles.moreInfoLeftGrp1Filler}></View>
              <View style={styles.moreInfoRightGrp1}>
                <Text style={styles.adivisionTxt1}>
                  {this.state.collegeObj2_1.athDivi}
                </Text>
                <Text style={styles.aConferenceTxt1}>
                  {this.state.collegeObj2_1.athCon}
                </Text>
                <Text style={styles.acceptanceRateTxt1}>{this.state.collegeObj2_1.accepRate}</Text>
                <Text style={styles.graduateRateTxt1}>{this.state.collegeObj2_2.gradRate}</Text>
                <Text style={styles.earningAfterCollegeTxt1}>{this.state.collegeObj2_2.earningAfter}</Text>
                <Text style={styles.employAfterCollegeTxt1}>{this.state.collegeObj2_2.employAfteCollege}</Text>
                <Text style={styles.officalSiteTxt1}>{this.state.collegeObj2_2.website}</Text>
                <Text style={styles.admissionSiteTxt1}>{this.state.collegeObj2_2.applyLink}</Text>
              </View>
            </View>
          </View>

          <View style={styles.grp3}>
            <View style={styles.rankingGrp1}>
              <View style={styles.moreInfoLeftGrp2}>
                <Text style={styles.rankingDetail1}>Ranking Details</Text>
                <Text style={styles.rankTitle1}>
                  {this.state.collegeObj3_1.rankingTitle1}
                </Text>
                <Text style={styles.rankTitle2}>
                  {this.state.collegeObj3_1.rankingTitle2}
                </Text>
                <Text style={styles.rankTitle3}>
                  {this.state.collegeObj3_1.rankingTitle3}
                </Text>
                <Text style={styles.rankTitle4}>
                  {this.state.collegeObj3_2.rankingTitle4}
                </Text>
                <Text style={styles.rankTitle5}>
                  {this.state.collegeObj3_2.rankingTitle5}
                </Text>
                <Text style={styles.rankTitle6}>
                  {this.state.collegeObj3_2.rankingTitle6}
                </Text>
              </View>
              <View style={styles.moreInfoLeftGrp2Filler}></View>
              <View style={styles.moreInfoRightGrp2}>
                <Text style={styles.rankScore1}>{this.state.collegeObj3_1.rankingRank1}</Text>
                <Text style={styles.rankScore2}>{this.state.collegeObj3_1.rankingRank2}</Text>
                <Text style={styles.rankScore3}>{this.state.collegeObj3_1.rankingRank3}</Text>
                <Text style={styles.rankScore4}>{this.state.collegeObj3_2.rankingRank4}</Text>
                <Text style={styles.rankScore5}>{this.state.collegeObj3_2.rankingRank5}</Text>
                <Text style={styles.rankScore6}>{this.state.collegeObj3_2.rankingRank6}</Text>
              </View>
            </View>
          </View>

          <View style={styles.grp4}>
            <View style={styles.rankingGrp2}>
              <View style={styles.moreInfoLeftGrp3}>
                <Text style={styles.admissionDetails1}>Admission Details</Text>
                <Text style={styles.satRange1}>Accept SAT score range</Text>
                <Text style={styles.satRead1}>SAT Reading score</Text>
                <Text style={styles.satMath1}>SAT Math score</Text>
                <Text style={styles.actRange1}>Accept ACT score range</Text>
                <Text style={styles.actEng1}>ACT English score</Text>
                <Text style={styles.actMath1}>ACT Math score</Text>
                <Text style={styles.actWriting1}>ACT Writing score</Text>
                <Text style={styles.commApp1}>Common Application</Text>
                <Text style={styles.coalApp1}>Coalition Application</Text>
                <Text style={styles.highSchGpa1}>High School GPA</Text>
                <Text style={styles.highSchRank1}>High School Rank</Text>
                <Text style={styles.highSchoolTrans1}>
                  High School Transcript
              </Text>
                <Text style={styles.uniPrecourse1}>College Precourse</Text>
                <Text style={styles.satORact1}>SAT/ ACT score</Text>
                <Text style={styles.recomm1}>Recommendation</Text>
                <Text style={styles.avgMealCost1}>Average Meal Plan</Text>
                <Text style={styles.bookCost1}>Book Cost</Text>
              </View>
              <View style={styles.moreInfoLeftGrp3Filler}></View>
              <View style={styles.moreInfoRightGrp3}>
                <Text style={styles.satRangeTxt1}>{this.state.collegeObj4_1.acceptSAT}</Text>
                <Text style={styles.satReadTxt1}>{this.state.collegeObj4_1.readingSAT}</Text>
                <Text style={styles.satMathTxt1}>{this.state.collegeObj4_1.mathSAT}</Text>
                <Text style={styles.actRangeTxt1}>{this.state.collegeObj4_1.acceptACT}</Text>
                <Text style={styles.actEngTxt1}>{this.state.collegeObj4_1.englishACT}</Text>
                <Text style={styles.actMathTxt1}>{this.state.collegeObj4_1.mathACT}</Text>
                <Text style={styles.actWriteTxt1}>{this.state.collegeObj4_1.writingACT}</Text>
                <Text style={styles.commAppTxt1}>{this.state.collegeObj4_1.comAppli}</Text>
                <Text style={styles.coalAppTxt1}>{this.state.collegeObj4_2.coalAppli}</Text>
                <Text style={styles.highSchGpaTxt1}>{this.state.collegeObj4_2.highSchGPA}</Text>
                <Text style={styles.highSchRankTxt1}>
                  {this.state.collegeObj4_2.highSchRank}
                </Text>
                <Text style={styles.highSchRansTxt1}>{this.state.collegeObj4_2.highSchTrans}</Text>
                <Text style={styles.uniPrecourseTxt1}>{this.state.collegeObj4_2.collegePrecour}</Text>
                <Text style={styles.satORactTxt1}>
                  {this.state.collegeObj4_2.sat_actScore}
                </Text>
                <Text style={styles.recommTxt1}>{this.state.collegeObj4_2.recommend}</Text>
                <Text style={styles.avgMealCostTxt1}>{this.state.collegeObj4_2.averMealPlan}</Text>
                <Text style={styles.bookCostTxt1}>{this.state.collegeObj4_2.bookCost}</Text>
              </View>
            </View>
          </View>

          <View style={styles.grp5}>
            <View style={styles.rankingGrp3}>
              <View style={styles.moreInfoLeftGrp4}>
                <Text style={styles.studentDetails1}>Student Details</Text>
                <Text style={styles.femaleUndergraduate1}>
                  Female Undergraduate
              </Text>
                <Text style={styles.maleUndergraduate2}>Male Undergraduate</Text>
                <Text style={styles.inStateResidence1}>In-State Residence</Text>
                <Text style={styles.outStateResidence1}>Out-State Residence</Text>
                <Text style={styles.internR1}>International Residence</Text>
                <Text style={styles.under1}>Under 18 Yrs</Text>
                <Text style={styles.yr1}>18 Yrs - 19 Yrs</Text>
                <Text style={styles.yr2}>20 Yrs - 21 Yrs</Text>
                <Text style={styles.yr3}>22 Yrs - 24 Yrs</Text>
                <Text style={styles.over1}>Over 25 Yrs</Text>
                <Text style={styles.raceAa1}>African American</Text>
                <Text style={styles.raceA2}>Asian</Text>
                <Text style={styles.raceH1}>Hispanic</Text>
                <Text style={styles.raceIntern1}>International</Text>
                <Text style={styles.raceMu1}>Multiracial</Text>
                <Text style={styles.raceMul1}>Native American</Text>
                <Text style={styles.racePi1}>Pacific Islander</Text>
                <Text style={styles.raceWhite1}>White</Text>
              </View>
              <View style={styles.moreInfoLeftGrp4Filler}></View>
              <View style={styles.moreInfoRightGrp4}>
                <Text style={styles.femaleUnderTxt1}>{this.state.collegeObj5_1.femUnder}</Text>
                <Text style={styles.maleUnderTxt2}>{this.state.collegeObj5_1.malUnder}</Text>
                <Text style={styles.inStateRTxt1}>{this.state.collegeObj5_1.inStateResi}</Text>
                <Text style={styles.outStateRTxt1}>{this.state.collegeObj5_1.outStateResi}</Text>
                <Text style={styles.internRTxt1}>{this.state.collegeObj5_1.interResi}</Text>
                <Text style={styles.under2}>{this.state.collegeObj5_1.under18}</Text>
                <Text style={styles.yr4}>{this.state.collegeObj5_1.a18_19}</Text>
                <Text style={styles.yr5}>{this.state.collegeObj5_1.a20_21}</Text>
                <Text style={styles.yr6}>{this.state.collegeObj5_1.a22_24}</Text>
                <Text style={styles.over2}>{this.state.collegeObj5_2.over25}</Text>
                <Text style={styles.raceAaTxt1}>{this.state.collegeObj5_2.AfricanAmerican}</Text>
                <Text style={styles.ractATxt1}>{this.state.collegeObj5_2.Asian}</Text>
                <Text style={styles.raceHTxt1}>{this.state.collegeObj5_2.Hispanic}</Text>
                <Text style={styles.raceInternTxt1}>{this.state.collegeObj5_2.International}</Text>
                <Text style={styles.raceMuTxt1}>{this.state.collegeObj5_2.Multi}</Text>
                <Text style={styles.raceNaTxt1}>{this.state.collegeObj5_2.NativeAmerican}</Text>
                <Text style={styles.racePiTxt1}>{this.state.collegeObj5_2.PacificIslander}</Text>
                <Text style={styles.raceWhiteTxt1}>{this.state.collegeObj5_2.White}</Text>
              </View>
            </View>
          </View>

          <View style={styles.grp6}>
            <View style={styles.maleSportGrp1}>
              <Text style={styles.maleSports1}>Male Sports</Text>
              <Text style={styles.xyz1}>
                {this.state.collegeObj6_1.mSports}
              </Text>
            </View>
            <View style={styles.femaleSportGrp1}>
              <Text style={styles.femaleSports1}>Female Sports</Text>
              <Text style={styles.text1}>
                {this.state.collegeObj6_1.fSports}
              </Text>
            </View>
            <View style={styles.clubGrp1}>
              <Text style={styles.clubTxt1}>Clubs</Text>
              <Text style={styles.text2}>
                {this.state.collegeObj6_1.clubs}
              </Text>
            </View>
            <View style={styles.musicGrp1}>
              <Text style={styles.music2}>Music</Text>
              <Text style={styles.text3}>
                {this.state.collegeObj6_1.music}
              </Text>
            </View>
          </View>

          <View style={styles.grp7}>
            <View style={styles.moreInfoGrp2}>
              <View style={styles.moreInfoLeftGrp5}>
                <Text style={styles.academicDetails1}>Academic Details</Text>
                <Text style={styles.classRatio1}>Class Ratio (2 - 19)</Text>
                <Text style={styles.classRatio3}>Class Ratio (20 - 39)</Text>
                <Text style={styles.classRatio2}>Class Ratio (40 - 99)</Text>
                <Text style={styles.classRatio4}>Class Ratio (100+)</Text>
                <Text style={styles.facultyRatio1}>Faculty Ratio</Text>
                <Text style={styles.femaleFaculty1}>Female Faculty</Text>
                <Text style={styles.maleFaculty2}>Male Faculty</Text>
              </View>
              <View style={styles.moreInfoLeftGrp5Filler}></View>
              <View style={styles.moreInfoRightGrp5}>
                <Text style={styles.ratio1}>{this.state.collegeObj6_1.classRadio2_19}</Text>
                <Text style={styles.ratio2}>{this.state.collegeObj6_1.classRadio20_39}</Text>
                <Text style={styles.ratio3}>{this.state.collegeObj6_1.classRadio40_99}</Text>
                <Text style={styles.ratio4}>{this.state.collegeObj6_2.classRadio100}</Text>
                <Text style={styles.frationTxt1}>{this.state.collegeObj6_2.FacultyRatio}</Text>
                <Text style={styles.feRatioTxt1}>{this.state.collegeObj6_2.FemFaculty}</Text>
                <Text style={styles.mRatioTxt1}>{this.state.collegeObj6_2.malFaculty}</Text>
              </View>
            </View>
            <View style={styles.descriptionGrp2}>
              <Text style={styles.pupularMajors1}>Pupular Majors (ranked)</Text>
              <Text style={styles.descriptionTxt2}>
                {this.state.collegeObj6_2.popMajor}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: "rgba(230, 230, 230,1)",
    flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent: "center"
    // alignItems: "center"
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
  grp1: {
    width: "93%",
    height: 314,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  titleGrp: {
    top: 0,
    left: 0,
    height: 70,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  titleTxt: {

    color: "#121212",
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: "justify",
    lineHeight: 33,
    alignSelf: "center"
  },
  locGrp: {
    top: 68,
    left: 0,
    height: 90,
    position: "absolute",
    right: 0
  },
  address3: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    marginTop: 15,
    marginLeft: 15
  },
  addressTxt: {

    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: 6,
    marginLeft: 15
  },
  aboutTagsGrp: {
    top: 157,
    left: 0,
    height: 50,
    position: "absolute",
    right: 0,
    flexDirection: "row"
  },
  tagsIcons_1: {
    color: "rgba(98,98,98,1)",
    fontSize: 20,
    marginTop: 1
  },
  massachusetts: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 9,
    marginTop: 1
  },
  tagsIcons_2: {
    color: "rgba(98,98,98,1)",
    fontSize: 20,
    marginLeft: '15%'
  },
  satActOptional: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 8,
    marginTop: 1
  },
  tagsIcons_1Row: {
    height: 21,
    flexDirection: "row",
    flex: 1,
    marginRight: 31,
    marginLeft: 15,
    marginTop: 16
  },
  costGrp: {
    top: 206,
    left: 0,
    height: 60,
    position: "absolute",
    right: 0,
    flexDirection: "row"
  },
  costLeftGrp: {
    width: 100,
    flexDirection: "row"
  },
  dollarIcons_1: {
    color: "rgba(98,98,98,1)",
    fontSize: 30,
    marginTop: 1
  },
  inState: {
    top: 18,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 12
  },
  instateCostTxt: {
    top: 0,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 16
  },
  inStateStack: {
    width: 60,
    height: 32,
    marginLeft: 5
  },
  dollarIcons_1Row: {
    height: 32,
    flexDirection: "row",
    flex: 1,
    marginRight: 6,
    marginLeft: 8,
    marginTop: 12
  },
  costCenterGrp: {
    width: 100,
    flexDirection: "row",
    marginLeft: '2%'
  },
  dollarIcons_2: {
    color: "rgba(98,98,98,1)",
    fontSize: 30,
    marginTop: 1
  },
  outStateTxt: {
    top: 18,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 12
  },
  outStateCostTxt: {
    top: 0,
    left: 1,
    position: "absolute",

    color: "#121212",
    fontSize: 16
  },
  outStateTxtStack: {
    width: 60,
    height: 32,
    marginLeft: 4
  },
  dollarIcons_2Row: {
    height: 32,
    flexDirection: "row",
    flex: 1,
    marginRight: 6,
    marginLeft: '20%',
    marginTop: 12
  },
  costRightGrp: {
    width: 117,
    flexDirection: "row",
    marginLeft: '2%'
  },
  dollarIcons_3: {
    color: "rgba(98,98,98,1)",
    fontSize: 30,
    marginTop: 1
  },
  hoursing: {
    top: 18,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 12
  },
  housingCostTxt: {
    top: 0,
    left: 1,
    position: "absolute",

    color: "#121212",
    fontSize: 16
  },
  hoursingStack: {
    width: 76,
    height: 32,
    marginLeft: 4
  },
  dollarIcons_3Row: {
    height: 32,
    flexDirection: "row",
    flex: 1,
    marginRight: 6,
    marginLeft: '20%',
    marginTop: 12
  },
  costLeftGrpRow: {
    height: 60,
    flexDirection: "row",
    flex: 1,
    marginRight: 17
  },
  appDeadlineGrp: {
    top: 265,
    left: 0,
    height: 49,
    position: "absolute",
    right: 0,
    flexDirection: "row"
  },
  deadline: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16
  },
  deadlineTxt: {

    color: "#121212",
    fontSize: 16,
    marginLeft: 10
  },
  deadlineRow: {
    height: 19,
    flexDirection: "row",
    flex: 1,
    marginRight: 171,
    marginLeft: 15,
    marginTop: 15
  },
  titleGrpStack: {
    height: 314
  },
  grp2: {
    width: "93%",
    height: 685,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  descriptionGrp1: {
    height: 'auto',
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  description2: {

    color: "#121212",
    fontSize: 16,
    fontWeight: 'bold',
    width: 99,
    height: 19,
    marginTop: 15,
    marginLeft: 15
  },
  descriptionTxt1: {

    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  },
  moreInfoGrp1: {
    height: 407,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 1
  },
  moreInfoLeftGrp1: {
    width: 101,
    marginLeft: 15
  },
  moreInfoTxt1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  athleticsDivision1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  athleticsConference1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  acceptanceRate1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  graduateRate1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  earningAfterCollege1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  employAfterCollege1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  officalSite1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  admissionSite1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  moreInfoLeftGrp1Filler: {
    flex: 1,
    flexDirection: "row"
  },
  moreInfoRightGrp1: {
    width: 207,
    height: 407
  },
  adivisionTxt1: {

    color: "#121212",
    height: 40,
    width: 195,
    fontSize: 16,
    textAlign: "left",
    marginTop: '19%'
  },
  aConferenceTxt1: {

    color: "#121212",
    height: 40,
    width: 195,
    fontSize: 16,
    textAlign: "left",
    marginTop: 10
  },
  acceptanceRateTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  graduateRateTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 25
  },
  earningAfterCollegeTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 25
  },
  employAfterCollegeTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 30
  },
  officalSiteTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 25
  },
  admissionSiteTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 18
  },
  grp3: {
    width: "93%",
    height: 345,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  rankingGrp1: {
    height: 343,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    width: 334,
    flexDirection: "row"
  },
  moreInfoLeftGrp2: {
    width: 280,
    marginLeft: 15,
    marginTop: 10
  },
  rankingDetail1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    marginRight: -28
  },
  rankTitle1: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  rankTitle2: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  rankTitle3: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  rankTitle4: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  rankTitle5: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  rankTitle6: {
    width: 240,
    color: "#121212",
    fontSize: 16,
    marginTop: 8
  },
  moreInfoLeftGrp2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  moreInfoRightGrp2: {
    width: 86,
    height: 333,
    marginRight: -5,
    marginTop: 10
  },
  rankScore1: {
    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: '43%'
  },
  rankScore2: {
    marginTop: 0,
    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: '33%'
  },
  rankScore3: {
    marginTop: '35%',
    color: "#121212",
    fontSize: 16,
  },
  rankScore4: {
    color: "#121212",
    fontSize: 16,
    marginTop: '27%'
  },
  rankScore5: {

    color: "#121212",
    fontSize: 16,
    marginTop: 31
  },
  rankScore6: {

    color: "#121212",
    fontSize: 16,
    marginTop: '30%'
  },
  grp4: {
    width: "93%",
    height: 720,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  rankingGrp2: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    flexDirection: "row",
    flex: 1
  },
  moreInfoLeftGrp3: {
    width: 185,
    marginLeft: 15,
    marginTop: 10
  },
  admissionDetails1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  satRange1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 8
  },
  satRead1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16
  },
  satMath1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16,
    marginBottom: '7%'

  },
  actRange1: {
    color: "#121212",
    fontSize: 16,
    marginTop: 15
  },
  actEng1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16
  },
  actMath1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16
  },
  actWriting1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16,
    marginBottom: '7%'
  },
  commApp1: {
    color: "#121212",
    fontSize: 16,
    marginTop: 15
  },
  coalApp1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16,
    marginBottom: '7%'
  },
  highSchGpa1: {
    color: "#121212",
    fontSize: 16,
    marginTop: 15
  },
  highSchRank1: {
    marginTop: '5%',
    color: "#121212",
    fontSize: 16
  },
  highSchoolTrans1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '20%',
    marginBottom: '5%'
  },
  uniPrecourse1: {
    marginTop: '4%',
    color: "#121212",
    fontSize: 16,
  },
  satORact1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  recomm1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '14%'
  },
  avgMealCost1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '7%'
  },
  bookCost1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '7%'
  },
  moreInfoLeftGrp3Filler: {
    flex: 1,
    flexDirection: "row"
  },
  moreInfoRightGrp3: {
    width: 112,
    marginRight: 12,
    marginTop: 10
  },
  satRangeTxt1: {

    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: 33
  },
  satReadTxt1: {
    marginTop: '9%',
    color: "#121212",
    fontSize: 16,
    textAlign: "left"
  },
  satMathTxt1: {
    marginTop: '9%',
    color: "#121212",
    fontSize: 16
  },
  actRangeTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '25%'
  },
  actEngTxt1: {
    marginTop: '8%',
    color: "#121212",
    fontSize: 16,
  },
  actMathTxt1: {
    marginTop: '8%',
    color: "#121212",
    fontSize: 16,
  },
  actWriteTxt1: {
    marginTop: '8%',
    color: "#121212",
    fontSize: 16,
  },
  commAppTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '24%'
  },
  coalAppTxt1: {
    marginTop: '8%',
    color: "#121212",
    fontSize: 16,
  },
  highSchGpaTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 26
  },
  highSchRankTxt1: {
    marginTop: '8%',
    color: "#121212",
    fontSize: 16,
  },
  highSchRansTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 40,
  },
  uniPrecourseTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 16
  },
  satORactTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  recommTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  avgMealCostTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '10%'
  },
  bookCostTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '12%'
  },
  grp5: {
    width: "93%",
    height: 720,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  rankingGrp3: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    flexDirection: "row",
    flex: 1
  },
  moreInfoLeftGrp4: {
    width: 185,
    marginLeft: 15,
    marginTop: 10
  },
  studentDetails1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  femaleUndergraduate1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  maleUndergraduate2: {

    color: "#121212",
    fontSize: 16,
    marginTop: '7%',
    marginBottom: '7%'
  },
  inStateResidence1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 15
  },
  outStateResidence1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  internR1: {
    marginTop: '7%',
    marginBottom: '7%',
    color: "#121212",
    fontSize: 16
  },
  under1: {
    color: "#121212",
    fontSize: 16,
    marginTop: "7%"
  },
  yr1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  yr2: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  yr3: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  over1: {
    marginTop: '7%',
    marginBottom: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceAa1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 15
  },
  raceA2: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceH1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceIntern1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceMu1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceMul1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  racePi1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  raceWhite1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  moreInfoLeftGrp4Filler: {
    flex: 1,
    flexDirection: "row"
  },
  moreInfoRightGrp4: {
    width: 105,
    marginRight: 12,
    marginTop: 10
  },
  femaleUnderTxt1: {

    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: '34%'
  },
  maleUnderTxt2: {
    marginTop: '12%',
    marginBottom: '14%',
    color: "#121212",
    fontSize: 16,
    textAlign: "left"
  },
  inStateRTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '13%',
    marginBottom: '3%'
  },
  outStateRTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  internRTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  under2: {
    marginTop: '25%',
    marginBottom: '2%',
    color: "#121212",
    fontSize: 16,
  },
  yr4: {
    marginTop: '12%',
    marginBottom: '2%',
    color: "#121212",
    fontSize: 16,
  },
  yr5: {
    marginTop: '11%',
    marginBottom: '3%',
    color: "#121212",
    fontSize: 16,
  },
  yr6: {
    marginBottom: '2%',
    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  over2: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  raceAaTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '25%',
    marginBottom: '2%'
  },
  ractATxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 11
  },
  raceHTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '11%',
    marginBottom: '2%'
  },
  raceInternTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '11%',
    marginBottom: '1%'
  },
  raceMuTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '11%',
    marginBottom: '3%'
  },
  raceNaTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '10%',
    marginBottom: '3%'
  },
  racePiTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '11%',
    marginBottom: '3%'
  },
  raceWhiteTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  grp6: {
    width: "93%",
    height: 673,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
  maleSportGrp1: {
    height: 168,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  maleSports1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    width: 99,
    height: 19,
    marginTop: 15,
    marginLeft: 15
  },
  xyz1: {

    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  },
  femaleSportGrp1: {
    height: 168,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  femaleSports1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    width: 119,
    height: 19,
    marginTop: 15,
    marginLeft: 15
  },
  text1: {

    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  },
  clubGrp1: {
    height: 168,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  clubTxt1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    width: 119,
    height: 19,
    marginTop: 15,
    marginLeft: 15
  },
  text2: {
    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  },
  musicGrp1: {
    height: 168,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  music2: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    width: 119,
    height: 19,
    marginTop: 15,
    marginLeft: 15
  },
  text3: {
    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  },
  grp7: {
    width: "93%",
    height: "auto",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  moreInfoGrp2: {
    height: 273,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    flexDirection: "row"
  },
  moreInfoLeftGrp5: {
    width: 185,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: -10
  },
  academicDetails1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  classRatio1: {
    marginBottom: '7%',
    color: "#121212",
    fontSize: 16,
    marginTop: 10
  },
  classRatio2: {
    marginBottom: '7%',
    color: "#121212",
    fontSize: 16
  },
  classRatio3: {
    marginBottom: '7%',
    color: "#121212",
    fontSize: 16
  },
  classRatio4: {
    marginBottom: '14%',
    color: "#121212",
    fontSize: 16
  },
  facultyRatio1: {
    color: "#121212",
    fontSize: 16,
  },
  femaleFaculty1: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  maleFaculty2: {
    marginTop: '7%',
    color: "#121212",
    fontSize: 16
  },
  moreInfoLeftGrp5Filler: {
    flex: 1,
    flexDirection: "row"
  },
  moreInfoRightGrp5: {
    width: 115,
    marginRight: 2,
    marginTop: 10,
    marginBottom: -10
  },
  ratio1: {

    color: "#121212",
    fontSize: 16,
    textAlign: "left",
    marginTop: '29%',
    marginBottom: '11%'
  },
  ratio2: {
    marginBottom: '11%',
    color: "#121212",
    fontSize: 16,
    textAlign: "left"
  },
  ratio3: {

    color: "#121212",
    fontSize: 16
  },
  ratio4: {
    marginTop: '-16%',
    color: "#121212",
    fontSize: 16
  },
  frationTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '11%'
  },
  feRatioTxt1: {
    color: "#121212",
    fontSize: 16,
    marginTop: '25%'
  },
  mRatioTxt1: {

    color: "#121212",
    fontSize: 16,
    marginTop: '13%'
  },
  descriptionGrp2: {
    height: 260,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5
  },
  pupularMajors1: {
    fontWeight: 'bold',
    color: "#121212",
    fontSize: 16,
    width: 219,
    height: 19,
    marginLeft: 15,
    marginTop: '3%'
  },
  descriptionTxt2: {

    color: "#121212",
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 15,
    marginRight: 19
  }
});