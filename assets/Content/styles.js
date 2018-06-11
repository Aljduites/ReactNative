import {  Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
const scr = Dimensions.get('screen');
console.log(scr);
export default styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  imageStyle: {
    height: 400,
    width: 250,
    marginTop:-180
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop:-40,
    maxHeight: 80,
    maxWidth: 130,
    position:'relative',
    bottom: 50
  },
  viewStyle:{
      width: width == 320 ? 250 : width == 360 ? 270 : 250,
      height: 70
  },
  textBox: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    fontSize: 16,
    borderColor: '#0000FF',
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderRadius: 10,
    height: 60,
    marginBottom: 10,
    padding: 8
  },
  btnStyle:{
    position:'relative',
    top:20,
    width: width == 320 ? 250 : width == 360 ? 270 : 250
  }
});
