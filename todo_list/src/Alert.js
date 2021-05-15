import React, {useEffect} from 'react'

const Alert = ({status, msg, removeAlert, list}) => {
    useEffect(()=>{
       const timeout= setTimeout(()=>{
            removeAlert();
        },3000)
        return ()=> clearTimeout(timeout)
    },[list])

    return (
        <p className={`alert alert-${status}`}>
           {msg}
        </p>
    )
}

export default Alert
