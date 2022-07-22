import { notification } from 'antd';

export const openNotification = (type, placement, title, description) => {
    notification[type]({
        message: title,
        description: description,
        placement,
    });
};

//type: 'success', 'info', 'warning', 'error'
//placement: 'top', 'bottom', 'topLeft', 'topRight, 'bottomLeft', 'bottomRight'
//title=> đây là thông báo gì?
//description=> nội dung thông báo