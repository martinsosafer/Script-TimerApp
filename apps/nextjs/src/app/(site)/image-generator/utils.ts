export function downloadImage(url: string) {
  const element = document.createElement("a");
  element.href = url;
  element.target = "_blank";
  element.download = "image.jpg";
  document.body.appendChild(element); // Append to the body to make it work in Firefox
  element.click();
  document.body.removeChild(element); // Clean up
}
