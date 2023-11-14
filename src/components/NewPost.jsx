import React from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
//useStoreState: allowing you to use or call state from store
//useStoreActions: allowing you to use or call function from store
import { useStoreState, useStoreActions } from 'easy-peasy'

const NewPost = () => {
    //to navigate what page to land after a certain process
    const navigate = useNavigate() 

    //get state variables from store
    const { posts, postTitle, postBody } = useStoreState(state => state)

    //get function from store
    const { savePost, setPostTitle, setPostBody } = useStoreActions(actions => actions)

    const handleSubmit = (e) => {
        e.preventDefault()

        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {
            id, 
            title: postTitle, 
            datetime: dateTime, 
            body: postBody
        }

        savePost(newPost)
        navigate('/react-router_v2/')
    }

    return (
        <main className='mt-3'>
            <h2 className='text-center mb-3'>New Post</h2>
            <form className='mt-5 mx-4' onSubmit={handleSubmit}>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-6">
                        <label htmlFor="titleInput" className="form-label">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="titleInput" 
                            placeholder="Title" 
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-6">
                        <label htmlFor="bodyInput" className="form-label">Post</label>
                        <textarea 
                            className="form-control" 
                            id="bodyInput" 
                            rows="4"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)} 
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-6">
                        <button type='submit' className='btn btn-success'>Submit</button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default NewPost