import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Booking = () => {
  const [doctor, setDoctor] = useState({});
  const [bookingSlots, setBookingSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/admin/doctors/${id}`,
        );
        setDoctor(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
    setBookingSlots(getAvailableSlots()); // generate initial slots
  }, [id]);

  /** Generate 7 days of booking slots dynamically (every 2 hours from 9 AM - 9 PM) */
  const getAvailableSlots = () => {
  const slots = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(now.getDate() + i);
    currentDate.setHours(0, 0, 0, 0); // start of the day

    const timeSlots = [];
    let startTime = new Date(currentDate);
    startTime.setHours(9, 0, 0, 0); // start 9:00 AM
    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0); // end 9:00 PM

    while (startTime < endTime) {
      // Include only future times for today
      if (i > 0 || startTime > now) {
        timeSlots.push({
          datetime: new Date(startTime),
          time: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
      startTime.setMinutes(startTime.getMinutes() + 30); // 30 min intervals
    }

    // Only add days with available slots
    if (timeSlots.length > 0) {
      slots.push({
        day: daysOfWeek[currentDate.getDay()],
        date: currentDate.toLocaleDateString("en-GB"),
        times: timeSlots,
      });
    }
  }

  return slots;
};


  /// fetching booking appointment
  const handleBooking = async () => {
    if (!selectedTime) {
      toast.error("Please select a time slot!");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/appointment",
        {
          doctorId: id,
          doctorName: doctor.name,
          date: bookingSlots[selectedDayIndex].date,
          time: selectedTime,
        },
      );
      toast.success(res.data.message || "Appointment booked successfully!");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Failed to book appointment";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative w-full mt-5 mb-20 bg-[#f3f8ff] px-20">
      {/* Doctor Details Section */}
      <div className="flex items-center px-10">
        <div className="w-[20%] px-2 pt-2 h-[70vh] rounded-xl bg-white">
          <img
            src={doctor.profile}
            alt={doctor.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="p-5 m-5 border border-gray-300 bg-white rounded-lg shadow-lg h-[70vh]">
          <h2 className="mt-4 text-2xl font-semibold">Dr. {doctor.name}</h2>
          <p className="mt-2 text-lg font-semibold text-gray-500">
            Speciality: {doctor.speciality}
          </p>
          <div className="mt-2">
            <h1 className="text-lg font-bold">About</h1>
            <p className="text-gray-500">{doctor.about}</p>
          </div>
          <p className="text-lg font-semibold text-gray-500 mt-28">
            Appointment fee: Ksh {doctor.fees}
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="px-20 mt-3">
        <h1 className="text-xl font-bold">Booking Slots</h1>
        {/* --- Days --- */}
        <div className="flex items-center gap-5 mt-3 overflow-x-auto">
          {bookingSlots.map((slot, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedDayIndex(index);
                setSelectedTime("");
              }}
              className={`py-4 px-3 text-center border rounded-xl min-w-20 cursor-pointer transition ${
                selectedDayIndex === index
                  ? "bg-blue-500 text-white border-blue-600"
                  : "border-gray-300 hover:bg-blue-100"
              }`}
            >
              <p className="text-lg font-bold">{slot.day}</p>
              <p className="text-sm">{slot.date}</p>
            </div>
          ))}
        </div>

        {/* --- Time Slots --- */}
        <div className="flex gap-4 pb-2 mt-6 overflow-x-auto whitespace-nowrap">
          {bookingSlots[selectedDayIndex]?.times.map((timeSlot, idx) => (
            <p
              key={idx}
              onClick={() => setSelectedTime(timeSlot.time)}
              className={`px-5 py-2 font-semibold border rounded-full w-28 text-center cursor-pointer transition ${
                selectedTime === timeSlot.time
                  ? "bg-green-500 text-white border-green-600"
                  : "border-gray-300 hover:bg-green-100"
              }`}
            >
              {timeSlot.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button
          onClick={handleBooking}
          type="submit"
          className="px-5 py-2 mt-3 font-bold text-white bg-blue-400 rounded-full"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Booking;
