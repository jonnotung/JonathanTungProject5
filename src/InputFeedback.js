import React, {Fragment} from 'react';

const InputFeedback = (props) => {
    return(
        <Fragment>
            {/* check if it's a name error */}
            { props.inputID === 0 && props.nameError ? 
                <div className="inputWarning">
                    <p>Enter a name that's between 1 and 25 characters!</p>
                </div> :
                    <Fragment></Fragment>
                
            }

            {/* check if it's a class enrollment error */}
            { props.inputID === 1 && props.enrollError ? 
                <div className="inputWarning">
                    <p>Class names must be of the form (3 letters)(3 numbers)!</p> 
                </div>:
                    <Fragment></Fragment>
                
            }

            {/* check at least 1 class has been enrolled */}
            {props.numEnrolled > 6 || props.numEnrolled < 1 ?
                <div className="inputWarning">
                    <p>You must enroll between 1 and 6 classes!</p>
                </div> :
                    <Fragment></Fragment>
            }
        </Fragment>
    );
}

export default InputFeedback;