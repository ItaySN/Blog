import React,{Suspense, useState,lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import ErrorBoundary from './components/ErrorBoundary'
import Card from 'react-bootstrap/Card'
const Form = lazy(()=> import('./components/Form'));
const Comment = lazy(()=> import('./components/Comment'));



function App() {
  const [commentsArray,setCommentsArray] = useState([]);

  const addComment = (comment) =>{
    setCommentsArray(prev=>[comment,...prev])
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <div>
          <Post/>
        </div>
        <div className="displayPost">
          <Suspense fallback={<h1>Loading...</h1>}>
            <h1>Comments:</h1>
            {
              commentsArray.length > 0 ?
              commentsArray.map(comment=>{
                return <Comment comment = {comment}/>
              })
              : <p>Be the first to comment ! </p>
            }
          </Suspense>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Form addComment = {addComment} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
