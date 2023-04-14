import { useEffect } from 'react'

export function Toaster(props) {
    useEffect(() => {
        setTimeout(() => {
            props.onClose()
        }, 3000)
    })

    return (
        <div style={{ backgroundColor: props.color || '#f2f2f2', padding: '10px 20px', textAlign: 'center' }}>
            { props.text }
        </div>
    )
}