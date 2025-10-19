<<<<<<< HEAD
import {
  WebRTC,
  WebSockets,
  WebSocketsSecure,
  WebTransport,
  Circuit,
  WebRTCDirect,
} from "@multiformats/multiaddr-matcher";
=======
import { WebRTC, WebSockets, WebSocketsSecure, WebTransport, Circuit, WebRTCDirect } from '@multiformats/multiaddr-matcher'
>>>>>>> develop
import { createLibp2p } from "libp2p";
import { identify } from "@libp2p/identify";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { webSockets } from "@libp2p/websockets";
import { webTransport } from "@libp2p/webtransport";
import { webRTC } from "@libp2p/webrtc";
import { pubsubPeerDiscovery } from "@libp2p/pubsub-peer-discovery";
import { PUBSUB_PEER_DISCOVERY, PUBSUB_AUDIO } from "./constants";
import { bootstrap } from "@libp2p/bootstrap";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
<<<<<<< HEAD
import { bootstrapPeers } from "./constants.js";
=======
import { bootstrapPeers } from './constants.js'
>>>>>>> develop

export function getAddresses(libp2p) {
  return libp2p
    .getMultiaddrs()
    .map((ma) => {
<<<<<<< HEAD
      return `<li class="text-sm break-all"><button class="bg-teal-500 hover:bg-teal-700 text-white mx-2" onclick="navigator.clipboard.writeText('${ma.toString()}')">Copy</button>${ma.toString()}</li>`;
    })
    .join("");
}
export function getPeerTypes(libp2p) {
  const types = {
    "Circuit Relay": 0,
    WebRTC: 0,
    "WebRTC Direct": 0,
    WebSockets: 0,
    "WebSockets (secure)": 0,
    WebTransport: 0,
    Other: 0,
  };
=======
      return `<li class="text-sm break-all"><button class="bg-teal-500 hover:bg-teal-700 text-white mx-2" onclick="navigator.clipboard.writeText('${ma.toString()}')">Copy</button>${ma.toString()}</li>`
    })
    .join('')
}
export function getPeerTypes(libp2p) {
  const types = {
    'Circuit Relay': 0,
    WebRTC: 0,
    'WebRTC Direct': 0,
    WebSockets: 0,
    'WebSockets (secure)': 0,
    WebTransport: 0,
    Other: 0,
  }
>>>>>>> develop

  libp2p
    .getConnections()
    .map((conn) => conn.remoteAddr)
    .forEach((ma) => {
      if (WebRTC.exactMatch(ma)) {
<<<<<<< HEAD
        console.log(ma);
        types["WebRTC"]++;
      } else if (WebRTCDirect.exactMatch(ma)) {
        types["WebRTC Direct"]++;
      } else if (WebSockets.exactMatch(ma)) {
        types["WebSockets"]++;
      } else if (WebSocketsSecure.exactMatch(ma)) {
        types["WebSockets (secure)"]++;
      } else if (WebTransport.exactMatch(ma)) {
        types["WebTransport"]++;
      } else if (Circuit.exactMatch(ma)) {
        types["Circuit Relay"]++;
      } else {
        types["Other"]++;
        console.info("wat", ma.toString());
      }
    });

  return Object.entries(types)
    .map(([name, count]) => `<li>${name}: ${count}</li>`)
    .join("");
=======
        console.log(ma)
        types['WebRTC']++
      } else if (WebRTCDirect.exactMatch(ma)) {
        types['WebRTC Direct']++
      } else if (WebSockets.exactMatch(ma)) {
        types['WebSockets']++
      } else if (WebSocketsSecure.exactMatch(ma)) {
        types['WebSockets (secure)']++
      } else if (WebTransport.exactMatch(ma)) {
        types['WebTransport']++
      } else if (Circuit.exactMatch(ma)) {
        types['Circuit Relay']++
      } else {
        types['Other']++
        console.info('wat', ma.toString())
      }
    })

  return Object.entries(types)
    .map(([name, count]) => `<li>${name}: ${count}</li>`)
    .join('')
