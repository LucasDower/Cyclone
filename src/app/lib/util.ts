import { useEffect } from "react";

export namespace Cyclone {
    export namespace React {
        export function useRepeatEvery(delay: number, callback: () => void) {
            useEffect(() => {
                callback();
            }, []);
            useEffect(() => {
                const interval = setInterval(() => {
                    callback();
                }, delay);
                return () => {
                    clearInterval(interval);
                };
            }, []);
        }
    }
}

export const ONE_SECOND = 1000;
export const TEN_SECOND = 10 * ONE_SECOND;
export const ONE_MINUTE = 60 * ONE_SECOND;