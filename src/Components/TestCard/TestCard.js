import React from 'react';
import './TestCard.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';


class TestCard extends React.Component{
    render(){
        return (
            <div className="TestCard">
                <Link  to={`/test`}  style={{ textDecoration: 'none', color: 'inherit' }} onClick = {() => this.props.testFromCode(this.props.testCard.code)} >
                <Card>
                    <Card.Header>
                    <h2>{this.props.testCard.name}</h2>
                    </Card.Header>
                    <Card.Body>
                    <div className="TestCard-information">
                        <div className="TestCard-code">
                            <p>{this.props.testCard.code}</p>
                        </div>
                        
                    </div>

                    <div className="TestCard-description">
                        <p>{this.props.testCard.description}</p>
                    </div>
                    </Card.Body>
                </Card>
                </Link>
            </div>
        )
    };
}
export default TestCard;