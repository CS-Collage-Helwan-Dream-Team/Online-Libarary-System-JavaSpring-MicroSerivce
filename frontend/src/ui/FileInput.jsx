import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { Controller } from "react-hook-form";

const FileButton = styled.label`
    background: var(--color-brand-600);
    color: var(--color-grey-0);
    border-radius: 1.2rem;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    cursor: pointer;
`;
const ImagePreview = styled.div`
    width: 10rem;
    max-height: 10rem;
    overflow: hidden;
`;

const HiddenInput = styled.input`
    display: none;
`;

const FileInput = ({
    control,
    reg,
    error,
    name = "image",
    setFormValue,
    defaultValue = "",
    ...props
}) => {
    const [file, setFile] = useState(defaultValue);
    // Only create a URL if there's a file
    const fileUrl =
        typeof file === "string" ? file : file && URL.createObjectURL(file);

    useEffect(() => {
        setFormValue(name, defaultValue);
    }, []);
    return (
        <Controller
            {...reg}
            control={control}
            render={({ field }) => (
                <>
                    <FileButton htmlFor="file-upload">
                        <BiCloudUpload />
                        <span>upload image</span>
                    </FileButton>
                    <HiddenInput
                        onChange={(e) => {
                            setFile(e.target.files[0] || defaultValue);
                            setFormValue(
                                field.name,
                                e.target.files[0] || defaultValue
                            );
                        }}
                        id="file-upload"
                        {...props}
                        type="file"
                    />

                    {file && (
                        <ImagePreview>
                            <img
                                width={100}
                                height={100}
                                src={fileUrl}
                                alt="Uploaded file preview"
                            />
                        </ImagePreview>
                    )}
                    {error && <p>{error.message}</p>}
                </>
            )}
        />
    );
};

export default FileInput;
