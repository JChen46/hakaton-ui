import { useState, useEffect } from 'react'

export function useTestAction() {
    const [testPosition, setTestPosition] = useState([0, 0, 0])
    useEffect(() => {
        console.log('called initial useEffect')
        setTestPosition(testPosition.map(i => i+1))
    })

    useEffect(() => {
        console.log('updated testPosition to ', testPosition)
    }, [testPosition])

    return testPosition;
}
