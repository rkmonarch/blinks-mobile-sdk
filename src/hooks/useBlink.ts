import type { Blink, ErrorType, TransactionData } from '../types/blinks';

export default function useBlink() {
  async function fetchBlink(url: string): Promise<Blink> {
    const response = await fetch(url);
    return response.json();
  }

  async function fetchTransaction(
    url: string,
    account: string
  ): Promise<TransactionData | ErrorType> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account: account }),
    });
    return response.json();
  }
  return { fetchBlink, fetchTransaction };
}
