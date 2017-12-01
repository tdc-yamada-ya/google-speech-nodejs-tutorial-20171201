const speech = require('@google-cloud/speech');
const record = require('node-record-lpcm16');

const sampleRateHertz = 16000;

const request = {
    config: {
    encoding: 'LINEAR16',
    sampleRateHertz: sampleRateHertz,
    languageCode: 'ja-JP',
    maxAlternatives: 5
  },
  singleUtterance: true,
  interimResults: true
}

const speechClient = new speech.SpeechClient();

const speechWorker = {
  alternatives: [],
  logs: [],
  start () {
    startRecording();
  }
};

function startRecording() {
  const stream = speechClient.streamingRecognize(request)
    .on('error', console.error)
    .on('data', (data) => {
      if (!receivedData(data)) {
        restartRecording();
      }
    });

  record
    .start({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      verbose: false,
      recordProgram: 'rec',
      silence: '5.0'
    })
    .on('error', console.error)
    .pipe(stream);
}

function stopRecording() {
  record.stop();
}

function restartRecording() {
  stopRecording();
  startRecording();
}

function receivedData(data) {
  const results = data ? data.results : null;
  const result = results ? results[0] : null;

  if (!result) {
    return false;
  }

  const alternatives = result.alternatives;

  if (!alternatives || alternatives.length === 0) {
    return false;
  }

  const transcripts = [];

  for (let alternative of alternatives) {
    transcripts.push(alternative.transcript);
  }

  speechWorker.alternatives = transcripts;

  if (result.isFinal) {
    const transcript = transcripts[0];

    console.log(`transcript=${transcript}`);

    speechWorker.logs.push(transcripts[0]);
    return false;
  }

  return true;
}

module.exports = speechWorker;
