export const setJWT = async (jwt: string) => localStorage.setItem('jwt', jwt);
export const clearJWT = async () => localStorage.removeItem('jwt');
export const getJWT = () => localStorage.getItem('jwt');