>>>>>>> develop
}
export function getPeerDetails(libp2p) {
  return libp2p
    .getPeers()
    .map((peer) => {
<<<<<<< HEAD
      const peerConnections = libp2p.getConnections(peer);

      let nodeType = [];

      // detect if this is a bootstrap node
      if (bootstrapPeers.includes(peer.toString())) {
        nodeType.push("bootstrap");
      }

      const relayMultiaddrs = libp2p
        .getMultiaddrs()
        .filter((ma) => Circuit.exactMatch(ma));
      const relayPeers = relayMultiaddrs.map((ma) => {
        return ma
          .getComponents()
          .filter(({ name }) => name === "p2p")
          .map(({ value }) => value);
      });

      // detect if this is a relay we have a reservation on
      if (relayPeers.includes(peer.toString())) {
        nodeType.push("relay");
      }

      return `<li>
      <span><code>${peer.toString()}</code>${
        nodeType.length > 0 ? `(${nodeType.join(", ")})` : ""
      }</span>
      <ul class="pl-6">${peerConnections
        .map((conn) => {
          return `<li class="break-all text-sm"><button class="bg-teal-500 hover:bg-teal-700 text-white px-2 mx-2 rounded focus:outline-none focus:shadow-outline" onclick="navigator.clipboard.writeText('${conn.remoteAddr.toString()}')">Copy</button>${conn.remoteAddr.toString()} </li>`;
        })
        .join("")}</ul>
    </li>`;
    })
    .join("");
}
export function update(element, newContent) {
  if (element.innerHTML !== newContent) {
    element.innerHTML = newContent;
=======
      const peerConnections = libp2p.getConnections(peer)

      let nodeType = []

      // detect if this is a bootstrap node
      if (bootstrapPeers.includes(peer.toString())) {
        nodeType.push('bootstrap')
      }

      const relayMultiaddrs = libp2p.getMultiaddrs().filter((ma) => Circuit.exactMatch(ma))
      const relayPeers = relayMultiaddrs.map((ma) => {
        return ma
          .getComponents()
          .filter(({ name }) => name === 'p2p')
          .map(({ value }) => value)
      })

      // detect if this is a relay we have a reservation on
      if (relayPeers.includes(peer.toString())) {
        nodeType.push('relay')
      }

      return `<li>
      <span><code>${peer.toString()}</code>${nodeType.length > 0 ? `(${nodeType.join(', ')})` : ''}</span>
      <ul class="pl-6">${peerConnections
        .map((conn) => {
          return `<li class="break-all text-sm"><button class="bg-teal-500 hover:bg-teal-700 text-white px-2 mx-2 rounded focus:outline-none focus:shadow-outline" onclick="navigator.clipboard.writeText('${conn.remoteAddr.toString()}')">Copy</button>${conn.remoteAddr.toString()} </li>`
        })
        .join('')}</ul>
    </li>`
    })
    .join('')
}
export function update(element, newContent) {
  if (element.innerHTML !== newContent) {
    element.innerHTML = newContent
>>>>>>> develop
  }
}

