export async function fetchUserCredits(userId: string): Promise<{
  planCredits: number;
  totalCredits: number;
  boosterCredits: number;
}> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_HOST_URL;
    const response = await fetch(
      `${baseUrl}/api/get11LabsCredits?userId=${userId}`,
    );

    // console.log("Response Status:", response.status);
    console.log(
      "Request URL:",
      `${baseUrl}/api/get11LabsCredits?userId=${userId}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Data:", errorData);
      throw new Error(errorData.error || "Failed to fetch user credits");
    }

    const { planCredits, totalCredits, boosterCredits } =
      (await response.json()) as {
        planCredits?: number;
        totalCredits?: number;
        boosterCredits?: number;
      };

    if (planCredits === undefined) {
      console.warn("Credits are undefined in API response");
    }

    return {
      planCredits: planCredits! || 0,
      totalCredits: totalCredits! || 0,
      boosterCredits: boosterCredits! || 0,
    };
  } catch (error) {
    console.error("Error fetching user credits:", error);
    throw error;
  }
}
