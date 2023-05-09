import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const App = () => {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      }
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      }
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      }
    },
    ,
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0)`;
      }
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const handleReset = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Ritu Speak here... {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <br />
      <br />
      {/* <p>{transcript}</p> */}
      <input type="text" value={transcript} />
    </div>
  );
};
export default App;
