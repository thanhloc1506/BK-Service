import React from "react";

interface IImageControl{
    url: string;
    onDelete: ()=>void;
}

export const ImageControl = ({url, onDelete}: IImageControl) => {
    return (
        <div className={'relative inline-block w-32 h-20 overflow-hidden group border-4 border-blue-300 rounded'}>
            <img src={url} className={'w-full h-full'}/>
            <button
                onClick={onDelete}
                className={'cursor-pointer bg-red-500/70 absolute w-32 top-[100%] left-0 w-full h-1/2 flex justify-center transition transition-all group-hover:-translate-y-[100%] invisible group-hover:visible duration-300'}>
                <span className={'self-center'}>Xóa</span>
            </button>
        </div>
    )
}