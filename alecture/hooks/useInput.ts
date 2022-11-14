import { useState, useCallback } from 'react';

// const useInput = <T>(initialData: T) => {
const useInput = (initialData: any) => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback( (e: any) => {
        setValue(e.target.value)
    }, [])

    return [value, handler, setValue]
}

export default useInput;