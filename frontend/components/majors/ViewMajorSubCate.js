import React from "react";
import { TouchableNativeFeedbackBase } from "react-native";
import { StyleSheet, Text, View, ActivityIndicator, LogBox, Modal, Pressable, } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// import ViewScholarTbl from "./ViewScholarTbl";

// disable the yellow warning message box
// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);

export default class ViewMajorSubCate extends React.Component {
  // navigation.setOptions({ headerTitle: 'Search Screen' })
  constructor(props) {
    super(props);
    // this.props.route.params.itemKey
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      isLoading: true,
      scholarArr: [],
      subCate: this.props.route.params.itemKey,
      modalVisible: false,
      currentBookmarkKey: "",
    };
  }

  componentDidMount() {
    this.getDoc();
  }

  getDoc = () => {
    // console.log("Item Key: " + this.state.subCate);
    let URL = "<Host IP>/api/v1.2/resources/major/view/subjects/" + this.state.subCate;
    // let URL = "http://3efdd482435b.ngrok.io/api/v1.2/resources/major/view/subjects/" + this.state.subCate;

    fetch(URL, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("API results: " + JSON.stringify(json));
        // console.log("Testing " + JSON.stringify(json.mesg));
        this.setState({
          scholarArr: json.mesg,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log("Ann error occured: " + e);
      });

    // console.log("The subcategory is: " + this.state.subCate);
    // console.log("The list is: " + this.state.scholarArr);
    // console.log(this.state.scholarArr);
  }

  handleBookmarkOpen(key)
  {
    this.setModalVisible(true)
    this.setState({ currentBookmarkKey: key});
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setCurrentBookmarkkey = (itemKey) => {
    this.setState({ currentBookmarkKey: itemKey});
  }

  handleBookmark () {

    this.setState({ modalVisible: false});
    // console.log(this.state.currentBookmarkKey)
    let URL = "<Host IP>/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/major/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;
    // let URL = "http://3efdd482435b.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/major/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;


    fetch(URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": this.state.currentBookmarkKey,
        "unique_id": this.state.usrInfo.uuid, 
        "type": "major",
        "jwt": this.state.usrInfo.jwt,
      }),
    })

      .then((response) => {
        if (response.status == 202) {

          alert("Bookmarked!");

        } else if (response.status == 208) {

          alert("Already bookmarked!");

        } else {
          
          alert("Bookmark failed!");
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
    // console.log("Bookmark Key: "+this.state.currentBookmarkKey);  
    //alert("This College has been bookmarked!");
   
  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  render() {
    // console.log("Checking to see ViewMajorSubCate");
    // console.log("user obj from ViewMajorSubCate: " + JSON.stringify(this.props.route.params.usrInfo));
    const { modalVisible } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.currentBookmarkKey}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.handleBookmark()}
              >
                <Text style={styles.textStyle}>Bookmark</Text>
              </Pressable>
              <Pressable
                style = {[styles.button, styles.buttonClose2]}
                onPress = {() => this.setModalVisible(false)}
              >
                <Text style = {styles.textStyle}> Close   </Text>
              </Pressable>
            </View>
            <View>
              
            </View>
          </View>
      </Modal>
        <FlatList
          data={this.state.scholarArr}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            // console.log("Checking item in ViewScholarTbl " + JSON.stringify(item));
            <Text
              style={styles.item}
              onLongPress = {() => {this.handleBookmarkOpen(item)}}
              onPress={() => {
                // we are able to navigate to "ViewSubCate"
                // since it is one of the stack screens in App.js
                // therefore, no need to import in this screen
                this.props.navigation.navigate('ViewMajorDetail', {
                  title: item,
                  itemKey: item,
                  usrInfo: this.state.usrInfo
                });
              }}
            > {item} </Text>
          )}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    height: 45,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2: {
    backgroundColor: "#c42e23",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
