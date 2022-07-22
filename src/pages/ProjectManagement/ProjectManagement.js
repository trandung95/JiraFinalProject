import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Avatar, Popover, AutoComplete } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserProjectService, deleteProjectService, getProjectListService, removeUserFromProjectService, searchUserService } from '../../services/JiraServices';
import { editProjectAction, openDrawerPopUpAction } from '../../redux/actions/UserSignInAction';
import { NavLink } from 'react-router-dom';
import FormEdit from '../../components/Forms/FormEdit';

export default function ProjectManagement(props) {
    //lấy data từ redux xuống để binding giao diện
    const projectList = useSelector(state => state.ProjectManagementReducer.projectList);
    //lấy data để search tên người dùng
    const userSearch = useSelector(state => state.logInReducer.userSearch);

    const [value, setValue] = useState('');

    const searchRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        //gọi api lấy data về
        const action = getProjectListService()
        dispatch(action)
    }, [])




    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            }
            // filters: [
            //     {
            //         text: 'Joe',
            //         value: 'Joe',
            //     },
            //     {
            //         text: 'Jim',
            //         value: 'Jim',
            //     },
            // ],
            // filteredValue: filteredInfo.name || null,
            // onFilter: (value, record) => record.name.includes(value),
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`projectdetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();

                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
            // sortDirections:['descend'],

            // sorter: (a, b) => a.age - b.age,
            // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();

                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Creator',
            key: 'Creator',
            render: (text, record, index) => {
                // console.log("record", record)
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();

                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                // console.log('record project management', record);
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement='topLeft' title={"Members"} content={() => {
                            return <table className='table'>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        return <tr key={index}>
                                            <td><img src={item.avatar} width="30" height="30" /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Button shape="circle" danger type='primary' onClick={() => {
                                                    // console.log('member => userID', item.userId, item.name);
                                                    // console.log('projectID', record.id, record.projectName);
                                                    const data = {
                                                        "projectId": record.id,
                                                        "userId": item.userId
                                                    }
                                                    const action = removeUserFromProjectService(data);
                                                    dispatch(action);
                                                }}><DeleteOutlined /></Button>
                                            </td>
                                        </tr>

                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar key={index} src={member.avatar} />
                        </Popover>
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="bottom" title={"Add user"} content={() => {
                        return <AutoComplete
                            style={{ width: "100%" }}
                            //option hiện cái bảng danh sách mà nó tìm ra được
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}
                            //onSearch: tìm kiếm trong danh sách được đưa vào
                            onSearch={(value) => {
                                //1. hàm useRef lưu lại giá trị trước khi state thay đổi, searchRef mặc định giá trị là null, searchRef lưu giá trị trước đó, searchRef.current lưu giá trị hiện tại
                                //3. nhưng nếu nhập tiếp ký tự trong thời gian chờ 1000ms thì searchRef.current sẽ có giá trị mới, thì ta sẽ xóa bộ đếm trước đó đi (hàm clearTimeout) sau đó đi xuống tiếp setTimeout ở bước 2 để tạo bộ đếm mới
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                //2. khi gõ chữ vào input, searchRef sẽ thay đổi, nếu không có gì thay đổi, hàm bên trong setTimeout sẽ chạy sau 1000ms
                                searchRef.current = setTimeout(() => {
                                    const action = searchUserService(value);
                                    dispatch(action)
                                }, 1000);

                            }}
                            //onSelect: được gọi khi cái option được chọn
                            onSelect={(value, option) => {
                                //set gia tri cua hop thoai option.label
                                setValue(option.label)
                                //call API
                                // console.log('onSelect => userID', value)
                                // console.log('onSelect=> projectID', record.id)
                                const data = {
                                    "projectId": record.id,
                                    "userId": value
                                }
                                const action = assignUserProjectService(data);
                                dispatch(action)
                            }}
                            //onChange thay doi lai gia tri
                            onChange={(text) => {
                                setValue(text)
                            }}
                        />
                    }} trigger="click">
                        <Button shape="circle">+</Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => {
                let jsxContent = HTMLReactParser(text)
                // console.log(text, record, index)
                return <div key={index}>{jsxContent}</div>
            }
            // filters: [
            //     {
            //         text: 'London',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ],
            // filteredValue: filteredInfo.address || null,
            // onFilter: (value, record) => record.address.includes(value),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Action',
            key: 'x',
            render: (text, record, index) => {

                return <Space size="middle">
                    <Button type='primary' onClick={() => {
                        const action = openDrawerPopUpAction("Edit project",<FormEdit />);
                        dispatch(action);
                        const actionEdit = editProjectAction(record);
                        dispatch(actionEdit);
                    }}><EditOutlined /></Button>
                    <Button type='primary' danger onClick={() => {
                        // console.log(record)
                        if (window.confirm("Are your sure to delete this project?")) {
                            const action = deleteProjectService(record);
                            dispatch(action);
                        }
                    }}><DeleteOutlined /></Button>
                </Space>
            }
        }
    ];
    return (
        <div className='container-fluid'>
            <h3>Project Management</h3>
            <Space style={{ marginBottom: 16, }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
