import React from 'react'
import Feed from './Feed'
//useStoreState: allowing you to use or call state from store
import { useStoreState } from 'easy-peasy'

const Home = ({ fetchError, isLoading }) => {
    const searchResults = useStoreState(state => state.searchResults)
    return (
        <main className='mt-3 overflow-y-auto' style={{maxHeight: '80vh'}}>
            {isLoading ? <div className="d-flex justify-content-center mt-5 pt-5">
                            <div className="spinner-grow me-2" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow me-2" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow me-2" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> 
                         </div>
                : fetchError ? <p className='fs-5 text-center text-danger'>{fetchError}</p> 
                    : searchResults.length ? (<Feed posts={searchResults}/>) 
                        : (<p className='text-center'>No posts to display...</p>)
            }
        </main>
    )
}

export default Home