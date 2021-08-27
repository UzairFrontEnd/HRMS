import React, {useState, useEffect, Fragment} from 'react';
import {Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { uniquiFileName, getSingleUpload } from '../../../../../../../../features/utility';

const { Title, Text } = Typography;

export default (props) => {
    
    const { control, errors, setValue, handleSubmit } = useForm();
    const { title, onClose, onUpdate } = props;

    const formFields = [
        {
          name: 'policy_title',
          label: 'Title',
          req: true,
          placeholder: 'Please state',
          type: 'input',
          twocol: false,
          reqmessage: 'Please enter title',
        },
        {
          name: 'attachment',
          label: 'Attachment',
          req: true,
          placeholder: 'Upload',
          type: 'upload',
          twocol: false,
          reqmessage: 'Attachment required',
        },
    ];

 

    const onFinish = async (val) => {
        console.log('val', val)

        let userRole = []
        if(val?.user_roles.length > 0){
            val.user_roles.map(resp => {
                userRole.push({
                    parentfield: "policy_user_group",
                    parenttype: "HRMS Policy",
                    user_roles: resp?.value,
                    doctype: "HRMS Policy User Group"
                })
            })
        }
        
        const json = {
            data: {
                policy_title: val?.policy_title,
                //attachment: '/private/files/CMS2_03_AQA_Flowchart.pdf',
                doctype: "HRMS Policy",
                //policy_user_group: userRole
            }
        }
        console.log('json', json)

        let url = `${apiresource}/HRMS Policy`;
        
        try {
            const resp = await axios.post(url, json);

            if (resp?.status == 200) {
                console.log('resp', resp)
                const policyName = resp['data']?.data.name;
                let policyAttatchment = [];
                if (val?.attachment) {
                    let modifiedName = uniquiFileName(val.attachment?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'pdf',  val.attachment?.file?.originFileObj, 'HRMS Policy', policyName);
                    policyAttatchment = res?.file_url;
                }

                const payLoad = {
                    data: {
                        policy_title: val?.policy_title,
                        attachment: policyAttatchment,
                        doctype: "HRMS Policy",
                        name: policyName,
                        policy_user_group: userRole
                    }
                }

                let url2 = `${apiresource}/HRMS Policy/${policyName}`;
                try {
                    await axios.put(url2, payLoad);
                    message.success('Policy Successfully Added');
                    setTimeout(() => onClose, 1000)
                    setTimeout(() => onUpdate, 1200)
                } catch(e) {
                    const { response } = e;
                    message.error(response?.data?.message);
                }
            }

            
        } catch(e) {
            const { response } = e;
            message.error(response?.data?.message);
        }
    };

    return (
        <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>

            <Row gutter={[20, 50]}>
                
                <Col span={24}>
                    <Space direction='vertical' size={20} className='w-100 text-center'>
                        <Title level={3} className='mb-0'>{title}</Title>
                        <Text>Please specify the details</Text>
                    </Space>
                </Col>

                <Col span={24}>
                    <Row gutter={[20, 30]}>                
                        {formFields.map((item, idx) => (
                            <Fragment key={idx}>
                                <FormGroup item={item} control={control} errors={errors} />
                            </Fragment>
                        ))}
                        <Col span={12}>
                            <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>Close</Button>
                        </Col>
                        <Col span={12}>
                            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">Save</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}