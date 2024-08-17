import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface ITableColumn {
  id: string;
  label: string;
}

interface ITableRowData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IProps {
  columns: ITableColumn[];
  data: ITableRowData[];
}

export default function CustomTable({ columns, data }: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align="center" className="font-bold">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={crypto.randomUUID()}>
              {columns.map((column) => (
                <TableCell key={column.id} align="center">
                  {column.id === "actions" ? (
                    <div className="flex items-center justify-center gap-2">
                      {row[column.id]}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {row[column.id]}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
