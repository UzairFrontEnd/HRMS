import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { religionFields } from './FormFields.js';
import { addSingleReligion, updateSingleReligion, deleteSingleReligion } from '../../../../ducks/services';

export default (props) => {
  const { title, onClose, religion } = props;
  const { Title, Text } = Typography;
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    const payload = {
      name1: values.religion_name,
    };
    religion.religion.length == 0
      ? addSingleReligion(payload)
          .then((response) => {
            message.success('Religion Added Successfully');
            onClose();
          })
          .catch((error) => message.error('Country exists'))
      : updateSingleReligion(religion.name, payload)
          .then((response) => {
            message.success('Country Updated Successfully');
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };
  const onDeleteNationality = () => {
    deleteSingleReligion(religion.name)
      .then((response) => {
        message.success('Country Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Country Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (religion.name.length > 0) {
      setValue('religion_name', religion.name);
    } else {
      reset();
    }
  }, [religion]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 30]}>
            {religionFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            {religion.religion.length == 0 ? (
              <>
                <Col span={12}>
                  <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                    Close
                  </Button>
                </Col>
                <Col span={12}>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                    Add
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col span={12}>
                  <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                    Delete
                  </Button>
                </Col>
                <Col span={12}>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                    Save
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
