// export function downloadImage(url: string) {
//   const element = document.createElement("a");
//   element.href = url;
//   element.target = "_blank";
//   element.download = "image.jpg";
//   document.body.appendChild(element); // Append to the body to make it work in Firefox
//   element.click();
//   document.body.removeChild(element); // Clean up
// }

// export async function downloadImage(url: string) {
//   //Fetch image data from url
//   const imageData = await fetch(
//     "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BMqRnFw9kPpk4hQeoZCXz476/user-sZjBBfo9rnjnYgiqJn3w919m/img-erKsaOqwRS6N1wzDuMzOS9Fh.png",
//   );
//   //Create blob of image data
//   console.log(imageData);
//   const imageBlob = await imageData.blob();
//   return imageBlob;
// }

// https://cors-anywhere.herokuapp.com/https://oaidalleapiprodscus.blob.core.windows.net/private/org-BMqRnFw9kPpk4hQeoZCXz476/user-sZjBBfo9rnjnYgiqJn3w919m/img-erKsaOqwRS6N1wzDuMzOS9Fh.png?st=2024-09-09T10%3A47%3A09Z&se=2024-09-09T12%3A47%3A09Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-08T22%3A02%3A23Z&ske=2024-09-09T22%3A02%3A23Z&sks=b&skv=2024-08-04&sig=%2BRAyxgwy6H1V8UDbQky/QS776TDEePQ5xRipVtEuvqk%3D

export async function downloadImage(url: string) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = proxyUrl + url;

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "image.png"; // Ajusta la extensión del archivo según sea necesario
    document.body.appendChild(element); // Añadir al cuerpo para que funcione en Firefox
    element.click();
    document.body.removeChild(element); // Limpiar
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
  }
}
