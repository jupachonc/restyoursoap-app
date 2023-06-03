'use client';
import { useRouter } from 'next/navigation';
import { RedocStandalone } from 'redoc';


export default function Redoc() {
    //const object = JSON.parse(query)
    //console.log(object)
    let localVariable;
    if (typeof window !== 'undefined') {

        localVariable = sessionStorage.getItem("redoc");
    }
    const router = useRouter();

    let apiDefinition;

    if (localVariable == null) {
        router.push("/")
    } else {
        apiDefinition = JSON.parse(localVariable)
    }

    return (
        <>
            <RedocStandalone spec={apiDefinition} />
        </>
    );
}
