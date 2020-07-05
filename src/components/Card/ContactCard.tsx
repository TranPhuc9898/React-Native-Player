import {Avatar, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: string;
  title: string;
  subTitle: string;
  description: string;
  topRightIcon?: React.ReactNode;
  onPress?: () => void;
}

const ContactCard: React.FC<IProps> = ({
  containerStyle,
  image,
  title,
  subTitle,
  topRightIcon,
  description,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Avatar size="large" source={{uri: image}} />
      <View style={styles.info}>
        <Text category="h4">{title}</Text>
        <Text category="s1">{subTitle}</Text>
        <Text category="c1">{description}</Text>
      </View>
      {topRightIcon ? (
        <View style={styles.topRightIcon}>{topRightIcon}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 8,
    padding: 8,
  },
  info: {
    flexDirection: 'column',
    marginLeft: 8,
    marginRight: 8,
    flexShrink: 1,
  },
  topRightIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default ContactCard;
