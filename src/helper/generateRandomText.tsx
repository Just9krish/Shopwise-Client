function generateRandomText() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 6; i += 1) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
}

export default generateRandomText;
