import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// import TabViewSurvey from '../components/TabViewSurvey';


export default function AddProfile(email) {
	const navigation = useNavigation();
	// console.log("Email from AddProfile: " + email.email);

	return (
		<TouchableOpacity style={styles.button}
			onPress={() => navigation.navigate('TabViewSurvey', {
				"title": "Input Required Info",
				"email": email.email,
			})}
		>
			<View style={styles.addProfileDetailIconRow}>
				<MaterialIcons
					name="playlist-add"
					style={styles.addProfileDetailIcon}></MaterialIcons>
				<Text style={styles.addProfileDetailTxt}>Take Survey</Text>
			</View>
			<View style={styles.addProfileDetailIconRowFiller}></View>
			<Entypo
				name="chevron-small-right"
				style={styles.optBtn_arrowRightICON}></Entypo>
		</TouchableOpacity>

	);
}


const styles = StyleSheet.create({
	button: {
		height: 50,
		// backgroundColor: 'rgba(230, 230, 230,1)',
		backgroundColor: 'white',
		flexDirection: 'row',
	},
	addProfileDetailIconRow: {
		height: 35,
		flexDirection: 'row',
		marginLeft: 15,
		marginTop: 8,
	},
	addProfileDetailIcon: {
		color: 'rgba(107,164,39,1)',
		fontSize: 35,
	},
	addProfileDetailTxt: {

		color: '#121212',
		fontSize: 16,
		marginLeft: 15,
		marginTop: 8,
	},
	addProfileDetailIconRowFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	optBtn_arrowRightICON: {
		color: 'rgba(155,155,155,1)',
		fontSize: 40,
		marginRight: 7,
		alignSelf: 'center',
	},
});
