import i18n from '../i18n';

class SpeechGuide {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (speaking: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeakingState = speaking;
    this.listeners.forEach(cb => cb(speaking));
  }

  public speak(text: string, customLang?: string) {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported on this device/browser.');
      return;
    }

    this.stop();

    if (!text || text.trim() === '') return;

    const lang = customLang || i18n.language || 'gu';
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language to BCP 47 code
    if (lang === 'gu') utterance.lang = 'gu-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95; // Slightly slower, clearer for rural learners
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang === utterance.lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => this.notify(true);
    utterance.onend = () => this.notify(false);
    utterance.onerror = () => this.notify(false);

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }

  public isSpeaking() {
    return this.isSpeakingState;
  }
}

export const speechService = new SpeechGuide();

