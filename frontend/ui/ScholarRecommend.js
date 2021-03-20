import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

// export default function ScholarCategory(props) {
//     const navigation = useNavigation();

//     // {... props} is to pass down the previous props to Category class
//     return <Category {...props} navigation={navigation} />;
// }

export default class ScholarRecommend extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: this.props.email,
        };
      }

    render() {
        return (
            <View style={styles.recommendGrp}>
                <View style={styles.rect2}>
                    <Text style={styles.recommendTxt}>Recommend</Text>
                    <View style={styles.recommendContainer}>
                        <TouchableOpacity style={styles.recommendBtn}>
                            <FontAwesomeIcon
                                name="arrow-circle-right"
                                style={styles.gridItemIcon}></FontAwesomeIcon>
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