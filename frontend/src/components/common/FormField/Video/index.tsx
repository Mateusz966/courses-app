import React, { FC, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useRootStore } from '../../../../stores/storeContext';

interface Props {
  name?: string;
  isRequired?: boolean;
}

export const Video: FC<Props> = ({ name, isRequired }) => {
  const { register, control } = useFormContext();
  const { fileStore } = useRootStore();
  const [image, setImage] = useState();
  const videoRef = useRef<any>();

  const onChange = (e: any) => {
    setImage(undefined);
    e.preventDefault();
    let file: FileList;
    if (e.dataTransfer) {
      file = e.dataTransfer.files;
    } else if (e.target) {
      file = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      videoRef.current.load();
      videoRef.current.play();
      fileStore.setFile({ file: file[0], name: name ?? file[0].name });
    };
    //@ts-ignore
    reader.readAsDataURL(file[0]);
  };

  return (
    <>
      {image && (
        <video width="300" height="300" ref={videoRef} src={image} controls />
      )}
      <Controller
        name={name ?? 'video'}
        control={control}
        render={({ field }) => (
          <input
            type="file"
            {...field}
            onChange={(e) => {
              field?.onChange(e);
              onChange(e);
            }}
          />
        )}
      />
    </>
  );
};
