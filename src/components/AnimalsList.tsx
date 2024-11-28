import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AnimalModel } from '../models/AnimalModel';

const api = import.meta.env.VITE_ANIMALS_API;

const AnimalsList: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);

  useEffect(() => {
    fetch(api).then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const columns: TableProps<AnimalModel>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (_, i) => <img className='table-image' src={i.imageUrl} alt={i.name} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, i) => <Link to={`/details/${i.id}`}>{text}</Link>,
    },
    {
      title: 'Months',
      dataIndex: 'months',
      key: 'months',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Animal type',
      dataIndex: 'animalTypeName',
      key: 'animalTypeName'
    },
    {
      title: 'Gender',
      dataIndex: 'genderName',
      key: 'genderName',
      render: (text) => text == "Female" ? <Tag color="pink">{text}</Tag> : <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, i) => (
        <Space size="middle">
          <Link to={`/details/${i.id}`}>
            <Button type='text' icon={<InfoCircleFilled />}></Button>
          </Link>
          <Link to={`/edit/${i.id}`}>
            <Button type='text' color='primary' icon={<EditFilled />}></Button>
          </Link>
          <Popconfirm
            title="Delete animal"
            description={`Are you sure to delete ${i.name}`}
            onConfirm={() => deleteAnimal(i.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type='text' danger icon={<DeleteFilled />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteAnimal = (id: number) => {
    setAnimals(animals?.filter(x => x.id !== id));

    fetch(api + id, { method: "DELETE" }).then(res => {
      if (res.status === 200) {
        message.success("Animal deleted succesfully!");
      }
    })
  }

  return (
    <Table<AnimalModel> columns={columns} dataSource={animals} rowKey="id" />
  )
}

export default AnimalsList;