export async function createNewLibp2p() {
<<<<<<< HEAD
  const libp2p = await createLibp2p({
    addresses: {
      listen: [
        // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
        "/p2p-circuit",
        // 👇 Listen for webRTC connection
        "/webrtc",
      ],
    },
    transports: [
      webSockets({
        // 允許所有WebSocket連接包括不帶TLS的
      }),
      webTransport(),
      webRTC({
        rtcConfiguration: {
          iceServers: [
            {
              // STUN servers help the browser discover its own public IPs
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        },
      }),
      // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
      // 添加@libp2p/circuit-relay-v2-transport支持
      circuitRelayTransport({
        discoverRelays: 1,
      }),
    ],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    connectionGater: {
      // Allow private addresses for local testing
      denyDialMultiaddr: async () => false,
    },
    peerDiscovery: [
      bootstrap({
        // add your relay multiaddr here ! and rerun this client code
        list: [
          "/ip4/127.0.0.1/tcp/9001/ws/p2p/12D3KooWLtMxiSbgYsjB44PHf2aXUC3gjwYaRm6MYJzT7dfyYnmq",
        ],
      }),
      pubsubPeerDiscovery({
        interval: 10_000,
        topics: [PUBSUB_PEER_DISCOVERY],
      }),
    ],
    services: {
      pubsub: gossipsub({
        allowPublishToZeroPeers: true, // Example option
      }),
      identify: identify(),
    },
  });

  libp2p.services.pubsub.subscribe(PUBSUB_AUDIO);
  libp2p.addEventListener("gossipsub:heartbeat", (event) => {
    console.log("gossipsub:heartbeat❤️", event);
  });

  // 👇 Dial peers discovered via pubsub
  libp2p.addEventListener("peer:discovery", async (evt) => {
    //   // Encapsulate the multiaddrs with the peer ID to ensure correct dialing
    //   // Should be fixed when https://github.com/libp2p/js-libp2p/issues/3239 is resolved.
    const maddrs = evt.detail.multiaddrs.map((ma) =>
      ma.encapsulate(`/p2p/${evt.detail.id.toString()}`)
    );
    console.log(
      `Discovered new peer (${evt.detail.id.toString()}). Dialling:`,
      maddrs.map((ma) => ma.toString())
    );
    try {
      await libp2p.dial(maddrs); // dial the new peer
    } catch (err) {
      console.error(`Failed to dial peer (${evt.detail.id.toString()}):`, err);
    }
  });
  return libp2p;
=======
   const libp2p = await createLibp2p({
      addresses: {
        listen: [
          // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
          "/p2p-circuit",
          // 👇 Listen for webRTC connection
          "/webrtc",
        ],
      },
      transports: [
        webSockets({
          // 允許所有WebSocket連接包括不帶TLS的
        }),
        webTransport(),
        webRTC({
          rtcConfiguration: {
            iceServers: [
              {
                // STUN servers help the browser discover its own public IPs
                urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:global.stun.twilio.com:3478",
                ],
              },
            ],
          },
        }),
        // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
        // 添加@libp2p/circuit-relay-v2-transport支持
        circuitRelayTransport({
          discoverRelays: 1,
        }),
      ],
      connectionEncrypters: [noise()],
      streamMuxers: [yamux()],
      connectionGater: {
        // Allow private addresses for local testing
        denyDialMultiaddr: async () => false,
      },
      peerDiscovery: [
        bootstrap({
          // add your relay multiaddr here ! and rerun this client code
          list: [
            "/ip4/127.0.0.1/tcp/9001/ws/p2p/12D3KooWPdfwEGo6xravnXWVvUXGKRJBrSKZVmmKjfh4ko1qh1vj",
          ],
        }),
        pubsubPeerDiscovery({
          interval: 10_000,
          topics: [PUBSUB_PEER_DISCOVERY],
        }),
      ],
      services: {
        pubsub: gossipsub({
          allowPublishToZeroPeers: true, // Example option
        }),
        identify: identify(),
      },
    });

    libp2p.services.pubsub.subscribe(PUBSUB_AUDIO)
libp2p.addEventListener('gossipsub:heartbeat', (event) => {
  console.log('gossipsub:heartbeat❤️', event)
})
  
    // 👇 Dial peers discovered via pubsub
    libp2p.addEventListener("peer:discovery", async (evt) => {
      //   // Encapsulate the multiaddrs with the peer ID to ensure correct dialing
      //   // Should be fixed when https://github.com/libp2p/js-libp2p/issues/3239 is resolved.
      const maddrs = evt.detail.multiaddrs.map((ma) =>
        ma.encapsulate(`/p2p/${evt.detail.id.toString()}`)
      );
      console.log(
        `Discovered new peer (${evt.detail.id.toString()}). Dialling:`,
        maddrs.map((ma) => ma.toString())
      );
      try {
        await libp2p.dial(maddrs); // dial the new peer
      } catch (err) {
        console.error(`Failed to dial peer (${evt.detail.id.toString()}):`, err);
      }
    });
  return libp2p; 
>>>>>>> develop
}
