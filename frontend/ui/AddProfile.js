import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function AddProfile(email) {
	const navigation = useNavigation();
	// console.log("Email from AddProfile: " + email.email);

	return (
		<TouchableOpacity style={styles.button}
			onPress={() => navigation.navigate('InputScreen1', {
				"title": "Input Required Info", 
				"email": email.email,
			})}
		>
			<View style={styles.addProfileDetailIconRow}>
				<MaterialIconsIcon
					name="playlist-add"
					style={styles.addProfileDetailIcon}></MaterialIconsIcon>
				<Text style={styles.addProfileDetailTxt}>Add Profile Detail</Text>
			</View>
			<View style={styles.addProfileDetailIconRowFiller}></View>
			<EntypoIcon
				name="chevron-small-right"
				style={styles.optBtn_arrowRightICON}></EntypoIcon>
		</TouchableOpacity>

	);
}


const styles = StyleSheet.create({
	button: {
		height: 50,
		backgroundColor: 'rgba(230, 230, 230,1)',
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
