import React from "react";
import Paper from "@mui/material/Paper";
import { Table as MaterialTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "inherit" | "justify";
  cell?: (value: any) => React.ReactNode | string;
}

interface Props {
  columns: TableColumn[];
  rows: any[];
  maxHeight?: number;
  showPaginationOptions?: boolean;
}

export default function Table({
  columns,
  rows = [],
  showPaginationOptions = false,
  maxHeight = 250,
}: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper
      style={{
        borderRadius: "25",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight }}>
        <MaterialTable size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.cell != null ? (
                            column.cell(value)
                          ) : value == null ? (
                            <>-</>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      {showPaginationOptions ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <></>
      )}
    </Paper>
  );
}
