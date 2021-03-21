import { Input as ChakraInput } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../app-types/form';

//TODO FILE INPUT FOR FORMS WITH GLOBAL HANDERLS

interface Props extends BaseInputProps {
  isFile?: boolean;
  editId?: string;
}

export const FileInput: FC<Props> = ({
  onChange,
  onClick,
  name,
  id,
  isFile,
  editId,
  isDisabled,
  isRequired,
}) => {
  const { register } = useFormContext();

  return (
    <>
      {!isFile && (
        <></>
        // <PhotoWrapper>
        //   {editId && findByName && findByName(name).length === 0 ? (
        //     <Image src={customFilePath || `${apiUrl}${filePath}/${name}/${editId}`} />
        //   ) : (
        //       findByName &&
        //       findByName(name)?.length > 0 &&
        //       findByName(name).map((photo) =>
        //         photo.previewUrl.map((previewUrl) => <Image key={previewUrl} src={previewUrl} />),
        //       )
        //     )}
        // </PhotoWrapper>
      )}
      <ChakraInput
        onChange={onChange}
        onClick={onClick}
        type="file"
        name={name}
        id={id || name}
        ref={register}
        disabled={isDisabled}
        isRequired={isRequired}
      />
    </>
  );
};
