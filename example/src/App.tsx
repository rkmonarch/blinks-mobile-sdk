import { StyleSheet, View } from 'react-native';
import { RenderBlink } from 'blinks-mobile-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ErrorType, TransactionData } from '../../src/types/blinks';

export default function App() {
  const queryClient = new QueryClient();
  const url =
    'https://action.3.land/blink/action/item/6S7eEzjmVEzWnhEHXF7WdYPAuAXzJ4YYNdHng3HJcuiG';
  const account = '4S7jxkoaCN8BsQi2cxscP38xEs1yZn12ooMfV94LLJPC';
  const verified = true;
  const onTransaction = (result: TransactionData | ErrorType) => {
    console.log(result);
  };
  const style = {
    button: {
      backgroundColor: '#4B70F5',
      padding: 10,
      borderRadius: 10,
      width: 350,
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <RenderBlink
          url={url}
          account={account}
          verified={verified}
          onTransaction={onTransaction}
          styling={style}
        />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
