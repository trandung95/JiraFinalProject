import React, { useEffect } from 'react'
import ContentMain from '../../components/Jira/Main/ContentMain'
import HeaderMain from '../../components/Jira/Main/HeaderMain'
import InfoMain from '../../components/Jira/Main/InfoMain'
import { useSelector, useDispatch } from 'react-redux'
import { getProjectDetailService } from '../../services/JiraServices'
import { Popover } from 'antd'
import HTMLReactParser from 'html-react-parser';

export default function Jira(props) {
    // console.log(props.match.params.projectId)
    const projectDetail = useSelector(state => state.ProjectReducer.projectDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        const projectId = props.match.params.projectId;
        const action = getProjectDetailService(projectId);
        dispatch(action);
    }, [])
    console.log('jira => projectDetail: ', projectDetail)
    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />

            {/* <Popover placement='bottom' title={"Description"} content={HTMLReactParser(projectDetail?.description)}> */}
            <h3><strong>{projectDetail.projectName}</strong></h3>
            {/* </Popover> */}

            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
        </div>
    )
}
