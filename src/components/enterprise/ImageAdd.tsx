import React, {ChangeEvent, useRef} from "react";
import {FaPlus} from "react-icons/fa";

interface IImageAdd{
    onSelectFile?: (file: File)=>void;
}

export  const ImageAdd = ({onSelectFile}: IImageAdd) =>{
    const input = useRef<HTMLInputElement>(null);
    return (
        <div className={'w-32 h-20 bg-blue-500/40 flex justify-center rounded cursor-pointer'}
             onClick={()=>{
                 if(input.current){
                     input.current.value = '';
                     input.current.click();
                 }
        }}>
            <FaPlus className={'m-auto'} color={'white'} size={28}/>
            <input hidden type="file" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                if(e.target.files && e.target.files.length>0){
                    onSelectFile && onSelectFile(e.target.files[0]);
                }
            }} ref={input}/>
        </div>
    )
}