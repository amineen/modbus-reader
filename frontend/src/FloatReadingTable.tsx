import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@tremor/react";
import { pkg } from "../wailsjs/go/models";

interface FloatReadingTableProps {
  readings: pkg.ModbusReading[];
  page: number;
  setPage: (page: number) => void;
}

const pageSize = 8;

const FloatReadingTable = ({
  readings,
  page,
  setPage,
}: FloatReadingTableProps) => {
  const totalPages = readings ? Math.ceil(readings.length / pageSize) : 1;
  const paginatedReadings = readings
    ? readings.slice((page - 1) * pageSize, page * pageSize)
    : [];
  return (
    <div>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Register Pair</TableHeaderCell>
            <TableHeaderCell>LSR</TableHeaderCell>
            <TableHeaderCell>MSR</TableHeaderCell>
            <TableHeaderCell>Float Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReadings.map((reading, idx) => (
            <TableRow key={idx} className="py-1">
              <TableCell>{reading.register_pair}</TableCell>
              <TableCell>{reading.LSR}</TableCell>
              <TableCell>{reading.MSR}</TableCell>
              <TableCell>{reading.Value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          <Button
            className="px-2"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            className="px-2"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default FloatReadingTable;
