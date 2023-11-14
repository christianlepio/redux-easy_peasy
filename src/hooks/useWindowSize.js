import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth, 
                height: window.innerHeight
            })
        }

        handleResize()

        //when window change its size then call function handleResize
        window.addEventListener("resize", handleResize)

        //clean up, remove event listener for window resize
        return () => window.removeEventListener("resize", handleResize)

    }, [])

    //return windowSize value to use in other component
    return windowSize
}

export default useWindowSize