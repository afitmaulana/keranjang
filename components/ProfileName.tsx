import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  name: string;
}

const ProfileName: React.FC<Props> = ({name}) => {
  return (
    <View>
      <Text>Nama saya adalah {name}</Text>
    </View>
  )
}

export default ProfileName

const styles = StyleSheet.create({})