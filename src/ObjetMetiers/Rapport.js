import ReleveInformations from "./ReleveInformations";
import moment from "moment";

class Rapport {
    constructor(isNew = true, id, date, relevesInfos) {
        if (!isNew) {
            this.id = id;
            this.date = date;
            this.relevesInformations = [];

           if(relevesInfos !== undefined) {
               this.mapAndAddReleves(relevesInfos);
           }

        } else {
            this.date = moment().format('DD-MM-YYYY');
            this.relevesInformations = [];
        }
    }

    mapAndAddReleves(relesInfos) {

        relesInfos.forEach(releve => {

            this.relevesInformations.push(new ReleveInformations(ReleveInformations.of(releve.apportNutritionnel),
                releve.periode,
                releve.tension,
                releve.listPlats,
                false,
                releve.id
            ))
        })
    }

    addReleve(){
        this.relevesInformations.push(new ReleveInformations());
        return this;
    }

    deleteReleve(index){
        this.relevesInformations.splice(index, index + 1);
        return this;
    }
}

export default Rapport;