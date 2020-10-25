import React from "react";
import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import Recette from "./Recette";
import BorderPage from "./Recette";
import LigneRecette from "./LigneRecette";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";


class Plat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {nomPlat: '', lignesRecette:[],listIngredients:{}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLine = this.addLine.bind(this);
        this.init = this.init.bind(this);
        this.init();
    }

    handleSubmit() {

    }

    handleChange() {

    }

    addLine() {
        let lignes = this.state.lignesRecette.slice();
        lignes.push(<LigneRecette key={this.state.lignesRecette.length+1}/>);
        this.setState({lignesRecette: lignes});

    }

     init(){
        fetch('http://localhost:8080/ingredient/list')
            .then(result => result.json())
            .then(ingredients=>this.setState({listIngredients:ingredients}))
    }

    render() {
        return <Container>
            <Form  onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nom du plat</Form.Label>
                    <Form.Control
                        id="nomPlat"
                        name="nomPlat"
                        type="text"
                        value={this.state.nomPlat}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <CompteurApportNutritionnel/>
                <Recette handleClick = {this.addLine} lignesRecette ={this.state.lignesRecette}/>
            </Form>
        </Container>
    }

}


export default Plat
