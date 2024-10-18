"use client"; 

import { useRouter } from "next/router";

export const UseRouterPath = () => {
    const router = useRouter();
    return router.pathname; 
}
