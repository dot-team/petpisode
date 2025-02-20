'use client';

import { Button, Input } from '@/components/common';
// import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { BookImage, CircleX } from 'lucide-react';

import supabaseClient from '@/lib/supabase/client';

function PostFormCard() {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState<string>('');
    const [, setContent] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);
    // const [getPublicUrl, setGetPublicUrl] = useState<string | null>(null);
    const [fileData, setFileData] = useState<File | null>(null);
    const BUCKET_STORAGE = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

    // const {data} = useMutation({
    //     mutationFn:
    // })
    const handleImageClick = () => {
        fileRef.current?.click();
    };
    const handleImgDelteClick = () => {
        setPreview(null);
    };

    async function uploadFile(formData: File) {
        const { error } = await supabaseClient.storage
            .from(BUCKET_STORAGE as string)
            .upload(`posts/${formData.name}`, formData);
        // const publicUrl = supabaseClient.storage
        //     .from(BUCKET_STORAGE as string)
        //     .getPublicUrl(`${data!.path}`);
        // setGetPublicUrl(publicUrl.data.publicUrl);
        if (error) {
            console.log('파일이 업로드 되지 않았습니다.', error);
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        setContent(e.currentTarget.innerText);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileData(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePostClick = async () => {
        if (preview) {
            await uploadFile(fileData as File);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center min-w-[680px]">
                <div className="flex flex-col bg-[#FCFAF6] rounded-dot-l w-full relative mt-6">
                    <div className="flex rounded-b-dot-l after:absolute after:top-[40px] after:right-[15px] after:w-[90%] after:border-[1px] after:border-solid after:border-[#E4E4E7]">
                        <Input
                            placeholder="제목을 입력 해주세요"
                            className="overflow-hidden text-2xl font-bold bg-transparent border-none rounded-b-none focus-visible:ring-0 rounded-t-dot-l"
                            onChange={handleTitleChange}
                            value={title}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col flex-1 overflow-auto rounded-b-dot-l whitespace-break-spaces focus-visible:outline-none">
                                {preview && (
                                    <div className="relative flex justify-center w-full">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="object-cover w-3/4 h-[374px] rounded-2xl flex justify-center mt-4 z-10 "
                                        />
                                        <CircleX
                                            className="absolute z-10 right-[10rem] top-6 text-white"
                                            onClick={handleImgDelteClick}
                                        />
                                    </div>
                                )}
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="border-none rounded-t-none focus:none
                                    focus-visible:ring-0 bg-[#FCFAF6] w-full text-xl p-3
                                    focus-visible:outline-none break-all before:text-xl
                                    focus:before:content-[''] before:content-space
                                    overflow-auto max-h-64"
                                    onInput={handleContentChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-4 rounded-b-dot-l bg-[#FCFAF6] pb-6">
                            <BookImage size={24} color="#D9D9D9" onClick={handleImageClick} />
                            <input
                                type="file"
                                className="hidden"
                                ref={fileRef}
                                onChange={handleFileChange}
                            />
                            <Button
                                className="w-16 h-6 text-xs text-white bg-primary hover:bg-none"
                                onClick={handlePostClick}
                            >
                                등록하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostFormCard;
