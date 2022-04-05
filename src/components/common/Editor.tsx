import React, {useState} from "react";
import {CKEditor} from "ckeditor4-react";

interface IMyEditor{
   readonly onChange: ((data: string)=>void);
   readonly defaultData?: string;
}
export const MyEditor = ({onChange, defaultData}: IMyEditor) => {
  return <div className={'w-full'}>
      <CKEditor
          initData={defaultData||""}
          onInstanceReady={ () => {
          } }
          onChange={(e:any)=>{onChange(e.editor.getData().trim())}}
      />
  </div>
}