import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  useWindowDimensions,
} from 'react-native';
import useRegistry from './hooks/useRegistry';
import useBlink from './hooks/useBlink';
import { useQuery } from '@tanstack/react-query';
import type { ErrorType, TransactionData } from './types/blinks';
import Button from './components/ui/Button';

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

  const { fetchBlink, fetchTransaction, blinkURL } = useBlink();
  const { verifyBlink } = useRegistry();
  const { width } = useWindowDimensions();

  const { data: verified } = useQuery({
    queryKey: ['blinkURL', url],
    queryFn: ({ queryKey }) => verifyBlink(queryKey[1] as string),
  });

  // const { host } = new URL(url);

  const { data: blink, error } = useQuery({
    queryKey: ['url', url],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1] as string),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePress = async (link: string) => {
    try {
      const result = await fetchTransaction(link, account);
      if (props.onTransaction) {
        props.onTransaction(result);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const mergedStyles = StyleSheet.flatten([styles, styling]);

  if (error || !blink) {
    return <Text style={styles.error}>Please add valid blink url</Text>;
  }

  const actionsWithoutParameters =
    blink.links?.actions.filter(
      (action) => !action.hasOwnProperty('parameters')
    ).length || 0;

  return (
    <View style={mergedStyles.container}>
      <Image
        source={{ uri: blink?.icon }}
        style={{
          width: '100%',
          height: width / 1.1,
          borderRadius: 10,
        }}
      />
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
          {new URL(blinkURL).hostname}
        </Text>
      </TouchableOpacity>
      <Text style={mergedStyles.title}>{blink?.title}</Text>
      <Text style={mergedStyles.description}>{blink?.description}</Text>
      {blink?.links ? (
        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginTop: 16,
            }}
          >
            {blink?.links?.actions.map((action, index) => {
              if (!action.parameters) {
                return (
                  <Button
                    key={index}
                    style={[
                      styles.button,
                      {
                        width:
                          actionsWithoutParameters % 2 === 0
                            ? '48%'
                            : index === actionsWithoutParameters - 1
                              ? '100%'
                              : '48%',
                      },
                    ]}
                    onPress={() => {
                      const { host } = new URL(blinkURL);
                      handlePress('https://' + host + action.href);
                    }}
                  >
                    {action.label}
                  </Button>
                );
              }
              return null;
            })}
          </View>
          {blink?.links.actions.map((action, index) => {
            if (action.parameters) {
              return (
                <View key={index}>
                  {action.parameters &&
                    action.parameters.map((param, index) => (
                      <TextInput
                        key={index}
                        onChangeText={(value) =>
                          handleInputChange(param.name, value)
                        }
                        placeholder={param.name}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          backgroundColor: '#D3D3D3',
                          borderRadius: 8,
                          marginBottom: 12,
                        }}
                        value={inputValues[param.name] || ''}
                      />
                    ))}
                  <Button
                    style={{
                      width: '100%',
                    }}
                    onPress={() => {
                      const { host } = new URL(blinkURL);
                      let actionUrl = action.href;
                      action?.parameters?.forEach((param) => {
                        const value = inputValues[param.name] || '';
                        actionUrl = actionUrl.replace(`{${param.name}}`, value);
                      });
                      handlePress('https://' + host + actionUrl);
                    }}
                  >
                    {action.label}
                  </Button>
                </View>
              );
            }
            return null;
          })}
        </View>
      ) : (
        <Button
          style={mergedStyles.button}
          onPress={() => {
            handlePress(url);
          }}
        >
          {blink?.label}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
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
    backgroundColor: 'cyan',
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  button: {
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
    backgroundColor: 'cyan',
  },
});

export default RenderBlink;
