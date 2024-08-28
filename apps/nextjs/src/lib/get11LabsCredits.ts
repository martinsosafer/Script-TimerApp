export async function fetchUserCredits(userId: string): Promise<number> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/get11LabsCredits?userId=${userId}`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user credits");
  }

  const data = await response.json();
  return data.credits;
}
