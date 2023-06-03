'use client';
import { redirect } from 'next/navigation';
import { RedocStandalone } from 'redoc';


export default function Redoc() {

    if (typeof window !== 'undefined') {
        const localVariable = sessionStorage.getItem("redoc");
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
