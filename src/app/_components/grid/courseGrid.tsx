"use client"
import React from 'react';
import { Card, List } from 'antd';
import CardCustomize from '../card/cardCourse';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
export interface DataCard {
  avatar: string
  title: string
  description: string
  pathImage: string

}
const dataCard: DataCard[] = [
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  },
  {
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    title: 'Card title',
    description: "This is the description",
    pathImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  }
]
const CourseGridCustomize: React.FC = () => (
  <List
    grid={{ gutter: 10, column: 5}}
    dataSource={dataCard}
    renderItem={item => (
      <List.Item>
        <CardCustomize avatar={item.avatar} title={item.title} description={item.description} pathImage={item.pathImage} />
      </List.Item>
    )}
  />
);

export default CourseGridCustomize;