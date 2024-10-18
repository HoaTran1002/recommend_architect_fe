import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { DataCard } from '../grid/courseGrid';

const { Meta } = Card;

const CardCustomize: React.FC<DataCard> = (data:DataCard) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={data.pathImage}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src={data.avatar} />}
      title={data.title}
      description={data.description}
    />
  </Card>
);

export default CardCustomize;