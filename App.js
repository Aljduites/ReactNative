import React from 'react';
import { Dimensions,Platform,Text,Animated, View, TextInput,TouchableOpacity, 
  Button, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './assets/styles';
const img = require('./assets/Images/logo.png');
const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  /* Constructor and functions */
  constructor(props){
    super(props);
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );

    this._focusNextField = this._focusNextField.bind(this);
    this.state = {
      text_1: "Input email address",
      text_2:"Input password", 
      errorTxtStyle: { width:250, fontStyle:'italic', fontSize: 14 ,color: '#FF0000'},
      btnStatus: false,
      isHiddenEmail: false,
      isHiddenPassword: false 
    };

    this.inputs = {};

    this.inputBoxs = new Animated.Value(50);
    this.imageHeight = new Animated.Value(400);
  }

  _focusNextField(key){
    this.inputs[key].focus();
  }

  _handleTextInput(ev){

    this.setState({ placeholder: ev.nativeEvent.text.length == 0});
  }
  _onSignIn = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState(() => 
    regex.test(this.email) === false ? {isHiddenEmail: true, btnStatus: true } : {isHiddenEmail: false, btnStatus: true});
    
    this.setState(() =>
    typeof(this.password) !== 'undefined' && this.password.length > 5 && this.password.length < 13 
    ? {isHiddenPassword: false,btnStatus: false} : {isHiddenPassword: true,btnStatus: true});
    

    if(regex.test(this.email) === true && (typeof(this.password) !== 'undefined' && this.password.length > 5 && this.password.length < 13))
    {
      Alert.alert("Message","Login Successful.");
    }

  }
  /* Function use to adjust textinput and image if keyboard appears */
  componentWillMount(){
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this._keyShow);
    this.keyboardWillHideSub  = Keyboard.addListener('keyboardWillHide', this._keyHide);
  }
  componentWillUnmount(){
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  _keyShow = (event) => {
    Animated.parallel([
      Animated.timing(this.imageHeight,{
        duration: event.duration,
        toValue: Platform.OS === 'ios' ? 100 : 50
      }),
      Animated.timing(this.inputBoxs,{
        duration: event.duration,
        toValue: Platform.OS === 'ios' ? -60 : 0
      })
    ]).start();
  };

  _keyHide = (event) => {
    Animated.parallel([
      Animated.timing(this.imageHeight,{
        duration: event.duration,
        toValue: 400
      }),
      Animated.timing(this.inputBoxs,{
        duration: event.duration,
        toValue: 50
      })
    ]).start();
  };
  /* End Constructor and functions */

  /*------------ RENDER ---------------*/

  render() {

    const { text_1, text_2, errorTxtStyle, 
      btnStatus, isHiddenEmail, isHiddenPassword } = this.state

    return (
      
      <KeyboardAvoidingView
      style={[styles.container]}
      behavior="padding">

        <KeyboardAwareScrollView 
        style={{backgroundColor: "#ffffff"}}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={[styles.container]}
        scrollEnabled={false}>

        <View style={styles.innerContainer}>

        <Animated.Image
        source={img}
        resizeMode="contain"
        style={[styles.imageStyle,{height:this.imageHeight}]} />

          <Animated.View style={[styles.textContainer, {bottom: this.inputBoxs}]}>

            <View style={[styles.viewStyle]}>
            <Text>
              Email
            </Text>

              <TextInput
              resizeMode="stretch"
              placeholder={ text_1 }
              placeholderTextColor={this._handleTextInput ? "#D3D3D3": "#000000"}
              style={ this._handleTextInput ? [styles.textBox,{ fontStyle: 'italic'}]: [styles.textBox, { fontStyle: 'normal' }]}
              returnKeyType={"next"} onSubmitEditing={() => {this._focusNextField('done')}}
              ref={input => {this.inputs['next'] = input}}
              onChangeText={(text) => this.email = text}
              onFocus={() => {this.setState({btnStatus:false})}}
              underlineColorAndroid='transparent' />
              
            </View>
            { isHiddenEmail &&
              <Text style={errorTxtStyle}>
              Not correct format for email address
              </Text>
            }

            <View style={[styles.viewStyle]}>
            <Text>
              Password
            </Text>
              <TextInput 
              secureTextEntry={true}
              placeholder={text_2} 
              placeholderTextColor={this._handleTextInput ? "#D3D3D3": "#000000"}
              style={ this._handleTextInput ? [styles.textBox,{ fontStyle: 'italic'}]: [styles.textBox, { fontStyle: 'normal' }]}
              returnKeyType={"done"} ref={input => {this.inputs['done'] = input}} 
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.password = text}
              onFocus={() => {this.setState({btnStatus:false})}} />

            </View>

            { isHiddenPassword &&
            <Text style={errorTxtStyle}>
            Please use at least 6 - 12 characters
            </Text>
            }

            <TouchableOpacity style={styles.btnStyle}
            disabled={btnStatus}>

            <Button title="Sign In" 
            onPress={this._onSignIn} 
            color="#0000FF"
            disabled={btnStatus} />
            
            </TouchableOpacity>


        </Animated.View>
      </View>
      </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      

    );
  }
}

