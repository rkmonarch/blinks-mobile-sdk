import { StyleSheet, View } from 'react-native';
import { RenderBlink } from 'blinks-mobile-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  const url =
    'https://actions.dialect.to/api/jupiter/swap/USDC-2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo';
  const account = '4S7jxkoaCN8BsQi2cxscP38xEs1yZn12ooMfV94LLJPC';
  const verified = true;
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <RenderBlink url={url} account={account} verified={verified} />
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
