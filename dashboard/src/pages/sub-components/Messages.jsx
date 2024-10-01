
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllMessageErrors,  deleteMessages, getAllMessages, resetMessageSlice } from '@/store/slices/massageSlice';
import { toast } from 'react-toastify';
import SpacialLoadingButton from './SpacialLoadingButton';




const Messages = () => {
    
   
   
    const { loading, message, error, messages } = useSelector((state) => state.Message);

    const dispatch = useDispatch();
    const [messageId, setMessageId] = useState("");
    const handelMessageDelete = (id) =>{
        setMessageId(id)
        dispatch(deleteMessages(id));
    };



    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllMessageErrors());
        }
        if(message){
            toast.success(message);
            dispatch(getAllMessages());
            dispatch(resetMessageSlice());

        }
    },[dispatch,error,message,loading])
    


    return (
        <div className="min-h-[100vh] sm:justify-between sm:gap-4 sm:py-4 sm:pl-20 ">
            <Tabs>
                <TabsContent>
                    <Card>
                        <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
                            <CardTitle>Messages</CardTitle>
                        </CardHeader>

<CardContent className="grid sm:grid-cols-2 gap-2 ">
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((element) => (
            <Card key={element._id} className="grid gap-2 p-4">
                <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Sender Name:</span>
                    {element.senderName}
                </CardDescription>
                <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Subject:</span>
                    {element.subject}
                </CardDescription>
                <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Message:</span>
                    {element.message}
                </CardDescription>
                <CardFooter className="justify-end">
                    {
                        loading && messageId === element._id ? (
                            <SpacialLoadingButton width={"w-32"} content={"Deleting"} />
                        ) : (
                            <Button className="w-32" onClick={() => handelMessageDelete(element._id)}>
                                Delete
                            </Button>
                        )
                    }
                </CardFooter>
            </Card>
        ))
    ) : (
        <p>No messages found</p>
    )}
</CardContent>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Messages;


