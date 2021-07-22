import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Button } from '../Button';

interface PaginationButtonProps {
  number?: string | number;
  active?: boolean;
  onClick: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export const PaginationButton: FC<PaginationButtonProps> = ({
  number,
  active,
  onClick,
}) => (
  <Button
    type="button"
    width="30px"
    height="30px"
    p={0}
    mr="10px"
    onClick={onClick}
    fontWeight={600}
    color="colorPrimary"
    backgroundColor="colorLight"
    borderColor={active ? 'primary' : undefined}
  >
    <Text mb="0" fontWeight={600}>{`${number}`}</Text>
  </Button>
);
