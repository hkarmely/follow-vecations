import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import moment from 'moment';
import "./UpdateVacation.css";
import config from "../../../Utils/Config";
import authService from "../../../Services/AuthService";

function UpdateVacation(): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const lastSlashIndex = window.location.pathname.lastIndexOf("/");
    const id = +window.location.pathname.substr(lastSlashIndex + 1);

    useEffect(() => {
        (async () => {
            try {
                const user = await authService.getUser();
                if (user.role !== 2) {
                    window.location.replace(config.loginPath);
                }
                const vacation = await vacationsService.getOneVacation(id);
                await setVacation(vacation);
                await setValue("description", vacation.description);
                await setValue("destination", vacation.destination);
                await setValue("price", vacation.price);
                await setValue("fromDate", vacation.fromDate);
                await setValue("toDate", vacation.toDate);
            } catch (err) {

                console.error(err);
            }
        })();
    }, []);

    async function submit(vacation: VacationModel) {
        try {
            vacation.vacationId = id;
            const updatedVacation = await vacationsService.updatePartialVacation(vacation);
            notifyService.success("Vacation has been updated. id: " + updatedVacation.vacationId); // In real life - never show ids to the user.
            navigate("/admin-panel");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="UpdateVacation Box">

            <h2>Update Vacation</h2>

            <form onSubmit={handleSubmit(submit)}>
                <label>destination: </label>
                <input type="text"  {...register("destination", {
                    required: { value: false, message: "Missing destination" },
                    minLength: { value: 2, message: "destination must be minimum 2 chars" },
                    maxLength: { value: 100, message: "destination can't exceed 100 chars" }
                })} />
                <span>{formState.errors.destination?.message}</span>

                <label>description: </label>
                <input type="text" {...register("description", {
                    required: { value: false, message: "Missing description" },
                    minLength: { value: 2, message: "description must be minimum 2 chars" },
                    maxLength: { value: 1000, message: "description can't exceed 1000 chars" }
                })} />
                <span>{formState.errors.description?.message}</span>

                <label>fromDate: </label>
                <span>{(moment(vacation?.fromDate).format("DD-MM-YYYY,HH:MM A"))}</span>
                <input type="datetime-local" name="fromDate" {...register("fromDate", {
                    required: { value: false, message: "Missing start Date" },

                })} />
                <span>{formState.errors.fromDate?.message}</span>


                <label>toDate: </label>
                <span>{(moment(vacation?.toDate).format("DD-MM-YYYY,HH:MM A"))}</span>
                <span>{formState.errors.toDate?.message}</span>
                <input type="datetime-local" name="toDate"  {...register("toDate", {
                    required: { value: false, message: "Missing End Date" },

                })} />
                <span>{formState.errors.toDate?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", {
                    required: { value: false, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 100000, message: "Price can't exceed $100000" }
                })} step="0.01" />

                <span>{formState.errors.price?.message}</span>

                <label>Image:</label><br />
                <img src={config.urls.vacationImages + vacation?.imageName} alt="" />
                <input type="file" accept="image/*" defaultValue={vacation?.imageName} {...register("image", {
                    required: { value: false, message: "Missing image" }
                })} />
                <span>{formState.errors.image?.message}</span>

                <button>Update</button>
            </form>

        </div>
    );
}

export default UpdateVacation;
