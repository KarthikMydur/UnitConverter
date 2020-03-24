import React from 'react'
import convert from 'convert-units'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Selector from './Components/Selectors'
import InputField from './Components/InputField'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            mainSelector: '',
            firstQuantity: '',
            secondQuantity: '',
            firstInput: 0,
            secondInput: 0,
            flow: ''
        }
    }
    generateMainSelector = () => {
        return(
            convert().measures().map(ele => ele[0].toUpperCase + ele.slice(1))
        )
    }

    handleMainSelector = (e) =>{
        e.preventDefault()
        this.setState({
            mainSelector: e.target.value,
            firstQuantity: '',
            secondQuantity: '',
            firstInput: 0,
            secondInput: 0
        })
    }
    
    handleSelector = (e) => {
        this.setState({[e.target.name]: e.target.value, firstInput:0, secondInput:0})
    }

    handleInputFields =(e)=>{
        e.preventDefault()
        if(e.target.name === 'firstInput') {
            this.setState({
                firstInput: e.target.value,
                flow: 'L2R'
            },
            () => this.handleConversion())
        }else if(e.target.name === 'secondInput') {
            this.setState({
                secondInput: e.target.value,
                flow: 'R2L'
            }, () => this.handleConversion())
        }
    }

    handleConversion = () => {
        if(this.state.flow === 'L2R'){
            this.setState({
                secondInput: convert(this.state.firstInput).from(this.state.firstQuantity).to(this.state.secondQuantity)
            })
        }
        else if(this.state.flow === 'R2L') {
            this.setState({
            firstInput: convert(this.state.secondInput).from(this.state.secondQuantity).to(this.state.firstQuantity)
        })
        }
    }

    render(){
        return(
            <Container>
                <Grid container justify='center' align = 'center' spacing={3}>
                    <Selector data={{size: 12, label: 'Measurement', measurements: convert().measures(), populateType: 'mainSelector', populateWith: this.generateMainSelector}} handleSelector = {this.handleMainSelector}/>
                    {
                        this.state.mainSelector ? (
                            <div>
                                <Selector data = {{size: 6, label: 'Quantity', populateType: 'firstQuantity', populateWith: convert().list(this.state.mainSelector), selectedValue: this.state.firstQuantity }} handleSelector={this.handleSelector}/>

                                <Selector data = {{size: 6, label: 'Quantity', populateType: 'secondQuantity', populateWith: convert().list(this.state.mainSelector), selectedValue: this.state.secondQuantity }} handleSelector={this.handleSelector}/>
                            </div>
                        ) : (<div></div>)
                    }
                    {
                        this.state.firstQuantity && this.state.secondQuantity ? (
                            <div>
                                <InputField data={{currentValue: this.state.firstInput, input: this.state.firstQuantity, label: this.state.firstLabel, name: 'firstInput'}} handleInput = {this.handleInputFields}/>

                                <InputField data={{currentValue: this.state.secondInput, input: this.state.secondQuantity, label: this.state.secondLabel, name: 'secondInput'}} handleInput = {this.handleInputFields}/>
                            </div>
                        )  : (<> </>)
                    }
                </Grid>
            </Container>
        )
        
    }
}
export default App
