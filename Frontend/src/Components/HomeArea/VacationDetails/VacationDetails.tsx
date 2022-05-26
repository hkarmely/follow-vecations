import moment from "moment";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import "./VacationDetails.css";

interface VacationDetailsProps {
}

interface VacationDetailsState {
    vacation: VacationModel;
}

class VacationDetails extends Component<VacationDetailsProps, VacationDetailsState> {

    public async componentDidMount() {
        try {
            const lastSlashIndex = window.location.pathname.lastIndexOf("/");
            const id = +window.location.pathname.substr(lastSlashIndex + 1);
            const vacation = await vacationsService.getOneVacation(id);
            this.setState({ vacation });
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="VacationDetails Box">

                <h2>Vacation Details: </h2>
                <h3>{this.state?.vacation?.destination}</h3>
                <h3>Price: ${this.state?.vacation?.price} | Followers: {this.state?.vacation?.followers}</h3>
                <img src={config.urls.vacationImages + this.state?.vacation?.imageName} alt={this.state?.vacation?.imageName} />
                <h3>{this.state?.vacation?.description}</h3>
                <h3>{this.state?.vacation?.followedByUser}</h3>
                <h3> <label >From Date:</label></h3>
                <h3>{moment(this.state?.vacation?.fromDate).format("DD - MM - YYYY")}</h3>
                <h3><label >To Date:</label></h3>
                <h3>{moment(this.state?.vacation?.toDate).format("DD - MM - YYYY")}</h3>
               <h2> <NavLink to="/home">Back</NavLink></h2>

            </div>
        );
    }
}

export default VacationDetails;
