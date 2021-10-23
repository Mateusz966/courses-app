import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Image } from '@chakra-ui/image';
import { Box, HStack, Icon, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import { apiUrl } from '../../../../config/apiUrl';
import { Button } from '../../Button';
import { useRootStore } from '../../../../stores/storeContext';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

interface Props {
  desktopRatio: number;
  previewUrl?: string | null;
}

export const ImagePicker: React.FC<Props> = ({
  desktopRatio,
  previewUrl,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState<any>();
  const { register } = useFormContext();
  const { name } = useFormFieldContext();
  const { fileStore } = useRootStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!name) {
    return <Text>Picker does not have name attr</Text>;
  }

  const previewUnavailable = () => {
    setLoading(false);
  };

  const previewAvaiable = () => {
    setLoading(false);
  };

  const onChange = (e: any) => {
    setIsEditing(true);
    setImage(undefined);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const imageBlobHandler = (blob: Blob, url: string, fieldName: string) => {
    setIsEditing(true);
    const blobImage: any = blob;
    blobImage.name = `${fieldName}.png`;
    blobImage.lastModified = new Date().getTime();
    if (fileStore?.files) {
      fileStore.removeFile(fieldName);
    }
    fileStore.setFile({ file: blobImage, name: fieldName });
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const imageUrl = cropper.getCroppedCanvas().toDataURL();
      setCropData(imageUrl);
      cropper.getCroppedCanvas().toBlob((blob: Blob) => {
        imageBlobHandler(blob, imageUrl, name);
      });
    }
  };

  const cancelEdit = () => {
    setCropData(undefined);
    cropper.reset();
    fileStore.removeFile(name as string);
  };

  const deletePhoto = () => {
    setImage(undefined);
    setCropData(undefined);
    if (typeof cropper !== 'undefined') {
      cropper.destroy();
    }
    fileStore.removeFile(name);
  };

  return (
    <Box position="relative">
      {loading && <Spinner overlay />}
      <Box
        display="block"
        as="label"
        htmlFor={name}
        position="relative"
        cursor="pointer"
        css={
          previewUrl && !cropData
            ? {
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                transition: 'all ease-in 125ms',
              }
            : undefined
        }
        _hover={
          previewUrl && !cropData
            ? {
                opacity: '0.8',
                background: 'gray',
              }
            : undefined
        }
      >
        {!image && (
          <Box
            className="content-wrapper"
            p="40px"
            border="3px dashed #000"
            display="fiex"
            alignItems="center"
            justifyContent="center"
            transition="border-color ease 250ms"
            width="100%"
            height="100%"
            _hover={
              previewUrl && !cropData
                ? {
                    borderColor: 'transparent',
                    color: 'white',
                  }
                : undefined
            }
          >
            <Text>Click to upload</Text>
            <input
              {...register(name)}
              name={name}
              type="file"
              id="file"
              onChange={onChange}
              style={{
                width: '100%',
                height: '100%',
                opacity: '0',
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
              }}
            />
          </Box>
        )}
      </Box>
      {!cropData && (
        <Box position="relative">
          <Cropper
            zoomTo={0}
            aspectRatio={desktopRatio}
            src={image}
            viewMode={2}
            guides
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive
            autoCropArea={0}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </Box>
      )}
      {cropData && (
        <IconButton
          aria-label="Remove photo"
          color="#fff"
          bgColor="transparent"
          onClick={deletePhoto}
          icon={<Icon w={6} h={6} as={MdDeleteForever} color="red" />}
          position="absolute"
          top="0"
          right="0"
        />
      )}
      <>
        {cropData && <Image src={cropData} />}
        {previewUrl && !isEditing && (
          <Image
            src={`${apiUrl}/${previewUrl}`}
            onError={previewUnavailable}
            onLoad={previewAvaiable}
          />
        )}
      </>
      <HStack mt="5" spacing="48px">
        {cropData && (
          <Button type="button" mt0 variant="outline" onClick={cancelEdit}>
            Edit
          </Button>
        )}
        {!cropData && image && (
          <Button mt0 type="button" onClick={getCropData}>
            Save
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default ImagePicker;
