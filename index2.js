// @ts-check
import { multiaddr } from "@multiformats/multiaddr";
import { enable, disable } from "@libp2p/logger";
import { PUBSUB_PEER_DISCOVERY, PUBSUB_AUDIO } from "./constants";
import { update, getPeerTypes, getAddresses, getPeerDetails } from "./utils";
import { createNewLibp2p } from "./utils";

const App = async () => {
      const audio = document.getElementById("player");
      const mediaSource = new MediaSource();
      audio.src = URL.createObjectURL(mediaSource);

      const ws = new WebSocket("ws://localhost:3000");
      ws.binaryType = "arraybuffer";

      let sourceBuffer;
      let queue = [];
      let isBufferReady = false;
      let isAppending = false;

      mediaSource.addEventListener("sourceopen", () => {
        console.log("MediaSource opened");
        try {
          sourceBuffer = mediaSource.addSourceBuffer(
            'audio/webm; codecs="opus"'
          );
        } catch (e) {
          console.error("Failed to create SourceBuffer:", e);
          return;
        }

        sourceBuffer.mode = "sequence";
        sourceBuffer.addEventListener("updateend", appendNextChunk);
        isBufferReady = true;
      });

      ws.onopen = () => console.log("WebSocket connected");

      ws.onmessage = (event) => {
        if (!isBufferReady || !sourceBuffer) {
          // queue until buffer ready
          queue.push(event.data);
          return;
        }
        queue.push(event.data);
        appendNextChunk();
      };

      ws.onclose = () => {
        console.warn("WebSocket closed");
        // optional: gracefully end media
        try {
          if (mediaSource.readyState === "open") mediaSource.endOfStream();
        } catch (e) {}
      };

      function appendNextChunk() {
        if (!isBufferReady || !sourceBuffer || isAppending) return;
        if (queue.length === 0 || sourceBuffer.updating) return;

        const chunk = queue.shift();
        if (!chunk) return;

        try {
          isAppending = true;
          sourceBuffer.appendBuffer(chunk);
        } catch (e) {
          console.warn("appendBuffer failed:", e);
        } finally {
          isAppending = false;
        }
      }
  
  const libp2p = await createNewLibp2p();
  // globalThis.libp2p = libp2p;

  const DOM = {
    startstreaming: () => document.getElementById("startStream"),
    nodePeerId: () => document.getElementById("output-node-peer-id"),
    nodeStatus: () => document.getElementById("output-node-status"),
    nodePeerCount: () => document.getElementById("output-peer-count"),
    nodePeerTypes: () => document.getElementById("output-peer-types"),
    nodePeerDetails: () => document.getElementById("output-peer-details"),
    nodeAddressCount: () => document.getElementById("output-address-count"),
    nodeAddresses: () => document.getElementById("output-addresses"),

    inputMultiaddr: () => document.getElementById("input-multiaddr"),
    connectButton: () => document.getElementById("button-connect"),
    loggingButtonEnable: () => document.getElementById("button-logging-enable"),
    loggingButtonDisable: () =>
      document.getElementById("button-logging-disable"),
    outputQuery: () => document.getElementById("output"),
  };

  update(DOM.nodePeerId(), libp2p.peerId.toString());
  update(DOM.nodeStatus(), "Online");
  update(DOM.outputQuery(), "test");

  libp2p.addEventListener("peer:connect", (event) => {});
  libp2p.addEventListener("peer:disconnect", (event) => {});

  setInterval(() => {
    update(DOM.nodePeerCount(), libp2p.getConnections().length);
    update(DOM.nodePeerTypes(), getPeerTypes(libp2p));
    update(DOM.nodeAddressCount(), libp2p.getMultiaddrs().length);
    update(DOM.nodeAddresses(), getAddresses(libp2p));
    update(DOM.nodePeerDetails(), getPeerDetails(libp2p));
  }, 1000);

  DOM.startstreaming().onclick = async (e) => {



  libp2p.services.pubsub.addEventListener('message', (evt) => {
    console.log('Received audio chunk from', evt.detail.from)
    // evt.detail.data is a Uint8Array of the audio chunk
  })


    console.log("start streaming");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
      audioBitsPerSecond: 64000, // adjust quality (32k–128k typical)
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
        e.data.arrayBuffer().then((buf) => ws.send(buf));
      }
    };

    recorder.start(250); // send small chunks every 250ms
    console.log("Streaming microphone via WebSocket...");
  };

  DOM.loggingButtonEnable().onclick = (e) => {
    enable("*,*:debug");
  };
  DOM.loggingButtonDisable().onclick = (e) => {
    disable();
  };

  DOM.connectButton().onclick = async (e) => {
    e.preventDefault();
    let maddr = multiaddr(DOM.inputMultiaddr().value);

    console.log(maddr);
    try {
      await libp2p.dial(maddr);
    } catch (e) {
      console.log(e);
    }
  };
};

App().catch((err) => {
  console.error(err); // eslint-disable-line no-console
});
