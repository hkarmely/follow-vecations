import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

  const navigate = useNavigate();

  useEffect((async () => {
    try {
      const user = await authService.getUser();
      if (user.role !== 2) {
        window.location.replace(config.loginPath);

      }
    }
    catch (err: any) {
      alert(err.message);
    }
  }) as any, []);


  const { register, handleSubmit, formState } = useForm<VacationModel>();

  async function submit(vacation: VacationModel) {
    try {
      const addedVacation = await vacationsService.addVacation(vacation);
      notifyService.success("Vacation has been added. id: " + addedVacation.vacationId); // In real life - never show ids to the user.
      navigate("/admin-panel");
    } catch (err: any) {
      notifyService.error(err.message);
    }
  }

  return (
    <div className="AddVacation Box">

      <h2>Add Vacation</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label>description: </label>
        <input
          type="text"
          {...register("description", {
            required: { value: false, message: "Missing description" },
            minLength: { value: 2, message: "description must be minimum 2 chars" },
            maxLength: { value: 2000, message: "description can't exceed 2000 chars" },
          })}
        />
        <span>{formState.errors.description?.message}</span>

        <label>destination: </label>
        <input
          type="text"
          {...register("destination", {
            required: { value: false, message: "Missing destination" },
            minLength: { value: 2, message: "destination must be minimum 2 chars" },
            maxLength: { value: 100, message: "destination can't exceed 100 chars" },
          })}
        />
        <span>{formState.errors.destination?.message}</span>

        <label>fromDate: </label>
        <span>{formState.errors.fromDate?.message}</span>
        <input
          type="datetime-local"
          {...register("fromDate", {
            required: { value: false, message: "Missing Date" },
            minLength: { value: 2, message: "Date must be minimum 2 chars" },
            maxLength: { value: 100, message: "Date can't exceed 100 chars" },
          })}
        />
        <span>{formState.errors.fromDate?.message}</span>

        <label>toDate: </label>
        <span>{formState.errors.toDate?.message}</span>
        <input
          type="datetime-local"
          {...register("toDate", {
            required: { value: false, message: "Missing Date" },
            minLength: { value: 2, message: "Date must be minimum 2 chars" },
            maxLength: { value: 100, message: "Date can't exceed 100 chars" },
          })}
        />
        <span>{formState.errors.toDate?.message}</span>

        <label>Price: </label>
        <input
          type="number"
          {...register("price", {
            required: { value: false, message: "Missing price" },
            min: { value: 0, message: "Price can't be negative" },
            max: { value: 100000, message: "Price can't exceed $100000" },
          })}
          step="0.01"
        />
        <span>{formState.errors.price?.message}</span>

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            required: { value: false, message: "Missing image" },
          })}
        />
        <span>{formState.errors.image?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddVacation;
