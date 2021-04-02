import React, { useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Image } from '@chakra-ui/image';
import { Box, HStack, Icon, IconButton, Spinner } from '@chakra-ui/react';
import { apiUrl } from '../../../../config/apiUrl';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../Button';
import { MdDeleteForever } from 'react-icons/md';
import { useFile } from '../../../../hooks/useFile';
import { useRootStore } from '../../../../stores/storeContext';

interface Props {
  desktopRatio: number;
  previewUrl?: string;
  name?: string;
}

export const ImagePicker: React.FC<Props> = ({
  desktopRatio,
  previewUrl,
  name,
}: Props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(previewUrl);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState<any>();
  const { register, setValue } = useFormContext();
  const { fileStore } = useRootStore();

  const previewUnavailable = () => {
    setLoading(false);
  };

  const previewAvaiable = () => {
    setLoading(false);
  };

  const onChange = (e: any) => {
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
    let image: any = blob;
    image.name = `${fieldName}.png`;
    image.lastModified = new Date().getTime();
    fileStore.setFile({ file: image, name: fieldName });
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const imageUrl = cropper.getCroppedCanvas().toDataURL();
      setCropData(imageUrl);
      cropper.getCroppedCanvas().toBlob((blob: Blob) => {
        imageBlobHandler(blob, imageUrl, name as string);
      });
    }
  };

  const cancelEdit = () => {
    setCropData(undefined);
  };

  return (
    <>
      {loading && <Spinner overlay />}
      <input
        ref={register()}
        name={name}
        type="file"
        id="file"
        onChange={onChange}
      />
      {!cropData && (
        <Box position="relative" border="1px solid">
          <Cropper
            zoomTo={0}
            aspectRatio={desktopRatio}
            src={image}
            viewMode={2}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={0}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </Box>
      )}
      {imagePreviewUrl && (
        <IconButton
          aria-label="Remove photo"
          color="#fff"
          bgColor="transparent"
          onClick={cancelEdit}
          icon={<Icon w={6} h={6} as={MdDeleteForever} color="red" />}
          position="absolute"
          top="0"
          right="0"
        />
      )}
      <>
        {cropData && <Image src={cropData} />}
        {imagePreviewUrl && !cropData && (
          <Image
            border="1px solid #000"
            src={`${apiUrl}/${imagePreviewUrl}`}
            onError={previewUnavailable}
            onLoad={previewAvaiable}
          />
        )}
      </>
      <HStack mt="5" spacing="48px">
        <Button
          disabled={!imagePreviewUrl}
          type="button"
          mt0
          variant="outline"
          onClick={cancelEdit}
        >
          Edit
        </Button>

        <Button disabled={!image} type="button" onClick={getCropData}>
          Save
        </Button>
      </HStack>
    </>
  );
};

export default ImagePicker;
