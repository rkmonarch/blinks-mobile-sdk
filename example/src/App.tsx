import { SafeAreaView, StyleSheet } from 'react-native';
import { RenderBlink, type BlinkStyles } from 'blinks-mobile-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ErrorType, TransactionData } from '../../src/types/blinks';

export default function App() {
  const queryClient = new QueryClient();
  const url = 'https://dca.compressed.fun/blinks';
  const account = '4S7jxkoaCN8BsQi2cxscP38xEs1yZn12ooMfV94LLJPC';

  const onTransaction = (result: TransactionData | ErrorType) => {
    console.log(result);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <RenderBlink
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
    backgroundColor: '#4B70F5',
    borderRadius: 10,
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
