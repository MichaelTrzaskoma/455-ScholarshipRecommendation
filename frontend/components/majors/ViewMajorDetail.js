import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function MajorDetail(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.rect}>
        <View style={styles.bookmarkBtn}></View>
        <View style={styles.generalInfoGrp}>
          
          <View style={styles.majorTitleGrp}>
            <Text style={styles.titleTxt}>Title here</Text>
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
                <Text style={styles.avg_salaryTxt}>$ 52,546.00</Text>
                <Text style={styles.unemployRateTxt}>3.8 %</Text>
                <Text style={styles.flexibilityTxt}>Yes</Text>
                <Text style={styles.socailInteractionTxt}>Yes</Text>
                <Text style={styles.jobDependent}>Job Dependent</Text>
                <Text style={styles.autonomousTxt}>Yes</Text>
              </View>

            {/* </View> */}
          </View>
        </View>

        <View style={styles.detailGrp}>
          <View style={styles.descriptionGrp}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionTxt}>
              Cost Accounting, Income Tax Accounting, Computerized
              Accounting/Accounting Information Systems, Concepts of Auditing,
              Statistics
            </Text>
          </View>
          <View style={styles.classGrp}>
            <Text style={styles.classes}>Classes</Text>
            <Text style={styles.classesTxt}>
              Cost Accounting, Income Tax Accounting, Computerized
              Accounting/Accounting Information Systems, Concepts of Auditing,
              Statistics
            </Text>
          </View>
          <View style={styles.subjectGrp}>
            <Text style={styles.subjects}>Subjects</Text>
            <Text style={styles.text}>
              Cost Accounting, Income Tax Accounting, Computerized
              Accounting/Accounting Information Systems, Concepts of Auditing,
              Statistics
            </Text>
          </View>
          <View style={styles.jobGrp}>
            <Text style={styles.jobs}>Jobs</Text>
            <Text style={styles.jobTxt}>
              Cost Accounting, Income Tax Accounting, Computerized
              Accounting/Accounting Information Systems, Concepts of Auditing,
              Statistics
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
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

    color: "#121212",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 15
  },
  unemploymentRate: {

    color: "#121212",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 15
  },
  flexibility: {

    color: "#121212",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 15
  },
  socialInteraction: {

    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 11,
    marginLeft: 15
  },
  workEnv: {

    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 10,
    marginLeft: 15
  },
  autonomous: {

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