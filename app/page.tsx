


//! INSTALL BETTER COMMENTS EXTENSION
// TODO will highlight various comments for better readability

// Allows us to use interactions with the user. 
'use client';

// we need to import the image template from the Next library
import Image from "next/image";
import { useState } from 'react';

// Create a string with the location of the image we want to use.
// It will default to the public library for its path root.
const image = "/byui.png";

//List of name data for recursion function
const list = [
    { id:1, Fname: 'Ethan', Lname: 'Chalupa' },
    { id:2, Fname: 'Dawson', Lname: 'Bauman' },
    { id:3, Fname: 'Derek', Lname: 'Ludlow' },
    { id:4, Fname: 'Rylan', Lname: 'Jurgens' },
]

//This is what the the site will load when the URL is called.
//"export default function" gives it that property.
//the function name does not matter, in this case it is 'Page'
export default function Page() {
    //we could run JS logic here before the return.

    //return the HTML that we want to render. We need can only have one top level tag
    //The top level tag here is main, and it is around everything else.
    return (
        //use Tailwind css to style page div
        <main className="bg-black text-white h-screen">


            <h1>Working website test</h1>

            {/* import template My button from below */}
            <Mybutton />


            {/* Style with Tailwind CSS to center */}
            <div className="text-green-500 border-2 border-white mt-2 flex justify-center">
                <div>
                    <h1 className="text-lg">Group List</h1>
                    <div className="pt-2">
                        <GroupList />
                    </div>
                </div>
            </div>

            {/* A different group list with the conditional to make Ethan's name blue */}
            <ColorGroupList/>

            {/* Add BYU-I logo */}
            <div className="flex justify-center">
                <Image
                    className="pt-2 bg-black"
                    src={image}
                    alt="BYUI logo"
                    width={80}
                    height={80}
                    priority
                />
            </div>

        </main>
    );
}

//! Below are components. We can call them in the main function as many times as we want and they will return a bit of HTML

function GroupList() {
    // the map method is a fancy for loop-ish thing that returns an array with the data provided after the '=>'
    const group = list.map(person =>
        <li key={person.id}>
            {person.Lname},{person.Fname}
        </li>
    )
    return (
        <ul>{group}</ul>
    )

}

function ColorGroupList(){
    const group =[];
    for(const person of list){
        if(person.id == 1){
            group.push(
                <li className="text-blue-400" key={person.id}>
                    {person.Lname},{person.Fname}
                </li>
            );
        } else{
            group.push(
                <li>
                    {person.Lname},{person.Fname}
                </li>
            );
        }
    }
    return (
        <ul>{group}</ul>
    )
}

function Mybutton() {
    const [count, setCount] = useState(0);
    function handleClick(){
        setCount(count + 1);
    }

    return (
        <button className="border-white border-2 bg-slate-500" onClick={handleClick}>{count} times clicked</button>
    );
}