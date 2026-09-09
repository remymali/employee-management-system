import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Input,
  Space,
  Table,
} from "antd";
import {
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type {
  ColumnsType,
  TablePaginationConfig,
} from "antd/es/table";

interface GenericTableProps<T extends object> {
  data: T[];
  columns: ColumnsType<T>;

  loading?: boolean;

  rowKey?: string;

  searchable?: boolean;
  exportable?: boolean;

  pagination?: {
    total: number;
    page: number;
    limit: number;
  };

  onPageChange?: (
    page: number,
    pageSize: number
  ) => void;
}

const GenericTable = <T extends object>({
  data,
  columns,
  loading = false,
  rowKey = "_id",
  searchable = false,
  exportable = false,
  pagination,
  onPageChange,
}: GenericTableProps<T>) => {
  const [searchText, setSearchText] = useState("");

  // Client-side search
  const filteredData = useMemo(() => {
    if (!searchText.trim()) {
      return data;
    }

    const searchValue = searchText.toLowerCase();

    return data.filter((record) =>
      Object.values(record).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(searchValue)
      )
    );
  }, [data, searchText]);

  // Pagination
  const tablePagination: TablePaginationConfig | false =
    pagination
      ? {
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: onPageChange,
        }
      : false;

  // Export CSV
  const handleExport = () => {
    if (!filteredData.length) {
      return;
    }

    const headers = columns
      .map((column) => String(column.title ?? ""))
      .join(",");

    const rows = filteredData.map((record) =>
      columns
        .map((column) => {
          if (
            "dataIndex" in column &&
            column.dataIndex
          ) {
            const key = Array.isArray(column.dataIndex)
              ? column.dataIndex.join(".")
              : String(column.dataIndex);

            const value = record[key as keyof T];

            return `"${String(value ?? "").replace(
              /"/g,
              '""'
            )}"`;
          }

          return '""';
        })
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "table-data.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      {(searchable || exportable) && (
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          {searchable ? (
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              allowClear
              style={{ width: 300 }}
            />
          ) : (
            <div />
          )}

          {exportable && (
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
          )}
        </Space>
      )}

      <Table<T>
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowKey={rowKey}
        pagination={tablePagination}
        scroll={{ x: 900 }}
      />
    </Card>
  );
};

export default GenericTable;