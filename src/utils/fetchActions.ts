interface ActionBlink {
  rules: {
    pathPattern: string;
    apiPath: string;
  }[];
}

export default async function fetchActions(
  host: string
): Promise<ActionBlink | null> {
  const urls = [
    `https://${host}/actions.json`,
    `https://www.${host}/actions.json`,
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
    }
  }
  return null;
}
