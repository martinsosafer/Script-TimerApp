import { kv } from "@vercel/kv";

type ContentType =
  | "summary"
  | "bulletPoints"
  | "sortedWords"
  | "mainTheme"
  | "cutDowns"
  | "soundBites";

interface AIContent {
  type: ContentType;
  content: string | string[];
  uploadUrl?: string;
}

export async function saveAIContent(
  userId: string,
  contentType: ContentType,
  content: string | string[],
  uploadUrl?: string, // Add this parameter
): Promise<void> {
  const key = `user:${userId}:video:${uploadUrl}:${contentType}`;
  const contentObject: AIContent = {
    type: contentType,
    content: content,
    uploadUrl, // Add this line
  };
  console.log("About to save key:", key);
  console.log("Content object being saved:", contentObject);
  await kv.set(key, contentObject);

  // Verify what was saved
  const savedContent = await kv.get(key);
  console.log("Verification - saved content:", savedContent);
}

export async function getAIContent(
  userId: string,
  contentType: ContentType,
  uploadUrl: string,
): Promise<AIContent | null> {
  const key = `user:${userId}:video:${uploadUrl}:${contentType}`;
  const content = await kv.get(key);

  console.log("Raw content from KV:", content); // Debug log

  // If content exists and is already an object with the correct shape
  if (
    content &&
    typeof content === "object" &&
    "type" in content &&
    "content" in content
  ) {
    return content as AIContent;
  }

  // If content exists but only has type (missing content field)
  if (content && typeof content === "object" && "type" in content) {
    console.error(`Content for ${key} is missing the content field:`, content);
    return null;
  }

  // If it's a string (legacy data), try to parse it
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if ("type" in parsed && "content" in parsed) {
        return parsed as AIContent;
      }
      console.error(`Parsed content is missing required fields:`, parsed);
      return null;
    } catch (error) {
      console.error(`Error parsing content for ${key}:`, error);
      return null;
    }
  }

  return null;
}
export async function getAllAIContent(userId: string): Promise<AIContent[]> {
  const pattern = `user:${userId}:video:*`;
  const keys = await kv.keys(pattern);

  const contents = await Promise.all(
    keys.map(async (key) => {
      try {
        const content = await kv.get(key);
        if (
          content &&
          typeof content === "object" &&
          "type" in content &&
          "content" in content
        ) {
          return content as AIContent;
        }
        return null;
      } catch (error) {
        console.error(`Error getting content for key ${key}:`, error);
        return null;
      }
    }),
  );

  return contents.filter(
    (content): content is AIContent => content !== null && "content" in content,
  );
}
