import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Blink,
  type BlinkStyles,
  type TransactionData,
} from 'blinks-mobile-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  const url = 'https://actions.dialect.to/api/jupiter/swap/SOL-SEND';
  const account = '4S7jxkoaCN8BsQi2cxscP38xEs1yZn12ooMfV94LLJPC';

  const onTransaction = (result: TransactionData) => {
    console.log(result);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Blink
          url={url}
          account={account}
          onTransaction={onTransaction}
          styles={blink}
        />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const blink: BlinkStyles = {
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontWeight: '400',
  },
  input: {
    fontSize: 14,
  },
  buttonText: {
    fontSize: 13,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
