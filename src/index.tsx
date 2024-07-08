import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import useRegistry from './hooks/useRegistry';
import useBlink from './hooks/useBlink';
import { useQuery } from '@tanstack/react-query';
import type { ErrorType, TransactionData } from './types/blinks';

interface Styles {
  container?: ViewStyle;
  textInput?: ViewStyle | TextStyle;
  image?: ImageStyle;
  title?: TextStyle;
  message?: TextStyle;
  description?: TextStyle;
  link?: TextStyle;
  action?: ViewStyle;
  actionLabel?: TextStyle;
  parameter?: ViewStyle | TextStyle;
  parameterLabel?: TextStyle;
  error?: TextStyle;
  transaction?: ViewStyle;
  transactionLabel?: TextStyle;
  verified?: TextStyle;
  unverified?: TextStyle;
  buttonContainer?: ViewStyle;
  box?: ViewStyle;
  button?: ViewStyle;
  buttonText?: TextStyle;
  inputContainer?: ViewStyle;
}

interface Props {
  url: string;
  account: string;
  onTransaction: (result: TransactionData | ErrorType) => void;
  verified?: boolean;
  styling?: Styles;
}

export function RenderBlink(props: Props) {
  const { url, account, styling } = props;
  const { host } = new URL(url);
  const { fetchBlink, fetchTransaction } = useBlink();
  const { verifyBlink } = useRegistry();
  const { data: blink, error } = useQuery({
    queryKey: ['url', url],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1] as string),
  });
  const { data: verified } = useQuery({
    queryKey: ['blinkURL', url],
    queryFn: ({ queryKey }) => verifyBlink(queryKey[1] as string),
  });
  if (error) {
    return;
  }

  const handlePress = async () => {
    try {
      const result = await fetchTransaction(url, account);
      if (props.onTransaction) {
        props.onTransaction(result);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const mergedStyles = StyleSheet.flatten([styles, styling]);

  return (
    <View style={mergedStyles.container}>
      <Image source={{ uri: blink?.icon }} style={mergedStyles.image} />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            color: verified
              ? mergedStyles?.verified?.color
              : mergedStyles?.unverified?.color,
          }}
        >
          {host}
        </Text>
      </TouchableOpacity>
      <Text style={mergedStyles.title}>{blink?.title}</Text>
      <Text style={mergedStyles.description}>{blink?.description}</Text>

      {blink?.links ? (
        <View style={mergedStyles.buttonContainer}>
          {blink?.links?.actions.map((action, index) => (
            <View key={index} style={mergedStyles.box}>
              {!action.parameters ? (
                <TouchableOpacity
                  style={mergedStyles.button}
                  onPress={async () => {
                    handlePress();
                  }}
                >
                  <Text style={mergedStyles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
              ) : (
                <View style={mergedStyles.inputContainer}>
                  <TextInput
                    onChange={(e) => {
                      console.log(e.nativeEvent.text);
                    }}
                    placeholder={action.parameters[0]?.name}
                    style={mergedStyles.textInput}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.box}>
          <TouchableOpacity
            style={mergedStyles.button}
            onPress={async () => {
              handlePress();
            }}
          >
            <Text style={mergedStyles.buttonText}>{blink?.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  textInput: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 5,
    width: '100%',
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 15,
  },
  title: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: 'gray-50',
  },
  link: {
    paddingTop: 10,
    color: 'gray',
  },
  action: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 5,
  },
  actionLabel: {
    fontSize: 16,
  },
  parameter: {
    padding: 5,
    backgroundColor: '#d0d0d0',
    borderRadius: 5,
    margin: 5,
  },
  parameterLabel: {
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
  transaction: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 5,
  },
  transactionLabel: {
    fontSize: 16,
  },
  verified: {
    color: 'green',
  },
  unverified: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    width: '48%',
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
});

export default RenderBlink;
