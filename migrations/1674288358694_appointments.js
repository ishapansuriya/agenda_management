/* eslint-disable camelcase */

exports.shorthands = undefined
// // title TEXT NOT NULL,
// // type TEXT NOT NULL,
// location TEXT,
// link TEXT,
// host INTEGER NOT NULL,
// client INTEGER NOT NULL,
// startTime TIMESTAMP NOT NULL,
// endTime TIMESTAMP NOT NULL,
// FOREIGN KEY (host) REFERENCES vendors (id),
// FOREIGN KEY (client) REFERENCES buyers (id)

exports.up = (pgm) => {
  pgm.createTable('appointments', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    title: {
      type: 'string',
      notNull: true,
    },
    type: {
      type: 'string',
      notNull: true,
    },
    location: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    host: {
      type: 'integer',
      notNull: true,
      references: 'vendors',
      onDelete: 'cascade',
    },
    client: {
      type: 'integer',
      notNull: true,
      references: 'buyers',
      onDelete: 'cascade',
    },
    start_date: {
      type: 'timestamp',
      notNull: true,
    },
    end_date: {
      type: 'timestamp',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  //   pgm.addConstraint('appointments', 'fk_host_vendors', {
  //     foreignKey: {
  //       columns: ['host'],
  //       references: 'vendors(id)',
  //       onDelete: 'CASCADE',
  //     },
  //   })
  //   pgm.addConstraint('appointments', 'fk_client_buyers', {
  //     foreignKey: {
  //       columns: ['client'],
  //       references: 'buyers(id)',
  //       onDelete: 'CASCADE',
  //     },
  //   })
  //node-pg-migrate addConstraint orders user_id users id orders_user_fk
}

exports.down = (pgm) => {
  //   pgm.dropConstraint('appointments', 'fk_host_vendors')
  //   pgm.dropConstraint('appointments', 'fk_client_buyers')
  pgm.dropTable('appointments')
}
