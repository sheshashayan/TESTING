//'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Alert, 
  ScrollView,
  PropTypes,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,

} from 'react-native';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import CellView from "./CellView";  
import CustomisedListView from "./CrossReference";
import GlobalLiteratureFilters from "./GlobalLiteratureFilters";
import Parts from '../containers/Parts'
import Modal from 'react-native-simple-modal';

import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.PRODUCT_CATEGORY_PAGE_BACK_BUTTON;
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();


class ProductPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isItProdSubCategory : "ProductCategoryDetails",
      fromWhichScreen : 'productPage',
      dataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_Details),
      reloadingDataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_Details),
      offset : 5,
      addSerialNoModalOpen : false,
      addedSerialNo : "",
      isModalPressed: false,
      onceHappened: false,
      rightImage : require('../resources/images/Next.png'),

    };
      this.productListDetailsNav.bind(this); 
      this.onPressAddSerialNo = this.onPressAddSerialNo.bind(this); 
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleAndroidKeyDown = this.handleAndroidKeyDown.bind(this);

    //this.onceHappened = false;
  }
  componentWillMount() {      
      this.windowWidth= Dimensions.get('window').width;
      this.windowHeight= Dimensions.get('window').height;

      console.log("windowWidth : "+this.windowWidth);
      console.log("windowHeight : "+this.windowHeight);
  }

  render() {

    let cellView = (
      <View style = {{paddingTop: 20}}>
           <ListView
              scrollEnabled = { true }
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionId, rowId) => 
                <View style={styles.rowView}>
                  <TouchableOpacity style={{flex:1}} onPress={() => this.productListDetailsNav(rowData["title"])}>                           
                    <CellView
                      title={rowData["title"]}
                      subTitle={rowData["subTitle"]}
                      leftImage={rowData["leftImage"]}
                      rightImage={this.state.rightImage} 
                      isButtonEnabled={rowData["isButtonEnabled"]}
                      toBePopulatedOn = {this.state.fromWhichScreen}/>                                
                  </TouchableOpacity >  
              </View>
            } 
          />
      </View>)

      let cellViewWithoutButton = (
        <View style = {{paddingTop: 20}}>
           <ListView
              scrollEnabled = { true }          
              dataSource={this.state.reloadingDataSource}
              onChangeVisibleRows = {(rowData,sectionId, rowId) => alert("onchangeVisibleRows...")}
              renderRow={(rowData,sectionId, rowId) => 
                <View style={styles.rowView}>
                  <TouchableOpacity style={{flex:1}} onPress={() => this.productListDetailsNav(rowData["title"])}>                           
                    <CellView
                      title={rowData["title"]}
                      subTitle={rowData["subTitle"]}
                      leftImage={rowData["leftImage"]}
                      rightImage={this.state.rightImage} 
                      toBePopulatedOn = {this.state.fromWhichScreen}/>                                
                  </TouchableOpacity >  
              </View>
            } 
          />
      </View> ) 
      let requiredCell = (!this.state.isModalPressed ? cellView : cellViewWithoutButton);

    return (
      <View style={styles.container}>
          <View style = {[globalStyles.backNavBtnStyle]}>
              <TouchableOpacity onPress = { this.backToProductList }>
                  <BackNavComponent  backNavText =  {backNavText} />                               
              </TouchableOpacity>     
          </View>  
          <View style={[styles.headerContent]}>
            <View style={styles.backBtn}>
              <View style={styles.productDetailsContainer}>
                <View style={styles.productImageContainer}>
                  <Image
                  style={[styles.productImage]}
                  source={require('../resources/images/carrierLogo.png')} />
                </View>
                 <View style={[]}>
                    <Text style={[globalStyles.headerTxt4,styles.productText]}>Infinity Geothermal</Text>
                    <Text style={[globalStyles.headerTxt4,styles.productText]}>Heat Pump GC</Text>
                    <Text style={[globalStyles.headerTxt4,styles.productText]}>Model #:19VIE592021</Text>
                    <Text style={[globalStyles.headerTxt4,styles.productText]}>Serial #: </Text>
                </View>
              </View>
          </View>
        </View>
        <View style={styles.listNav}>
           {requiredCell}            
        </View>         
        <Modal              
               open={this.state.addSerialNoModalOpen}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({addSerialNoModalOpen: false, addedSerialNo : ""})}                                              
               style={{alignItems: 'center'}}>
               <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} }>
               <View style={{ position:'relative', paddingTop: 15, paddingBottom : 15,flexDirection : "column"}}>                                   
                  <View style = {{paddingBottom : 10,position:'absolute', top: -10, right: -10, width : 35, height : 35}}> 
                     <TouchableOpacity

                          onPress={() => this.setState({addSerialNoModalOpen: false,addedSerialNo : ""})}>
                          <Text style={{ color: '#333',fontSize: 20,textAlign: 'right',paddingRight: 8}}>&#10005;</Text>
                      </TouchableOpacity>
                  </View>
                  <View style = {[{ alignItems : 'center',paddingBottom: 25,}]}>
                     <Text style={[globalStyles.headerTxt2 ,{fontSize: 20,color: "#06273F"}]}>Serial Number</Text>
                  </View>                  
                  <View style = {styles.textInputViewStyle}>
                    <TextInput 
                      value= {this.state.addedSerialNo} 
                      autoCorrect = {false}  
                      onChangeText = {addedSerialNo => this.setState({addedSerialNo})}                       
                      placeholderTextColor="#CACACA" 
                      autoCapitalize="none" 
                      underlineColorAndroid='transparent'
                      placeholder = "Enter Serial Number" 
                      keyboardType= "default" 
                      returnKeyType = "go"
                      onSubmitEditing = {() => this.onSubmitClick(this.state.addedSerialNo)}
                      onKeyPress={Platform.os === 'ios'? this.handleKeyDown : this.handleAndroidKeyDown}
                      style= {[styles.textInputStyle]}></TextInput>
                 </View>              
                <TouchableHighlight onPress = {()=> this.onPressAddSerialNo()} style={[globalStyles.globalBtnStyle, {alignSelf : "center",paddingLeft :50, paddingRight: 50}]}>
                  <LinearGradient
                    start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                   locations={[0,0.5,1]}
                    colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                    underlayColor={['#4582B5', '#498FB5', '#4582B5']}                    
                    style={[{borderRadius: 40}]}>
                    <Text style={[globalStyles.globalBtnTextViewStyle,{textAlign :"center"}]}>
                      Add
                    </Text>
                  </LinearGradient>
                </TouchableHighlight>
              </View> 
              </TouchableWithoutFeedback>                   
        </Modal>

      </View>
    );
  }

