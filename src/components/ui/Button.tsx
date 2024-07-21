import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

interface IButton extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  color?: string;
}

function Button({ children, textStyle, isLoading = false, ...props }: IButton) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      disabled={isLoading || props.disabled}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 48,
          paddingVertical: 16,
          borderRadius: 10,
          backgroundColor: 'blue',
        },
        props.style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} animating={true} color={'white'} />
      ) : (
        <>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'center',
                color: 'white',
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(Button);
