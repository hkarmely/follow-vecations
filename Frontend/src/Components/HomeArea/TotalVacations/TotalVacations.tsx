import { Component } from "react";
import { Unsubscribe } from "redux";
import { vacationsStore } from "../../../Redux/Store";
import "./TotalVacations.css";

interface TotalVacationsState {
    count: number;
}

class TotalVacations extends Component<{}, TotalVacationsState> {

    private unsubscribeMe: Unsubscribe;

    public componentDidMount() {
        this.unsubscribeMe = vacationsStore.subscribe(() => {
            const count = vacationsStore.getState().vacations.length;
            this.setState({ count });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="TotalVacations">
                {this.state?.count && <span>Total Vacations: {this.state?.count}</span>}
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

}

export default TotalVacations;
