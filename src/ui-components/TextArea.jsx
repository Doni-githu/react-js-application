import React from 'react'

export default function TextArea({ label, state, setState }) {
    return (
        <div className="form-floating mb-3">
            <textarea style={{ resize: 'none' }} value={state} onChange={(e) => setState(e.target.value)} className="form-control" placeholder={`Leave a ${label} here`} id={`${label}`}></textarea>
            <label htmlFor={`${label}`}>{label}</label>
        </div>
    )
}
