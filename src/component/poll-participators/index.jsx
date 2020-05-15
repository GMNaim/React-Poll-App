import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'


const ParticipatorsList = ({ poll }) => {
    const { opinions, options } = poll
    console.log(options)
    // alert(props.poll)
    // alert(props.opinions[0].name)


    const [activeTab, setactiveTab] = useState('all')  // hooks

    const toggle = tab => {
        if (activeTab != tab) {
            setactiveTab(tab) // upadating the useState hook
        }
    }


    return (
        <div>
            <h4 className="my-3"
                style={{ textAlign: "center" }}
            >List of participants for this poll.</h4>
            <Nav tabs>
                {/* opinions filtering nav */}
                <NavItem
                    style={{ cursor: 'pointer' }}
                >
                    <NavLink
                        style={{
                            backgroundColor: activeTab === 'all' ? 'green' : '',
                            fontWeight: "bold",
                            color: activeTab === 'all' ? 'white' : 'black'
                        }}
                        active={activeTab === 'all'}
                        onClick={() => { toggle('all') }}>
                        All
                        </NavLink>
                </NavItem>

                {/* nav item per options */}
                {options.map(individualOption => (
                    <NavItem
                        key={individualOption.id}
                        style={{ cursor: 'pointer' }}
                    >
                        <NavLink
                            style={{
                                backgroundColor: activeTab === individualOption.id ? 'green' : '',
                                fontWeight: "bold",
                                color: activeTab === individualOption.id ? 'white' : 'black'
                            }}
                            active={activeTab === individualOption.id}
                            onClick={() => { toggle(individualOption.id) }}
                        >
                            {individualOption.value}
                        </NavLink>

                    </NavItem>))}
            </Nav>

            {/* tab contents accourding to the nav items */}
            <TabContent activeTab={activeTab}>
                <TabPane tabId='all'>

                    <ListGroup className='w-100'>
                        {opinions.map((individualOpinion) => (<ListGroupItem>
                            <strong>Participant Name:</strong>  {individualOpinion.name} <br />
                            <strong>Vote for:</strong> {individualOpinion.selectedOptionValue}
                        </ListGroupItem>))}
                    </ListGroup>

                </TabPane>

                {options.map(option => (
                    <TabPane tabId={option.id}
                        key={option.id}
                    >

                        <ListGroup className='w-100'>
                            {opinions.map((opinion) => {
                                return (opinion.selectedOption === option.id ?
                                    <ListGroupItem>{opinion.name}</ListGroupItem> : '')
                            })}

                        </ListGroup>

                    </TabPane>))}

            </TabContent>

        </div>
    )
}

ParticipatorsList.propTypes = {
    selectedPoll: PropTypes.object.isrequired,
}
export default ParticipatorsList