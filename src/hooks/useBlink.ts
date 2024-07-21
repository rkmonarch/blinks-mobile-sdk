import { useState } from 'react';
import type { Blink, ErrorType, TransactionData } from '../types/blinks';
import validateLink from '../utils/validateLink';

export default function useBlink() {
  const [blinkURL, setURL] = useState('');
  const { validate } = validateLink();

  async function fetchBlink(url: string): Promise<Blink | null> {
    const validURL = await validate(url);
    const isValidUrl = (str: string): boolean => {
      try {
        // eslint-disable-next-line no-new
        new URL(str);
        return true;
      } catch {
        return false;
      }
    };

    if (validURL && isValidUrl(validURL)) {
      try {
        const res = await fetch(validURL);
        const data = await res.json();
        setURL(validURL);
        return data;
      } catch (error) {
        console.error('Error fetching from validURL:', error);
      }
    } else {
      try {
        const blink = await fetch(url);
        const blinkData = await blink.json();
        setURL(url);
        return blinkData;
      } catch (error) {
        console.error('Error fetching from original URL:', error);
      }
    }
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
