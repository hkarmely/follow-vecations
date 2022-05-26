import { Socket, io } from 'socket.io-client';
import VacationModel from '../Models/VacationModel';
import { vacationsStore } from '../Redux/Store';
import { addVacationAction, deleteVacationAction, updatePartialVacationAction } from '../Redux/VacationsState';
import config from '../Utils/Config';


class SocketIoService {

    private socket: Socket;

    public connect(): void {

        // Connect to socket server:
        this.socket = io(config.urls.socketServer);

        // Listen to adding a  vacation  by admin:
        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(addVacationAction(vacation));
        });

        // Listen to updating a vacation follow by user:
        this.socket.on("user-update-followVacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updatePartialVacationAction(vacation));
        });
        // Listen to updating a vacation by admin:
        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updatePartialVacationAction(vacation));
        });

        // Listen to deleting a vacation by admin:
        this.socket.on("admin-delete-vacation", (id: number) => {
            vacationsStore.dispatch(deleteVacationAction(id));
        });


        // Listen to adding a follow vacation by user:
        this.socket.on("user-add-followVacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updatePartialVacationAction(vacation));
        });

        // Listen to deleting a follow vacation by user:
        this.socket.on("user-delete-followVacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updatePartialVacationAction(vacation));
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketIoService = new SocketIoService();

export default socketIoService;



