import {useRef, useState} from "react";
import './style.css'

function isInvalid(valid, touched, shouldValidate) {
    return !valid && shouldValidate && touched
}

const Input = ({className, type, label, value, valid, shouldValidate, touched, errorMessage, onChange}) => {
    const inputRef = useRef()
    const [focus, setFocus] = useState(false)
    return (
        <div
            className={["form-item", focus && "active", isInvalid(valid, touched, shouldValidate) && "error", className].join(" ")}
            onClick={() => inputRef.current.focus()}>
            <span className="form-label">{label}</span>
            <input
                className="form-input"
                type={type}
                ref={inputRef}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={value}
                onChange={onChange}
            />
            {isInvalid(valid, touched, shouldValidate) && <span className="form-invalid-feedback">{errorMessage}</span>}
        </div>
    )
}

export default Input