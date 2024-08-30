'use client'

import { Button, Card, Input, Textarea, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import Footer from './Footer'
import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Ulasan() {
    const [newUlasan, setNewUlasan] = useState({ name: "", deskripsi: "", email: "" });
    const [ulasanData, setUlasanData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State for loading

    const handleAdd = async () => {
        setLoading(true); // Set loading to true when request starts
        try {
            const ulasanWithDate = { ...newUlasan };
            const response = await axios.post(`${baseURL}/api/createUlasan`, ulasanWithDate, {
                headers: { "Content-Type": "application/json" },
            });

            const addedUlasan = response.data;
            setUlasanData([...ulasanData, addedUlasan]);
            setNewUlasan({ name: "", deskripsi: "", email: "" });
            console.log("Data successfully added");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
            console.log("Data failed to add");
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUlasan({ ...newUlasan, [name]: value });
    };

    return (
        <Card className='p-10 col-span-12 flex flex-col gap-10'>
            <div className='flex md:flex-row flex-col gap-10 justify-between'>
                <Input
                    isRequired
                    variant='underlined'
                    type="email"
                    label="Email"
                    name="email"
                    placeholder='Email'
                    className="max-w-xl"
                    value={newUlasan.email}
                    onChange={handleInputChange}
                />
                <Input
                    isRequired
                    variant='underlined'
                    type="text"
                    label="Nama"
                    name="name"
                    placeholder='Nama'
                    className="max-w-xl"
                    value={newUlasan.name}
                    onChange={handleInputChange}
                />
            </div>
            <Textarea
                isRequired
                variant='underlined'
                label="Berikan Ulasan Anda"
                name="deskripsi"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                value={newUlasan.deskripsi}
                onChange={handleInputChange}
            />
            <Button
                className='bg-[#A98A55] max-w-xs text-white'
                radius='full'
                variant="shadow"
                onClick={handleAdd}
                disabled={loading} // Disable button when loading
            >
                {loading ? <Spinner size="sm" /> : 'Kirim'} {/* Show spinner or text based on loading */}
            </Button>
        </Card>
    )
}
