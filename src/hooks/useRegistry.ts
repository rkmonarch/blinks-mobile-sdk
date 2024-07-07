import { RegistryState, type Registry } from '../types/registry';

export default function useRegistry() {
  const url = 'https://actions-registry.dialectapi.to/all';
  async function verifyBlink(blinkURL: string) {
    try {
      const response = await fetch(url);
      const registry: Registry = await response.json();
      for (let index = 0; index < registry.websites.length; index++) {
        const action = registry.websites[index];
        const { hostname } = new URL(blinkURL);
        if (
          hostname === action!.host &&
          action!.state === RegistryState.Trusted
        ) {
          return true;
        } else {
          return false;
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
