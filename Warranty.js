
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';
import * as dataResource from './dataResource';
import CellView from "./CellView"; 
import Router from "./Router";
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.WARRANTY_PAGE_BACK_BUTTON;

export default class Warranty extends Component {
 constructor(props) {
	  super(props); 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
        rightImage : require('../resources/images/Next.png'),
        isItFilterBasesResults : "FilterBasesResults",
        dataSource : ds.cloneWithRows(dataResource.listItemData.Warranty_Page_List),
        
    	};   

	  };
      
  render() {
    return (
      <View style = {styles.container} >    
          <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToMainProductPage }  >
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View>
           
        <View style = {{ flex:1, flexDirection : "column",paddingTop : 10,}}>

        <View style = {styles.upperContainer}>

          <View style = {{ height:20, paddingLeft:20}}>
            <Text style= {{color : "#06273F", paddingRight : 20, fontSize:18, fontWeight:'bold', fontFamily : "Montserrat", }}>Entitlement Overview</Text>
            
          </View>


          <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Owner:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:68}]}>Name</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Date Installed:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:25}]}>3/13/2017</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Date Transferred:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:8}]}>N/A</Text>            
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Policy Description:</Text> 
                  <Text style= {[styles.textStyleRight, {paddingLeft:0}]}>For specific coverage on non-registered units installed in owner occupied, non-owner occupied and commercial applications, refer to warranty certificate.</Text>                
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Mark As:</Text>  
                  <Text style= {[styles.textStyleRight, {paddingLeft:60}]}>N/A</Text>
              </View>
          </View>                     
      </View> 



       <View style={styles.listNav}>
          
        <ListView scrollEnabled = { true }
          dataSource={this.state.dataSource}
         renderRow={(rowData,sectionId, rowId) => 
                        <View style={styles.rowView}>
                          <TouchableOpacity style={{flex:1}} onPress={() => this.warrantyDetailsNav(rowData["title"])}>
                          <CellView
                            title={rowData["title"]}
                            rightImage={this.state.rightImage} />
                          </TouchableOpacity >  
                      </View>
                    } 
        />
          </View>
        </View>
   </View>	
    );
  }



  backToMainProductPage = () => {
      this.props.navigator.pop();

  }
   warrantyDetailsNav =(title) => {
   switch(title){      
      case 'Warranty Details':{
        this.props.navigator.push({
            name:'WarrantyDetails',
            title:'Warranty Details',
            isHidden:false 
          });
      }
      break;  

      case 'Service History':{
        this.props.navigator.push({
            name:'ServiceHistory',
            title:'Service History',
            isHidden:false 
          });
      }
      break; 

      case 'Service Contracts':{
        this.props.navigator.push({
            name:'ServiceContracts',
            title:'Service Contracts',
            isHidden:false 
          });
      }
      break;     
    }
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


