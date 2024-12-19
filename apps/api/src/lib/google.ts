import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} from '@api/config';
import axios from 'axios';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export const getRoleByGoogleRole = (googleRole: string) => {
  switch (googleRole) {
    case 'OWNER':
      return 'admin';
    case 'MANAGER':
      return 'manager';
    case 'MEMBER':
      return 'user';
    default:
      return 'user';
  }
};

export const fetchImageAsBase64 = async (
  url?: string | null
): Promise<string | null> => {
  if (!url) {
    return null;
  }
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    const contentType = response.headers['content-type'];
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    throw error;
  }
};

const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

export const getCredentialsByCode = async (
  code: string
): Promise<Credentials> => {
  const res = await client.getToken(code);

  return res.tokens;
};

type TokenInfo = {
  email: string;
  name?: string | null;
  slugId: string;
  domain: string;
  avatar?: string | null;
};

export const getTokenInfo = async (
  credentials: Credentials
): Promise<TokenInfo> => {
  client.setCredentials(credentials);
  const info = await google.oauth2('v2').userinfo.get({ auth: client });

  if (!info.data.id || !info.data.email || !info.data.hd)
    throw new Error('Invalid token');

  const avatar = await fetchImageAsBase64(info.data.picture);
  return {
    email: info.data.email,
    name: info.data.name,
    slugId: info.data.id,
    domain: info.data.hd,
    avatar
  };
};
