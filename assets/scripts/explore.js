// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  const synth = window.speechSynthesis;

  const voiceType = document.getElementById("voice-select");
  const voiceImage = document.querySelector("[alt='Smiling face']");
  const textInput = document.getElementById("text-to-speak");
  const playButton = document.querySelector("button");
  //init voices array
  let voices = [];
  const getVoices = () => {
    voices = synth.getVoices();
  
    // Loop through voices and create an option for each one
    voices.forEach(voice => {
      // Create option element
      const option = document.createElement('option');
      // Fill option with voice and language
      option.textContent = voice.name + '(' + voice.lang + ')';
  
      // Set needed option attributes
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceType.appendChild(option);
    });
  };

  getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }



  //speak
  const speak = () => {
    // Check if speaking
    if (synth.speaking) {
      console.error('Already speaking...');
      return;
    }
    if (textInput.value !== '') {
  
      voiceImage.src = "assets/images/smiling-open.png"
      // Get speak text
      const speakText = new SpeechSynthesisUtterance(textInput.value);
  
      // Speak end
      speakText.onend = e => {
        console.log('Done speaking...');
        voiceImage.src = "assets/images/smiling.png"
      };
  

      // Selected voice
      const selectedVoice = voiceType.selectedOptions[0].getAttribute(
        'data-name'
      );
  
      // Loop through voices
      voices.forEach(voice => {
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      });
  
      // Speak
      synth.speak(speakText);
    }
  };


  playButton.addEventListener("click", (event) => {
    speak();
  })


}