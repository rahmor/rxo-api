'use strict';

const PrescritionsService = {
  getUserPrescriptions(db, id) {
    return db('users')
      .where({ 'users.id': id })
      .join('prescriptions', 'users.id', '=', 'prescriptions.user_id')
      .select('prescriptions.rx_name')
      .join('schedules', 'schedules.prescription_id', '=', 'prescriptions.id')
      .select('schedules.*');
  },

  addUserPrescriptions(db, data) {
    const { rx_name, days, times, user_id } = data;
    return db('prescriptions')
      .insert({ rx_name, user_id })
      .into('prescriptions')
      .returning('*')
      .then(rx => {
        //put rx.id into object and then concatenate key value pairs in days and times
        return db('schedules').insert(
          { prescription_id: rx[0].id, monday: true },
          { monday: true }
        );
      });
  }
};
module.exports = PrescritionsService;
