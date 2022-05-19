var sdk = require("microsoft-cognitiveservices-speech-sdk");

export async function textToSpeech(text) {
    var key = "769f9698cd2e4f52b230ac0ea51fcbfe";
    var region = "westeurope";

    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisVoiceName = "he-IL-AvriNeural";

    var synthesizer = new sdk.SpeechSynthesizer(speechConfig);
      synthesizer.speakTextAsync(text,
        function (result) {
          synthesizer.close();
          synthesizer = null;
    },
        function (err) {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    });
}
      
