'use client';

import { useSearchParams } from 'next/navigation';

export default function Connect() {
    const searchParams = useSearchParams()
    const uuid = searchParams.get('q')

    return (
        <p>{ uuid }</p>
    )
}