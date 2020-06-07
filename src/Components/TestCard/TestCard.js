import React from 'react';
import './TestCard.css';
import {Link} from 'react-router-dom';


class TestCard extends React.Component{
    render(){
        return (
            <div className="TestCard">
                <Link  to={`/test`}  style={{ textDecoration: 'none', color: 'inherit' }} onClick = {() => this.props.testFromCode(this.props.testCard.code)} >
                    <div className="image-container">
                        <img src={this.props.testCard.imageSrc} alt=''/>
                    </div>

                    <h2>{this.props.testCard.name}</h2>

                    <div className="TestCard-information">
                        <div className="TestCard-code">
                            <p>{this.props.testCard.code}</p>
                        </div>
                        
                        <div className="TestCard-reviews">
                            
                            <h3 className="rating">{`${this.props.testCard.rating} stars`}</h3>
                            <p>{`${this.props.testCard.reviewCount} reviews`}</p>
                        </div>
                        
                    </div>

                    <div className="TestCard-description">
                        <p>{this.props.testCard.description}</p>
                    </div>
                </Link>
            </div>
        )
    };
}
export default TestCard;