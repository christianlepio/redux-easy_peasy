import React, { useEffect } from 'react'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'
//custom react hooks
import useAxiosFetch from '../hooks/useAxiosFetch'
//this hook allows you to call function from store
import { useStoreActions } from 'easy-peasy'

const AppRoutes = () => {
    //get variable from custom react hooks
    const { data, fetchError, isLoading } = useAxiosFetch('/posts')
    //get function from store
    const setPosts = useStoreActions(actions => actions.setPosts)

    useEffect(() => {
        //get blog posts
        setPosts(data)
    }, [data, setPosts])

    return (
        <>
            <Routes>
                <Route path='/react-router_v2/' element={<Layout />}
                >
                    //index keyword means this is the default page of Layout.
                    <Route index element={<Home 
                        fetchError={fetchError}
                        isLoading={isLoading}
                    />}
                    /> 

                    //nested routing
                    //index keyword means this is the default page of Layout.
                    <Route path='/react-router_v2/post'> 

                        <Route index element={<NewPost />} />

                        <Route path='edit/:id' element={<EditPost />} />

                        <Route path=':id' element={<PostPage />} />

                    </Route>

                    <Route path='/react-router_v2/about' element={<About />} />

                    <Route path='/react-router_v2/*' element={<Missing />} />
                </Route>
            </Routes> 
        </>
    )
}

export default AppRoutes