import React from 'react'
import { Link } from 'react-router-dom'

function SuccessPage() {
    return (
        <div>
            <h1>
                Your comment successfully.
            </h1>
            <button> <Link style={{textDecoration:"none"}} to="/">
                    <div>Back to blog   </div>
                    </Link>
            </button>
        </div>
    )
}

export default SuccessPage
