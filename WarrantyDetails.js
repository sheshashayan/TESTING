
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


export default class WarrantyDetails extends Component {
 constructor(props) {
	  super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});	  
      this.state = {
         isItFilterBasesResults : "FilterBasesResults",
         dataSource : ds.cloneWithRows(dataResource.listItemData.Warranty_Page_List),        
    	};
	  };
    
  render() {
    return (
      /*new view */
      <View  style = {[styles.container]} >

          <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToWarrantyPage }  > 
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View>

         <ScrollView>  
        <View style = {styles.upperContainer}>
          <View style = {{  paddingLeft:20}}>
            <Text style= {{color : "#06273F", paddingRight : 20, fontSize:18, fontWeight:'bold', fontFamily : "Montserrat", }}>Enhanced Warranty Parts</Text>            
          </View>          
          <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Application Type:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:30}]}>Owner Occupied Residential</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Org.Equip.Owner:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:28}]}>Original</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Warranty Length:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:31}]}>10 Years</Text>            
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Installed After:</Text> 
                  <Text style= {[styles.textStyleRight, {paddingLeft:47}]}>3/13/2017</Text>                
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Warranty Start:</Text>  
                  <Text style= {[styles.textStyleRight, {paddingLeft:45}]}>3/16/2017</Text>
              </View>
          </View>            
                
       <View style = {{  paddingLeft:20, marginTop:10}}>
            <Text style= {{color : "#06273F", paddingRight : 20, fontSize:18, fontWeight:'bold', fontFamily : "Montserrat", }}>Enhanced Exchange Warranty Parts</Text>
        </View>

           <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Application Type:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:30}]}>Owner Occupied Residential</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Org.Equip.Owner:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:28}]}>Original</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Warranty Length:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:31}]}>10 Years</Text>            
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Installed After:</Text> 
                  <Text style= {[styles.textStyleRight, {paddingLeft:47}]}>3/13/2017</Text>                
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Warranty Start:</Text>  
                  <Text style= {[styles.textStyleRight, {paddingLeft:45}]}>3/16/2017</Text>
              </View>
          </View>             
      
      </View>
</ScrollView>
    </View>  
   
/*new view */
    );
  }

   backToWarrantyPage = () => {
      this.props.navigator.pop();
  }


}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    flexDirection : "column",
    justifyContent : "flex-start",
    backgroundColor : "#F6F6F6",
    paddingTop: 64, 
  },
  upperContainer: {
    flexDirection : "column",  
    paddingTop: 10,
    paddingBottom: 10,
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
    color : "#CACACA", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:10,
    flex:1,
    textAlign:'left',
  },
  backNavBtnStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
    
  },




});