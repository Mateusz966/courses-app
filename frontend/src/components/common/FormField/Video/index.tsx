import React, { FC, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useRootStore } from '../../../../stores/storeContext';

interface Props {
  name?: string;
  isRequired?: boolean;
  previewUrl?: string;
}

const StyledVideo = styled.div`
  video {
    height: auto;
    width: 100%;
    border-radius: 25px;
    margin-bottom: 2rem;
  }
`;

export const Video: FC<Props> = ({ name, isRequired, previewUrl }) => {
  const { control } = useFormContext();
  const { fileStore } = useRootStore();
  const [image, setImage] = useState<string | null>();
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
      setImage(reader.result as string);
      videoRef.current.load();
      videoRef.current.play();
      fileStore.setFile({ file: file[0], name: name ?? file[0].name });
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reader.readAsDataURL(file[0]);
  };

  console.log(previewUrl);

  return (
    <>
      {image && (
        <StyledVideo>
          <video width="100%" height="auto" ref={videoRef} src={image} controls>
            <track kind="captions" />
          </video>
        </StyledVideo>
      )}
      {previewUrl && (
        <iframe
          title="addedLesson"
          src="https://player.vimeo.com/video/637555784"
          width="320"
          height="240"
          allowFullScreen
        />
      )}
      <Box>
        <Controller
          name={name ?? 'video'}
          control={control}
          render={({ field }) => (
            <input
              type="file"
              {...field}
              onChange={(e) => {
                onChange(e);
              }}
            />
          )}
        />
      </Box>
    </>
  );
};
