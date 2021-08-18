import React, {useState, useEffect} from 'react';
import { Row, Col, Image, Menu, Typography, Card, Badge } from 'antd';
import loginLogo from "../../../assets/img/limkokwing-logo.svg";
import {
    DashboardIcon2,
    ApplicationsIcon,
    FacultyIcon,
    ProgrammeIcon,
    ModuleIcon,
    RequestIcon,
    FormsIcon,
    LetterIcon,
    CalendarIcon,
    ReportsIcon,
    OverviewIcon,
    StudentsIcon,
    ScholarshipIcon
} from '../../atoms/CustomIcons';
import {Link, useLocation} from 'react-router-dom';
import RoutingList from '../../../routing/config/RoutingList';
import { allowedRoutes } from '../../../routing/config/utils';
import { getRequestListingPending} from '../../modules/AQA/Requests/ducks/actions';
import { studentsStatus } from '../../modules/Registry/Students/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu } = Menu;
const IconList = {
    DashboardIcon2,
    ApplicationsIcon,
    FacultyIcon,
    ProgrammeIcon,
    ModuleIcon,
    RequestIcon,
    FormsIcon,
    LetterIcon,
    CalendarIcon,
    ReportsIcon,
    OverviewIcon,
    StudentsIcon,
    ScholarshipIcon
}

export default (props) => {

    const [menuList, setMenuList] = useState([]);
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const subkey = location.split('/')[1];
    const dataPending = useSelector((state) => state.request.requestListPending);
    const pendingList = useSelector((state) => state.students.pendingList);
    const selected = location.split('/').length > 1 ? `/${location.split('/')[1]}` : location;

    useEffect(() => {
        ModifyJson(allowedRoutes(RoutingList));
        dispatch(getRequestListingPending());
        dispatch(studentsStatus());
    }, []);

    const getCounting = (menu) => {
        if (menu ==  'Requests') {
            return <Badge className='menu-badge' count={dataPending.length} />
        } else if(menu ==  'Students') {
            return <Badge className='menu-badge' count={
                (pendingList.length > 0 ? pendingList[0]?.pending_offer_letter[0]?.visa_total : 0) + (pendingList.length > 0 ? pendingList[0]?.pending_student_registration[0]?.enrollment_total : 0)
            } />
        }
    }

    const ModifyJson = (data) => {
        var result = data.reduce(function (r, a) {
            if (a.parent) {
                r[a["menu"]] = r[a["menu"]] || [];
                if (a.submenu) {
                    r[a["menu"]].push(a);
                } else {
                    r[a["menu"]] = a;
                }
            }
            return r;
        }, Object.create(null));

        setMenuList(result);

      };

    return (
        <Card bordered={false} className='navBar'>
        <Row gutter={[30, 24]}>
            <Col span={24} className='text-center'>
                <Image style={{width: 160, height: 'auto'}} preview={false} src={loginLogo} alt="Limkokwing University of Creative Technology" />
            </Col>
            <Col span={24}>
                <Card bordered={false} className='transparent-card' style={{ height: 'calc(100vh - 220px)'}}>
                    <Menu mode="inline" theme= 'dark' defaultSelectedKeys={[selected]} defaultOpenKeys={[subkey]} className="main-menu">
                        {Object.entries(menuList).map(([key, val], index) => (
                            <>
                                {Array.isArray(val) ? 
                                    <SubMenu key={val[0].key} title={key} className='submenu-item'>
                                    {val.map((item, i) => {
                                        const IconComp = IconList[item.icon];
                                        return <Menu.Item key={item.path} className="menu-item" icon={<IconComp />}>
                                            <Link to={item.path}>
                                                {item.badge ? 
                                                <Row gutter={20}>
                                                    <Col flex='auto'>{item.submenu}</Col>
                                                    <Col>{getCounting(item.submenu)}</Col>
                                                </Row>
                                                : item.submenu}
                                            </Link>
                                        </Menu.Item>
                                    }
                                    )}
                                    </SubMenu>
                                    :
                                    <>
                                    <Menu.Item key={val.path} className="menu-item" icon={<DashboardIcon2 />}>
                                        <Link to={val.path}>{val.menu}</Link>
                                    </Menu.Item>
                                    {val.menu == 'Dashbaord' && 
                                    <Menu.Item disabled key="hrms" className='static-menu'>HUMAN RESOURCE</Menu.Item>}
                                    </>
                                }
                            </>
                        ))}
                    </Menu>
                </Card>
            </Col>
        </Row>
        </Card>
    )
}
