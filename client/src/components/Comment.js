import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

function Comment({comment}) {
    return (
        <div style={{textAlign:'center'}}>
             <Card border="warning" style={{ width: '60vw', maxHeight:'20vh' }}>
                <Card.Body style={{padding:'3px', marginTop:'3px'}}>
                    <Card.Title>{comment.title}</Card.Title>
                    <Card.Text>
                        {comment.comment} <br/>
                        <span>{comment.userName}</span> | <span>{comment.date}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
        </div>


    )
}

export default Comment
