import { Button, Form, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { LeftOutlined } from '@ant-design/icons';
import { FormProps, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimalTypeModel } from '../models/AnimalTypeModel';
import { AnimalGenderModel } from '../models/AnimalGenderModel';
import { AnimalGenderOption } from '../models/AnimalGenderOption';
import { AnimalTypeOption } from '../models/AnimalTypeOption';
import axios from 'axios';
import { AnimalFormField } from '../models/AnimalFormField';

const animalsApi = import.meta.env.VITE_ANIMALS_API;
const typesApi = import.meta.env.VITE_ANIMAL_TYPES_API;
const gendersApi = import.meta.env.VITE_ANIMAL_GENDERS_API;

export default function AddAnimal() {
    const navigate = useNavigate();
    const [animalTypes, setAnimalTypes] = useState<AnimalTypeOption[]>([]);
    const [animalGenders, setAnimalGenders] = useState<AnimalGenderOption[]>([]);
    
    useEffect(() => {
        fetch(typesApi)
        .then(res => res.json())
        .then(data => {
            setAnimalTypes((data as AnimalTypeModel[]).map(x => {
                return { label: x.name, value: x.id };
            }));
        });

        fetch(gendersApi)
        .then(res => res.json())
        .then(data => {
            setAnimalGenders((data as AnimalGenderModel[]).map(x => {
                return { label: x.name, value: x.id };
            }));
        });
    }, []);
    
    const onSubmit: FormProps<AnimalFormField>["onFinish"] = (animal) => {
        console.log(animal);

        const data = new FormData();

        for (const key in animal) {
            data.append(key, animal[key as keyof AnimalFormField] as string | Blob);
        }

        axios.post(animalsApi, data).then(res => {
            if (res.status == 200) {
                message.success("Animal added succesfully!");
                navigate("/animals");
            }
        }).catch(err => {
            if (err.response.data.errors) {
                const firstErrorKey = Object.keys(err.response.data.errors)[0];
                message.error(err.response.data.errors[firstErrorKey][0]);
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            <h2>Add new Animal</h2>

            <Form
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 10,
                }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<AnimalFormField> label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: "Field must be filled"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<AnimalFormField> label="Animal type" name="animalTypeId" rules={[
                    {
                        required: true,
                        message: "Field must be filled"
                    }
                ]}>
                    <Select options={animalTypes}></Select>
                </Form.Item>
                <Form.Item<AnimalFormField> label="Animal gender" name="genderId" rules={[
                    {
                        required: true,
                        message: "Field must be filled"
                    }
                ]}>
                    <Select options={animalGenders}></Select>
                </Form.Item>
                <Form.Item<AnimalFormField> label="Months" name="months" rules={[
                    {
                        required: true,
                        message: "Field must be filled"
                    }
                ]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<AnimalFormField> label="Image url" name="imageUrl" rules={[
                    {
                        required: true,
                        message: "Field must be filled"
                    }
                ]}>
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<AnimalFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}