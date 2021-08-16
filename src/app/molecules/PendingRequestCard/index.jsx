import React, { Fragment } from 'react';
import { Card, Space, Typography, List, Avatar} from 'antd';
import FigureChips from '../../atoms/FigureChips';
import { Link } from 'react-router-dom';


const { Title, Text } = Typography;

export default (props) => {

    const {data, title, count, link, label, status, innerlink} = props;
    const countStatus = {
        value: count,
        title: label,
        status: status
    }


    return (
        <Card bordered={false} className={`uni-card dashboard-card main-card-hover ${status ? '' : 'no-listspace'}`}>
            <Space size={20} direction='vertical' className='w-100'>
                {title && <Title level={5} className='c-default mb-0'>{title}</Title>}
                <FigureChips data={countStatus} link={link} />
                <List
                    itemLayout="horizontal"
                    className='icon-list'
                    dataSource={data && data}
                    renderItem={item => (
                    <List.Item key={item.name} className='w-100'>
                        <Link
                        className='w-100'
                        to={innerlink != '' && innerlink + item.name}
                        >
                            <Space size={17} className='w-100'>
                                <Avatar size={40} src={item?.user_image && `http://cms2dev.limkokwing.net${item?.user_image}`} />
                                <Space size={0} direction='vertical'>
                                    <Text className='c-gray'>{item.name}</Text>
                                    <Text className='titlename'>{item.applicant_name}</Text>
                                </Space>
                            </Space>
                        </Link>
                    </List.Item>
                    )}
                />
            </Space>
        </Card>
    )
}