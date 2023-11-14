import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api/posts'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null) 
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        //this is true, meaning component successfully renders
        let isMounted = true 
        //create cancel token object
        const source = axios.CancelToken.source()

        const fetchData = async (url) => {
            setIsLoading(true)

            try {
                //get blogs
                //this can be axios.get 
                const response = await api.get(url, {
                    cancelToken: source.token
                })

                if (isMounted) {
                    setData(response.data) 
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message) 
                    setData([])
                }
            } finally {
                isMounted ? setTimeout( () => setIsLoading(false), 2000) : null
            }
        }

        fetchData(dataUrl)

        const cleanUp = () => {
            isMounted = false
            source.cancel() //cancel the request if component failed to load
        }

        return cleanUp

    }, [dataUrl])

    //return reusable variables
    return { data, fetchError, isLoading }
}

export default useAxiosFetch