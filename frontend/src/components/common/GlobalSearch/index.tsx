import React, { FC } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Box } from '@chakra-ui/react';

export const GlobalFilter: FC<any> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
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
