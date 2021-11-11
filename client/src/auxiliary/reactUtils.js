import React, { useEffect, useRef } from "react";

function useDidMountEffect(fn, inputs) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
    }, inputs);
}


//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
//https://stackoverflow.com/questions/57023074/why-is-the-cleanup-function-from-useeffect-called-on-every-render

const useAsync = (asyncFn, onSuccess, setIsLoading = null, inputs = []) => {

    useEffect(() => {
        let isActive = true;
        if (setIsLoading !== null) {
            setIsLoading(true)
        }
        asyncFn().then(data => {
            console.log(data);
            if (isActive) {
                onSuccess(data);
                if (setIsLoading !== null) {
                    setIsLoading(false)
                }
            } else {
                console.log("aborted setState on unmounted component")
            }
        }).catch(err => {
            if (setIsLoading !== null) {
                setIsLoading(false)
            }
            console.log(err);
            alert(err);
        });
        return () => {
            isActive = false;
        };
    }, inputs);
}

const useAsyncDidMount = (asyncFn, onSuccess, setIsLoading = null, inputs = []) => {

    const didMountRef = useRef(false);

    useEffect(() => {
        
        let isActive = true;

        if (didMountRef.current) {
            if (setIsLoading !== null) {
                setIsLoading(true)
            }
            asyncFn().then(data => {
                console.log(data);
                if (isActive) {
                    onSuccess(data);
                    if (setIsLoading !== null) {
                        setIsLoading(false)
                    }
                } else {
                    console.log("aborted setState on unmounted component")
                }
            }).catch(err => {
                if (setIsLoading !== null) {
                    setIsLoading(false)
                }
                console.log(err);
                alert(err);
            });
        }else{
            didMountRef.current = true;
        }

        return () => {
            isActive = false;
        };
    }, inputs);
}



export {useDidMountEffect, useAsync, useAsyncDidMount }