// import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SnappyHTTPClient} from "./lib/SnappyHTTPClient.ts";
import {SnappySocketClient} from "./lib/SnappySocketClient.ts";
import {ISnappySocketClient} from "./lib/ISnappySocketClient.ts";
import {Message} from "./lib/models";


function App() {
    // const [count, setCount] = useState(0)
    const snappy = new SnappyHTTPClient("http://16.171.151.193:8001")
    const snappySocket = new SnappySocketClient("http://localhost:3308", "c9248b89-00b1-4c24-8678-c2ed923c83a1", "ext1")

    const client: ISnappySocketClient = {
        onConnect: () => {
            // setCount(count + 1)
            console.log("Connected")
        },
        newConnectionListener: (user: string) => {
            console.log("new connection \nuser -> ", user)
        },
        newDisconnectionListener: (user: string) => {
            console.log("new disconnection  \nuser -> ", user)
        },
        onDisconnect: () => {
            // setCount(count - 1)
        },
        onMessageReceivedListener: (message: Message) => {
            console.log("message received")
            console.log(message)
        }

    }
    snappySocket.initialize(client)

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={async () => console.log(await snappy.createOrganization({
                    "name": "org17",
                    "email": "string@string.com",
                    "password": "password"
                }))}>
                    {/*count is {count}*/}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
