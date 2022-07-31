import React from 'react'

export default function InfoMain(props) {
    // console.log('info main=> members', props.members)
    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {props.projectDetail.members?.map((item, index) => {
                    return <div key={index} className='avatar'>
                        <img src={item.avatar} alt={item.name} />
                    </div>
                })}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
