import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Button from './components/ui/Button';
import useBlink from './hooks/useBlink';
import useRegistry from './hooks/useRegistry';
import type { BlinkProps } from './types';

export function Blink(props: BlinkProps) {
  const { url, account, styles } = props;
  const { fetchBlink, fetchTransaction, blinkURL } = useBlink();
  const { verifyBlink } = useRegistry();
  const { width } = useWindowDimensions();

  const { data: verified } = useQuery({
    queryKey: ['blinkURL', url],
    queryFn: ({ queryKey }) => verifyBlink(queryKey[1] as string),
  });

  const { data: blink, error } = useQuery({
    queryKey: ['url', url],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1] as string),
  });

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

  if (error || !blink) {
    return <Text>Please add valid blink url</Text>;
  }

  const actionsWithoutParameters =
    blink.links?.actions.filter(
      (action) => !action.hasOwnProperty('parameters')
    ).length || 0;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Image
        source={{ uri: blink?.icon }}
        style={[
          {
            height: width / 1.1,
          },
          defaultStyles.image,
          styles.image,
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text
          style={[
            {
              marginTop: 10,
              color: verified
                ? defaultStyles.verified?.color
                : defaultStyles.unverified?.color,
            },
            styles.link,
          ]}
        >
          {new URL(blinkURL).hostname}
        </Text>
      </TouchableOpacity>
      <Text style={[defaultStyles.title, styles.title]}>{blink?.title}</Text>
      <Text style={[defaultStyles.description, styles.description]}>
        {blink?.description}
      </Text>
      {blink?.links ? (
        <View
          style={{
            width: '100%',
          }}
        >
          <View style={defaultStyles.mutipleButtonContainer}>
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
                        marginBottom: 10,
                      },
                    ]}
                    textStyle={styles.buttonText}
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
                        placeholder={
                          action?.parameters
                            ? action?.parameters[index]?.label
                            : undefined
                        }
                        style={[defaultStyles.input, styles.input]}
                        value={inputValues[param.name] || ''}
                      />
                    ))}
                  <Button
                    style={[
                      styles.button,
                      {
                        width: '100%',
                      },
                    ]}
                    textStyle={styles.buttonText}
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
          style={[styles.button, defaultStyles.singleButton]}
          textStyle={styles.buttonText}
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

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    width: '100%',
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
    marginTop: 2,
  },
  error: {
    color: 'red',
  },
  verified: {
    color: 'green',
  },
  unverified: {
    color: 'red',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 12,
  },
  mutipleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  singleButton: {
    width: '100%',
    marginTop: 16,
  },
});

export default Blink;
