import React, { useState, useEffect } from 'react';

const text = "Bacon ipsum dolor amet picanha ut duis minim ea, proident in short loin sint fugiat alcatra do ball tip labore. Cupim ham hock short loin ground round sed irure, pork chop minim porchetta voluptate. Nostrud consectetur ham culpa id tri-tip turducken ribeye magna reprehenderit velit meatloaf beef. Do nisi in doner porchetta aute, ullamco tri-tip kielbasa picanha."

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

// these need to be global, so that both Text and Row can see them
let wordPos = 0
let charPos = 0


const app = () => {

    const [pressedKeys, setPressedKeys] = useState([])

    //useEffect allows you to send changes through the DOM,
    //in this case, we are updating the pressedKeys array
    //which Row uses when it renders. 

    //The React DOM chooses when to update, based on updates it senses. 
    //While not explicetly stated, React DOM should update every time a key is pressed. 
    //Sometimes the DOM does not update when you tell it to, but our app should not have issues with that.

    //TODO There is a bug where pressing a key then pressing shift or caps lock does not remove that key from pressedKeys
    //TODO      The solution to this might be to make pressedKeys store/check input using the pairs I list above.
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (!pressedKeys.includes(key)) {
                setPressedKeys((prevPressedKeys) => [...prevPressedKeys, key]);
            }
        };

        const handleKeyUp = (event) => {
            const { key } = event;
            setPressedKeys((prevPressedKeys) =>
                prevPressedKeys.filter((pressedKey) => pressedKey !== key)
            );
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    return (
        <div>
            <div className='whitespace-pre-wrap'>
                <Text inputText={text} pressedKeys={pressedKeys} />
            </div>

            <div>
                <Row list={row1} pressedKeys={pressedKeys} />
                <Row list={row2} pressedKeys={pressedKeys} />
                <Row list={row3} pressedKeys={pressedKeys} />
                <Row list={row4} pressedKeys={pressedKeys} />
            </div>
        </div>
    )
}

//? The plan
// Split the words up, with snetence ends keeping their punctuation as part of their "word", and a space.
// Keep track of which word the user is on, then use the cursorPos to track which char they are on.
// When a word is done, move the cursor to the next word, 

function Text({ inputText, pressedKeys }: { inputText: string, pressedKeys: never[] }) {
    let splitText: string[] = inputText.split(' ').map(word => word + ' ')
    let output: React.JSX.Element[] = []

    if(pressedKeys.includes(splitText[wordPos][charPos])){
        if(charPos < splitText[wordPos].length - 1){
            charPos++
        }else{
            charPos = 0
            wordPos++
        }
    }
    
    for (let i = 0; i < splitText.length; i++) {
        if(i == wordPos){
            let loopOutput: React.JSX.Element[] = []
            for(let j = 0; j < splitText[i].length; j++){
                if(j == charPos){
                    loopOutput.push(<div className='bg-blue-300'>{splitText[i][j]}</div>)
                }else{
                    loopOutput.push(<div className='bg-gray-200'>{splitText[i][j]}</div>)
                }
            }
            output.push(loopOutput)
        }else{
            for(let j = 0; j < splitText[i].length; j++){
                output.push(<div className=''>{splitText[i][j]}</div>)
            }
        }
    }
    return (
        <div className='flex flex-wrap whitespace-break-spaces w-full'>
            {output}
        </div>
    )
}

// TODO Restyle this, it looks like trash (I want to get the logic down rn)

function Row({ list, pressedKeys }: { list: string[][], pressedKeys: never[] }) {
    let keys = []

    for (let item of list) {
        if (pressedKeys.includes(item[0]) || pressedKeys.includes(item[0].toUpperCase()) || pressedKeys.includes(item[1])) {
            keys.push(
                <div key={item[0]} className='rounded-md w-10 border border-1  bg-green-500'>
                    <div className='flex justify-end'>
                        {item[1]}
                    </div>

                    <div className='m-auto'>
                        {item[0]}
                    </div>
                </div>
            )
        } else {
            keys.push(
                <div key={item[0]} className='w-10 border border-1'>
                    <div className='flex justify-end'>
                        {item[1]}
                    </div>

                    <div className='m-auto'>
                        {item[0]}
                    </div>
                </div>
            )
        }
        // else if(){

        // }else if(){

        // }
    }


    return (
        <div className='flex gap-2'>
            {keys}
        </div>
    )

}
export default app
