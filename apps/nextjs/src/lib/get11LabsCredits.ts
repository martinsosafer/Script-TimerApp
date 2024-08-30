export async function fetchUserCredits(userId: string): Promise<number> {
  try {
    // Use NEXT_PUBLIC_HOST_URL for client-side requests
    const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/get11LabsCredits?userId=${userId}`,
    );

    console.log("Response Status:", response.status);
    console.log(
      "Request URL:",
      `${baseUrl}/api/get11LabsCredits?userId=${userId}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Data:", errorData);
      throw new Error(errorData.error || "Failed to fetch user credits");
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    if (data.credits === undefined) {
      console.warn("Credits are undefined in API response");
    }

    return data.credits;
  } catch (error) {
    console.error("Error fetching user credits:", error);
    throw error;
  }
}
