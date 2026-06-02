import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account  = new Account(client);
export const databases = new Databases(client);
export const storage  = new Storage(client);
export { ID, Query, client };

export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const COL   = {
  POSTS:       process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION!,
  MESSAGES:    process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION!,
  PREDICTIONS: process.env.NEXT_PUBLIC_APPWRITE_PREDICTIONS_COLLECTION!,
  USERS:       process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
};

/* ── AUTH ─────────────────────────────── */

export async function getCurrentUser() {
  try { return await account.get(); }
  catch { return null; }
}

export function loginWithGoogle() {
  account.createOAuth2Session(
    "google" as any,
    `${window.location.origin}/auth/callback`,
    `${window.location.origin}/?error=true`
  );
}

export async function loginWithEmail(email: string, password: string) {
  return account.createEmailPasswordSession(email, password);
}

export async function registerUser(email: string, password: string, name: string) {
  await account.create(ID.unique(), email, password, name);
  return loginWithEmail(email, password);
}

export async function logoutUser() {
  try { await account.deleteSession("current"); }
  catch (e) { console.error(e); }
}

/* ── USERS PROFILE ────────────────────── */

export async function createUserProfile(
  userId: string, username: string,
  email: string, country = "Global", countryFlag = "🌍"
) {
  try {
    return await databases.createDocument(DB_ID, COL.USERS, userId, {
      userId, username, email, country, countryFlag,
      fanPoints: 0, globalRank: 0,
      badges: [], createdAt: new Date().toISOString(),
    });
  } catch { return null; }
}

export async function getUserProfile(userId: string) {
  try { return await databases.getDocument(DB_ID, COL.USERS, userId); }
  catch { return null; }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserProfile(userId: string, data: Record<string,any>) {
  return databases.updateDocument(DB_ID, COL.USERS, userId, data);
}

/* ── FAN POSTS ────────────────────────── */

export async function getPosts(limit = 10, offset = 0) {
  try {
    const res = await databases.listDocuments(DB_ID, COL.POSTS, [
      Query.orderDesc("createdAt"),
      Query.limit(limit),
      Query.offset(offset),
    ]);
    return res.documents;
  } catch { return []; }
}

export async function createPost(
  userId: string, username: string,
  country: string, countryFlag: string, content: string
) {
  return databases.createDocument(DB_ID, COL.POSTS, ID.unique(), {
    userId, username, country, countryFlag, content,
    likes: 0, comments: 0,
    createdAt: new Date().toISOString(),
  });
}

export async function likePost(postId: string, currentLikes: number) {
  return databases.updateDocument(DB_ID, COL.POSTS, postId, {
    likes: currentLikes + 1,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function subscribeToNewPosts(callback: (post: any) => void) {
  return client.subscribe(
    `databases.${DB_ID}.collections.${COL.POSTS}.documents`,
    (res) => {
      if (res.events.includes(
        `databases.${DB_ID}.collections.${COL.POSTS}.documents.*.create`
      )) callback(res.payload);
    }
  );
}

/* ── CHAT MESSAGES ────────────────────── */

export async function getMessages(communityId: string, limit = 50) {
  try {
    const res = await databases.listDocuments(DB_ID, COL.MESSAGES, [
      Query.equal("communityId", communityId),
      Query.orderDesc("createdAt"),
      Query.limit(limit),
    ]);
    return res.documents.reverse();
  } catch { return []; }
}

export async function sendMessage(
  communityId: string, userId: string,
  username: string, country: string,
  countryFlag: string, text: string
) {
  return databases.createDocument(DB_ID, COL.MESSAGES, ID.unique(), {
    communityId, userId, username,
    country, countryFlag, text,
    createdAt: new Date().toISOString(),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function subscribeToMessages(
  communityId: string,
  callback: (msg: any) => void
) {
  return client.subscribe(
    `databases.${DB_ID}.collections.${COL.MESSAGES}.documents`,
    (res) => {
      const isCreate = res.events.includes(
        `databases.${DB_ID}.collections.${COL.MESSAGES}.documents.*.create`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = res.payload as any;
      if (isCreate && payload.communityId === communityId) {
        callback(payload);
      }
    }
  );
}

/* ── PREDICTIONS ──────────────────────── */

export async function savePrediction(
  userId: string, matchId: string,
  homeScore: number, awayScore: number
) {
  return databases.createDocument(DB_ID, COL.PREDICTIONS, ID.unique(), {
    userId, matchId, homeScore, awayScore,
    points: 0, isCorrect: false,
    createdAt: new Date().toISOString(),
  });
}

export async function getUserPredictions(userId: string) {
  try {
    const res = await databases.listDocuments(DB_ID, COL.PREDICTIONS, [
      Query.equal("userId", userId),
      Query.orderDesc("createdAt"),
    ]);
    return res.documents;
  } catch { return []; }
}