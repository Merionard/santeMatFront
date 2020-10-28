import React from "react";
import Container from "react-bootstrap/Container";
import {Form} from "react-bootstrap";
import Recette from "./Recette";
import LigneRecette from "./LigneRecette";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";

const ingredientOptions = initOptions();
class Plat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {nomPlat: '',
            lignesRecette: [],
            apportNutritionnel:{potassium:0,calcium:0,magnesium:0,sodium:0,phosphore:0},
            listeIngredients:[],count:0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLine = this.addLine.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.deleteLine = this.deleteLine.bind(this);

    }

    handleSubmit() {

    }

    handleChange(event) {
        console.log('event:' + event)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectChange(event, stateNameAttr) {
        let listIngredients = this.state.listeIngredients.slice();
        listIngredients.push(event.value)
        this.setState({
            listeIngredients: listIngredients
        })
    }

    addLine() {
        let lignes = this.state.lignesRecette.slice();
        lignes.push(<LigneRecette
            key={this.state.lignesRecette.length}
            count={this.state.count}
            listIngredients={ingredientOptions}
            handleChange={this.handleSelectChange}
            delete = {(index)=>this.deleteLine(index)}/>);
        this.setState({lignesRecette: lignes,count:this.state.count+1});

    }

    deleteLine(count){
        let lignes = this.state.lignesRecette;
        const findLigne = (obj) => obj.props.count === count;
        lignes.splice(lignes.findIndex(findLigne), 1);
        this.setState({lignesRecette:lignes});
    }


    render() {
        return <Container>
            <Form onSubmit={this.handleSubmit}>
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
                <Recette handleClick={this.addLine} lignesRecette={this.state.lignesRecette}/>
            </Form>
        </Container>
    }

}

function initOptions() {
    let options = [];
    fetch('http://localhost:8080/ingredient/list')
        .then(result => result.json())
        .then(ingredients => ingredients.map(ingredient=>options.push({value:ingredient,label:ingredient.nom})));
    return options;

}


export default Plat
