import React, { useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { addAccount } from './FormFileds';
import FormGroup from '../../../../../../molecules/FormGroup';
import { updateAccount, addNewAccount } from '../../../ducks/services';

const AddAccount = (props) => {
  const { selectedAccout, onCloseForm } = props;
  const { id } = useParams();
  const { Title } = Typography;
  const { control, errors, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (selectedAccout?.account_no) {
      setValue('account_no', selectedAccout.account_no);
      setValue('account_type', { value: selectedAccout.account_type, label: selectedAccout.account_type });
      setValue('branch', selectedAccout.branch);
    }
  }, [selectedAccout]);

  const onSubmitHandler = (values) => {
    const payload = {
      account_no: values?.account_no,
      account_type: values?.account_type.label,
      branch: values?.branch,
    };

    selectedAccout.name
      ? updateAccount(selectedAccout?.name, payload).then((response) => {
          message.success(`${selectedAccout?.name} Updated Seccussfully`);
          onCloseForm('', '');
        })
      : addNewAccount({ employee_id: id, account: { ...payload, status: 'Active' } }).then((response) => {
          message.success(`New Account Added Seccussfully`);
          onCloseForm('', '');
        });
  };

  return (
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Account Details
          </Title>
        </Col>
        {addAccount.map((value, key) => (
          <FormGroup key={key} item={value} control={control} errors={errors} />
        ))}
        <Col span={24}>
          <Row gutter={24} justify="end">
            {selectedAccout?.name ? (
              <>
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="red-btn">
                    Delete Account
                  </Button>
                </Col>
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Save Changes
                  </Button>
                </Col>
              </>
            ) : (
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Add Account
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAccount;
