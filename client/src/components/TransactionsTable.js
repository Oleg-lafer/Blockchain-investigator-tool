//TransactionsTable.js
import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #eaeaea;
  font-family: monospace;
`;

const Th = styled.th`
  border: 1px solid #444;
  padding: 5px;
  background-color: #2c2c2c;
`;

const Td = styled.td`
  border: 1px solid #444;
  padding: 5px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #1a1a1a;
  }
  &:hover {
    background-color: #333;
  }
`;

const Header = styled.h2`
  margin-bottom: 10px;
`;

function TransactionsTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions loaded yet.</p>;
  }

  return (
    <TableWrapper>
      <Header>Transactions Table</Header>
      <Table>
        <thead>
          <tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Amount</Th>
            <Th>TxHash</Th>
            <Th>Time</Th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <Tr key={idx}>
              <Td>{tx.From}</Td>
              <Td>{tx.To}</Td>
              <Td>{tx.Amount}</Td>
              <Td>{tx.TxHash}</Td>
              <Td>{new Date(tx.Time * 1000).toLocaleString()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default TransactionsTable;
