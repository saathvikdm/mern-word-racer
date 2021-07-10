import React from 'react'
import KeyboardKey from './KeyboardKey';

export default function KeyboardLayout() {
    const row_qwerty = [
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    ];

    const row_asdf = [
        "a", "s", "d", "f", "g", "h", "j", "k", "l",
    ]

    const row_zxcv = ["z", "x", "c", "v", "b", "n", "m",]

    return (
        <div className="keyboard__keys">
            {row_qwerty.map((key, index) => <KeyboardKey data={key} key={index} />)}
            <div>{row_asdf.map((key, index) => <KeyboardKey data={key} key={index} />)}</div>
            {row_zxcv.map((key, index) => <KeyboardKey data={key} key={index} />)}
        </div>
    )
}
