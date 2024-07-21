import { RegistryState, type Registry } from '../types/registry';

export default function useRegistry() {
  const url = 'https://actions-registry.dialectapi.to/all';

  async function verifyBlink(blinkURL: string) {
    try {
      const response = await fetch(url);
      const registry: Registry = await response.json();

      const { hostname } = new URL(blinkURL);

      for (let index = 0; index < registry.actions.length; index++) {
        const action = registry.actions[index];
        if (
          hostname === action!.host &&
          action!.state === RegistryState.Trusted
        ) {
          return true;
        }
      }
    } catch (error) {
      console.error(error);
      return false;
    }

    return false;
  }

  return { verifyBlink };
}
