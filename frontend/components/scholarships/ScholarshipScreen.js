import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import ScholarCategory from "../../ui/scholarships/ScholarCategory";
import ScholarRecommend from '../../ui/scholarships/ScholarRecommend';

import HorizantalRecommendationTbl from "./HorizantalRecommendationTbl";
import VertialRecommendationTbl from "./VerticalRecommdationTbl";

export default class ScholarshipScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userProfile: this.props.usrInfo,
			email: this.props.usrInfo.email,
			// nav: this.props.navigation,
		};
	}

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.container_grp}>
					{/* Scholarship Category */}
					<ScholarCategory />
					<View style={styles.recommendGrpStack}>
						{/* Scholarship Recommend: passing down email as prop */}
						<ScholarRecommend email={this.state.email} nav={this.state.nav} />
						<View style={styles.recent_container}>
							<View style={styles.recentGrp}>
								<Text style={styles.recentTxt}>Recent Viewed</Text>
								<View style={styles.scrollArea2}>
									<ScrollView
										horizontal={true}
										showsHorizontalScrollIndicator={false}
										contentContainerStyle={
											styles.scrollArea2_contentContainerStyle
										}>
										<View style={styles.rvBtn1Row}>
											<TouchableOpacity style={styles.rvBtn1}>
												<MaterialCommunityIcons
													name="table-of-contents"
													style={styles.rvIcon1}></MaterialCommunityIcons>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_2lines}>
													Place{'\n'}Holder 1
                      							</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.gridItemBtn}>
												<MaterialCommunityIcons
													name="table-of-contents"
													style={
														styles.rvGridItemIcon
													}></MaterialCommunityIcons>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_2lines}>
													Place{'\n'}Holder 2
                      							</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.gridItemBtn}>
												<MaterialCommunityIcons
													name="table-of-contents"
													style={
														styles.rvGridItemIcon
													}></MaterialCommunityIcons>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_2lines}>
													Place{'\n'}Holder 3
                      							</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.gridItemBtn}>
												<MaterialCommunityIcons
													name="table-of-contents"
													style={
														styles.rvGridItemIcon
													}></MaterialCommunityIcons>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_2lines}>
													Place{'\n'}Holder 4
                      							</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.gridItemBtn}>
												<MaterialCommunityIcons
													name="table-of-contents"
													style={
														styles.rvGridItemIcon
													}></MaterialCommunityIcons>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_2lines}>
													Place{'\n'}Holder 5
                      							</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.gridItemBtn}>
												<FontAwesome
													name="arrow-circle-right"
													style={styles.gridItemIcon}></FontAwesome>
												<View style={styles.gridItemIconFiller}></View>
												<Text style={styles.gridItemTxt_1line}>View All</Text>
											</TouchableOpacity>
										</View>
									</ScrollView>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	container_grp: {
		flex: 1,
		width: '100%',
		// backgroundColor: "#FFFFFF",
	},
	category_container: {
		height: 173,
		justifyContent: 'center',
		marginTop: 30,
		width: '100%',
	},
	categoryGrp: {
		width: '90%',
		height: 167,
		alignSelf: 'center',
		marginTop: 5,
	},
	category_txt: {
		color: '#4a76ff',
		fontSize: 30,
		width: 177,
		height: 40,
	},
	scrollArea: {
		width: '100%',
		height: 123,
		marginTop: 4,
	},
	scrollArea_contentContainerStyle: {
		width: 720,
		height: 123,
		flexDirection: 'row',
	},
	amGrp: {
		width: 110,
		height: 110,
		borderRadius: 5,
		overflow: 'hidden',
		borderWidth: 0,
		borderColor: '#000000',
		borderLeftWidth: 0,
		backgroundColor: 'rgba(230, 230, 230,1)',
	},
	gridItemIcon: {
		color: 'rgba(128,128,128,1)',
		fontSize: 35,
		marginTop: 14,
		marginLeft: 10,
	},
	gridItemTxt_2lines: {
		color: '#121212',
		fontSize: 14,
		width: 90,
		height: 35,
		marginBottom: 8,
		alignSelf: 'center',
	},
	gridItemBtn: {
		width: 110,
		height: 110,
		borderRadius: 5,
		overflow: 'hidden',
		borderWidth: 0,
		borderColor: '#000000',
		borderLeftWidth: 0,
		// backgroundColor: 'rgba(230, 230, 230,1)',
		backgroundColor: 'white',
		marginLeft: 12,
	},
	gpa_icon: {
		color: 'rgba(128,128,128,1)',
		fontSize: 40,
		width: 40,
		height: 44,
		marginTop: 10,
		marginLeft: 7,
	},
	gridItemIconFiller: {
		flex: 1,
	},
	gridItemTxt_1line: {
		color: '#121212',
		fontSize: 14,
		width: 90,
		height: 20,
		marginBottom: 8,
		alignSelf: 'center',
	},
	amGrpRow: {
		height: 110,
		flexDirection: 'row',
		flex: 1,
		marginRight: -388,
		marginTop: 7,
	},
	recommendGrp: {
		top: 0,
		left: 0,
		height: 173,
		position: 'absolute',
		right: 0,
		justifyContent: 'center',
		marginTop: 5,
	},
	rect2: {
		width: '90%',
		height: 167,
		alignSelf: 'center',
	},
	recommendTxt: {
		color: '#4a76ff',
		fontSize: 30,
		width: 177,
		height: 40,
	},
	recommendContainer: {
		width: 332,
		height: 123,
		justifyContent: 'center',
		marginTop: 4,
	},
	recommendBtn: {
		width: 110,
		height: 110,
		borderRadius: 5,
		overflow: 'hidden',
		borderWidth: 0,
		borderColor: '#000000',
		borderLeftWidth: 0,
		backgroundColor: 'rgba(230, 230, 230,1)',
	},
	recent_container: {
		top: 172,
		left: 0,
		height: 173,
		position: 'absolute',
		right: 0,
		justifyContent: 'center',
		width: '100%',
	},
	recentGrp: {
		width: '90%',
		height: 167,
		alignSelf: 'center',
		marginTop: 5,
	},
	recentTxt: {
		color: '#007FF9',
		fontSize: 30,
		width: 205,
		height: 40,
		fontWeight: "bold",
	},
	scrollArea2: {
		width: '100%',
		height: 123,
		marginTop: 4,
	},
	scrollArea2_contentContainerStyle: {
		width: 720,
		height: 123,
		flexDirection: 'row',
	},
	rvBtn1: {
		width: 110,
		height: 110,
		borderRadius: 5,
		overflow: 'hidden',
		borderWidth: 0,
		borderColor: '#000000',
		borderLeftWidth: 0,
		backgroundColor: 'white',
	},
	rvIcon1: {
		color: 'rgba(128,128,128,1)',
		fontSize: 40,
		width: 35,
		height: 38,
		marginTop: 10,
		marginLeft: 10,
	},
	rvGridItemIcon: {
		color: 'rgba(128,128,128,1)',
		fontSize: 40,
		marginTop: 10,
		marginLeft: 10,
	},
	rvBtn1Row: {
		height: 110,
		flexDirection: 'row',
		flex: 1,
		marginRight: -388,
		marginTop: 7,
	},
	recommendGrpStack: {
		height: 345,
		width: '100%',
	}
});

