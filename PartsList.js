/**
 * # SupersedeNewerList.js
 * This class is used to show the list of newer parts for supersede alternative parts.
 * Author: Rakesh
 */

'use strict'

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView,
  Image,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';

import CellView from "../components/CellView";
import * as dataResource from '../components/dataResource';
import * as stringConstant from '../constants/StringConstant';
import { globalStyles, deviceFinder } from "../components/globalStyles";
import SwipeRow from '../components/SwipeRow';
import AlternativeParts from '../containers/AlternativeParts'


/*
 Creating style 
*/

const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();


const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop : 10,
    },
    listTopView:{
    paddingTop: 10
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
  swipeImageStyle : {
    alignSelf : 'center',
  },
  swipeableRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 70,
  },
  swipeableRowBack: {
    alignItems: 'center',
    backgroundColor: '#429BE4',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding : 20,
    paddingRight: 10,
    paddingLeft :10,
  },

 


});



export default class PartsList extends Component{
    constructor(props){
        super(props);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            newer : stringConstant.carrierConstClass.NEWER,
            dataSource: ds.cloneWithRows(dataResource.PartsListArray),
            fromwhichScreen : "SwipeRightImage",
            rightImage:require('../resources/images/More.png'),
            carrierSalesDetails : dataResource.CarrierSalesDetails,

        }
    }

render(){

    if(Platform.OS === 'ios'){
        if(isItiPad){ //ipad
          this.rightOpenValueAsPerDevice = -640;
        }
        else if(isItiPhone5S){ //iPhone 5s,5c
          this.rightOpenValueAsPerDevice = -255;
        }
        else if(isItiPhone6S){ //iPhone 6S plus // 410          
          this.rightOpenValueAsPerDevice = -320;
        }
    }
    else if(Platform.OS === 'android'){
        if(isIt7InchTablet){ //Android7"tablet           
          this.rightOpenValueAsPerDevice = -500;
        } 
        else if(isIt10InchTablet){ //Android10"tablet // 800          
          this.rightOpenValueAsPerDevice = -680;
        }    
        else if(isItAndroidPhone){ //Androidphone        
          this.rightOpenValueAsPerDevice = -280;
        }

    }

    return(
        <View style = {styles.container}> 
{/* Creating list view and populating cell using rendrRow method*/}
            <View style={styles.listTopView}>
                  <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.dataSource}
                    
                    renderRow={(rowData,sectionId, rowId) => 
                      <View style={styles.rowView}>
                          
                          <SwipeRow                     
                            rightOpenValue= {this.rightOpenValueAsPerDevice}                               
                            disableRightSwipe = {true}
                            modalDidOpen={() => console.log('modal did open')}
                            swipeLeftSet={(rightOpenValue) =>  {{this.rightOpenValueAsPerDevice}}}  >

                            <View style={styles.swipeableRowBack}>
                                <TouchableOpacity onPress = {this.callToOrderForParts}>
                                <View style ={{flexDirection : "column",marginLeft : 40}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/Call.png')}/>
                                    <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style ={[globalStyles.globalBtnTextViewStyle,{paddingLeft : 10,paddingTop : 2,}]}>Call to Order</Text>
                                </View>
                                </TouchableOpacity >

                                <TouchableOpacity onPress={() => this.setState({open: true})}> 
                                <View style ={{flexDirection : "column",}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/SavePart.png')}/>
                                    <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Save Part</Text>
                                </View>
                                </TouchableOpacity >

                                <TouchableOpacity onPress={this.moveToAlternateParts}> 
                                <View style ={{flexDirection : "column",}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/AlternativePart.png')}/>
                                    <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Alternate Parts</Text>
                                </View>
                                </TouchableOpacity >   
                            </View>


                    <View style={styles.swipeableRowFront}>
                        <CellView
                           title={rowData["title"]}
                            subTitle={rowData["subTitle"]}
                            leftImage={rowData["leftImage"]}
                            rightImage= {this.state.rightImage}
                            toBePopulatedOn = {this.state.fromwhichScreen}/>
                        </View>
                    
                    </SwipeRow>
                </View>
                    } 
                  />
                </View>

                {/* End Listview */}
        </View>
        );
    }

/*
    Action implementation for Alternate parts button
*/
moveToAlternateParts = () => {
    this.props.navigator.push({
        name:'AlternativeParts',
        title:'Alternative Parts',
        isHidden:false     
    });
}

/*
    Action implementation for Call to Order
*/

callToOrderForParts = () => {    
    let phoneNo = "";

    let pinCodeAsPerCurrentLatLong = "12110"; //or pinCodeAsPerUserRegisteredAddress
    let carrierSalesDetails = this.state.carrierSalesDetails;

    for(let i in carrierSalesDetails){
        if(carrierSalesDetails[i].Address.pinCode === pinCodeAsPerCurrentLatLong){
            phoneNo = carrierSalesDetails[i].Address.phoneNumber;
       }    
    }
    if(typeof phoneNo !== "string" || phoneNo.trim().length >10 || phoneNo === "") {
      console.log('the phone number must be provided as a String value');
      alert('the phone number must be provided as a String value');
      return;
    }    
    let url;

    if(Platform.OS !== 'android') {
      url = 'telprompt:' ;
    }
    else {
      url = 'tel:';
    }
    url += phoneNo;
    this.launchURL(url);
}

/*
 Method is use to launch phone call screen 
 @Param: url (String which has valid phone number)
 @return: null
*/
launchURL = (url) => {
    console.log("launchURL..."+url)
    Linking.canOpenURL(url).then(supported => 
    {
      if(!supported) {
        console.log('Can\'t handle url: ' + url);
      } 
      else {
        Linking.openURL(url)
        .catch(err => {
          if(url.includes('telprompt')) {
            console.log(err);
          } 
          else {
            console.warn('openURL error', err);
          }
        });
      }
    }).catch(err => console.warn('An unexpected error happened', err));
  }



}


