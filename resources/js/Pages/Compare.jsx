import DefaultLayout from "@/Layouts/DefaultLayout";
import React from 'react';
import { usePage } from '@inertiajs/react';
import { Head } from "@inertiajs/react";

const Compare = () => {

    const { str } = usePage().props;

    return (
        <h1>{str}</h1>
    );
}

export default Compare;