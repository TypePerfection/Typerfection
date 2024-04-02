import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next"
import { Session } from 'inspector';
import { SessionProvider } from 'next-auth/react';
import { signOut, useSession } from 'next-auth/react';

//oof



export type TestText = {
    id: string;
    paragraph: string;
}

const row1 = [
    ['`', '~'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', '^'],
    ['7', '&'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+']
];

const row2 = [
    ['q'],
    ['w'],
    ['e'],
    ['r'],
    ['t'],
    ['y'],
    ['u'],
    ['i'],
    ['o'],
    ['p'],
    ['[', '{'],
    [']', '}']
];

const row3 = [
    ['a'],
    ['s'],
    ['d'],
    ['f'],
    ['g'],
    ['h'],
    ['j'],
    ['k'],
    ['l'],
    [';', ':'],
    ["'", '"'],
    ['\\', '|']
];

const row4 = [
    ['z'],
    ['x'],
    ['c'],
    ['v'],
    ['b'],
    ['n'],
    ['m'],
    [',', '<'],
    ['.', '>'],
    ['/', '?']
];

const row5 = [
    ['space'],
]



// these need to be global, so that Text, Row, and the Statistics functions can see them
let wordPos = 0
let charPos = 0

var completed = false

//statistics
var timeArray: any = []
//when a user presses a key, check if that is the right key. 
var accuracy: number[] = []
var alreadyWrong: boolean = false

var wpm = 0;
var accuracyPercent = 0

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const text = await prisma.testingText.findUnique({
        where: {
            id: String(params?.id),
        },
    });

    if (!text) {
        return {
            notFound: true, // Return a 404 page
        };
    }
    return {
        props: text,
    };
}

const App: React.FC<TestText> = (props) => {
    var text = props.paragraph
    var textArray: string[] = splitText(text)
    const { data: session, status } = useSession();

    const [pressedKeys, setPressedKeys] = useState([])

    //useEffect allows you to send changes through the DOM,
    //in this case, we are updating the pressedKeys array
    //which Row uses when it renders. 

    //The React DOM chooses when to update, based on updates it senses. 
    //While not explicetly stated, React DOM should update every time a key is pressed. 
    //Sometimes the DOM does not update when you tell it to, but our app should not have issues with that.
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (!pressedKeys.includes(key)) {
                setPressedKeys((prevPressedKeys) => [...prevPressedKeys, key])
                checkAccuracy(key)
            }
        };

        const handleKeyUp = (event) => {
            const { key } = event;
            setPressedKeys((prevPressedKeys) =>
                prevPressedKeys.filter(removeKey)
            );
            function removeKey(pressedKey: any) {
                pressedKey !== key
                pressedKey !== key.toUpperCase()
                pressedKey !== key.toLowerCase()
            }

        };

        function checkAccuracy(key: any) {
        let textArray: string[] = splitText(text)

            const specialKeys = ['Shift', 'CapsLock']
            if (!specialKeys.includes(key)) {
                if (textArray[wordPos][charPos] == key) {
                    accuracy.push(1)
                    alreadyWrong = false
                } else {
                    if (!alreadyWrong) {
                        alreadyWrong = true
                        accuracy.push(0)
                    }
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    let output = null
    if (!completed) {
        output = KeyboardDisplay(pressedKeys, text)
    } else {
        if(session){
            submitData(props.id, session.user?.email, aggregateAccruacy(), aggregateWPM())
        }
        output = EndScreen()
    }

    return (
        <Layout>
            {output}
        </Layout>
    )

    async function submitData (textId: string, userEmail: any, accuracy: any, wpm: any){
        try {
            const body = { textId, userEmail, accuracy, wpm };
            await fetch('/api/completed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            // await Router.push('/drafts');
          } catch (error) {
            console.error(error);
          }

    }
}



function splitText(inputText: string) {
    return inputText.split(' ').map(word => word + ' ')
}

function changeWord(text) {
    const time = Date.now()
    timeArray.push(time)
    let textArray: string[] = splitText(text)

    if (wordPos + 1 < textArray.length) {
        charPos = 0
        wordPos++
        wpm = aggregateWPM()
        accuracyPercent = aggregateAccruacy()
    } else {
        completed = true
    }
}

function aggregateAccruacy() {
    let falseCounter = accuracy.filter(item => item == 0).length
    let trueCounter = accuracy.filter(item => item == 1).length

    return ((1 - falseCounter / trueCounter) * 100).toFixed(2)
}

function aggregateWPM() {
    let diffArray = []
    let msAverage = 0

    // i = 1 so that we skip the first item in diffarray
    //I used a for loop insead of the filter or map methods because I need the current index
    for (let i = 1; i < timeArray.length; i++) {
        //find the 
        diffArray.push(timeArray[i] - timeArray[i - 1])

    }

    //inline average the values in diffArray
    // I felt smart when I wrote this leet code lookin code, ok?
    diffArray.filter(item => msAverage += item / diffArray.length)

    return (60 / (msAverage / 1000)).toFixed(2)
}

//components
function Text({ inputText, pressedKeys }: { inputText: string, pressedKeys: never[] }) {
    let textArray: string[] = splitText(inputText)
    let output: React.JSX.Element[] = []

    if (pressedKeys.includes(textArray[wordPos][charPos])) {
        if (charPos < textArray[wordPos].length - 1) {
            charPos++
        } else {
            changeWord(inputText)
        }
    }

    for (let i = 0; i < textArray.length; i++) {
        if (i == wordPos) {
            let loopOutput: React.JSX.Element[] = []
            for (let j = 0; j < textArray[i].length; j++) {
                if (j == charPos) {
                    if (alreadyWrong == true) {
                        loopOutput.push(<div className='bg-red-300'>{textArray[i][j]}</div>)

                    } else {
                        loopOutput.push(<div className='bg-blue-300'>{textArray[i][j]}</div>)
                    }
                } else {
                    loopOutput.push(<div className='bg-gray-200'>{textArray[i][j]}</div>)
                }
            }
            output.push(loopOutput)
        } else {
            for (let j = 0; j < textArray[i].length; j++) {
                output.push(<div className=''>{textArray[i][j]}</div>)
            }
        }
    }
    return (
        <div className='flex flex-wrap whitespace-break-spaces max-w-7xl mx-auto'>
            {output}
        </div>
    )
}

function Row({ list, pressedKeys, inputText }: { list: string[][], pressedKeys: never[], inputText: string }) {
    let keys = []
    let textArray = splitText(inputText)

    function Key({ color = '', item }) {
        const colorsList = [
            ['', "rounded-md w-10 border border-1 border-gray-400 bg-gray-200"],
            ["red", "rounded-md w-10 border border-1 border-gray-400 bg-red-300"],
            ["blue", "rounded-md w-10 border border-1 border-gray-400 bg-blue-300"],
            ["green", "rounded-md w-10 border border-1 border-gray-400 bg-green-300"],
        ]
        var cssTemplate = ""

        for (const item of colorsList) {
            if (item[0] == color) {
                cssTemplate = item[1]
            }
        }

        return (
            <div key={item[0]} className={cssTemplate}>
                <div className='flex justify-end'>
                    {item[1]}
                </div>

                <div className='pl-1'>
                    {item[0]}
                </div>
            </div>
        )
    }

    for (let item of list) {
        if ((pressedKeys.includes(item[0]) || pressedKeys.includes(item[0].toUpperCase()) || pressedKeys.includes(item[0].toLowerCase() || pressedKeys.includes(item[1])) && item.includes(textArray[wordPos][charPos]))) {
            keys.push(
                <Key color={"blue"} item={item} />
            )
        } else if (item.includes(textArray[wordPos][charPos]) || item.includes(textArray[wordPos][charPos].toLowerCase())) {
            keys.push(
                <Key color={"green"} item={item} />
            )
        } else {
            keys.push(
                <Key item={item} />

            )
        }
    }
    return (

        <div className='flex gap-2 mx-auto'>
            {keys}
        </div>

    )

}
function SpaceRow({ list, pressedKeys, inputText }: { list: string[][], pressedKeys: never[], inputText: string }) {
    let keys = []
    let textArray = splitText(inputText)

    function Key({ color = '', item }) {
        const colorsList = [
            ['', "rounded-md w-10 border border-1 border-gray-400 bg-gray-200 w-40 text-center"],
            ["red", "rounded-md w-10 border border-1 border-gray-400 bg-red-300 w-40 text-center"],
            ["blue", "rounded-md w-10 border border-1 border-gray-400 bg-blue-300 w-40 text-center"],
            ["green", "rounded-md w-10 border border-1 border-gray-400 bg-green-300 w-40 text-center"],
        ]
        var cssTemplate = ""

        for (const item of colorsList) {
            if (item[0] == color) {
                cssTemplate = item[1]
            }
        }

        return (
            <div key={item[0]} className={cssTemplate}>
                <div className='flex justify-end'>
                    {item[1]}
                </div>

                <div className='pl-1'>
                    {item[0]}
                </div>
            </div>
        )
    }

    for (let item of list) {
        if ((pressedKeys.includes(item[0]) || pressedKeys.includes(item[0].toUpperCase()) || pressedKeys.includes(item[0].toLowerCase() || pressedKeys.includes(item[1])) && item.includes(textArray[wordPos][charPos]))) {
            keys.push(
                <Key color={"blue"} item={item} />
            )
        } else if (item.includes(textArray[wordPos][charPos]) || item.includes(textArray[wordPos][charPos].toLowerCase())) {
            keys.push(
                <Key color={"green"} item={item} />
            )
        } else {
            keys.push(
                <Key item={item} />

            )
        }
    }
    return (

        <div className='flex gap-2 mx-auto'>
            {keys}
        </div>

    )

}

function KeyboardDisplay(pressedKeys: never[], text:string) {
    return (
        <div className='mt-20'>
            <div>
            </div>
            <div className='whitespace-pre-wrap bg-gray-200 p-5 mb-5 w-3/4 mx-auto rounded-md border border-gray-300'>
                <Text inputText={text} pressedKeys={pressedKeys}/>
                <div className='pt-2 flex gap-2'>
                    <div>
                        WPM: {wpm}

                    </div>
                    <div>
                        Accuracy: {accuracyPercent}
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto p-auto'>
                <div className='mx-auto flex justify-center'>
                    <Row list={row1} pressedKeys={pressedKeys} inputText={text} />
                </div>
                <div className='mx-auto flex justify-center pt-1'>
                    <Row list={row2} pressedKeys={pressedKeys} inputText={text} />
                </div>
                <div className='mx-auto flex justify-center pt-1'>
                    <Row list={row3} pressedKeys={pressedKeys} inputText={text} />
                </div>
                <div className='mx-auto flex justify-center pt-1'>
                    <Row list={row4} pressedKeys={pressedKeys} inputText={text} />
                </div>
                <div className='mx-auto flex justify-center pt-1'>
                    <SpaceRow list={row5} pressedKeys={pressedKeys} inputText={text} />
                </div>
            </div>
        </div>
    )
}

function EndScreen() {
    const accuracyPercentage = aggregateAccruacy()
    const accuracyData = accuracy.map(item => (<div key={item}>{item}</div>))

    const wpmAverage = aggregateWPM()
    const router = useRouter()
    function reload() {
        router.reload()
    }

    

    return (
        <div>
            <div>
                Level Completed
            </div>

            <div>
                <div>
                    Accuracy: {accuracyPercentage}%
                </div>
                <div>
                    Average WPM: {wpmAverage}
                </div>
                <div className='m-1'>
                    <button onClick={reload} className='bg-sky-950 text-white flex justify-center items-center rounded outline outline-1 outline-white p-1'>Retry</button>
                </div>
            </div>
        </div>
    )
}
export default App
