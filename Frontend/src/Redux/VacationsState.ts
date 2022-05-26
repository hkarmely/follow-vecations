import VacationModel from "../Models/VacationModel";

// Vacations AppState - The application level data:
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// Vacations ActionType - Which actions we can perform on the data:

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    UpdatePartialVacation = "UpdatePartialVacation",
    DeleteVacation = "DeleteVacation"
    // ...
    ,
    emptyVacationsOnLogout = "emptyVacationsOnLogout"
}

// Vacations Action - A single object containing data to perform for a single ActionType
export interface VacationsAction {
    type: VacationsActionType; // The action type
    payload: any; // The action data
}

// Vacations Action Creators - functions for creating action object for sending to dispatch
export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.FetchVacations, payload: vacations };
}
export function addVacationAction(vacationToAdd: VacationModel): VacationsAction {
    return { type: VacationsActionType.AddVacation, payload: vacationToAdd };
}
export function updateVacationAction(vacationToUpdate: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacationToUpdate };
}
export function updatePartialVacationAction(vacationToUpdate: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdatePartialVacation, payload: vacationToUpdate };
}
export function deleteVacationAction(idToDelete: number): VacationsAction {
    return { type: VacationsActionType.DeleteVacation, payload: idToDelete };
}
export function emptyVacationsStore(): VacationsAction {
    return { type: VacationsActionType.emptyVacationsOnLogout, payload: null };
}

// Vacations Reducer - the function actually performing the operations: 
export function vacationsReducer(currentVacationsState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate the current vacations state int a new one:
    const newVacationsState = { ...currentVacationsState };

    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here action.payload is vacations array downloaded from the server
            newVacationsState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here action.payload is a single vacation to add
            newVacationsState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here action.payload is a single vacation to update
            const indexToUpdate = newVacationsState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            newVacationsState.vacations[indexToUpdate] = action.payload;
            break;
        
        case VacationsActionType.UpdatePartialVacation: // Here action.payload is a single vacation to update
            const indexPartialToUpdate = newVacationsState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            newVacationsState.vacations[indexPartialToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation: // Here action.payload is the id of the vacation to delete
            const indexToDelete = newVacationsState.vacations.findIndex(p => p.vacationId === action.payload);
            newVacationsState.vacations.splice(indexToDelete, 1); // 1 = delete only one item
            break;
        // for logout and re-login with a different user purposes
        case VacationsActionType.emptyVacationsOnLogout: {
            newVacationsState.vacations = [];
            break;
        }
    }

    return newVacationsState;
}