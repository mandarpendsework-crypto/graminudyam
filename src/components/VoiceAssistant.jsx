import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X } from 'lucide-react';

export default function VoiceAssistant({ onAutoFillForm, currentLang = 'English' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  const langConfig = {
    English: {
      code: 'en-IN',
      welcome: "Tell me: What business do you want to start, where, and how much money do you have?",
      listeningText: "Listening... speak now",
      btnText: "Speak in Your Language"
    },
    'हिन्दी': {
      code: 'hi-IN',
      welcome: "बताइए: आप कौन सा व्यापार, कहाँ और कितने पैसों में शुरू करना चाहते हैं?",
      listeningText: "सुन रहे हैं... कृपया बोलें",
      btnText: "आवाज़ में बात करें"
    },
    'मराठी': {
      code: 'mr-IN',
      welcome: "सांगा: तुम्हाला कोणता व्यवसाय, कुठे आणि किती भांडवलात सुरू करायचा आहे?",
      listeningText: "ऐकत आहे... बोला",
      btnText: "आवाजात बोला"
    },
    'தமிழ்': {
      code: 'ta-IN',
      welcome: "கூறுங்கள்: நீங்கள் என்ன தொழில், எங்கு, எவ்வளவு முதலீட்டில் தொடங்க விரும்புகிறீர்கள்?",
      listeningText: "கேட்கிறது... பேசுங்கள்",
      btnText: "குரல் வழி பேசுங்கள்"
    }
  }[currentLang] || {
    code: 'en-IN',
    welcome: "Tell me: What business do you want to start, where, and how much money do you have?",
    listeningText: "Listening... speak now",
    btnText: "Speak in Your Language"
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = langConfig.code;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceInput(text);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langConfig.code;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }
    setTranscript('');
    setAssistantReply('');
    try {
      recognitionRef.current.lang = langConfig.code;
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceInput = (rawText) => {
    const text = rawText.toLowerCase().trim();
    let detectedCapital = null;
    let detectedSector = null;

    // 1. Precise Number & Capital Parser
    if (text.includes('100000') || text.includes('1 lakh') || text.includes('एक लाख') || text.includes('1 लाख')) {
      detectedCapital = 100000;
    } else if (text.includes('250000') || text.includes('2.5 lakh') || text.includes('ढाई लाख') || text.includes('अडीच लाख')) {
      detectedCapital = 250000;
    } else if (text.includes('50000') || text.includes('50 हजार') || text.includes('पचास हजार') || text.includes('पन्नास हजार') || text.includes('50k') || text.includes('50 k')) {
      detectedCapital = 50000;
    } else if (text.includes('25000') || text.includes('25 हजार') || text.includes('पच्चीस हजार') || text.includes('पंचवीस हजार') || text.includes('25k') || text.includes('25 k')) {
      detectedCapital = 25000;
    } else if (text.includes('10000') || text.includes('10 हजार') || text.includes('दस हजार') || text.includes('दहा हजार') || text.includes('10k') || text.includes('10 k')) {
      detectedCapital = 10000;
    } else if (text.includes('हजार') || text.includes('thousand') || text.includes('k')) {
      const match = text.match(/(\d+)\s*(?:thousand|k|हजार)/);
      if (match) {
        detectedCapital = parseInt(match[1], 10) * 1000;
      }
    } else if (text.includes('लाख') || text.includes('lakh')) {
      const match = text.match(/(\d+(?:\.\d+)?)\s*(?:lakh|लाख)/);
      if (match) {
        detectedCapital = parseFloat(match[1]) * 100000;
      }
    } else {
      const numberMatches = text.match(/\d+/g);
      if (numberMatches && numberMatches.length > 0) {
        detectedCapital = parseInt(numberMatches[0], 10);
      }
    }

    // 2. Sector ID Alignment
    if (
      text.includes('dairy') || 
      text.includes('दूध') || 
      text.includes('डेयरी') || 
      text.includes('डेअरी') || 
      text.includes('गाय') || 
      text.includes('म्हैस') || 
      text.includes('पनीर') || 
      text.includes('milk')
    ) {
      detectedSector = 'dairy';
    } else if (
      text.includes('tailor') || 
      text.includes('garment') || 
      text.includes('कपड़ा') || 
      text.includes('कापड') || 
      text.includes('सिलाई') || 
      text.includes('शिलाई') || 
      text.includes('textile')
    ) {
      detectedSector = 'textiles';
    } else if (
      text.includes('food') || 
      text.includes('agro') || 
      text.includes('चक्की') || 
      text.includes('आटा') || 
      text.includes('तेल') || 
      text.includes('प्रसंस्करण')
    ) {
      detectedSector = 'agro_processing';
    } else if (
      text.includes('kirana') || 
      text.includes('retail') || 
      text.includes('दुकान') || 
      text.includes('दुकानदारी') || 
      text.includes('किराना')
    ) {
      detectedSector = 'retail';
    }

    // Dispatch update to parent components
    if (onAutoFillForm) {
      onAutoFillForm({
        capital: detectedCapital,
        sector: detectedSector
      });
    }

    // Spoken regional response builder
    let reply = "";
    const displaySectorName = detectedSector === 'dairy' ? 'Dairy' : (detectedSector || '');
    if (currentLang === 'हिन्दी') {
      reply = `समझ गया! ${displaySectorName ? `व्यापार: डेयरी. ` : ''}${detectedCapital ? `पूंजी: ₹${detectedCapital.toLocaleString('en-IN')}. ` : ''}फ़ॉर्म अपडेट कर दिया है।`;
    } else if (currentLang === 'मराठी') {
      reply = `समजले! ${displaySectorName ? `व्यवसाय: डेअरी. ` : ''}${detectedCapital ? `भांडवल: ₹${detectedCapital.toLocaleString('en-IN')}. ` : ''}फॉर्म भरला आहे.`;
    } else {
      reply = `Got it! ${displaySectorName ? `Sector: Dairy. ` : ''}${detectedCapital ? `Capital: ₹${detectedCapital.toLocaleString('en-IN')}. ` : ''}Form updated.`;
    }

    setAssistantReply(reply);
    speakText(reply);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            speakText(langConfig.welcome);
          }}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-emerald-300/40"
        >
          <div className="relative">
            <Mic className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide">{langConfig.btnText}</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Gramin Voice Assistant</h4>
                <p className="text-[10px] text-slate-400">{langConfig.code}</p>
              </div>
            </div>
            <button
              onClick={() => {
                stopListening();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Assistant Spoken Response Prompt */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-200 leading-relaxed flex items-start gap-2">
            <Volume2 className={`w-4 h-4 text-emerald-400 shrink-0 mt-0.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>{assistantReply || langConfig.welcome}</span>
          </div>

          {/* User Transcript Display */}
          {transcript && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
              <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-1">You said:</span>
              "{transcript}"
            </div>
          )}

          {/* Microphone Action Control */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
            <p className="text-[11px] text-slate-400 font-medium mt-2">
              {isListening ? langConfig.listeningText : "Click microphone and speak"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}