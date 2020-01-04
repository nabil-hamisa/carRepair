import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
    <TextInput
        {...props}
        style={[styles.input, props.style, props.touched && !props.valid  ? styles.invalid :null]}
    />
);

const styles = StyleSheet.create({
  input: {

    fontSize: 15,
    borderRadius: 8,
    backgroundColor: '#999999',
    borderBottomColor: '#fd8228',
    borderBottomWidth: 2,
    borderLeftColor: '#fd8228',
    borderLeftWidth: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  invalid: {
    fontSize: 15,
    borderRadius: 8,
    backgroundColor: "#f9c0c0",
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderLeftColor: '#fd8228',
    borderLeftWidth: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,

  }
});

export default defaultInput;
