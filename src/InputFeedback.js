import React, {Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';

const InputFeedback = (props) => {
    return(
        <Fragment>
            
                {/* check if it's a name error */}

                { props.inputID === 0 && props.nameError ? 
                    
                    <CSSTransition
                        in={props.inputID === 0 && props.nameError}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <div className="inputWarning">
                            <p>Enter a name that's between 1 and 25 characters!</p>
                        </div>
                    </CSSTransition>:
                        <Fragment></Fragment>
                }

                {/* check if it's a class enrollment error */}
                { props.inputID === 1 && props.enrollError ? 
                    <CSSTransition
                        in={props.inputID === 1 && props.enrollError}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <div className="inputWarning">
                            <p>Class names must be of the form (3 letters)(3 numbers)!</p> 
                            
                        </div>
                    </CSSTransition>:
                        <Fragment></Fragment>
                    
                }

                {/* check at least 1 class has been enrolled */}
                {props.numEnrolled > 6 || props.numEnrolled < 1 ?
                    <CSSTransition
                        in={props.numEnrolled > 6 || props.numEnrolled < 1}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <div className="inputWarning">
                            <p>You must enroll between 1 and 6 classes!</p>
                        </div>
                    </CSSTransition> :
                        <Fragment></Fragment>
                }
            
        </Fragment>
        
    );
}

export default InputFeedback;