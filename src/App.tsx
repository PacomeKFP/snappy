// import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SnappyHTTPClient} from "./lib/SnappyHTTPClient.ts";
import {SnappySocketClient} from "./lib/SnappySocketClient.ts";
import {ISnappySocketClient} from "./lib/ISnappySocketClient.ts";
import {CreateChatbotDtoLanguageModelEnum, Message} from "./lib/models";


function App() {
    // const [count, setCount] = useState(0)
    const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
    const snappySocket = new SnappySocketClient("http://88.198.150.195:8614", "c9248b89-00b1-4c24-8678-c2ed923c83a1", "ext1")

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
                <button onClick={async () => console.log(await snappy.createChatbot(    {
                    "label": "The Real Chatbot",
                    "prompt": "Make it as simple as possible",
                    "projectId": "81997082-7e88-464a-9af1-b790fdd454f8",
                    "description": "string",
                    "languageModel": CreateChatbotDtoLanguageModelEnum.MISTRAL
                }))}>
                    Button
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
