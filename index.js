// @ts-check
import { multiaddr } from "@multiformats/multiaddr";
import { enable, disable } from "@libp2p/logger";
import { PUBSUB_PEER_DISCOVERY } from "./constants";
import { update, getPeerTypes, getAddresses, getPeerDetails } from "./utils";
import { createNewLibp2p } from "./utils";

const App = async () => {
  const libp2p = await createNewLibp2p();
  // globalThis.libp2p = libp2p;
  const ws = new WebSocket("ws://localhost:3000"); // Your WebSocket server
ws.binaryType = "arraybuffer";

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
