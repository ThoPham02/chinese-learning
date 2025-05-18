export const speakWord = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN'; // Set the language to Chinese
  speechSynthesis.speak(utterance);
}