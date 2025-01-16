export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function generateFilename(userId: string): string {
  const date = new Date();
  const formattedDate = formatDate(date);
  const timestamp = date.getTime(); // This keeps the unique timestamp
  return `RecordedWebcam/${userId}/recording-${formattedDate}-${timestamp}.mp4`;
}
