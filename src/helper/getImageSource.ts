import { SERVER_URL } from "../constant";

export default function getImageSource(imageUrl: string) {
  if (imageUrl.startsWith("https://")) {
    // It's an external image URL, so return it as is
    return imageUrl;
  } else {
    // It's a local image URL, so prepend the base URL
    return `${SERVER_URL}/${imageUrl}`;
  }
}
