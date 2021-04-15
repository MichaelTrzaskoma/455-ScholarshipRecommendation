import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CollegeSurveyBtn(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.submit}>Submit</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  submit: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "roboto-700"
  }
});

export default CollegeSurveyBtn;
