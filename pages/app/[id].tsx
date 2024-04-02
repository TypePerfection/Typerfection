import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { Session } from 'inspector';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

// Types
export interface TestText {
    id: string;
    paragraph: string;
}

const row1: Array<[string, string]> = [
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

const row2: Array<[string] | [string, string]> = [
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

const row3: Array<[string] | [string, string]> = [
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

const row4: Array<[string] | [string, string]> = [
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

const row5: Array<[string]> = [
    ['space'],
];

// Global variables
let wordPos = 0;
let charPos = 0;
let completed = false;
let timeArray: number[] = [];
let accuracy: number[] = [];
let alreadyWrong = false;
let wpm = 0;
let accuracyPercent = 0;

// Server-side props
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const text = await prisma.testingText.findUnique({
        where: {
            id: String(params?.id),
        },
    });

    if (!text) {
        return {
            notFound: true,
        };
    }

    return {
        props: text,
    };
};

// Main Component
const App: React.FC<TestText> = (props) => {
    const text = props.paragraph;
    const textArray: string[] = splitText(text);
    const { data: session, status } = useSession();

    const [pressedKeys, setPressedKeys] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            if (!pressedKeys.includes(key)) {
                setPressedKeys((prevPressedKeys) => [...prevPressedKeys, key]);
                checkAccuracy(key);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const { key } = event;
            setPressedKeys((prevPressedKeys) =>
                prevPressedKeys.filter((pressedKey) => pressedKey !== key)
            );
        };

        function checkAccuracy(key: string) {
            const specialKeys = ['Shift', 'CapsLock'];
            if (!specialKeys.includes(key)) {
                if (textArray[wordPos][charPos] === key) {
                    accuracy.push(1);
                    alreadyWrong = false;
                } else {
                    if (!alreadyWrong) {
                        alreadyWrong = true;
                        accuracy.push(0);
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

    let output = null;
    if (!completed) {
        output = KeyboardDisplay(pressedKeys, text);
    } else {
        if (session) {
            submitData(props.id, session.user?.email, aggregateAccruacy(), aggregateWPM());
        }
        output = EndScreen();
    }

    return (
        <Layout>
            {output}
        </Layout>
    );

    async function submitData(textId: string, userEmail: string | undefined, accuracy: number, wpm: number) {
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
};

// Utility Functions
function splitText(inputText: string): string[] {
    return inputText.split(' ').map(word => word + ' ');
}

function changeWord(text: string) {
    const time = Date.now();
    timeArray.push(time);
    const textArray: string[] = splitText(text);

    if (wordPos + 1 < textArray.length) {
        charPos = 0;
        wordPos++;
        wpm = aggregateWPM();
        accuracyPercent = aggregateAccruacy();
    } else {
        completed = true;
    }
}

function aggregateAccruacy(): number {
    const falseCounter: number = accuracy.filter(item => item === 0).length;
    const trueCounter: number = accuracy.filter(item => item === 1).length;

    return Number(((1 - falseCounter / trueCounter) * 100).toFixed(2));
}

function aggregateWPM(): number {
    const diffArray: number[] = [];
    let msAverage = 0;

    for (let i = 1; i < timeArray.length; i++) {
        diffArray.push(timeArray[i] - timeArray[i - 1]);
    }

    diffArray.forEach(item => msAverage += item / diffArray.length);

    return Number((60 / (msAverage / 1000)).toFixed(2))
}

// Components
function Text({ inputText, pressedKeys }: { inputText: string, pressedKeys: string[] }): JSX.Element {
    const textArray: string[] = splitText(inputText);
    let output: JSX.Element[] = [];

    if (pressedKeys.includes(textArray[wordPos][charPos])) {
        if (charPos < textArray[wordPos].length - 1) {
            charPos++;
        } else {
            changeWord(inputText);
        }
    }

    for (let i = 0; i < textArray.length; i++) {
        if (i === wordPos) {
            let loopOutput: JSX.Element[] = [];
            for (let j = 0; j < textArray[i].length; j++) {
                if (j === charPos) {
                    loopOutput.push(<div className={alreadyWrong ? 'bg-red-300' : 'bg-blue-300'} key={j}>{textArray[i][j]}</div>);
                } else {
                    loopOutput.push(<div className='bg-gray-200' key={j}>{textArray[i][j]}</div>);
                }
            }
            output.push(<div className='flex whitespace-pre-wrap' key={i}>{loopOutput}</div>);
        } else {
            for (let j = 0; j < textArray[i].length; j++) {
                output.push(<div className='bg-gray-200' key={`${i}-${j}`}>{textArray[i][j]}</div>);
            }
        }
    }
    return (
        <div className='flex flex-wrap whitespace-break-spaces max-w-7xl mx-auto'>
            {output}
        </div>
    );
}

function Row({ list, pressedKeys, inputText }: { list: string[][], pressedKeys: string[], inputText: string }): JSX.Element {
    const keys: JSX.Element[] = [];
    const textArray = splitText(inputText);

    const Key = ({ color = '', item }: { color?: string, item: string[] }) => {
        const colorsList: [string, string][] = [
            ['', "rounded-md w-10 border border-1 border-gray-400 bg-gray-200"],
            ["red", "rounded-md w-10 border border-1 border-gray-400 bg-red-300"],
            ["blue", "rounded-md w-10 border border-1 border-gray-400 bg-blue-300"],
            ["green", "rounded-md w-10 border border-1 border-gray-400 bg-green-300"],
        ];
        let cssTemplate = "";

        colorsList.forEach((colorItem) => {
            if (colorItem[0] === color) {
                cssTemplate = colorItem[1];
            }
        });

        return (
            <div key={item[0]} className={cssTemplate}>
                <div className='flex justify-end'>
                    {item[1]}
                </div>
                <div className='pl-1'>
                    {item[0]}
                </div>
            </div>
        );
    };

    for (let item of list) {
        if (pressedKeys.includes(item[0]) || pressedKeys.includes(item[0].toUpperCase()) || pressedKeys.includes(item[0].toLowerCase()) || pressedKeys.includes(item[1])) {
            keys.push(
                <Key color={"blue"} item={item} key={item[0]} />
            );
        } else if (item.includes(textArray[wordPos][charPos]) || item.includes(textArray[wordPos][charPos].toLowerCase())) {
            keys.push(
                <Key color={"green"} item={item} key={item[0]} />
            );
        } else {
            keys.push(
                <Key item={item} key={item[0]} />
            );
        }
    }
    return (
        <div className='flex gap-2 mx-auto'>
            {keys}
        </div>
    );
}

function SpaceRow({ list, pressedKeys, inputText }: { list: string[][], pressedKeys: string[], inputText: string }): JSX.Element {
    const keys: JSX.Element[] = [];
    const textArray = splitText(inputText);

    const Key = ({ color = '', item }: { color?: string, item: string[] }) => {
        const colorsList: [string, string][] = [
            ['', "rounded-md w-10 border border-1 border-gray-400 bg-gray-200 w-40 text-center"],
            ["red", "rounded-md w-10 border border-1 border-gray-400 bg-red-300 w-40 text-center"],
            ["blue", "rounded-md w-10 border border-1 border-gray-400 bg-blue-300 w-40 text-center"],
            ["green", "rounded-md w-10 border border-1 border-gray-400 bg-green-300 w-40 text-center"],
        ];
        let cssTemplate = "";

        colorsList.forEach((colorItem) => {
            if (colorItem[0] === color) {
                cssTemplate = colorItem[1];
            }
        });

        return (
            <div key={item[0]} className={cssTemplate}>
                <div className='flex justify-end'>
                    {item[1]}
                </div>
                <div className='pl-1'>
                    {item[0]}
                </div>
            </div>
        );
    };

    for (let item of list) {
        if (pressedKeys.includes(item[0]) || pressedKeys.includes(item[0].toUpperCase()) || pressedKeys.includes(item[0].toLowerCase()) || pressedKeys.includes(item[1])) {
            keys.push(
                <Key color={"blue"} item={item} key={item[0]} />
            );
        } else if (item.includes(textArray[wordPos][charPos]) || item.includes(textArray[wordPos][charPos].toLowerCase())) {
            keys.push(
                <Key color={"green"} item={item} key={item[0]} />
            );
        } else {
            keys.push(
                <Key item={item} key={item[0]} />
            );
        }
    }
    return (
        <div className='flex gap-2 mx-auto'>
            {keys}
        </div>
    );
}

function KeyboardDisplay(pressedKeys: string[], text: string): JSX.Element {
    return (
        <div className='mt-20'>
            <div className='whitespace-pre-wrap bg-gray-200 p-5 mb-5 w-3/4 mx-auto rounded-md border border-gray-300'>
                <Text inputText={text} pressedKeys={pressedKeys} />
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
    );
}

function EndScreen(): JSX.Element {
    const accuracyPercentage = aggregateAccruacy();
    const wpmAverage = aggregateWPM();
    const router = useRouter();

    const reload = () => {
        router.reload();
    };

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
    );
}

export default App;