import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function ScholarRecommend(props) {
    const navigation = useNavigation();
    return <ScholarRecommender {...props} navigation={navigation} />;
}

class ScholarRecommender extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email,
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.recommendGrp}>
                <View style={styles.rect2}>
                    <Text style={styles.recommendTxt}>Recommend</Text>
                    <View style={styles.recommendContainer}>
                        <TouchableOpacity style={styles.recommendBtn} onPress={() => navigation.navigate("ViewScholarDetail", { title: "Scholarship Detail", })}>
                            <FontAwesome
                                name="arrow-circle-right"
                                style={styles.gridItemIcon}></FontAwesome>
                            <View style={styles.gridItemIconFiller}></View>
                            <Text style={styles.gridItemTxt_1line}>Custom View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

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
        color: '#007FF9',
        fontSize: 30,
        width: 177,
        height: 40,
        fontWeight: "bold",
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
        backgroundColor: 'white',
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 5,
        shadowOpacity: 0.01,
        shadowRadius: 0,
        overflow: "hidden",
        marginLeft: 10,
    },

    gridItemIcon: {
        color: 'rgba(128,128,128,1)',
        fontSize: 35,
        marginTop: 14,
        marginLeft: 10,
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
    }
})