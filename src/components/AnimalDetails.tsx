import { Flex, Divider, Skeleton, Space, Button } from 'antd';
import { AnimalModel } from '../models/AnimalModel';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const api = import.meta.env.VITE_ANIMALS_API;

export default function AnimalDetails() {
    type QueryParams = {
        id: number
    }

    const [animal, setAnimal] = useState<AnimalModel | null>(null);
    const { id } = useParams<QueryParams>();
    useEffect(() => {
        fetch(api + id).then(res => res.json()).then(data => setAnimal(data));
    })
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={ () => navigate(-1) } variant='text' icon={<LeftOutlined />} style={{marginBottom: "5px"}}></Button>
            {
                animal ?
                    <div>
                        <img style={{ height: "400px", marginTop: "10px" }} src={animal.imageUrl} alt={animal.name} />
                        <h2>Name: {animal.name}</h2>
                        <h3>Type: {animal.animalTypeName}</h3>
                        <h3>Gender: {animal.genderName}</h3>
                        <h3>Months: {animal.months}</h3>
                        <p>Description: {animal.description}</p>
                    </div >
                    :
                    <Flex gap="middle" vertical>
                        <Skeleton.Image active style={{
                            width: "400px",
                            height: "300px"
                        }} />
                        <Skeleton.Input active style={{
                            width: "15vw"
                        }} />
                        <Skeleton.Input active style={{
                            width: "10vw"
                        }} />
                        <Skeleton paragraph={{ rows: 3 }} active style={{
                            width: "30vw"
                        }}></Skeleton>
                        <Space>
                            <Skeleton.Button active style={{ width: "10vw" }}></Skeleton.Button>
                            <Skeleton.Button active style={{ width: "10vw" }}></Skeleton.Button>
                        </Space>
                        <Divider />
                    </Flex>
            }
        </>
    );
};