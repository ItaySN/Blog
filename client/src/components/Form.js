import React, {useEffect, useRef, lazy, Suspense,useState} from 'react';
import './Form.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  track  from '../analytics/analyticsManeger';


function Form({addComment}) {
    const userInput = useRef()
    const titleInput = useRef();
    const commentInput = useRef();
    const submitButton = useRef();
    

    // const [titleInput, setTitleInput] = useState('');
    const [userName, setUserName] = useState('');
    const [title,setTitle] = useState('')
    const [comment,setComment] = useState('')
    // const [commentsArray, setCommentsArray] = useState([]);
    
    const dateToDisplay = (date) => {
    const displayDate = `${date.getFullYear()}-${
      (`0${date.getMonth() + 1}`).slice(-2)}-${
      (`0${date.getDate()}`).slice(-2)} ${
      (`0${date.getHours()}`).slice(-2)}:${
      (`0${date.getMinutes()}`).slice(-2)}:${
      (`0${date.getSeconds()}`).slice(-2)}`;
    return displayDate;
  };


    const focusTitle = (e) => {
        if(e.key === 'Enter')
        {
            return titleInput.current.focus();
        }
    }
    const focusComment = (e) => {
        if(e.key === 'Enter')
        {
            return commentInput.current.focus();
        }
    }
    const focusSubmit = (e) => {
        if(e.key === 'Enter')
        {
            return submitButton.current.focus();
        }
    }
    const focusUserName = () => {
            return userInput.current.focus();
    }

    const handleReset = () =>{
        setUserName('')
        setTitle('')
        setComment('')
    }
    
    const resetRef = () =>{
        userInput.current.value = '';
        titleInput.current.value = '';
        commentInput.current.value = ''
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        track('Comment posted')
        const newComment = {
            userName : userName,
            title : title, 
            comment: comment,
            date: dateToDisplay(new Date())
        }
        addComment(newComment);
        handleReset()
        resetRef();
        focusUserName();
    }

    useEffect(()=> {
     userInput.current.focus();
    },[]);


    return (
        <div className="comment-Section">
            <form onSubmit={handleSubmit} className="form-Comment">
                <h1>Write a Comment</h1>
                <label htmlFor='form-userInput'>
                    <input
                        ref={userInput}
                        className="userInput"
                        id = "userInput" 
                        type = "text" 
                        minLength = "4" 
                        maxLength = "15" 
                        placeholder = "Name.."
                        onKeyDown = {focusTitle}
                        onChange = {(e) => setUserName(e.target.value)}
                        required
                        >
                    </input> 
                </label>
                <label htmlFor='form-titleInput'>
                    <input
                    id = "titleInput"
                    type = "text"
                    ref = {titleInput}
                    className = "titleInput"
                    required
                    onKeyDown = {focusComment}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder = "title.."
                    >
                    </input>
                </label>
                <label htmlFor='form-commentInput'>
                    <textarea
                    style={{width:'16vw',height:'20vh'}}
                    id = "commentInput" 
                    className = "textArea-Comment"
                    ref = {commentInput}
                    required
                    onKeyDown = {focusSubmit}
                    onChange = {(e) =>{ 
                        setComment(e.target.value)
                        track('Typing a comment')
                    }}
                    maxLength = "120"
                    placeholder = "comment.."
                    >
                    </textarea>
                </label>
                <label>
                    <Button
                        variant="outline-primary"
                        type="submit"
                        width='16vh'
                        ref={submitButton}>
                        Send
                    </Button> {''}
                    <Button 
                    variant="outline-danger"
                    type="reset"
                    width='16vh'
                    onClick = {handleReset}> 
                        Reset
                    </Button>
                </label>
            </form>
        
        </div>
    )
}

export default Form
