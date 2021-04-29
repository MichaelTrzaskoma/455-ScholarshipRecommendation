import React, { Component } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Slider from '@react-native-community/slider';


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
			email: this.props.email,
            salaryValue: 20000,
            unemploymentValue: 10,
            selectedSubjects: [],
		}
	}

    handleSalaryValue(val)
    {
        this.setState({
            salaryValue: val
        });
        console.log(this.state.salaryValue);
    }

    handleUnemploymentRate(val)
    {
        this.setState({
            unemploymentValue: val
        });
        console.log(this.state.unemploymentValue);
    }

    onSelectedItemsChange = (selectedSubjects) => {
		this.setState({ selectedSubjects });
	};

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.container}>

				{/* 1st TextBox */}
				<View style={styles.card_grp1}>
					<Text style={styles.findCollege}>To Find your Major:</Text>
					<Text style={styles.surveyDescription}>
						You may not have an answer for all of these questions but we encourage you
                        to think about them and answer as best as possible. Please
                        complete the survey many times with different answers if you're undecided and compare your results!
               		</Text>
				</View>

				{/* 2nd TextBox */}
				<View style={styles.card_grp2}>

					<View style={styles.collegeSurveyRect2}>

						<Text style={styles.re_text}>Required Questions</Text>
						<Text style={styles.collegeSurveyQA1}>
							What is your expected yearly salary? (Nationwide Average)
      					</Text>

						<View style={styles.multiSelectorWrapper}>
                        <Slider
                             style={{width: 200, height: 40}}
                             minimumValue={20000}
                             maximumValue={130000}
                             minimumTrackTintColor="#4a76ff"
                             maximumTrackTintColor="#808080"
                             //value = {this.state.salaryValue}
                             //onSlidingComplete = {(value) => this.handleSalaryValue(value)}
                             onValueChange = {(value) => this.handleSalaryValue(value)}
                        />
                        <Text style = {styles.salaryValueDisplay}>
                            ${this.state.salaryValue}
                        </Text>
						</View>

							<View style={styles.satTextField}>
								<Text style={styles.collegeSurveyQA2}>
									What unemployment rate is acceptable for you?
        						</Text>
								<Slider
                                    style={{width: 200, height: 40}}
                                    minimumValue={1}
                                    maximumValue={10}
                                    minimumTrackTintColor="#4a76ff"
                                    maximumTrackTintColor="#808080"
                                    value = {this.state.unemploymentValue}
                                    //value = {this.state.UnemploymentValue}
                                    //value = {this.state.salaryValue}
                                    //onSlidingComplete = {(value) => this.handleSalaryValue(value)}
                                    onValueChange = {(value) => this.handleUnemploymentRate(value)}
                                />
                                <Text style = {styles.unemploymentValueDisplay}>
                                    {this.state.unemploymentValue}%
                                </Text>
							</View>

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
										blurOnSubmit={false}
										onChangeText={this.handleACT}
										keyboardType="numeric"
										style={styles.textInput1}
									></TextInput>
								</View>
							</View>

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

					</View>
				</View>
				
				<View style={styles.submitContainer}>
					<TouchableOpacity
						style={styles.submitBtn}
						onPress={() => console.log("Test")}
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
		color: "#121212",
		fontSize: 16,
		width: "100%",
		height: 39,
		marginTop: 10,
		marginLeft: 80,
	},
    unemploymentValueDisplay: {
		color: "#121212",
		fontSize: 16,
		width: "100%",
		height: 39,
		marginTop: 10,
		marginLeft: 80,
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
		marginTop: 100,
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


