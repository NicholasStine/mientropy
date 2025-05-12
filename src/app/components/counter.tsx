"use client"
import { useEffect, useState } from "react"
import "./counter.css"
export default function Counter({ count }: { count?: number }) {
    const [hundreds, setHundreds] = useState('off')
    const [tens, setTens] = useState('off')
    const [ones, setOnes] = useState('off')

    function turnOff() {
        setHundreds('off')
        setTens('off')
        setOnes('off')
    }

    function setCount(updated_count: number) {
        console.log("set count")
        const split = updated_count.toString().split('').reverse()
        const [o, t, h] = split
        setHundreds(h || 'off')
        setTens(t || 'off')
        setOnes(o || '0')
    }

    useEffect(() => {
        if (!count && count !== 0) return turnOff()
        setCount(count)
    }, [count])

    return (
        <div className="counter">
            <img className="counter-number" src={`/7_segment/${hundreds}.png`} />
            <img className="counter-number" src={`/7_segment/${tens}.png`} />
            <img className="counter-number" src={`/7_segment/${ones}.png`} />
        </div>
    )
}