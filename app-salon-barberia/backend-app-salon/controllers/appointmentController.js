import { parse, formatISO, format, startOfDay, endOfDay, isValid} from 'date-fns'
import Appointment from '../models/Appointment.js'

const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        await newAppointment.save()
        res.json({
            msg: 'La Cita fue agendada correctamente'
        })

    } catch (error) {
        console.log(error)
    }
}

const getAppointmentByDate = async (req, res) => {
    const { date } = req.query;
    const newDate = parse(date, 'dd/MM/yyyy', new Date());
    if(!isValid(newDate)){
        const error = new Error('Fecha no valida')
        return res.status(400).json({ msg: error.message}) }

    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(newDate),
            $lte: endOfDay(newDate)
        }
    }).select('time')

    res.json(appointments);
}
export {
    createAppointment,
    getAppointmentByDate
}