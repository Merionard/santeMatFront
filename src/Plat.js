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
        this.state = {
            nomPlat: '',
            lignesRecette: [],
            apportNutritionnel: {potassium: 0, calcium: 0, magnesium: 0, sodium: 0, phosphore: 0},
            count: 0, dataLines: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLine = this.addLine.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.deleteLine = this.deleteLine.bind(this);
        this.handleQteChange = this.handleQteChange.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);

    }

    handleSubmit() {

    }

    handleChange(event) {
        console.log('event:' + event)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleQteChange(event, count) {
        // ajout de la quantité à la ligne correspondante
        const findLigne = (line) => line.count === count;
        let line = this.state.dataLines.find(findLigne);
        line.quantite = isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value);

        // maj apportNutriotionnel (seulement si un ingrédient est sélectionné)
        if (line.ingredient.nom !== 'undefined') {
            this.majApportNutritionnel(this.calculApportNutritionnel(line));
        }
    }

    handleSelectChange(event, _, count) {
        // ajout de l'ingrédient à la line correspondante
        const findLigne = (line) => line.count === count;
        let line = this.state.dataLines.find(findLigne);
        line.ingredient = event.value;

        // maj apportNutritionnel
        this.majApportNutritionnel(this.calculApportNutritionnel(line));


    }

    calculApportNutritionnel(lineData) {
        let ingredient = lineData.ingredient;
        let apport = {
            potassium: ingredient.apportNutritionnel.potassium * lineData.quantite,
            calcium: ingredient.apportNutritionnel.calcium * lineData.quantite,
            magnesium: ingredient.apportNutritionnel.magnesium * lineData.quantite,
            sodium: ingredient.apportNutritionnel.sodium * lineData.quantite,
            phosphore: ingredient.apportNutritionnel.sodium * lineData.quantite
        }
        if (ingredient.typeComptabilisation === 'POIDS') {
            apport.potassium = apport.potassium / 100
            apport.calcium = apport.calcium / 100
            apport.magnesium = apport.magnesium / 100
            apport.sodium = apport.sodium / 100
            apport.phosphore = apport.phosphore / 100
        }

        return apport;
    }

    majApportNutritionnel(apport, remove = false) {

        let apportNutritionnel = this.state.apportNutritionnel;
        if (remove) {
            apportNutritionnel.potassium -= apport.potassium
            apportNutritionnel.calcium -= apport.calcium
            apportNutritionnel.magnesium -= apport.magnesium
            apportNutritionnel.sodium -= apport.sodium
            apportNutritionnel.phosphore -= apport.phosphore

        } else {
            apportNutritionnel.potassium += apport.potassium
            apportNutritionnel.calcium += apport.calcium
            apportNutritionnel.magnesium += apport.magnesium
            apportNutritionnel.sodium += apport.sodium
            apportNutritionnel.phosphore += apport.phosphore
        }
        this.setState({apportNutritionnel: apportNutritionnel});
    }


    addLine() {
        let lignes = this.state.lignesRecette.slice();
        let dataLines = this.state.dataLines.slice();
        let count = this.state.count + 1;

        dataLines.push({count: count, ingredient: {}, quantite: 0});

        lignes.push(<LigneRecette
            key={this.state.lignesRecette.length}
            count={count}
            listIngredients={ingredientOptions}
            handleChange={this.handleSelectChange}
            handleQteChange={(event, count) => this.handleQteChange(event, count)}
            delete={(index) => this.deleteLine(index)}/>);

        this.setState({
            lignesRecette: lignes,
            count: count,
            dataLines: dataLines
        });

    }

    deleteLine(count) {
        //suppressions de la ligne
        let lignes = this.state.lignesRecette;
        const findLigne = (obj) => obj.props.count === count;
        lignes.splice(lignes.findIndex(findLigne), 1);
        this.setState({lignesRecette: lignes});

        //supression des data de la ligne + maj apportNutritionnel
        let dataLine = this.state.dataLines.find((line) => line.count === count);
        let dataLines = this.state.dataLines.slice();
        dataLines.splice(dataLines.findIndex(line => line.count === count), 1);

        if (dataLine.ingredient !== undefined && dataLine.ingredient.apportNutritionnel !== undefined) {
            this.majApportNutritionnel(this.calculApportNutritionnel(dataLine), true)
        }

        this.setState({dataLines: dataLines});

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
                <CompteurApportNutritionnel apportNutritionnel={this.state.apportNutritionnel}/>
                <Recette handleClick={this.addLine} lignesRecette={this.state.lignesRecette}/>
            </Form>
        </Container>
    }

}

function initOptions() {
    let options = [];
    fetch('http://localhost:8080/ingredient/list')
        .then(result => result.json())
        .then(ingredients => ingredients.map(ingredient => options.push({value: ingredient, label: ingredient.nom})));
    return options;

}


export default Plat
