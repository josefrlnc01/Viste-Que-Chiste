import { TextToSpeech } from "@capacitor-community/text-to-speech";

export const speak = (text) => {
    TextToSpeech.speak({
        text: text.replace('🤣',''),
        lang: 'es-ES',
        pitch: 1,
        rate: 1
    });
}