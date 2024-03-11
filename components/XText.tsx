function XText({defaultText}){
    return(
        <div>
            <input type="text" placeholder={defaultText} className="disabled:bg-gray-200 block p-2 border border-gray-300 rounded-md focus:border-gray-300 focus:ring focus:ring-gray-200 sm:text-sm sm:leading-5"></input>
        </div>
    )
}

export default XText;