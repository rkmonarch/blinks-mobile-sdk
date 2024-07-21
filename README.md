# Blinks Mobile SDK Integration

This project demonstrates how to use the `blinks-mobile-sdk` to render blinks in a React Native application. The code includes setting up a query client using `@tanstack/react-query` and using the `RenderBlink` component from the SDK to display blink information and handle transactions.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Installation

First, ensure you have `react-native` and `@tanstack/react-query` installed in your project. Then, install the `blinks-mobile-sdk`.

```bash
pnpm i react-native @tanstack/react-query blinks-mobile-sdk

```

## Setup

In your project, you need to set up the `QueryClient` for `@tanstack/react-query` and configure the RenderBlink component provided by the `blinks-mobile-sdk`.

# Create a component to render the blink:

```tsx
import { StyleSheet, View } from 'react-native';
import { RenderBlink, type BlinkStyles } from 'blinks-mobile-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ErrorType, TransactionData } from '../../src/types/blinks';

export default function App() {
  const queryClient = new QueryClient();
  const url = 'https://actions.dialect.to/api/jupiter/swap/USDC-SEND';
  const account = '4S7jxkoaCN8BsQi2cxscP38xEs1yZn12ooMfV94LLJPC';
  const onTransaction = (result: TransactionData | ErrorType) => {
    console.log(result);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <RenderBlink
          url={url}
          account={account}
          onTransaction={onTransaction}
          styles={blinkStyles}
        />
      </View>
    </QueryClientProvider>
  );
}

const blinkStyles: BlinkStyles = {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
```

## Usage

To use the `RenderBlink` component, you need to provide the following props:

- `url`: The URL of the blink to render.

- `account`: The account to use for the blink.

- `onTransaction`: A callback function that is called when a transaction is completed.

- `styles`: An object containing styles for the blink components.

## Customization

You can customize the appearance of the blink components by providing a `BlinkStyles` object to the `styles` prop of the `RenderBlink` component. The `BlinkStyles` object contains the following properties:

- `button`: Styles for the button component.

- `title`: Styles for the title component.

- `description`: Styles for the description component.

- `input`: Styles for the input component.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
