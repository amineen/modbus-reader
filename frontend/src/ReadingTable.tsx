import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@tremor/react";

interface ReadingTableProps {
  readings: number[];
  startRegister: string;
  page: number;
  setPage: (page: number) => void;
}

const pageSize = 8;

const ReadingTable = ({
  readings,
  startRegister,
  page,
  setPage,
}: ReadingTableProps) => {
  const totalPages = readings ? Math.ceil(readings.length / pageSize) : 1;
  const paginatedReadings = readings
    ? readings.slice((page - 1) * pageSize, page * pageSize)
    : [];
  return (
    <div>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Register</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReadings.map((val: number, idx: number) => (
            <TableRow key={idx} className="py-1">
              <TableCell>
                {parseInt(startRegister, 10) + (page - 1) * pageSize + idx + 1}
              </TableCell>
              <TableCell>{val}</TableCell>
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

export default ReadingTable;
