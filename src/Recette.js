import React from "react";
import './assets/css/recette.css'
import {Button} from "react-bootstrap";


class Recette extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let result = this.props.lignesRecette.map((component) => <li>{component}</li>);
        return <div>
            <Button variant="primary" onClick={()=>this.props.handleClick()}>
                Ajouter une ligne de recette
            </Button>
            <fieldset className="scheduler-border">
                <legend className="scheduler-border">Recette</legend>
                <ul>
                    {result}
                </ul>
            </fieldset>
        </div>
    }
}

export default Recette;
