import { Input as ChakraInput } from "@chakra-ui/react"
import { BaseInputProps } from "../../../../../../app-types/form";

//TODO FILE INPUT FOR FORMS WITH GLOBAL HANDERLS

interface Props extends BaseInputProps {
  isFile?: boolean;
  editId?: string;
}

// export const FileInput = () => {
//   return (
//     <>
//       {!isFile && (
//         <PhotoWrapper>
//           {editId && findByName && findByName(name).length === 0 ? (
//             <Image src={customFilePath || `${apiUrl}${filePath}/${name}/${editId}`} />
//           ) : (
//               findByName &&
//               findByName(name)?.length > 0 &&
//               findByName(name).map((photo) =>
//                 photo.previewUrl.map((previewUrl) => <Image key={previewUrl} src={previewUrl} />),
//               )
//             )}
//         </PhotoWrapper>
//       )}
//       <ChakraInput
//         onChange={onChange}
//         onClick={onClick}
//         type={type}
//         name={name}
//         id={id || name}
//         ref={register({ required: isRequired && 'To pole jest wymagane' })}
//         disabled={isDisabled}
//       />
//     </>
//   );
// }

