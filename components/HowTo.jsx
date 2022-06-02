import { Stepper, Step, StepLabel, StepButton, StepIcon, Icon } from "@material-ui/core";
import styled from "styled-components";
import Bounce from "react-reveal/Bounce"
import Slide from "react-reveal/Slide"

const dev1 = styled.div`
width: 200px;
height: 200px;
border: 1px solid #c3c3c3;
display: flex;
flex-direction: row;
`
const signin = styled.div`
font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
const image = styled.div`

`


function HowTo() {

  return (
    < >
      <Stepper orientation="vertical" activeStep={3}>
        <Step>
          <StepLabel>
            <div className="dev1" style={
              {
                flexDirection: 'row',
                orientation: 'row'
              }
            }  >
              <h1 className={image}
                style={{
                  width: '300px',
                  marginLeft: '50px',
                  mariginBottom: '50px'
                }} >Sign in</h1>
              <Bounce left >
                <div className={image}
                  style={{
                    width: '300px',
                    marginLeft: '500px',
                    mariginBottom: '50px'
                  }}              >
                  <img
                    className={image} src='https://cdn.pixabay.com/photo/2021/11/18/11/35/attack-6806140__340.png' />

                </div>
              </Bounce>
              


            </div>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            <Slide right>
              
            <div className="dev2" >
              <h1 className="tutors"
                style={{
                  width: '300px',
                  marginLeft: '600px',
                  marginTop: '50px',
                  mariginBottom: '50px'
                }}
              >
                Choose Tutor              </h1>
              <img
                className="tutorsImg" src='https://cdn.pixabay.com/photo/2017/08/05/17/16/business-2584713__340.jpg' />
            </div>

            </Slide>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>   <div className="dev3"   >
            <h1 className="schedule" >
              Schedule         </h1>
            <img
              style={{
                width: '300px',
                marginLeft: '600px',
                marginTop: '50px',

              }}
              className="scheduleImg" src='https://cdn.pixabay.com/photo/2021/02/09/09/35/calendar-5997974__340.png' />
          </div>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>  
            <Bounce left>

            
             <div className="dev4"   >
            <h1 className="payment"
              style={{
                width: '300px',
                marginLeft: '600px',
                marginTop: '50px',

              }}
            >
              Pay and Attend the Class              </h1>
            <img
              className="paymentImg" src="https://cdn.pixabay.com/photo/2021/08/23/14/50/online-shopping-6567977__340.png" />
          </div>
          </Bounce>
          </StepLabel>
        </Step>

      </Stepper>
    </>
  );
}

export default HowTo