import React from 'react'
import { Route } from 'react-router-dom'
import FooterHome from '../components/FooterHome/FooterHome'
import HeaderHome from '../components/HeaderHome/HeaderHome'

export default function HomeTemplate(props) { //props: {component: , path: '', mobileComponent: }

    return (
        <Route exact path={props.path} render={(propsRoute) => {

            return <>
                headerHome
                <HeaderHome {...propsRoute} />
                <div >
                    <props.component {...propsRoute} />
                </div>
                footerhome
                <FooterHome {...propsRoute} />
            </>
        }} />
    )
}
