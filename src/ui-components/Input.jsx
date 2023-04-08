import React from 'react'

export default function Input({ label, type = "text", state, setState }) {
    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" onChange={(e) => setState(e.target.value)} value={state} id={"htmlID"} placeholder={label} />
            <label htmlFor={`htmlID`}>{label}</label>
        </div>
    )
}
