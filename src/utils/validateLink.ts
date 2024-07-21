export default function validateLink() {
  interface ActionBlink {
    rules: {
      pathPattern: string;
      apiPath: string;
    }[];
  }

  async function validate(blinkLink: string): Promise<string | null> {
    try {
      const url = new URL(blinkLink);
      const host = url.host;

      const actionsUrl = `https://${host}/actions.json`;
      const response = await fetch(actionsUrl);

      if (!response.ok) {
        const fetchURL = `https://www.${host}/actions.json`;
        const actionResponse = await fetch(fetchURL);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${actionsUrl}`);
        }

        const actionsResponse: ActionBlink = await actionResponse.json();

        // Iterate through each rule in actionsResponse
        for (const action of actionsResponse.rules) {
          const { pathPattern, apiPath } = action;

          if (pathPattern === '/') {
            return `https://www.${host}${apiPath}`;
          }

          // Construct regex pattern based on pathPattern
          const regexPattern = `^${pathPattern.replace(/\*\*/g, '(.*)').replace(/\*/g, '([^/]*)')}$`;
          const pathRegex = new RegExp(regexPattern);

          // Match the url pathname with the constructed regex
          const match = url.pathname.match(pathRegex);

          if (match) {
            // Extract matched parts from the regex
            const capturedGroups = match.slice(1);

            // Replace corresponding parts in apiPath
            let newApiPath = apiPath;
            capturedGroups.forEach((group, index) => {
              newApiPath = newApiPath.replace(`*${index + 1}`, group);
            });

            // If newApiPath still contains **, replace it with the first captured group
            if (newApiPath.includes('**')) {
              newApiPath = newApiPath.replace('**', capturedGroups[0]!);
            }

            return newApiPath;
          }
        }

        return null;
      }

      const actionsResponse: ActionBlink = await response.json();

      // Iterate through each rule in actionsResponse
      for (const action of actionsResponse.rules) {
        const { pathPattern, apiPath } = action;

        if (pathPattern === '/') {
          return `https://${host}${apiPath}`;
        }

        // Construct regex pattern based on pathPattern
        const regexPattern = `^${pathPattern.replace(/\*\*/g, '(.*)').replace(/\*/g, '([^/]*)')}$`;
        const pathRegex = new RegExp(regexPattern);

        // Match the url pathname with the constructed regex
        const match = url.pathname.match(pathRegex);

        if (match) {
          // Extract matched parts from the regex
          const capturedGroups = match.slice(1);

          // Replace corresponding parts in apiPath
          let newApiPath = apiPath;
          capturedGroups.forEach((group, index) => {
            newApiPath = newApiPath.replace(`*${index + 1}`, group);
          });

          // Replace ** with the first captured group
          newApiPath = newApiPath.replace(/\*\*/, capturedGroups[0]!);

          // Replace * with the first captured group if it ends with *
          if (newApiPath.endsWith('*')) {
            newApiPath = newApiPath.replace(/\*$/, capturedGroups[0]!);
          }

          return newApiPath;
        }
      }

      return null; // Return null if no match found
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  return { validate };
}
