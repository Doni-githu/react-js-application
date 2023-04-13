import React from 'react'

export default function Error({ error, setErr }) {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button type="button" onClick={() => setErr(null)} className='btn-close'></button>
        </div>
    )
}
