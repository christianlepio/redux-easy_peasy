import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
//useStoreState: allowing you to use or call state from store
//useStoreActions: allowing you to use or call function from store
import { useStoreState, useStoreActions } from 'easy-peasy'

const PostPage = () => {
    //to navigate what page to land after a certain process
    const navigate = useNavigate()
    //destructuring, get id value from parameter using useParams()
    const { id } = useParams() 

    //get state variables from store
    const { getPostById } = useStoreState(state => state)
    //get function from store
    const { deletePost } = useStoreActions(actions => actions)

    const post = getPostById(id)

    const handleDelete = (id) => {
        deletePost(id)
        navigate('/react-router_v2/')
    }

    return (
        <main className='mt-4 px-2'>
            <article className='p-2 m-2 border rounded-3'>
                {post ? 
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.datetime}</p>
                        <p>{post.body}</p>
                        <Link to={`/react-router_v2/post/edit/${post.id}`}>
                            <button className="btn btn-warning me-2">Edit post</button>
                        </Link>
                        <button className='btn btn-danger' onClick={() => handleDelete(post.id)}>
                            Delete post
                        </button>
                    </> 
                : 
                    <>
                        <h2>Post not found!</h2>
                        <p>Well, that's disappointing</p>
                        <p>
                            <Link to='/react-router_v2/'>
                                Back to home page
                            </Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage