import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import EditAttendance from '../AttendanceDetail';
import { LeftOutlined } from '@ant-design/icons';
import { getMyAttendance, getSingleAttendanceDetail, getTotalAttendance } from '../../ducks/actions';
// import { getTotalAbsent } from '../../ducks/services';
import moment from 'moment';
const ListCol = [
  {
    title: 'Date in',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
    sorter: true,
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
  },
  {
    title: 'Hours',
    dataIndex: 'total_job_hour',
    key: 'total_job_hour',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'On Duty') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (
        text == 'Late Clock In' ||
        text == 'Late Clock Out' ||
        text == 'Early Clock In' ||
        text == 'Early Clock Out'
      ) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const dispatch = useDispatch();
  const [viewForm, setViewForm] = useState(false);
  const [empID, setEmpID] = useState('');
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const singleAttendanceDetail = useSelector((state) => state.attendance.singleAttendance);
  const totalAbsent = useSelector((state) => state.attendance.totalAbsent);

  const onRowClick = (record) => {
    return {
      onClick: () => {
        console.log({ record });
        setViewForm(true);
        setEmpID(record?.name);
      },
    };
  };

  useEffect(() => {
    dispatch(getMyAttendance(id, 1, 6, '', ''));
    dispatch(getTotalAttendance(id));
  }, [id]);

  useEffect(() => {
    if (empID && viewForm === true) {
      dispatch(getSingleAttendanceDetail(empID));
    }
  }, [empID, viewForm]);

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Attendance
          </Title>
        </Col>
        {viewForm ? (
          <Col span={24}>
            <Button
              type="link"
              htmlType="button"
              className="mb-1 p-0 c-gray-linkbtn"
              icon={<LeftOutlined />}
              onClick={() => setViewForm(false)}
            >
              Attendance History
            </Button>
            <Col span={24}>
              <EditAttendance attendanceData={singleAttendanceDetail} onViewForm={setViewForm} />
            </Col>
          </Col>
        ) : (
          <>
            <Col span={24}>
              {totalAbsent && (
                <Card bordered={false} className={`mini-card req-card-pending`}>
                  <Row gutter={[20, 30]}>
                    <Col span={24}>
                      <Space size={5} direction="vertical" align="start">
                        <Text className="mb-0 c-white">Number of Days Absent</Text>
                        <Title level={3} className="mb-0">
                          {`${totalAbsent} Days`}
                        </Title>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
            <Col span={24}>
              <ListCard
                title="Attendance History"
                ListCol={ListCol}
                ListData={myAttendance?.rows}
                onRow={onRowClick}
                pagination={true}
                classes="clickRow"
                listClass="nospace-card"
                onChange={onTableChange}
                scrolling={500}
                pagination={{
                  total: myAttendance?.count,
                  current: page,
                  pageSize: limit,
                }}
              />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};