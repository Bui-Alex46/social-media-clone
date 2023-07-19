import React, {useState, useEffect} from "react";


const Practice = () => {
    const [count, setCount] = useState(0);

    
    
    return (
        <div>
            < h1> updated count {count} </h1>
            <button type = "button" onClick = {() => setCount(count + 1)}></button>
        </div>
    )
}

export default Practice