"use client"
import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { updateInformation } from '../actions';
import SubmitButton from './submit-button';
import { useFormState } from 'react-dom';
import { useToast } from './ui/use-toast';

const initialState = {
    message: "",
    status: ""
};

interface SettingsFormProps {
    email: string;
    firstname: string;
    lastname: string;
    username: string | null | undefined;
}

function SettingsForm({ username, firstname, lastname, email }: SettingsFormProps) {
    const [state, formAction] = useFormState(updateInformation, initialState);
    const { toast } = useToast();
    const [formData, setFormData] = useState({ username, firstname, lastname, email });
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (state?.status === "success") {
            toast({
                title: "Successful!",
                description: state.message
            });
        } else if (state?.status === "error") {
            toast({
                title: "Error!",
                description: state.message,
                variant: "destructive"
            });
        }
    }, [state, toast]);

    useEffect(() => {
        setButtonDisabled(
            formData.username === (username ?? "") &&
            formData.firstname === firstname &&
            formData.lastname === lastname &&
            formData.email === email
        );
    }, [formData, username, firstname, lastname, email]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form action={formAction}>
            <h1 className='text-3xl font-extrabold tracking-tight'>Settings</h1>
            <Separator className='my-4' />

            <div className='mb-4'>
                <Label className='text-lg font-medium'>Username:</Label>
                <p className='text-muted-foreground text-xs font-light'>
                    In this Settings page, you can change your username!
                </p>
                <Input defaultValue={formData.username ?? undefined} name='username' onChange={handleChange} required className='mt-2' min={2} maxLength={21} />
                {state?.status === "error" && <p className='text-destructive mt-1 ml-2 text-xs'>{state.message}</p>}
            </div>

            <div className='mb-4'>
                <Label className='text-lg font-medium'>First Name:</Label>
                <p className='text-muted-foreground text-xs font-light'>
                    In this Settings page, you can change your firstname!
                </p>
                <Input defaultValue={formData.firstname} name='firstname' onChange={handleChange} required className='mt-2' min={2} maxLength={21} />
                {state?.status === "error" && <p className='text-destructive mt-1 ml-2 text-xs'>{state.message}</p>}
            </div>

            <div className='mb-4'>
                <Label className='text-lg font-medium'>Last Name:</Label>
                <p className='text-muted-foreground text-xs font-light'>
                    In this Settings page, you can change your lastname!
                </p>
                <Input defaultValue={formData.lastname} name='lastname' onChange={handleChange} required className='mt-2' min={2} maxLength={21} />
                {state?.status === "error" && <p className='text-destructive mt-1 ml-2 text-xs'>{state.message}</p>}
            </div>

            <div className='mb-4'>
                <Label className='text-lg font-medium'>Email:</Label>
                <p className='text-muted-foreground text-xs font-light'>
                    In this Settings page, you can change your email!
                </p>
                <Input type='email' defaultValue={formData.email} name='email' onChange={handleChange} required className='mt-2' min={2} />
                {state?.status === "error" && <p className='text-destructive mt-1 ml-2 text-xs'>{state.message}</p>}
            </div>

            <div className='w-full flex mt-5 gap-x-5 justify-end'>
                <Button variant={'secondary'} asChild type='button'>
                    <Link href={'/'}>Cancel</Link>
                </Button>
                <SubmitButton textNormal='Change' textDisabled='Changing...' disabled={isButtonDisabled} />
            </div>
        </form>
    );
}

export default SettingsForm;