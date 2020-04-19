import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

export default function Validate(props) {
    const { source, path } = props;
    
    const prefix = path.match.path;
    const remotePath = path.location.pathname.substring(prefix.length);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
    
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
          // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
          };
          reader.readAsArrayBuffer(file);
        });
    }, []);
    const {getRootProps, getInputProps} = useDropzone({ onDrop });


    let remoteUrl = null;
    if(source === "GitHub") {
        remoteUrl = `https://raw.githubusercontent.com${remotePath}`;
    }
    
    return (
        <div className="container">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />

                <div className="dropzone-info">
                    <h1>ascertable</h1>
                    <br/>
                    <h2>Drop files here or click to upload.</h2>
                </div>
            </div>
            <div className="footer">
                Validating against tableschema at&nbsp;
                <a href={remoteUrl} target="_blank">{remoteUrl}</a>
            </div>
        </div>
    );
}