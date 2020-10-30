import React,{Suspense, useState,lazy, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import ErrorBoundary from './components/ErrorBoundary'
import track from './analytics/analyticsManeger'
import {useHistory} from 'react-router-dom';


const Form = lazy(()=> import('./components/Form'));
const Comment = lazy(()=> import('./components/Comment'));

// const handleSaveToPC = (jsonData,filename) => {
//   const fileData = JSON.stringify(jsonData);
//   const blob = new Blob([fileData], {type: "text/plain"});
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.download = `${filename}.json`;
//   link.href = url;
//   link.click();
// }


function App() {
  const [commentsArray,setCommentsArray] = useState([]);
  const history = useHistory();

  useEffect(()=>{
   track('URL has changed')
  },[history])

  useEffect(()=>{
    track("app lunch")
  },[])

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
