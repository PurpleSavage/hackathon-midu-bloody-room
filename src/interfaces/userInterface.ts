export interface UserFirebaseI {
  uid: string;
  photoProfile: string;
  photos: string[];
  token: string;
  createdAt: Date;
  lastImageAt: Date;
  attemptTokens: number;
}
