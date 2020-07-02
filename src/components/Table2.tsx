import React, {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react';
import {
  Cell,
  CellProps,
  FilterProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { HeaderCheckbox, RowCheckbox, useStyles } from './TableStyles';
import { useLocalStorage } from '../utils';
//import { camelToWords, useDebounce, useLocalStorage } from '../utils';

// export function Table<T extends object>(
//   props: PropsWithChildren<TableOptions<T>>
// ): ReactElement {
//   const { columns, data } = props;

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   });

//   const styles = useStyles();

//   return (
//     <table className={styles.tableTable} {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th className={styles.tableHeadCell} {...column.getHeaderProps()}>
//                 {column.render('Header')}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody className={styles.tableBody} {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }
