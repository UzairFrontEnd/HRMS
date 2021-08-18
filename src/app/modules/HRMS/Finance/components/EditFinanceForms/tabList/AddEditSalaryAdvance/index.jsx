import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { closeAllOpenForms } from '../../../../ducks/action';

const salayAdvCol = [
  {
    title: 'Date Applied',
    dataIndex: 'date_applied',
    key: 'date_applied',
    sorter: (a, b) => a.date_applied.length - b.date_applied.length,
    render: (text, record) => moment(text).format('LL'),
  },
  {
    title: 'Deduction Date',
    dataIndex: 'deduction_date',
    key: 'deduction_date',
    sorter: (a, b) => a.deduction_date.length - b.deduction_date.length,
  },
  {
    title: 'Ammount',
    dataIndex: 'salary_ammount',
    key: 'salary_ammount',
    sorter: (a, b) => a.salary_ammount.length - b.salary_ammount.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    //sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
];

const AddEditSalaryAdvance = () => {
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [viewSalaryAdvanceForm, setviewSalaryAdvanceForm] = useState(false);
  const tabVal = useSelector((state) => state.finance.tabClose);

  const onFormViewer = () => {
    dispatch(closeAllOpenForms(true));
    setviewSalaryAdvanceForm(true);
  };

  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewSalaryAdvanceForm && tabVal ? (
        <Form layout="vertical" scrollToFirstError={true}>
          <Breadcrumb className="mb-1 c-gray">
            <Breadcrumb.Item onClick={() => setviewSalaryAdvanceForm(false)}>{`< Salary Advance List`}</Breadcrumb.Item>
          </Breadcrumb>
          {/*render add salary form*/}
        </Form>
      ) : (
        <Col span={24}>
          <ListCard title="Salary Advance List" ListCol={salayAdvCol} ListData={[]} pagination={true} />
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Advance
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AddEditSalaryAdvance;