import "./Reports.css";
import * as V from 'victory';
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import authService from "../../../Services/AuthService";
import config from "../../../Utils/Config";
import vacationsService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/VacationModel";

function Reports(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>(undefined);
    const [data, setData] = useState<{ destination: string, followers: number }[]>(undefined);
    const [myTickValues, setMyTickValues] = useState<number[]>(undefined);
    const [myTickFormat, setMyTickFormat] = useState<string[]>(undefined);

    useEffect((async () => {
        try {
            const user = await authService.getUser();

            if (user.role !== 2) {
                window.location.replace(config.loginPath);
            } else {
                const vacations = await vacationsService.getAllVacations();
                setVacations(vacations);
                const stateVacations: { destination: string, followers: number }[] = [];
                const myTickValues: number[] = [];
                const myTickFormat: string[] = [];
                vacations.forEach((v: any, index: number) => {
                    myTickValues.push(+index + 1);
                    myTickFormat.push(v.destination);
                    let obj = { destination: v.destination, followers: +v.followers };
                    stateVacations.push(obj);
                });

                setData(stateVacations);
                setMyTickValues(myTickValues);
                setMyTickFormat(myTickFormat);
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }) as any, []);

    return (

        <div className="Reports">
            {data && <><h1>"Vacations 💖 and Number of Followers 😍"</h1>

                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={myTickValues}
                        tickFormat={myTickFormat}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar horizontal
                        data={data}
                        x="destination"
                        y="followers"
                    />
                </VictoryChart>
            </>}

        </div>
    );
}

export default Reports;
