'use strict';

const PrescriptionsService = {
  getUserPrescriptions(db, id) {
    return db('users')
      .where({ 'users.id': id })
      .join('prescriptions', 'users.id', '=', 'prescriptions.user_id')
      .select('prescriptions.rx_name')
      .join('schedules', 'schedules.prescription_id', '=', 'prescriptions.id')
      .select('schedules.*');
  },

  addUserPrescriptions(db, data) {
    const { rx_name, day, user_id } = data;

    return db('prescriptions')
      .insert({ rx_name, user_id })
      .into('prescriptions')
      .returning('*')
      .then(rx => {
        //turn three string into one object;
        // const newSchedule = this.prescriptionsSpreader(
        //   day.concat(time).concat([{ prescription_id: rx[0].id }])
        // );
        const newSchedule = { prescription_id: rx[0].id, day: day };
        return newSchedule;
      })
      .then(newSchedule => db('schedules').insert(newSchedule));
  },

  prescriptionsSpreader(schedule) {
    let newSchedule = schedule.reduce(function(accumulator, currentValue) {
      return Object.assign(accumulator, currentValue);
    }, {});
    return newSchedule;
  }
};
module.exports = PrescriptionsService;
