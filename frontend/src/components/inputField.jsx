import React from "react";
import '../app/globals.css'

export default function InputField({forWhat, text, inputText, name, placeholder, isRequired, onInputChange}){
    return (
        <div className="input">
            <label htmlFor={forWhat} className=" text-sm text-gray-700 block">{text}</label>
            <input
            type="text"
            value={inputText}
            name={name}
            id={forWhat}
            placeholder={placeholder}
            required={isRequired}
            onChange={(e) => onInputChange(e.target.value)}
            className=" text-lg border-gray-700 border-2 rounded-md pl-1"
            />
            <span hidden></span>
        </div>
    )
}