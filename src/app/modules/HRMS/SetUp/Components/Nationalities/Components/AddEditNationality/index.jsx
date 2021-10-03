import React, { useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { nationalityFields } from './FormFields';
import { addCountry, deleteSingleCountry, updateSingleCountry } from '../../../../ducks/services';

export default (props) => {
  const { title, onClose, countryName } = props;
  const { Title, Text } = Typography;
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    const payload = {
      country_name: values.country_name,
      code: values.country_name.substring(0, 3),
    };
    countryName.name.length == 0
      ? addCountry(payload)
          .then((response) => {
            message.success('Country Added Successfully');
            onClose();
          })
          .catch((error) => message.error('Country exists'))
      : updateSingleCountry(countryName.code, { name: values.country_name })
          .then((response) => {
            message.success('Country Updated Successfully');
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };
  const onDeleteNationality = () => {
    deleteSingleCountry(countryName.code)
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
    if (countryName.name.length > 0) {
      setValue('country_name', countryName.name);
    } else {
      reset();
    }
  }, [countryName]);
  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            {nationalityFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            {countryName.name.length == 0 ? (
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