backToProductList = () =>{
      this.props.navigator.pop();
  }

productListDetailsNav =(title) => {
    const { addSerialNoModalOpen } = this.state; 
    switch(title){      
      case 'All Literature':
      {
        this.props.navigator.push({
         name:'GlobalLiteratureFilters',
         title:'Literature',
          isHidden:false 
        });
      }
      break; 
      case 'View Parts & Equipment':
      {
        this.props.navigator.push({
         name:'Parts',
         title:'Parts',
          isHidden:false 
        });
      }
      break; 
      case 'Warranty': {   
        if(this.state.isModalPressed){
            this.props.navigator.push({
            name:'Warranty',
            title:'Warranty',
            isHidden:false 
          });
        }  
        else{
            this.setState({addSerialNoModalOpen: true}); 
        }                                        
    }
    break;  
        
    }
  }

   onPressAddSerialNo() {
      let addedSerialNo = this.state.addedSerialNo;
      let errorAlertMsg =  "";
      let pattern = /[^a-zA-Z0-9]/;
      if(addedSerialNo === "" || pattern.test(addedSerialNo)){
          if(addedSerialNo === ""){
              errorAlertMsg = "Serial Number cannot be blank";
          }
          else if(pattern.test(addedSerialNo)){
              errorAlertMsg = "Please enter the valid Serial Number";             
          }
          alert(errorAlertMsg);
      }
      else if(addedSerialNo && (addedSerialNo.length <6 || addedSerialNo.length >=14)){
          errorAlertMsg = "Please enter the valid Serial Number";
          alert(errorAlertMsg);
      }
      else if(addedSerialNo.length >=6 && addedSerialNo.length <=14){        
          this.resetSerialNo(this.state.addedSerialNo);          
      }  
  }
resetSerialNo(addedSerialNo){    
    this.setState({addedSerialNo : ""});
    this.setState({addSerialNoModalOpen: false}); 
    this.setState({isModalPressed : !this.state.isModalPressed?true:false});
    Alert.alert(
        'Alert',
        "Serial Number is added successfully",
        [{ text: 'OK', 
           onPress: () => {console.log("ok pressed")}
          }, ])          
    }

  onSubmitClick(searchText){
    if(searchText !== "" && searchText){
        this.onPressAddSerialNo();
    }
    
  }

  handleKeyDown(e) {
    let addedSerialNo = this.state.addedSerialNo;
    if(e.nativeEvent.key == "Enter" && addedSerialNo === ""){ 
        console.log("Enter Key is pressed..");
        alert("Serial Number cannot be blank");
    }        
  }

  
  handleAndroidKeyDown(e) { 
    let addedSerialNo = this.state.addedSerialNo;
    if(e.nativeEvent.key == "Enter" && addedSerialNo === ""){ 
        console.log("Enter Key is pressed..");
        alert("Serial Number cannot be blank");
    }        
  }
}

ProductPage.defaultProps = {
   addSerialNoModalOpen: false,
   addedSerialNo: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf : "stretch",
    paddingTop: 64,
  },
  headerContent:{
    flex: 3,
    alignSelf : "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  listNav: {
    flex: 8,
    alignSelf : "stretch",
    backgroundColor:'silver',
    backgroundColor: '#FFFFFF',
  },
  subordinateTxt:{
    color: "#429BE4",
    marginTop: 5,
    marginBottom: 5,
  },
  titleContainer: {
  }, 
  productDetailsContainer:{
    padding: 5,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent:'center',
  },
  productImageContainer:{  
    paddingRight: 5,  
  },
  productImage: {
    width : 120, 
    height : 50,
  },
  productDetails: {    
  },
  rowView : {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
   textInputViewStyle: {
    shadowColor : "#808080",
    shadowOpacity : 1,
    shadowRadius : 3,
    shadowOffset : {width: 1, height: 1.0},
    borderWidth : 1,
    borderColor : "lightgray"
  },
  textInputStyle: {
    paddingTop : 8,
    paddingLeft : 10,
    paddingBottom : 7,
    borderColor : "black", 
    height: 30,
    fontWeight: "100",
    color:"#000000",  
    fontSize: 14,
    fontFamily: 'Droid Serif',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  productText: {
    paddingLeft : 5,
    paddingRight : 5,
  },

});

export default ProductPage;
