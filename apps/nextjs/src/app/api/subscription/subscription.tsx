import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";

// Define the interfaces for the session data
interface Subscription {
  userId: string;
  status: string | null;
}

interface User {
  name: string | null;
  email: string;
  image: string | null;
  id: string;
  subscription: Subscription | null;
}

interface SessionS {
  user: User;
}

// Function to get the session user
export const getSession = async (): Promise<User | null> => {
  const session: SessionS | null = await auth();

  if (!session) {
    return null; // or throw an error if session should never be null
  }

  const subscription = await db.query.subscriptions
    .findFirst({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      where: eq(schema.subscriptions.userId, session.user.id),
    })
    .then((sub) => {
      if (sub) {
        const filteredSubscription = {
          userId: sub.userId,
          status: sub.status,
        };
        return filteredSubscription;
      }
      return null;
    });

  // Attach subscription to session user object
  session.user.subscription = subscription;

  return session.user;
};
