import React, { FC, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Box } from '@chakra-ui/react';

export const GlobalFilter: FC<any> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((values) => {
    setGlobalFilter(values || undefined);
  }, 500);

  return (
    <Box>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Szukaj"
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </Box>
  );
};
