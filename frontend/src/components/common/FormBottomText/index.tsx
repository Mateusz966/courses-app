import { Button, Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { history } from '../../../config/history';

interface Props {
  text: string;
  buttonText: string;
  path: string;
}

export const FormBottomText: FC<Props> = ({ text, buttonText, path }) => {
  return (
    <Text
      display="flex"
      justifyContent="center"
      w="100%"
      mt="5"
      textAlign="center"
      fontSize="sm"
    >
      {text}
      <Button
        onClick={() => history.push(path)}
        ml="1"
        fontSize="sm"
        variant="link"
      >
        {' '}
        {buttonText}
      </Button>
    </Text>
  );
};
