import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

interface props {
  image: string;
}

const ProfileImage: React.FC<props> = ({image}) => {
  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    </View>
  )
}

export default ProfileImage;

const styles = StyleSheet.create({});
