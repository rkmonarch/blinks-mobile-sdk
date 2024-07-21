import { useState } from 'react';
import type { Blink, ErrorType, TransactionData } from '../types/blinks';
import validateLink from '../utils/validateLink';

export default function useBlink() {
  const [blinkURL, setURL] = useState('');
  const { validate } = validateLink();

  async function fetchBlink(url: string): Promise<Blink | null> {
    // const response = await fetch(url);
    // const responseJSON = await response.json();
    // setURL(url);

    // if (!responseJSON) {
    const validURL = await validate(url);
    if (validURL) {
      try {
        const res = await fetch(validURL);
        const data = await res.json();
        setURL(validURL);
        return data;
      } catch (error) {
        console.log(error);
      }
    } else {
      const blink = await fetch(url);
      const blinkData = await blink.json();
      setURL(url);
      return blinkData;
    }
    // }
    return null;
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

  return { fetchBlink, fetchTransaction, blinkURL };
}
