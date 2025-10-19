import { createLibp2p } from 'libp2p'
import { webRTC } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { bootstrap } from '@libp2p/bootstrap'
import identifyService from '@libp2p/identify'
import Gossipsub from '@chainsafe/libp2p-gossipsub'

export async function createPeer() {
  const node = await createLibp2p({
    transports: [webRTC(), webSockets(), circuitRelayTransport()],
    streamMuxers: [yamux()],
    connectionEncryption: [noise()],
    pubsub: new Gossipsub(),
    services: { identify: identifyService() },
    peerDiscovery: [
      bootstrap({
        list: [
          '/ip4/127.0.0.1/tcp/51339/ws/p2p/12D3KooWQsKt2A9aBQKhjZuwSQZnuNvkySSXB91YqZjbDWRpvRPw'
        ]
      })
    ],
    relay: { enabled: true }
  })

  await node.start()
  console.log('📡 Browser libp2p started:', node.peerId.toString())
  return node
}

