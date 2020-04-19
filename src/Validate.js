import React, { useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

// TODO:
// - fetch the tableschema from github and validate it
// - port goodtables-py validate() to JS
// - https://github.com/frictionlessdata/goodtables-py/blob/master/goodtables/inspector.py
// - validate the loaded data file


export default function Validate(props) {
    const { source, path } = props;
    
    const prefix = path.match.path;
    const remotePath = path.location.pathname.substring(prefix.length);
    const remoteUrl = `https://raw.githubusercontent.com${remotePath}`;

    useEffect(() => {
        // Fetch and validate the tableschema file.
        // TODO
    });

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
    
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
          // Do whatever you want with the file contents
            const contents = reader.result;
            console.log(contents);
          };
          reader.readAsText(file);
        });
    });
    const {getRootProps, getInputProps} = useDropzone({ onDrop });
    
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