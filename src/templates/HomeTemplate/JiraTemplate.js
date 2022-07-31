import { Route } from "react-router-dom"
import React from "react";
import '../../index.css'
import Sidebar from "../../components/Jira/Sidebar";
import Menu from "../../components/Jira/Menu";
import SearchModal from "../../components/Jira/Modal/SearchModal";
import InfoModal from "../../components/Jira/Modal/InfoModal";

export const JiraTemplate = (props) => {
    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div>
                <div className="jira">
                    <Sidebar />
                    <Menu />
                    {/* phần giao diện thay đổi */}
                    <Component {...propsRoute} />
                    {/* phần giao diện thay đổi */}
                </div>
                <SearchModal />
                <InfoModal />
            </div>
        </>
    }} />
}