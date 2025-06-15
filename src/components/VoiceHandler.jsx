import { useEffect } from "react";

// Voice handler hook — expects a callback: onCommand({ action, product, quantity })
const useVoiceHandler = (onCommand) => {
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Web Speech API not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false; // Listen for one phrase at a time
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎙️ Voice recognition started.");
    };

    recognition.onspeechstart = () => {
      console.log("🗣️ Speech detected.");
    };

    recognition.onspeechend = () => {
      console.log("📴 Speech ended.");
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        console.warn("⚠️ No speech detected. Prompting retry...");
        setTimeout(() => recognition.start(), 1000); // retry
      }
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          console.log("📝 Transcript:", transcript);

          const addMatch = transcript.match(/add (\d+) (\w+)/);
          const removeMatch = transcript.match(/remove (\d+) (\w+)/);

          if (addMatch) {
            onCommand({
              action: "add",
              product: addMatch[2],
              quantity: parseInt(addMatch[1]),
            });
          } else if (removeMatch) {
            onCommand({
              action: "remove",
              product: removeMatch[2],
              quantity: parseInt(removeMatch[1]),
            });
          } else {
            console.warn("⚠️ Command not recognized.");
          }
        }
      }
    };

    recognition.start(); // Start on hook mount
    return () => recognition.stop(); // Clean up on unmount
  }, [onCommand]);
};

export default useVoiceHandler;
