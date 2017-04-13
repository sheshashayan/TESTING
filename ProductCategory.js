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
  Platform,
} from 'react-native';

import {globalStyles, deviceFinder} from "./globalStyles"; 
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import CellView from "./CellView";  
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.PRODUCT_ALLCATEGORY_SEARCH_BACK_BUTTON;
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isItProdCategoryItems : "ProductCategoryItems",
      rightImage : require('../resources/images/Next.png'),
      leftImage : "",
      isReplacmentClicked:true,
      isConstructionClicked:false,
      dropDownWidth : 200,

      isBrandSelected : false,
      isUnitTypeSelected : false,
      isCapacitySelected : false,
      selectedBrand : "",
      selectedUnitType : "",
      selectedCapacity : "",
      dataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory),

      selectionType : "Replacement",
      brandDefaultValue: 'Brand',
      Title : this.props.Title,

      //2602
      replacementSearchResult : false,
      newConstSearchResult : false,


    };

    this.replacementBtn=this.replacementBtn.bind(this);
    this.constructionBtn=this.constructionBtn.bind(this);
    this.find_dimesions = this.find_dimesions.bind(this);
    this.brandDropdownSelect = this.brandDropdownSelect.bind(this);
    this.unitTypeDropdownSelect = this.unitTypeDropdownSelect.bind(this);
    this.capacityDropdownSelect = this.capacityDropdownSelect.bind(this);

    this.toShowproductCategoryList = this.toShowproductCategoryList.bind(this); //2602   
    this.cellView = {};

  }
  replacementBtn(idx){
    console.log('replacementBtn');
    
    if(this.state.isReplacmentClicked === false){
      this.brandDropdown && this.brandDropdown.select(idx);
      this.unitTypeDropdown && this.unitTypeDropdown.select(idx);
      this.capacityDropdown && this.capacityDropdown.select(idx);

    }   
    if(this.state.isConstructionClicked === true && idx === -1){
      this.setState({
      isBrandSelected : false,
      isUnitTypeSelected : false,
      isCapacitySelected : false,

      });

    }
    this.setState({ 
      isReplacmentClicked:true, 
      isConstructionClicked:false, 
      selectionType: 'Replacement',
      brandDefaultValue: 'Brand',
      newConstSearchResult : false,
    });
  
  }

  constructionBtn(idx){
    console.log('constructionBtn');
    if(this.state.isConstructionClicked === false){
      this.brandDropdown && this.brandDropdown.select(idx);
      this.unitTypeDropdown && this.unitTypeDropdown.select(idx);
      this.capacityDropdown && this.capacityDropdown.select(idx);
    }
    if(this.state.isReplacmentClicked === true && idx === -1){
      this.setState({
      isBrandSelected : false,
      isUnitTypeSelected : false,
      isCapacitySelected : false,
      });
    }
    this.setState({ 
      isReplacmentClicked:false, 
      isConstructionClicked:true, 
      selectionType: 'NewConstruction',
      brandDefaultValue: 'Brand',
      replacementSearchResult : false,
      });
  }

  _dropdown_3_adjustFrame(style) {
    console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
    style.left -= 9;
    style.top += 9;
    style.height -=80;
    return style;
  }
  find_dimesions(layout){
    this.setState({dropDownWidth:layout.width})
    console.log(layout.width);
  }

  render() {
    let replacementResultantList = (this.state.isReplacmentClicked  && this.state.replacementSearchResult? 
                    (<ListView
                      scrollEnabled = { true }
                      dataSource={this.state.dataSource}
                      renderRow={(rowData,sectionId, rowId) => 
                        <View style={styles.rowView}>
                          <TouchableOpacity style={{flex:1}} onPress={() => this.productSubCategoryNav(rowData["id"])}>                         
                            <CellView
                              title={rowData["title"]}
                              subTitle={rowData["subTitle"]}
                              leftImage={this.state.leftImage}
                              rightImage={this.state.rightImage} />                              
                          </TouchableOpacity >  
                      </View>
                    } />) : (<View style = {{backgroundColor : "#FFFFFF"}}></View>) ) ;
    let newConstructionResultantList = (this.state.newConstSearchResult  && this.state.isConstructionClicked? 
                    (<ListView
                      scrollEnabled = { true }
                      dataSource={this.state.dataSource}
                      renderRow={(rowData,sectionId, rowId) => 
                        <View style={styles.rowView}>
                          <TouchableOpacity style={{flex:1}} onPress={() => this.productSubCategoryNav(rowData["id"])}>
                           
                            <CellView
                              title={rowData["title"]}
                              subTitle={rowData["subTitle"]}
                              leftImage={this.state.leftImage}
                              rightImage={this.state.rightImage} />
                              
                          </TouchableOpacity >  
                      </View>  } />) : (<View style = {{backgroundColor : "#FFFFFF"}}></View>) );                                                         
    return (
      <View style={styles.container}>
          <View style = {[globalStyles.backNavBtnStyle]}>
              <TouchableOpacity style = {[]}  onPress = { this.backToAllCategories }>
                  <BackNavComponent  backNavText =  {backNavText} />                               
              </TouchableOpacity>     
          </View> 

          <View style={[styles.headerContent]}>
            <Text style={[globalStyles.titleText,{color : "#06273F"}]}>{this.state.Title}</Text>

            <View style={[styles.dualBtncontainer]}>
              <TouchableHighlight onPress = {() => this.replacementBtn(-1) } style={[styles.BtnDual,styles.BtnLeft,{backgroundColor:this.state.isReplacmentClicked?"#429BE4":"#ffffff"}]}>
                <Text style={[globalStyles.headerTxt4,styles.BtnDualText,{color:this.state.isReplacmentClicked?"#ffffff":"#6A6A6A"}]}>Replacement</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress = { () => this.constructionBtn(-1) } style={[styles.BtnDual,{backgroundColor:this.state.isConstructionClicked?"#429BE4":"#ffffff"}]}>
                <Text style={[globalStyles.headerTxt4,styles.BtnDualText,{color:this.state.isConstructionClicked?"#ffffff":"#6A6A6A"}]}>New Construction</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.dropDownContainer]}> 
              <View style={styles.dropDownMenuContent}>
                  <ModalDropdown                    
                    ref={el => this.brandDropdown = el}
                    defaultValue="Brand"
                    style={styles.dropDownMenu}
                    textStyle= {styles.dropdownText}
                    dropdownStyle={[styles.brandDropdown,{minWidth:this.state.dropDownWidth}]}
                    adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                    onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                    options={dataResource.PackagedOutDoorUnits_dropdown[this.state.selectionType]['Brand']}
                    onSelect = {(idx, value) => this.brandDropdownSelect(idx, value)} >
                  </ModalDropdown>  
                  <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
              </View> 
              <View style={styles.dropDownMenuContent}>
                  <ModalDropdown
                    ref={el => this.unitTypeDropdown = el}                  
                    defaultValue="Unit Type"
                    style={styles.dropDownMenu}
                    textStyle= {styles.dropdownText}
                    dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                    adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                    onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                    options={dataResource.PackagedOutDoorUnits_dropdown[this.state.selectionType]['UnitType']}
                    onSelect = {(idx, value) => this.unitTypeDropdownSelect(idx, value)} >
                </ModalDropdown>  
                  <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
              </View> 
              <View style={styles.dropDownMenuContent}>
                  <ModalDropdown                  
                    ref={el => this.capacityDropdown = el}
                    defaultValue="Capacity"
                    style={styles.dropDownMenu}
                    textStyle= {styles.dropdownText}
                    dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                    adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                    onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                    options={dataResource.PackagedOutDoorUnits_dropdown[this.state.selectionType]['Capacity']}
                    onSelect = {(idx, value) => this.capacityDropdownSelect(idx, value)} >
                </ModalDropdown>  
                  <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
              </View>  
            </View>
            </View>
            <View style={styles.searchBtnContainer}>        
              <TouchableHighlight 
                onPress = {() => this.toShowproductCategoryList()}>
                  <LinearGradient
                  start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                  locations={[0,0.5,1]}
                  colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                  underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                  style={styles.buttonGradient}>
                  <Text style={[styles.buttonText,{}]}>
                    Search
                  </Text>
                </LinearGradient>
              </TouchableHighlight>
            </View>
          <View style={styles.listNav}>
                <View style = {{paddingTop: 20}}>                 
                      {replacementResultantList }                
                      {newConstructionResultantList}                                                        
                </View>
          </View>
      </View>
    );
  }
  
  productSubCategoryNav =(id) => {    
    switch(id){
      case 'coeh':
      {
        this.props.navigator.push({
         name:'ProductCategoryList',
          title:'Search By Product Category',
          isHidden:false
        });
      }
      break;
    }
  }
  backToAllCategories = () => {
      this.props.navigator.pop();
  }
  
  toShowproductCategoryList =() => {    
    var errorMsg = '';
    if(this.state.isBrandSelected && this.state.isUnitTypeSelected && this.state.isCapacitySelected){
      console.log("b4 replacementSearchResult.."+this.state.replacementSearchResult);
      console.log("b4 newConstSearchResult.."+this.state.newConstSearchResult);
      console.log("isReplacmentClicked .."+this.state.isReplacmentClicked);
      console.log("isConstructionClicked .."+this.state.isConstructionClicked);
      if(this.state.isReplacmentClicked === true){
        this.setState({replacementSearchResult: true});
        this.setState({newConstSearchResult: false});       
      }
      if(this.state.isConstructionClicked === true){
        this.setState({replacementSearchResult: false});
        this.setState({newConstSearchResult: true}); 
      }   
    }
    else {
    if(!this.state.isBrandSelected){
      errorMsg=errorMsg+" Brand,";
    }
    if(!this.state.isUnitTypeSelected){
      errorMsg=errorMsg+" Unit Type,";
    }
    if(!this.state.isCapacitySelected){
      errorMsg=errorMsg+" Capacity,";
    }
    if(errorMsg.length>0){
        if(errorMsg.trim().endsWith(',') && errorMsg.trim().lastIndexOf(",")){
            errorMsg = errorMsg.replace(/.$/, "");
            Alert.alert(
              'Alert',
              "Please select the value for" + errorMsg,
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],{cancelable: false} );
        }
        else{
            Alert.alert(
            'Alert',
            "Please select the value for " + errorMsg,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],{cancelable: false} );
        }    
    }
  }  
  }

  brandDropdownSelect(idx, value) {   
    if(value && value !== null && idx !== -1){
      this.setState({isBrandSelected:true});
    }
    else if(idx === -1){
      this.brandIdx = idx;
      if (this.brandIdx != 0) {
      return false;
      }
    }
  }

  unitTypeDropdownSelect(idx, value) { 
    if(value && value !== null){
      this.setState({isUnitTypeSelected:true});
    } 
  }

 capacityDropdownSelect(idx, value) {    
    if(value && value !== null){
     this.setState({isCapacitySelected:true});
    }     
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 64,
    flexDirection:'column',
  },
  headerContent:{
    height:210,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
  },
  dropDownContainer: {
    flex:1,
    flexDirection: 'column',
  },

  listNav: {
    flex: 6,
    alignSelf : "stretch",

    ...Platform.select({
      ios: {
        
      },
      android: {
        flex :5,
        
      },
    }),
  },
  subordinateTxt:{
    color: "#429BE4",
    marginBottom: 5,
  },
   
  dualBtncontainer: {
    marginTop: 8,
    marginBottom: 6,
    flexDirection: 'row',
    height:40,
  },
  BtnDual: {
    backgroundColor: "#ffffff",
    flex: 1,
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  BtnLeft: {
    borderRightWidth: 0,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  BtnRight: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
  BtnSelected: {
    backgroundColor: '#429BE4',
  },
  BtnTextSelected:{
    color: '#ffffff',
  },
  dropdownText:{
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  BtnDualText: {
    color: "#06273F",
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  
  dropDownMenu: {
    flexWrap: 'wrap',
    borderColor: "#CACACA",
    alignItems: 'stretch',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    position: 'relative',
    borderRadius: 3,
  },
  dropDown: {
    alignSelf : "stretch",
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    shadowOffset:{
        width: 1,
        height: 3,
    },
    shadowColor: 'rgba(0,0,0,0.32)',
    shadowOpacity: 0.32,
    shadowRadius: 1,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderBottomWidth: 1,
    height: (isItAndroidPhone || isItiPhone5S || isItiPhone6S)? 220 : 300,    
  },

  brandDropdown: {
    alignSelf : "stretch",
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    shadowOffset:{
        width: 1,
        height: 3,
    },
    shadowColor: 'rgba(0,0,0,0.32)',
    shadowOpacity: 0.32,
    shadowRadius: 1,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderBottomWidth: 1,
    height: 118,  
  },
  
  backgroundImage: {
    width: 10,
    height: 5,
    position:'absolute',
    top: 20,
    right: 15,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff',
    padding: 10,
  },
  searchBtnContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    borderRadius: 40,
    width: 150, 
  },
  titleText:{
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
});

export default ProductCategory;
