import {Card} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import React, {FunctionComponent} from 'react';
import {GestureResponderEvent, ViewProps} from 'react-native';

interface ICard {
  header?: RenderProp<ViewProps> | undefined;
  footer?: RenderProp<ViewProps> | undefined;
  children: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const MyCard: FunctionComponent<ICard> = ({
  header,
  footer,
  children,
  onPress,
}) => {
  return (
    <Card header={header} footer={footer} onPress={onPress}>
      {children}
    </Card>
  );
};

export default MyCard;
