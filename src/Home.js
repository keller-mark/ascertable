import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as GithubIcon } from './assets/github.svg';
import { ReactComponent as FileIcon } from './assets/file.svg';
import { ReactComponent as BranchIcon } from './assets/git-branch.svg';


function validateGitHubInfo(repoPath, filePath, branch) {
    return (
        repoPath.length > 0 
        && repoPath.includes("/")
        && repoPath.indexOf("/") < (repoPath.length - 1)
        && repoPath.indexOf("/", repoPath.indexOf("/") + 1) === -1
        && filePath.length > 0 
        && branch.length > 0
    );
}

function makeRelativeUrl(repoPath, filePath, branch) {
    return `/gh/${repoPath}/${branch}/${filePath}`;
}

function makeAbsoluteUrl(repoPath, filePath, branch) {
    return `https://ascertable.com/gh/${repoPath}/${branch}/${filePath}`;
}

export default function Home() {

    const [repoPath, setRepoPath] = useState("");
    const [filePath, setFilePath] = useState("");
    const [branch, setBranch] = useState("master");

    const handleRepoPathChange = useCallback((event) => {
        setRepoPath(event.target.value);
    });

    const handleFilePathChange = useCallback((event) => {
        setFilePath(event.target.value);
    });

    const handleBranchChange = useCallback((event) => {
        setBranch(event.target.value);
    });

    const relativeUrl = makeRelativeUrl(repoPath, filePath, branch);
    const absoluteUrl = makeAbsoluteUrl(repoPath, filePath, branch);
    const isValidInfo = validateGitHubInfo(repoPath, filePath, branch);

    return (
        <div className="container">
            <div className="box-top">
                <h1>ascertable</h1>
                <h2>Validate local tabular files against remote schemas.</h2>

                <div className="form-left">
                    <GithubIcon />
                    <FileIcon />
                    <BranchIcon />
                </div>
                <div className="form-right">
                    <input 
                        type="text" 
                        placeholder="my-username/my-repo" 
                        value={repoPath} 
                        onChange={handleRepoPathChange}
                        autoFocus
                    />
                    <input 
                        type="text" 
                        placeholder="my-directory/my-tableschema.json" 
                        value={filePath} 
                        onChange={handleFilePathChange}
                    />
                    <input 
                        type="text" 
                        placeholder="branch"
                        value={branch} 
                        onChange={handleBranchChange}
                    />
                </div>
            </div>

            <div className="box-bottom">
                {repoPath.length > 0 ? (
                    <div className={(isValidInfo ? "valid" : "invalid")}>
                        <Link 
                            to={relativeUrl}
                            className={(isValidInfo ? "valid" : "invalid")}
                        >{absoluteUrl}</Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
}