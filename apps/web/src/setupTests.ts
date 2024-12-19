// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
const getFormatedMessage = (args: any[], mess: string) => {
  if (!args || args?.length === 0) return mess;

  const character = '%s';
  let newMessage = mess;

  for (let i = args.length - 1; i >= 0; i -= 1) {
    const messageToReplace = character.repeat(i + 1);
    newMessage = newMessage.replace(messageToReplace, args[i]);
  }

  return newMessage;
};

const mockedConsole = (mess: string, ...args: any[]) => {
  const message = getFormatedMessage(args, mess);

  throw new Error(message);
};

const setupTests = () => {
  global.console.error = mockedConsole;
  global.console.warn = mockedConsole;
  process.env.TZ = 'UTC';
};
setupTests();
export default setupTests;
