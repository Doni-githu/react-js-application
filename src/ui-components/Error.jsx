import React from 'react'

export default function Error({ error }) {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
