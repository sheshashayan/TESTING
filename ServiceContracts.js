import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import * as dataResource from './dataResource';
import CellView from "./CellView"; 
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.WARRANTY_DETAILS_PAGE_BACK_BUTTON;

export default class ServiceContracts extends Component {
 constructor(props) {
	  super(props);
	  this.state = {
        backArrow : "<",
    	};
	  };
    
  render() {
    return (
     
             <View  style = {[styles.container]} >

          <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToWarrantyPage }  > 
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View>

         <ScrollView>  
          <View   style = {styles.upperContainer}>
        
            <View style = {{ paddingLeft:20,backgroundColor:'#6A6A6A'}}>
            <Text style= {{color : "#FFFFFF", paddingRight : 20, fontSize:12, fontWeight:'bold', fontFamily : "Montserrat", }}>Claim#12344</Text>
            </View>


            <View style = {{ flexDirection : "column",paddingTop : 10,}}>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Contract Number:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:64}]}>KY2327676389</Text>
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                  <Text style= {styles.textStyleLeft}>Provider Name:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:78}]}>MAESER MASTER SERVICES LLC</Text>
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>3rd Party Contract Number:</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:4}]}>123245687</Text>            
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row", backgroundColor:'#CACACA' }}>
                    <Text style= {styles.textStyleLeft}>Plan Number:</Text> 
                    <Text style= {[styles.textStyleRight, {paddingLeft:90}]}>7457567567567</Text>                
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>Plan Type:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:110}]}>Labor contract-For detailed coverage information or other questions regarding this optional contract</Text>
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row", backgroundColor:'#CACACA' }}>
                    <Text style= {styles.textStyleLeft}>Coverage Start:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:75}]}>15/03/2017</Text>
                </View>

                <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>Coverage End:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:79}]}>15/03/2017</Text>
                </View>
            </View>
        </View>
      </ScrollView>
    </View>  
   
    
    );
  }

   backToWarrantyPage = () => {
      this.props.navigator.pop();
  }
 
}

const styles = StyleSheet.create({
  container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop : 64,
    },
  upperContainer: {
    flexDirection : "column",  
    paddingTop: 10,
    paddingBottom: 10,
  },
   backToFilterBasesView : {
    paddingTop: 10, 
    paddingLeft:5, 
    height : 50,
  },
  filterOptionsView : {
  alignSelf : "stretch", 
  paddingTop: 20, 
  paddingLeft:10, 
  flex : 18 ,  
  flexDirection : "column", 
  justifyContent : "flex-start", 
  alignItems : "flex-start",
},
backToFilterBaseTxtStyle : {
    color : "#429BE4", 
    fontFamily : "Droid Serif", 
    paddingLeft : 5, 
    fontStyle : 'italic', 
    fontWeight : '100', 
    fontSize : 12, 
    paddingTop: 10
  },
  backToCrossRefStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
    marginTop :0, 
    marginLeft: 0 
  },
  listNav: {
    flex:5,
  },
  rowView : {
    paddingTop: 2, 
    paddingBottom: 5,   
    paddingLeft: 5,
    paddingRight: 5,
    height: 80, 
  },
  textStyleLeft:{
    color : "#6A6A6A", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:10,
  },
  textStyleRight:{
    color : "#000000", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:9,
    flex:1,
    textAlign:'left',
  },



});