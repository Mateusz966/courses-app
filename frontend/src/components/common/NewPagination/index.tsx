import React, { FC, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { PaginationButton } from '../PaginationButton';

interface NewPaginationProps {
  previousPage: () => void;
  canPreviousPage: boolean;
  nextPage: () => void;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  dataLength: number;
  page: number;
}

// eslint-disable-next-line import/prefer-default-export
export const NewPagination: FC<NewPaginationProps> = ({
  page,
  gotoPage,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  dataLength,
}) => {
  const isOnPage = (current: number): boolean => page + 1 === current;
  const handleClick = (dest: number | null) => {
    if (dest && !isOnPage(dest)) {
      gotoPage(dest - 1);
    }
  };
  const [buttons, setButtons] = useState<(number | null)[]>([
    1,
    2,
    null,
    null,
    null,
  ]);

  const setButtonsArray = (content: number, currentPage: number) => {
    if (content <= 20) {
      setButtons([1, 2, null, null, null]);
    } else if (content <= 30) {
      setButtons([1, 2, 3, null, null]);
    } else if (content <= 40) {
      setButtons([1, 2, 3, 4]);
    } else if (content <= 50) {
      setButtons([1, 2, 3, 4, 5]);
    } else if (currentPage <= 2) {
      setButtons([1, 2, 3, currentPage + 3, Math.ceil(dataLength / 10)]);
    } else if (
      currentPage === Math.ceil(dataLength / 10) ||
      currentPage + 1 === Math.ceil(dataLength / 10)
    ) {
      setButtons([
        1,
        Math.ceil(dataLength / 10) - 3,
        Math.ceil(dataLength / 10) - 2,
        Math.ceil(dataLength / 10) - 1,
        Math.ceil(dataLength / 10),
      ]);
    } else {
      setButtons([
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        Math.ceil(dataLength / 10),
      ]);
    }
  };

  useEffect(() => {
    setButtonsArray(dataLength, page + 1);
  }, [page]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={0}
      fontWeight={300}
      listStyleType="none"
    >
      <IconButton
        aria-label="previous-page"
        bg="#000"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        width="30px"
        height="30px"
        mr={1}
        icon={<IoIosArrowBack size={18} color="#fff" />}
      />
      <PaginationButton
        onClick={() => handleClick(1)}
        active={isOnPage(1)}
        number={1}
      />
      {dataLength > 50 && page > 2 && (
        <Text as="span" color="primary">
          ...
        </Text>
      )}
      <PaginationButton
        onClick={() => handleClick(buttons[1])}
        number={`${buttons[1]}`}
        active={buttons[1] ? isOnPage(buttons[1]) : false}
      />
      {buttons[2] && (
        <PaginationButton
          onClick={() => handleClick(buttons[2])}
          number={`${buttons[2]}`}
          active={buttons[1] ? isOnPage(buttons[2]) : false}
        />
      )}
      {buttons[3] && (
        <PaginationButton
          onClick={() => handleClick(buttons[3])}
          number={`${buttons[3]}`}
          active={buttons[1] ? isOnPage(buttons[3]) : false}
        />
      )}
      {dataLength > 50 && page < Math.ceil(dataLength / 10) - 3 && (
        <Text as="span" color="primary">
          ...{' '}
        </Text>
      )}
      {buttons[4] && (
        <PaginationButton
          onClick={() => handleClick(buttons[4])}
          number={`${buttons[4]}`}
          active={buttons[1] ? isOnPage(buttons[4]) : false}
        />
      )}
      <IconButton
        aria-label="next-page"
        bg="#000"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        width="30px"
        height="30px"
        icon={<IoIosArrowForward size={18} color="#fff" />}
      />
    </Box>
  );
};
