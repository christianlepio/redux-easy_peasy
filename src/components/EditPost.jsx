import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
//useStoreState: allowing you to use or call state from store
//useStoreActions: allowing you to use or call function from store
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {
    //to navigate what page to land after a certain process
    const navigate = useNavigate()
    //get id parameter from url
    const { id } = useParams()

    //get state variables from store
    const { editTitle, editBody, getPostById } = useStoreState(state => state)

    //get function from store
    const { editPost, setEditTitle, setEditBody } = useStoreActions(actions => actions)

    const post = getPostById(id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = { 
            id, 
            title: editTitle, 
            datetime: dateTime, 
            body: editBody 
        }

        editPost(updatedPost)
        navigate('/react-router_v2/')
    }

    return (
        <main className='mt-3 px-2'>
            {post ? 
                <>
                    <h2 className='text-center mb-3'>Edit Post</h2>
                    <form className='mt-5 mx-4' onSubmit={(e) => e.preventDefault()}>
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="editTitleInput" 
                                    placeholder="Title" 
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6">
                                <label htmlFor="bodyInput" className="form-label">Post</label>
                                <textarea 
                                    className="form-control" 
                                    id="editBodyInput" 
                                    rows="4"
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)} 
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6">
                                <button 
                                    type='button' 
                                    className='btn btn-success'
                                    onClick={() => handleEdit(post.id)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </> 
                : 
                <article className='p-2 m-2 border rounded-3'>
                    <h2>Post not found!</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/react-router_v2/'>
                            Back to home page
                        </Link>
                    </p>
                </article>
            }
        </main>
    )
}

export default EditPost