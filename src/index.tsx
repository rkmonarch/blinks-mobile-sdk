import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import useRegistry from './hooks/useRegistry';
import useBlink from './hooks/useBlink';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  url: string;
  account: string;
  verified?: boolean;
}

export function RenderBlink(props: Props) {
  const { url, account } = props;
  const { fetchBlink, fetchTransaction } = useBlink();
  const { verifyBlink } = useRegistry();
  const [input, setInput] = useState('');
  const { data: blink, error } = useQuery({
    queryKey: ['url', url],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1] as string),
  });
  const { data: transaction } = useQuery({
    queryKey: ['blinkURL', url, account],
    queryFn: ({ queryKey }) =>
      fetchTransaction(queryKey[1] as string, queryKey[2] as string),
  });
  const { data: verified } = useQuery({
    queryKey: ['blinkURL', url],
    queryFn: ({ queryKey }) => verifyBlink(queryKey[1] as string),
  });
  if (error) {
    return;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: blink?.icon }} style={styles.image} />
      <Text style={styles.title}>{blink?.title}</Text>
      <Text>{input}</Text>
      <Text>{transaction?.message}</Text>
      <Text>{verified}</Text>
      <Text style={styles.description}>{blink?.description}</Text>
      {blink?.links?.actions.map((action, index) => (
        <View key={index}>
          <Button
            title={action.label}
            onPress={() => {
              fetchTransaction(url, account);
            }}
          />
          {action.parameters ? (
            <TextInput
              onChange={(e) => setInput(e.nativeEvent.text)}
              placeholder={action.parameters[0]?.name}
              style={styles.textInput}
            />
          ) : null}
        </View>
      ))}
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
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  link: {
    color: 'blue',
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
});
