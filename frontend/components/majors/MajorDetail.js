import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MajorDetail(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containweWrapper}>
        <View style={styles.bookmarkBtn}></View>
        
        
        <View style={styles.generalInfoGrp}>
          <View style={styles.majorTitleGrp}>
            <Text style={styles.titleTxt}>Title here</Text>
          </View>
          <View style={styles.statisticsGrp}>
            <View style={styles.salaryGrpRow}>
              <View style={styles.salaryGrp}>
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
                <Text style={styles.jsbLink}>Job Links</Text>
              </View>
              <View style={styles.unemployGrp}>
                <Text style={styles.avg_salaryTxt}>$ 52,546.00</Text>
                <Text style={styles.unemployRateTxt}>3.8 %</Text>
                <Text style={styles.flexibilityTxt}>Yes</Text>
                <Text style={styles.socailInteractionTxt}>Yes</Text>
                <Text style={styles.jobDependent}>Job Dependent</Text>
                <Text style={styles.jobLinkTxt}>Here</Text>
              </View>
            </View>
          </View>
        </View>
        
        
        <View style={styles.detailGrp}>
          <View style={styles.classGrp}>
            <Text style={styles.classes}>Classes</Text>
            <Text style={styles.classesTxt}>
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
      
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)",
    justifyContent: "center"
  },
  containweWrapper: {
    backgroundColor: "#E6E6E6",
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  bookmarkBtn: {
    width: "93%",
    height: 47,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 19,
    alignSelf: "center"
  },
  generalInfoGrp: {
    width: "93%",
    height: 291,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 18,
    marginLeft: 15,
  },
  majorTitleGrp: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    width: 321,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  titleTxt: {

    color: "#121212",
    fontSize: 16,
    alignSelf: "center"
  },
  statisticsGrp: {
    height: 239,
    flexDirection: "row"
  },
  salaryGrp: {
    backgroundColor: "rgba(255,255,255,1)",
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
  jsbLink: {

    color: "#121212",
    width: 183,
    height: 35,
    marginTop: 10,
    marginLeft: 15
  },
  unemployGrp: {
    flex: 1,
    marginLeft: 1
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
  jobLinkTxt: {

    color: "#121212",
    marginTop: 25
  },
  salaryGrpRow: {
    height: 239,
    flexDirection: "row",
    flex: 1
  },
  detailGrp: {
    width: "93%",
    height: 247,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 15
  },
  classGrp: {
    height: 114,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
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
  jobGrp: {
    height: 123,
    backgroundColor: "rgba(255,255,255,1)"
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