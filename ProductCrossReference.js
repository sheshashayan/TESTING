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
  StatusBar,
  Alert, 
  ScrollView
  } from 'react-native';

import CellView from "./CellView";  
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import {globalStyles, deviceFinder} from "./globalStyles"; 

const backNavText = stringConstant.carrierConstClass.CROSS_REFERENCE_BACK_BUTTON;

class ProductCrossReference extends Component {

  constructor(props) {
    super(props);   
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        isItCrossRef : "CrossRef",        
        dataSource : ds.cloneWithRows(dataResource.listItemData.Cross_Reference),
        rightImage : require('../resources/images/Next.png'),
        leftImage  : "" 
    };
  }

  render() {
    return (
      <View style = {styles.container}>
          <View style = {[globalStyles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToMainSearch }  >
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View> 

          <View style = {{ backgroundColor : "#F6F6F6", paddingTop:15, justifyContent : "flex-start",alignItems : "flex-start" }}>             
              <Text style = {{alignSelf : "flex-start",marginLeft: 15, color : "#6A6A6A", fontFamily : "Droid Serif", fontStyle : 'italic', fontWeight : '100', fontSize : 12}}>Choose a product type to search cross reference</Text>
          </View>

          <View style = {{ backgroundColor : "#F6F6F6", flex :1, alignSelf : "stretch"}} >
            <View style = {{paddingTop: 10}}>
             <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId, rowId) => 
                      <View style={styles.rowView}>
                        <TouchableOpacity style={{flex:1}} onPress={() => this.productCrossRefNav(rowData["title"])}>                         
                          <CellView
                            title={rowData["title"]}
                            subTitle={rowData["subTitle"]}
                            leftImage={rowData["leftImage"]}
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

  productCrossRefNav =(title) => {    
    switch(title){      
      case 'Filter Bases':
        {
        this.props.navigator.push({
         name:'FilterBases',
          title:'Filter Bases',
          isHidden:false      
        });
      }
      break;          
    }
  }

  backToMainSearch = () => {
    this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : "column",
    justifyContent : "flex-start",
    alignItems: 'flex-start',
    backgroundColor : "#F6F6F6",
    paddingTop: 64, 
  },
  navBackImage : {
    width : 10,
    height : 10,
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


export default ProductCrossReference;