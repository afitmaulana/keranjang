import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileImage from './ProfileImage';
import ProfileName from './ProfileName';

interface Props {
    name: string;
    image?: string;
}

const Profile: React.FC<Props> = ({name, image}) => {
  return (
    <View>
      <ProfileImage image={image ? image : ''} />
      <ProfileName name={name} />
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({});