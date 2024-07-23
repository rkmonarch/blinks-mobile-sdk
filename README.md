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
