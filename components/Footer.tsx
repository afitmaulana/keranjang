import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  name: string;
}

const Footer: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <Text>Footer Name: {name}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
