'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RedocStandalone } from 'redoc';


export default function Redoc() {
    //const object = JSON.parse(query)
    //console.log(object)
    let localVariable: any;
    if (typeof window !== 'undefined') {

        localVariable = sessionStorage.getItem("redoc");
    }
    const { push } = useRouter();

    let apiDefinition;

    useEffect(() => {
        if (localVariable == null) {
            push("/")
        }
    ;
     }, []);
    
    apiDefinition = JSON.parse(localVariable)

    return (
        <>
            <RedocStandalone spec={apiDefinition} />
        </>
    );
}
