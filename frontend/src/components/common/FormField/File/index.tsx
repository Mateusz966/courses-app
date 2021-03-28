import React, { useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Image } from '@chakra-ui/image';
import { FormLabel } from '@chakra-ui/form-control';
import { Button, HStack, Spinner } from '@chakra-ui/react';
import { apiUrl } from '../../../../config/apiUrl';
import { useFormContext } from 'react-hook-form';

interface Props {
  desktopRatio: number;
  mobileRatio: number;
  labelText: string;
  required?: boolean;
  previewUrl?: string;
  name?: string;
}

export const ImagePicker: React.FC<Props> = ({
  desktopRatio,
  labelText,
  previewUrl,
  required,
  name,
}: Props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(previewUrl);
  const [initialDataModified, setInitialDataModified] = useState<boolean>(
    false
  );
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState<any>();
  const [isPreview, setPreview] = useState<boolean>(false);
  const [photos, setPhotos] = useState<any[]>([]);

  const { register } = useFormContext();

  useEffect(() => {
    if (previewUrl) {
      setLoading(true);
      setPreview(true);
    }
  }, []);

  const previewUnavailable = () => {
    setLoading(false);
    setPreview(false);
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
    const tempImage: any = {
      previewUrl: [url],
      file: [image as File],
      fieldName,
    };
    setPhotos((photos) => [...photos, tempImage]);
    setInitialDataModified(true);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const imageUrl = cropper.getCroppedCanvas().toDataURL();
      setCropData(imageUrl);
      cropper.getCroppedCanvas().toBlob((blob: Blob) => {
        imageBlobHandler(blob, imageUrl, name as string);
        setPreview(true);
      });
    }
  };

  const handleEdit = () => {
    setPreview(false);
  };

  const cancelEdit = () => {
    setCropData(undefined);
    setImage(undefined);
    setPreview(true);
  };

  return (
    <>
      <div>
        {loading && <Spinner overlay />}
        {!isPreview && !image && (
          <input
            ref={register()}
            name={name}
            type="file"
            id="file"
            onChange={onChange}
          />
        )}
        {!isPreview && image && (
          <>
            <Cropper
              zoomTo={0}
              aspectRatio={desktopRatio}
              preview=".img-preview"
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
          </>
        )}
        {isPreview && (
          <>
            {cropData && <Image src={cropData} />}
            {imagePreviewUrl && !cropData && (
              <Image
                src={`${apiUrl}/${imagePreviewUrl}`}
                onError={previewUnavailable}
                onLoad={previewAvaiable}
              />
            )}
          </>
        )}
        <HStack>
          {!isPreview && previewUrl && (
            <Button type="button" onClick={cancelEdit} marginRight={10}>
              usuń
            </Button>
          )}
          {isPreview && (
            <Button type="button" onClick={handleEdit}>
              Edycja
            </Button>
          )}
          {!isPreview && image && (
            <Button type="button" onClick={getCropData}>
              Zapisz
            </Button>
          )}
        </HStack>
      </div>
    </>
  );
};

export default ImagePicker;
