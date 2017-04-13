import React, { Component } from 'react';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import renderIf from './renderif';
import GlobalLiterature from './GlobalLiterature';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
    Animated,
    TouchableWithoutFeedback,
    Text,
    View,
    LayoutAnimation,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Platform,
} from 'react-native';

import * as dataResource from './dataResource';
const { width, height } = Dimensions.get('window');
const kUserDetailViewHeight = 100;
const kLogOutVeiwHeight = 75;
const kIOSTopBottomPadding = 30
const kAndroidTopBottomPadding = 10
const kTopPadding = (Platform.OS === 'ios' ? kIOSTopBottomPadding : kAndroidTopBottomPadding)

const closeIcon = (<Icon name="close" style={[globalStyles.headerTxt3,{color:"#F6F6F6"}]}  color="#ffffff" />)

let singletonObj = null;

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dataResource.Setting_Menu_List),
      logoutText:''
    };

    if(!singletonObj){
      singletonObj = this;
    }
    return singletonObj;
  }


  CallLogOut =() =>{

    this.props.sideMenuAction();
    this.props.navigator.immediatelyResetRouteStack(
        [{
         name:'HvacPartnersLogin',
         title:'HvacPartnersLogin',
         isHidden:true 
        }] );
  }

globalNavFromSideMenu =(id) =>{

  this.props.sideMenuAction();
  const currentRoutes = this.props.navigator.state.routeStack;
  var currViewName = currentRoutes[currentRoutes.length-1].name;
  switch(id){
      
      case 'Home':

        //alert("Developement is in progress for "+id);
        
        if(currViewName === 'MainSearchView'){
          return;
        }
        this.props.navigator.push({
            name:'MainSearchView',
            title:'Search for a Product',
            isHidden:false 
          });
        
        

        break;

      case 'PartsAndJobs':
      if(currViewName === 'PartsandJobs'){
          return;
        }
       this.props.navigator.push(
        {
          name:'PartsandJobs',
          title:'Parts & Jobs',
          isHidden:false 
        });

        break; 
        case 'TechSalesLiterature':
        if(currViewName === 'GlobalLiterature'){
          return;
        }
        this.props.navigator.push(
        {
         name:'GlobalLiterature',
         title:'Literature',
         isHidden:false 
        } );GlobalLiterature

        break; 
        case 'UsersSettings':
        alert("Developement is in progress for "+id);
       /* this.props.navigator.push(
        {
         name:'ProductCrossReference',
         title:'Product CrossReference',
         isHidden:false 
        } );*/

        break;      
    }


  }
  
  setupLogoutBtnText(text){
    this.setState({logoutText:text})
  }

  render() {
    var windowWidth=Dimensions.get('window').width;

    return (
      <View  style={[this.props.style, {flexDirection : 'row',flex:1}]}>
        
        <View style={{flex:windowWidth>600?1:3, backgroundColor:'#06273F'}} >

          <View style={{flexDirection : 'column', marginLeft:10,paddingTop:kTopPadding }}>
            
            <View style={{ height:kUserDetailViewHeight,backgroundColor:'transparent', borderBottomColor: "white", borderBottomWidth:2, marginRight:10}}>
              <View style={{ flexDirection : 'row', height:40}}>
              {renderIf(!this.props.isMenuOPened)(
                  <Text style={[globalStyles.headerTxt3,{flex:1,justifyContent: 'center',color:"#F6F6F6",paddingLeft: 10,}]}>{dataResource.userDetails["Name"]}</Text>
                )}
              {renderIf(!this.props.isMenuOPened)(
                   <TouchableOpacity style={styles.crossButton} onPress={this.props.sideMenuAction}>
                    {closeIcon}
                  </TouchableOpacity>
              )}
              </View>
              
               <View style={{height:60,justifyContent: 'flex-end',backgroundColor:'transparent',paddingTop: 0,paddingBottom: 10,paddingLeft: 10,}}>
                <Text style={[globalStyles.subordinateTxt,{flex:0, color:"#C6C6C6", fontStyle: 'normal'}]}>{dataResource.userDetails["Company"]}</Text>
                <Text style={[globalStyles.subordinateTxt,{flex:0, color:"#C6C6C6", fontStyle: 'normal'}]}>{dataResource.userDetails["email"]}</Text>
                <Text style={[globalStyles.subordinateTxt,{flex:0, color:"#C6C6C6", fontStyle: 'normal'}]}>{dataResource.userDetails["phone"]}</Text>
              </View>

            </View>
            
            <View style={{height:height-(kUserDetailViewHeight+kLogOutVeiwHeight+kIOSTopBottomPadding)}}>
              
              <ListView
                scrollEnabled = { false }
                dataSource={this.state.dataSource}
                renderRow={(rowData) => 

                  <TouchableOpacity style={{flex:1}} onPress={() => this.globalNavFromSideMenu(rowData["Id"])}>  
                      <View style={{height:40,alignItems: 'center',flexDirection : 'row',paddingLeft: 0,}}>
                        
                          <Image
                            style={{marginRight:10,width: 19,height: 18,}}
                            source={rowData["Icon"]}/>
                          <Text style={[globalStyles.headerTxt4,{color:"#F6F6F6"}]}>{rowData["Name"]}</Text>
                         
                      </View>
                  </TouchableOpacity> 
              }/>
            
            </View>

            <View style={{borderBottomColor: "white", borderBottomWidth:2, marginRight:10}}>
              </View>
                 <TouchableOpacity style={{height:kLogOutVeiwHeight,justifyContent: 'center', backgroundColor:'transparent'}} onPress={() => this.CallLogOut()}> 
                  <Text style={[globalStyles.headerTxt4,{color:"#F6F6F6",marginBottom: 20}]}>{this.state.logoutText}</Text>
                </TouchableOpacity>
          
          </View>
        
        </View>
        
        <TouchableOpacity style={{flex:windowWidth/3>300?3:1}} onPress= {this.props.sideMenuAction}>
        
          <View style={{flex:1}} />
        
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
   fullScreen: {
        position: 'absolute',
        width: 100,
        height:400,
        top: 0,
        left: 0,
    },
    floatView: {
        position: 'absolute',
        width: 100,
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
    },
     crossButton: {
      flex:1, 
      alignItems: 'flex-end',
    }
});