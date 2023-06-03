'use client';
import { redirect } from 'next/navigation';
import { RedocStandalone } from 'redoc';


export default function Redoc() {
    //const object = JSON.parse(query)
    //console.log(object)
    if (typeof window !== 'undefined') {
        const localVariable = localStorage.getItem("redoc");
        //const router = useRouter();

        let apiDefinition;

        if (localVariable == null) {
            redirect("/")

        } else {
            apiDefinition = JSON.parse(localVariable)
        }

        return (
            <>
                <RedocStandalone spec={apiDefinition} />
            </>
        );
    }

}
