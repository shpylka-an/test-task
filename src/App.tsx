import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import biom from './biom.json';

// For typing
export type Biom = typeof biom;

const STRAIN_LEVEL = 7;

interface DataType {
  key: React.Key;
  name: string;
  taxId: number;
  abundanceScore: any;
  relativeAbundance: string;
  uniqueMatchesFrequency: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tax ID',
    dataIndex: 'taxId',
    key: 'taxId',
  },
  {
    title: 'Abundance score',
    dataIndex: 'abundanceScore',
    key: 'abundanceScore',
  },
  {
    title: 'Relative abundance',
    dataIndex: 'relativeAbundance',
    key: 'relativeAbundance',
  },
  {
    title: 'Unique matches frequency',
    dataIndex: 'uniqueMatchesFrequency',
    key: 'uniqueMatchesFrequency',
  },
];

const dataSource: DataType[] = biom.rows.map((bacteria, i) => {
  const { name, tax_id: taxId } = bacteria.metadata.lineage[STRAIN_LEVEL];

  const [
    [, , relativeAbundance],
    [, , abundanceScore],
    [, , uniqueMatchesFrequency],
  ] = biom.data.filter((d) => d[0] === i);

  const relativeAbundancePercent = relativeAbundance * 100;

  return {
    key: bacteria.id,
    name,
    taxId,
    abundanceScore: abundanceScore.toFixed(2),
    relativeAbundance:
      relativeAbundancePercent >= 0.01
        ? `${relativeAbundancePercent.toFixed(2)}%`
        : '< 0.01%',
    uniqueMatchesFrequency,
  };
});

function App() {
  return <Table dataSource={dataSource} columns={columns} />;
}

export default App;
