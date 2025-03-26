import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../services/workSpaceService";
import {
  getReservationSchedule,
  storeReservation,
} from "../services/reservationService";
import { ReservationModal } from "../components/workspace/ReservationModal";
import { DateSelectionForm } from "../components/workspace/DateSelectionForm";
import { WorkspaceDetails } from "../components/workspace/WorkspaceDetails";

export const ShowWorkspace = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await getWorkspaceById(id);
        setWorkspace(response.data);
      } catch (error) {
        console.log("Error al obtener el workspace:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspace();
  }, [id]);

  const handleCloseModal = () => {
    setStartHour(null);
    setEndHour(null);
    setDate("");
    setSchedule([]);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      return;
    }

    try {
      const response = await getReservationSchedule(id, date);
      setSchedule(response.schedule);
      setShowModal(true);
    } catch (error) {
      console.log("Error al obtener los horarios:", error.message);
    }
  };

  //Guardado de horarios
  const handleHourSelection = (hour) => {
    if (startHour === null) {
      // guardo el primer horario
      setStartHour(hour);
      setEndHour(hour + 1);
    } else if (hour === endHour) {
      // Si selecciona otro horario le sumo 1 a endhour
      setEndHour(hour + 1);
    } else if (hour < startHour) {
      // Si selecciona un horario anterior, reinicio la seleccion desde este ultimo
      setStartHour(hour);
      setEndHour(hour + 1);
    } else {
      // Si el usuario selecciona un horario no consecutivo, reinicio la seleleccion
      setStartHour(hour);
      setEndHour(hour + 1);
    }
  };

  const isValidSelection = () => {
    if (!startHour || !endHour) return false;
    const selectedRange = schedule.filter(
      ({ hour }) => hour >= startHour && hour < endHour
    );
    return selectedRange.every(({ available }) => available);
  };

  const handleReserve = async () => {
    if (!isValidSelection()) {
      return;
    }
    try {
      console.log(workspace.id, date, startHour, endHour);
      await storeReservation(workspace.id, date, startHour, endHour);
      handleCloseModal();
      alert(
        `Reserva realizada con exito a las ${startHour}:00 hasta las ${endHour}:00`
      );
    } catch (error) {
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <p className="text-white">Cargando...</p>;
  if (!workspace)
    return <p className="text-red-500">No se encontro el workspace</p>;

  return (
    <div className="flex w-full justify-center max-w-[60rem]">
      <section className="flex items-start bg-zinc-900 text-white p-6 rounded-lg shadow-md w-full my-10 h-fit">
        <WorkspaceDetails workspace={workspace} />
        <div className="w-full flex justify-end mt-4">
          <DateSelectionForm
            date={date}
            setDate={setDate}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>

      {showModal && (
        <ReservationModal
          schedule={schedule}
          startHour={startHour}
          endHour={endHour}
          handleHourSelection={handleHourSelection}
          handleReserve={handleReserve}
          isValidSelection={isValidSelection}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
