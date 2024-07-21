export default function constructApiPath(
  apiPath: string,
  capturedGroups: string[]
): string {
  return apiPath
    .replace(/\*\*/, capturedGroups[0] || '')
    .replace(
      /\*(\d+)/g,
      (_, index) => capturedGroups[parseInt(index, 10) - 1] || ''
    );
}
