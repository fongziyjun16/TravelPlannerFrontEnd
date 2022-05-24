import React, { Component } from "react";
import { Space, Table } from 'antd';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Day 1',
    dataIndex: 'day1',
    key: 'day1',
  },
  {
    title: 'Day 2',
    dataIndex: 'day2',
    key: 'day2',
  },
  {
    title: 'Day 3',
    dataIndex: 'day3',
    key: 'day3',
  },
  {
    title: 'Day 4',
    dataIndex: 'day4',
    key: 'day4',
  },
  {
    title: 'Day 5',
    dataIndex: 'day5',
    key: 'day5',
  },
  {
    title: 'Day 6',
    dataIndex: 'day6',
    key: 'day6',
  },
  {
    title: 'Day 7',
    dataIndex: 'day7',
    key: 'day7',
  },
  {
    title: 'Day 8',
    dataIndex: 'day8',
    key: 'day8',
  },
  {
    title: 'Day 9',
    dataIndex: 'day9',
    key: 'day9',
  },
  {
    title: 'Day 10',
    dataIndex: 'day10',
    key: 'day10',
  },
  {
    title: 'Day 11',
    dataIndex: 'day11',
    key: 'day11',
  },
  {
    title: 'Day 12',
    dataIndex: 'day12',
    key: 'day12',
  },
  {
    title: 'Day 13',
    dataIndex: 'day13',
    key: 'day13',
  },
  {
    title: 'Day 14',
    dataIndex: 'day14',
    key: 'day14',
  },
  {
    title: 'Day 15',
    dataIndex: 'day15',
    key: 'day15',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    username: 'A',
  },
  {
    key: '2',
    username: 'B',
  },
  {
    key: '3',
    username: 'C',
  },
];

class UserProfile extends Component {
  
  
  render() {
        return (
          <>
            <h1>Planning History</h1>
            <Space>
              <Table
              columns={columns} 
              dataSource={data}
              ></Table>
            </Space>
          </>
        );
    }
}

export default UserProfile;
