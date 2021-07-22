import React, { FC } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {
  Alert,
  Spinner,
  Table as ChakraTable,
  Tr,
  Td,
  Thead,
  Tbody,
  Text,
  Th,
} from '@chakra-ui/react';
import { GlobalFilter } from '../../../components/common/GlobalSearch';
import { useMobile } from '../../../hooks/useMobile';
import { NewPagination } from '../NewPagination';

interface Props {
  inProgress: boolean;
  columns: any;
  data: any;
  hiddenColumns?: string[];
  initialPage?: number;
}

export const Table: FC<Props> = ({
  columns,
  data,
  hiddenColumns,
  initialPage,
  inProgress,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canNextPage,
    canPreviousPage,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: initialPage ?? 0,
        hiddenColumns: hiddenColumns ?? [''],
      },
    },
    useGlobalFilter,
    usePagination,
  );

  const { isMobile } = useMobile();

  if (inProgress) {
    return <Spinner />;
  }

  if (!data || data?.length === 0) {
    return <Alert type="notice" text="Brak danych do wyświetlenia." />;
  }

  // Render the UI for your table
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <ChakraTable {...getTableProps()}>
        <Thead>
          {!isMobile &&
            headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <Td {...cell.getCellProps()}>
                    {isMobile && <Text>{cell.column.Header}</Text>}{' '}
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
      {data.length > 10 && (
        <NewPagination
          page={pageIndex}
          gotoPage={gotoPage}
          dataLength={data.length}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </>
  );
};
