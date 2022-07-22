import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (propsRoute) => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])
    let { Component, ...restRoute } = propsRoute;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={size.width / 2} style={{ height: size.height, backgroundImage: `url(https://picsum.photos/2000)`, backgroundSize: "100%" }}>
                    {/* <h3 className='bg-danger'>sider start</h3> */}
                </Sider>
                <Content>
                    {/* <p className='bg-danger'>start content</p> */}
                    <Component {...propsRoute} />
                    {/* <p className='bg-danger'>end content</p> */}
                </Content>
            </Layout>

        </>
    }} />
}