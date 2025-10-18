class StreamProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      // Float32Array of the first channel
      const channelData = input[0];
      // Convert Float32 to 16-bit PCM
      const buffer = new ArrayBuffer(channelData.length * 2);
      const view = new DataView(buffer);
      for (let i = 0; i < channelData.length; i++) {
        let s = Math.max(-1, Math.min(1, channelData[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      // Send raw PCM to main thread
      this.port.postMessage(buffer);
    }
    return true;
  }
}

registerProcessor('stream-processor', StreamProcessor);

