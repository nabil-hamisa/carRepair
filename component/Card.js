import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {

    shadowColor: '#fd8228',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: '#3c3c3c',
    margin:'2%',
    flexDirection:'row',
  }
});
export default Card;
