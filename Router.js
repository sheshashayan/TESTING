import React, { Component } from 'react';

import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity,
   Image,
   StatusBar,
   View,
   LayoutAnimation,
   Dimensions,
   Platform
} from 'react-native';

import LoginTypes from "./LoginTypes";
import Splash from "./Splash";
import GuestSignup from "./GuestSignup";
import HvacPartnersLogin from "./HvacPartnersLogin";
import CustomisedPopup from "./CustomisedPopup";
import CrossReference from "./CrossReference";
import MainSearchView from "./MainSearchView";
import ProductCategoryList from "./ProductCategoryList";
import ProductCategory from "./ProductCategory"; 
import ProductPage from "./ProductPage"; 
import ProductCategoryReference from "./ProductCategoryReference";
import ProductCrossReference from "./ProductCrossReference";
import NavBar from "./CustomNavBar";
import {globalStyles, deviceFinder} from "./globalStyles"; 
import SideMenu from "./SideMenu";
import FilterBases from "./FilterBases";
import FilterBasesResults from "./FilterBasesResults";
import SearchLiterature from "./SearchLiterature";
import GlobalLiterature from './GlobalLiterature'; 
import GlobalLiteratureFilters from './GlobalLiteratureFilters';
import CallHvacLogin from './ModServices'
import AlternativeParts from '../containers/AlternativeParts'
import Parts from '../containers/Parts'
import PartsandJobs from './PartsandJobs';
import PartsAndJobsList from './PartsAndJobsList';

import ServiceContracts from './ServiceContracts';
import ServiceHistory from './ServiceHistory'
import Warranty from './Warranty';
import WarrantyDetails from './WarrantyDetails';
import ActivityIndicator from "./ActivityIndicator";

import Icon from 'react-native-vector-icons/FontAwesome';

const hamberger = (<Icon name="reorder" size={25} color="#ffffff" />)
const sideMenuWdth = 50
let headerTitleLeftMargin = Navigator.NavigationBar.Styles.Stages.Left.Title.marginLeft || 0

export default class Router extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = { isMenuOPened: true };
    this.sideMenuAction = this.sideMenuAction.bind(this);
	}

   componentWillMount() {
    // Animate creation
    LayoutAnimation.easeInEaseOut();
  }

  sideMenuAction() {
    // Animate the update
    LayoutAnimation.easeInEaseOut();
    this.setState({isMenuOPened: this.state.isMenuOPened?false:true})
  }
sideMenuAction1(route) {
    // Animate the update
    alert(route.passProps.LogOutText)
    this.setState({LogOutText: route.passProps.LogOutText})
   
    
  }
	render() {
      return (
         <View style={{flex:1}}>
            <StatusBar
               backgroundColor="#06273F"
               barStyle="light-content"
            />
            <Navigator
               initialRoute = {{ name: 'LoginTypes', title: 'Carrier Service Tech', isHidden:true }}
               renderScene = { this.renderScene } 
               ref="navigator"
               navigationBar={
                 <NavBar
                  navigationStyles={Navigator.NavigationBar.StylesIOS}
                     routeMapper={{
                        LeftButton: (route, navigator, index, navState) =>
                           { 
                              return (
                                  <TouchableOpacity onPress= {this.sideMenuAction} style={styles.sideMenuContainer}>
                                        {hamberger}
                                  </TouchableOpacity>
                                 ); 
                           },
                        RightButton: (route, navigator, index, navState) =>
                          { 
                              return (<Text style={styles.sideMenuRightContainer}></Text>);  
                           },
                        Title: (route, navigator, index, navState) =>
                          { 
                              return ( 
                                    <View style={styles.navHeaderTitleContainer}>
                                          <Text style={[globalStyles.headerTxt3,{color:"#F6F6F6"}]}>
                                                {route.title}
                                          </Text>
                                    </View>
                                    ); 
                           },
                     }}
                     style={{backgroundColor:'#06273F',flex:1}}
                 />
               }
            />
            <SideMenu 
               style={[styles.sideMenuView, {width: this.state.isMenuOPened?0:Dimensions.get('window').width, height:Dimensions.get('window').height}]}
               width={this.state.isMenuOPened}
               isMenuOPened={this.state.isMenuOPened}
               sideMenuAction={this.sideMenuAction}
               navigator={this.refs.navigator}
            />
         </View>
      );
   }


   renderScene(route, navigator) {

      let activityIndicator = new ActivityIndicator();
      activityIndicator.deleteObj();
      if(route.name == 'LoginTypes') {
         return (
            <LoginTypes
               navigator = {navigator}
               {...route.passProps} />
         );
      }
      
      if(route.name == 'GuestSignup') {
         return (
            <GuestSignup
               navigator = {navigator}
               {...route.passProps} />
         );
      }


      if(route.name == 'HvacPartnersLogin') {
         return (
            <HvacPartnersLogin
               navigator = {navigator}
               {...route.passProps} />
         );
      }


      if(route.name == 'CustomisedPopup') {
         return (
            <CustomisedPopup
               navigator = {navigator}
               {...route.passProps} />
         );
      }

      if(route.name == 'MainSearchView') {
         return (
            <MainSearchView
               navigator = {navigator}
               {...route.passProps} />
         );
      }

      /*if(route.name == 'ProductCategoryListView') {
         return (
            <ProductCategoryList
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }*/

      if(route.name == 'ProductCategoryReference') {
         return (
            <ProductCategoryReference
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'ProductCrossReference') {
         return (
            <ProductCrossReference
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'FilterBases') {
         return (
            <FilterBases
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'ProductCategoryList') {
         return (
            <ProductCategoryList
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'ProductCategory') {
         return (
            <ProductCategory
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 

       if(route.name == 'FilterBasesResults') {
         return (
            <FilterBasesResults
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'ProductPage') {
         return (
            <ProductPage
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'PartsandJobs') {
         return (
            <PartsandJobs
               navigator = {navigator}
               {...route.passProps} /> 
         );
      }

      if(route.name == 'SearchLiterature') {
         return (
            <SearchLiterature
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'GlobalLiterature') {
         return (
            <GlobalLiterature
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'GlobalLiteratureFilters') {
         return (
            <GlobalLiteratureFilters
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'AlternativeParts') {
         return (
            <AlternativeParts
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'Parts') {
         return (
            <Parts
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'Warranty') {
         return (
            <Warranty
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'WarrantyDetails') {
         return (
            <WarrantyDetails
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'ServiceContracts') {
         return (
            <ServiceContracts
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 
      if(route.name == 'ServiceHistory') {
         return (
            <ServiceHistory
               navigator = {navigator}
               {...route.passProps} /> 
         );
      } 

      
      
   }

}

var styles = StyleSheet.create({
 navHeaderTitleContainer:{
   flex:1,
   marginTop:(Platform.OS === 'ios' ? 0 : 2),
    alignItems: 'center',
    justifyContent:(Platform.OS === 'ios' ? 'center' : null),
 },
 leftImage: {
    marginLeft: 15
  },
  sideMenuView: {
      position: 'absolute',
      width: 100,
      top: 0,
      left: 0,
      backgroundColor: 'transparent',
  },
sideMenuContainer : {
   width:sideMenuWdth,
   flex:1,
    alignItems: 'center',
    justifyContent:(Platform.OS === 'ios' ? 'center' : null),
  },
  sideMenuRightContainer:{
    color:'#ffffff',
    paddingTop: 15, 
    paddingRight: 10,
  }
}); 


   