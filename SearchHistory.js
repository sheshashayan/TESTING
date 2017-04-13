/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

const sections = {
  SERVICES: {
    data: [
     {
      title : "Item N4H336GKF200",
      subTitle : 'Heat Pump',
      modelNo : 'N4H336GKF200',
      serialNo :'E143120170',
      },
      {
      title : "item2 25VNA824A0030050",
      subTitle : 'Heat Pump',
      modelNo : '25VNA824A0030050',
      serialNo :'0000E00000',
      },
      {
      title : "Item3 24ACB360A0031010 ",
      subTitle : 'Heat Pump',
      modelNo : '24ACB360A0031010',
      serialNo :'4011E11111',
      },
      {
      title : "Item5 25VNA824A0030050",
      subTitle : 'Heat Pump',
      modelNo : '25VNA824A0030050',
      serialNo :'0000E00001',
      },
      {
      title : "Item6 24APA524A310",
      subTitle : 'Heat Pump',
      modelNo : '24APA524A310',
      serialNo :'12345678',
      },
      {
      title : "Item6 N4H336GKF200",
      subTitle : 'Heat Pump',
      modelNo : 'N4H336GKF200',
      serialNo :'Prakash',
      },
      {
      title : "Item7 25VNA824A300",
      subTitle : 'Heat Pump',
      modelNo : '000000E000',
      serialNo :'0000E00000',
      },
      {
      title : "Item8 24ACB360A310",
      subTitle : 'Heat Pump',
      modelNo : '24ACB360A310',
      serialNo :'4011E11111',
      }
    ]
  }
}

/* Regex and Initial search value reset */
function filterDatasource(text){
  const safe = String(text || '').replace(/([.*^$+?!(){}\[\]\/\\])/g,'\\$1');
  const regex = new RegExp(safe, 'i');
  const filter = (row) => regex.test(row.title) || regex.test(row.modelNo) || regex.test(row.serialNo);
  var out = {};
  for(var sectionID in sections){
    if(!sections.hasOwnProperty(sectionID)){
      continue; 
    }
    out[sectionID] = sections[sectionID].data.filter(filter);
  }
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
  });
  return ds.cloneWithRowsAndSections(out)
}

const onSubmitClickSearchFromServer = (pObjSearch,lSearchedString) => {
  console.log(lSearchedString);
  if(lSearchedString){
    AsyncStorage.getItem("myKey6").then((value) => {
      if(value){
        var lTempArray = JSON.parse(value);
        var lArraylen = lTempArray.length;
        let isAlreadyExist = lTempArray.indexOf(lSearchedString)
        if(isAlreadyExist !== -1){
          return;
        }
        if(lArraylen === 9){
          lTempArray.pop();
        }
        lTempArray.unshift(lSearchedString);
        AsyncStorage.setItem("myKey6", JSON.stringify(lTempArray));            
      }
      else{
        var lTempArray = [];
        lTempArray.unshift(lSearchedString);
        AsyncStorage.setItem("myKey6", JSON.stringify(lTempArray));           
      }
    }).done()  
    var lSearchedData = filterDatasource(lSearchedString)
    console.log(lSearchedData)
    pObjSearch.setState({willShowHistoryListView:false})
    pObjSearch.setState({dataSourceSearch: lSearchedData})
    pObjSearch.setState({willShowSearchResult:true})
  }      
}
const onChangeTextSearchHistory = (pObjSearch,searchText) => {
  AsyncStorage.getItem("myKey6").then((value) => {
    if(searchText)
    {
      if(value)
      {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var lTempArray = JSON.parse(value);
        var ltempSegArray = [];
        for(var index = 0; index < lTempArray.length; index++){
          console.log(lTempArray[index])
          if(lTempArray[index].indexOf(searchText) >= 0){
            ltempSegArray.push(lTempArray[index]);
          }
        }
        pObjSearch.setState({dataSourceSearch: ds.cloneWithRows(ltempSegArray)})
        pObjSearch.setState({willShowSearchResult:false})
        pObjSearch.setState({willShowHistoryListView:false})
        if(ltempSegArray.length)
        pObjSearch.setState({willShowHistoryListView:true})
      } 
    }
    else
    {
      pObjSearch.setState({willShowSearchResult:false})
      pObjSearch.setState({willShowHistoryListView:false})
    }
  }).done()
}
const saveData = (value) =>{
  AsyncStorage.setItem("myKey6", value);
  this.setState({"myKey6": value});
} 

module.exports = {
  onSubmitClickSearchFromServer,
  onChangeTextSearchHistory
}

